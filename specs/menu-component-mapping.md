# Menu Component Mapping — Figma ↔ Code

This document maps every Figma inner component in the menu system to its code equivalent and describes what each provides.

## Composition Hierarchy

```
Figma                                    Code
─────                                    ────
Dropdown Menu                            <DropdownMenu> + <DropdownMenuContent>
  └── .MenuRow                           (implicit — each child is a row)
        ├── Type=DropdownItem            <DropdownMenuItem>
        ├── Type=Section Header          <DropdownMenuLabel> (inside <DropdownMenuGroup>)
        ├── Type=Divider                 <DropdownMenuSeparator>
        ├── Type=Search                  <DropdownMenuSearch>
        ├── Type=Empty                   <DropdownMenuEmpty>
        ├── Type=Loading                 <DropdownMenuLoading>
        ├── Type=Add New                 <DropdownMenuItem> with <Plus /> icon
        └── Type=Footer                  <DropdownMenuFooter>

.DropdownMenuItem                        <DropdownMenuItem> / <DropdownMenuCheckboxItem> / <DropdownMenuRadioItem>
  ├── .MenuLabel                         children of <DropdownMenuItem>
  │     ├── Icon                         <DropdownMenuItemIcon>
  │     ├── Label                        text children
  │     └── Description                  <DropdownMenuItemDescription>
  └── .MenuTrailing                      (composed from sub-components)
        ├── Submenu chevron              <DropdownMenuSubTrigger> (auto-adds chevron)
        ├── Shortcut                     <DropdownMenuShortcut>
        └── Badge/Count                  <DropdownMenuItemBadge>
```

## Full Component Reference

### Row Types (.MenuRow variants)

| Figma .MenuRow Type | Code Component | Height | What it provides |
|---|---|---|---|
| **DropdownItem** | `<DropdownMenuItem>` | min-h-7 (28px), content-driven | Interactive item with hover, focus, disabled states |
| **DropdownItem** (checkbox) | `<DropdownMenuCheckboxItem>` | min-h-7 | Multi-select with DBUI Checkbox on left |
| **DropdownItem** (radio) | `<DropdownMenuRadioItem>` | min-h-7 | Single-select with checkmark on left when selected |
| **DropdownItem** (destructive) | `<DropdownMenuItem variant="destructive">` | min-h-7 | Red text, red hover background |
| **DropdownItem** (submenu) | `<DropdownMenuSubTrigger>` | min-h-7 | Item with chevron › that opens a sub-menu |
| **Section Header** | `<DropdownMenuLabel>` | 24px | Group title — 12px Regular (Hint style), padding 4px 8px |
| **Divider** | `<DropdownMenuSeparator>` | 8px | 1px line with 4px vertical padding |
| **Search** | `<DropdownMenuSearch>` | 40px | DBUI `<Input>` inside 4px padding |
| **Empty** | `<DropdownMenuEmpty>` | 52px | "No results found." centered text |
| **Loading** | `<DropdownMenuLoading>` | 52px | Spinner + "Loading..." text |
| **Footer** | `<DropdownMenuFooter>` | auto | Border-top + action buttons (Cancel/Apply pattern) |

### Item Content (.MenuLabel props)

| Figma .MenuLabel Prop | Code Component | What it provides |
|---|---|---|
| **Label text** | `children` of MenuItem | The item's primary text (13px Paragraph) |
| **Show Icon = true** | `<DropdownMenuItemIcon>` | Leading icon (16px, muted-foreground, foreground on hover) |
| **Icon** (instance swap) | Child of `<DropdownMenuItemIcon>` | Any DBUI icon component |
| **Content = With Description** | `<DropdownMenuItemDescription>` | Secondary text below label (12px Hint, muted-foreground) |

### Trailing Content (.MenuTrailing props)

| Figma .MenuTrailing Type | Code Component | What it provides |
|---|---|---|
| **Submenu chevron** (›) | `<DropdownMenuSubTrigger>` wrapping the item | Auto-adds ChevronRight icon, opens sub-menu |
| **Shortcut** (⌘K) | `<DropdownMenuShortcut>` | Right-aligned keyboard shortcut text (12px, muted-foreground) |
| **Badge/Count** (+3) | `<DropdownMenuItemBadge>` | Right-aligned pill badge (muted bg, 12px semibold) |

