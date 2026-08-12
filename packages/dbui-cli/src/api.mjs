import path from "node:path";
import { PATHS, read, listFiles, DbuiError, similar } from "./repo.mjs";

export const API_VERSION = 1;

const envelope = (type, data, meta) => ({ apiVersion: API_VERSION, type, data, ...(meta ? { meta } : {}) });

function requireRepo() {
  if (!PATHS) {
    throw new DbuiError(
      "Could not locate DBUI. Run from inside the design system repo, from a project with a vendored ./dbui directory, or set DBUI_ROOT.",
      "ERR_DBUI_NOT_FOUND",
    );
  }
}

/* ---------------------------------------------------------- components --- */

/** Pulls the annotation block a component declares about itself. */
function parseJsdoc(src) {
  const out = { guidelines: [], constraints: [], figma: null, standard: null, summary: null };
  for (const block of src.match(/\/\*\*[\s\S]*?\*\//g) ?? []) {
    // Strip the delimiters first. Doing it after the per-line asterisk strip
    // turns the closing ` */` into a bare `/`, which then reads as content.
    const body = block
      .replace(/^\/\*\*/, "")
      .replace(/\*\/$/, "")
      .replace(/^\s*\*\s?/gm, "");
    // A tag runs to the next tag or the end of the block, so an indented line
    // continues the tag above it and `@constraints` opens a list rather than
    // naming one rule. Reading each line on its own truncated every wrapped
    // tag, dropped all four `@constraints` blocks — including Button's
    // aria-label requirement — and promoted the orphaned remainder to summary.
    const prose = [];
    let open = null;
    const openTag = (list, text) => {
      list.push(text);
      open = list;
    };
    for (const line of body.split("\n")) {
      const t = line.trim();
      if (t.startsWith("@standard ")) (out.standard = t.slice(10).trim()), (open = null);
      else if (t.startsWith("@guideline ")) openTag(out.guidelines, t.slice(11).trim());
      else if (t.startsWith("@constraint ")) openTag(out.constraints, t.slice(12).trim());
      else if (t === "@constraints") open = out.constraints;
      else if (t.startsWith("@figma ")) (out.figma = t.slice(7).trim()), (open = null);
      else if (t.startsWith("@")) open = null;
      else if (open && t.startsWith("- ")) open.push(t.slice(2).trim());
      else if (open && t && open.length && /^\s/.test(line)) open[open.length - 1] += ` ${t}`;
      else if (t) (open = null), prose.push(t);
    }
    if (!out.summary && prose[0] && !prose[0].startsWith("use client")) out.summary = prose[0];
  }
  return out;
}

function parseExports(src) {
  const names = new Set();
  for (const m of src.matchAll(/export\s+(?:function|const)\s+([A-Za-z0-9_]+)/g)) names.add(m[1]);
  for (const m of src.matchAll(/export\s*\{([^}]+)\}/g)) {
    for (const part of m[1].split(",")) {
      const name = part.split(/\s+as\s+/).pop().trim();
      if (name && !name.startsWith("type ")) names.add(name);
    }
  }
  return [...names].filter((n) => /^[A-Z]/.test(n)).sort();
}

/** Returns the body of the object literal that starts at `open`, brace-matched. */
function block(src, open) {
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") {
      depth--;
      if (depth === 0) return src.slice(open + 1, i);
    }
  }
  return "";
}

/**
 * CVA variant axes, so an agent sees the real prop values. Brace-matched rather
 * than window-sliced: a fixed window truncates long axes and bleeds keys in
 * from defaultVariants and compoundVariants.
 */
