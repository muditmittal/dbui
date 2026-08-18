# Evaluating a primary viz color

Working notes from the cyan comparison study, Aug 2026. Trigger: an engineer said the cyan
"pops more than the previous color" and has "more green mix" than he'd like. Rather than
respond to the preference, this is how the choice gets evaluated on evidence.

Live comparison: `~/.cursor/projects/Users-mudit-mittal-db-design-system/canvases/viz-cyan-study.canvas.tsx`

## Decisions, Aug 15

**Shipped.** The whole cyan ramp retuned, lightness only — chroma and hue are the original values
at every stop.

| Stop | Was | Now | L\* move |
|---|---|---|---|
| `cyan.050` | `#E9F8FD` | `#E5F4F9` | −1.5 |
| `cyan.100` | `#D2F1FC` | `#CEEDF8` | −1.5 |
| `cyan.200` | `#A5E5F9` | `#A3E3F7` | −0.7 |
| `cyan.300` | `#65D3F4` | `#65D3F4` | +0.1 (unchanged after quantisation) |
| `cyan.400` | `#22BFE5` | `#28C1E7` | +0.7 |
| `cyan.500` | `#169DBD` | `#21A1C2` | +1.6 |
| `cyan.600` | `#0F7B95` | `#1D819B` | +2.4 |
| `cyan.700` | `#085B6E` | `#186376` | +3.3 |
| `cyan.800` | `#084150` | `#164A5A` | +4 |
| `cyan.900` | `#0A2C36` | `#15353F` | +4 |

The pale end sits on white, where a light high-chroma tint reads as emitted light, so it drops. The
dark end sits on the dark canvas, where the opposite is true, so it lifts. The middle interpolates
between the two anchors rather than stepping, which avoids a kink at the handover. L\* stays
monotonic, the ramp's span is unchanged at 74.9, and the weakest adjacent pair stays ΔE 5.3.

**Two stops now sit on a threshold and must not be lifted further.** `cyan.500` is **3.03:1** on
white against WCAG 1.4.11's 3:1, and `cyan.600` is **4.50:1**, exactly the floor for white text on
the fill. Both pass; neither has margin.

Propagated to `tokens.css`, the lint tokens, the portal token data, `token-spec.md`, the spectrum
snapshots, and all ten Figma primitives — whose `viz/sequential/*` semantics are aliases, so they
flow through automatically.

**Rejected, with reasons.**

- *Hue rotation toward blue.* Deterministic and safe, but ΔE 0.5–1.8 at +5° is below side-by-side
  perceptibility, and it holds L\* and C\* — the two axes every real problem lives in. It buys
  separation from grey and spends it against the interactive blue. Net zero.
- *Chroma reduction.* Cyan peaks at C\*ab 39.0, eighth of eleven viz families. It is one of the
  calmest hues in the system, and lowering chroma moves it toward the grey it has to beat.
- *Moving the primary mark to `cyan.500`.* Rested on applying 3:1 to every fill. WCAG 1.4.11 exempts
  graphics not required to understand the content, so a labelled bar or treemap tile is fine at the
  light end — and black text reads better there (8.3:1 on `cyan.400` against 5.67:1 on `.500`).

**Sequential stays 10 steps, full ramp in both modes.** "050–400 in light, 500+ in dark" is a usage
default for single fills, not a partition. Heatmaps and donuts reach further when they need depth.
A strict 5/5 split was modelled and rejected: it leaves light mode with 23.5 L\* of range against
dark's 39.5, and a weakest adjacent pair of ΔE 5.3.

**Sequential is all cyan.** `viz-sequential-1` light and `-10` dark used to borrow
`interface.cool`; both are `viz.cyan.050` now, so the scale runs `#E5F4F9`→`#15353F` in light and
the exact reverse in dark. Two consequences: the first step tightened from ΔE 9.2 to 5.3, because
the grey-versus-cyan hue difference was carrying it and now only 3.4 L\* is; and the scale no longer
varies by theme, since those two stops were the only path by which One's `ramp` rewrite reached it.
Themed token count dropped 32 → 30. `tokens.md` and the `ramp` comment are updated.

**Viz neutrals shipped.** Three roles, alpha rather than solid, sourced from the cyan ramp:

