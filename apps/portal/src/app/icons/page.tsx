"use client"

import { useState, useMemo } from "react"
import { useTheme } from "@/components/theme-provider"
import iconsData from "@/data/icons.json"
import iconFigmaUrls from "@/data/icon-figma-urls.json"
import { iconRegistry } from "@/data/icon-registry"

const ICON_FIGMA_URLS = iconFigmaUrls as Record<string, string>

const MONO = "'Fira Code', monospace"
const SERIF = "Baskerville, 'Times New Roman', Georgia, serif"

type IconEntry = {
  name: string
  classification: string
  description: string
  context: string
  tags: string
}

const CLASSIFICATIONS: { key: string; label: string; description: string }[] = [
  { key: "action", label: "Action", description: "Verbs — what the user can do. Appear inside buttons, menus, toolbars." },
  { key: "object", label: "Object", description: "Nouns — entities users recognize. Appear in nav, trees, breadcrumbs, entity headers." },
  { key: "indicator", label: "Indicator", description: "Status and emphasis — convey meaning alongside text and color. Appear in alerts, toasts, badges." },
  { key: "component", label: "Component", description: "UI structure — icons that represent component-level affordances like sort, expand, chevron." },
  { key: "uncategorized", label: "Uncategorized", description: "Icons pending classification." },
]

const CLASSIFICATION_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  action: { bg: "#E0F2FE", text: "#0369A1", border: "#7DD3FC" },
  object: { bg: "#F3E8FF", text: "#7C3AED", border: "#C4B5FD" },
  indicator: { bg: "#FEF3C7", text: "#92400E", border: "#FCD34D" },
  component: { bg: "#D1FAE5", text: "#065F46", border: "#6EE7B7" },
  uncategorized: { bg: "#F3F4F6", text: "#6B7280", border: "#D1D5DB" },
}

function Highlight({ text, query, color }: { text: string; query: string; color: string }) {
  if (!query || !text) return <>{text}</>
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ backgroundColor: `${color}25`, color, borderRadius: "2px", padding: "0 1px" }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  )
}

function IconPreview({ name, size = 20 }: { name: string; size?: number }) {
  const Icon = iconRegistry[name]
  if (!Icon) return <div style={{ width: size, height: size }} />
  return <Icon size={size} className="shrink-0" />
}

function ClassBadge({ classification }: { classification: string }) {
  const c = CLASSIFICATION_COLORS[classification] || CLASSIFICATION_COLORS.uncategorized
  return (
    <span
      className="inline-flex text-[10px] leading-[14px] px-1.5 py-0.5 rounded-full whitespace-nowrap"
      style={{ fontFamily: MONO, backgroundColor: c.bg, color: c.text, border: `1px solid ${c.border}` }}
    >
      {classification}
    </span>
  )
}

