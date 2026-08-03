#!/usr/bin/env node
/**
 * Report the resolved typography and spacing of a page: font size, line height,
 * weight and colour per element role, plus container width and the real gaps
 * between blocks. Used to copy a reference design by its numbers rather than by
 * eye.
 *
 *   node scripts/measure-type.mjs <url> [selector]
 */

import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const url = process.argv[2];
const scope = process.argv[3] ?? "main, article, .prose, body";
const PORT = 9800 + Math.floor(Math.random() * 150);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "dbui-type-"));

const chrome = spawn(CHROME, [
  "--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  "--no-first-run", "--disable-gpu", "--disable-extensions", "--disable-sync",
  "--window-size=1440,1200", "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  let wsUrl;
  for (let i = 0; i < 80 && !wsUrl; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (r.ok) wsUrl = (await r.json()).webSocketDebuggerUrl;
    } catch {}
    if (!wsUrl) await sleep(250);
  }
  const ws = await new Promise((res, rej) => {
    const s = new WebSocket(wsUrl);
    s.onopen = () => res(s);
    s.onerror = rej;
  });
  let id = 0;
  const pending = new Map();
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const { resolve, reject } = pending.get(m.id);
      pending.delete(m.id);
      m.error ? reject(new Error(m.error.message)) : resolve(m.result);
    }
  };
  const send = (method, params = {}, sessionId) =>
    new Promise((resolve, reject) => {
      const myId = ++id;
      pending.set(myId, { resolve, reject });
      ws.send(JSON.stringify({ id: myId, method, params, ...(sessionId ? { sessionId } : {}) }));
    });

  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  await send("Page.enable", {}, sessionId);
  await send("Page.navigate", { url }, sessionId);
  await sleep(9000);

  const expr = `
  (() => {
    const scope = document.querySelector(${JSON.stringify(scope)}) || document.body;
    const pick = (sel) => scope.querySelector(sel);
    const info = (el) => {
      if (!el) return null;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        size: cs.fontSize, line: cs.lineHeight, weight: cs.fontWeight,
        family: cs.fontFamily.split(',')[0].replace(/"/g,''),
        color: cs.color, mt: cs.marginTop, mb: cs.marginBottom,
        tracking: cs.letterSpacing, width: Math.round(r.width),
      };
    };
    const roles = {
      h1: info(pick('h1')), h2: info(pick('h2')), h3: info(pick('h3')),
      p: info(pick('p')), li: info(pick('li')),
      code: info(pick('code')), pre: info(pick('pre')),
      th: info(pick('th')), td: info(pick('td')), table: info(pick('table')),
    };
    // Gaps between consecutive top-level blocks of the content column.
    const container = pick('h1')?.parentElement || scope;
    const kids = [...container.children].filter(c => c.getBoundingClientRect().height > 0);
    const gaps = [];
    for (let i = 1; i < Math.min(kids.length, 14); i++) {
      const a = kids[i-1].getBoundingClientRect(), b = kids[i].getBoundingClientRect();
      gaps.push({
        from: kids[i-1].tagName.toLowerCase(),
        to: kids[i].tagName.toLowerCase(),
        gap: Math.round(b.top - a.bottom),
      });
    }
    const cs = getComputedStyle(container);
    return JSON.stringify({
      containerWidth: Math.round(container.getBoundingClientRect().width),
      containerMaxWidth: cs.maxWidth,
      roles, gaps,
    });
  })()`;

  const { result } = await send("Runtime.evaluate", { expression: expr, returnByValue: true }, sessionId);
  const d = JSON.parse(result.value);

  console.log(`content column: ${d.containerWidth}px  (max-width ${d.containerMaxWidth})\n`);
  console.log("  role    size / line   weight  tracking   margin t/b     family");
  console.log("  " + "─".repeat(78));
  for (const [role, v] of Object.entries(d.roles)) {
    if (!v) continue;
    console.log(
      `  ${role.padEnd(7)} ${v.size.padStart(5)} / ${v.line.padEnd(7)} ${v.weight.padEnd(6)} ${v.tracking.padEnd(9)} ${(v.mt + " / " + v.mb).padEnd(14)} ${v.family}`,
    );
  }
  console.log("\n  gaps between blocks");
  console.log("  " + "─".repeat(40));
  for (const g of d.gaps) console.log(`  ${g.from} → ${g.to}`.padEnd(24) + `${g.gap}px`);
  ws.close();
} finally {
  chrome.kill();
  try { fs.rmSync(profile, { recursive: true, force: true }); } catch {}
}
