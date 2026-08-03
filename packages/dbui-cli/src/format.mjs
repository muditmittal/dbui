/**
 * Renderers for the API envelopes. `--json` prints the envelope untouched;
 * everything here is presentation only, so the CLI and the MCP server can never
 * disagree about the underlying data.
 */

const bullet = (s) => `  - ${s}`;
const heading = (s) => `\n${s}\n${"─".repeat(s.length)}`;

function componentDetail(c, dense) {
  const out = [];
  if (dense) {
    out.push(`${c.name} (${c.category ?? "?"}) import { ${c.exports.slice(0, 4).join(", ")} } from "${c.importPath}"`);
    if (c.useFor) out.push(`USE: ${c.useFor}`);
    if (c.avoidFor) out.push(`AVOID: ${c.avoidFor}`);
    for (const g of c.guidelines) out.push(`G: ${g}`);
    for (const k of c.constraints) out.push(`C: ${k}`);
    for (const [axis, vals] of Object.entries(c.variants)) out.push(`${axis}: ${vals.join("|")}`);
    return out.join("\n");
  }
  out.push(heading(c.name));
  if (c.summary) out.push(`\n${c.summary}`);
  out.push(`\nimport { ${c.exports.slice(0, 6).join(", ")} } from "${c.importPath}"`);
  if (c.category) out.push(`\nCategory: ${c.category}`);
  if (c.useFor) out.push(`Use for: ${c.useFor}`);
  if (c.avoidFor) out.push(`Avoid for: ${c.avoidFor}`);
  if (c.synonyms.length) out.push(`Synonyms: ${c.synonyms.join(", ")}`);
  if (Object.keys(c.variants).length) {
    out.push(heading("Props"));
    for (const [axis, vals] of Object.entries(c.variants)) out.push(bullet(`${axis}: ${vals.join(" | ")}`));
  }
  if (c.guidelines.length) {
    out.push(heading("Guidelines"));
    out.push(...c.guidelines.map(bullet));
  }
  if (c.constraints.length) {
    out.push(heading("Constraints"));
    out.push(...c.constraints.map(bullet));
  }
  if (c.exports.length > 6) out.push(heading("All exports"), `  ${c.exports.join(", ")}`);
  if (c.figma) out.push(heading("Figma"), `  ${c.figma}`);
  out.push(`\nSource: ${c.sourcePath}`);
  return out.join("\n");
}

function shellDetail(s, dense) {
  if (dense) {
    return [
      `Shell ${s.id} — ${s.name}`,
      s.purpose ? `PURPOSE: ${s.purpose}` : null,
      ...s.regions.map((r) => `REGION: ${r}`),
      s.scroll ? `SCROLL: ${s.scroll}` : null,
      s.primaryAction ? `PRIMARY: ${s.primaryAction}` : null,
      ...s.adjacency.map((a) => `ADJACENCY: ${a}`),
    ].filter(Boolean).join("\n");
  }
  const out = [heading(`Shell ${s.id} — ${s.name}`)];
  if (s.purpose) out.push(`\n${s.purpose}`);
  if (s.regions.length) out.push(heading("Regions"), ...s.regions.map(bullet));
  if (s.scaling) out.push(heading("Scaling"), `  ${s.scaling.replace(/\n/g, "\n  ")}`);
  if (s.scroll) out.push(heading("Scroll"), `  ${s.scroll.replace(/\n/g, "\n  ")}`);
  if (s.primaryAction) out.push(heading("Primary action"), `  ${s.primaryAction}`);
  if (s.adjacency.length) out.push(heading("Adjacency"), ...s.adjacency.map(bullet));
  return out.join("\n");
}

