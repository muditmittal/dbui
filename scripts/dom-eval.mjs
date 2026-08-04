#!/usr/bin/env node
/**
 * Evaluate an expression in a page and print the JSON result. Storybook's chrome
 * is emotion-styled, so class names are generated — the only reliable way to
 * write an override is to read the real DOM first.
 *
 *   node scripts/dom-eval.mjs <url> '<js expression>'
 */

import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const [url, expression] = process.argv.slice(2);
if (!url || !expression) {
  console.error("usage: node scripts/dom-eval.mjs <url> '<js expression>'");
  process.exit(1);
}
const PORT = 9800 + Math.floor(Math.random() * 150);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "dbui-eval-"));

const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profile}`,
  "--no-first-run",
  "--no-default-browser-check",
  "--disable-gpu",
  "--disable-extensions",
  "--window-size=1400,1200",
  "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  let wsUrl;
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) { wsUrl = (await res.json()).webSocketDebuggerUrl; break; }
    } catch {}
    await sleep(250);
  }

  const ws = await new Promise((resolve, reject) => {
    const s = new WebSocket(wsUrl);
    s.onopen = () => resolve(s);
    s.onerror = (e) => reject(new Error(String(e.message ?? "websocket failed")));
  });

  let id = 0;
  const pending = new Map();
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
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
  await sleep(7000);

  const { result, exceptionDetails } = await send("Runtime.evaluate", {
    // Resolve first: an async expression would otherwise stringify as "{}".
    expression: `Promise.resolve(${expression}).then((v) => JSON.stringify(v, null, 2))`,
    returnByValue: true,
    awaitPromise: true,
  }, sessionId);

  if (exceptionDetails) console.error(exceptionDetails.text ?? "evaluation failed");
  console.log(result?.value ?? "undefined");
  ws.close();
} finally {
  chrome.kill();
  try { fs.rmSync(profile, { recursive: true, force: true }); } catch {}
}
