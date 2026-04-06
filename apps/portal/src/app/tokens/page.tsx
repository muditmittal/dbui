"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useTheme, type Theme } from "@/components/theme-provider"

// ─── Types ──────────────────────────────────────────────────────────────────

interface Token {
  figma: string
  dubois: string
  duboisValue?: string
  shadcn: string
  shadcnValue?: string
  light: string
  dark: string
  lastUpdated: string
  updateNote: string
  decision: string
  source?: string
}

interface SubGroup {
  label: string
  tokens: Token[]
}

// ─── Date Formatting ────────────────────────────────────────────────────────

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00")
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const day = d.getDate()
  const suffix = day === 1 || day === 21 || day === 31 ? "st" : day === 2 || day === 22 ? "nd" : day === 3 || day === 23 ? "rd" : "th"
  return `${months[d.getMonth()]} ${day}${suffix}`
}

function formatFullDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00")
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

function relativeDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00")
  const now = new Date("2026-03-31T12:00:00")
  const diff = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))
  if (diff === 0) return "Today"
  if (diff === 1) return "Yesterday"
  if (diff < 7) return `${diff}d ago`
  if (diff < 30) return `${Math.floor(diff / 7)}w ago`
  return `${Math.floor(diff / 30)}mo ago`
}

// ─── Constants ──────────────────────────────────────────────────────────────

const MONO = "'Fira Code', monospace"
const SERIF = "Baskerville, 'Times New Roman', Georgia, serif"

// ─── Color helpers ──────────────────────────────────────────────────────────

function isColorValue(v: string) {
  return v.startsWith("#") || v.startsWith("rgb") || v.startsWith("oklch")
}

function extractHex(v: string) {
  const match = v.match(/#[0-9A-Fa-f]{3,8}/)
  return match ? match[0] : null
}

function ColorSwatch({ value, t }: { value: string; t: Theme }) {
  const hex = extractHex(value)
  const bgColor = hex || (isColorValue(value) ? value : null)
  if (!bgColor) return null
  return (
    <span
      className="w-4 h-4 rounded-full flex-shrink-0 inline-block"
      style={{
        backgroundColor: bgColor,
        border: `2px solid ${t.border}`,
        boxShadow: `0 0 0 1px ${t.borderSubtle}`,
      }}
    />
  )
}

function cleanValueForDisplay(v: string) {
  if (!v || v === "—") return null
  const cleaned = v.replace(/#([0-9A-Fa-f]{3,8})\s*\([^)]*\)/, "#$1").trim()
  return cleaned
}

// ─── Compare mode components ────────────────────────────────────────────────

function DecisionCell({
  decision,
  date,
  note,
  t,
}: {
  decision: string
  date: string
  note: string
  t: Theme
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <span
      className="relative cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="text-[13px] block" style={{ color: t.text, fontFamily: MONO }}>
        {decision}
      </span>
      <span className="text-[11px] block mt-0.5" style={{ color: t.textSubtle, fontFamily: MONO }}>
        {relativeDate(date)}
      </span>
      {hovered && (
        <span
          className="absolute right-0 -top-10 z-20 rounded px-2 py-1 text-[11px] whitespace-nowrap shadow-xl pointer-events-none"
          style={{ backgroundColor: t.tooltipBg, color: t.tooltipText, fontFamily: MONO }}
        >
          {formatFullDate(date)} — {note}
        </span>
      )}
    </span>
  )
}

function ChevronIcon({ open, color }: { open: boolean; color: string }) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 14 14" fill="none"
      style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 200ms ease", color }}
    >
      <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TokenValue({ token, t, mode }: { token: Token; t: Theme; mode: "light" | "dark" }) {
  const value = mode === "dark" && token.dark !== "—" ? token.dark : token.light
  if (!value || value === "—") return null
  return (
    <div className="flex items-center gap-2 mt-1.5 text-[13px] flex-wrap" style={{ color: t.textSubtle, fontFamily: MONO }}>
      <ColorSwatch value={value} t={t} />
      <span className="break-all">{value}</span>
    </div>
  )
}

function ColumnValue({ value, t }: { value?: string; t: Theme }) {
  if (!value) return null
  return (
    <div className="flex items-center gap-2 mt-1.5 text-[13px] flex-wrap" style={{ color: t.textSubtle, fontFamily: MONO }}>
      <ColorSwatch value={value} t={t} />
      <span className="break-all">{value}</span>
    </div>
  )
}

function CellWithTooltip({
  children, lines, t, className, style,
}: {
  children: React.ReactNode; lines: string[]; t: Theme; className?: string; style?: React.CSSProperties
}) {
  const [show, setShow] = useState(false)
  if (lines.length === 0) {
    return <td className={className} style={style}>{children}</td>
  }
  return (
    <td
      className={`relative ${className || ""}`}
      style={style}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          className="absolute left-4 bottom-full mb-2 z-50 px-3 py-2.5 rounded-lg shadow-lg"
          style={{
            backgroundColor: t.tooltipBg, color: t.tooltipText, fontFamily: MONO,
            fontSize: "12px", lineHeight: "1.5", minWidth: "200px", maxWidth: "320px",
            border: `1px solid ${t.border}`, pointerEvents: "none",
          }}
        >
          {lines.map((line, i) => (
            <div key={i} style={{ opacity: i === 0 ? 1 : 0.7 }}>{line}</div>
          ))}
        </div>
      )}
    </td>
  )
}

