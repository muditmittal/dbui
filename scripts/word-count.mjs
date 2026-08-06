#!/usr/bin/env node
/**
 * Count the words a reader actually sees on a docs route.
 *
 * Two numbers, because one of them is misleading on its own. `article` counts
 * everything rendered, and on Icons and Components most of that is a generated
 * table — 456 icon labels are not prose and cutting them would remove the page.
 * `prose` counts only the paragraphs and list items, which is the editorial
 * layer a person writes and the only part an edit can shorten.
 *
 *   node scripts/word-count.mjs <url> [url...]
 */

import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const urls = process.argv.slice(2);
if (urls.length === 0) {
  console.error("usage: node scripts/word-count.mjs <url> [url...]");
  process.exit(1);
}

const PORT = 9600 + Math.floor(Math.random() * 150);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "dbui-words-"));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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

/** Runs in the page. Kept in one string so it can be handed to Runtime.evaluate. */
const COUNT = `(() => {
  const words = (text) => (text || "").trim().split(/\\s+/).filter(Boolean).length
  const article = document.querySelector("article")
  if (!article) return { error: "no article" }
  const prose = [...article.querySelectorAll("p, li")].reduce((n, el) => n + words(el.innerText), 0)
  return { article: words(article.innerText), prose, paragraphs: article.querySelectorAll("p, li").length }
})()`;

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

  for (const url of urls) {
    await send("Page.navigate", { url }, sessionId);
    await sleep(6000);
    const { result } = await send("Runtime.evaluate", {
      expression: COUNT,
      returnByValue: true,
    }, sessionId);
    const v = result?.value ?? {};
    console.log(`${url}  article=${v.article}  prose=${v.prose}  blocks=${v.paragraphs}`);
  }
  ws.close();
} finally {
  chrome.kill();
  try { fs.rmSync(profile, { recursive: true, force: true }); } catch {}
}