export function render(env, { dense = false } = {}) {
  const d = env.data;
  switch (env.type) {
    case "component.list": {
      const lines = [`${d.total} components\n`];
      for (const [cat, items] of Object.entries(d.categories)) {
        lines.push(`${cat} (${items.length})`);
        for (const i of items) lines.push(`  ${i.name.padEnd(18)} ${dense ? "" : (i.useFor ?? "").slice(0, 78)}`);
        lines.push("");
      }
      return lines.join("\n");
    }
    case "component.detail":
      return componentDetail(d, dense);

    case "icon.list": {
      const lines = [`${d.total} icons\n`];
      for (const [cat, names] of Object.entries(d.categories)) {
        lines.push(`${cat} (${names.length})`);
        lines.push(`  ${names.join(", ")}\n`);
      }
      return lines.join("\n");
    }
    case "icon.detail":
      return dense
        ? `${d.name} [${d.category}] ${d.label}${d.area ? ` | ${d.area}` : ""} | ${d.synonyms.join(", ")} | ${d.importPath}`
        : [
            heading(d.name),
            `\nCategory: ${d.category}`,
            `Label: ${d.label}`,
            d.area ? `Product area: ${d.area}` : null,
            d.synonyms.length ? `Synonyms: ${d.synonyms.join(", ")}` : null,
            `\nimport { ${d.name} } from "${d.importPath}"`,
          ].filter(Boolean).join("\n");

    case "shell.list":
      return [`${d.total} page shells\n`, ...d.shells.map((s) => `  ${s.id}  ${s.name}\n     ${s.purpose ?? ""}`)].join("\n");
    case "shell.detail":
      return shellDetail(d, dense);

    case "token.list":
      return [`${d.total} tokens\n`, ...Object.entries(d.groups).map(([g, n]) => `  ${g.padEnd(12)} ${n}`)].join("\n");
    case "token.detail":
      return [
        heading(d.group),
        ...d.tokens.map((t) => `  ${t.token.padEnd(34)} ${String(t.light).padEnd(26)} ${t.dark ?? ""}`),
      ].join("\n");

    case "docs.list":
      return ["Doc topics\n", ...d.topics.map((t) => `  ${t.topic.padEnd(18)} ${t.title}`)].join("\n");
    case "docs.detail":
      return d.body;

    case "search": {
      if (d.total === 0) return `No results for "${d.query}".`;
      const lines = [`${d.total} result(s) for "${d.query}"\n`];
      for (const r of d.results) {
        lines.push(`  [${r.type}] ${r.name}`);
        if (r.description) lines.push(`      ${r.description.slice(0, 96)}`);
        lines.push(`      → ${r.command}`);
      }
      return lines.join("\n");
    }

    case "check": {
      const lines = [`Design check — ${d.target}\n`];
      if (d.summary) lines.push(`  ${JSON.stringify(d.summary)}`);
      const findings = d.findings ?? d.issues ?? [];
      for (const f of findings.slice(0, 40)) {
        lines.push(`  ${(f.severity ?? "?").padEnd(8)} ${(f.rule ?? "").padEnd(24)} ${f.file ?? ""}:${f.line ?? ""}`);
        if (f.message) lines.push(`      ${f.message}`);
      }
      if (findings.length > 40) lines.push(`  … ${findings.length - 40} more`);
      return lines.join("\n");
    }

    case "doctor": {
      const sym = { pass: "PASS", warn: "WARN", fail: "FAIL" };
      const lines = ["dbui doctor\n"];
      for (const c of d.checks) {
        lines.push(`  ${sym[c.status]}  ${c.name}`);
        if (c.detail) lines.push(`        ${c.detail}`);
        if (c.fix) lines.push(`        fix: ${c.fix}`);
      }
      lines.push(`\n  ${d.summary.pass} passed, ${d.summary.warn} warning(s), ${d.summary.fail} failure(s)`);
      return lines.join("\n");
    }

    case "manifest":
      return [`${d.name} v${d.apiVersion}`, d.description, "", ...d.commands.map((c) => `  ${c.name.padEnd(12)} ${c.description}`)].join("\n");

    default:
      return JSON.stringify(d, null, 2);
  }
}
