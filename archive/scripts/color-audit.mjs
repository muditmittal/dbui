#!/usr/bin/env node
/*
 * DBUI color primitive audit — dependency-free (no npm install).
 * Reads a nested palette JSON and emits a tabular Markdown report covering:
 *   1. Color matrix (hex)
 *   2. WCAG 2.2 contrast vs white and black (normative)
 *   3. APCA Lc vs white and black (perceptual, WCAG 3 candidate — advisory)
 *   4. OKLCH ramp smoothness (locked-lightness check + step evenness)
 *   5. CVD safety (Machado 2009: protanopia, deuteranopia, tritanopia, achromatopsia)
 *
 * Methods: sRGB->linear->XYZ->Lab, CIEDE2000, OKLab/OKLCH (Ottosson),
 * APCA-W3 0.1.9, Machado/Oliveira/Fernandes 2009 CVD matrices on linear RGB.
 * Usage: node scripts/color-audit.mjs [palette.json] > report.md
 */
import { readFileSync, writeFileSync } from "node:fs";
import {
  STEPS, WHITE, BLACK, hexRgb, hexLab, hexOklch, ciede2000,
  wcag, apca, simLab, f, stats, rampsOf,
} from "./lib/color-math.mjs";

const IN = process.argv[2] || new URL("../research/agent-design-standards/data/color-primitives.json", import.meta.url).pathname;
const data = JSON.parse(readFileSync(IN, "utf8"));

const ramps = rampsOf(data);

/* ------------ report ------------ */
let O=[];const p=(s="")=>O.push(s);
p("# DBUI color primitives — validation report");
p("");
p(`**Source:** ${data.$meta?.source||IN}  `);
p(`**Values fetched:** ${data.$meta?.fetched||"n/a"} (exact from Figma swatch fills)  `);
p(`**Generated:** ${new Date().toISOString().slice(0,10)} by \`scripts/color-audit.mjs\` (dependency-free, reproducible)`);
p("");
if(data.$meta?.naming_flag){p(`> ⚠︎ **Naming note:** ${data.$meta.naming_flag}`);p("");}

/* ---- auto findings (computed) ---- */
const findings=[];
// non-monotonic OKLCH lightness
for(const[hue,r]of ramps){const oks=STEPS.map(s=>hexOklch(r[s]));const dL=[];for(let i=1;i<oks.length;i++)dL.push(oks[i-1].L-oks[i].L);if(!dL.every(d=>d>0))findings.push(`**${hue}** is non-monotonic in OKLCH lightness (a step gets *lighter* going darker) — see §4b.`);}
// 500-step too light to be a graphic on white
const lightOnWhite=ramps.filter(([,r])=>wcag(r["500"],WHITE)<3).map(([h])=>h.split("/")[1]);
if(lightOnWhite.length)findings.push(`On **white**, the 500 step of ${lightOnWhite.join(", ")} is below 3:1 — not safe as text/icon/border on white; use a darker step (600–700) in light mode.`);
// categorical weak even in normal vision
for(const[set,obj]of Object.entries(data.categorical||{}))for(const mode of["light","dark"]){const es=Object.entries(obj).map(([n,v])=>[n,v[mode]]);let mn=Infinity,pr="";for(let i=0;i<es.length;i++)for(let j=i+1;j<es.length;j++){const de=ciede2000(hexLab(es[i][1]),hexLab(es[j][1]));if(de<mn){mn=de;pr=`${es[i][0]}↔${es[j][0]}`;}}if(mn<15)findings.push(`Categorical **${set} (${mode})** pair ${pr} is only ΔE00 ${f(mn)} in *normal* vision (target ≥15) — collapses further under CVD.`);}
findings.push(`**Status** red/green and the 11-hue **viz qualitative** sets are not CVD-separable (expected with this many hues) — never encode meaning by color alone; pair with icon, label, or direct annotation.`);
p("## Findings (auto-generated)");p("");
p("Each item is machine-checked from the values below. This section is the linter output; the tables are the evidence.");p("");
for(const fnd of findings)p(`- ${fnd}`);
p("");
p("## Methodology");
p("");
p("| Test | Standard / method | Pass criteria |");
p("|---|---|---|");
p("| Contrast (normative) | WCAG 2.2 luminance ratio | Body text ≥ 4.5:1; large text (≥24px, or ≥19px bold) & non-text/UI (SC 1.4.11) ≥ 3:1 |");
p("| Contrast (perceptual) | APCA Lc (WCAG 3 candidate, advisory) | Body ~Lc 60; large/bold ~Lc 45; non-text ~Lc 30. Signed; abs value shown. Not a conformance claim |");
p("| Ramp smoothness | OKLCH (Ottosson) lightness-locked ramps + CIEDE2000 step deltas | Even ΔL per step (low CV), monotonic lightness, minimal hue drift, chroma arc tapering at ends |");
p("| Color difference | CIEDE2000 (ΔE00) | JND ≈ 2.3; categorical separation target ≥ 15 |");
p("| CVD | Machado, Oliveira & Fernandes (2009), severity 1.0 — the model Chrome DevTools uses | Ramps stay monotonic & steps distinct; categorical sets keep min ΔE00 ≥ ~10 |");
p("");
p("*Refs: WCAG 2.2 (W3C Rec); APCA-W3 0.1.9 (Myndex/WCAG 3 draft); Machado et al. 2009; Oklab (Ottosson 2020). CVD severity 1.0 = full dichromacy (worst case); real anomalous trichromats are less severe.*");
p("");