export default function IconsPage() {
  const { t } = useTheme()
  const [search, setSearch] = useState("")
  const [activeClass, setActiveClass] = useState<string | null>(null)

  const icons = iconsData as IconEntry[]

  const grouped = useMemo(() => {
    const groups: Record<string, IconEntry[]> = {}
    for (const icon of icons) {
      const key = icon.classification || "uncategorized"
      if (!groups[key]) groups[key] = []
      groups[key].push(icon)
    }
    return groups
  }, [icons])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    const result: Record<string, IconEntry[]> = {}
    for (const [key, items] of Object.entries(grouped)) {
      if (activeClass && key !== activeClass) continue
      const matches = q
        ? items.filter(
            (i) =>
              i.name.toLowerCase().includes(q) ||
              i.description.toLowerCase().includes(q) ||
              i.context.toLowerCase().includes(q) ||
              i.tags.toLowerCase().includes(q)
          )
        : items
      if (matches.length > 0) result[key] = matches
    }
    return result
  }, [grouped, search, activeClass])

  const totalFiltered = Object.values(filtered).reduce((sum, arr) => sum + arr.length, 0)

  // Counts per classification that reflect search filtering
  const filteredCounts = useMemo(() => {
    const q = search.toLowerCase()
    const counts: Record<string, number> = {}
    for (const [key, items] of Object.entries(grouped)) {
      const matches = q
        ? items.filter(
            (i) =>
              i.name.toLowerCase().includes(q) ||
              i.description.toLowerCase().includes(q) ||
              i.context.toLowerCase().includes(q) ||
              i.tags.toLowerCase().includes(q)
          )
        : items
      counts[key] = matches.length
    }
    return counts
  }, [grouped, search])

  return (
    <div>
      {/* Header */}
      <section className="pt-24 pb-16 px-8" style={{ borderBottom: `1px solid ${t.border}` }}>
        <div className="max-w-[1100px] mx-auto">
          <p
            className="text-[11px] tracking-[0.2em] uppercase mb-4"
            style={{ fontFamily: MONO, color: t.textSubtle }}
          >
            Iconography
          </p>
          <h1
            className="text-[42px] leading-[1.05] tracking-[-0.01em] mb-6"
            style={{ fontFamily: SERIF }}
          >
            <em className="font-normal">Icons</em>
          </h1>
          <p
            className="text-[19px] max-w-[560px] leading-[1.5]"
            style={{ fontFamily: SERIF, color: t.textMuted }}
          >
            {icons.length} icons classified by usage role — action, object,
            indicator, and component. Synced from DuBois codebase.
          </p>
        </div>
      </section>

      {/* Search + Filter bar */}
      <section
        className="sticky top-12 z-40 px-8 py-3 backdrop-blur-xl"
        style={{ backgroundColor: `${t.bg}cc`, borderBottom: `1px solid ${t.border}` }}
      >
        <div className="max-w-[1100px] mx-auto flex items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-[360px]">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2"
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke={t.textSubtle}
              strokeWidth="1.5"
            >
              <circle cx="7" cy="7" r="5.5" />
              <path d="M11 11l3.5 3.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search icons…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-md text-[13px] outline-none transition-colors"
              style={{
                fontFamily: MONO,
                color: t.text,
                backgroundColor: t.cardBg,
                border: `1px solid ${t.border}`,
              }}
            />
          </div>

          {/* Classification pills */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveClass(null)}
              className="text-[11px] px-2.5 py-1 rounded-md transition-colors"
              style={{
                fontFamily: MONO,
                color: activeClass === null ? t.text : t.textSubtle,
                backgroundColor: activeClass === null ? t.hoverBg : "transparent",
                border: activeClass === null ? `1px solid ${t.border}` : "1px solid transparent",
              }}
            >
              All ({Object.values(filteredCounts).reduce((s, n) => s + n, 0)})
            </button>
            {CLASSIFICATIONS.filter((c) => grouped[c.key]?.length).map((c) => (
              <button
                key={c.key}
                onClick={() => setActiveClass(activeClass === c.key ? null : c.key)}
                className="text-[11px] px-2.5 py-1 rounded-md transition-colors"
                style={{
                  fontFamily: MONO,
                  color: activeClass === c.key ? t.text : (filteredCounts[c.key] || 0) === 0 ? `${t.textSubtle}60` : t.textSubtle,
                  backgroundColor: activeClass === c.key ? t.hoverBg : "transparent",
                  border: activeClass === c.key ? `1px solid ${t.border}` : "1px solid transparent",
                }}
              >
                {c.label} ({filteredCounts[c.key] || 0})
              </button>
            ))}
          </div>

          {/* Result count */}
          {search && (
            <span className="text-[11px] ml-auto" style={{ fontFamily: MONO, color: t.textSubtle }}>
              {totalFiltered} result{totalFiltered !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </section>

      {/* Icon sections */}
      <section className="py-12 px-8">
        <div className="max-w-[1100px] mx-auto flex flex-col gap-16">
          {CLASSIFICATIONS.filter((c) => filtered[c.key]?.length).map((cls) => (
            <div key={cls.key}>
              {/* Section header */}
              <div className="flex items-baseline gap-3 mb-2">
                <h2
                  className="text-[28px] leading-[1.1] tracking-[-0.01em]"
                  style={{ fontFamily: SERIF }}
                >
                  <em className="font-normal">{cls.label}</em>
                </h2>
                <span
                  className="text-[13px]"
                  style={{ fontFamily: MONO, color: t.textSubtle }}
                >
                  {filtered[cls.key]!.length}
                </span>
              </div>
              <p
                className="text-[14px] mb-6"
                style={{ color: t.textMuted }}
              >
                {cls.description}
              </p>

              {/* Icon grid — 2 per row */}
              <div
                className="rounded-lg overflow-hidden"
                style={{ border: `1px solid ${t.border}` }}
              >
                {(() => {
                  const items = filtered[cls.key]!
                  const rows: IconEntry[][] = []
                  for (let i = 0; i < items.length; i += 2) {
                    rows.push(items.slice(i, i + 2))
                  }
                  return rows.map((pair, ri) => (
                    <div
                      key={ri}
                      className="grid grid-cols-2"
                      style={{ borderBottom: ri < rows.length - 1 ? `1px solid ${t.border}` : undefined }}
                    >
                      {pair.map((icon, ci) => {
                        const figmaHref = ICON_FIGMA_URLS[icon.name]
                        return (
                        <div
                          key={icon.name}
                          className="group flex items-center gap-3 px-4 py-2.5 transition-colors text-[13px]"
                          style={{ borderRight: ci === 0 && pair.length > 1 ? `1px solid ${t.border}` : undefined }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = t.hoverBg }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent" }}
                        >
                          {/* Icon */}
                          <div style={{ color: t.text }} className="shrink-0">
                            <IconPreview name={icon.name} size={20} />
                          </div>
                          {/* Name + context + description */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="truncate" style={{ fontFamily: MONO, color: t.text }}>
                                <Highlight text={icon.name} query={search} color={t.primary} />
                              </span>
                              {icon.context && (
                                <span
                                  className="text-[10px] leading-[14px] px-1.5 py-0.5 rounded-full whitespace-nowrap shrink-0"
                                  style={{ fontFamily: MONO, color: t.textSubtle, backgroundColor: t.hoverBg, border: `1px solid ${t.border}` }}
                                >
                                  <Highlight text={icon.context} query={search} color={t.primary} />
                                </span>
                              )}
                            </div>
                            <div className="truncate">
                              <span className="text-[12px]" style={{ color: t.textMuted }}>
                                <Highlight text={icon.description} query={search} color={t.primary} />
                              </span>
                              {icon.tags && (
                                <span className="text-[11px] ml-1.5" style={{ fontFamily: MONO, color: t.textSubtle }}>
                                  <Highlight text={icon.tags} query={search} color={t.primary} />
                                </span>
                              )}
                            </div>
                          </div>
                          {figmaHref ? (
                            <a
                              href={figmaHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              tabIndex={-1}
                              title="Open in Figma"
                              aria-label={`Open ${icon.name} in Figma`}
                              className="text-[11px] font-medium px-2 py-1 rounded-md shrink-0 transition-opacity duration-150 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto hover:!opacity-90"
                              style={{
                                fontFamily: MONO,
                                color: t.primary,
                                border: `1px solid ${t.border}`,
                                backgroundColor: t.cardBg,
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              Figma
                            </a>
                          ) : null}
                        </div>
                        )
                      })}
                    </div>
                  ))
                })()}
              </div>
            </div>
          ))}

          {/* Empty state */}
          {totalFiltered === 0 && (
            <div
              className="rounded-lg p-12 text-center"
              style={{ border: `1px dashed ${t.border}`, backgroundColor: t.cardBg }}
            >
              <p className="text-[15px] mb-2" style={{ fontFamily: MONO, color: t.textSubtle }}>
                No icons found
              </p>
              <p className="text-[13px]" style={{ color: t.textMuted }}>
                Try a different search term or classification filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8" style={{ borderTop: `1px solid ${t.border}` }}>
        <div className="max-w-[1100px] mx-auto flex justify-between items-end">
          <div>
            <span
              className="text-[14px] tracking-wider"
              style={{ fontFamily: MONO, color: t.textSubtle }}
            >
              DBUI
            </span>
            <p className="text-[14px] mt-1" style={{ color: t.textSubtle, opacity: 0.5 }}>
              DuBois design language on shadcn components.
            </p>
          </div>
          <p
            className="text-[11px]"
            style={{ fontFamily: MONO, color: t.textSubtle, opacity: 0.4 }}
          >
            Design · Databricks · 2026
          </p>
        </div>
      </footer>
    </div>
  )
}