function parseVariants(src) {
  const at = src.search(/\bvariants\s*:\s*\{/);
  if (at === -1) return {};
  const body = block(src, src.indexOf("{", at));
  const axes = {};
  const axisRe = /(?:^|\n)\s*([a-zA-Z][a-zA-Z0-9]*)\s*:\s*\{/g;
  let m;
  while ((m = axisRe.exec(body)) !== null) {
    const axisBody = block(body, body.indexOf("{", m.index + m[0].length - 1));
    const values = [];
    // Only top-level keys of the axis object are variant values. Two traps:
    // an axis whose value is an array of class strings keeps its contents at
    // brace-depth zero, and a Tailwind variant prefix inside such a string
    // ("hover:bg-…") reads as a quoted key unless the closing quote is
    // required. Track brackets as well as braces, and demand a balanced quote.
    const KEY = /^\s*(?:([A-Za-z][A-Za-z0-9-]*)|"([A-Za-z][A-Za-z0-9-]*)")\s*:/;
    let depth = 0;
    for (const line of axisBody.split("\n")) {
      if (depth === 0) {
        const key = line.match(KEY);
        if (key) values.push(key[1] ?? key[2]);
      }
      const open = (line.match(/[{[]/g) ?? []).length;
      const close = (line.match(/[}\]]/g) ?? []).length;
      depth += open - close;
    }
    if (values.length) axes[m[1]] = values;
    axisRe.lastIndex = m.index + m[0].length;
  }
  return axes;
}

/** Compare component names without case or separators ("Toggle Button" → "togglebutton"). */
const handle = (s) => String(s ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");

/* -------------------------------------------------------- compositions --- */

/**
 * Worked compositions out of figma-mapping.md, keyed by component slug.
 *
 * A Figma variant switcher often maps to a different subtree rather than a
 * prop, and a prop list cannot say so — which is how an agent ends up building
 * a one-off instead of composing what exists. The doc owns the recipes; this
 * parser is the only thing that reads them, so the CLI and the MCP server both
 * serve the same text.
 *
 * Shape the doc must keep: `## Title · \`slug\`` opens a family, `#### Name`
 * followed by a tsx fence is one recipe.
 */
let _compositions = null;
export function compositions() {
  requireRepo();
  if (_compositions) return _compositions;
  const md = read(path.join(PATHS.docs, "figma-mapping.md")) ?? "";
  const lines = md.split("\n");
  const out = {};
  let slug = null;
  let recipe = null;
  for (let i = 0; i < lines.length; i++) {
    const family = lines[i].match(/^##\s+.+?·\s*`([a-z0-9-]+)`/);
    if (family) {
      slug = family[1];
      recipe = null;
      continue;
    }
    // Any other h2 closes the family. `###`/`####` do not match: the character
    // after `##` has to be whitespace.
    if (/^##\s/.test(lines[i])) {
      slug = null;
      recipe = null;
      continue;
    }
    const head = lines[i].match(/^####\s+(.+?)\s*$/);
    if (head) {
      recipe = head[1];
      continue;
    }
    if (slug && recipe && lines[i].trim() === "```tsx") {
      const body = [];
      for (i += 1; i < lines.length && lines[i].trim() !== "```"; i++) body.push(lines[i]);
      (out[slug] ??= []).push({ name: recipe, code: body.join("\n").trim() });
      recipe = null;
    }
  }
  _compositions = out;
  return out;
}

export function compositionList() {
  const all = compositions();
  return envelope("composition.list", {
    total: Object.values(all).reduce((a, r) => a + r.length, 0),
    families: Object.entries(all).map(([slug, recipes]) => ({
      slug,
      recipes: recipes.map((r) => r.name),
    })),
  });
}

export function composition(name, recipe) {
  const all = compositions();
  const key = handle(name);
  const slug = Object.keys(all).find((s) => handle(s) === key);
  if (!slug) {
    throw new DbuiError(
      `No compositions for "${name}"`,
      "ERR_UNKNOWN_COMPOSITION",
      similar(name, Object.keys(all)),
    );
  }
  let recipes = all[slug];
  if (recipe) {
    const want = handle(recipe);
    recipes = recipes.filter((r) => handle(r.name).includes(want));
    if (!recipes.length) {
      throw new DbuiError(
        `No composition named "${recipe}" under ${slug}`,
        "ERR_UNKNOWN_COMPOSITION",
        all[slug].map((r) => ({ name: r.name, reason: "available recipe" })),
      );
    }
  }
  return envelope("composition.detail", { slug, recipes });
}

/** The discovery table — category, what to use it for, what not to. */
function indexRows() {
  const md = read(path.join(PATHS.docs, "component-index.md"));
  if (!md) return {};
  const rows = {};
  let category = null;
  for (const line of md.split("\n")) {
    const h = line.match(/^###\s+`([a-z]+)`/);
    if (h) { category = h[1]; continue; }
    const cells = line.match(/^\|(.+)\|$/);
    if (!cells || !category) continue;
    const parts = cells[1].split("|").map((c) => c.trim());
    const name = parts[0]?.match(/`([A-Za-z0-9]+)`/)?.[1];
    if (!name) continue;
    rows[name] = {
      category,
      useFor: parts[1] ?? "",
      avoidFor: parts[2] ?? "",
      synonyms: (parts[3] ?? "").split(",").map((s) => s.trim()).filter(Boolean),
      figmaLayer: parts[4] ?? "",
    };
  }
  return rows;
}

let _components = null;
export function components() {
  requireRepo();
  if (_components) return _components;
  const rows = indexRows();
  const rowsByHandle = new Map(Object.entries(rows).map(([k, v]) => [handle(k), v]));
  const recipes = compositions();
  const out = {};
  for (const file of listFiles(PATHS.ui)) {
    const slug = file.replace(/\.tsx$/, "");
    const src = read(path.join(PATHS.ui, file)) ?? "";
    const doc = parseJsdoc(src);
    const exports = parseExports(src);
    // Several components keep their CVA in lib/*-variants.ts so it can be
    // shared. Follow the import so the prop axes still surface.
    const variantImport = src.match(/from\s+"\.\.\/\.\.\/lib\/([a-z-]+variants)"/)?.[1];
    const variantSrc = variantImport ? (read(path.join(PATHS.lib, `${variantImport}.ts`)) ?? "") : "";
    const primary = doc.standard || exports[0] || slug;
    // The index is keyed by the component's export name, but `primary` may be a
    // prose name from JSDoc ("Toggle Button") and exports[0] is whichever export
    // happens to come first in the file. Try every handle we have, comparing
    // without case or separators, so a component is never silently uncategorized.
    const meta =
      rows[primary] ??
      rowsByHandle.get(handle(primary)) ??
      rowsByHandle.get(handle(slug)) ??
      exports.map((e) => rowsByHandle.get(handle(e))).find(Boolean) ??
      {};
    out[slug] = {
      name: primary,
      slug,
      exports,
      category: meta.category ?? null,
      summary: doc.summary,
      useFor: meta.useFor ?? null,
      avoidFor: meta.avoidFor ?? null,
      synonyms: meta.synonyms ?? [],
      guidelines: doc.guidelines,
      constraints: doc.constraints,
      figma: doc.figma,
      figmaLayer: meta.figmaLayer ?? null,
      variants: { ...parseVariants(variantSrc), ...parseVariants(src) },
      compositions: recipes[slug] ?? [],
      importPath: `dbui/components/ui/${slug}`,
      sourcePath: path.relative(PATHS.root, path.join(PATHS.ui, file)),
    };
  }
  _components = out;
  return out;
}

export function componentList() {
  const all = components();
  const byCategory = {};
  for (const c of Object.values(all)) {
    const k = c.category ?? "uncategorized";
    (byCategory[k] ??= []).push({ name: c.name, slug: c.slug, useFor: c.useFor });
  }
  return envelope("component.list", { total: Object.keys(all).length, categories: byCategory });
}

export function component(name) {
  const all = components();
  const key = name.toLowerCase();
  const hit =
    all[key] ??
    Object.values(all).find((c) => c.name.toLowerCase() === key) ??
    Object.values(all).find((c) => c.exports.some((e) => e.toLowerCase() === key));
  if (!hit) {
    throw new DbuiError(
      `No component named "${name}"`,
      "ERR_UNKNOWN_COMPONENT",
      similar(name, Object.values(all).map((c) => c.name)),
    );
  }
  return envelope("component.detail", hit);
}

/* --------------------------------------------------------------- icons --- */

let _icons = null;
export function icons() {
  requireRepo();
  if (_icons) return _icons;
  const cls = read(path.join(PATHS.icons, "classifications.ts")) ?? "";
  const desc = read(path.join(PATHS.icons, "descriptions.ts")) ?? "";
  const classification = {};
  for (const m of cls.matchAll(/"([A-Za-z0-9]+)":\s*"(action|object|indicator|component)"/g)) {
    classification[m[1]] = m[2];
  }
  const out = {};
  for (const m of desc.matchAll(/"([A-Za-z0-9]+)":\s*"([^"]*)"/g)) {
    const [label, ...rest] = m[2].split("|").map((s) => s.trim());
    out[m[1]] = {
      name: m[1],
      category: classification[m[1]] ?? null,
      label,
      area: rest.length > 1 ? rest[0] : null,
      synonyms: (rest.length > 1 ? rest[1] : rest[0] ?? "").split(",").map((s) => s.trim()).filter(Boolean),
      importPath: `dbui/components/icons/${m[1]}`,
    };
  }
  for (const name of Object.keys(classification)) {
    out[name] ??= { name, category: classification[name], label: name, area: null, synonyms: [], importPath: `dbui/components/icons/${name}` };
  }
  _icons = out;
  return out;
}

export function iconList(category) {
  const all = icons();
  const items = Object.values(all).filter((i) => !category || i.category === category);
  const byCategory = {};
  for (const i of items) (byCategory[i.category ?? "unclassified"] ??= []).push(i.name);
  return envelope("icon.list", { total: items.length, categories: byCategory });
}

export function icon(name) {
  const all = icons();
  const hit = all[name] ?? Object.values(all).find((i) => i.name.toLowerCase() === name.toLowerCase());
  if (!hit) throw new DbuiError(`No icon named "${name}"`, "ERR_UNKNOWN_ICON", similar(name, Object.keys(all)));
  return envelope("icon.detail", hit);
}

/* -------------------------------------------------------------- shells --- */

let _shells = null;
export function shells() {
  requireRepo();
  if (_shells) return _shells;
  const md = read(PATHS.composition) ?? "";
  const out = {};
  const parts = md.split(/^### Shell /m).slice(1);
  for (const part of parts) {
    const header = part.split("\n")[0];
    const letter = header.trim()[0];
    // [A-Z], not [A-E]: the class was pinned to the five shells that existed, so
    // adding a sixth left its letter in its own name.
    const title = header.replace(/^[A-Z]\s*—\s*/, "").trim();
    const section = (label) => {
      const m = part.match(new RegExp(`\\*\\*${label}[^*]*:?\\*\\*\\s*([\\s\\S]*?)(?=\\n\\*\\*|\\n---|$)`));
      return m ? m[1].trim() : null;
    };
    const bullets = (text) =>
      text ? text.split("\n").map((l) => l.replace(/^[-\d.]+\s*/, "").trim()).filter(Boolean) : [];
    out[letter] = {
      id: letter,
      name: title,
      purpose: section("Purpose")?.replace(/\.$/, "") ?? null,
      regions: bullets(section("Regions")),
      scaling: section("Scaling"),
      scroll: section("Scroll"),
      primaryAction: section("Primary action location"),
      adjacency: bullets(section("Adjacency")),
    };
  }
  _shells = out;
  return out;
}

export function shellList() {
  const all = shells();
  return envelope("shell.list", {
    total: Object.keys(all).length,
    shells: Object.values(all).map((s) => ({ id: s.id, name: s.name, purpose: s.purpose })),
  });
}

export function shell(id) {
  const all = shells();
  const key = id.trim().toUpperCase().replace(/^SHELL\s*/, "")[0];
  const hit = all[key] ?? Object.values(all).find((s) => s.name.toLowerCase().includes(id.toLowerCase()));
  if (!hit) throw new DbuiError(`No shell "${id}"`, "ERR_UNKNOWN_SHELL", Object.keys(all).map((k) => ({ name: k, reason: "available shell" })));
  return envelope("shell.detail", hit);
}

/* -------------------------------------------------------------- tokens --- */

/**
 * The body of one top-level block, brace-counted rather than sliced to the next
 * selector.
 *
 * `dark` used to run from `.dark` to the end of the file, which was correct only
 * while nothing after it declared a `--db-*` a reader would mistake for a dark
 * value. The theme blocks do — `[data-theme="core"]` restates the shape roles at
 * their Core values — so an unbounded slice reported a dark value for tokens
 * that have no dark variant, and would have reported the last theme's value as
 * "dark" for the ones that do.
 */
function cssBlock(css, selector) {
  const start = css.indexOf(`\n${selector} {\n`);
  if (start < 0) return "";
  const open = start + selector.length + 3;
  const end = css.indexOf("\n}", open);
  return end < 0 ? "" : css.slice(open, end);
}

export function tokens(group) {
  requireRepo();
  const css = read(path.join(PATHS.tokens, "tokens.css")) ?? "";
  const root = cssBlock(css, ":root");
  const dark = cssBlock(css, ".dark");
  const groups = {};
  for (const m of root.matchAll(/^\s*--db-([a-z0-9-]+)\s*:\s*([^;]+);/gm)) {
    const name = m[1];
    const g = name.split("-")[0];
    const d = dark.match(new RegExp(`--db-${name}\\s*:\\s*([^;]+);`));
    (groups[g] ??= []).push({
      token: `--db-${name}`,
      utility: `${name}`,
      light: m[2].trim(),
      dark: d ? d[1].trim() : null,
    });
  }
  if (group) {
    if (!groups[group]) {
      throw new DbuiError(`No token group "${group}"`, "ERR_UNKNOWN_TOKEN_GROUP", Object.keys(groups).map((g) => ({ name: g, reason: "available group" })));
    }
    return envelope("token.detail", { group, tokens: groups[group] });
  }
  const total = Object.values(groups).reduce((a, g) => a + g.length, 0);
  return envelope("token.list", { total, groups: Object.fromEntries(Object.entries(groups).map(([k, v]) => [k, v.length])) });
}

/* ---------------------------------------------------------------- docs --- */

const DOC_TOPICS = {
  design: () => ({ file: PATHS.design, title: "Design language" }),
  composition: () => ({ file: PATHS.composition, title: "Page shells and composition" }),
  brandvoice: () => ({ file: path.join(PATHS.docs, "brandvoice.md"), title: "Voice and tone" }),
  "component-rules": () => ({ file: path.join(PATHS.docs, "component-rules.md"), title: "Cross-cutting component rules" }),
  tokens: () => ({ file: path.join(PATHS.docs, "tokens.md"), title: "Token system" }),
  "token-rules": () => ({ file: path.join(PATHS.docs, "token-rules.md"), title: "Token contract" }),
  "component-index": () => ({ file: path.join(PATHS.docs, "component-index.md"), title: "Component index" }),
  "icon-index": () => ({ file: path.join(PATHS.docs, "icon-index.md"), title: "Icon index" }),
  "figma-mapping": () => ({ file: path.join(PATHS.docs, "figma-mapping.md"), title: "Figma layer to React composition" }),
};

export function docsList() {
  requireRepo();
  return envelope("docs.list", {
    topics: Object.keys(DOC_TOPICS).map((k) => ({ topic: k, title: DOC_TOPICS[k]().title })),
  });
}

export function docs(topic) {
  requireRepo();
  const t = DOC_TOPICS[topic];
  if (!t) throw new DbuiError(`No docs topic "${topic}"`, "ERR_UNKNOWN_TOPIC", similar(topic, Object.keys(DOC_TOPICS)));
  const { file, title } = t();
  const body = read(file);
  if (!body) throw new DbuiError(`Docs topic "${topic}" has no file at ${file}`, "ERR_NO_DOC");
  return envelope("docs.detail", { topic, title, body });
}

/* -------------------------------------------------------------- search --- */

/**
 * Words that carry no discriminating power in a query about a design system.
 * Dropped so `pick a date` searches for `pick` and `date` rather than failing on
 * the `a`, and so a stray article cannot turn an all-terms match into a partial.
 */
const SEARCH_STOPWORDS = new Set([
  "a", "an", "the", "of", "for", "to", "in", "on", "with", "and", "or",
  "my", "your", "that", "this", "is", "are", "be", "it", "as", "at", "by",
]);

/** A query, split into the terms worth matching. */
function searchTerms(query) {
  return query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length >= 2 && !SEARCH_STOPWORDS.has(t));
}

/**
 * One term against one haystack, tolerant of a trailing plural.
 *
 * `breadcrumbs` should find `Breadcrumb` and `tab` should find `Tabs`, and
 * neither is worth a stemmer: the whole vocabulary is component and icon names,
 * where the only inflection that occurs is a plural s.
 */
function hasTerm(hay, term) {
  if (hay.includes(term)) return true;
  if (term.endsWith("s") && hay.includes(term.slice(0, -1))) return true;
  if (!term.endsWith("s") && hay.includes(`${term}s`)) return true;
  return false;
}

/**
 * Search across every kind of thing the system publishes.
 *
 * ## Why the query is tokenized
 *
 * This matched the whole query as one substring, so it answered a question
 * nobody asks. `table` returned 30 results and `data table` returned none —
 * not because the system has no table, but because no single field contains
 * that exact pair of words. Five of seven natural phrasings returned nothing:
 * `delete confirmation`, `loading state`, `pick a date`.
 *
 * That is the worst possible failure for the main discovery entry point,
 * because "No results" is a stronger claim than silence. An agent that asks for
 * a data table, is told the system has none, and builds one out of divs has
 * behaved reasonably on the evidence it was given.
 *
 * ## All terms, then any term
 *
 * A result must match every term to rank as a full hit. If nothing matches
 * every term, the same candidates are ranked by how many they do match and
 * returned as partial, so the caller sees the near misses rather than a dead
 * end. Precision when it exists, a direction when it does not — never nothing.
 */
export function search(query, { type, limit = 20 } = {}) {
  requireRepo();
  const q = query.toLowerCase();
  const terms = searchTerms(query);
  // A query of nothing but stopwords still has to mean something.
  const needles = terms.length ? terms : [q].filter(Boolean);

  const results = [];
  /**
   * `rank` orders within a match quality; `hits` is how many terms landed.
   * Sorting on hits first keeps a full match above a better-ranked partial.
   */
  const consider = (kind, name, description, command, hay, rank) => {
    const lower = hay.toLowerCase();
    const hits = needles.filter((t) => hasTerm(lower, t)).length;
    if (hits === 0) return;
    results.push({ type: kind, name, description, command, score: rank, hits });
  };

  if (!type || type === "component") {
    for (const c of Object.values(components())) {
      const hay = [c.name, c.slug, c.useFor ?? "", c.summary ?? "", ...c.synonyms, ...c.exports].join(" ");
      const exact = c.name.toLowerCase() === q || c.slug === q;
      const nameHit = needles.every((t) => hasTerm(c.name.toLowerCase(), t));
      consider("component", c.name, c.useFor || c.summary || "", `dbui component ${c.slug}`, hay, exact ? 0 : nameHit ? 1 : 2);
    }
  }
  if (!type || type === "icon") {
    for (const i of Object.values(icons())) {
      const hay = [i.name, i.label, ...i.synonyms].join(" ");
      const exact = i.name.toLowerCase() === q;
      const nameHit = needles.every((t) => hasTerm(i.name.toLowerCase(), t));
      consider("icon", i.name, `${i.category ?? "?"} — ${i.label}`, `dbui icon ${i.name}`, hay, exact ? 0 : nameHit ? 1 : 3);
    }
  }
  if (!type || type === "composition") {
    for (const [slug, recipes] of Object.entries(compositions())) {
      for (const r of recipes) {
        const hay = `${slug} ${r.name} ${r.code}`;
        const nameHit = needles.every((t) => hasTerm(r.name.toLowerCase(), t));
        consider("composition", `${slug} — ${r.name}`, "worked composition", `dbui composition ${slug} "${r.name}"`, hay, nameHit ? 0 : 2);
      }
    }
  }
  if (!type || type === "shell") {
    for (const s of Object.values(shells())) {
      const hay = `${s.id} ${s.name} ${s.purpose ?? ""}`;
      consider("shell", `Shell ${s.id} — ${s.name}`, s.purpose ?? "", `dbui shell ${s.id}`, hay, 1);
    }
  }
  if (!type || type === "doc") {
    for (const [topic, fn] of Object.entries(DOC_TOPICS)) {
      const { title } = fn();
      consider("doc", topic, title, `dbui docs ${topic}`, `${topic} ${title}`, 2);
    }
  }

  const full = results.filter((r) => r.hits === needles.length);
  const kept = full.length ? full : results;
  kept.sort((a, b) => b.hits - a.hits || a.score - b.score || a.name.localeCompare(b.name));

  return envelope("search", {
    query,
    terms: needles,
    // `partial` tells the caller these matched some terms and not all, so a
    // reader knows the difference between "here it is" and "nearest thing".
    matched: full.length ? "all" : "partial",
    total: kept.length,
    results: kept.slice(0, limit).map(({ hits, ...r }) => r),
  });
}

/* --------------------------------------------------------------- check --- */

export async function check(target) {
  requireRepo();
  const { spawnSync } = await import("node:child_process");
  const script = path.join(PATHS.root, "scripts/design-lint/react-lint.js");
  const res = spawnSync(process.execPath, [script, target, "--json"], { encoding: "utf8", cwd: PATHS.root });
  if (res.error) throw new DbuiError(`Could not run the design linter: ${res.error.message}`, "ERR_CHECK_FAILED");
  let parsed = null;
  try {
    parsed = JSON.parse(res.stdout);
  } catch {
    throw new DbuiError("The design linter did not return JSON.", "ERR_CHECK_FAILED", [{ name: "stdout", reason: res.stdout.slice(0, 200) }]);
  }
  /*
    react-lint.js --json prints a bare array. Spreading it into an object gave
    { target, 0: {...}, 1: {...} }, so the renderer's `d.findings` was undefined
    and every file came back clean — on the one path AGENTS.md tells agents to
    run before landing.
  */
  const findings = Array.isArray(parsed) ? parsed : (parsed.findings ?? []);
  const summary = findings.reduce(
    (acc, f) => ({ ...acc, [f.level]: (acc[f.level] ?? 0) + 1 }),
    { error: 0, warning: 0, info: 0 }
  );
  return envelope("check", { target, summary, findings });
}

/* -------------------------------------------------------------- doctor --- */

export function doctor() {
  const checks = [];
  const add = (name, status, detail, fix) => checks.push({ name, status, detail, ...(fix ? { fix } : {}) });

  if (!PATHS) {
    add("DBUI located", "fail", "No DBUI source found.", "Run from the repo, from a project with ./dbui, or set DBUI_ROOT.");
    return envelope("doctor", { checks, summary: { pass: 0, warn: 0, fail: 1 } });
  }
  add("DBUI located", "pass", PATHS.root);

  const n = Object.keys(components()).length;
  add("Components readable", n > 0 ? "pass" : "fail", `${n} components parsed from source.`);

  const ic = Object.keys(icons()).length;
  add("Icons readable", ic > 0 ? "pass" : "fail", `${ic} icons indexed.`);

  const sh = Object.keys(shells()).length;
  add("Shells readable", sh > 0 ? "pass" : "warn", `${sh} shells parsed from composition.md.`);

  const tk = tokens().data.total;
  add("Tokens generated", tk > 0 ? "pass" : "fail", `${tk} --db-* properties in tokens.css.`, tk ? null : "Run yarn design:tokens.");

  const missingDoc = Object.entries(DOC_TOPICS).filter(([, fn]) => !read(fn().file)).map(([k]) => k);
  add("Docs present", missingDoc.length === 0 ? "pass" : "warn", missingDoc.length ? `Missing: ${missingDoc.join(", ")}` : "All topics resolve.");

  // Components the index marks excluded, internal or deprioritized are not meant
  // to carry guidelines. Counting them made this warning read four times worse
  // than it is, which trains people to ignore it.
  const missingGuideline = Object.values(components()).filter(
    (c) => c.guidelines.length === 0 && !/excluded|utility|internal|deprioriti/i.test(c.name)
  );
  const undocumented = missingGuideline.length;
  add(
    "Component annotations",
    undocumented === 0 ? "pass" : "warn",
    `${undocumented} component(s) have no @guideline.`,
    undocumented ? `Agents fall back to guessing for these: ${missingGuideline.map((c) => c.name).join(", ")}.` : null
  );

  const uncategorized = Object.values(components()).filter((c) => !c.category).length;
  add("Index coverage", uncategorized === 0 ? "pass" : "warn", `${uncategorized} component(s) are not in component-index.md.`, uncategorized ? "They will not surface in category listings." : null);

  const summary = {
    pass: checks.filter((c) => c.status === "pass").length,
    warn: checks.filter((c) => c.status === "warn").length,
    fail: checks.filter((c) => c.status === "fail").length,
  };
  return envelope("doctor", { checks, summary });
}

/* ------------------------------------------------------------ manifest --- */

export function manifest(commands) {
  return envelope("manifest", {
    name: "dbui",
    apiVersion: API_VERSION,
    description: "DBUI design system CLI — components, icons, shells, tokens, docs",
    globalOptions: [
      { flag: "--json", type: "boolean", description: "Typed JSON envelope" },
      { flag: "--dense", type: "boolean", description: "Token-efficient text for AI context windows" },
    ],
    commands,
  });
}