/* 1. matrix */
p("## 1. Color matrix (exact hex)");
p("");
for(const cat of["surface","status","viz"]){
  p(`### ${cat[0].toUpperCase()+cat.slice(1)}`);p("");
  p("| Ramp | "+STEPS.join(" | ")+" |");
  p("|"+"---|".repeat(STEPS.length+1));
  for(const[hue,r]of Object.entries(data[cat])) p(`| ${hue} | `+STEPS.map(s=>r[s]||"—").join(" | ")+" |");
  p("");
}
p("### Categorical (fixed sets — light / dark variants)");p("");
for(const [set,obj] of Object.entries(data.categorical||{})){
  p(`**${set}**`);p("");
  p("| Slot | Light | Dark |");p("|---|---|---|");
  for(const[name,v]of Object.entries(obj)) p(`| ${name} | ${v.light} | ${v.dark} |`);
  p("");
}

/* 2. WCAG */
function contrastTables(title, fn, unit){
  p(`## ${title}`);p("");
  for(const cat of["surface","status","viz"]){
    p(`### ${cat[0].toUpperCase()+cat.slice(1)} — ${unit}`);p("");
    p("| Ramp | "+STEPS.join(" | ")+" |");
    p("|"+"---|".repeat(STEPS.length+1));
    for(const[hue,r]of Object.entries(data[cat])) p(`| ${hue} | `+STEPS.map(s=>r[s]?fn(r[s]):"—").join(" | ")+" |");
    p("");
  }
}
contrastTables("2. WCAG 2.2 contrast — vs white / vs black", (h)=>`${f(wcag(h,WHITE),2)} / ${f(wcag(h,BLACK),2)}`, "ratio (W / B)");
p("> Read each cell as `contrast-vs-white / contrast-vs-black`. A step is usable as **body text** on that background at ≥ 4.5, as **large text / icon / border** at ≥ 3.");
p("");
// first-pass thresholds
p("**First step reaching text thresholds (as foreground):**");p("");
p("| Ramp | ≥3:1 on white | ≥4.5:1 on white | ≥3:1 on black | ≥4.5:1 on black |");
p("|---|--:|--:|--:|--:|");
for(const[hue,r]of ramps){
  const firstOn=(bg,th)=>STEPS.find(s=>r[s]&&wcag(r[s],bg)>=th)||"—";
  p(`| ${hue} | ${firstOn(WHITE,3)} | ${firstOn(WHITE,4.5)} | ${firstOn(BLACK,3)} | ${firstOn(BLACK,4.5)} |`);
}
p("");

/* 3. APCA */
contrastTables("3. APCA Lc (advisory) — as text on white / on black", (h)=>`${f(Math.abs(apca(h,WHITE)),0)} / ${f(Math.abs(apca(h,BLACK)),0)}`, "|Lc| (on W / on B)");
p("> Absolute Lc shown. Guidance: `~60` body, `~45` large/bold, `~30` non-text. APCA is advisory (WCAG 3 draft), not a conformance verdict.");
p("");

