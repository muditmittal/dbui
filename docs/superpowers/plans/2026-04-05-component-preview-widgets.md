# Component Preview Widgets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add expandable preview widgets (like Button's VariantBar) to Input, Textarea, Select, Combobox, Checkbox, Radio, Switch, and Toggle — each showing a default preview with all key variants, and an expandable DBUI vs vanilla shadcn comparison table with size/state toggles.

**Architecture:** Generalize the existing Button VariantBar pattern into a reusable `ComponentVariantBar` that accepts component-specific renderers. Each component gets: (1) an enhanced default preview showing key variants at 32px/default size, and (2) an expandable comparison panel with DBUI vs shadcn side-by-side, with state/size toggle buttons. The shadcn column uses inline styles mimicking vanilla shadcn defaults (same approach as `ShadcnButton`).

**Tech Stack:** React 19, Tailwind CSS v4, CVA, existing theme system (`useTheme`), existing `Section` + `VariantBar` patterns.

---

## File Structure

All changes are in a single file — the components page is already a monolithic page component with all preview logic inline (Button's VariantBar, StatePreviewButton, force-state CSS, shadcn styles are all defined here). We follow that pattern.

- **Modify:** `apps/portal/src/app/components/page.tsx` — all new code goes here

---

## Design Decisions

### What gets a VariantBar?
Only components with meaningful variant × state × size matrices. These 8 components:

| Component | Variants | Sizes | States | Total |
|-----------|----------|-------|--------|-------|
| Input | 1 (default) | 2 (default, sm) | 5 (default, hover, focus, disabled, error) | 10 |
| Textarea | 1 | 1 | 5 | 5 |
| Select | 1 | 2 | 5 | 10 |
| Combobox | 1 | 2 | 5 | 10 |
| Checkbox | 2 (unchecked, checked) | 1 | 5 | 10 |
| Radio | 2 (unselected, selected) | 1 | 5 | 10 |
| Switch | 2 (off, on) | 2 | 5 | 20 |
| Toggle | 2 (default, outline) | 2 (sm, md) | 5 (default, hover, press, focus, disabled) | 20 |

### Shared state set for form controls
Form controls share: Default, Hover, Focus, Disabled, Error (not loading/press — those are button-specific).

### shadcn comparison approach
Same as Button: inline-styled `<div>` or native HTML elements mimicking vanilla shadcn's zinc theme. No actual shadcn imports — we recreate the look with hardcoded zinc theme values.

---

## Task 1: Add Force-State CSS for Form Controls

**Files:**
- Modify: `apps/portal/src/app/components/page.tsx` (near line 332, after existing `FORCE_STATE_CSS`)

This task adds CSS class overrides that force visual states on form controls without user interaction, just like `FORCE_STATE_CSS` does for buttons.

- [ ] **Step 1: Add FORCE_STATE_FORM_CSS constant**

Add this right after the existing `FORCE_STATE_CSS` constant (around line 354):

```typescript
const FORCE_STATE_FORM_CSS = `
  /* Input/Textarea/Select hover */
  .force-form-hover input,
  .force-form-hover textarea,
  .force-form-hover [data-slot="select-trigger"] {
    border-color: var(--color-primary-hover) !important;
  }
  /* Input/Textarea/Select focus */
  .force-form-focus input,
  .force-form-focus textarea,
  .force-form-focus [data-slot="select-trigger"] {
    border-color: var(--color-ring) !important;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-ring) 50%, transparent) !important;
  }
  /* Input/Textarea/Select error */
  .force-form-error input,
  .force-form-error textarea,
  .force-form-error [data-slot="select-trigger"] {
    border-color: var(--color-destructive) !important;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-destructive) 20%, transparent) !important;
  }
  /* Checkbox/Radio hover */
  .force-form-hover [data-slot="checkbox"],
  .force-form-hover button[role="radio"] {
    border-color: var(--color-primary-hover) !important;
    background-color: var(--color-hover) !important;
  }
  /* Checkbox/Radio focus */
  .force-form-focus [data-slot="checkbox"],
  .force-form-focus button[role="radio"] {
    border-color: var(--color-ring) !important;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-ring) 50%, transparent) !important;
  }
  /* Switch hover (unchecked) */
  .force-form-hover button[role="switch"]:not([data-checked]) {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 30%, transparent) !important;
  }
  /* Switch hover (checked) */
  .force-form-hover button[role="switch"][data-checked] {
    background-color: var(--color-primary-hover) !important;
  }
  /* Switch focus */
  .force-form-focus button[role="switch"] {
    border-color: var(--color-ring) !important;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-ring) 50%, transparent) !important;
  }
  /* Toggle hover */
  .force-form-hover button[data-slot="toggle"] {
    background-color: var(--color-hover) !important;
  }
  /* Toggle press */
  .force-form-press button[data-slot="toggle"] {
    background-color: var(--color-press) !important;
  }
  /* Toggle focus */
  .force-form-focus button[data-slot="toggle"] {
    border-width: 2px !important;
    border-color: var(--color-ring) !important;
  }
`
```

- [ ] **Step 2: Verify the page still builds**