| Token | Light | Dark | Resolves to (light / dark) |
|---|---|---|---|
| `viz-neutral-subtle` | `cyan.900` @ 4% | `cyan.100` @ 4% | `#F6F7F7` / `#192025` |
| `viz-neutral-base` | `cyan.900` @ 8% | `cyan.100` @ 8% | `#ECEFF0` / `#20282E` |
| `viz-neutral-strong` | `cyan.900` @ 48% | `cyan.100` @ 48% | `#8F9EA3` / `#6C7E86` |

Alpha so a neutral inherits its surface — the same token comes out cool on the dark canvas and warm
on a One page, which no fixed hex does. Cyan as the source rather than black so the greys carry a
cast of the brand hue: at 48% that is C\*ab 6.1 at hue 226, against 1.6 for a `cool.900` source and
0.0 for black.

`base` at 8% sits 2.4 L\* from the labelled-bar fill, so it reads as the same weight with the colour
removed. `strong` is 15.7 ΔE from the current-period cyan and 12.0 under protanopia.

Two things to know. **`strong` is 2.77:1 on white**, under 1.4.11's 3:1 — a deliberate call for a
de-emphasised reference series, but it should not be the only thing carrying a value; 52% would
clear it. And because the source is cyan, **retuning the cyan ramp moves the neutrals with it.**

**Parked.**

- *A diverging scale* — orange ↔ cyan, worst cross-arm ΔE 32.0 under CVD, buildable from existing
  viz primitives. Red-yellow-green was tested and fails at ΔE 3.8 under deuteranopia.
- *The Figma dump carries names only.* `verify-sync` therefore checks that a token exists in Figma,
  never what it is set to — it would not catch a value drifting. A dump with values is supported by
  the script and now generatable; it would cover the 25 alpha semantics, since aliased ones are
  skipped by design.

**Status needs no changes.** All twelve role/mode pairs pass, including text scored against the
status surface it sits on rather than the page.

## The one number that does most of the work

Working backward from the WCAG relative-luminance formula, a mark that must clear **3:1
against white** can have a relative luminance of at most Y = 0.30, which is:

| Requirement | Applies to | Ceiling |
|---|---|---|
| 3:1 (WCAG 1.4.11, non-text) | marks where colour is the only encoding | **CIELAB L\* ≤ 61.7** |
| 4.5:1 (WCAG 1.4.3, body text) | a label sitting on a fill | **CIELAB L\* ≤ 49.9** |

This converts an accessibility check into a one-dimensional bound you can apply before looking
at anything.

**Scope it carefully — I got this wrong once.** 1.4.11 covers graphics *required to understand the
content*. A bar carrying its own text label, or a labelled treemap tile, is not one: the label
carries the meaning and the fill is a magnitude cue. Those are exempt, and they *should* use light
stops, because the lightness is what keeps the label readable — black on `cyan.400` is 8.3:1, on
`cyan.500` only 5.67:1. Recommending a darker fill there makes the job worse, not better. The bound
applies to a line, a sparkline, or a bare bar with no label and no axis readout.

`viz.cyan.400` (`#22BFE5`) is at L\* 71.7 → 2.18:1: correct for a labelled fill, short for an
unlabelled mark.

## Protocol

Cheap disqualifying tests first. **Gates** have a defensible threshold. **Judgments** are flagged.

### Phase 0 — fix the references

Decide before measuring, because every number depends on them: light canvas, dark canvas, the
neutral grey you pair against, body text color. List the mark geometries you actually ship —
minimum line stroke, typical bar width, minimum arc, smallest treemap tile.

### Phase 1 — automated gates

1. **Lightness ceiling.** L\* ≤ 61.7 for use on white. Hard gate.
2. **Contrast against every surface.** ≥ 3:1 vs light canvas, dark canvas, and the paired grey.
   Hard gate.
3. **Gamut safety.** In sRGB unclipped. OKLCH chroma 0.10–0.20 is the pragmatic band for a
   branded system; above ~0.28 you are gambling with the gamut. Hard gate.
4. **CVD survival against the neutral.** Simulate deuteranopia and protanopia (Machado 2009,
   severity 1.0). Require ΔE2000 ≥ 10 from the grey, *and* check that most of that distance
   comes from ΔL\*. Threshold is a judgment call — no standard exists — but this is the gate
   that kills naive cyans.