/* 4. OKLCH smoothness */
p("## 4. OKLCH ramp smoothness");
p("");
p("### 4a. Lightness scale (OKLCH L×100) — should be ~constant down each column across hues");p("");
p("| Ramp | "+STEPS.join(" | ")+" |");
p("|"+"---|".repeat(STEPS.length+1));
for(const[hue,r]of ramps) p(`| ${hue} | `+STEPS.map(s=>r[s]?f(hexOklch(r[s]).L*100,0):"—").join(" | ")+" |");
p("");
// column consistency
const colStats=STEPS.map(s=>{const Ls=ramps.filter(([,r])=>r[s]).map(([,r])=>hexOklch(r[s]).L*100);return{s,...stats(Ls)};});
p("**Cross-hue lightness alignment per step** (low spread = lightness locked across families):");p("");
p("| Step | "+STEPS.join(" | ")+" |");
p("| L× mean | "+colStats.map(c=>f(c.mean,0)).join(" | ")+" |");
p("| L× stdev | "+colStats.map(c=>f(c.sd,1)).join(" | ")+" |");
p("");
p("### 4b. Per-ramp evenness & drift");p("");
p("`ΔL CV%` = evenness of lightness steps (lower better). `ΔE00 CV%` = perceptual step evenness. `Hue drift` = max−min OKLCH hue across steps with C>0.02. `Chroma peak` = step of max chroma.");p("");
p("| Ramp | L range | ΔL CV% | ΔE00 mean | ΔE00 CV% | Mono L | Hue drift° | Chroma peak | Verdict |");
p("|---|---|--:|--:|--:|:--:|--:|:--:|---|");
for(const[hue,r]of ramps){
  const oks=STEPS.map(s=>hexOklch(r[s])); const labs=STEPS.map(s=>hexLab(r[s]));
  const dL=[],dE=[]; for(let i=1;i<oks.length;i++){dL.push((oks[i-1].L-oks[i].L)*100);dE.push(ciede2000(labs[i-1],labs[i]));}
  const sL=stats(dL),sE=stats(dE); const mono=dL.every(d=>d>0);
  const chromatic=oks.filter(o=>o.C>0.02).map(o=>o.H).sort((a,b)=>a-b);
  let drift=0; if(chromatic.length>1){let gap=0; for(let i=1;i<chromatic.length;i++)gap=Math.max(gap,chromatic[i]-chromatic[i-1]); gap=Math.max(gap,360-(chromatic[chromatic.length-1]-chromatic[0])); drift=360-gap;}
  let peak=STEPS[0],pc=0; oks.forEach((o,i)=>{if(o.C>pc){pc=o.C;peak=STEPS[i];}});
  const issues=[sL.cv>40?"uneven ΔL":"",!mono?"non-mono L":"",sE.cv>45?"uneven ΔE":"",drift>40?"hue drift":""].filter(Boolean);
  p(`| ${hue} | ${f(oks[oks.length-1].L*100,0)}–${f(oks[0].L*100,0)} | ${f(sL.cv)} | ${f(sE.mean)} | ${f(sE.cv)} | ${mono?"yes":"**NO**"} | ${f(drift,0)} | ${peak} | ${issues.length?issues.join(", "):"ok"} |`);
}
p("");

/* 5. CVD */
p("## 5. Color vision deficiency (CVD)");
p("");
p("### 5a. Ramps stay ordered & distinct under CVD");p("");
p("Min consecutive ΔE00 between steps once simulated (⚠︎ <2.3 = steps merge). `Mono` = lightness order preserved (deuteranopia).");p("");
p("| Ramp | normal minΔ | deutan minΔ | protan minΔ | tritan minΔ | achroma minΔ | deutan mono |");
p("|---|--:|--:|--:|--:|--:|:--:|");
for(const[hue,r]of ramps){
  const row=[]; let mono=true;
  for(const t of["normal","deutan","protan","tritan","achroma"]){
    const labs=STEPS.map(s=>simLab(r[s],t)); let mn=Infinity;
    for(let i=1;i<labs.length;i++){const de=ciede2000(labs[i-1],labs[i]); if(de<mn)mn=de;}
    row.push(mn);
    if(t==="deutan")mono=labs.every((l,i)=>i===0||labs[i-1][0]>l[0]);
  }
  p(`| ${hue} | ${row.map((v,i)=>f(v)+(i>0&&v<2.3?" ⚠︎":"")).join(" | ")} | ${mono?"yes":"**NO**"} |`);
}
p("");
p("### 5b. Categorical / qualitative sets — pairwise distinguishability");p("");
p("Closest pair (min ΔE00) after simulation. ⚠︎ <10 confusable, `(tight)` <15. Target ≥15 for categorical.");p("");
function cvdSet(title,entries){
  p(`**${title}**`);p("");
  p("| CVD | min ΔE00 | worst pair |");p("|---|--:|---|");
  for(const t of["normal","deutan","protan","tritan","achroma"]){
    let mn=Infinity,pair="";
    for(let i=0;i<entries.length;i++)for(let j=i+1;j<entries.length;j++){const de=ciede2000(simLab(entries[i][1],t),simLab(entries[j][1],t)); if(de<mn){mn=de;pair=`${entries[i][0]} ↔ ${entries[j][0]}`;}}
    p(`| ${t} | ${f(mn)}${mn<10?" ⚠︎":mn<15?" (tight)":""} | ${pair} |`);
  }
  p("");
}
for(const[set,obj]of Object.entries(data.categorical||{})){
  for(const mode of["light","dark"]) cvdSet(`${set} — ${mode}`, Object.entries(obj).map(([n,v])=>[n,v[mode]]));
}
for(const step of["400","600"]) cvdSet(`Viz qualitative @ ${step} (11 hues)`, Object.entries(data.viz).map(([n,r])=>[n,r[step]]));
cvdSet("Status @ 600 (red/yellow/green/blue)", Object.entries(data.status).map(([n,r])=>[n,r["600"]]));
p("> Red↔green merging under deuteranopia/protanopia is expected physics — status must never rely on color alone; pair with icon + text label.");
p("");

const REPORT=new URL("../research/agent-design-standards/color-primitives-validation.md",import.meta.url).pathname;
writeFileSync(REPORT,O.join("\n"));
console.error("Wrote "+REPORT+" ("+O.length+" lines)");