Run: `cd apps/portal && npx next build 2>&1 | tail -5` (or just check dev server)
Expected: No errors.

---

## Task 2: Add Form Control Types and Shadcn Style Constants

**Files:**
- Modify: `apps/portal/src/app/components/page.tsx` (after the Button variant data, around line 233)

- [ ] **Step 1: Add shared types and state definitions for form controls**

Add after the existing `BUTTON_SIZES` / `SHADCN_SIZE_STYLES` block (around line 233):

```typescript
// ─── Form Control Variant Bar Types ───

type FormState = "default" | "hover" | "focus" | "disabled" | "error"

const FORM_STATES: { key: FormState; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "hover", label: "Hover" },
  { key: "focus", label: "Focus" },
  { key: "disabled", label: "Disabled" },
  { key: "error", label: "Error" },
]

type FormSizeKey = "sm" | "default"

const FORM_SIZES: { key: FormSizeKey; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "sm", label: "Small" },
]

// Toggle-specific states (uses press instead of error)
type ToggleState = "default" | "hover" | "press" | "focus" | "disabled"

const TOGGLE_STATES: { key: ToggleState; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "hover", label: "Hover" },
  { key: "press", label: "Press" },
  { key: "focus", label: "Focus" },
  { key: "disabled", label: "Disabled" },
]

type ToggleSizeKey = "sm" | "md"

const TOGGLE_SIZES: { key: ToggleSizeKey; label: string }[] = [
  { key: "md", label: "Default" },
  { key: "sm", label: "Small" },
]
```

- [ ] **Step 2: Add vanilla shadcn style constants for form controls**

Add right after the above:

```typescript
// ─── Vanilla shadcn Form Styles (zinc theme) ───

const SC_FORM = {
  // shadcn zinc theme form tokens
  border: "#e3e3e7",
  bg: "#ffffff",
  fg: "#08080a",
  muted: "#71717a",
  ring: "#08080a",
  destructive: "#ee4444",
  accent: "#f4f4f5",
  primary: "#17171b",
  primaryFg: "#f9f9f9",
  radius: "calc(0.5rem - 2px)", // rounded-md
}

function shadcnInputStyle(state: FormState, size: FormSizeKey = "default"): React.CSSProperties {
  const base: React.CSSProperties = {
    display: "flex",
    width: "200px",
    borderRadius: SC_FORM.radius,
    border: `1px solid ${SC_FORM.border}`,
    backgroundColor: "transparent",
    padding: size === "sm" ? "4px 8px" : "6px 12px",
    height: size === "sm" ? "28px" : "36px",
    fontSize: "14px",
    lineHeight: "20px",
    color: SC_FORM.fg,
    outline: "none",
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
    boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
  }
  if (state === "hover") return { ...base, borderColor: "#a1a1aa" }
  if (state === "focus") return { ...base, borderColor: SC_FORM.ring, boxShadow: `0 0 0 1px ${SC_FORM.ring}` }
  if (state === "disabled") return { ...base, opacity: 0.5, cursor: "not-allowed" }
  if (state === "error") return { ...base, borderColor: SC_FORM.destructive, boxShadow: `0 0 0 1px ${SC_FORM.destructive}` }
  return base
}

function shadcnCheckboxStyle(state: FormState, checked: boolean): React.CSSProperties {
  const base: React.CSSProperties = {
    width: "16px",
    height: "16px",
    borderRadius: "3px",
    border: checked ? "none" : `1px solid ${SC_FORM.primary}`,
    backgroundColor: checked ? SC_FORM.primary : "transparent",
    color: checked ? SC_FORM.primaryFg : "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  }
  if (state === "hover") return { ...base, borderColor: checked ? undefined : "#52525b" }
  if (state === "focus") return { ...base, boxShadow: `0 0 0 2px ${SC_FORM.ring}` }
  if (state === "disabled") return { ...base, opacity: 0.5, cursor: "not-allowed" }
  if (state === "error") return { ...base, borderColor: SC_FORM.destructive }
  return base
}

function shadcnRadioStyle(state: FormState, selected: boolean): React.CSSProperties {
  const base: React.CSSProperties = {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    border: `1px solid ${SC_FORM.primary}`,
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  }
  if (state === "hover") return { ...base, borderColor: "#52525b" }
  if (state === "focus") return { ...base, boxShadow: `0 0 0 2px ${SC_FORM.ring}` }
  if (state === "disabled") return { ...base, opacity: 0.5, cursor: "not-allowed" }
  if (state === "error") return { ...base, borderColor: SC_FORM.destructive }
  return base
}

function shadcnSwitchStyle(state: FormState, checked: boolean, size: FormSizeKey = "default"): React.CSSProperties {
  const w = size === "sm" ? "36px" : "44px"
  const h = size === "sm" ? "20px" : "24px"
  const base: React.CSSProperties = {
    width: w,
    height: h,
    borderRadius: "9999px",
    backgroundColor: checked ? SC_FORM.primary : SC_FORM.border,
    border: "none",
    padding: "2px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    position: "relative",
    transition: "background-color 0.15s",
  }
  if (state === "hover") return { ...base, backgroundColor: checked ? "#27272a" : "#a1a1aa" }
  if (state === "focus") return { ...base, boxShadow: `0 0 0 2px ${SC_FORM.bg}, 0 0 0 4px ${SC_FORM.ring}` }
  if (state === "disabled") return { ...base, opacity: 0.5, cursor: "not-allowed" }
  return base
}

function shadcnToggleStyle(state: ToggleState, variant: "default" | "outline", size: ToggleSizeKey, pressed: boolean): React.CSSProperties {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    borderRadius: SC_FORM.radius,
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
    cursor: "pointer",
    height: size === "sm" ? "24px" : "36px",
    minWidth: size === "sm" ? "24px" : "36px",
    padding: size === "sm" ? "0 6px" : "0 10px",
    border: variant === "outline" ? `1px solid ${SC_FORM.border}` : "1px solid transparent",
    backgroundColor: pressed ? SC_FORM.accent : "transparent",
    color: pressed ? SC_FORM.fg : SC_FORM.muted,
    boxShadow: variant === "outline" ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
  }
  if (state === "hover") return { ...base, backgroundColor: SC_FORM.accent, color: SC_FORM.fg }
  if (state === "press") return { ...base, backgroundColor: SC_FORM.accent, color: SC_FORM.fg }
  if (state === "focus") return { ...base, boxShadow: `0 0 0 1px ${SC_FORM.ring}` }
  if (state === "disabled") return { ...base, opacity: 0.5, cursor: "not-allowed" }
  return base
}
```