5. **Size-aware discriminability.** Compare CIELAB axis differences against Szafir's ND(50%)
   for your *thinnest* mark, not your typical one. For a 2px line that is ΔL\* ≈ 15.4 — roughly
   five times the textbook "2 ΔE is perceptible" figure.
6. **Greyscale test.** Strip to L\* only. Still readable? This subsumes most of CVD, because
   lightness is the one channel no deficiency affects.
7. **Text-on-fill sweep.** Every ramp step must clear 4.5:1 with either white or black text.
   Flag any step where neither works.
8. **Ramp monotonicity and range.** L\* strictly monotonic, no local extrema — a local
   lightness extremum reads as a feature in the data that isn't there.
9. **Nameability.** Heer & Stone's saliency below 0.2 signals naming confusion. Cyan is
   genuinely weak here: cyan/teal/turquoise/aqua compete for one region, so "the cyan one"
   is a worse verbal handle than "the red one."

### Phase 2 — human evaluation, not skippable

10. **Multi-size simultaneous preview.** Every candidate at every size it ships at, all visible
    at once, on both canvases. This is what the canvas does. Tableau built the same tool for
    the Tableau 10 redesign; it is the single highest-value test because the same hex reads
    louder as a hero block than as a 2px line.
11. **Real data, real density.** Carbon's palette failures only appeared on a full dashboard.
12. **Interaction states.** Hover, selected, faded, disabled — then *filter the legend*.
    Filtering changes which colors are adjacent, and Carbon killed an entire palette design
    on exactly this.
13. **Salience.** Does the data read as figure and the grey as ground, peripherally?
14. **Comfort over time.** Ask about comfort *separately* from preference. They diverge — see
    below.
15. **Degraded conditions.** Bad projector, sunlight, high-contrast mode, print.

### What automates, what doesn't

| Fully automated | Judgment threshold | Human only |
|---|---|---|
| L\* ceiling, contrast, gamut | CVD pass threshold | Area effect at real size |
| Monotonicity, L\* span | Discriminability level (50% vs 80%) | Brand fit |
| Text-on-fill sweep | Nameability weighting | Comfort over time |
| CVD simulation, ΔE matrices | Sequential step count | Figure/ground salience |

## What this study found

**"Pops too much" is real and has two separate causes.** The *color size effect* is established
color science: as area grows, a color appears lighter and more chromatic, hue roughly stable
(Xiao et al. 2011; CIE 208:2014). Tableau compensates automatically — "in visualizations with
large areas of color… we automatically fade the colors a bit." Separately, an fNIRS study (Shi
et al. 2022) found visual discomfort bottoms out at *mid* saturation while preference keeps
climbing with saturation. So a stakeholder saying "I love it" and a user saying "it's too much"
can both be reporting accurately — they are reporting different variables.

**But chroma is the wrong dial to fix it with.** Reducing chroma moves a color toward grey by
definition. Cutting our cyan's chroma 28% dropped its separation from the paired neutral from
14.8 to 12.2 ΔE under protanopia. "Pops less" and "stands out from the grey" are the same dial
turned opposite ways. **Lightness is the free variable** — it buys calm and buys compliance,
without paying in salience.

**And in palette context, cyan is not a loud color.** Plotting all 110 viz primitives in the
a\*b\* plane, cyan peaks at C\*ab 39.0 — eighth of eleven families, less than half of gold (82.5)
and well below pink (73.5), orange (72.8), purple (69.7) and lime (67.7). Only teal, sage and
brown are calmer. Whatever makes it read as loud is not chroma; it is L\* 71.7 on a white surface,
where a light blue-cyan glows without carrying contrast, plus the size effect on the landing page.
Both point back at lightness.

**The palette has a 93° hole and cyan sits in it.** The categorical picks run from teal at h_ab
192° straight to indigo at 286° with nothing between — the whole cyan/blue arc is unclaimed, and
five of the ten picks are crowded into the 0°–110° warm arc. Cyan at 230° is uncontested, which
is a genuine argument *for* it as the primary and brand color: it can sit beside the full
categorical set without collision. Rotating it greener destroys that property — a hue-197
candidate lands 7° from `viz-categorical-3` (teal 300) at ΔE2000 15.5, separated almost entirely
by lightness. Two colors sharing a hue and a name is a nameability failure before it is a contrast
one.

