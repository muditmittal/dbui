# Tier 1 Component Study: Input, Select, Tabs, Dialog

> Comparison of DuBois, DBUI code, and Figma component structure.
> Created 2026-04-03 as part of the design system build-out.

---

## 1. Input

### DBUI Code API
```
<Input type="text" placeholder="..." disabled aria-invalid />
```
- **Sizes:** Single size (h-8 / 32px). No size prop.
- **States:** Default, Hover (border-primary-hover), Focus (border-ring + ring-3), Disabled (opacity-50 + bg-input/50), Error (aria-invalid → border-destructive + ring)
- **Styling:** rounded-lg (4px), border-input, shadow-xs, text-13px, px-2.5
- **Sub-components:** None — standalone `<input>` wrapper

### DuBois Equivalent
- **Sizes:** `'middle'` (32px) and `'small'` (24px)
- **Props:** `validationState`, `locked`, `hasValue`, `placeholder`, `disabled`
- **Sub-components:** `Input.Password` (visibility toggle), `Input.TextArea`, `Input.Group` (prefix/suffix addons)

### What's Similar
- 32px default height, 4px radius, 13px font
- Hover → blue border, Focus → ring, Disabled → dimmed
- Error via validation state coloring (red border + ring)

### What's Different
| Aspect | DuBois | DBUI |
|--------|--------|------|
| Small size | ✅ 24px | ❌ Not exposed (h-8 only) |
| `locked` state | ✅ (read-only with lock icon) | ❌ Use `readOnly` + styling |
| `validationState` prop | ✅ success/warning/error | ❌ Only error via `aria-invalid` |
| Password toggle | ✅ `Input.Password` | ❌ Compose with InputGroup |

### Figma Component (created)
- **Node:** `597:523` — "Input"
- **Properties:** Size (Default/Small) × State (Default/Hover/Focus/Disabled/Error)
- **10 variants total**

### Recommendations
- **Add:** `size` prop (sm/md) to match DuBois small/middle
- **Add:** Warning/success validation states (use `data-state` attribute?)
- **Defer:** `locked` state — rare pattern, can compose later
- **Defer:** Password variant — use InputGroup composition

---

## 2. Select

### DBUI Code API
```jsx
<Select>
  <SelectTrigger size="default|sm">
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Group</SelectLabel>
      <SelectItem value="1">Option 1</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```
- **Trigger sizes:** `'default'` (h-8/32px), `'sm'` (h-7/28px)
- **States:** Default, Hover (border-primary-hover), Focus (border-ring + ring-3), Disabled, Error (aria-invalid)
- **Styling:** rounded-lg, border-input, shadow-xs, text-13px, w-fit
- **Content:** Popover with scroll arrows, check indicator, item groups, separator

### DuBois Equivalent
- **Component:** `Select` wraps `DialogCombobox` internally
- **Props:** `placeholder`, `value`, `label`
- **Multi-select:** Available via `DialogCombobox` directly (not Select)
- **Related:** `TypeaheadCombobox` (searchable multi-select with live filter)

### What's Similar
- Trigger matches Input styling (border, radius, shadow)
- Single-select with placeholder
- Dropdown with check indicator for selected item

### What's Different
| Aspect | DuBois | DBUI |
|--------|--------|------|
| Internal architecture | Wraps DialogCombobox (AntD-inspired) | Base-UI Select (Radix-like) |
| Multi-select | ✅ via DialogCombobox | ❌ Use Combobox component instead |
| Search/filter | ✅ via TypeaheadCombobox | ❌ Separate pattern |
| Trigger size: small | ✅ 24px | ✅ 28px (h-7, `sm`) — slightly taller |
| Item variants | Standard only | `destructive` variant on items |

### Figma Component (created)
- **Node:** `598:533` — "Select"
- **Properties:** Size (Default/Small) × State (Default/Hover/Focus/Disabled/Error)
- **10 variants total** (trigger only — dropdown content is a separate composition)

### Recommendations
- **Keep:** Current API is solid for single-select
- **Add to Figma:** Dropdown content as separate component (SelectContent)
- **Add to Figma:** Item states (default, hover/focus, selected, disabled)
- **Defer:** Multi-select / Combobox — separate component family

---

## 3. Tabs

### DBUI Code API
```jsx
<Tabs defaultValue="tab1" orientation="horizontal|vertical">
  <TabsList variant="default|line">
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content</TabsContent>
</Tabs>
```
- **List variants:** `'default'` (pill/segmented, bg-muted), `'line'` (underline indicator)
- **Orientation:** Horizontal (default), Vertical
- **Active trigger:** bg-background + shadow-sm (default), underline bar (line)
- **Inactive trigger:** text-foreground/60, hover → text-foreground
- **Styling:** h-8 list, 13px font-semibold triggers, rounded-lg list, rounded-md triggers

