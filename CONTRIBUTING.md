# Contributing to DBUI

This system has many surfaces that describe the same things — component source, JSDoc, markdown
indexes, Figma components, Code Connect files, linter allowlists, and agent docs. They drift the
moment one is updated without the others.

This file exists to make that impossible to do by accident. **Every change type below lists the
complete set of files that must move together.** If you cannot update all of them, do not land the
change.

## The one rule that prevents most drift

**Every kind of rule has exactly one owner.** Never state the same rule in two files. When they
disagree, the more specific source wins.

| Kind of rule | Owned by | Never also state it in |
|---|---|---|
| How one component behaves | That component's JSDoc | Index files, AGENTS.md, DESIGN.md |
| Which component to pick | `docs/component-index.md` | Component JSDoc |
| Which icon to pick | `docs/icon-index.md` | Anywhere else |
| Cross-component spacing, buttons, menus | `docs/component-rules.md` | Component JSDoc |
| Page-level regions, scroll, action placement | `composition.md` | Component JSDoc |
| Voice, tone, microcopy | `docs/brandvoice.md` | Component JSDoc |
| Color token contract | `docs/token-rules.md` | `tokens.md` |
| The visual language as a whole | `DESIGN.md` | Any of the above |
| Repo structure, commands, boundaries | `AGENTS.md` | Anywhere else |

`AGENTS.md` and `DESIGN.md` may *point at* an owner. They may not restate what it says.

## Change protocols

### Adding or changing a component

1. Write or update the component in `packages/dbui/src/components/ui/`.
2. Write its JSDoc: `@standard`, `@guideline`, `@constraint`, `@figma`. This is the authoritative
   rule surface — no other file may duplicate it.
3. Add a row to `packages/dbui/docs/component-index.md`: category, what it is for, what to avoid it
   for, synonyms, Figma layer name.
4. Add the export names to `scripts/design-lint/dbui-components.json` under `ui`, or the linter will
   report it as a non-DBUI component.
5. Add a Storybook story in `apps/portal/src/stories/`.
6. Add or update the Code Connect file in `figma/<Name>.figma.tsx`, and add variant mappings to
   `apps/portal/src/stories/components/variant-mappings.json`.
7. Export it from `packages/dbui/src/index.ts` and add a tsup entry in `packages/dbui/tsup.config.ts`.
8. Add a demo tile to `apps/portal/src/stories/components/gallery-demos.tsx`, keyed by the name shown
   in `component-index.md`, then run `node scripts/generate-gallery.mjs`. The gallery groups and
   links itself from the CLI, but the tile is the one part it cannot infer. A component with no tile
   still appears — it just shows its name instead of a demo.
9. Run `yarn design:lint:react packages/dbui/src/components/ui/<name>.tsx`.

Removing a component reverses all nine, and requires a note in the changelog because it breaks
consumers.

### Adding or changing an icon

1. Add the component to `packages/dbui/src/components/icons/`, with a
   `/** use:<category> <label> | <area> | <synonyms> */` JSDoc tag.
2. Add an entry to `classifications.ts` (`action` | `object` | `indicator` | `component`).
3. Add an entry to `descriptions.ts` using the same `label | area | synonyms` shape.
4. Add a row to `packages/dbui/docs/icon-index.md` under the correct category heading.
5. If it represents an entity type, map it in `entity-icons.ts`.
6. Add it to `figma/icons.figma.tsx`.

All five metadata surfaces must have the same key count. Six icons currently exist without
classification entries — do not add a seventh.

### Changing a design token

1. Edit `packages/dbui/src/tokens/theme.config.mjs`. **Never edit `tokens.css` or
   `scripts/design-lint/tokens.json`** — both are generated and will be overwritten.
2. Run `yarn design:tokens`.
3. Update the matching Figma variable in the Primitive or Semantic collection.
4. Refresh `scripts/design-lint/.figma-token-dump.json` from Figma.
5. Run `yarn design:verify-sync`. It must report in sync before you land.
6. If the change alters the visual language, update the YAML front matter in
   `packages/dbui/DESIGN.md` and the prose section it belongs to.

While the token migration is in flight, also update `docs/token-migration-map.md`.

### Adding or changing a page shell

1. Add or update the section in `packages/dbui/composition.md`: purpose, regions with pixel widths,
   scaling and collapse thresholds, scroll ownership, primary-action location, adjacency rules, and
   a forbidden list. All seven are required.
2. Implement or update the module in `packages/dbui-shells/src/shells/` or `compositions/`.
3. Export it from `packages/dbui-shells/src/index.ts`.
4. Add a Storybook story under `apps/portal/src/stories/surfaces/` or `compositions/`.
5. Update the shell table in `packages/dbui/skills/dbui-build-screen.md`.
6. Build the matching frame in the Figma library and add Code Connect.

A shell described in `composition.md` with no module is documentation an agent cannot act on. Prefer
landing both together.

### Changing repository structure or commands

Update `AGENTS.md` and nothing else. It is the only file that describes the repo layout, and it must
stay under 150 lines — if a section grows past a few lines, move the detail into a doc or a skill and
leave a pointer.

### Changing a public API

Any change to an exported name, prop, or import path also requires an entry in the changelog and a
scan for call sites across `packages/`, `apps/`, and `figma/`.

## Before you land anything

```bash
yarn design:lint:react <changed paths>   # must be clean
yarn design:verify-sync                  # only if tokens changed; must report in sync
yarn workspace portal storybook          # visually confirm in light and dark
```

Then confirm:

- [ ] Every file in the relevant protocol above was updated.
- [ ] No rule is stated in two places.
- [ ] No count, path, or command quoted in prose is now false. Counts in docs are the most common
      thing to go stale — grep for the old number.
- [ ] Nothing generated was hand-edited.
- [ ] Nothing in `archive/` was modified. It is frozen reference.

## Known drift, August 2026

Fix these opportunistically when touching adjacent code, and delete the line when done.

- `component-index.md` and `icon-index.md` are hand-maintained and can lag source. They should be
  generated from JSDoc and `classifications.ts`; until then, treat source as authoritative.
- `dbui-components.json` is hand-maintained. Its README references a `sync-components.ts` that does
  not exist.
- Six icon components have no `classifications.ts` entry: `CircleSmall`, `Databricks`,
  `DatabricksLogo`, `DotsCircleSmall`, `RunningSmall`, `Slash`.
- The token migration is mid-flight: `tokens.css` ships but no component consumes it.

## Working with an AI agent on this repo

Agents drift documentation faster than people do, because they update the file they were asked about
and no others. When directing an agent:

- Name the change type, so it can follow the matching protocol above.
- Ask it to list which files it will touch *before* it edits, and check that list against this file.
- Ask it to verify counts by running a command rather than quoting a number from a doc.
- Treat `archive/` as read-only context. It contains superseded research that will confidently
  contradict current reality.
