# UX standards corpus

Primary sources for the design-crit tool, and a reading list. Every entry is licensed, dated and
pinned to a commit, so any claim the tool makes can be traced back to a document with a URL.

**This is research material, not a contract.** Nothing here is published by the portal, served by
`dbui docs` or listed in `llms.txt`. The spec it supports is
[`notes/2026-08-11-design-crit-spec.md`](../../notes/2026-08-11-design-crit-spec.md).

| File | What |
|---|---|
| [`topics.md`](topics.md) | **Start here.** Fourteen topics, each with the primary sources that cover it. Curated links, not a dump |
| [`sources.json`](sources.json) | Machine-readable manifest — license, reuse bucket, commit SHA, topics, and why each source earns its place |
| [`fetch.mjs`](fetch.mjs) | Reproduces the corpus from scratch. Clones the open repos, pulls the PDFs, records provenance |
| [`check-links.sh`](check-links.sh) | Verifies every published URL still resolves |
| [`NOTICE.md`](NOTICE.md) | Attribution required by the licenses of the openly licensed sources |

---

## Reuse buckets

This is the part that decides what we may publish, and it is not the same answer for every source.

| Bucket | Meaning | What we may do |
|---|---|---|
| **A** | Openly licensed, derivatives permitted | Store verbatim, adapt, publish adapted, carry the notice |
| **A-v** | Openly licensed for copying, **no derivatives** | Store and quote unmodified with the copyright notice. To publish a rule, restate it in our own words and cite |
| **B** | Free to read, all rights reserved | Store our own restatement plus citation and URL. **Never cache the source prose** |
| **C** | Excluded | Do not use at all |

The distinction that catches people: **APG and WCAG are not under the same license.** APG uses the
W3C *Software and Document* License, which permits modification. WCAG uses the W3C *Document*
License, which does not. Adapting an APG pattern into a house rule is fine; rewriting a WCAG success
criterion and presenting it as ours is not.

Give every rule we publish a provenance record — source, URL, license, retrieval date, bucket. That
is what lets us answer "where did this come from?" in a review without hedging.

---

## Sources

### Openly licensed — cloned and pinned

| Source | Best for | License | Bucket |
|---|---|---|---|
| [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) | 30 keyboard and role contracts. `grid`, `treegrid`, `combobox`, `windowsplitter` | W3C Software and Document | A |
| [WCAG 2.2 + Understanding](https://www.w3.org/WAI/WCAG22/Understanding/) | The normative floor. 106 Understanding docs. ISO/IEC 40500:2025 | W3C Document | A-v |
| [IBM Carbon](https://carbondesignsystem.com/) | The widest openly licensed guidance. States, status, notifications, data-viz, AI label | Apache-2.0 | A |
| [Red Hat PatternFly](https://www.patternfly.org/) | Enterprise console patterns. Dense tables, toolbars, bulk actions, chatbot | MIT | A |
| [GOV.UK Design System](https://design-system.service.gov.uk/) | Error copy, validation, researched status vocabulary | MIT code, OGL v3 docs | A |
| [USWDS](https://designsystem.digital.gov/) | Low priority. Overlaps GOV.UK, no attribution burden | CC0 1.0 | A |

Carbon is the standout: it is the only enterprise design system whose **documentation repository** is
openly licensed, so the guidance prose itself is reusable rather than just the code.

### Free to read — cite and restate

| Source | Best for | Bucket |
|---|---|---|
| [Nielsen's 10 heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) | The baseline frame. Explicit permission to use with attribution | B |
| [NN/g articles](https://www.nngroup.com/articles/complex-application-design/) | Complex applications, data tables, CASTLE, response-time limits | B |
| [Shneiderman, *The Eyes Have It*](http://www.cs.umd.edu/~ben/papers/Shneiderman1996eyes.pdf) | Lineage and dependency graphs. Tree and network data; relate, history, extract | B |
| [Cognitive Dimensions of Notations](https://www.cl.cam.ac.uk/~afb21/CognitiveDimensions/) | Query editors and notebooks. Viscosity, hidden dependencies | B |
| [Microsoft HAX](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/) | AI, by interaction phase, including when it is wrong | B |
| [Google PAIR](https://pair.withgoogle.com/guidebook/) | AI mental models, explainability, graceful failure | B |
| [Connor & Irizarry, *Discussing Design*](https://www.oreilly.com/library/view/discussing-design/9781491902399/) | The critique output contract | B |
| [Forsell & Johansson](https://isr.tecnico.ulisboa.pt/wp-content/uploads/2015/11/HCII-553-Heuristic-evaluation-in-Information-Visualization-using-three-sets-of-heuristics-an-exploratory-study.pdf) | The only empirical heuristic set for interactive visual displays | B |
| [Abby Covert, IA heuristics](https://abbycovert.com/ia-tools/ia-heuristics/) | A catalog is an IA problem before it is a table problem | B |
| [Shneiderman, Eight Golden Rules](https://www.cs.umd.edu/~ben/goldenrules.html) | Universal usability — the novice-versus-expert frame | B |

### Excluded

**Baymard Institute.** Their [terms](https://baymard.com/terms-and-conditions) §3.4 prohibit copying,
modifying, reproducing, redistributing, republishing, **paraphrasing** or repackaging, and explicitly
ban automated extraction — even under a paid subscription at $2,400–$8,400/yr. §3.3 forbids using it
to derive inspiration for similar services, and they ship competing AI UX tools. Scope is homepage,
category, product, cart, checkout, account. There is no configuration where including it is both
legal and useful.

**Atlassian Design System** — license restricts use to Atlassian-interoperating products and forbids
adaptation and derivative works, documentation included. **Shopify Polaris** — field-of-use rider
restricts it to the Shopify ecosystem. **NN/g paid reports** — licenses forbid external
redistribution.

---

## Provenance

Clones live outside the repo at `~/.cache/dbui-ux-corpus/`, re-fetchable via `fetch.mjs`. Captured
2026-08-11:

| Repo | Commit | Committed |
|---|---|---|
| `w3c/aria-practices` | `7e4034b2` | 2026-07-22 |
| `w3c/wcag` | `5841658f` | 2026-08-10 |
| `carbon-design-system/carbon-website` | `535b8748` | 2026-08-11 |
| `patternfly/patternfly-org` | `7315296b` | 2026-08-10 |
| `alphagov/govuk-design-system` | `051c2d42` | 2026-08-11 |
| `uswds/uswds` | `14dc846f` | 2026-08-11 |

---

## Refreshing

```bash
node research/ux-standards/fetch.mjs          # clone or update, rewrite provenance
node research/ux-standards/fetch.mjs --force  # discard and re-clone
research/ux-standards/check-links.sh          # verify every published URL
```

`w3.org` and `oreilly.com` return 403 to non-browser user agents. That is bot protection, not a dead
link — the checker classifies it separately, and W3C slugs are verified against the cloned repos
instead, which is the stronger check anyway.

---

## What this is for

Two things, in order.

**Near term** — ground the crit skill. Every finding it emits must name the standard it rests on, and
that standard must resolve to a row in `sources.json`. A finding that cannot name its standard is
reaction-based feedback and gets suppressed.

**Longer term** — publish a set of DBUI heuristics per topic: status, errors, states, lineage and
dependency chains, notation surfaces, AI-generated content, and the rest of the fourteen in
`topics.md`. Enough openly licensed material exists to write those honestly rather than asserting
them. Two conditions before publishing any of it: every heuristic carries its provenance, and every
topic states plainly where the published record is thin. Lineage and faceted filtering are both
genuinely thin, and saying so is worth more than inventing a rule with no source behind it.
