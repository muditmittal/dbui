#!/usr/bin/env node
/**
 * Figma token audit and lint — composes a `use_figma` payload that inspects
 * variable bindings per component. Prints the JS body to inject; an MCP host
 * runs it against the library file.
 *
 *   yarn design:audit:figma --page Components            # per-component token sets
 *   yarn design:audit:figma --page Components --mode lint
 *   yarn design:audit:figma --page Components --slice 0:48
 *
 * WHY THIS EXISTS SEPARATELY FROM figma-lint.js
 * `figma-lint.js` judges a frame against the token VALUES — is this hex on the
 * palette, is this padding on the scale. It answers "does this look right", and
 * it passes a layer that renders the correct 16px from a variable that was
 * deleted six months ago. This file judges the BINDING instead: which variable
 * is attached, whether it still exists, which collection it came from, and
 * whether the family matches the property. Those are invisible to a value
 * check, by construction, because a stale binding resolves to the right value.
 *
 * THE SIX RULES, AND THE DEFECT EACH ONE WAS WRITTEN FOR
 *
 *   dangling-variable        A binding whose id is absent from
 *                            getLocalVariablesAsync while its collection still
 *                            reports remote:false. Figma keeps resolving a
 *                            deleted variable by id, so it renders correctly and
 *                            shows as unbound in the UI. 12,980 space bindings
 *                            were in this state — 69% of all spacing in the file
 *                            — because scale/* moved to a new collection and the
 *                            bindings were never re-pointed. Nothing caught it.
 *
 *   deprecated-collection    Bound to "Primitives (old)" or "Semantic (old)".
 *                            66 live bindings, concentrated in AssistantPanel.
 *
 *   wrong-family-binding     A dimensional property bound to another family's
 *                            variable — Segment Control's height reads
 *                            space/space-6 rather than size/size-6. Renders at
 *                            24px either way, so it survives every value check,
 *                            and it breaks the moment the two families diverge.
 *
 *   primitive-direct         Bound straight into the authoring-only Primitives
 *                            collection, bypassing the semantic layer. The
 *                            color analogy the system is built on says
 *                            primitives never ship.
 *
 *   container-chrome         A COMPONENT_SET's own fill or stroke bound to a
 *                            product token. The variant container's dashed
 *                            border is editor chrome that renders in no variant,
 *                            so this is always a mistake — and it made a
 *                            categorical chart color look like the most widely
 *                            adopted token in the library, on 21 form controls.
 *
 *   unbound-property         A raw value where a token belongs: padding on an
 *                            auto-layout frame, a non-zero corner radius, a
 *                            stroke weight under a visible stroke, a solid fill.
 *                            Worse than a wrong binding, because a wrong binding
 *                            at least names a token.
 *
 * Audit mode emits one pipe-delimited line per component holding the DISTINCT
 * set of tokens bound anywhere inside it. Counts are deliberately not emitted:
 * Figma stores a binding per variant, so Button's 77 variants carry 770 space
 * bindings where the React variant table declares four. Diffing those numbers
 * produces a 190x discrepancy that means nothing. The set is the comparable unit.
 */
"use strict"
const fs = require("node:fs")
const path = require("node:path")

const args = process.argv.slice(2)
const flag = (name, fallback) => {
  const i = args.indexOf(name)
  return i === -1 || !args[i + 1] ? fallback : args[i + 1]
}

const page = flag("--page", "Components")
const mode = flag("--mode", "audit")
const slice = flag("--slice", "0:9999")
if (!["audit", "lint"].includes(mode)) {
  console.error(`Unknown --mode ${mode}. Expected "audit" or "lint".`)
  process.exit(1)
}
const [from, to] = slice.split(":").map((n) => Number(n) || 0)

/**
 * The shipped token names, so the runtime can flag a Figma style or variable
 * that a designer can pick and no code token implements. Read from the
 * generated CSS rather than listed, so a token that starts shipping stops being
 * reported without anyone editing this file. `elevation/focus` and the
 * `brand/gradient` paint style are the two that currently fail it.
 */
const tokensCss = fs.readFileSync(path.join(__dirname, "../../packages/dbui/src/tokens/tokens.css"), "utf-8")
const typeCss = fs.readFileSync(path.join(__dirname, "../../packages/dbui/src/tokens/type.css"), "utf-8")
const shipped = [
  ...new Set([
    ...[...tokensCss.matchAll(/^\s*(--db-[a-z0-9-]+):/gm)].map((m) => m[1].replace(/^--db-/, "")),
    ...[...typeCss.matchAll(/@utility (type-[a-z0-9-]+)/g)].map((m) => m[1]),
  ]),
]

