"use client"

import { useTheme } from "@/components/theme-provider"

const serif = "Baskerville, 'Times New Roman', Georgia, serif"
const mono = "'Fira Code', monospace"

interface ChangeEntry {
  date: string
  title: string
  items: string[]
  tag: "tokens" | "icons" | "components" | "portal"
}

const TAG_COLORS: Record<string, { light: string; dark: string }> = {
  tokens: { light: "#2272B4", dark: "#4299E0" },
  icons: { light: "#8A63BF", dark: "#8A63BF" },
  components: { light: "#277C43", dark: "#3BA65E" },
  portal: { light: "#DE7921", dark: "#DE7921" },
}

const changes: ChangeEntry[] = [
  {
    date: "2026-03-27",
    title: "Removed colors/ prefix from semantic tokens",
    tag: "tokens",
    items: [
      "All 57 semantic color variables renamed — \"colors/surface/background\" → \"surface/background\"",
      "Updated across Figma, spreadsheet (both sheets), DESIGN-SYSTEM-DECISIONS.md, and portal",
      "Figma collection name \"Semantic\" already provides context — prefix was redundant",
    ],
  },
  {
    date: "2026-03-27",
    title: "Removed 10 status semantic tokens (added then reverted same day)",
    tag: "tokens",
    items: [
      "Briefly added status/ group: background-danger/success/warning, border-danger/warning, text-danger/success/warning, text-placeholder, tooltip-background",
      "Removed after review — 5 were identical to existing tokens (e.g. text-danger = --destructive), 5 were composable via opacity",
      "Contradicted design principle §1.3 (Minimal Tokens, Maximum Composability). Moved to Excluded with compose instructions.",
    ],
  },
  {
    date: "2026-03-27",
    title: "Typography collection created",
    tag: "tokens",
    items: [
      "19 variables: 3 font families, 7 sizes, 7 line-heights, 2 weights",
      "Production mode: SF Pro Text / SF Pro Display / SF Mono",
      "Wireframe mode: Space Grotesk / Fira Code",
      "Text styles bound to size + line-height variables for instant theme switching",
    ],
  },
  {
    date: "2026-03-27",
    title: "Text styles switched to DuBois naming",
    tag: "tokens",
    items: [
      "8 styles: Hint, Paragraph, Bold, Title 1–4, Code",
      "Fonts: SF Pro Text (body), SF Pro Display (titles), SF Mono (code)",
      "Tailwind mapping in each style description",
      "Decided on DuBois names over shadcn scale — better for LLM usability",
    ],
  },
  {
    date: "2026-03-27",
    title: "Spacing tokens renamed to match DuBois",
    tag: "tokens",
    items: [
      "xs → spacing-xs, sm → spacing-sm, etc.",
      "Added spacing-0 (not in original set)",
      "Now 7 spacing tokens matching DuBois 1:1",
    ],
  },
  {
    date: "2026-03-27",
    title: "Scope fix — all semantic colors now show in all pickers",
    tag: "tokens",
    items: [
      "Previously text colors only showed in text picker, borders only in stroke picker",
      "All 57 semantic colors now set to ALL_FILLS + STROKE_COLOR",
      "Designers build muscle memory with one palette, not context-dependent subsets",
    ],
  },
  {
    date: "2026-03-27",
    title: "413 icons copied from DuBois library",
    tag: "icons",
    items: [
      "All icons from the 🧰 Du Bois Design System Figma file",
      "Organized into 6 groups: Navigation, Actions, Content, Status, Objects, Other",
      "Sorted alphabetically within each group, 10-column grid layout",
    ],
  },
  {
    date: "2026-03-27",
    title: "DBUI Portal launched",
    tag: "portal",
    items: [
      "Landing page with WebGL shader hero (10 random variations)",
      "Token mappings reference page with search, collapsible sections, color swatches",
      "Light/Dark mode toggle using DBUI's own color tokens",
      "Change log (this page)",
    ],
  },
  {
    date: "2026-03-26",
    title: "Initial token creation — Phase 1 complete",
    tag: "tokens",
    items: [
      "68 primitive color variables (blue, green, red, yellow, grey, neutral, categorical, base, brand)",
      "47 semantic color variables with Light/Dark modes",
      "14 number variables (8 radius + 6 spacing)",
      "5 shadow effect styles with DuBois values",
      "7 text styles (later expanded to 8)",
      "Figma Token Map spreadsheet tab created for cross-reference tracking",
    ],
  },
]

export default function ChangesPage() {
  const { mode, t } = useTheme()

  return (
    <div>
      {/* Header */}
      <section className="pt-24 pb-16 px-8" style={{ borderBottom: `1px solid ${t.border}` }}>
        <div className="max-w-[800px] mx-auto">
          <p className="text-[11px] tracking-[0.2em] uppercase mb-4" style={{ fontFamily: mono, color: t.textSubtle }}>
            Changelog
          </p>
          <h1 className="text-[42px] leading-[1.05] tracking-[-0.01em] mb-6" style={{ fontFamily: serif }}>
            <em className="font-normal">Changes</em>
          </h1>
          <p className="text-[19px] max-w-[560px] leading-[1.5]" style={{ fontFamily: serif, color: t.textMuted }}>
            Every update to the DBUI design system — tokens, icons,
            components, and this portal.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-8">
        <div className="max-w-[800px] mx-auto">
          <div className="space-y-0">
            {changes.map((entry, i) => {
              const tagColor = TAG_COLORS[entry.tag]?.[mode] ?? t.textMuted
              return (
                <div
                  key={i}
                  className="py-10"
                  style={{ borderBottom: `1px solid ${t.border}` }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[12px]" style={{ fontFamily: mono, color: t.textSubtle }}>
                      {entry.date}
                    </span>
                    <span
                      className="text-[11px] px-2 py-0.5 rounded-full"
                      style={{
                        fontFamily: mono,
                        color: tagColor,
                        border: `1px solid ${tagColor}33`,
                        backgroundColor: `${tagColor}0D`,
                      }}
                    >
                      {entry.tag}
                    </span>
                  </div>
                  <h2 className="text-[22px] leading-[1.2] mb-4" style={{ fontFamily: serif }}>
                    {entry.title}
                  </h2>
                  <ul className="space-y-2">
                    {entry.items.map((item, j) => (
                      <li
                        key={j}
                        className="text-[15px] leading-[1.6]"
                        style={{ color: t.textMuted }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8" style={{ borderTop: `1px solid ${t.border}` }}>
        <div className="max-w-[800px] mx-auto flex justify-between items-end">
          <div>
            <span className="text-[14px] tracking-wider" style={{ fontFamily: mono, color: t.textSubtle }}>DBUI</span>
            <p className="text-[14px] mt-1" style={{ color: t.textSubtle, opacity: 0.5 }}>
              DuBois design language on shadcn components.
            </p>
          </div>
          <p className="text-[11px]" style={{ fontFamily: mono, color: t.textSubtle, opacity: 0.4 }}>
            Design · Databricks · 2026
          </p>
        </div>
      </footer>
    </div>
  )
}
