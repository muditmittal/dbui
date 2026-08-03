import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta = {
  title: "Tokens",
  parameters: { layout: "padded" },
}

export default meta

// ─── Data ───

const colorTokens = [
  { group: "Surface", tokens: [
    { name: "--background", tw: "bg-surface-base", label: "Background" },
    { name: "--foreground", tw: "text-text-base", label: "Foreground" },
    { name: "--card", tw: "bg-surface-base", label: "Card" },
    { name: "--popover", tw: "bg-surface-base", label: "Popover" },
    { name: "--secondary", tw: "bg-surface-subtle", label: "Secondary" },
    { name: "--muted", tw: "bg-surface-subtle", label: "Muted" },
    { name: "--muted-foreground", tw: "text-text-subtle", label: "Muted FG" },
    { name: "--accent", tw: "bg-surface-accent", label: "Accent" },
    { name: "--accent-foreground", tw: "text-text-accent", label: "Accent FG" },
  ]},
  { group: "Action", tokens: [
    { name: "--primary", tw: "bg-action-primary-base", label: "Primary" },
    { name: "--primary-foreground", tw: "text-action-label-inverse-base", label: "Primary FG" },
    { name: "--primary-hover", tw: "bg-action-primary-hover", label: "Primary Hover" },
    { name: "--primary-press", tw: "bg-action-primary-press", label: "Primary Press" },
    { name: "--destructive", tw: "bg-action-negative-base", label: "Destructive" },
    { name: "--destructive-foreground", tw: "text-action-label-inverse-base", label: "Destructive FG" },
    { name: "--destructive-hover", tw: "bg-action-negative-hover", label: "Destructive Hover" },
    { name: "--destructive-press", tw: "bg-action-negative-press", label: "Destructive Press" },
    { name: "--warning", tw: "text-status-text-warning", label: "Warning" },
    { name: "--success", tw: "text-status-text-positive", label: "Success" },
    { name: "--ring", tw: "border-focus-ring", label: "Ring" },
  ]},
  { group: "Interactive", tokens: [
    { name: "--hover", tw: "bg-action-default-hover", label: "Hover" },
    { name: "--press", tw: "bg-action-selected-press", label: "Press" },
    { name: "--disabled", tw: "bg-surface-disabled", label: "Disabled" },
    { name: "--disabled-foreground", tw: "text-text-disabled", label: "Disabled FG" },
  ]},
  { group: "Border", tokens: [
    { name: "--border", tw: "border-border-base", label: "Border" },
    { name: "--input", tw: "border-input-border-base", label: "Input" },
    { name: "--border-accessible", tw: "border-accessible", label: "Accessible" },
  ]},
  { group: "Status Surfaces", tokens: [
    { name: "--surface-info", tw: "bg-status-surface-info", label: "Info" },
    { name: "--surface-success", tw: "bg-status-surface-positive", label: "Success" },
    { name: "--surface-warning", tw: "bg-status-surface-warning", label: "Warning" },
    { name: "--surface-danger", tw: "bg-status-surface-negative", label: "Danger" },
  ]},
  { group: "Chart", tokens: [
    { name: "--chart-1", tw: "bg-viz-categorical-1", label: "Chart 1" },
    { name: "--chart-2", tw: "bg-viz-categorical-2", label: "Chart 2" },
    { name: "--chart-3", tw: "bg-viz-categorical-3", label: "Chart 3" },
    { name: "--chart-4", tw: "bg-viz-categorical-4", label: "Chart 4" },
    { name: "--chart-5", tw: "bg-viz-categorical-5", label: "Chart 5" },
  ]},
]

