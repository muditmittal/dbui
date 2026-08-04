# DBUI — where things stand

A working tracker, not a roadmap. Everything here is verifiable from the repo;
run the commands in [Verifying this document](#verifying-this-document) rather
than trusting the prose.

**Last updated:** 2026-08-03

---

## The short version

The token layer is finished and generated from one file. The component library is
61 components with a browsable gallery, all paired 1:1 with Figma. The agent
surfaces — CLI, MCP, skills, docs — exist and work.

The two things standing between this and something you could hand to a stranger
are **Figma**, which still carries pre-migration token names, and the **install
path**, which is blocked by the npm registry being unreachable inside the
corporate network.

---

## Layers

| Layer | State | Notes |
| --- | --- | --- |
| Tokens | **Done** | 84 semantic colours × light/dark, 14 type styles, 9 space, 6 radius, 7 size, 3 border, 4 elevation, 6 duration + 1 easing. All generated from `theme.config.mjs`. |
| Icons | **Done** | 450 indexed, semantically tagged, searchable via CLI. |
| Components | **Done, with gaps** | 61 components. 3 have no story; 1 has no `@guideline`. |
| Compositions | **Partial** | Trees, filters and headers exist. Not systematically documented. |
| Shells | **Partial** | 5 archetypes defined. Asset detail templates not built. |
| Docs portal | **Done** | Docs / Components split, gallery, Home, custom Tokens page. |
| CLI + MCP | **Done** | `dbui component|icon|shell|token|docs|search|check|doctor|manifest`. |
| Figma | **Stale** | Variable collections still carry pre-migration names. |
| Install path | **Blocked** | npm registry unreachable inside the corporate network. |

---

## Open work

Ordered by what unblocks the most. Each item says why it matters, not just what
it is.

### 1. Figma token migration

The single largest gap. Figma variable collections still use the pre-migration
semantic names, and the type ramp there predates the current 14 styles — Title 4
in particular is now 16/24 and needs rebinding. Code Connect is clean on colour
but its type sizes are still pixel literals.

Do Figma variables and Code Connect together in one pass, so the two cannot drift
apart. Doing either alone means renaming twice.

### 2. Install path inside Databricks

`registry.npmjs.org` and `registry.yarnpkg.com` both refuse connections from a
corporate machine while `github.com` resolves fine, so this is registry-specific
blocking rather than general network loss. Nothing can be installed or upgraded
until it is resolved, which currently also blocks the Storybook 8.6 → 10.4
upgrade.

This is deliberately a separate workstream from the design system itself.

### 3. Generate the token docs, and check them in CI

`packages/dbui/docs/tokens.md` is hand-written. Three separate documentation
drifts surfaced in a single working session: the linter's font allowlist still
enforced SF Pro after the switch to Figtree, the agent skills still taught
`bg-primary` after Stage C deleted it, and this file's own status banner claimed
the migration had not started months after it landed.

Astryx solves this by generating token docs from the token source and running the
generator with `--check` in CI. That is the actual fix; everything else is
vigilance, and vigilance has already failed three times.

### 4. Move components onto the type ramp

94 `text-[13px]` literals across the components still bypass the named ramp. Not
mechanical — each one is a judgement between `label` (single-line, 13/16) and
`body` (wraps, 13/20). Do it component by component, checking a dense table and
an Alert before going wide.

### 5. Smaller, well-defined items

| Item | Why |
| --- | --- |
| `Platform Header` has no `@guideline` | The only genuine annotation gap — the other 13 the doctor reports are marked excluded or internal, so **the doctor warning itself is misleading and should filter them**. |
| `Date Range`, `Aspect Ratio`, `Label` have no story | The gallery marks them rather than hiding them, so the gap is visible but real. |
| 9 components use raw `opacity-50` for disabled | Should use `surface-disabled` / `text-disabled`. Mixed approaches mean the disabled state is not actually consistent. |
| Storybook 8.6 → 10.4 | Two majors. Storybook 9 removed `addon-essentials`, which `main.ts` imports explicitly, and `@storybook/blocks` moved — every MDX page imports `Meta` from it. Do it on its own branch. Blocked on item 2. |
| Elevation scale is inverted | `1` is the highest surface and `3` the softest, which is counterintuitive. Documented now, but worth reconsidering. |

### 6. Not started

- **Asset detail templates** — 6 page types from the knowledge-wiki prototype, to
  be rebuilt inside the catalog shell.
- **Tree parity** — the DBUI tree needs the features the prototype tree has.
- **Lucide icon pack** — the public-facing swap for the Databricks icons, with a
  matching Figma file.
- **a11y and i18n linters** — designed, not built.
- **Breakpoint tokens** — neither we nor Astryx define them; our shells are
  responsive, so this is a genuine gap rather than a deliberate omission.

---

## Verifying this document

```bash
node packages/dbui-cli/bin/dbui.mjs doctor      # 7 pass, 1 warning
node scripts/design-lint/verify-token-sync.mjs  # config ↔ CSS ↔ Figma agree
node scripts/generate-gallery.mjs               # reports components with no story
yarn workspace portal storybook                 # the portal, on :6006
```

Anything in this file that those commands contradict is wrong. Fix the file.
