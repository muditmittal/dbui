# DBUI — AI Rules

> Seeing this file means DBUI is installed. `./dbui/` and `./dbui-shells/` hold the
> components, icons and tokens. Read this before writing any UI code.
>
> Not installed? https://dbuidesign.vercel.app/install

## Rules

1. **DBUI components only.** Never a raw `<button>`, `<input>` or `<div role="dialog">`.
2. **DBUI icons only.** Never install lucide, heroicons or any icon package.
3. **Semantic tokens only.** Never a hex value or an arbitrary pixel value.
4. **Type goes through the ramp.** `type-label` for single-line UI, `type-body` when
   text wraps, `type-paragraph` for prose. Each class is the whole style — never pair
   one with `leading-`, `font-` or `uppercase`. Numbers in a table use
   `<TableCell numeric>`.
5. **Base UI `render`, not Radix `asChild`.**
   `<DialogTrigger render={<Button />}>Open</DialogTrigger>`
6. **Shell first.** Every page starts with `<Base>`. Never build chrome from scratch.
7. **Tree for hierarchies.** `<DataTreeView>` or `<FileTreeView>` — never nested divs.

## Where to look

Per-component rules live **only** in the component's JSDoc. If something feels
duplicated, the more specific source wins.

| To… | Read |
| --- | --- |
| Pick a component | `./dbui/docs/component-index.md` |
| Read a component's rules | `./dbui/src/components/ui/<name>.tsx` — `@guideline`, `@constraint` |
| Find an icon | `./dbui/docs/icon-index.md` — never guess a name |
| Get entity icons for trees | `./dbui/src/components/icons/entity-icons.ts` |
| Pick a page shell | `./dbui/composition.md` |
| Apply layout and spacing rules | `./dbui/docs/component-rules.md` |
| Write user-facing copy | `./dbui/docs/brandvoice.md` |
| Understand the design language | `./dbui/DESIGN.md` |
| See token values | `./dbui/src/tokens/tokens.css` and `type.css` |
| Browse components live | https://dbuidesign.vercel.app |

## Imports

```tsx
import { Button } from "dbui/components/ui/button"
import { Table } from "dbui/components/ui/table"
import { ChevronDown } from "dbui/components/icons/ChevronDown"
import { Base } from "dbui-shells/shell"
```

One component per path. There is no barrel import.

## Updating

Re-run https://dbuidesign.vercel.app/install. It is the same URL for install and
update.