const typographyTokens = [
  { name: "Title 1", size: "32px", lh: "40px", weight: "Semibold", font: "SF Pro Display", className: "text-[32px] leading-[40px] font-semibold", sample: "Page heading" },
  { name: "Title 2", size: "22px", lh: "28px", weight: "Semibold", font: "SF Pro Display", className: "text-[22px] leading-[28px] font-semibold", sample: "Section heading" },
  { name: "Title 3", size: "18px", lh: "24px", weight: "Semibold", font: "SF Pro Display", className: "text-[18px] leading-[24px] font-semibold", sample: "Subsection heading" },
  { name: "Title 4", size: "13px", lh: "20px", weight: "Semibold", font: "SF Pro Display", className: "text-[13px] leading-[20px] font-semibold", sample: "Small heading" },
  { name: "Bold", size: "13px", lh: "20px", weight: "Semibold", font: "SF Pro Text", className: "text-[13px] leading-[20px] font-semibold", sample: "Label emphasis" },
  { name: "Paragraph", size: "13px", lh: "20px", weight: "Regular", font: "SF Pro Text", className: "text-[13px] leading-[20px] font-normal", sample: "Body text for all content" },
  { name: "Hint", size: "12px", lh: "16px", weight: "Regular", font: "SF Pro Text", className: "text-[12px] leading-[16px] font-normal text-text-subtle", sample: "Captions and helper text" },
  { name: "Code", size: "13px", lh: "20px", weight: "Regular", font: "SF Mono", className: "font-mono text-[13px] leading-[20px]", sample: "const data = query()" },
]

const radiusTokens = [
  { name: "radius-sm", value: "4px", tw: "rounded-sm", use: "Buttons, inputs, menu items" },
  { name: "radius-md", value: "8px", tw: "rounded-md", use: "Dialogs, dropdowns, alerts" },
  { name: "radius-lg", value: "12px", tw: "rounded-lg", use: "Content surface, drawer" },
  { name: "radius-xl", value: "16px", tw: "rounded-xl", use: "Cards" },
  { name: "radius-2xl", value: "24px", tw: "rounded-2xl", use: "Large containers" },
  { name: "radius-full", value: "999px", tw: "rounded-full", use: "Badges, pills, avatar" },
]

const shadowTokens = [
  { name: "shadow-xs", tw: "shadow-xs", use: "Form controls, buttons" },
  { name: "shadow-sm", tw: "shadow-sm", use: "Active tabs, elevated buttons" },
  { name: "shadow", tw: "shadow", use: "Cards" },
  { name: "shadow-md", tw: "shadow-md", use: "Popovers, dropdowns" },
  { name: "shadow-lg", tw: "shadow-lg", use: "Dialogs, modals" },
  { name: "shadow-focus", tw: "shadow-focus", use: "Focus indicator" },
]

const spacingTokens = [
  { name: "spacing-0", value: "0px", tw: "gap-0", px: 0 },
  { name: "spacing-xxs", value: "2px", tw: "gap-0.5", px: 2 },
  { name: "spacing-xs", value: "4px", tw: "gap-1", px: 4 },
  { name: "spacing-sm", value: "8px", tw: "gap-2", px: 8 },
  { name: "spacing-mid", value: "12px", tw: "px-3", px: 12 },
  { name: "spacing-md", value: "16px", tw: "gap-4", px: 16 },
  { name: "spacing-lg", value: "24px", tw: "gap-6", px: 24 },
  { name: "spacing-xl", value: "32px", tw: "gap-8", px: 32 },
]

// ─── Styles ───

const sectionHeader: React.CSSProperties = {
  fontFamily: "'SF Pro Display', -apple-system, sans-serif",
  fontSize: 22, fontWeight: 600, lineHeight: "28px",
  color: "#161616", margin: "0 0 24px 0",
}

const groupHeader: React.CSSProperties = {
  fontSize: 11, fontWeight: 600, textTransform: "uppercase",
  letterSpacing: 0.5, color: "#8C8C8C", margin: "0 0 12px 0",
}

const tile: React.CSSProperties = {
  borderRadius: 8, border: "1px solid #EBEBEB",
  overflow: "hidden", background: "#FFFFFF",
}

const tileLabel: React.CSSProperties = {
  padding: "8px 10px",
  borderTop: "1px solid #F3F3F3",
}

const mono: React.CSSProperties = {
  fontFamily: "'SF Mono', ui-monospace, monospace",
  fontSize: 11, color: "#404040",
}

const hint: React.CSSProperties = {
  fontSize: 11, color: "#8C8C8C", marginTop: 2,
}

