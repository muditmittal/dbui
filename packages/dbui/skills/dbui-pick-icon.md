---
name: dbui-pick-icon
description: Find the right DBUI icon for a concept or UI element. Triggers when you need an icon, are inserting an icon into a button/menu/tree/nav, or see an icon import from lucide/heroicons/react-icons. ALWAYS invoke before inserting any icon — never guess icon names.
---

# Pick a DBUI icon

## When to use

- You need to add an icon anywhere in the UI
- You see `from "lucide-react"`, `from "@heroicons/*"`, or `from "react-icons/*"` — these must be replaced with DBUI icons
- You're building a tree, nav, or table with entity icons

## Procedure

1. **Read the icon index.** Open `./dbui/docs/icon-index.md`. This is the canonical 449-icon index with columns: Name, Category, Description, Synonyms.

2. **Search by concept, not icon name.** If you need an icon for "experiments", search for "experiment", "flask", "lab" — the Synonyms column handles aliasing. The index will show `Beaker` (not "Experiment" or "Flask").

3. **Check the Category column** to confirm the icon is appropriate for your context:
   - `object` → Databricks product concepts. Use in: nav items, table cells, cards, tree nodes.
   - `action` → Verbs the user performs. Use in: buttons, toolbar actions, menu items.
   - `indicator` → Status or state. Use in: status badges, alert icons, table status cells.
   - `component` → Control chrome (chevrons, checks, close). Use ONLY inside the designated control — never as standalone nav/content icons.

4. **NEVER use `component` icons outside their control.** ChevronDown belongs inside Select/Combobox/DropdownMenu triggers. CheckmarkFill belongs inside Checkbox. Close belongs inside Dialog/Drawer close buttons. Using them as nav items or standalone icons is a violation.

5. **NEVER use `action` icons to represent objects.** "Download" (action) is not the same as "File" (object). Match the semantic, not the visual shape.

6. **For tree entity icons**, read `./dbui/src/components/icons/entity-icons.ts`. This file maps Databricks entity types (catalog, schema, table, volume, model, etc.) to their canonical icons. NEVER guess entity icons — always look them up.

7. **Import pattern:**
   ```tsx
   import { IconName } from "dbui/components/icons/IconName"
   ```
   One icon per file, PascalCase name matches file name.

## Commonly confused icons

| Concept | Correct icon | NOT |
|---|---|---|
| Experiments | `Beaker` | Flask, Lab, Experiment |
| Jobs / Workflows | `Workflows` | Play, Run, Job |
| Compute / Clusters | `Cloud` | Server, CPU |
| Unity Catalog | `Catalog` | Database, Folder |
| Genie / AI assistant | `SparkleDouble` | Star, Magic, AI |
| SQL Warehouse | `Database` | Server, Cloud |
| Marketplace | `Storefront` | Shop, Cart |
| Notebooks | `Notebook` | File, Document |
| Dashboard | `Dashboard` | Chart, Graph |

## If nothing fits

Search one more time with alternative synonyms. If still no match, flag it: "No icon in DBUI matches [concept] — flag to design system team." Use a close conceptual match as interim, never create a custom SVG.
