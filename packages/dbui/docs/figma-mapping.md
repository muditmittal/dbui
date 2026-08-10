# Figma to React mapping

> **RULE: a Figma layer you cannot name in React is a lookup you have not done yet, not a component you need to build.** Every nested layer below resolves to something exported from `dbui`. If a recipe here does not cover your case, flag the gap — do not roll your own.

`component-index.md` tells you which component to pick. Component JSDoc tells you how it behaves. This file tells you what a Figma layer is called in React, and — for the deeply nested families — the exact composition to write.

## The mental model

Figma keeps the component count small by nesting. One menu component covers every row a menu can hold, because the row is an instance of a row component, whose item is an instance of an item component, whose label and trailing edge are instances again. Each level adds a variant axis and the axes multiply.

React gets the same range from composition instead. There is no `type` prop that walks the same space. **The nesting depth in Figma is the child depth in React.**

A component whose Figma name starts with `.` is private. It exists to be nested and is never placed on its own. Those are the ones that look like components and are actually slots.

## Reading a Figma variant

This is where a model goes wrong. A variant switcher in Figma looks like a prop and often is not. Every variant falls into one of four kinds, and you have to decide which before you write anything.

| Kind | Looks like | Actually is | Example |
|---|---|---|---|
| Prop | `Type=Destructive` | a prop | `<DropdownMenuItem variant="destructive">` |
| Different component | `Type=MultiSelect` | a different export | `<DropdownMenuCheckboxItem>` |
| Different subtree | `Type=Submenu` | three components nested | `DropdownMenuSub` + `SubTrigger` + `SubContent` |
| CSS state | `State=Hover` | nothing you write | the browser owns it |

Boolean and instance-swap properties are almost always **a child element**, not a prop. `Show Icon` plus `Icon` is not `icon={...}`, it is a child. Text properties are `children`.

`State` axes are the biggest trap. On `.DropdownMenuItem` the axis holds `Default`, `Hover`, `Press`, `Selected` and `Disabled`. Only two of those reach your code — `Disabled` is the `disabled` prop and `Selected` is `checked`. The rest are CSS. There is no `state` prop anywhere in DBUI.

---

## Dropdown Menu · `dropdown-menu`

The deepest family in the system, and the one to read first. Four levels:

```
Dropdown Menu              the popup
└── .DropdownMenuRow       what kind of row this is
    └── .DropdownMenuItem  what kind of item, when the row is an item
        ├── .DropdownMenuItemContent   leading icon, label, description
        └── .DropdownMenuItemTrailing  shortcut, count or icon on the right
```

Read the current axes off the component sets rather than trusting a list: `.DropdownMenuRow` carries `Type`, `.DropdownMenuItem` carries `Type` and `State`, `.DropdownMenuItemContent` carries `Content` plus `Show Icon` and `Icon`, `.DropdownMenuItemTrailing` carries `Type`.

### Layer to export

| Figma | React |
|---|---|
| `Dropdown Menu` | `DropdownMenu` + `DropdownMenuTrigger` + `DropdownMenuContent` |
| `.DropdownMenuRow Type=Item` | `DropdownMenuItem` |
| `.DropdownMenuRow Type=Label` | `DropdownMenuLabel` |
| `.DropdownMenuRow Type=Separator` | `DropdownMenuSeparator` |
| `.DropdownMenuRow Type=Search` | `DropdownMenuSearch` |
| `.DropdownMenuRow Type=Empty` | `DropdownMenuEmpty` |
| `.DropdownMenuRow Type=Loading` | `DropdownMenuLoading` |
| `.DropdownMenuRow Type=Footer` | `DropdownMenuFooter` |
| `.DropdownMenuRow Type=Add New` | no export — see the gaps table |
| `.DropdownMenuItem Type=Action` | `DropdownMenuItem` |
| `.DropdownMenuItem Type=Destructive` | `DropdownMenuItem variant="destructive"` |
| `.DropdownMenuItem Type=MultiSelect` | `DropdownMenuCheckboxItem` |
| `.DropdownMenuItem Type=SingleSelect` | `DropdownMenuRadioItem` inside `DropdownMenuRadioGroup` |
| `.DropdownMenuItem Type=Submenu` | `DropdownMenuSub` + `DropdownMenuSubTrigger` + `DropdownMenuSubContent` |
| `.DropdownMenuItem State=Disabled` | `disabled` |
| `.DropdownMenuItem State=Selected` | `checked` on a checkbox item, matching `value` on a radio item |
| `DropdownMenuItemIndicator` | rendered for you — never write it |
| `DropdownMenuItemIcon` (`Show Icon`) | `DropdownMenuItemIcon` child |
| `.DropdownMenuItemContent Content=With Description` | `DropdownMenuItemDescription` child |
| `.DropdownMenuItemTrailing Type=Hint` | `DropdownMenuShortcut` child |
| `.DropdownMenuItemTrailing Type=Count` | `DropdownMenuItemBadge` child |
| `.DropdownMenuItemTrailing Type=None` | omit the child |