**The "more green" direction is measurably the worst move available.** At OKLCH hue ~197, the
anchor lands 5.8 ΔE from the neutral grey under protanopia — the figure/ground split disappears
for red-green CVD viewers. Hue 180–200 is the worst region on the wheel for a color that has to
sit beside grey. Rotating the other way, to hue 237, improves it to 17.9. Worth knowing: IBM's
"Cyan 50" is OKLCH hue 247 — the name is cyan, the behavior is blue. They appear to have made
this exact trade and kept the name.

**Sequential steps are not line colors.** Every adjacent pair in every candidate ramp is below
Szafir's 2px-line threshold — the largest gap is ΔL\* 12.3 against a requirement of 15.4. Fine
for bars and arcs, not for thin lines. That is a charting-layer constraint, independent of which
color wins.

**Failing 3:1 in a sequential ramp is normal.** Five of ten steps fail in every candidate. IBM
ships this deliberately: *"maintaining a full range of light and dark is more effective for data
reading… Overemphasis on background contrast can thus reduce the accessibility inside the
visualization."* WCAG 1.4.11's "essential presentation" exemption is what makes it defensible,
and Carbon pays for it with color-agnostic aids — 1px caps on bars, divider strokes, tooltips, a
view-as-data-table option. It is only a defect when one step is pulled out to act as the primary
mark.

## The series colors collide with each other under CVD

This outranks everything else here. Mutual discriminability is the one thing a categorical palette
exists to provide. Scoring all 45 pairs, simulated for deuteranopia and protanopia (Machado 2009,
severity 1.0):

| Pair | Normal | Deuteranopia | Protanopia |
|---|---|---|---|
| `categorical-2` gold / `categorical-5` lime | 13.7 | **1.9** | **1.2** |
| `categorical-4` pink / `categorical-6` brown | 22.9 | **4.9** | 15.2 |
| `categorical-1` purple / `categorical-10` plum | 10.3 | 7.9 | **6.0** |
| `categorical-3` teal / `categorical-9` sage | 10.6 | 8.1 | **6.8** |
| `categorical-1` purple / `categorical-7` indigo | 14.7 | **9.1** | 11.2 |

Gold and lime are effectively the same color for red-green deficient viewers — ΔE 1.2 is below the
threshold of perceptibility for large flat patches, let alone chart marks. **Light mode: five of 45
pairs under ΔE 10 in some form of vision, fourteen under 15. Dark mode: nine under 10**, led by
purple/indigo at 2.3 under protanopia.

Note that the a\*b\* wheel cannot reveal this: its angular axis is precisely what CVD collapses, so
two marks can sit far apart at high chroma and still merge. Gold and lime are 8° apart, both near
the rim, and they merge. This is why Stone's rule — get it right in greyscale, vary lightness
between confusable hues — is the durable one. Of these five pairs, the ones that survive best are
those separated by lightness rather than hue.

## The status-color test

The sharper test than "is this cyan nice" is whether a series color can be mistaken for a UI state.
Scoring every categorical pick against all eight `status-*` semantics, mode-correctly (light series
against light status, dark against dark):

- **Light mode is clean.** Closest pair is `categorical-8` against `status-border-warning` at
  ΔE2000 16.0.
- **Dark mode has one real collision.** `categorical-2` resolves to gold 500 `#BD7C30`, and
  `status-border-warning` is yellow 500 `#DE7921` — **ΔE2000 7.9**. A gold series in dark mode reads
  as a warning. Root cause: `status-border-warning` and `status-border-positive` are the only status
  semantics that keep the same value in both modes, so the darker dark-mode series colors drift into
  them. Worth fixing independently of the cyan question.
- **`status.yellow` is not yellow.** It spans h_ab 40–93° and its semantic picks sit at 49° and 61° —
  amber to burnt orange. True yellow is near 90–100°, where `viz.gold` lives. That is why gold and
  orange are the two families that keep landing near a warning color.

Two results that bear directly on the cyan candidates:

- **In dark mode the current cyan is ΔE 11.9 from `status-text-info`** (blue 400, `#8ACAFF`). A bright
  cyan mark on a dark canvas is close to a link.
