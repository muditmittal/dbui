import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Locates the DBUI source. Walks up from this file looking for the marker that
 * only the design system repo has, then falls back to a vendored `./dbui`
 * directory so the CLI also works inside a consuming project that installed via
 * the copy path in install.md.
 */
function findRoot() {
  if (process.env.DBUI_ROOT) return process.env.DBUI_ROOT;

  const starts = [path.dirname(fileURLToPath(import.meta.url)), process.cwd()];

  // The monorepo layout wins outright. Checking the vendored layout in the same
  // pass would match at `packages/`, where `dbui/src/components/ui` also
  // resolves, and every path derived from the root would then be wrong.
  for (const marker of ["packages/dbui/src/components/ui", "dbui/src/components/ui"]) {
    for (const start of starts) {
      let dir = start;
      for (let i = 0; i < 8; i++) {
        if (fs.existsSync(path.join(dir, marker))) return dir;
        const parent = path.dirname(dir);
        if (parent === dir) break;
        dir = parent;
      }
    }
  }
  return null;
}

export const ROOT = findRoot();

/** Vendored installs drop the `packages/` prefix. */
function base() {
  if (!ROOT) return null;
  return fs.existsSync(path.join(ROOT, "packages/dbui")) ? "packages/dbui" : "dbui";
}

export const PATHS = ROOT
  ? {
      root: ROOT,
      dbui: path.join(ROOT, base()),
      ui: path.join(ROOT, base(), "src/components/ui"),
      // The charts and the chat set are sibling packages, so they miss every path
      // derived from `base()`. Left out, `dbui component Treemap` answered
      // ERR_UNKNOWN_COMPONENT for a component that ships with full JSDoc, and an
      // agent that cannot find a chart builds one out of divs instead. `dbui-chat`
      // had the same hole for longer and it was harder to see, because the whole
      // category was missing rather than one component inside a category.
      viz: path.join(ROOT, base().replace(/dbui$/, "dbui-viz"), "src/components"),
      chat: path.join(ROOT, base().replace(/dbui$/, "dbui-chat"), "src/components"),
      icons: path.join(ROOT, base(), "src/components/icons"),
      lib: path.join(ROOT, base(), "src/lib"),
      tokens: path.join(ROOT, base(), "src/tokens"),
      docs: path.join(ROOT, base(), "docs"),
      skills: path.join(ROOT, base(), "skills"),
      composition: path.join(ROOT, base(), "composition.md"),
      design: path.join(ROOT, base(), "DESIGN.md"),
    }
  : null;

export function read(file) {
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    return null;
  }
}

export function listFiles(dir, ext = ".tsx") {
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(ext))
      .sort();
  } catch {
    return [];
  }
}

export class DbuiError extends Error {
  constructor(message, code, suggestions = []) {
    super(message);
    this.code = code;
    this.suggestions = suggestions;
  }
}

/** Cheap edit distance for "did you mean" suggestions. */
export function similar(needle, haystack, limit = 3) {
  const n = needle.toLowerCase();
  const score = (s) => {
    const t = s.toLowerCase();
    if (t === n) return 0;
    if (t.startsWith(n) || n.startsWith(t)) return 1;
    if (t.includes(n) || n.includes(t)) return 2;
    let d = 0;
    for (let i = 0; i < Math.max(t.length, n.length); i++) if (t[i] !== n[i]) d++;
    return 3 + d;
  };
  return haystack
    .map((s) => ({ name: s, s: score(s) }))
    .filter((x) => x.s < 8)
    .sort((a, b) => a.s - b.s)
    .slice(0, limit)
    .map((x) => ({ name: x.name, reason: "similar name" }));
}