### Compositions

Every row type a menu can hold. All of these go inside `DropdownMenuContent`.

#### Menu shell

```tsx
import { Button } from "dbui/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "dbui/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline">Actions</Button>} />
  <DropdownMenuContent>
    <DropdownMenuItem>Rename</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

#### Plain item

```tsx
<DropdownMenuItem>Rename</DropdownMenuItem>
```

#### Item with a leading icon

`Show Icon=true` plus an `Icon` swap. Icon consistency is a constraint on the item — if one item in a group has an icon, all of them must, or the labels misalign.

```tsx
<DropdownMenuItem>
  <DropdownMenuItemIcon>
    <Pencil />
  </DropdownMenuItemIcon>
  Rename
</DropdownMenuItem>
```

#### Item with a trailing shortcut

`.DropdownMenuItemTrailing Type=Hint`. Shortcuts use symbols, not words.

```tsx
<DropdownMenuItem>
  <DropdownMenuItemIcon>
    <Copy />
  </DropdownMenuItemIcon>
  Duplicate
  <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
</DropdownMenuItem>
```

#### Item with a trailing count

`.DropdownMenuItemTrailing Type=Count`.

```tsx
<DropdownMenuItem>
  Notifications
  <DropdownMenuItemBadge>12</DropdownMenuItemBadge>
</DropdownMenuItem>
```

#### Item with a description

`.DropdownMenuItemContent Content=With Description`. Figma wraps the two lines in `DropdownMenuItemText`. React has no wrapper export, so the stack is a plain `div`.

```tsx
<DropdownMenuItem>
  <div>
    Serverless
    <DropdownMenuItemDescription>Starts in seconds</DropdownMenuItemDescription>
  </div>
</DropdownMenuItem>
```

#### Item with a submenu

Not a prop. Three components, and the submenu contents have no Figma node at all — the Figma variant only draws the trigger row.

```tsx
<DropdownMenuSub>
  <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
  <DropdownMenuSubContent>
    <DropdownMenuItem>Archive</DropdownMenuItem>
    <DropdownMenuItem>Trash</DropdownMenuItem>
  </DropdownMenuSubContent>
</DropdownMenuSub>
```

`DropdownMenuSubTrigger` appends its own chevron. Never add one.

#### Checkbox item

A different export, not `DropdownMenuItem`. The checkbox is rendered for you — `DropdownMenuItemIndicator` in Figma is not something you write.

```tsx
<DropdownMenuCheckboxItem
  checked={showArchived}
  onCheckedChange={setShowArchived}
>
  Show archived
</DropdownMenuCheckboxItem>
```

#### Radio item

A different export plus a wrapper that has no Figma node. Radio items outside a `DropdownMenuRadioGroup` do not work.

```tsx
<DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
  <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
  <DropdownMenuRadioItem value="modified">Last modified</DropdownMenuRadioItem>
</DropdownMenuRadioGroup>
```

#### Group label

```tsx
<DropdownMenuLabel>Sort by</DropdownMenuLabel>
```

Use `DropdownMenuGroup` around the labeled rows to associate them. It has no Figma node.

#### Separator

```tsx
<DropdownMenuSeparator />
```

#### Destructive item

The one item type that is a real prop. It goes last, after a separator.

```tsx
<DropdownMenuSeparator />
<DropdownMenuItem variant="destructive">
  <DropdownMenuItemIcon>
    <Trash />
  </DropdownMenuItemIcon>
  Delete
</DropdownMenuItem>
```

#### Disabled item

```tsx
<DropdownMenuItem disabled>Restore</DropdownMenuItem>
```

#### Search, empty and loading rows

```tsx
<DropdownMenuSearch placeholder="Filter tables" value={q} onChange={onChange} />
<DropdownMenuLoading />
<DropdownMenuEmpty />
```

#### Footer row

```tsx
<DropdownMenuFooter>
  <Button variant="outline" size="sm">Cancel</Button>
  <Button size="sm">Apply</Button>
</DropdownMenuFooter>
```

---

## Table · `table`

**Figma models a table by column. React models it by row.** This is the single most misread structure in the file. A `.TableColumn` in Figma holds one header cell and every body cell beneath it. Transpose before you write anything.

```
Table
└── .TableColumn        a column, header cell first
    └── .TableCell      Type = Header | Content | Status | Checkbox | Action
        └── .TableCellContent   Cell type = what the cell shows
