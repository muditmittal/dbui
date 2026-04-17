---
name: dbui
description: Build Databricks UI using only DBUI components. Loads the full component API, enforces token usage, prevents raw HTML. Use for any UI implementation task.
---

# DBUI Design System — Build Mode

You are building UI with DBUI, the Databricks component library. Every element you create MUST use DBUI components. No exceptions.

## Setup Check

Before generating any code, verify DBUI is installed:
!`test -f node_modules/@muditmittal/dbui/llms.txt && echo "DBUI installed" || echo "ERROR: @muditmittal/dbui not found. Run: yarn add @muditmittal/dbui"`

## Enforcement Rules

!`cat "${CLAUDE_SKILL_DIR}/rules/enforcement.md"`

## Component API Reference

!`cat node_modules/@muditmittal/dbui/llms.txt`

## Validation Checklist

Before presenting ANY code to the user, verify:

- [ ] Every `<button>` is a `<Button>` from `@muditmittal/dbui/components/ui/button`
- [ ] Every `<input>` is an `<Input>` from `@muditmittal/dbui/components/ui/input`
- [ ] Every dropdown/menu uses `<DropdownMenu>` not a custom popover
- [ ] Every dialog uses `<Dialog>` or `<AlertDialog>` not a custom modal
- [ ] Every icon imports from `@muditmittal/dbui/components/icons/{Name}` not lucide/heroicons
- [ ] Every color uses a semantic token (`bg-primary`, `text-foreground`) not hex
- [ ] Every tree/hierarchy uses `<DataTreeView>` or `<FileTreeView>` not nested divs
- [ ] Triggers use `render` prop (Base UI) not `asChild` (Radix)

If ANY check fails, fix it before showing the code.
