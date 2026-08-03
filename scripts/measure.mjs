#!/usr/bin/env node
/**
 * Report the real vertical gaps between rendered blocks on a Storybook docs
 * page, and which element margins are producing them. Eyeballing a screenshot
 * cannot tell you whether a gap came from a flex gap or an inherited margin.
 *
 *   node scripts/measure.mjs <url>
 */

import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const url = process.argv[2];
const PORT = 9600 + Math.floor(Math.random() * 200);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "dbui-measure-"));

const chrome = spawn(CHROME, [
  "--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  "--no-first-run", "--disable-gpu", "--disable-extensions", "--disable-sync",
  "--disable-background-networking", "--window-size=1400,1200", "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  let wsUrl;
  for (let i = 0; i < 60 && !wsUrl; i++) {
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
  await sleep(6000);

  const expr = `
  (() => {
    const root = document.querySelector('.sbdocs-content') || document.body;
    const out = [];
    const walk = (el, depth) => {
      if (depth > 4) return;
      for (const c of el.children) {
        const cs = getComputedStyle(c);
        const r = c.getBoundingClientRect();
        if (r.height === 0) continue;
        out.push({
          depth,
          tag: c.tagName.toLowerCase(),
          cls: (c.className || '').toString().slice(0, 44),
          text: (c.textContent || '').trim().slice(0, 34),
          top: Math.round(r.top),
          bottom: Math.round(r.bottom),
          mt: cs.marginTop, mb: cs.marginBottom,
          gap: cs.rowGap,
          width: Math.round(r.width),
          scrollW: c.scrollWidth,
        });
        walk(c, depth + 1);
      }
    };
    walk(root, 0);
    return JSON.stringify({
      containerWidth: Math.round(root.getBoundingClientRect().width),
      blocks: out.slice(0, 26),
    });
  })()`;

  const { result } = await send("Runtime.evaluate", { expression: expr, returnByValue: true }, sessionId);
  const data = JSON.parse(result.value);

  console.log(`docs container width: ${data.containerWidth}px\n`);
  console.log("  tag       margin-top / bottom   rowGap   w / scrollW   content");
  console.log("  " + "─".repeat(94));
  let prevBottom = null;
  for (const b of data.blocks) {
    const gapFromPrev = prevBottom === null ? "" : `   ↕ ${b.top - prevBottom}px`;
    if (gapFromPrev && b.depth === 0) console.log(`  ${" ".repeat(10)}${gapFromPrev}`);
    const overflow = b.scrollW > b.width + 2 ? `  OVERFLOWS by ${b.scrollW - b.width}` : "";
    console.log(
      `  ${"  ".repeat(b.depth)}${b.tag.padEnd(8 - b.depth * 2)} ${b.mt.padStart(6)} / ${b.mb.padEnd(6)}  ${b.gap.padStart(6)}   ${String(b.width).padStart(4)}/${String(b.scrollW).padEnd(5)} ${b.text}${overflow}`,
    );
    if (b.depth === 0) prevBottom = b.bottom;
  }
  ws.close();
} finally {
  chrome.kill();
  try { fs.rmSync(profile, { recursive: true, force: true }); } catch {}
}