```

| Figma | React |
|---|---|
| `Table` | `Table` + `TableHeader` + `TableBody` |
| `.TableColumn` | nothing — transpose into `TableRow` |
| `.TableCell Type=Header` | `TableHead` inside a `TableRow` inside `TableHeader` |
| `.TableCell Type=Content` | `TableCell` |
| `.TableCell Type=Checkbox` | `TableCell` holding a `Checkbox` |
| `.TableCell Type=Action` | `TableCell` holding a `Button size="icon-sm"` or a `DropdownMenu` |
| `.TableCell Sortable=true` | `TableSortButton` inside the `TableHead` |
| `.TableSortButton Sorted=True` | `sorted` plus `direction` |
| `.TableCellContent Cell type=Text` | bare children |
| `Cell type=With Icon` | `TableCellIcon` child |
| `Cell type=Title` | `TableCellTitle` + `TableCellTitleContent` + `TableCellMeta` |
| `Cell type=Status` | `TableCellStatus` wrapping a `Status` |
| `Cell type=User` | `TableCellUser` wrapping an `Avatar` |
| `Cell type=Expandable` | `TableCellExpandable` |
| `Cell type=Time` | `TableCellTime` |
| `Cell type=Tag Group` | no export — compose `Tag` children |

### Compositions

#### Transposing a column-major Figma table

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead numeric>Rows</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>events</TableCell>
      <TableCell numeric>1,204</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

`numeric` has no Figma variant and is not optional for figures. Mirror it on the header or the column splits alignment.

#### Sortable header cell

```tsx
<TableHead>
  Last run
  <TableSortButton sorted direction="desc" onClick={onSort} />
</TableHead>
```

#### Title cell

```tsx
<TableCell>
  <TableCellTitle>
    <TableCellIcon>
      <Table />
    </TableCellIcon>
    <TableCellTitleContent>
      <span>events</span>
      <TableCellMeta>main.analytics</TableCellMeta>
    </TableCellTitleContent>
  </TableCellTitle>
</TableCell>
```

#### Row action cell

The Figma `Type=Action` cell nests an Icon Button. In practice it triggers a menu.

```tsx
<TableCell>
  <DropdownMenu>
    <DropdownMenuTrigger render={
      <Button variant="ghost" size="icon-sm" aria-label="Row actions">
        <Overflow />
      </Button>
    } />
    <DropdownMenuContent align="end">
      <DropdownMenuItem>Open</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</TableCell>
```

---

## Form Input · `field`

Figma calls the family `Form Input`. React calls it `Field`, and the control is a sibling you choose, not a variant you set.

```
Form Input          Type = which control, Show = which state, Hint = boolean
├── Label
├── <the control>   Input | Select | Combobox | Typeahead Combobox | Textarea | Input Group
└── FieldError      present only when Show=Error
```

| Figma | React |
|---|---|
| `Form Input` | `Field` |
| `Label` | `FieldLabel` |
| `Type=Input` | a `Input` child |
| `Type=Select` | a `Select` child |
| `Type=Combobox` | a `Combobox` child |
| `Type=Typeahead Combobox` | a `Combobox multiple` child with `ComboboxChips` |
| `Type=Textarea` | a `Textarea` child |
| `Type=Browse` | an `InputGroup` child |
| `Hint=true` | `FieldDescription` |
| `Show=Error`, `FieldError` | `FieldError` plus `aria-invalid` on the control |
| `Show=Active` | focus — nothing you write |

`Type` is not a prop on `Field`. It selects which child you render.

#### Field with an error

```tsx
<Field>
  <FieldLabel htmlFor="catalog">Catalog</FieldLabel>
  <Input id="catalog" aria-invalid />
  <FieldError>Catalog is required</FieldError>
</Field>
```

#### Field with helper text

```tsx
<Field>
  <FieldLabel htmlFor="path">Path</FieldLabel>
  <Input id="path" />
  <FieldDescription>Relative to the workspace root</FieldDescription>