### DuBois Equivalent
- **Architecture:** Radix Tabs (same base as DBUI)
- **Compound:** Root, List (`addButtonProps`), Trigger, Content
- **Unique:** `addButtonProps` on List for dynamic tab creation

### What's Similar
- Radix/Base-UI Tabs architecture (identical compound pattern)
- Trigger hover/active states
- Horizontal/vertical orientation support

### What's Different
| Aspect | DuBois | DBUI |
|--------|--------|------|
| Variants | Not documented (likely single) | ✅ `default` (pill) + `line` (underline) |
| `addButtonProps` | ✅ Dynamic tab creation | ❌ Not implemented |
| Line variant | Not in DuBois | ✅ DBUI addition — underline indicator below active tab |
| Size variants | None | None (fixed h-8) |

### Figma Component (created)
- **Node:** `600:517` — "Tabs"
- **Properties:** Variant (Default/Line)
- **2 variants** — each shows 3 tabs with first active

### Recommendations
- **Add to Figma:** TabsTrigger as separate sub-component with states (Default/Hover/Active/Disabled)
- **Add to Figma:** Vertical orientation variant
- **Consider:** `addButtonProps` equivalent (+ button at end of tab list) — useful for Databricks workspaces/notebooks
- **Keep:** Line variant is a good DBUI addition not in DuBois

---

## 4. Dialog

### DBUI Code API
```jsx
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent showCloseButton={true}>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* content */}
    <DialogFooter showCloseButton={false}>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```
- **Content:** Fixed center, max-w-sm (384px), rounded-xl (8px), ring-1 ring-foreground/10
- **Overlay:** bg-black/10, backdrop-blur-xs
- **Close button:** Ghost icon-sm button, absolute top-right
- **Footer:** bg-muted/50, border-t, right-aligned buttons
- **Animation:** fade-in + zoom-in-95

### DuBois Equivalent
- **Component:** `Modal` (not Dialog)
- **Sizes:** `'normal'`, `'wide'`, `'extraWide'` — width variants
- **Props:** `visible`, `onOk`, `onCancel`, `title`, `footer`, `size`, `confirmLoading`, `okText`, `cancelText`, `closable`, `destroyOnClose`
- **Overlay:** rgba(0,0,0,0.26) light / rgba(0,0,0,0.45) dark

### What's Similar
- Center-positioned modal with overlay
- Title + description + content + footer pattern
- Close button in top-right corner
- Footer with Cancel/Confirm buttons

### What's Different
| Aspect | DuBois | DBUI |
|--------|--------|------|
| Size variants | ✅ normal/wide/extraWide | ❌ Single size (sm, 384px) |
| `confirmLoading` | ✅ Loading state on OK button | ❌ Compose with Button loading |
| `destroyOnClose` | ✅ Unmount on close | ❌ Base-UI handles internally |
| `okText`/`cancelText` | ✅ Customizable labels | ❌ Compose (children of Footer) |
| Overlay opacity | 26% light / 45% dark | 10% + backdrop-blur |
| Footer styling | Standard | bg-muted/50 + border-t (distinct tinted footer) |

### Figma Component (created)
- **Node:** `603:793` — "Dialog"
- **Properties:** Variant (Default/WithFooter)
- **2 variants** — header+content, and header+content+footer with Cancel/Confirm

### Recommendations
- **Add:** Size variants (SM/MD/LG mapping to normal/wide/extraWide widths)
- **Add to Figma:** Overlay component (for mockup context)
- **Consider:** `confirmLoading` → already supported by Button loading state, just document the pattern
- **Keep:** Tinted footer with border-t is a nice DBUI touch

---

## Summary: Figma Component Nodes

| Component | Figma Node | Variants | Status |
|-----------|-----------|----------|--------|
| Input | `597:523` | 2 sizes × 5 states = 10 | Created — needs designer review |
| Select | `598:533` | 2 sizes × 5 states = 10 | Created (trigger only) — needs dropdown content |
| Tabs | `600:517` | 2 variants = 2 | Created — needs trigger sub-component + vertical |
| Dialog | `603:793` | 2 variants = 2 | Created — needs size variants |

## Priority Additions After Designer Review

1. **Input:** Add `size` prop to code (sm/md)
2. **Select:** Build SelectContent/SelectItem as Figma sub-components
3. **Tabs:** Build TabsTrigger sub-component with states, add vertical orientation
4. **Dialog:** Add width size variants (SM/MD/LG)
5. **All:** Code Connect files once Figma components are finalized

---

*Created: 2026-04-03*
