import { compile } from "tailwindcss"
import fs from "node:fs"
import path from "node:path"
const ROOT = "/Users/mudit.mittal/db-design-system"
const TW_INDEX = path.join(ROOT, "node_modules/tailwindcss/index.css")
async function loadStylesheet(id, base) {
  const file = id === "tailwindcss" ? TW_INDEX : path.resolve(base, id.replace(/^tailwindcss\//, "node_modules/tailwindcss/"))
  return { path: file, base: path.dirname(file), content: fs.readFileSync(file, "utf8") }
}
const build = async (css, c) => (await compile(css, { base: ROOT, loadStylesheet })).build(c)
const stock = await build(`@import "tailwindcss";`, ["rounded-full", "rounded-none"])
console.log("STOCK   :", stock.match(/\.rounded-full\s*\{[^}]*\}/)?.[0])
const owned = await build(`@import "tailwindcss";
@theme inline { --radius-full: var(--db-radius-full); }
:root { --db-radius-full: 999px; }`, ["rounded-full", "rounded-none"])
console.log("BRIDGED :", owned.match(/\.rounded-full\s*\{[^}]*\}/)?.[0])
console.log("none    :", owned.match(/\.rounded-none\s*\{[^}]*\}/)?.[0])