### Selection Indicators

| Figma Pattern | Code Component | Indicator Position | Visual |
|---|---|---|---|
| **No selection** | `<DropdownMenuItem>` | — | Plain text, no indicator |
| **Single-select** (checkmark) | `<DropdownMenuRadioItem>` inside `<DropdownMenuRadioGroup>` | Left (absolute left-1.5) | ✓ when selected, empty when not |
| **Multi-select** (checkbox) | `<DropdownMenuCheckboxItem>` | Left (inline) | DBUI Checkbox (☐ unchecked, ☑ checked) |

### Container (.Dropdown Menu)

| Property | Value | Token |
|---|---|---|
| Border radius | 8px | `rounded-md` |
| Padding | 4px | `p-1` |
| Shadow | 0 2px 16px rgba(0,0,0,0.08) | `shadow-md` |
| Border | 1px ring | `ring-1 ring-foreground/10` |
| Background | popover | `bg-popover` |
| Max height | available height | `max-h-(--available-height)` |
| Min width | 36px (or anchor width) | `min-w-36` |

## Cross-Component Consistency

All three menu types share the same sub-components:

| Sub-component | DropdownMenu | ContextMenu | Menubar |
|---|---|---|---|
| MenuItem | ✅ | ✅ | ✅ |
| CheckboxItem (with Checkbox) | ✅ | ✅ | ✅ |
| RadioItem (check on left) | ✅ | ✅ | ✅ |
| ItemIcon | ✅ | ✅ | ✅ |
| ItemDescription | ✅ | ✅ | ✅ |
| ItemBadge | ✅ | ✅ | ✅ |
| Shortcut | ✅ | ✅ | ✅ |
| Label (12px Hint) | ✅ | ✅ | ✅ |
| Separator | ✅ | ✅ | ✅ |
| Search (DBUI Input) | ✅ | ✅ | ✅ |
| Empty | ✅ | ✅ | ✅ |
| Loading | ✅ | ✅ | ✅ |
| Footer | ✅ | ✅ | ✅ |
| Sub/SubTrigger/SubContent | ✅ | ✅ | ✅ |

## Usage Examples

### Simple menu
```tsx
<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline">Options</Button>} />
  <DropdownMenuContent align="start">
    <DropdownMenuItem>Option 1</DropdownMenuItem>
    <DropdownMenuItem>Option 2</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Rich menu (icon + description + shortcut + destructive)
```tsx
<DropdownMenuContent>
  <DropdownMenuItem>
    <DropdownMenuItemIcon><Pencil /></DropdownMenuItemIcon>
    <div>
      Edit
      <DropdownMenuItemDescription>Modify this item</DropdownMenuItemDescription>
    </div>
    <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
  </DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuItem variant="destructive">
    <DropdownMenuItemIcon><Trash /></DropdownMenuItemIcon>
    Delete
  </DropdownMenuItem>
</DropdownMenuContent>
```

### Checkbox multi-select with groups
```tsx
<DropdownMenuContent>
  <DropdownMenuGroup>
    <DropdownMenuLabel>Asset Type</DropdownMenuLabel>
    <DropdownMenuCheckboxItem defaultChecked>Tables</DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem>Notebooks</DropdownMenuCheckboxItem>
  </DropdownMenuGroup>
</DropdownMenuContent>
```

### Radio single-select
```tsx
<DropdownMenuContent>
  <DropdownMenuGroup>
    <DropdownMenuLabel>Sort Order</DropdownMenuLabel>
    <DropdownMenuRadioGroup defaultValue="modified">
      <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="modified">Last Modified</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuGroup>
</DropdownMenuContent>
```

### Searchable menu with states
```tsx
<DropdownMenuContent>
  <DropdownMenuSearch placeholder="Search..." />
  <DropdownMenuSeparator />
  <DropdownMenuItem>Result 1</DropdownMenuItem>
  <DropdownMenuItem>Result 2</DropdownMenuItem>
  <DropdownMenuEmpty>No results found.</DropdownMenuEmpty>
  <DropdownMenuLoading>Loading...</DropdownMenuLoading>
  <DropdownMenuFooter>
    <Button variant="outline" size="sm">Cancel</Button>
    <Button size="sm">Apply</Button>
  </DropdownMenuFooter>
</DropdownMenuContent>
```