const body = `
const PAGE = ${JSON.stringify(page)};
const MODE = ${JSON.stringify(mode)};
const SLICE = [${from}, ${to}];
const SHIPPED = new Set(${JSON.stringify(shipped)});

/* Collections are identified by NAME, not id, so the script survives a file
 * copy or a branch where the ids differ. */
const DEPRECATED_NAMES = new Set(["Primitives (old)", "Semantic (old)"]);
const PRIMITIVE_NAME = "Primitives";

const SPACE = ['paddingLeft','paddingRight','paddingTop','paddingBottom','itemSpacing','counterAxisSpacing'];
const SIZE  = ['width','height','minWidth','maxWidth','minHeight','maxHeight'];
const RAD   = ['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius'];
const BW    = ['strokeWeight','strokeTopWeight','strokeBottomWeight','strokeLeftWeight','strokeRightWeight'];
const TYPEF = ['fontSize','lineHeight','letterSpacing','fontFamily','fontWeight','fontStyle','paragraphSpacing','paragraphIndent'];
const FIELD_FAM = {};
for (const f of SPACE) FIELD_FAM[f] = 'space';
for (const f of SIZE)  FIELD_FAM[f] = 'size';
for (const f of RAD)   FIELD_FAM[f] = 'radius';
for (const f of BW)    FIELD_FAM[f] = 'border';
for (const f of TYPEF) FIELD_FAM[f] = 'type';
/* The group a dimensional family's variable must sit in. Typography is checked
 * by collection instead, because 'size/' means a box dimension in Dimensions and
 * a type stop in Typography — a tool keying on the group alone conflates them. */
const EXPECT_GROUP = { space: 'space', size: 'size', radius: 'radius', border: 'border' };
const FAMS = ['color','type','elevation','space','size','radius','border'];

const target = figma.root.children.find(p => p.name === PAGE || p.id === PAGE);
if (!target) throw new Error('No page named ' + PAGE + '. Pages: ' + figma.root.children.map(p => p.name).join(', '));
await figma.setCurrentPageAsync(target);

const isStr = (v) => typeof v === 'string' && v.length > 0;
const num = (v) => (typeof v === 'number' ? v : 0);
function insideComponent(n) {
  let p = n.parent;
  while (p && p.type !== 'PAGE') {
    if (p.type === 'COMPONENT' || p.type === 'COMPONENT_SET') return true;
    p = p.parent;
  }
  return false;
}
/* space/space-2 -> space-2 · surface/base -> surface-base. The dimensional
 * families repeat the group inside the leaf and color does not. */
function tokenName(n) {
  const parts = n.split('/');
  if (parts.length === 1) return parts[0];
  const g = parts[0], leaf = parts.slice(1).join('-');
  return (leaf === g || leaf.indexOf(g + '-') === 0) ? leaf : parts.join('-');
}

const collections = await figma.variables.getLocalVariableCollectionsAsync();
const collName = {};
for (const c of collections) collName[c.id] = c.name;
const localIds = new Set((await figma.variables.getLocalVariablesAsync()).map(v => v.id));

const roots = target.findAllWithCriteria({ types: ['COMPONENT','COMPONENT_SET'] }).filter(n => !insideComponent(n));
roots.sort((a, b) => a.name.localeCompare(b.name));
const scope = roots.slice(SLICE[0], SLICE[1]);

const varIds = new Set(), styleIds = new Set();
const per = [];

for (const root of scope) {
  const nodes = root.findAll(() => true);
  nodes.push(root);
  const rec = {
    name: root.name,
    variants: root.type === 'COMPONENT_SET' ? root.children.length : 1,
    ids: {}, styles: {}, binds: [], chrome: [],
    ub: { space: 0, radius: 0, border: 0, color: 0, type: 0, elevation: 0 },
  };
  for (const k of FAMS) { rec.ids[k] = []; rec.styles[k] = []; }

  for (const node of nodes) {
    let bv = {};
    try { bv = node.boundVariables || {}; } catch (e) {}

    for (const f of Object.keys(FIELD_FAM)) {
      const b = bv[f];
      if (b && b.id) { rec.ids[FIELD_FAM[f]].push(b.id); rec.binds.push({ fam: FIELD_FAM[f], field: f, id: b.id, node: node.name }); varIds.add(b.id); }
    }
    /* A COMPONENT_SET's own paint is the variant container's dashed border. It
     * renders in no variant, so a token on it is chrome, not consumption. */
    const isContainer = node.type === 'COMPONENT_SET';
    for (const f of ['fills','strokes']) {
      const arr = bv[f];
      if (!Array.isArray(arr)) continue;
      for (const b of arr) {
        if (!b || !b.id) continue;
        if (isContainer) { rec.chrome.push({ field: f, id: b.id }); varIds.add(b.id); continue; }
        rec.ids.color.push(b.id); varIds.add(b.id);
      }
    }
    { const arr = bv.effects; if (Array.isArray(arr)) for (const b of arr) if (b && b.id) { rec.ids.elevation.push(b.id); varIds.add(b.id); } }

    try { if (isStr(node.textStyleId))   { rec.styles.type.push(node.textStyleId); styleIds.add(node.textStyleId); } } catch (e) {}
    try { if (isStr(node.effectStyleId)) { rec.styles.elevation.push(node.effectStyleId); styleIds.add(node.effectStyleId); } } catch (e) {}
    try { if (isStr(node.fillStyleId) && !isContainer)   { rec.styles.color.push(node.fillStyleId); styleIds.add(node.fillStyleId); } } catch (e) {}
    try { if (isStr(node.strokeStyleId) && !isContainer) { rec.styles.color.push(node.strokeStyleId); styleIds.add(node.strokeStyleId); } } catch (e) {}

    /* ── unbound-property ──
     * Padding only counts on an auto-layout frame: on a plain frame the property
     * exists and does nothing. Radius skips ELLIPSE and VECTOR, where a corner
     * radius is not a corner. Stroke weight accepts ANY of the five bindings,
     * because a component binding per-side weights was otherwise reported as
     * fully unbound — that false positive put 30 violations on Button alone. */
    try {
      if (node.layoutMode && node.layoutMode !== 'NONE') {
        for (const f of SPACE) { if (!(f in node)) continue; if (num(node[f]) > 0 && !bv[f]) rec.ub.space++; }
      }
    } catch (e) {}
    try {
      /* A COMPONENT_SET's own corner is the dashed variant frame and a SECTION's
       * is section chrome — Figma draws both at 5px and 2px respectively, in no
       * variant. Counting them put 133 phantom off-scale corners in the audit and
       * inflated the radius unbound total on every component set in the file. */
      if (node.type !== 'ELLIPSE' && node.type !== 'VECTOR' && !isContainer && node.type !== 'SECTION') {
        for (const f of RAD) { if (!(f in node)) continue; if (num(node[f]) > 0 && !bv[f] && !bv.cornerRadius) rec.ub.radius++; }
      }
    } catch (e) {}
    try {
      if (Array.isArray(node.strokes) && node.strokes.length > 0) {
        const anyBound = BW.some(f => bv[f]);
        let w = 0;
        if (typeof node.strokeWeight === 'number') w = node.strokeWeight;
        else for (const f of ['strokeTopWeight','strokeBottomWeight','strokeLeftWeight','strokeRightWeight']) w = Math.max(w, num(node[f]));
        if (w > 0 && !anyBound) rec.ub.border++;
      }
    } catch (e) {}
    try {
      if (!isContainer && Array.isArray(node.fills) && !isStr(node.fillStyleId)) {
        const fb = Array.isArray(bv.fills) ? bv.fills : [];
        for (let i = 0; i < node.fills.length; i++) { const p = node.fills[i]; if (p && p.visible !== false && p.type === 'SOLID' && !(fb[i] && fb[i].id)) rec.ub.color++; }
      }
      if (!isContainer && Array.isArray(node.strokes) && !isStr(node.strokeStyleId)) {
        const sb = Array.isArray(bv.strokes) ? bv.strokes : [];
        for (let i = 0; i < node.strokes.length; i++) { const p = node.strokes[i]; if (p && p.visible !== false && p.type === 'SOLID' && !(sb[i] && sb[i].id)) rec.ub.color++; }
      }
    } catch (e) {}
    try { if (node.type === 'TEXT' && !isStr(node.textStyleId)) rec.ub.type++; } catch (e) {}
    try {
      if (Array.isArray(node.effects) && node.effects.length > 0 && !isStr(node.effectStyleId)) {
        const eb = Array.isArray(bv.effects) ? bv.effects : [];
        for (let i = 0; i < node.effects.length; i++) { const ef = node.effects[i]; if (ef && ef.visible !== false && (ef.type === 'DROP_SHADOW' || ef.type === 'INNER_SHADOW') && !(eb[i] && eb[i].id)) rec.ub.elevation++; }
      }
    } catch (e) {}
  }
  per.push(rec);
}

/* Ids resolved once at the end rather than per node — 4,000 awaits inside the
 * traversal is what makes this time out on the Components page. */
const vinfo = {};
for (const id of varIds) {
  const v = await figma.variables.getVariableByIdAsync(id);
  if (!v) { vinfo[id] = { kind: 'gone', name: '(unresolvable)', raw: '' }; continue; }
  const cname = collName[v.variableCollectionId] || '(remote)';
  let kind = 'live';
  if (v.remote) kind = 'remote';
  else if (!localIds.has(id)) kind = 'dangling';
  else if (DEPRECATED_NAMES.has(cname)) kind = 'deprecated';
  else if (cname === PRIMITIVE_NAME) kind = 'primitive';
  vinfo[id] = { kind, name: tokenName(v.name), raw: v.name, collection: cname };
}
const sinfo = {};
for (const id of styleIds) {
  const s = await figma.getStyleByIdAsync(id);
  sinfo[id] = s ? { name: s.name, remote: !!s.remote, type: s.type } : null;
}

const violations = [];
const lines = [];

for (const rec of per) {
  const sets = [], anom = [];
  for (const k of FAMS) {
    const live = new Set();
    let dep = 0, dang = 0, rem = 0, prim = 0;
    for (const id of rec.ids[k]) {
      const i = vinfo[id];
      if (!i) continue;
      if (i.kind === 'live') live.add(i.name);
      else if (i.kind === 'deprecated') dep++;
      else if (i.kind === 'dangling') dang++;
      else if (i.kind === 'remote') rem++;
      else if (i.kind === 'primitive') prim++;
    }
    for (const id of rec.styles[k]) {
      const s = sinfo[id];
      if (!s) continue;
      if (s.remote) { rem++; continue; }
      const leaf = s.name.split('/').pop();
      live.add(k === 'type' ? 'type-' + leaf : k === 'elevation' ? 'elevation-' + leaf : tokenName(s.name));
    }
    sets.push(Array.from(live).sort().join(' '));
    if (rec.ub[k]) anom.push(k + ':unbound' + rec.ub[k]);
    if (dep)  anom.push(k + ':DEPRECATED' + dep);
    if (dang) anom.push(k + ':DANGLING' + dang);
    if (prim) anom.push(k + ':PRIMITIVE' + prim);
    if (rem)  anom.push(k + ':remote' + rem);
  }
  lines.push(rec.name + '|' + rec.variants + '|' + sets.join('|') + '|' + anom.join(' '));

  if (MODE !== 'lint') continue;

  const seen = {};
  const add = (rule, detail) => { const k = rule + '|' + detail; seen[k] = (seen[k] || 0) + 1; };

  for (const b of rec.binds) {
    const v = vinfo[b.id];
    if (!v) continue;
    if (v.kind === 'dangling')   add('dangling-variable', b.fam + ' ' + b.field + ' -> ' + v.raw);
    if (v.kind === 'deprecated') add('deprecated-collection', b.fam + ' ' + b.field + ' -> ' + v.raw + ' (' + v.collection + ')');
    if (v.kind === 'primitive')  add('primitive-direct', b.fam + ' ' + b.field + ' -> ' + v.raw);
    if (v.kind === 'live' || v.kind === 'dangling') {
      const group = v.raw.split('/')[0];
      if (b.fam === 'type') {
        if (v.collection !== 'Typography') add('wrong-family-binding', 'type ' + b.field + ' -> ' + v.raw + ' (' + v.collection + ')');
      } else if (EXPECT_GROUP[b.fam] && group !== EXPECT_GROUP[b.fam]) {
        add('wrong-family-binding', b.fam + ' ' + b.field + ' expects ' + EXPECT_GROUP[b.fam] + '/* but reads ' + v.raw);
      }
    }
  }
  for (const c of rec.chrome) {
    const v = vinfo[c.id];
    add('container-chrome', 'component-set ' + c.field + ' -> ' + (v ? v.raw : c.id));
  }
  for (const k of FAMS) {
    for (const id of rec.ids[k]) { const v = vinfo[id]; if (v && v.kind === 'live' && !SHIPPED.has(v.name)) add('no-code-token', k + ' variable ' + v.raw + ' has no --db-* counterpart'); }
    for (const id of rec.styles[k]) {
      const s = sinfo[id];
      if (!s || s.remote) continue;
      const leaf = s.name.split('/').pop();
      const nm = k === 'type' ? 'type-' + leaf : k === 'elevation' ? 'elevation-' + leaf : tokenName(s.name);
      if (!SHIPPED.has(nm)) add('no-code-token', k + ' style ' + s.name + ' has no --db-* counterpart');
    }
  }
  for (const k of Object.keys(rec.ub)) if (rec.ub[k]) add('unbound-property', k + ' x' + rec.ub[k]);

  for (const key of Object.keys(seen)) {
    const [rule, detail] = key.split('|');
    violations.push({ component: rec.name, rule, detail, count: seen[key] });
  }
}

if (MODE === 'lint') {
  const byRule = {};
  for (const v of violations) byRule[v.rule] = (byRule[v.rule] || 0) + v.count;
  return {
    page: target.name, mode: MODE, componentsScanned: per.length,
    totalsByRule: byRule,
    violations: violations.map(v => v.component + '|' + v.rule + '|' + v.detail + '|x' + v.count),
  };
}
return {
  page: target.name, mode: MODE, components: per.length,
  schema: 'name|variants|' + FAMS.join('|') + '|anomalies',
  note: 'family columns hold the DISTINCT token set, not a count — see the header comment in figma-token-audit.js',
  lines,
};
`

console.log(body)