- **Azure costs what it buys.** Candidate D improves separation from grey under CVD but moves toward
  the interactive blue — ΔE 13.9 in light mode, the worst of any candidate. Candidate B is the only
  option that stays clear of both grey and blue in both modes.

## Cyan is not the outlier

Plotting the light and dark halves of every ramp separately makes it clear the contrast failure is
system-wide, not a cyan problem. Light-mode categorical picks come from steps 200–400 at L\* 55–87.
Against white:

| Series | Light pick | vs white | Dark pick | vs dark canvas |
|---|---|---|---|---|
| categorical-2 gold | `#FFD54F` | **1.41 ✗** | `#BD7C30` | 5.24 |
| categorical-5 lime | `#D4E157` | **1.43 ✗** | `#9E9D00` | 6.26 |
| categorical-3 teal | `#6CD7D2` | **1.71 ✗** | `#2C8985` | 4.32 |
| categorical-9 sage | `#96BEB5` | **2.03 ✗** | `#217766` | 3.35 |
| categorical-8 orange | `#EF9B80` | **2.17 ✗** | `#CC471F` | 3.86 |
| categorical-7 indigo | `#90A0E0` | **2.53 ✗** | `#4E62BA` | 3.25 |
| categorical-4 pink | `#F06292` | 3.06 | `#A11E4E` | **2.42 ✗** |
| categorical-6 brown | `#A1887F` | 3.31 | `#A8796D` | 4.83 |
| categorical-1 purple | `#9575CD` | 3.68 | `#8555C9` | 3.56 |
| categorical-10 plum | `#AD6DAD` | 3.77 | `#97409A` | 3.02 |

**Six of ten fail in light mode; one of ten fails in dark** — but only for unlabelled marks, per the
scoping above. As labelled bars or large tiles they are exempt and correctly chosen. The number that
matters is how many of these are ever used as a bare line or unlabelled bar; for those instances the
light-mode set is too light.

Related, and it closes the "is the light end faded" question: the cyan light stops use **79–84% of
the chroma sRGB can produce at their own lightness** (`cyan.100` 84%, `200` 83%, `300` 81%). Pushing
them to 85% moves them ΔE 0.0–0.7 — invisible. They are at the physical ceiling; the only way to make
those fills more colourful is to make them darker. `cyan.400` is the outlier at **96% of ceiling**,
the most maxed-out step in the ramp, which is a real basis for perceiving it as harsher than its
neighbours.

Worth noting alongside it: the two systems move in **opposite directions** between modes. Every
series color gets darker in dark mode (200–400 → 500–600); every status semantic gets lighter
(`status-text-info` is blue 600 light, blue 400 dark). The viz direction is the one producing good
contrast, since a mid-lightness mark on a near-black canvas has a large lightness gap to exploit.
But the inconsistency is why the dark-mode gold collision exists.

## A hue rotation is safe, cheap, and fixes nothing measurable

Rotating cyan toward blue — CIELAB LCh, add N degrees to h, hold L\* and C\*ab — is fully
deterministic and stays in sRGB through +10° (at +15° one step loses 0.36 chroma). Because L\* is
held, **contrast is unchanged**: the largest shift anywhere in the ramp is 0.101:1, at step 900
where the ratio is already 14.7:1. Steps passing 3:1 stays 5 of 10 at every rotation.

What it moves, under protanopia:

| Check | Current | +5° | +10° | +15° |
|---|---|---|---|---|
| vs neutral grey | 14.8 | 15.8 | 16.5 | **17.2** |
| vs `viz.teal` | 14.9 | 15.8 | 16.6 | **17.1** |
| vs `status` blue 600 (light) | 14.3 | 13.9 | 13.5 | **13.2** |
| vs `status` blue 400 (dark) | 4.5 | 4.2 | 4.3 | 4.3 |
| adjacent ramp steps, min | 3.8 | 3.8 | 4.5 | 3.4 |

It buys separation from grey and teal, spends it against the interactive blue, and does nothing for
the ramp's internal readability (those steps are separated by lightness, which neither CVD nor the
rotation touches). At +5° the change is ΔE 0.5–1.8 per step — below the threshold of side-by-side
perceptibility. **+10° is the smallest rotation that reliably reads** (ΔE 3.4 at the mid steps).