---

## Task 3: Build the Generic FormVariantBar Component

**Files:**
- Modify: `apps/portal/src/app/components/page.tsx` (after the existing `VariantBar` component, around line 590)

This is the reusable expandable comparison panel for form controls. It follows the exact same visual pattern as `VariantBar` but accepts a render function for DBUI and shadcn columns.

- [ ] **Step 1: Add the FormVariantBar component**

Add after the existing `VariantBar` closing brace (around line 590):

```typescript
// ─── Form Control Variant Bar ───

type FormVariantRow = {
  name: string
  dbui: string
  dubois: string
  status: "new" | "tweaked" | "gap" | "covered" | "partial" | "deferred"
}

type FormVariantBarProps<S extends string, SZ extends string> = {
  label: string
  variants: FormVariantRow[]
  states: { key: S; label: string }[]
  sizes?: { key: SZ; label: string }[]
  renderDbui: (variant: FormVariantRow, state: S, size: SZ) => React.ReactNode
  renderShadcn: (variant: FormVariantRow, state: S, size: SZ) => React.ReactNode
  forceStateCss?: string
}

function FormVariantBar<S extends string, SZ extends string>({
  label,
  variants,
  states,
  sizes,
  renderDbui,
  renderShadcn,
  forceStateCss,
}: FormVariantBarProps<S, SZ>) {
  const { t } = useTheme()
  const [open, setOpen] = useState(false)
  const [activeState, setActiveState] = useState<S>(states[0].key)
  const [activeSize, setActiveSize] = useState<SZ>(sizes ? sizes[0].key : ("default" as SZ))

  const stateCount = states.length
  const sizeCount = sizes ? sizes.length : 1
  const total = stateCount * sizeCount * variants.length

  return (
    <div>
      {/* Collapsed bar */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-5 py-3 text-left transition-colors"
        style={{
          backgroundColor: t.cardBg,
          border: `1px solid ${t.border}`,
          borderTop: "none",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: open ? 0 : "0.5rem",
          borderBottomRightRadius: open ? 0 : "0.5rem",
        }}
      >
        <ChevronRight
          className="size-4 flex-shrink-0 transition-transform"
          style={{ color: t.textSubtle, transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
          aria-hidden
        />
        <span
          className="text-[13px] font-semibold tabular-nums"
          style={{ fontFamily: MONO, color: t.primary }}
        >
          {total}
        </span>
        <span className="text-[13px] font-medium" style={{ color: t.text }}>{label}</span>
        <span className="text-[12px]" style={{ color: t.textSubtle }}>
          {stateCount} states{sizeCount > 1 ? ` × ${sizeCount} sizes` : ""} × {variants.length} variant{variants.length > 1 ? "s" : ""}
        </span>
      </button>

      {/* Expanded panel */}
      {open && (
        <div
          className="overflow-hidden"
          style={{
            border: `1px solid ${t.border}`,
            borderTop: "none",
            borderBottomLeftRadius: "0.5rem",
            borderBottomRightRadius: "0.5rem",
          }}
        >
          {/* Controls bar */}
          <div
            className="flex items-center justify-between px-5 py-2"
            style={{ borderBottom: `1px solid ${t.border}`, backgroundColor: t.cardBg }}
          >
            {/* Size toggles (if applicable) */}
            <div className="flex items-center gap-4">
              {sizes && sizes.length > 1 && (
                <div className="flex items-center gap-2">
                  <span className="text-[11px]" style={{ fontFamily: MONO, color: t.textSubtle }}>Size</span>
                  <div className="flex gap-0.5">
                    {sizes.map((s) => (
                      <button
                        key={s.key}
                        onClick={() => setActiveSize(s.key)}
                        className="text-[11px] px-2 py-1 rounded-md transition-colors"
                        style={{
                          fontFamily: MONO,
                          color: activeSize === s.key ? t.text : t.textSubtle,
                          backgroundColor: activeSize === s.key ? t.hoverBg : "transparent",
                          border: activeSize === s.key ? `1px solid ${t.border}` : "1px solid transparent",
                        }}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* State toggles */}
            <div className="flex items-center gap-2">
              <span className="text-[11px]" style={{ fontFamily: MONO, color: t.textSubtle }}>State</span>
              <div className="flex gap-0.5">
                {states.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setActiveState(s.key)}
                    className="text-[11px] px-2.5 py-1 rounded-md transition-colors"
                    style={{
                      fontFamily: MONO,
                      color: activeState === s.key ? t.text : t.textSubtle,
                      backgroundColor: activeState === s.key ? t.hoverBg : "transparent",
                      border: activeState === s.key ? `1px solid ${t.border}` : "1px solid transparent",
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Force-state CSS */}
          {forceStateCss && <style>{forceStateCss}</style>}

          {/* Comparison table */}
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]" style={{ fontFamily: MONO }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${t.border}`, backgroundColor: t.bg }}>
                  <th className="text-left px-5 py-2.5 font-normal" style={{ color: t.textSubtle, width: "22%" }}>Variant</th>
                  <th className="text-center px-4 py-2.5 font-normal" style={{ color: t.textSubtle, width: "30%" }}>DBUI</th>
                  <th className="text-center px-4 py-2.5 font-normal" style={{ color: t.textSubtle, width: "30%" }}>shadcn</th>
                  <th className="text-left px-5 py-2.5 font-normal" style={{ color: t.textSubtle, width: "18%" }}>DuBois</th>
                </tr>
              </thead>
              <tbody>
                {variants.map((v, i) => (
                  <tr
                    key={v.name}
                    style={{ borderBottom: i < variants.length - 1 ? `1px solid ${t.border}` : undefined }}
                  >
                    <td className="px-5 py-4 align-middle">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px]" style={{ color: t.text }}>{v.name}</span>
                          {v.status !== "covered" && <StatusBadge type={v.status}>{v.status}</StatusBadge>}
                        </div>
                        <span className="text-[11px]" style={{ color: t.textSubtle }}>{v.dbui || "—"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <div className="flex justify-center">
                        {renderDbui(v, activeState, activeSize)}
                      </div>
                    </td>
                    <td className="px-4 py-4 align-middle">
                      <div className="flex justify-center">
                        {renderShadcn(v, activeState, activeSize)}
                      </div>
                    </td>
                    <td className="px-5 py-4 align-middle">
                      <span className="text-[12px]" style={{ color: t.text }}>{v.dubois}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
```

---

## Task 4: Input Preview Widget

**Files:**
- Modify: `apps/portal/src/app/components/page.tsx` — replace the Input Section (around line 922-936)

- [ ] **Step 1: Add INPUT_VARIANTS data**

Add before the page component (near the other variant data):

```typescript
// ─── Input Variants ───

const INPUT_VARIANTS: FormVariantRow[] = [
  { name: "Default", dbui: "placeholder text", dubois: 'Input', status: "covered" },
  { name: "With Value", dbui: "filled value", dubois: 'Input (filled)', status: "covered" },
  { name: "Disabled", dbui: "disabled", dubois: 'Input disabled', status: "covered" },
]
```

- [ ] **Step 2: Replace Input Section with enhanced preview + VariantBar**

Replace the existing Input Section block with:

```tsx
{/* ─── Input ─── */}
<div>
<Section
  id="input"
  title="Input"
  duboisStoryId="primitives-input-stories--default"
  hasVariantBar
  code={`<Input placeholder="Email address" />
<Input type="password" placeholder="Password" />
<Input size="sm" placeholder="Small" />
<Input disabled placeholder="Disabled" />
<Input aria-invalid placeholder="Error state" />`}
>
  <div className="flex flex-col gap-3 w-full max-w-[300px]">
    <Input placeholder="Email address" />
    <Input type="password" placeholder="Password" />
    <Input size="sm" placeholder="Small size" />
    <Input disabled placeholder="Disabled" />
  </div>
</Section>

<FormVariantBar<FormState, FormSizeKey>
  label="Variants"
  variants={INPUT_VARIANTS}
  states={FORM_STATES}
  sizes={FORM_SIZES}
  forceStateCss={FORCE_STATE_FORM_CSS}
  renderDbui={(v, state, size) => {
    const stateClass = (state === "hover" || state === "focus") ? `force-form-${state}` : state === "error" ? "force-form-error" : ""
    return (
      <div className={stateClass}>
        <Input
          placeholder={v.name === "With Value" ? undefined : "Placeholder"}
          defaultValue={v.name === "With Value" ? "john@databricks.com" : undefined}
          size={size}
          disabled={state === "disabled" || v.name === "Disabled"}
          aria-invalid={state === "error" ? true : undefined}
          className="w-[200px]"
        />
      </div>
    )
  }}
  renderShadcn={(v, state, size) => (
    <input
      style={shadcnInputStyle(state === "disabled" || v.name === "Disabled" ? "disabled" : state, size)}
      placeholder={v.name === "With Value" ? undefined : "Placeholder"}
      defaultValue={v.name === "With Value" ? "john@databricks.com" : undefined}
      disabled={state === "disabled" || v.name === "Disabled"}
      readOnly
    />
  )}
/>
</div>
```

---

## Task 5: Textarea Preview Widget

**Files:**
- Modify: `apps/portal/src/app/components/page.tsx` — replace the Textarea Section

- [ ] **Step 1: Add TEXTAREA_VARIANTS data**

```typescript
const TEXTAREA_VARIANTS: FormVariantRow[] = [
  { name: "Default", dbui: "placeholder text", dubois: 'Input (textarea)', status: "covered" },
  { name: "With Value", dbui: "filled value", dubois: 'Input (textarea, filled)', status: "covered" },
]
```

- [ ] **Step 2: Replace Textarea Section**

```tsx
{/* ─── Textarea ─── */}
<div>
<Section
  id="textarea"
  title="Textarea"
  duboisStoryId="primitives-input-stories--textarea"
  hasVariantBar
  code={`<Textarea placeholder="Type your message..." />
<Textarea disabled placeholder="Disabled" />
<Textarea aria-invalid placeholder="Error state" />`}
>
  <Textarea placeholder="Type your message..." className="max-w-[300px]" />
</Section>

<FormVariantBar<FormState, FormSizeKey>
  label="Variants"
  variants={TEXTAREA_VARIANTS}
  states={FORM_STATES}
  renderDbui={(v, state) => {
    const stateClass = (state === "hover" || state === "focus") ? `force-form-${state}` : state === "error" ? "force-form-error" : ""
    return (
      <div className={stateClass}>
        <Textarea
          placeholder={v.name === "With Value" ? undefined : "Placeholder"}
          defaultValue={v.name === "With Value" ? "This is some content..." : undefined}
          disabled={state === "disabled"}
          aria-invalid={state === "error" ? true : undefined}
          className="w-[200px] min-h-[60px]"
        />
      </div>
    )
  }}
  renderShadcn={(v, state) => (
    <textarea
      style={{
        ...shadcnInputStyle(state, "default"),
        width: "200px",
        minHeight: "60px",
        height: "auto",
        padding: "8px 12px",
        resize: "none",
      }}
      placeholder={v.name === "With Value" ? undefined : "Placeholder"}
      defaultValue={v.name === "With Value" ? "This is some content..." : undefined}
      disabled={state === "disabled"}
      readOnly
    />
  )}
/>
</div>
```

---

## Task 6: Select Preview Widget

**Files:**
- Modify: `apps/portal/src/app/components/page.tsx` — replace the Select Section

- [ ] **Step 1: Add SELECT_VARIANTS data**

```typescript
const SELECT_VARIANTS: FormVariantRow[] = [
  { name: "Placeholder", dbui: 'placeholder shown', dubois: 'Select', status: "covered" },
  { name: "With Value", dbui: 'value selected', dubois: 'Select (filled)', status: "covered" },
]
```

- [ ] **Step 2: Replace Select Section**

```tsx
{/* ─── Select ─── */}
<div>
<Section
  id="select"
  title="Select"
  duboisStoryId="primitives-select-stories--default"
  hasVariantBar
  code={`<Select>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
  </SelectContent>
</Select>

{/* Small size */}
<SelectTrigger size="sm">...</SelectTrigger>`}
>
  <div className="flex items-center gap-3">
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
      </SelectContent>
    </Select>
    <Select>
      <SelectTrigger className="w-[160px]" size="sm">
        <SelectValue placeholder="Small" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Option A</SelectItem>
        <SelectItem value="b">Option B</SelectItem>
      </SelectContent>
    </Select>
  </div>
</Section>

<FormVariantBar<FormState, FormSizeKey>
  label="Variants"
  variants={SELECT_VARIANTS}
  states={FORM_STATES}
  sizes={FORM_SIZES}
  forceStateCss={FORCE_STATE_FORM_CSS}
  renderDbui={(v, state, size) => {
    const stateClass = (state === "hover" || state === "focus") ? `force-form-${state}` : state === "error" ? "force-form-error" : ""
    return (
      <div className={stateClass}>
        <Select defaultValue={v.name === "With Value" ? "apple" : undefined}>
          <SelectTrigger className="w-[200px]" size={size} disabled={state === "disabled"} aria-invalid={state === "error" ? true : undefined}>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>
      </div>
    )
  }}
  renderShadcn={(v, state, size) => (
    <div
      style={{
        ...shadcnInputStyle(state, size),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        color: v.name === "Placeholder" ? SC_FORM.muted : SC_FORM.fg,
      }}
    >
      <span>{v.name === "With Value" ? "Apple" : "Select a fruit"}</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={SC_FORM.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
    </div>
  )}
/>
</div>
```

---

## Task 7: Checkbox Preview Widget

**Files:**
- Modify: `apps/portal/src/app/components/page.tsx` — replace the Checkbox Section

- [ ] **Step 1: Add CHECKBOX_VARIANTS data**

```typescript
const CHECKBOX_VARIANTS: FormVariantRow[] = [
  { name: "Unchecked", dbui: 'default', dubois: 'Checkbox', status: "covered" },
  { name: "Checked", dbui: 'defaultChecked', dubois: 'Checkbox checked', status: "covered" },
]
```

- [ ] **Step 2: Replace Checkbox Section**

```tsx
{/* ─── Checkbox ─── */}
<div>
<Section
  id="checkbox"
  title="Checkbox"
  duboisStoryId="primitives-checkbox-stories--default"
  hasVariantBar
  code={`<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms</Label>
</div>

<Checkbox defaultChecked />
<Checkbox disabled />`}
>
  <div className="flex flex-col gap-3">
    <label className="flex items-center gap-2 cursor-pointer">
      <Checkbox id="c1" defaultChecked />
      <span className="text-[13px]">Checked</span>
    </label>
    <label className="flex items-center gap-2 cursor-pointer">
      <Checkbox id="c2" />
      <span className="text-[13px]">Unchecked</span>
    </label>
    <label className="flex items-center gap-2 cursor-pointer opacity-50">
      <Checkbox id="c3" disabled />
      <span className="text-[13px]">Disabled</span>
    </label>
  </div>
</Section>

<FormVariantBar<FormState, string>
  label="Variants"
  variants={CHECKBOX_VARIANTS}
  states={FORM_STATES}
  forceStateCss={FORCE_STATE_FORM_CSS}
  renderDbui={(v, state) => {
    const checked = v.name === "Checked"
    const stateClass = (state === "hover" || state === "focus") ? `force-form-${state}` : ""
    return (
      <div className={`flex items-center gap-2 ${stateClass}`}>
        <Checkbox defaultChecked={checked} disabled={state === "disabled"} />
        <span className="text-[13px]">Label</span>
      </div>
    )
  }}
  renderShadcn={(v, state) => {
    const checked = v.name === "Checked"
    return (
      <div className="flex items-center gap-2">
        <div style={shadcnCheckboxStyle(state, checked)}>
          {checked && (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
        <span style={{ fontSize: "14px", fontFamily: 'ui-sans-serif, system-ui, sans-serif', color: state === "disabled" ? SC_FORM.muted : SC_FORM.fg }}>Label</span>
      </div>
    )
  }}
/>
</div>
```

---

## Task 8: Radio Group Preview Widget

**Files:**
- Modify: `apps/portal/src/app/components/page.tsx` — replace the Radio Section

- [ ] **Step 1: Add RADIO_VARIANTS data**

```typescript
const RADIO_VARIANTS: FormVariantRow[] = [
  { name: "Unselected", dbui: 'default', dubois: 'Radio', status: "covered" },
  { name: "Selected", dbui: 'checked', dubois: 'Radio selected', status: "covered" },
]
```

- [ ] **Step 2: Replace Radio Section**

```tsx
{/* ─── Radio Group ─── */}
<div>
<Section
  id="radio"
  title="Radio Group"
  duboisStoryId="primitives-radio-stories--default"
  hasVariantBar
  code={`<RadioGroup defaultValue="option-1">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-1" id="r1" />
    <Label htmlFor="r1">Option 1</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option-2" id="r2" />
    <Label htmlFor="r2">Option 2</Label>
  </div>
</RadioGroup>`}
>
  <RadioGroup defaultValue="option-1">
    <label className="flex items-center gap-2 cursor-pointer">
      <RadioGroupItem value="option-1" id="r1" />
      <span className="text-[13px]">Default plan</span>
    </label>
    <label className="flex items-center gap-2 cursor-pointer">
      <RadioGroupItem value="option-2" id="r2" />
      <span className="text-[13px]">Pro plan</span>
    </label>
    <label className="flex items-center gap-2 cursor-pointer">
      <RadioGroupItem value="option-3" id="r3" />
      <span className="text-[13px]">Enterprise</span>
    </label>
  </RadioGroup>
</Section>

<FormVariantBar<FormState, string>
  label="Variants"
  variants={RADIO_VARIANTS}
  states={FORM_STATES}
  forceStateCss={FORCE_STATE_FORM_CSS}
  renderDbui={(v, state) => {
    const selected = v.name === "Selected"
    const stateClass = (state === "hover" || state === "focus") ? `force-form-${state}` : ""
    return (
      <div className={stateClass}>
        <RadioGroup defaultValue={selected ? "opt" : undefined}>
          <label className="flex items-center gap-2">
            <RadioGroupItem value="opt" disabled={state === "disabled"} />
            <span className="text-[13px]">Label</span>
          </label>
        </RadioGroup>
      </div>
    )
  }}
  renderShadcn={(v, state) => {
    const selected = v.name === "Selected"
    return (
      <div className="flex items-center gap-2">
        <div style={shadcnRadioStyle(state, selected)}>
          {selected && (
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: SC_FORM.primary }} />
          )}
        </div>
        <span style={{ fontSize: "14px", fontFamily: 'ui-sans-serif, system-ui, sans-serif', color: state === "disabled" ? SC_FORM.muted : SC_FORM.fg }}>Label</span>
      </div>
    )
  }}
/>
</div>
```

---

## Task 9: Switch Preview Widget

**Files:**
- Modify: `apps/portal/src/app/components/page.tsx` — replace the Switch Section

- [ ] **Step 1: Add SWITCH_VARIANTS data**

```typescript
const SWITCH_VARIANTS: FormVariantRow[] = [
  { name: "Off", dbui: 'default (unchecked)', dubois: 'Switch', status: "covered" },
  { name: "On", dbui: 'defaultChecked', dubois: 'Switch checked', status: "covered" },
]
```

- [ ] **Step 2: Replace Switch Section**

```tsx
{/* ─── Switch ─── */}
<div>
<Section
  id="switch"
  title="Switch"
  duboisStoryId="primitives-switch-stories--default"
  hasVariantBar
  code={`<Switch />
<Switch defaultChecked />
<Switch size="sm" />
<Switch disabled />`}
>
  <div className="flex flex-col gap-3">
    <label className="flex items-center gap-2 cursor-pointer">
      <Switch id="s1" defaultChecked />
      <span className="text-[13px]">Notifications</span>
    </label>
    <label className="flex items-center gap-2 cursor-pointer">
      <Switch id="s2" size="sm" />
      <span className="text-[13px]">Small size</span>
    </label>
    <label className="flex items-center gap-2 cursor-pointer opacity-50">
      <Switch id="s3" disabled />
      <span className="text-[13px]">Disabled</span>
    </label>
  </div>
</Section>

<FormVariantBar<FormState, FormSizeKey>
  label="Variants"
  variants={SWITCH_VARIANTS}
  states={FORM_STATES}
  sizes={FORM_SIZES}
  forceStateCss={FORCE_STATE_FORM_CSS}
  renderDbui={(v, state, size) => {
    const checked = v.name === "On"
    const stateClass = (state === "hover" || state === "focus") ? `force-form-${state}` : ""
    return (
      <div className={`flex items-center gap-2 ${stateClass}`}>
        <Switch defaultChecked={checked} size={size} disabled={state === "disabled"} />
        <span className="text-[13px]">Label</span>
      </div>
    )
  }}
  renderShadcn={(v, state, size) => {
    const checked = v.name === "On"
    const thumbSize = size === "sm" ? "16px" : "20px"
    const travel = size === "sm" ? "16px" : "20px"
    return (
      <div className="flex items-center gap-2">
        <div style={shadcnSwitchStyle(state, checked, size)}>
          <div style={{
            width: thumbSize,
            height: thumbSize,
            borderRadius: "50%",
            backgroundColor: "#fff",
            boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
            transform: checked ? `translateX(${travel})` : "translateX(0)",
            transition: "transform 0.15s",
          }} />
        </div>
        <span style={{ fontSize: "14px", fontFamily: 'ui-sans-serif, system-ui, sans-serif', color: state === "disabled" ? SC_FORM.muted : SC_FORM.fg }}>Label</span>
      </div>
    )
  }}
/>
</div>
```

---

## Task 10: Toggle Preview Widget

**Files:**
- Modify: `apps/portal/src/app/components/page.tsx` — replace the Toggle Section

- [ ] **Step 1: Add TOGGLE_VARIANTS data**

```typescript
const TOGGLE_VARIANTS: FormVariantRow[] = [
  { name: "Default", dbui: 'variant="default"', dubois: 'SegmentedControl', status: "covered" },
  { name: "Outline", dbui: 'variant="outline"', dubois: 'SegmentedControl outline', status: "covered" },
  { name: "Pressed", dbui: 'defaultPressed', dubois: 'SegmentedControl active', status: "covered" },
]
```

- [ ] **Step 2: Replace Toggle Section**

```tsx
{/* ─── Toggle ─── */}
<div>
<Section
  id="toggle"
  title="Toggle"
  duboisStoryId="primitives-segmentedcontrol-stories--default"
  hasVariantBar
  code={`<Toggle>Default</Toggle>
<Toggle variant="outline">Outline</Toggle>
<Toggle size="sm">Small</Toggle>
<Toggle defaultPressed>Pressed</Toggle>`}
>
  <div className="flex flex-wrap items-center gap-2">
    <Toggle defaultPressed>Default</Toggle>
    <Toggle variant="outline">Outline</Toggle>
    <Toggle size="sm">Sm</Toggle>
  </div>
</Section>

<FormVariantBar<ToggleState, ToggleSizeKey>
  label="Variants"
  variants={TOGGLE_VARIANTS}
  states={TOGGLE_STATES}
  sizes={TOGGLE_SIZES}
  forceStateCss={FORCE_STATE_FORM_CSS}
  renderDbui={(v, state, size) => {
    const pressed = v.name === "Pressed"
    const variant = v.name === "Outline" ? "outline" as const : "default" as const
    const stateClass = (state === "hover" || state === "press" || state === "focus") ? `force-form-${state}` : ""
    return (
      <div className={stateClass}>
        <Toggle variant={variant} size={size} defaultPressed={pressed} disabled={state === "disabled"} data-slot="toggle">
          {v.name}
        </Toggle>
      </div>
    )
  }}
  renderShadcn={(v, state, size) => {
    const pressed = v.name === "Pressed"
    const variant = v.name === "Outline" ? "outline" as const : "default" as const
    return (
      <button style={shadcnToggleStyle(state, variant, size, pressed)}>
        {v.name}
      </button>
    )
  }}
/>
</div>
```

---

## Task 11: Combobox Preview Widget

**Files:**
- Modify: `apps/portal/src/app/components/page.tsx` — replace the Combobox Section

- [ ] **Step 1: Add COMBOBOX_VARIANTS data**

```typescript
const COMBOBOX_VARIANTS: FormVariantRow[] = [
  { name: "Placeholder", dbui: 'empty input', dubois: 'TypeaheadCombobox', status: "covered" },
  { name: "With Value", dbui: 'selected value', dubois: 'TypeaheadCombobox (filled)', status: "covered" },
]
```

- [ ] **Step 2: Replace Combobox Section**

```tsx
{/* ─── Combobox ─── */}
<div>
<Section
  id="combobox"
  title="Combobox"
  hasVariantBar
  code={`<Combobox>
  <ComboboxInput placeholder="Search fruits..." />
  <ComboboxContent>
    <ComboboxList>
      <ComboboxItem value="apple">Apple</ComboboxItem>
      <ComboboxItem value="banana">Banana</ComboboxItem>
    </ComboboxList>
    <ComboboxEmpty>No results found.</ComboboxEmpty>
  </ComboboxContent>
</Combobox>

{/* Small size */}
<ComboboxInput inputSize="sm" />`}
>
  <div className="flex items-center gap-3">
    <Combobox>
      <ComboboxInput placeholder="Search fruits..." className="w-[200px]" />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxItem value="apple">Apple</ComboboxItem>
          <ComboboxItem value="banana">Banana</ComboboxItem>
          <ComboboxItem value="cherry">Cherry</ComboboxItem>
          <ComboboxItem value="grape">Grape</ComboboxItem>
          <ComboboxItem value="orange">Orange</ComboboxItem>
        </ComboboxList>
        <ComboboxEmpty>No results found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
    <Combobox>
      <ComboboxInput placeholder="With clear" showClear className="w-[200px]" />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxItem value="a">Option A</ComboboxItem>
          <ComboboxItem value="b">Option B</ComboboxItem>
        </ComboboxList>
        <ComboboxEmpty>No results.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  </div>
</Section>

<FormVariantBar<FormState, FormSizeKey>
  label="Variants"
  variants={COMBOBOX_VARIANTS}
  states={FORM_STATES}
  sizes={FORM_SIZES}
  forceStateCss={FORCE_STATE_FORM_CSS}
  renderDbui={(v, state, size) => {
    const stateClass = (state === "hover" || state === "focus") ? `force-form-${state}` : state === "error" ? "force-form-error" : ""
    return (
      <div className={stateClass}>
        <Combobox>
          <ComboboxInput
            placeholder={v.name === "With Value" ? undefined : "Search..."}
            defaultValue={v.name === "With Value" ? "Apple" : undefined}
            inputSize={size}
            disabled={state === "disabled"}
            className="w-[200px]"
          />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxItem value="apple">Apple</ComboboxItem>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    )
  }}
  renderShadcn={(v, state, size) => (
    <div
      style={{
        ...shadcnInputStyle(state, size),
        display: "flex",
        alignItems: "center",
        gap: "4px",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={SC_FORM.muted} strokeWidth="1.5"><circle cx="7" cy="7" r="5.5"/><path d="M11 11l3.5 3.5" strokeLinecap="round"/></svg>
      <span style={{ color: v.name === "Placeholder" ? SC_FORM.muted : SC_FORM.fg, fontSize: "14px" }}>
        {v.name === "With Value" ? "Apple" : "Search..."}
      </span>
    </div>
  )}
/>
</div>
```

---

## Task 12: Verify and Polish

- [ ] **Step 1: Check dev server for errors**

Visit http://localhost:3000/components and verify:
- All 8 new VariantBars render with correct collapsed counts
- Expanding each shows the comparison table
- State toggles change the visual state of both DBUI and shadcn columns
- Size toggles (where applicable) change the component size
- No console errors

- [ ] **Step 2: Visual check all components**

Scroll through each component and verify:
- DBUI column shows actual DBUI-styled components
- shadcn column shows vanilla zinc-themed equivalents
- The visual difference between DBUI and shadcn is clear
- Disabled state reduces opacity on both sides
- Error state shows red borders on DBUI side

- [ ] **Step 3: Fix any TypeScript errors**

Run: `cd apps/portal && npx tsc --noEmit 2>&1 | head -20`
Expected: No errors (or only pre-existing ones).