// ─── Page ───

/**
 * The token system components actually consume. Generated from
 * theme.config.mjs into tokens.css. This is the reference.
 */
export const Color: StoryObj = {
  name: "Color — semantic (current)",
  render: () => <SemanticColorPage />,
}

/**
 * The dimensional scales — type, shadow, radius, spacing. Colour is in the
 * "Color — semantic" story above.
 */
export const Scale: StoryObj = {
  name: "Scale — type, shadow, radius, spacing",
  render: () => (
    <div style={{ maxWidth: 960, margin: "0 auto", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>

      {/* ── Typography ── */}
      <h2 style={sectionHeader}>Typography</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 48 }}>
        {typographyTokens.map((t) => (
          <div key={t.name} style={{ ...tile, display: "flex", alignItems: "center", borderRadius: 0, borderBottom: "none" }}>
            <div style={{ width: 120, padding: "16px 16px", borderRight: "1px solid #F3F3F3", flexShrink: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#161616" }}>{t.name}</div>
              <div style={hint}>{t.size}/{t.lh} · {t.weight}</div>
            </div>
            <div style={{ flex: 1, padding: "16px 20px" }}>
              <span className={t.className} style={{ color: "#161616" }}>{t.sample}</span>
            </div>
            <div style={{ width: 140, padding: "16px", flexShrink: 0 }}>
              <code style={mono}>{t.font}</code>
            </div>
          </div>
        ))}
        <div style={{ border: "1px solid #EBEBEB", borderTop: "none", height: 0 }} />
      </div>

      {/* ── Colors ── */}
      {/* Colour lives in the "Color — semantic" story. The legacy swatches that
          used to sit here were removed with the legacy layer in Stage C. */}

      {/* ── Shadows ── */}
      <h2 style={sectionHeader}>Shadows</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 16, marginBottom: 48 }}>
        {shadowTokens.map((t) => (
          <div key={t.name} style={tile}>
            <div style={{ height: 80, display: "flex", alignItems: "center", justifyContent: "center", background: "#F7F7F7" }}>
              <div className={`size-14 rounded-md bg-surface-base ${t.tw}`} style={{ border: "1px solid #EBEBEB" }} />
            </div>
            <div style={tileLabel}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#161616" }}>{t.name}</div>
              <code style={mono}>{t.tw}</code>
              <div style={hint}>{t.use}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Radius ── */}
      <h2 style={sectionHeader}>Radius</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 16, marginBottom: 48 }}>
        {radiusTokens.map((t) => (
          <div key={t.name} style={tile}>
            <div style={{ height: 80, display: "flex", alignItems: "center", justifyContent: "center", background: "#F7F7F7" }}>
              <div style={{ width: 48, height: 48, border: "2px solid #2272B4", background: "#EEF4FB", borderRadius: t.value }} />
            </div>
            <div style={tileLabel}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#161616" }}>{t.value}</div>
              <code style={mono}>{t.tw}</code>
              <div style={hint}>{t.use}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Spacing ── */}
      <h2 style={sectionHeader}>Spacing</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 48 }}>
        {spacingTokens.map((t, i) => (
          <div key={t.name} style={{ display: "flex", alignItems: "center", padding: "10px 0", borderBottom: i < spacingTokens.length - 1 ? "1px solid #F3F3F3" : "none" }}>
            <div style={{ width: 80, flexShrink: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#161616" }}>{t.value}</div>
            </div>
            <div style={{ width: 100, flexShrink: 0 }}>
              <div style={{ height: 12, width: Math.max(t.px, 2), background: "#2272B4", borderRadius: 2 }} />
            </div>
            <div style={{ width: 120, flexShrink: 0 }}>
              <code style={mono}>{t.name}</code>
            </div>
            <div>
              <code style={{ ...mono, color: "#2272B4" }}>{t.tw}</code>
            </div>
          </div>
        ))}
      </div>

    </div>
  ),
}

// ─── New color system (Color: Semantic) ───
// Generated from packages/dbui/src/tokens/theme.config.mjs → tokens.css. Chips
// render straight from the shipped --db-* custom properties, so this doc is
// always in sync with the token values. Primitives are NOT shown: they don't
// ship as CSS vars (generator input only — see theme.config.mjs + Figma).

const semanticGroups: { group: string; tokens: string[] }[] = [
  { group: "surface", tokens: ["base", "subtle", "strong", "inverse", "accent", "inset", "disabled"] },
  { group: "text", tokens: ["base", "strong", "subtle", "inverse", "disabled", "accent"] },
  { group: "border", tokens: ["base", "strong", "subtle", "inverse", "disabled", "accent"] },
  { group: "action", tokens: [
    "default-base", "default-hover", "default-press",
    "primary-base", "primary-hover", "primary-press",
    "selected-base", "selected-hover", "selected-press",
    "positive-base", "positive-hover", "positive-press",
    "negative-base", "negative-hover", "negative-press",
    "label-base", "label-hover", "label-press",
    "label-inverse-base", "label-inverse-hover", "label-inverse-press",
  ] },
  { group: "input", tokens: ["border-base", "border-action-default-hover", "border-focus"] },
  { group: "focus", tokens: ["ring", "ring-offset"] },
  { group: "link", tokens: ["base", "hover", "press", "visited"] },
  { group: "status", tokens: [
    "surface-info", "surface-negative", "surface-positive", "surface-warning",
    "border-info", "border-negative", "border-positive", "border-status-border-warning",
    "text-info", "text-negative", "text-positive", "text-status-text-warning",
  ] },
  { group: "utility", tokens: ["scrim", "surface-skeleton", "text-utility-text-skeleton"] },
  { group: "viz", tokens: [
    "categorical-1", "categorical-2", "categorical-3", "categorical-4", "categorical-5",
    "categorical-6", "categorical-7", "categorical-8", "categorical-9", "categorical-10",
    "sequential-1", "sequential-2", "sequential-3", "sequential-4", "sequential-5",
    "sequential-6", "sequential-7", "sequential-8", "sequential-9", "sequential-10",
  ] },
]

const chipFrame: React.CSSProperties = {
  padding: 4, borderRadius: 6, background: "var(--db-surface-base)",
  display: "inline-flex", border: "1px solid rgba(128,128,128,0.2)",
}
const chipBox: React.CSSProperties = {
  width: 44, height: 28, borderRadius: 4, background: "var(--_v)",
  border: "1px solid rgba(128,128,128,0.28)",
}

const labelStrong: React.CSSProperties = { fontSize: 12, fontWeight: 600, color: "#161616" }

// Light + dark chip pair for one semantic token — the dark half renders inside a
// `.dark` context so tokens.css's dark overrides resolve.
function DualChip({ v }: { v: string }) {
  const box = (): React.CSSProperties => ({ ...chipBox, background: `var(${v})` })
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <div style={chipFrame}><div style={box()} /></div>
      <div className="dark" style={chipFrame}><div style={box()} /></div>
    </div>
  )
}

const SemanticColorPage = () => (
    <div style={{ maxWidth: 960, margin: "0 auto", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>

      <h2 style={sectionHeader}>Semantics — Color: Semantic</h2>
      <p style={{ ...hint, fontSize: 12, marginTop: -16, marginBottom: 24 }}>
        Role tokens consumed by product code. Each row shows <strong>light</strong> (left) and <strong>dark</strong> (right).
        Values ship as <code style={mono}>--db-*</code> CSS vars generated from <code style={mono}>theme.config.mjs</code>.
        The raw primitive palette does not ship in code — it lives in the config and Figma’s “Color: Primitive” collection.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {semanticGroups.map((g) => (
          <div key={g.group}>
            <h3 style={groupHeader}>{g.group}</h3>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {g.tokens.map((t) => (
                <div
                  key={t}
                  style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 12, alignItems: "center", padding: "6px 0", borderBottom: "1px solid #F3F3F3" }}
                >
                  <DualChip v={`--db-${g.group}-${t}`} />
                  <div>
                    <div style={labelStrong}>{g.group}/{t}</div>
                    <code style={mono}>var(--db-{g.group}-{t})</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
)