**And it surfaced a live defect.** In dark mode `viz-sequential-6` is `cyan.400` while
`status-text-info` is blue 400. Normally sighted that is ΔE 11.9 — close but usable. Under
**protanopia it is 4.5**, under deuteranopia 6.1. A cyan sequential fill and an info-blue label on a
dark canvas are the same color for ~8% of men today. No rotation fixes it: both sit in the blue
region, which is the axis red-green deficiency collapses. Needs lightness separation or a different
hue family.

## Cyan cannot be dark and colorful, and that is physics

`cyan.900` uses **86% of all the chroma sRGB has** at its lightness and hue; `cyan.800` uses 94%.
There is no headroom to take. Compare `purple.900` at 30% of an available 82.2, or `brown.900` at
14% — those ramps chose to be muted. Cyan had no choice.

Two consequences. A cyan sequential scale will always shed hue identity at its dark end, so dark
mode — which reads the ramp from that end — pays most. And cyan is one of only four families
(with teal, lime and gold) whose light half reaches higher chroma than its dark half: C\*ab 39 in
steps 050–400 against 34 in 500–900. Its most colorful step is the one that fails contrast, and the
steps that pass are measurably duller. That is the same problem the contrast gate found, seen as
geometry.

## Where practitioners genuinely disagree

- **One hex per color, or one per context.** The FT and FiveThirtyEight (2016) ship less
  saturated colors for bars than for lines. The NYT and FiveThirtyEight (2020) use one value
  everywhere. Tableau splits the difference by automating the fade. Datawrapper's warning is
  real: two values "might complicate things in your charting tool — and you'll need to document
  more."
- **Brand color as viz color.** finn.no uses its brand blue for single-series charts only and
  excludes it from multi-color charts, because "users could interpret categories colored in that
  blue as 'more brand-related.'" Mailchimp does the same. Elastic anchors everything in the brand
  spectrum on the grounds that charts which don't "look like they belong to a different product."
- **Algorithmic vs manual selection.** IBM tried computational generation twice and shipped hand
  curation. Tableau's process ended in expert manual tuning its own author called not yet
  codifiable. Weight of evidence: automate *evaluation*, keep judgment for *selection*.
- **WCAG 2.x vs APCA.** Ship against 2.x — it is the conformance standard and APCA's non-text
  guidance is still unwritten. Use APCA as a tiebreaker among candidates that already pass, and
  as a sanity check in dark mode where 2.x is least trustworthy.

## Sources

- Stone, [How we designed the new color palettes in Tableau 10](https://www.tableau.com/blog/colors-upgrade-tableau-10-56782)
- Shixie, [Color palettes and accessibility features for data visualization](https://medium.com/carbondesign/color-palettes-and-accessibility-features-for-data-visualization-7869f4874fca) (IBM Carbon)
- Szafir, [Modeling Color Difference for Visualization Design](http://danielleszafir.com/colordiff_vis2017.pdf), IEEE TVCG 2018
- Heer & Stone, [Color Naming Models for Color Selection](https://idl.cs.washington.edu/files/2012-ColorNameModels-CHI.pdf), CHI 2012
- Machado, Oliveira & Fernandes, [A Physiologically-based Model for Simulation of Color Vision Deficiency](https://www.inf.ufrgs.br/~oliveira/pubs_files/CVD_Simulation/CVD_Simulation.html), 2009
- Muth, [A detailed guide to colors in data vis style guides](https://www.datawrapper.de/blog/colors-for-data-vis-style-guides) (Datawrapper)
- Baldwin, [Reinventing Adobe Spectrum's colors](https://adobe.design/ideas/reinventing-adobe-spectrum-s-colors)
- Atlassian, [Data visualization color](https://atlassian.design/foundations/color/data-visualization-color) — the `chart.brand` / `chart.neutral` pairing
- W3C, [WCAG 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast)
- Shi et al., [How Visual Discomfort Is Affected by Colour Saturation: A fNIRS Study](https://doi.org/10.1109/jphot.2022.3213336), 2022
- Xiao et al., [Investigation of colour size effect](https://doi.org/10.1002/col.20610), Color Res. Appl. 2011