</Field>
```

Note the shape Figma cannot draw: `Field` also takes `orientation` of `vertical`, `horizontal` or `responsive`, and `FieldSet` plus `FieldLegend` group fields. None of those have a Figma variant.

---

## Split Button · `split-button`

Figma ships one component with `Variant` and `Size`. React ships a container you fill.

| Figma | React |
|---|---|
| `Split Button` | `SplitButton` wrapper |
| inner `Button` | a `Button` child carrying the variant and size |
| the gap between the two buttons | `SplitButtonSeparator` — Figma has no layer for it |
| `SplitButtonMenuTrigger` | a `Button size="icon-md"` holding a `ChevronDown` |
| `Variant=Primary` | the child `Button`'s `variant="default"` |
| `Variant=Outline` | the child `Button`'s `variant="outline"` |
| `Size=Default \| Small` | the child `Button`'s `size` of `md` or `sm` |

Neither Figma variant is a prop on `SplitButton`. Both live on the children. `SplitButton`'s own prop is `orientation`, which Figma has no variant for.

#### Split button with a menu

```tsx
<SplitButton>
  <Button>Run</Button>
  <SplitButtonSeparator />
  <DropdownMenu>
    <DropdownMenuTrigger render={
      <Button size="icon-md" aria-label="Run options">
        <ChevronDown />
      </Button>
    } />
    <DropdownMenuContent align="end">
      <DropdownMenuItem>Run with parameters</DropdownMenuItem>
      <DropdownMenuItem>Dry run</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</SplitButton>
```

---

## Input Group · `input-group`

`Type=Filter` and `Type=Browse` are not props. They are two arrangements of the same parts.

| Figma | React |
|---|---|
| `Input Group` | `InputGroup` |
| inner `Input` | `InputGroupInput` — never a plain `Input` |
| `Type=Filter`'s `Icon Button` | `InputGroupButton` inside an `InputGroupAddon align="inline-end"` |
| `Type=Browse`'s `Button` | `InputGroupButton` inside an `InputGroupAddon align="inline-end"` |
| `Active=True` | focus — nothing you write |
| `.InputContent Show Icon` | an icon inside an `InputGroupAddon align="inline-start"` |

#### Filter input with a leading icon and a trailing button

```tsx
<InputGroup>
  <InputGroupAddon align="inline-start">
    <Search />
  </InputGroupAddon>
  <InputGroupInput placeholder="Filter tables" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton size="icon-xs" aria-label="Filter options">
      <Filter />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

---

## Shared leaf slots

Three private components appear inside many families. Recognizing them saves a lookup.

| Figma | Appears in | React |
|---|---|---|
| `.ActionLabel` | Button, Split Button, menu footer and add-new rows | the `Button`'s children — an icon element then text |
| `.InputContent` | Input, Select, Combobox, Input Group, menu search row | the input's `placeholder` or `value`, plus addon children |
| `.TableCellContent` | Table | the `TableCell*` children above |

`.ActionLabel`'s `Show Icon` and `Show Menu` booleans are children, not props. `Show Menu` is `ButtonChevron`, which the button does not add for you.

```tsx
<Button>
  <Plus />
  Add table
</Button>

<Button variant="outline">
  Options
  <ButtonChevron />
</Button>
```

---

## Where Figma and React disagree

Real gaps, not lookup failures. Both sides are listed so neither surface silently wins.

### Figma expresses it, React has no name for it

| Figma | What you have to write instead |
|---|---|
| `.DropdownMenuRow Type=Add New` | a ghost `Button` inside the menu — no `DropdownMenuAddNew` export |
| `.DropdownMenuItemTrailing Type=Icon` | a bare icon with `ml-auto` — only `DropdownMenuSubTrigger` has a built-in trailing icon |
| `DropdownMenuItemText` | a plain `div` wrapping the label and `DropdownMenuItemDescription` |
| `.TableCellContent Cell type=Tag Group` | `Tag` children in a flex row |
| `Split Button` `Size` | the child `Button`'s `size` — the wrapper has no size |
| `Input Group` `Type` | a different addon arrangement |
| `Form Input` `Type` | a different control child |

The first three are the ones worth closing. Each one currently forces either a raw element or an undocumented utility class into a system that bans both.

### React expresses it, Figma has no variant for it

| React | Why it matters |
|---|---|
| `DropdownMenuGroup` | grouping is semantic and invisible in Figma |
| `DropdownMenuRadioGroup` | required — radio items do not work without it |
| the contents of `DropdownMenuSubContent` | Figma draws the submenu trigger only |
| `DropdownMenuContent` `align` `side` `sideOffset` `alignOffset` | the Figma `Dropdown Menu` component carries no properties at all |
| `DropdownMenuItem` `inset` | aligns a label under an icon column |
| `TableCell numeric` | mandatory for figures — Figtree's digits are not equal width |
| `SplitButton` `orientation="vertical"` | Figma is horizontal only |
| `Field` `orientation` | vertical, horizontal and responsive |
| `InputGroupAddon` `align="block-start"` and `"block-end"` | Figma has inline addons only |

### Structural

- **Table is column-major in Figma, row-major in React.** Nothing maps one to one. Transpose.
- **`State` axes are mostly not props.** Only `Disabled` and `Selected` reach code.
- **The `Dropdown Menu` component has a fixed row count in Figma.** It is a canvas, not a constraint. React menus take any number of children.