function TokenRow({ token, t, mode }: { token: Token; t: Theme; mode: "light" | "dark" }) {
  const [hovered, setHovered] = useState(false)
  const dbuiTooltip: string[] = []
  if (token.light !== "—") dbuiTooltip.push(`Light: ${token.light}`)
  if (token.dark !== "—" && token.dark !== token.light) dbuiTooltip.push(`Dark: ${token.dark}`)
  const shadcnTooltip: string[] = []
  if (token.shadcnValue) shadcnTooltip.push(`Original: ${token.shadcnValue}`)
  const duboisTooltip: string[] = []
  if (token.duboisValue) duboisTooltip.push(`Original: ${token.duboisValue}`)
  const cellBase = "px-5 py-4 align-top"
  const cellStyle = (width: string): React.CSSProperties => ({
    width, borderRight: `1px solid ${t.border}`, fontFamily: MONO, wordBreak: "break-word",
  })
  return (
    <tr
      style={{ borderTop: `1px solid ${t.border}`, backgroundColor: hovered ? t.hoverBg : "transparent" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CellWithTooltip className={cellBase} style={cellStyle("30%")} lines={dbuiTooltip} t={t}>
        <div className="text-[16px]" style={{ color: t.text }}>{token.figma}</div>
        <TokenValue token={token} t={t} mode={mode} />
      </CellWithTooltip>
      <CellWithTooltip className={cellBase} style={cellStyle("25%")} lines={shadcnTooltip} t={t}>
        <div className="text-[16px]" style={{ color: token.shadcn === "—" ? t.textSubtle : t.success }}>{token.shadcn}</div>
        <ColumnValue value={token.shadcnValue} t={t} />
      </CellWithTooltip>
      <CellWithTooltip className={cellBase} style={cellStyle("25%")} lines={duboisTooltip} t={t}>
        <div className="text-[16px]" style={{ color: t.primary }}>{token.dubois}</div>
        <ColumnValue value={token.duboisValue} t={t} />
      </CellWithTooltip>
      <td className="px-5 py-4 align-top" style={{ width: "20%", fontFamily: MONO }}>
        <DecisionCell decision={token.decision} date={token.lastUpdated} note={token.updateNote} t={t} />
      </td>
    </tr>
  )
}

function SubheaderRow({ label, t }: { label: string; t: Theme }) {
  return (
    <tr>
      <td
        colSpan={4}
        className="px-5 py-2.5 text-[11px] tracking-[0.14em] uppercase"
        style={{ color: t.textSubtle, backgroundColor: t.bg, fontFamily: MONO, borderTop: `1px solid ${t.border}`, letterSpacing: "0.14em" }}
      >
        {label}
      </td>
    </tr>
  )
}

function TableHead({ t }: { t: Theme }) {
  const headers = [
    { label: "DBUI Values", width: "30%" },
    { label: "shadcn / Tailwind", width: "25%" },
    { label: "DuBois Name", width: "25%" },
    { label: "Mapping Decision", width: "20%" },
  ]
  return (
    <thead>
      <tr style={{ backgroundColor: t.bg }}>
        {headers.map((h) => (
          <th
            key={h.label}
            className="px-5 py-3 text-left font-normal whitespace-nowrap"
            style={{
              width: h.width, color: t.textSubtle, borderBottom: `1px solid ${t.border}`,
              borderRight: `1px solid ${t.border}`, fontSize: "10px", letterSpacing: "0.12em",
              textTransform: "uppercase", fontFamily: MONO,
            }}
          >
            {h.label}
          </th>
        ))}
      </tr>
    </thead>
  )
}

function GroupRows({ group, t, mode, showSubheader }: { group: SubGroup; t: Theme; mode: "light" | "dark"; showSubheader: boolean }) {
  return (
    <>
      {showSubheader && <SubheaderRow label={group.label} t={t} />}
      {group.tokens.map((token, i) => (
        <TokenRow key={`${group.label}-${i}`} token={token} t={t} mode={mode} />
      ))}
    </>
  )
}

function TokenSection({
  title, subGroups, query, t, mode, defaultOpen = true,
}: {
  title: string; subGroups: SubGroup[]; query: string; t: Theme; mode: "light" | "dark"; defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const allTokens = useMemo(() => subGroups.flatMap((g) => g.tokens), [subGroups])
  const filteredGroups = useMemo(() => {
    if (!query) return subGroups
    const q = query.toLowerCase()
    return subGroups
      .map((g) => ({
        ...g,
        tokens: g.tokens.filter(
          (tok) =>
            tok.figma.toLowerCase().includes(q) ||
            tok.dubois.toLowerCase().includes(q) ||
            tok.shadcn.toLowerCase().includes(q) ||
            tok.light.toLowerCase().includes(q) ||
            tok.dark.toLowerCase().includes(q)
        ),
      }))
      .filter((g) => g.tokens.length > 0)
  }, [subGroups, query])
  const filteredCount = filteredGroups.reduce((a, g) => a + g.tokens.length, 0)
  if (filteredCount === 0 && query) return null
  return (
    <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${t.border}` }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 transition-colors"
        style={{ backgroundColor: t.cardBg }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = t.hoverBg }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = t.cardBg }}
      >
        <div className="flex items-center gap-4">
          <span className="text-[20px]" style={{ color: t.text, fontFamily: SERIF }}>
            <em className="font-normal">{title}</em>
          </span>
          <span
            className="text-[11px] px-2 py-0.5 rounded-full"
            style={{ color: t.textSubtle, backgroundColor: t.bg, border: `1px solid ${t.border}`, fontFamily: MONO }}
          >
            {filteredCount}{query ? ` / ${allTokens.length}` : ""}
          </span>
        </div>
        <ChevronIcon open={open} color={t.textSubtle} />
      </button>
      {open && (
        <div className="overflow-x-auto">
          <table className="w-full" style={{ borderTop: `1px solid ${t.border}`, tableLayout: "fixed" }}>
            <colgroup>
              <col style={{ width: "30%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "25%" }} />
              <col style={{ width: "20%" }} />
            </colgroup>
            <TableHead t={t} />
            <tbody>
              {filteredGroups.map((group) => (
                <GroupRows key={group.label} group={group} t={t} mode={mode} showSubheader={subGroups.length > 1} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ─── Browse mode components ─────────────────────────────────────────────────

function getDisplayValue(token: Token, mode: "light" | "dark"): string {
  const value = mode === "dark" && token.dark !== "—" ? token.dark : token.light
  return value && value !== "—" ? value : ""
}

function getColorFromValue(v: string): string | null {
  const hex = extractHex(v)
  if (hex) return hex
  if (v.startsWith("rgb") || v.startsWith("oklch")) return v
  return null
}

function TokenTile({ token, t, mode, category }: { token: Token; t: Theme; mode: "light" | "dark"; category: string }) {
  const value = getDisplayValue(token, mode)
  const color = getColorFromValue(value)

  const renderPreview = () => {
    // Color tokens
    if (color && (category === "semantic" || category === "primitives" || category === "brand" || category === "chart")) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div
            className="w-full h-full rounded-t-[7px]"
            style={{ backgroundColor: color }}
          />
        </div>
      )
    }

    // Radius tokens
    if (category === "radius") {
      const pxMatch = value.match(/(\d+)px\s*\(Figma\)/)
      const px = pxMatch ? parseInt(pxMatch[1]) : 0
      return (
        <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: t.bg }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: px >= 999 ? "50%" : `${Math.min(px, 24)}px`,
              border: `2px solid ${t.primary}`,
              backgroundColor: `${t.primary}15`,
            }}
          />
        </div>
      )
    }

    // Spacing tokens
    if (category === "spacing") {
      const pxMatch = value.match(/^(\d+)px$/)
      const px = pxMatch ? parseInt(pxMatch[1]) : 0
      return (
        <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: t.bg }}>
          <div
            style={{
              width: Math.max(px * 2.5, 4),
              height: 16,
              borderRadius: 3,
              backgroundColor: t.primary,
              opacity: 0.7,
              maxWidth: "80%",
            }}
          />
        </div>
      )
    }

    // Shadow tokens
    if (category === "shadows") {
      return (
        <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: t.bg }}>
          <div
            style={{
              width: 56,
              height: 40,
              borderRadius: 6,
              backgroundColor: t.cardBg,
              boxShadow: value,
            }}
          />
        </div>
      )
    }

    // Text styles
    if (category === "textstyles") {
      const isBold = token.figma.includes("Bold") || token.figma.includes("Title")
      const isCode = token.figma.includes("Code")
      const sizeMatch = value.match(/(\d+)\//)
      const size = sizeMatch ? parseInt(sizeMatch[1]) : 13
      return (
        <div className="w-full h-full flex items-center justify-center px-3" style={{ backgroundColor: t.bg }}>
          <span
            style={{
              fontSize: Math.min(size, 24),
              fontWeight: isBold ? 600 : 400,
              fontFamily: isCode ? MONO : "inherit",
              color: t.text,
              lineHeight: 1.3,
            }}
          >
            Aa
          </span>
        </div>
      )
    }

    // Typography variables (sizes, line heights, weights, fonts)
    if (category === "typography") {
      return (
        <div className="w-full h-full flex items-center justify-center px-3" style={{ backgroundColor: t.bg }}>
          <span
            style={{
              fontSize: 20,
              fontFamily: MONO,
              color: t.primary,
              fontWeight: 600,
            }}
          >
            {value.replace(/px$/, "").substring(0, 12)}
          </span>
        </div>
      )
    }

    // Fallback
    return (
      <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: t.bg }}>
        <span style={{ fontSize: 11, color: t.textSubtle, fontFamily: MONO }}>—</span>
      </div>
    )
  }

  // Clean the value for display below the tile
  const displayVal = cleanValueForDisplay(value) || value

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ border: `1px solid ${t.border}`, backgroundColor: t.cardBg }}
    >
      <div style={{ height: 80 }}>
        {renderPreview()}
      </div>
      <div className="px-3 py-2.5" style={{ borderTop: `1px solid ${t.border}` }}>
        <div
          className="text-[11px] leading-tight truncate"
          style={{ color: t.text, fontFamily: MONO }}
          title={token.figma}
        >
          {token.figma}
        </div>
        {displayVal && (
          <div
            className="text-[10px] mt-1 truncate"
            style={{ color: t.textSubtle, fontFamily: MONO }}
            title={displayVal}
          >
            {displayVal}
          </div>
        )}
      </div>
    </div>
  )
}

function subGroupCategory(label: string): string {
  const l = label.toLowerCase()
  if (l === "radius") return "radius"
  if (l === "spacing") return "spacing"
  if (l === "shadows") return "shadows"
  if (l === "text styles") return "textstyles"
  if (l === "variables") return "typography"
  if (l.includes("primitiv")) return "primitives"
  return "semantic"
}

function BrowseSection({
  title, subGroups, query, t, mode, category, defaultOpen = true,
}: {
  title: string; subGroups: SubGroup[]; query: string; t: Theme; mode: "light" | "dark"; category: string; defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const allTokens = useMemo(() => subGroups.flatMap((g) => g.tokens), [subGroups])
  const filteredGroups = useMemo(() => {
    if (!query) return subGroups
    const q = query.toLowerCase()
    return subGroups
      .map((g) => ({
        ...g,
        tokens: g.tokens.filter(
          (tok) =>
            tok.figma.toLowerCase().includes(q) ||
            tok.dubois.toLowerCase().includes(q) ||
            tok.shadcn.toLowerCase().includes(q) ||
            tok.light.toLowerCase().includes(q) ||
            tok.dark.toLowerCase().includes(q)
        ),
      }))
      .filter((g) => g.tokens.length > 0)
  }, [subGroups, query])
  const filteredCount = filteredGroups.reduce((a, g) => a + g.tokens.length, 0)
  if (filteredCount === 0 && query) return null

  return (
    <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${t.border}` }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 transition-colors"
        style={{ backgroundColor: t.cardBg }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = t.hoverBg }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = t.cardBg }}
      >
        <div className="flex items-center gap-4">
          <span className="text-[20px]" style={{ color: t.text, fontFamily: SERIF }}>
            <em className="font-normal">{title}</em>
          </span>
          <span
            className="text-[11px] px-2 py-0.5 rounded-full"
            style={{ color: t.textSubtle, backgroundColor: t.bg, border: `1px solid ${t.border}`, fontFamily: MONO }}
          >
            {filteredCount}{query ? ` / ${allTokens.length}` : ""}
          </span>
        </div>
        <ChevronIcon open={open} color={t.textSubtle} />
      </button>
      {open && (
        <div className="px-6 py-5 flex flex-col gap-10" style={{ borderTop: `1px solid ${t.border}` }}>
          {filteredGroups.map((group) => (
            <div key={group.label}>
              {subGroups.length > 1 && (
                <p
                  className="text-[11px] tracking-[0.14em] uppercase mb-4"
                  style={{ color: t.textSubtle, fontFamily: MONO }}
                >
                  {group.label}
                </p>
              )}
              <div
                className="grid gap-3"
                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
              >
                {group.tokens.map((token, i) => (
                  <TokenTile
                    key={`${group.label}-${i}`}
                    token={token}
                    t={t}
                    mode={mode}
                    category={subGroups.length > 1 ? subGroupCategory(group.label) : category}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Token Data ─────────────────────────────────────────────────────────────

const PRIMITIVES: Token[] = [
  // Blue
  { figma: "blue/blue100", dubois: "blue100", shadcn: "—", light: "#F0F8FF", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "blue/blue200", dubois: "blue200", shadcn: "—", light: "#D7EDFE", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "blue/blue300", dubois: "blue300", shadcn: "—", light: "#BAE1FC", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "blue/blue400", dubois: "blue400", shadcn: "—", light: "#8ACAFF", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "blue/blue500", dubois: "blue500", shadcn: "—", light: "#4299E0", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "blue/blue600", dubois: "blue600", shadcn: "—", light: "#2272B4", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "blue/blue700", dubois: "blue700", shadcn: "—", light: "#0E538B", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "blue/blue800", dubois: "blue800", shadcn: "—", light: "#04355D", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  // Green
  { figma: "green/green100", dubois: "green100", shadcn: "—", light: "#F3FCF6", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "green/green200", dubois: "green200", shadcn: "—", light: "#D4F7DF", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "green/green300", dubois: "green300", shadcn: "—", light: "#B1ECC5", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "green/green400", dubois: "green400", shadcn: "—", light: "#8DDDA8", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "green/green500", dubois: "green500", shadcn: "—", light: "#3BA65E", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "green/green600", dubois: "green600", shadcn: "—", light: "#277C43", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "green/green700", dubois: "green700", shadcn: "—", light: "#115026", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "green/green800", dubois: "green800", shadcn: "—", light: "#093919", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  // Red
  { figma: "red/red100", dubois: "red100", shadcn: "—", light: "#FFF5F7", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "red/red200", dubois: "red200", shadcn: "—", light: "#FDE2E8", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "red/red300", dubois: "red300", shadcn: "—", light: "#FBD0D8", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "red/red400", dubois: "red400", shadcn: "—", light: "#F792A6", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "red/red500", dubois: "red500", shadcn: "—", light: "#E65B77", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "red/red600", dubois: "red600", shadcn: "—", light: "#C82D4C", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "red/red700", dubois: "red700", shadcn: "—", light: "#9E102C", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "red/red800", dubois: "red800", shadcn: "—", light: "#630316", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  // Yellow
  { figma: "yellow/yellow100", dubois: "yellow100", shadcn: "—", light: "#FFF9EB", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "yellow/yellow200", dubois: "yellow200", shadcn: "—", light: "#FCEACA", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "yellow/yellow300", dubois: "yellow300", shadcn: "—", light: "#F8D4A5", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "yellow/yellow400", dubois: "yellow400", shadcn: "—", light: "#F2BE88", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "yellow/yellow500", dubois: "yellow500", shadcn: "—", light: "#DE7921", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "yellow/yellow600", dubois: "yellow600", shadcn: "—", light: "#BE501E", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "yellow/yellow700", dubois: "yellow700", shadcn: "—", light: "#93320B", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "yellow/yellow800", dubois: "yellow800", shadcn: "—", light: "#5F1B02", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  // Grey
  { figma: "grey/grey050", dubois: "grey050", shadcn: "—", light: "#F6F7F9", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "grey/grey100", dubois: "grey100", shadcn: "—", light: "#E8ECF0", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "grey/grey200", dubois: "grey200", shadcn: "—", light: "#D1D9E1", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "grey/grey300", dubois: "grey300", shadcn: "—", light: "#C0CDD8", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "grey/grey350", dubois: "grey350", shadcn: "—", light: "#92A4B3", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "grey/grey400", dubois: "grey400", shadcn: "—", light: "#8396A5", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "grey/grey500", dubois: "grey500", shadcn: "—", light: "#5F7281", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "grey/grey600", dubois: "grey600", shadcn: "—", light: "#445461", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "grey/grey650", dubois: "grey650", shadcn: "—", light: "#37444F", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "grey/grey700", dubois: "grey700", shadcn: "—", light: "#1F272D", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "grey/grey800", dubois: "grey800", shadcn: "—", light: "#11171C", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  // Neutral
  { figma: "neutral/neutral050", dubois: "neutral050", shadcn: "—", light: "#F7F7F7", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "neutral/neutral100", dubois: "neutral100", shadcn: "—", light: "#EBEBEB", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "neutral/neutral200", dubois: "neutral200", shadcn: "—", light: "#D8D8D8", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "neutral/neutral300", dubois: "neutral300", shadcn: "—", light: "#CBCBCB", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "neutral/neutral350", dubois: "neutral350", shadcn: "—", light: "#A2A2A2", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "neutral/neutral400", dubois: "neutral400", shadcn: "—", light: "#939393", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "neutral/neutral500", dubois: "neutral500", shadcn: "—", light: "#6F6F6F", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "neutral/neutral600", dubois: "neutral600", shadcn: "—", light: "#525252", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "neutral/neutral650", dubois: "neutral650", shadcn: "—", light: "#424242", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "neutral/neutral700", dubois: "neutral700", shadcn: "—", light: "#262626", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "neutral/neutral800", dubois: "neutral800", shadcn: "—", light: "#161616", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  // Categorical
  { figma: "categorical/brown", dubois: "brown", shadcn: "—", light: "#A6630C", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "categorical/coral", dubois: "coral", shadcn: "—", light: "#C83243", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "categorical/indigo", dubois: "indigo", shadcn: "—", light: "#434A93", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "categorical/lemon", dubois: "lemon", shadcn: "—", light: "#FACB66", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "categorical/lime", dubois: "lime", shadcn: "—", light: "#308613", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "categorical/pink", dubois: "pink", shadcn: "—", light: "#B45091", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "categorical/purple", dubois: "purple", shadcn: "—", light: "#8A63BF", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "categorical/teal", dubois: "teal", shadcn: "—", light: "#04867D", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "categorical/turquoise", dubois: "turquoise", shadcn: "—", light: "#137DAE", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "categorical/charcoal", dubois: "charcoal", shadcn: "—", light: "#424242", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  // Base
  { figma: "base/white", dubois: "white", shadcn: "—", light: "#FFFFFF", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  // Brand
  { figma: "brand/ai-gradient-start", dubois: "ai-gradient-start", shadcn: "—", light: "#4299E0", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "brand/ai-gradient-mid", dubois: "ai-gradient-mid", shadcn: "—", light: "#CA42E0", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "brand/ai-gradient-end", dubois: "ai-gradient-end", shadcn: "—", light: "#FF5F46", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
]

const SEMANTIC_SURFACE: Token[] = [
  { figma: "surface/background", dubois: "backgroundPrimary", duboisValue: "#FFFFFF (white)", shadcn: "--background", shadcnValue: "oklch(1 0 0)", light: "#FFFFFF (white)", dark: "#11171C (grey800)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "surface/card", dubois: "surfaceCard", duboisValue: "#FFFFFF (white)", shadcn: "--card", shadcnValue: "oklch(1 0 0)", light: "#FFFFFF (white)", dark: "#11171C (grey800)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "surface/popover", dubois: "surfacePopover", duboisValue: "#FFFFFF (white)", shadcn: "--popover", shadcnValue: "oklch(1 0 0)", light: "#FFFFFF (white)", dark: "#11171C (grey800)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "surface/secondary", dubois: "surfaceSecondary", duboisValue: "#F7F7F7 (neutral050)", shadcn: "--secondary", shadcnValue: "oklch(0.97 0 0)", light: "#F7F7F7 (neutral050)", dark: "#1F272D (grey700)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "surface/muted", dubois: "surfaceMuted", duboisValue: "#F7F7F7 (neutral050)", shadcn: "--muted", shadcnValue: "oklch(0.97 0 0)", light: "#F7F7F7 (neutral050)", dark: "#1F272D (grey700)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "surface/accent", dubois: "infoWash", duboisValue: "#F0F8FF (blue100)", shadcn: "--accent", shadcnValue: "oklch(0.97 0 0)", light: "#F0F8FF (blue100)", dark: "#04355D (blue800)", lastUpdated: "2026-04-02", updateNote: "Updated to blue wash — distinct from secondary (neutral)", decision: "Blue wash" },
  { figma: "surface/sidebar", dubois: "surfaceSidebar", duboisValue: "#FFFFFF (white)", shadcn: "--sidebar", shadcnValue: "oklch(0.985 0 0)", light: "#FFFFFF (white)", dark: "#11171C (grey800)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "surface/sidebar-accent", dubois: "surfaceSidebarAccent", duboisValue: "#F7F7F7 (neutral050)", shadcn: "--sidebar-accent", shadcnValue: "oklch(0.97 0 0)", light: "#F7F7F7 (neutral050)", dark: "#1F272D (grey700)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
]

const SEMANTIC_TEXT: Token[] = [
  { figma: "text/foreground", dubois: "textPrimary", duboisValue: "#161616 (neutral800)", shadcn: "--foreground", shadcnValue: "oklch(0.145 0 0)", light: "#161616 (neutral800)", dark: "#E8ECF0 (grey100)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "text/card-foreground", dubois: "textCard", duboisValue: "#161616 (neutral800)", shadcn: "--card-foreground", shadcnValue: "oklch(0.145 0 0)", light: "#161616 (neutral800)", dark: "#E8ECF0 (grey100)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "text/popover-foreground", dubois: "textPopover", duboisValue: "#161616 (neutral800)", shadcn: "--popover-foreground", shadcnValue: "oklch(0.145 0 0)", light: "#161616 (neutral800)", dark: "#E8ECF0 (grey100)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "text/secondary-foreground", dubois: "textSecondary", duboisValue: "#161616 (neutral800)", shadcn: "--secondary-foreground", shadcnValue: "oklch(0.145 0 0)", light: "#161616 (neutral800)", dark: "#E8ECF0 (grey100)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "text/muted-foreground", dubois: "textMuted", duboisValue: "#6F6F6F (neutral500)", shadcn: "--muted-foreground", shadcnValue: "oklch(0.556 0 0)", light: "#6F6F6F (neutral500)", dark: "#92A4B3 (grey350)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "text/accent-foreground", dubois: "actionPrimaryBg", duboisValue: "#0E538B (blue700)", shadcn: "--accent-foreground", shadcnValue: "oklch(0.145 0 0)", light: "#0E538B (blue700)", dark: "#4299E0 (blue500)", lastUpdated: "2026-04-02", updateNote: "Updated to blue text on accent surfaces", decision: "Blue text" },
  { figma: "text/sidebar-foreground", dubois: "textSidebar", duboisValue: "#161616 (neutral800)", shadcn: "--sidebar-foreground", shadcnValue: "oklch(0.145 0 0)", light: "#161616 (neutral800)", dark: "#E8ECF0 (grey100)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "text/sidebar-accent-foreground", dubois: "textSidebarAccent", duboisValue: "#161616 (neutral800)", shadcn: "--sidebar-accent-foreground", shadcnValue: "oklch(0.145 0 0)", light: "#161616 (neutral800)", dark: "#E8ECF0 (grey100)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
]

const SEMANTIC_ACTION: Token[] = [
  { figma: "action/primary", dubois: "actionPrimaryBg", duboisValue: "#2272B4 (blue600)", shadcn: "--primary", shadcnValue: "oklch(0.205 0 0) \u2014 grey!", light: "#2272B4 (blue600)", dark: "#4299E0 (blue500)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois, not shadcn" },
  { figma: "action/primary-foreground", dubois: "actionPrimaryText", duboisValue: "#FFFFFF (white)", shadcn: "--primary-foreground", shadcnValue: "oklch(0.985 0 0)", light: "#FFFFFF (white)", dark: "#11171C (grey800)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "action/sidebar-primary", dubois: "actionSidebarPrimary", duboisValue: "#2272B4 (blue600)", shadcn: "--sidebar-primary", shadcnValue: "oklch(0.205 0 0) \u2014 grey!", light: "#2272B4 (blue600)", dark: "#4299E0 (blue500)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois, not shadcn" },
  { figma: "action/sidebar-primary-foreground", dubois: "actionSidebarPrimaryText", duboisValue: "#FFFFFF (white)", shadcn: "--sidebar-primary-foreground", shadcnValue: "oklch(0.985 0 0)", light: "#FFFFFF (white)", dark: "#11171C (grey800)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "action/destructive", dubois: "actionDestructiveBg", duboisValue: "#C82D4C (red600)", shadcn: "--destructive", shadcnValue: "oklch(0.577 0.245 27.325)", light: "#C82D4C (red600)", dark: "#E65B77 (red500)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "action/ring", dubois: "focusRing", duboisValue: "#2272B4 (blue600)", shadcn: "--ring", shadcnValue: "oklch(0.708 0 0) \u2014 grey!", light: "#2272B4 (blue600)", dark: "#4299E0 (blue500)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois, not shadcn" },
  { figma: "action/destructive-foreground", dubois: "actionDestructiveText", duboisValue: "#FFFFFF (white)", shadcn: "--destructive-foreground", shadcnValue: "\u2014 (not in shadcn)", light: "#FFFFFF (white)", dark: "#11171C (grey800)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "New, shadcn slot" },
  { figma: "action/warning", dubois: "actionWarningBg", duboisValue: "#BE501E (yellow600)", shadcn: "--warning", shadcnValue: "\u2014 (not in shadcn)", light: "#BE501E (yellow600)", dark: "#DE7921 (yellow500)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois, no shadcn" },
  { figma: "action/warning-foreground", dubois: "actionWarningText", duboisValue: "#FFFFFF (white)", shadcn: "--warning-foreground", shadcnValue: "\u2014 (not in shadcn)", light: "#FFFFFF (white)", dark: "#11171C (grey800)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois, no shadcn" },
  { figma: "action/success", dubois: "actionSuccessBg", duboisValue: "#277C43 (green600)", shadcn: "--success", shadcnValue: "\u2014 (not in shadcn)", light: "#277C43 (green600)", dark: "#3BA65E (green500)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois, no shadcn" },
  { figma: "action/success-foreground", dubois: "actionSuccessText", duboisValue: "#FFFFFF (white)", shadcn: "--success-foreground", shadcnValue: "\u2014 (not in shadcn)", light: "#FFFFFF (white)", dark: "#11171C (grey800)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois, no shadcn" },
  { figma: "action/primary-hover", dubois: "actionPrimaryHover", duboisValue: "#0E538B (blue700)", shadcn: "--primary-hover", shadcnValue: "\u2014 (not in shadcn)", light: "#0E538B (blue700)", dark: "#8ACAFF (blue400)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois, no shadcn" },
  { figma: "action/primary-press", dubois: "actionPrimaryPress", duboisValue: "#04355D (blue800)", shadcn: "--primary-press", shadcnValue: "\u2014 (not in shadcn)", light: "#04355D (blue800)", dark: "#BAE1FC (blue300)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois, no shadcn" },
  { figma: "action/destructive-hover", dubois: "actionDestructiveHover", duboisValue: "#9E102C (red700)", shadcn: "--destructive-hover", shadcnValue: "\u2014 (not in shadcn)", light: "#9E102C (red700)", dark: "#F792A6 (red400)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois, no shadcn" },
  { figma: "action/destructive-press", dubois: "actionDestructivePress", duboisValue: "#630316 (red800)", shadcn: "--destructive-press", shadcnValue: "\u2014 (not in shadcn)", light: "#630316 (red800)", dark: "#FBD0D8 (red300)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois, no shadcn" },
]

const SEMANTIC_BORDER: Token[] = [
  { figma: "border/border", dubois: "borderDefault", duboisValue: "#EBEBEB (neutral100)", shadcn: "--border", shadcnValue: "oklch(0.922 0 0)", light: "#EBEBEB (neutral100)", dark: "#1F272D (grey700)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "border/input", dubois: "borderInput", duboisValue: "#CBCBCB (neutral300)", shadcn: "--input", shadcnValue: "oklch(0.922 0 0)", light: "#CBCBCB (neutral300)", dark: "#37444F (grey650)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "border/sidebar-border", dubois: "borderSidebar", duboisValue: "#EBEBEB (neutral100)", shadcn: "--sidebar-border", shadcnValue: "oklch(0.922 0 0)", light: "#EBEBEB (neutral100)", dark: "#1F272D (grey700)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "border/sidebar-ring", dubois: "borderSidebarRing", duboisValue: "#2272B4 (blue600)", shadcn: "--sidebar-ring", shadcnValue: "oklch(0.708 0 0)", light: "#2272B4 (blue600)", dark: "#4299E0 (blue500)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
]

const SEMANTIC_CHART: Token[] = [
  { figma: "chart/chart-1", dubois: "chartBlue", duboisValue: "#4299E0 (blue500)", shadcn: "--chart-1", shadcnValue: "oklch(0.809 0.105 251.813)", light: "#4299E0 (blue500)", dark: "#4299E0 (blue500)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois color" },
  { figma: "chart/chart-2", dubois: "chartGreen", duboisValue: "#3BA65E (green500)", shadcn: "--chart-2", shadcnValue: "oklch(0.623 0.214 259.815)", light: "#3BA65E (green500)", dark: "#3BA65E (green500)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois color" },
  { figma: "chart/chart-3", dubois: "chartYellow", duboisValue: "#DE7921 (yellow500)", shadcn: "--chart-3", shadcnValue: "oklch(0.546 0.245 262.881)", light: "#DE7921 (yellow500)", dark: "#DE7921 (yellow500)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois color" },
  { figma: "chart/chart-4", dubois: "chartPurple", duboisValue: "#8A63BF (purple)", shadcn: "--chart-4", shadcnValue: "oklch(0.488 0.243 264.376)", light: "#8A63BF (purple)", dark: "#8A63BF (purple)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois color" },
  { figma: "chart/chart-5", dubois: "chartRed", duboisValue: "#C83243 (coral)", shadcn: "--chart-5", shadcnValue: "oklch(0.424 0.199 265.638)", light: "#C83243 (coral)", dark: "#C83243 (coral)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois color" },
]

const SEMANTIC_UTILITY: Token[] = [
  { figma: "utility/overlay", dubois: "overlayBg", duboisValue: "rgba(0,0,0,0.26)", shadcn: "--overlay", shadcnValue: "\u2014 (not in shadcn)", light: "rgba(0,0,0,0.26)", dark: "rgba(0,0,0,0.45)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois only" },
  { figma: "utility/code-background", dubois: "codeBg", duboisValue: "rgba(82,82,82,0.08)", shadcn: "--code-background", shadcnValue: "\u2014 (not in shadcn)", light: "rgba(82,82,82,0.08)", dark: "#37444F", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "utility/skeleton", dubois: "skeletonBg", duboisValue: "rgba(162,162,162,0.16)", shadcn: "--skeleton", shadcnValue: "\u2014 (not in shadcn)", light: "rgba(162,162,162,0.16)", dark: "rgba(144,164,181,0.16)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "utility/border-accessible", dubois: "borderAccessible", duboisValue: "#6F6F6F (neutral500)", shadcn: "--border-accessible", shadcnValue: "\u2014 (not in shadcn)", light: "#6F6F6F (neutral500)", dark: "#C0CDD8 (grey300)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois, WCAG" },
]

const SEMANTIC_BRAND: Token[] = [
  { figma: "brand/ai-gradient-start", dubois: "aiGradientStart", duboisValue: "blue500", shadcn: "--ai-gradient-start", shadcnValue: "\u2014 (not in shadcn)", light: "#4299E0 (blue500)", dark: "#4299E0 (blue500)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois only" },
  { figma: "brand/ai-gradient-mid", dubois: "aiGradientMid", duboisValue: "#CA42E0", shadcn: "--ai-gradient-mid", shadcnValue: "\u2014 (not in shadcn)", light: "#CA42E0", dark: "#CA42E0", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois only" },
  { figma: "brand/ai-gradient-end", dubois: "aiGradientEnd", duboisValue: "#FF5F46", shadcn: "--ai-gradient-end", shadcnValue: "\u2014 (not in shadcn)", light: "#FF5F46", dark: "#FF5F46", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois only" },
]

const RADIUS: Token[] = [
  { figma: "radius/radius-0", dubois: "borderRadius0", duboisValue: "0px", shadcn: "--radius-none", shadcnValue: "— (not in shadcn)", light: "0px", dark: "—", lastUpdated: "2026-03-27", updateNote: "Sharp corners for table cells, inline elements", decision: "New token" },
  { figma: "radius/radius-sm", dubois: "borderRadiusSm", duboisValue: "4px", shadcn: "--radius-sm → rounded-sm", shadcnValue: "calc(var(--radius) - 4px)", light: "4px", dark: "—", lastUpdated: "2026-04-02", updateNote: "Buttons, inputs, badges, small chips. The most-used radius.", decision: "DuBois 1:1" },
  { figma: "radius/radius", dubois: "borderRadiusMd", duboisValue: "8px", shadcn: "--radius (base)", shadcnValue: "0.625rem", light: "8px", dark: "—", lastUpdated: "2026-04-02", updateNote: "Base radius variable. Components derive from this.", decision: "DuBois 1:1" },
  { figma: "radius/radius-md", dubois: "borderRadiusMd", duboisValue: "8px", shadcn: "--radius-md → rounded-md", shadcnValue: "calc(var(--radius) - 2px)", light: "8px", dark: "—", lastUpdated: "2026-04-02", updateNote: "Cards, dialog corners, medium panels.", decision: "DuBois 1:1" },
  { figma: "radius/radius-lg", dubois: "borderRadiusLg", duboisValue: "12px", shadcn: "--radius-lg → rounded-lg", shadcnValue: "var(--radius)", light: "12px", dark: "—", lastUpdated: "2026-04-02", updateNote: "shadcn uses rounded-lg for interactive elements (buttons, inputs, selects).", decision: "DuBois 1:1" },
  { figma: "radius/radius-xl", dubois: "borderRadiusXl", duboisValue: "16px", shadcn: "--radius-xl → rounded-xl", shadcnValue: "calc(var(--radius) + 4px)", light: "16px", dark: "—", lastUpdated: "2026-04-02", updateNote: "Large modals, bottom sheets, page sections.", decision: "DuBois 1:1" },
  { figma: "radius/radius-2xl", dubois: "borderRadiusFull", duboisValue: "999px", shadcn: "--radius-2xl → rounded-2xl", shadcnValue: "calc(var(--radius) + 4px)", light: "999px", dark: "—", lastUpdated: "2026-04-02", updateNote: "Pill shape. Avatars, pill badges, rounded buttons. Absorbs old 3xl.", decision: "DuBois full" },
]

const SPACING: Token[] = [
  { figma: "spacing/spacing-0", dubois: "spacing-0", duboisValue: "0px (spacing-0)", shadcn: "p-0 / gap-0", shadcnValue: "\u2014 (Tailwind utility only)", light: "0px", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "spacing/spacing-xs", dubois: "spacing-xs", duboisValue: "4px (spacing-xs)", shadcn: "p-1 / gap-1", shadcnValue: "\u2014 (Tailwind utility only)", light: "4px", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "spacing/spacing-sm", dubois: "spacing-sm", duboisValue: "8px (spacing-sm)", shadcn: "p-2 / gap-2", shadcnValue: "\u2014 (Tailwind utility only)", light: "8px", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "spacing/spacing-mid", dubois: "spacing-mid", duboisValue: "12px (spacing-mid)", shadcn: "p-3 / gap-3", shadcnValue: "\u2014 (Tailwind utility only)", light: "12px", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "spacing/spacing-md", dubois: "spacing-md", duboisValue: "16px (spacing-md)", shadcn: "p-4 / gap-4", shadcnValue: "\u2014 (Tailwind utility only)", light: "16px", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "spacing/spacing-lg", dubois: "spacing-lg", duboisValue: "24px (spacing-lg)", shadcn: "p-6 / gap-6", shadcnValue: "\u2014 (Tailwind utility only)", light: "24px", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
  { figma: "spacing/spacing-xl", dubois: "spacing-xl", duboisValue: "32px (spacing-xl)", shadcn: "p-8 / gap-8", shadcnValue: "\u2014 (Tailwind utility only)", light: "32px", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois 1:1" },
]

const SHADOWS: Token[] = [
  { figma: "shadow-xs", dubois: "xs", duboisValue: "0 1px 2px 0 rgba(0,0,0,0.05)", shadcn: "shadow-xs", shadcnValue: "0 1px 2px 0 rgb(0,0,0/.05)", light: "0 1px 2px 0 rgba(0,0,0,0.05)", dark: "0 1px 2px 0 rgba(0,0,0,0.3)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "shadow-sm", dubois: "sm", duboisValue: "0 1px 3px rgba(0,0,0,0.1)", shadcn: "shadow-sm", shadcnValue: "0 1px 3px 0 rgb(0,0,0/.1), 0 1px 2px -1px rgb(0,0,0/.1)", light: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)", dark: "0 1px 3px 0 rgba(0,0,0,0.4)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "shadow", dubois: "md", duboisValue: "0 4px 6px -1px rgba(0,0,0,0.1)", shadcn: "shadow", shadcnValue: "0 4px 6px -1px rgb(0,0,0/.1), 0 2px 4px -2px rgb(0,0,0/.1)", light: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)", dark: "0 4px 6px -1px rgba(0,0,0,0.5)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "shadow-md", dubois: "lg", duboisValue: "0 10px 15px -3px rgba(0,0,0,0.1)", shadcn: "shadow-md", shadcnValue: "0 10px 15px -3px rgb(0,0,0/.1), 0 4px 6px -4px rgb(0,0,0/.1)", light: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)", dark: "0 10px 15px -3px rgba(0,0,0,0.5)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "shadow-lg", dubois: "xl", duboisValue: "0 20px 25px -5px rgba(0,0,0,0.1)", shadcn: "shadow-lg", shadcnValue: "0 20px 25px -5px rgb(0,0,0/.1), 0 8px 10px -6px rgb(0,0,0/.1)", light: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)", dark: "0 20px 25px -5px rgba(0,0,0,0.5)", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
]

const TEXT_STYLES: Token[] = [
  { figma: "Hint", dubois: "Hint", duboisValue: "12/16 Regular", shadcn: "text-xs", shadcnValue: "12px / 1rem", light: "SF Pro Text 12/16 Regular", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois style" },
  { figma: "Paragraph", dubois: "Paragraph", duboisValue: "13/20 Regular", shadcn: "text-sm", shadcnValue: "14px / 1.25rem", light: "SF Pro Text 13/20 Regular", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois style" },
  { figma: "Bold", dubois: "Bold", duboisValue: "13/20 Semibold", shadcn: "text-sm font-semibold", shadcnValue: "14px / 1.25rem 600", light: "SF Pro Text 13/20 Semibold", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois style" },
  { figma: "Title 4", dubois: "Title 4", duboisValue: "13/20 Semibold", shadcn: "text-sm font-semibold", shadcnValue: "14px / 1.25rem 600", light: "SF Pro Display 13/20 Semibold", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois, = Bold" },
  { figma: "Title 3", dubois: "Title 3", duboisValue: "18/24 Semibold", shadcn: "text-lg font-semibold", shadcnValue: "18px / 1.75rem 600", light: "SF Pro Display 18/24 Semibold", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois style" },
  { figma: "Title 2", dubois: "Title 2", duboisValue: "22/28 Semibold", shadcn: "text-xl font-semibold", shadcnValue: "20px / 1.75rem 600", light: "SF Pro Display 22/28 Semibold", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois style" },
  { figma: "Title 1", dubois: "Title 1", duboisValue: "32/40 Semibold", shadcn: "text-3xl font-semibold", shadcnValue: "30px / 2.25rem 600", light: "SF Pro Display 32/40 Semibold", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois style" },
  { figma: "Code", dubois: "Code", duboisValue: "13/20 Regular (mono)", shadcn: "font-mono text-sm", shadcnValue: "14px / 1.25rem mono", light: "SF Mono 13/20 Regular", dark: "—", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois style" },
]

const TYPOGRAPHY: Token[] = [
  { figma: "font/body", dubois: "fontBody", duboisValue: "SF Pro Text", shadcn: "font-sans", shadcnValue: "\u2014 (not in shadcn)", light: "SF Pro Text", dark: "Space Grotesk", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "New, themeable" },
  { figma: "font/display", dubois: "fontDisplay", duboisValue: "SF Pro Display", shadcn: "font-display", shadcnValue: "\u2014 (not in shadcn)", light: "SF Pro Display", dark: "Space Grotesk", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "New, themeable" },
  { figma: "font/mono", dubois: "fontMono", duboisValue: "SF Mono", shadcn: "font-mono", shadcnValue: "\u2014 (not in shadcn)", light: "SF Mono", dark: "Fira Code", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "New, themeable" },
  { figma: "size/hint", dubois: "fontSizeHint", duboisValue: "12px", shadcn: "text-xs", shadcnValue: "\u2014 (not in shadcn)", light: "12px", dark: "12px", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "size/paragraph", dubois: "fontSizeParagraph", duboisValue: "13px", shadcn: "text-sm", shadcnValue: "\u2014 (not in shadcn)", light: "13px", dark: "14px", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "size/title-4", dubois: "fontSizeTitle4", duboisValue: "13px", shadcn: "text-sm", shadcnValue: "\u2014 (not in shadcn)", light: "13px", dark: "14px", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "size/title-3", dubois: "fontSizeTitle3", duboisValue: "18px", shadcn: "text-lg", shadcnValue: "\u2014 (not in shadcn)", light: "18px", dark: "18px", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "size/title-2", dubois: "fontSizeTitle2", duboisValue: "22px", shadcn: "text-xl", shadcnValue: "\u2014 (not in shadcn)", light: "22px", dark: "24px", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "size/title-1", dubois: "fontSizeTitle1", duboisValue: "32px", shadcn: "text-3xl", shadcnValue: "\u2014 (not in shadcn)", light: "32px", dark: "36px", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "size/code", dubois: "fontSizeCode", duboisValue: "13px", shadcn: "text-sm", shadcnValue: "\u2014 (not in shadcn)", light: "13px", dark: "14px", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "line-height/hint", dubois: "lineHeightHint", duboisValue: "16px", shadcn: "leading-4", shadcnValue: "\u2014 (not in shadcn)", light: "16px", dark: "16px", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "line-height/paragraph", dubois: "lineHeightParagraph", duboisValue: "20px", shadcn: "leading-5", shadcnValue: "\u2014 (not in shadcn)", light: "20px", dark: "22px", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "line-height/title-3", dubois: "lineHeightTitle3", duboisValue: "24px", shadcn: "leading-6", shadcnValue: "\u2014 (not in shadcn)", light: "24px", dark: "24px", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "line-height/title-2", dubois: "lineHeightTitle2", duboisValue: "28px", shadcn: "leading-7", shadcnValue: "\u2014 (not in shadcn)", light: "28px", dark: "32px", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "line-height/title-1", dubois: "lineHeightTitle1", duboisValue: "40px", shadcn: "leading-10", shadcnValue: "\u2014 (not in shadcn)", light: "40px", dark: "44px", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "weight/regular", dubois: "fontWeightRegular", duboisValue: "400", shadcn: "font-normal", shadcnValue: "\u2014 (not in shadcn)", light: "400", dark: "400", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
  { figma: "weight/semibold", dubois: "fontWeightSemibold", duboisValue: "600", shadcn: "font-semibold", shadcnValue: "\u2014 (not in shadcn)", light: "600", dark: "600", lastUpdated: "2026-03-26", updateNote: "Initial token creation", decision: "DuBois value" },
]

const EXCLUDED_DUBOIS: Token[] = [
  { figma: "—", dubois: "actionDisabledBackground", duboisValue: "neutral100 / grey650", shadcn: "—", light: "—", dark: "—", lastUpdated: "2026-03-26", updateNote: "Handled via Tailwind disabled: pseudo-class", decision: "Use disabled:" },
  { figma: "—", dubois: "actionDisabledBorder", duboisValue: "neutral200 / grey600", shadcn: "—", light: "—", dark: "—", lastUpdated: "2026-03-26", updateNote: "Handled via Tailwind disabled: pseudo-class", decision: "Use disabled:" },
  { figma: "—", dubois: "actionDisabledText", duboisValue: "neutral350 / grey500", shadcn: "—", light: "—", dark: "—", lastUpdated: "2026-03-26", updateNote: "Handled via Tailwind disabled: pseudo-class", decision: "Use disabled:" },
  { figma: "—", dubois: "actionLinkDefault", duboisValue: "blue600 / blue500", shadcn: "—", light: "—", dark: "—", lastUpdated: "2026-03-26", updateNote: "Maps to --primary in DBUI", decision: "Use --primary" },
  { figma: "—", dubois: "actionLinkHover", duboisValue: "blue700 / blue400", shadcn: "—", light: "—", dark: "—", lastUpdated: "2026-03-26", updateNote: "Use hover: pseudo on primary", decision: "Use hover:" },
  { figma: "—", dubois: "actionLinkPress", duboisValue: "blue800 / blue300", shadcn: "—", light: "—", dark: "—", lastUpdated: "2026-03-26", updateNote: "Use active: pseudo on primary", decision: "Use active:" },
  { figma: "—", dubois: "backgroundDanger", duboisValue: "red100", shadcn: "—", light: "—", dark: "—", lastUpdated: "2026-03-27", updateNote: "Briefly added as status/ token, removed \u2014 compose via --destructive at 8% opacity", decision: "Compose" },
  { figma: "—", dubois: "backgroundSuccess", duboisValue: "green100", shadcn: "—", light: "—", dark: "—", lastUpdated: "2026-03-27", updateNote: "Briefly added as status/ token, removed \u2014 compose via --success at 8% opacity", decision: "Compose" },
  { figma: "—", dubois: "backgroundWarning", duboisValue: "yellow100", shadcn: "—", light: "—", dark: "—", lastUpdated: "2026-03-27", updateNote: "Briefly added as status/ token, removed \u2014 compose via --warning at 8% opacity", decision: "Compose" },
  { figma: "—", dubois: "textPlaceholder", duboisValue: "neutral500 / grey400", shadcn: "—", light: "—", dark: "—", lastUpdated: "2026-03-27", updateNote: "Briefly added as status/ token, removed \u2014 identical to --muted-foreground", decision: "= muted-fg" },
  { figma: "—", dubois: "textValidationDanger", duboisValue: "red600 / red500", shadcn: "—", light: "—", dark: "—", lastUpdated: "2026-03-27", updateNote: "Briefly added as status/ token, removed \u2014 identical to --destructive", decision: "= destructive" },
  { figma: "—", dubois: "textValidationSuccess", duboisValue: "green600 / green500", shadcn: "—", light: "—", dark: "—", lastUpdated: "2026-03-27", updateNote: "Briefly added as status/ token, removed \u2014 identical to --success", decision: "= success" },
  { figma: "—", dubois: "textValidationWarning", duboisValue: "yellow600 / yellow500", shadcn: "—", light: "—", dark: "—", lastUpdated: "2026-03-27", updateNote: "Briefly added as status/ token, removed \u2014 identical to --warning", decision: "= warning" },
  { figma: "—", dubois: "tooltipBackgroundTooltip", duboisValue: "neutral800 / grey100", shadcn: "—", light: "—", dark: "—", lastUpdated: "2026-03-27", updateNote: "Briefly added as status/ token, removed \u2014 identical to --foreground (inverted)", decision: "= foreground" },
  { figma: "—", dubois: "progressFill", duboisValue: "neutral300 / grey500", shadcn: "—", light: "—", dark: "—", lastUpdated: "2026-03-26", updateNote: "Will add with Progress component", decision: "Deferred" },
  { figma: "—", dubois: "progressTrack", duboisValue: "neutral100 / grey650", shadcn: "—", light: "—", dark: "—", lastUpdated: "2026-03-26", updateNote: "Will add with Progress component", decision: "Deferred" },
  { figma: "—", dubois: "progressFillPrimary", duboisValue: "blue500 / blue600", shadcn: "—", light: "—", dark: "—", lastUpdated: "2026-03-26", updateNote: "Will add with Progress component", decision: "Deferred" },
  { figma: "—", dubois: "~38 action state tokens", duboisValue: "Various hover/press/default states", shadcn: "—", light: "—", dark: "—", lastUpdated: "2026-03-26", updateNote: "Collapsed into base tokens + CSS pseudo-classes (hover:, active:, focus:)", decision: "CSS pseudo" },
  { figma: "—", dubois: "~82 tag color tokens", duboisValue: "tagBackground/Text/Icon \u00d7 11 colors \u00d7 2 modes", shadcn: "—", light: "—", dark: "—", lastUpdated: "2026-03-26", updateNote: "Will compose from categorical primitives + opacity when building Tag component", decision: "Deferred" },
  { figma: "—", dubois: "tableBackground (4 tokens)", duboisValue: "Selection + hover states", shadcn: "—", light: "—", dark: "—", lastUpdated: "2026-03-26", updateNote: "Compose from --muted and --accent", decision: "Compose" },
  { figma: "—", dubois: "shadowLow (deprecated)", duboisValue: "0px 4px 16px rgba(31,39,45,0.12)", shadcn: "—", light: "—", dark: "—", lastUpdated: "2026-03-26", updateNote: "Legacy DuBois shadow, replaced by the 5-level scale", decision: "Deprecated" },
  { figma: "—", dubois: "shadowHigh (deprecated)", duboisValue: "0px 8px 24px rgba(31,39,45,0.2)", shadcn: "—", light: "—", dark: "—", lastUpdated: "2026-03-26", updateNote: "Legacy DuBois shadow, replaced by the 5-level scale", decision: "Deprecated" },
]

const EXCLUDED_SHADCN: Token[] = [
  { figma: "—", dubois: "—", shadcn: "--radius-3xl", shadcnValue: "999px (CSS) — pills", light: "—", dark: "—", lastUpdated: "2026-04-02", updateNote: "Absorbed by --radius-2xl (999px). Scale simplified to 6 stops: 0/4/8/12/16/999.", decision: "Absorbed" },
  { figma: "—", dubois: "—", shadcn: "--radius-4xl", shadcnValue: "calc(--radius \u00d7 2.6) \u2248 26px", light: "—", dark: "—", lastUpdated: "2026-03-26", updateNote: "Marked redundant \u2014 DuBois has no equivalent, borderRadiusFull (999px) covers large radius needs", decision: "Redundant" },
  { figma: "—", dubois: "—", shadcn: "shadow-xl", shadcnValue: "0 20px 25px -5px rgb(0,0,0/.1)", light: "—", dark: "—", lastUpdated: "2026-03-26", updateNote: "DuBois xl maps to shadow-lg. No need for a 6th level.", decision: "Redundant" },
  { figma: "—", dubois: "—", shadcn: "shadow-2xl", shadcnValue: "0 25px 50px -12px rgb(0,0,0/.25)", light: "—", dark: "—", lastUpdated: "2026-03-26", updateNote: "Excessive \u2014 DuBois caps at 5 shadow levels", decision: "Redundant" },
  { figma: "—", dubois: "—", shadcn: "text-4xl+", shadcnValue: "36px+ (2.25rem+)", light: "—", dark: "—", lastUpdated: "2026-03-26", updateNote: "DuBois caps at 32px. No product use case for larger.", decision: "DB caps 32px" },
  { figma: "—", dubois: "—", shadcn: "font-medium (500)", shadcnValue: "font-weight: 500", light: "—", dark: "—", lastUpdated: "2026-03-26", updateNote: "DuBois only uses 400 and 600. 500 maps to 600.", decision: "\u2192 600" },
  { figma: "—", dubois: "—", shadcn: "font-bold (700)", shadcnValue: "font-weight: 700", light: "—", dark: "—", lastUpdated: "2026-03-26", updateNote: "DuBois caps bold at 600 (Semi Bold). 700 mapped to 600.", decision: "\u2192 600" },
  { figma: "—", dubois: "—", shadcn: "shadow-2xs", shadcnValue: "0 1px rgb(0,0,0/.05)", light: "—", dark: "—", lastUpdated: "2026-03-26", updateNote: "Tailwind default, not used \u2014 DuBois shadow-xs covers this range", decision: "Not needed" },
]

// ─── Section Definitions ────────────────────────────────────────────────────

// Semantic colors: CSS custom properties + Figma variables (Semantic collection, 2 modes: Light / Dark)
const SEMANTIC_GROUPS: SubGroup[] = [
  { label: "Surface", tokens: SEMANTIC_SURFACE },
  { label: "Text", tokens: SEMANTIC_TEXT },
  { label: "Border", tokens: SEMANTIC_BORDER },
  { label: "Utility", tokens: SEMANTIC_UTILITY },
  { label: "Action", tokens: SEMANTIC_ACTION },
  { label: "Chart", tokens: SEMANTIC_CHART },
  { label: "Brand", tokens: SEMANTIC_BRAND },
]

const TYPOGRAPHY_GROUPS: SubGroup[] = [
  { label: "Text Styles — Figma text styles, mapped to Tailwind classes", tokens: TEXT_STYLES },
  { label: "Variables — Figma variables (Typography collection, 2 modes: Production / Wireframe)", tokens: TYPOGRAPHY },
]

const NUMBERS_GROUPS: SubGroup[] = [
  { label: "Radius — CSS custom properties + Figma variables", tokens: RADIUS },
  { label: "Spacing — Tailwind CSS utilities + Figma variables (no CSS custom properties)", tokens: SPACING },
  { label: "Shadows — Figma effect styles (not yet in CSS)", tokens: SHADOWS },
]

const PRIMITIVES_GROUPS: SubGroup[] = [
  { label: "Primitives — Figma variables (hidden, aliased by semantic tokens)", tokens: PRIMITIVES },
]

const EXCLUDED_DUBOIS_GROUPS: SubGroup[] = [
  { label: "Excluded from DuBois", tokens: EXCLUDED_DUBOIS },
]

const EXCLUDED_SHADCN_GROUPS: SubGroup[] = [
  { label: "Excluded from shadcn", tokens: EXCLUDED_SHADCN },
]

const TOTAL_EXCLUDED = EXCLUDED_DUBOIS.length + EXCLUDED_SHADCN.length

const ALL_TOKENS = [
  ...TEXT_STYLES, ...TYPOGRAPHY,
  ...SEMANTIC_SURFACE, ...SEMANTIC_TEXT, ...SEMANTIC_ACTION, ...SEMANTIC_BORDER, ...SEMANTIC_CHART, ...SEMANTIC_UTILITY, ...SEMANTIC_BRAND,
  ...RADIUS, ...SPACING, ...SHADOWS,
  ...PRIMITIVES,
]

const TOTAL = ALL_TOKENS.length

// ─── Page ───────────────────────────────────────────────────────────────────

type ViewMode = "browse" | "compare"

export default function TokensPage() {
  const [query, setQuery] = useState("")
  const [viewMode, setViewMode] = useState<ViewMode>("browse")
  const [showPrimitives, setShowPrimitives] = useState(false)
  const [showExcluded, setShowExcluded] = useState(false)
  const { t, mode } = useTheme()

  const matchCount = useMemo(() => {
    if (!query) return TOTAL
    const q = query.toLowerCase()
    return ALL_TOKENS.filter(
      (tok) =>
        tok.figma.toLowerCase().includes(q) ||
        tok.dubois.toLowerCase().includes(q) ||
        tok.shadcn.toLowerCase().includes(q) ||
        tok.light.toLowerCase().includes(q) ||
        tok.dark.toLowerCase().includes(q)
    ).length
  }, [query])

  return (
    <div>
      {/* ─── Header ─── */}
      <section className="pt-24 pb-16 px-8" style={{ borderBottom: `1px solid ${t.border}` }}>
        <div className="max-w-[1100px] mx-auto">
          <p className="text-[11px] tracking-[0.2em] uppercase mb-4" style={{ color: t.textSubtle, fontFamily: MONO }}>
            Design Language
          </p>
          <h1 className="text-[42px] leading-[1.05] tracking-[-0.01em] mb-6" style={{ fontFamily: SERIF, color: t.text }}>
            <em className="font-normal">Tokens</em>
          </h1>
          <p className="text-[19px] max-w-[560px] leading-[1.5]" style={{ fontFamily: SERIF, color: t.textMuted }}>
            {TOTAL} design tokens across colors, typography, spacing, and effects. Synced from Figma variables.
          </p>
        </div>
      </section>

      {/* ─── Search + Controls bar ─── */}
      <section
        className="sticky top-12 z-40 px-8 py-3 backdrop-blur-xl"
        style={{ backgroundColor: `${t.bg}cc`, borderBottom: `1px solid ${t.border}` }}
      >
        <div className="max-w-[1100px] mx-auto flex items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-[360px]">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={t.textSubtle} strokeWidth="1.5">
              <circle cx="7" cy="7" r="5.5" />
              <path d="M11 11l3.5 3.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search tokens..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-md text-[13px] outline-none transition-colors"
              style={{ fontFamily: MONO, color: t.text, backgroundColor: t.cardBg, border: `1px solid ${t.border}` }}
            />
          </div>
          {/* Toggle */}
          <div
            className="flex rounded-lg overflow-hidden"
            style={{ border: `1px solid ${t.border}`, backgroundColor: t.cardBg }}
          >
            {(["browse", "compare"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                className="px-4 py-1.5 text-[13px] transition-colors"
                style={{
                  fontFamily: MONO,
                  color: viewMode === m ? "#FFFFFF" : t.textMuted,
                  backgroundColor: viewMode === m ? t.primary : "transparent",
                }}
              >
                {m === "browse" ? "Browse" : "Compare"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Token Sections ─── */}
      <section className="py-12 px-8">
        <div className="max-w-[1100px] mx-auto space-y-4">
          {viewMode === "browse" ? (
            <>
              <BrowseSection title="Semantic Colors" subGroups={SEMANTIC_GROUPS} query={query} t={t} mode={mode} category="semantic" defaultOpen={true} />
              <BrowseSection title="Typography" subGroups={TYPOGRAPHY_GROUPS} query={query} t={t} mode={mode} category="textstyles" defaultOpen={true} />
              <BrowseSection title="Numbers" subGroups={NUMBERS_GROUPS} query={query} t={t} mode={mode} category="radius" defaultOpen={true} />
              {!showPrimitives && (
                <div className="flex justify-center pt-4 pb-2">
                  <button
                    onClick={() => { setShowPrimitives(true); setShowExcluded(true) }}
                    className="px-5 py-2.5 rounded-lg text-[13px] transition-colors"
                    style={{ color: t.textMuted, border: `1px solid ${t.border}`, backgroundColor: "transparent", fontFamily: MONO }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = t.hoverBg }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent" }}
                  >
                    Show {PRIMITIVES.length} primitives + {TOTAL_EXCLUDED} excluded tokens...
                  </button>
                </div>
              )}
              {showPrimitives && (
                <BrowseSection title="Primitives" subGroups={PRIMITIVES_GROUPS} query={query} t={t} mode={mode} category="primitives" defaultOpen={false} />
              )}
              {showExcluded && (
                <>
                  <div className="pt-6 pb-2">
                    <p className="text-[11px] tracking-[0.2em] uppercase" style={{ color: t.textSubtle, fontFamily: MONO }}>
                      Excluded Tokens
                      <span className="ml-2 normal-case tracking-normal" style={{ color: t.textSubtle, opacity: 0.7 }}>
                        — {TOTAL_EXCLUDED} tokens intentionally not included in DBUI
                      </span>
                    </p>
                  </div>
                  <BrowseSection title="Excluded from DuBois" subGroups={EXCLUDED_DUBOIS_GROUPS} query={query} t={t} mode={mode} category="semantic" defaultOpen={false} />
                  <BrowseSection title="Excluded from shadcn" subGroups={EXCLUDED_SHADCN_GROUPS} query={query} t={t} mode={mode} category="semantic" defaultOpen={false} />
                </>
              )}
            </>
          ) : (
            <>
              <TokenSection title="Semantic Colors" subGroups={SEMANTIC_GROUPS} query={query} t={t} mode={mode} defaultOpen={true} />
              <TokenSection title="Typography" subGroups={TYPOGRAPHY_GROUPS} query={query} t={t} mode={mode} defaultOpen={true} />
              <TokenSection title="Numbers" subGroups={NUMBERS_GROUPS} query={query} t={t} mode={mode} defaultOpen={true} />
              {!showPrimitives && (
                <div className="flex justify-center pt-4 pb-2">
                  <button
                    onClick={() => { setShowPrimitives(true); setShowExcluded(true) }}
                    className="px-5 py-2.5 rounded-lg text-[13px] transition-colors"
                    style={{ color: t.textMuted, border: `1px solid ${t.border}`, backgroundColor: "transparent", fontFamily: MONO }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = t.hoverBg }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent" }}
                  >
                    Show {PRIMITIVES.length} primitives + {TOTAL_EXCLUDED} excluded tokens...
                  </button>
                </div>
              )}
              {showPrimitives && (
                <TokenSection title="Primitives" subGroups={PRIMITIVES_GROUPS} query={query} t={t} mode={mode} defaultOpen={false} />
              )}
              {showExcluded && (
                <>
                  <div className="pt-6 pb-2">
                    <p className="text-[11px] tracking-[0.2em] uppercase" style={{ color: t.textSubtle, fontFamily: MONO }}>
                      Excluded Tokens
                      <span className="ml-2 normal-case tracking-normal" style={{ color: t.textSubtle, opacity: 0.7 }}>
                        — {TOTAL_EXCLUDED} tokens intentionally not included in DBUI
                      </span>
                    </p>
                  </div>
                  <TokenSection title="Excluded from DuBois" subGroups={EXCLUDED_DUBOIS_GROUPS} query={query} t={t} mode={mode} defaultOpen={false} />
                  <TokenSection title="Excluded from shadcn" subGroups={EXCLUDED_SHADCN_GROUPS} query={query} t={t} mode={mode} defaultOpen={false} />
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* ─── Legend (Compare mode only) ─── */}
      {viewMode === "compare" && (
        <section className="py-16 px-8" style={{ borderTop: `1px solid ${t.border}` }}>
          <div className="max-w-[1100px] mx-auto">
            <p className="text-[11px] tracking-[0.2em] uppercase mb-6" style={{ color: t.textSubtle, fontFamily: MONO }}>
              Legend
            </p>
            <div className="grid grid-cols-3 gap-8 text-[13px]">
              <div>
                <div className="mb-1" style={{ color: t.textMuted, fontFamily: MONO }}>DBUI Name</div>
                <div style={{ color: t.textSubtle }}>
                  Figma variable path, e.g.{" "}
                  <span style={{ color: t.primary, fontFamily: MONO }}>colors/surface/background</span>
                </div>
              </div>
              <div>
                <div className="mb-1" style={{ color: t.textMuted, fontFamily: MONO }}>DuBois Name</div>
                <div style={{ color: t.textSubtle }}>
                  Original DuBois token or custom identifier used in Figma variable source
                </div>
              </div>
              <div>
                <div className="mb-1" style={{ color: t.textMuted, fontFamily: MONO }}>shadcn / Tailwind</div>
                <div style={{ color: t.textSubtle }}>
                  CSS custom property{" "}
                  <span style={{ color: t.success, fontFamily: MONO }}>--name</span>{" "}
                  or Tailwind class.{" "}
                  <span style={{ color: t.textSubtle, fontFamily: MONO }}>—</span>{" "}
                  = no mapping
                </div>
              </div>
            </div>
            <div className="mt-8">
              <span className="text-[11px]" style={{ color: t.textSubtle, fontFamily: MONO }}>
                Typography Light = Production mode · Dark = Wireframe mode
              </span>
            </div>
          </div>
        </section>
      )}

      {/* ─── Footer ─── */}
      <footer className="py-12 px-8" style={{ borderTop: `1px solid ${t.border}` }}>
        <div className="max-w-[1100px] mx-auto flex justify-between items-end">
          <div>
            <Link
              href="/"
              className="text-[14px] tracking-wider transition-colors hover:opacity-80"
              style={{ color: t.textMuted, fontFamily: MONO }}
            >
              DBUI
            </Link>
            <p className="text-[14px] mt-1" style={{ color: t.textSubtle }}>
              Token reference · {TOTAL} tokens across 4 categories.
            </p>
          </div>
          <p className="text-[11px]" style={{ color: t.textSubtle, fontFamily: MONO }}>
            Design · Databricks · 2026
          </p>
        </div>
      </footer>
    </div>
  )
}
