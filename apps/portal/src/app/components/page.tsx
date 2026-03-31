"use client"

import { useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Toggle } from "@/components/ui/toggle"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Spinner } from "@/components/ui/spinner"

const MONO = "'Fira Code', monospace"
const SERIF = "Baskerville, 'Times New Roman', Georgia, serif"

// ─── Status Badge ───

function StatusBadge({ type, children }: { type: "new" | "tweaked" | "gap" | "covered" | "partial" | "deferred" | "na"; children: string }) {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    new: { bg: "#E0F2FE", text: "#0369A1", border: "#7DD3FC" },
    tweaked: { bg: "#FEF3C7", text: "#92400E", border: "#FCD34D" },
    gap: { bg: "#FEE2E2", text: "#991B1B", border: "#FCA5A5" },
    covered: { bg: "#D1FAE5", text: "#065F46", border: "#6EE7B7" },
    partial: { bg: "#FEF3C7", text: "#92400E", border: "#FCD34D" },
    deferred: { bg: "#F3F4F6", text: "#6B7280", border: "#D1D5DB" },
    na: { bg: "transparent", text: "#9CA3AF", border: "#E5E7EB" },
  }
  const c = colors[type]
  return (
    <span
      className="inline-flex text-[10px] leading-[14px] px-1.5 py-0.5 rounded-full whitespace-nowrap"
      style={{ fontFamily: MONO, backgroundColor: c.bg, color: c.text, border: `1px solid ${c.border}` }}
    >
      {children}
    </span>
  )
}

// ─── Component Comparison Table ───

type ButtonState = "default" | "hover" | "active" | "focus" | "disabled" | "loading"

type VariantRow = {
  name: string
  dbui: string
  dubois: string
  status: "new" | "tweaked" | "gap" | "covered" | "partial" | "deferred"
  previewVariant?: Parameters<typeof Button>[0]["variant"]
  previewLabel?: string
  states: Record<ButtonState, { dbui: string; dubois: string }>
}

const BUTTON_VARIANTS: VariantRow[] = [
  {
    name: "Primary",
    dbui: 'variant="default"',
    dubois: 'type="primary"',
    status: "covered",
    previewVariant: "default",
    previewLabel: "Primary",
    states: {
      default: { dbui: "bg-primary (blue600). Shadow-xs added (not in shadcn)", dubois: "Covered" },
      hover: { dbui: "bg-primary-hover (blue700). Explicit token, not opacity", dubois: "Covered" },
      active: { dbui: "bg-primary-active (blue800) + translate-y-px. Active token + micro-press added", dubois: "Covered" },
      focus: { dbui: "3px ring at ring/50. Same as shadcn", dubois: "Covered" },
      disabled: { dbui: "opacity-50. Same as shadcn", dubois: "Covered — DuBois uses distinct disabled tokens instead of opacity" },
      loading: { dbui: "Not implemented", dubois: "Gap — DuBois has built-in spinner + aria-busy" },
    },
  },
  {
    name: "Outline",
    dbui: 'variant="outline"',
    dubois: 'type="default" (secondary)',
    status: "covered",
    previewVariant: "outline",
    previewLabel: "Outline",
    states: {
      default: { dbui: "border-input, transparent bg. Shadow-xs added", dubois: "Covered" },
      hover: { dbui: "border-primary-hover + bg-accent. Border color change added", dubois: "Covered" },
      active: { dbui: "No active-specific token yet", dubois: "Partial — DuBois has press state" },
      focus: { dbui: "3px ring. Same as shadcn", dubois: "Covered" },
      disabled: { dbui: "opacity-50", dubois: "Covered" },
      loading: { dbui: "Not implemented", dubois: "Gap — DuBois has spinner" },
    },
  },
  {
    name: "Secondary",
    dbui: 'variant="secondary"',
    dubois: "—",
    status: "new",
    previewVariant: "secondary",
    previewLabel: "Secondary",
    states: {
      default: { dbui: "bg-secondary (grey fill). Same as shadcn", dubois: "N/A — does not exist in DuBois" },
      hover: { dbui: "bg-accent. Same as shadcn", dubois: "N/A" },
      active: { dbui: "No active-specific token", dubois: "N/A" },
      focus: { dbui: "3px ring", dubois: "N/A" },
      disabled: { dbui: "opacity-50", dubois: "N/A" },
      loading: { dbui: "Not implemented", dubois: "N/A" },
    },
  },
  {
    name: "Ghost",
    dbui: 'variant="ghost"',
    dubois: 'type="tertiary"',
    status: "tweaked",
    previewVariant: "ghost",
    previewLabel: "Ghost",
    states: {
      default: { dbui: "Transparent, grey foreground text. Tweaked — DuBois uses blue text (actionTertiary)", dubois: "Tweaked — DBUI uses grey text instead of DuBois blue" },
      hover: { dbui: "bg-accent. DuBois uses blue/8 tint", dubois: "Tweaked — different tint approach" },
      active: { dbui: "No active-specific token", dubois: "Partial — DuBois has blue/16 press" },
      focus: { dbui: "3px ring", dubois: "Covered" },
      disabled: { dbui: "opacity-50", dubois: "Covered" },
      loading: { dbui: "Not implemented", dubois: "Gap — DuBois has spinner" },
    },
  },
  {
    name: "Link",
    dbui: 'variant="link"',
    dubois: 'type="link"',
    status: "covered",
    previewVariant: "link",
    previewLabel: "Link",
    states: {
      default: { dbui: "text-primary + underline-offset. Same as shadcn", dubois: "Covered" },
      hover: { dbui: "Underline on hover", dubois: "Covered" },
      active: { dbui: "No active-specific style", dubois: "Partial" },
      focus: { dbui: "No focus ring (text-only)", dubois: "Partial — DuBois may show focus" },
      disabled: { dbui: "opacity-50", dubois: "Covered" },
      loading: { dbui: "Not implemented", dubois: "N/A — link buttons don't typically show spinners" },
    },
  },
  {
    name: "Destructive",
    dbui: 'variant="destructive"',
    dubois: 'type="primary" danger',
    status: "covered",
    previewVariant: "destructive",
    previewLabel: "Destructive",
    states: {
      default: { dbui: "bg-destructive (red600). Shadow-xs removed vs shadcn (added custom hover/active)", dubois: "Covered" },
      hover: { dbui: "bg-destructive-hover (red700). Explicit token added", dubois: "Covered" },
      active: { dbui: "bg-destructive-active (red800) + translate-y-px", dubois: "Covered" },
      focus: { dbui: "ring-destructive/20. Destructive-specific ring added (not in shadcn)", dubois: "Covered" },
      disabled: { dbui: "opacity-50", dubois: "Covered" },
      loading: { dbui: "Not implemented", dubois: "Gap — DuBois has spinner" },
    },
  },
  {
    name: "Destructive Outline",
    dbui: "Not yet implemented",
    dubois: 'type="default" danger',
    status: "gap",
    states: {
      default: { dbui: "Needs: red border + transparent bg", dubois: "Gap — DuBois has danger secondary" },
      hover: { dbui: "Needs: red border + red/8 bg", dubois: "Gap" },
      active: { dbui: "Needs: red/16 bg", dubois: "Gap" },
      focus: { dbui: "Needs: ring-destructive", dubois: "Gap" },
      disabled: { dbui: "Needs: opacity-50", dubois: "Gap" },
      loading: { dbui: "Not implemented", dubois: "Gap" },
    },
  },
]

const BUTTON_STATES: { key: ButtonState; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "hover", label: "Hover" },
  { key: "active", label: "Active" },
  { key: "focus", label: "Focus" },
  { key: "disabled", label: "Disabled" },
  { key: "loading", label: "Loading" },
]

type ButtonSizeKey = "sm" | "default"

const BUTTON_SIZES: { key: ButtonSizeKey; label: string }[] = [
  { key: "sm", label: "SM" },
  { key: "default", label: "MD" },
]

// Map DBUI sizes → closest shadcn size
const SHADCN_SIZE_MAP: Record<ButtonSizeKey, string> = {
  sm: "sm",
  default: "default",
}

// DBUI icon-only sizes: sm→icon-sm (28px square), default→icon (32px square)
const DBUI_ICON_SIZE_MAP: Record<ButtonSizeKey, "icon-sm" | "icon"> = {
  sm: "icon-sm",
  default: "icon",
}

// Shadcn size styles from registry: sm=h-8/px-3/text-xs, default=h-9/px-4/text-sm
const SHADCN_SIZE_STYLES: Record<string, React.CSSProperties> = {
  sm: { height: "32px", padding: "0 12px", fontSize: "12px", lineHeight: "16px", borderRadius: "calc(0.5rem - 2px)" },
  default: { height: "36px", padding: "0 16px", fontSize: "14px", lineHeight: "20px", borderRadius: "calc(0.5rem - 2px)" },
}

// Shadcn icon-only sizes from registry: icon=h-9/w-9
const SHADCN_ICON_SIZE_STYLES: Record<string, React.CSSProperties> = {
  sm: { height: "32px", width: "32px", padding: "0", borderRadius: "calc(0.5rem - 2px)" },
  default: { height: "36px", width: "36px", padding: "0", borderRadius: "calc(0.5rem - 2px)" },
}

// ─── Vanilla shadcn Button (exact registry source + zinc theme tokens) ───
// Source: https://ui.shadcn.com/r/styles/new-york/button.json
// Theme: https://ui.shadcn.com/r/themes/zinc.json (light mode, HSL→hex)

const SC = {
  primary: "#17171b", primaryFg: "#f9f9f9",
  secondary: "#f4f4f5", secondaryFg: "#17171b",
  destructive: "#ee4444", destructiveFg: "#f9f9f9",
  accent: "#f4f4f5", accentFg: "#17171b",
  input: "#e3e3e7", ring: "#08080a",
  bg: "#ffffff", fg: "#08080a",
}

// Exact vanilla shadcn variant classes translated to inline styles.
// Registry source: cva base = "rounded-md text-sm font-medium h-8 rounded-md px-3 text-xs" (sm size)
// Hover behaviors: default → bg-primary/90, destructive → bg-destructive/90, secondary → bg-secondary/80,
//                  outline → bg-accent + text-accent-foreground, ghost → bg-accent + text-accent-foreground
function shadcnButtonStyle(variant: string, state: ButtonState, size: string = "sm", iconOnly: boolean = false): React.CSSProperties {
  const sizeStyle = iconOnly
    ? (SHADCN_ICON_SIZE_STYLES[size] || SHADCN_ICON_SIZE_STYLES.sm)
    : (SHADCN_SIZE_STYLES[size] || SHADCN_SIZE_STYLES.sm)
  const base: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
    whiteSpace: "nowrap",
    fontWeight: 500, // font-medium
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    border: "1px solid transparent", outline: "none",
    transition: "color 0.15s, background-color 0.15s",
    cursor: "pointer",
    ...sizeStyle,
  }

  const shadow = "0 1px 2px 0 rgba(0,0,0,0.05)"
  const shadowSm = "0 1px 1px 0 rgba(0,0,0,0.05)"

  // Variant defaults — matching exact registry CVA classes
  const variants: Record<string, React.CSSProperties> = {
    default: { backgroundColor: SC.primary, color: SC.primaryFg, boxShadow: shadow },
    destructive: { backgroundColor: SC.destructive, color: SC.destructiveFg, boxShadow: shadowSm },
    outline: { backgroundColor: SC.bg, color: SC.fg, borderColor: SC.input, boxShadow: shadowSm },
    secondary: { backgroundColor: SC.secondary, color: SC.secondaryFg, boxShadow: shadowSm },
    ghost: { backgroundColor: "transparent", color: SC.fg, boxShadow: "none" },
    link: { backgroundColor: "transparent", color: SC.primary, boxShadow: "none", textUnderlineOffset: "4px" },
  }

  // State overrides — matching exact hover classes from registry
  const hoverMap: Record<string, React.CSSProperties> = {
    // hover:bg-primary/90
    default: { backgroundColor: `color-mix(in srgb, ${SC.primary} 90%, transparent)` },
    // hover:bg-destructive/90
    destructive: { backgroundColor: `color-mix(in srgb, ${SC.destructive} 90%, transparent)` },
    // hover:bg-accent hover:text-accent-foreground
    outline: { backgroundColor: SC.accent, color: SC.accentFg },
    // hover:bg-secondary/80
    secondary: { backgroundColor: `color-mix(in srgb, ${SC.secondary} 80%, transparent)` },
    // hover:bg-accent hover:text-accent-foreground
    ghost: { backgroundColor: SC.accent, color: SC.accentFg },
    // hover:underline
    link: { textDecoration: "underline" },
  }

  const focusStyle: React.CSSProperties = {
    outline: "none",
    boxShadow: `0 0 0 1px ${SC.ring}`,
  }

  let style = { ...base, ...variants[variant] }

  if (state === "hover") style = { ...style, ...hoverMap[variant] }
  if (state === "active") style = { ...style, ...hoverMap[variant] }
  if (state === "focus") style = { ...style, ...focusStyle }
  if (state === "disabled") style = { ...style, opacity: 0.5, pointerEvents: "none", cursor: "default" }
  if (state === "loading") style = { ...style, opacity: 0.7 }

  return style
}

function ShadcnButton({ variant = "default", label, state, size = "sm", iconOnly = false }: { variant?: string; label: string; state: ButtonState; size?: string; iconOnly?: boolean }) {
  return (
    <button style={shadcnButtonStyle(variant, state, size, iconOnly)} disabled={state === "disabled"}>
      {state === "loading" ? (
        <svg className="animate-spin" style={{ width: 14, height: 14 }} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ) : iconOnly ? (
        <svg style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      ) : null}
      {!iconOnly && label}
    </button>
  )
}

// ─── DBUI Force-state CSS ───

const FORCE_STATE_CSS = `
  /* Hover */
  .force-state-hover button[data-variant="default"] { background-color: var(--color-primary-hover) !important; }
  .force-state-hover button[data-variant="outline"] { background-color: var(--color-accent) !important; border-color: var(--color-primary-hover) !important; color: var(--color-accent-foreground) !important; }
  .force-state-hover button[data-variant="secondary"] { background-color: var(--color-accent) !important; color: var(--color-accent-foreground) !important; }
  .force-state-hover button[data-variant="ghost"] { background-color: var(--color-accent) !important; color: var(--color-accent-foreground) !important; }
  .force-state-hover button[data-variant="destructive"] { background-color: var(--color-destructive-hover) !important; }
  .force-state-hover button[data-variant="link"] { text-decoration: underline !important; }
  /* Active */
  .force-state-active button[data-variant] { transform: translateY(1px) !important; }
  .force-state-active button[data-variant="default"] { background-color: var(--color-primary-active) !important; }
  .force-state-active button[data-variant="destructive"] { background-color: var(--color-destructive-active) !important; }
  .force-state-active button[data-variant="outline"] { background-color: var(--color-accent) !important; border-color: var(--color-primary-hover) !important; }
  .force-state-active button[data-variant="secondary"] { background-color: var(--color-accent) !important; }
  .force-state-active button[data-variant="ghost"] { background-color: var(--color-accent) !important; }
  .force-state-active button[data-variant="link"] { text-decoration: underline !important; }
  /* Focus */
  .force-state-focus button[data-variant] { border-color: var(--color-ring) !important; box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-ring) 50%, transparent) !important; outline: none !important; }
  .force-state-focus button[data-variant="destructive"] { border-color: color-mix(in srgb, var(--color-destructive) 40%, transparent) !important; box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-destructive) 20%, transparent) !important; }
`

function StatePreviewButton({ variant, label, state, theme, size = "sm", iconOnly = false }: {
  variant?: Parameters<typeof Button>[0]["variant"]
  label: string
  state: ButtonState
  theme: "dbui" | "shadcn"
  size?: ButtonSizeKey
  iconOnly?: boolean
}) {
  if (theme === "shadcn") {
    return <ShadcnButton variant={variant || "default"} label={label} state={state} size={SHADCN_SIZE_MAP[size]} iconOnly={iconOnly} />
  }

  const stateClass = (state === "hover" || state === "active" || state === "focus") ? `force-state-${state}` : ""
  const dbuiSize = iconOnly ? DBUI_ICON_SIZE_MAP[size] : size
  return (
    <div className={stateClass}>
      <Button
        variant={variant}
        size={dbuiSize}
        disabled={state === "disabled"}
        style={state === "loading" ? { opacity: 0.7 } : undefined}
        data-variant={variant || "default"}
      >
        {state === "loading" ? (
          <Spinner className="size-3.5" />
        ) : iconOnly ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        ) : null}
        {!iconOnly && label}
      </Button>
    </div>
  )
}

// ─── Variant Mapping Bar (sits between Sections) ───

type VariantBarProps = {
  label: string
  variants: VariantRow[]
  states: number
  sizes: number
}

function VariantBar({ label, variants, states, sizes }: VariantBarProps) {
  const { t } = useTheme()
  const [open, setOpen] = useState(false)
  const [activeState, setActiveState] = useState<ButtonState>("default")
  const [activeSize, setActiveSize] = useState<ButtonSizeKey>("sm")
  const [iconOnly, setIconOnly] = useState(false)

  const total = states * sizes * variants.length
  const noteworthy = variants.filter((v) => v.status !== "covered")
  // Indicator dots: small colored circles for non-covered statuses
  const dotColors: Record<string, string> = {
    new: "#0369A1",
    tweaked: "#D97706",
    gap: "#DC2626",
    partial: "#D97706",
    deferred: "#9CA3AF",
  }

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
        <span
          className="text-[10px] transition-transform flex-shrink-0"
          style={{ color: t.textSubtle, transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          ▶
        </span>
        <span className="text-[13px]" style={{ fontFamily: MONO, color: t.text }}>{label}</span>
        <span
          className="text-[13px] font-semibold tabular-nums"
          style={{ fontFamily: MONO, color: t.primary }}
        >
          {total}
        </span>
        <span className="text-[12px]" style={{ color: t.textSubtle }}>
          {states} states × {sizes} sizes × {variants.length} variants
        </span>
        <span className="flex-1" />
        {/* Indicator dots for noteworthy items */}
        {!open && noteworthy.length > 0 && (
          <div className="flex items-center gap-1.5">
            {noteworthy.map((v) => (
              <span
                key={v.name}
                title={`${v.name}: ${v.status}`}
                className="inline-block size-2.5 rounded-full flex-shrink-0 cursor-default"
                style={{
                  backgroundColor: dotColors[v.status] || "#9CA3AF",
                  border: `1.5px solid ${t.bg}`,
                  boxShadow: `0 0 0 1px ${dotColors[v.status] || "#9CA3AF"}33`,
                }}
              />
            ))}
          </div>
        )}
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
          {/* Controls bar — size + state toggles */}
          <div
            className="flex items-center justify-between px-5 py-2"
            style={{ borderBottom: `1px solid ${t.border}`, backgroundColor: t.cardBg }}
          >
            {/* Size + Icon toggles */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[11px]" style={{ fontFamily: MONO, color: t.textSubtle }}>Size</span>
                <div className="flex gap-0.5">
                  {BUTTON_SIZES.map((s) => (
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
              <button
                onClick={() => setIconOnly(!iconOnly)}
                className="text-[11px] px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5"
                style={{
                  fontFamily: MONO,
                  color: iconOnly ? t.text : t.textSubtle,
                  backgroundColor: iconOnly ? t.hoverBg : "transparent",
                  border: iconOnly ? `1px solid ${t.border}` : `1px solid transparent`,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: iconOnly ? 1 : 0.5 }}>
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <path d="m6 9 6 6 6-6" />
                </svg>
                Icon only
              </button>
            </div>
            {/* State toggles */}
            <div className="flex items-center gap-2">
              <span className="text-[11px]" style={{ fontFamily: MONO, color: t.textSubtle }}>State</span>
              <div className="flex gap-0.5">
                {BUTTON_STATES.map((s) => (
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
          <style>{FORCE_STATE_CSS}</style>

          {/* 4-column table */}
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]" style={{ fontFamily: MONO }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${t.border}`, backgroundColor: t.bg }}>
                  <th className="text-left px-5 py-2.5 font-normal" style={{ color: t.textSubtle, width: "22%" }}>Variant</th>
                  <th className="text-center px-4 py-2.5 font-normal" style={{ color: t.textSubtle, width: "18%" }}>DBUI</th>
                  <th className="text-center px-4 py-2.5 font-normal" style={{ color: t.textSubtle, width: "18%" }}>shadcn</th>
                  <th className="text-left px-5 py-2.5 font-normal" style={{ color: t.textSubtle, width: "42%" }}>DuBois</th>
                </tr>
              </thead>
              <tbody>
                {variants.map((v, i) => {
                  const stateInfo = v.states[activeState]
                  return (
                    <tr
                      key={v.name}
                      style={{ borderBottom: i < variants.length - 1 ? `1px solid ${t.border}` : undefined }}
                    >
                      {/* VARIANT — name + props */}
                      <td className="px-5 py-4 align-middle">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px]" style={{ color: t.text }}>{v.name}</span>
                            {v.status !== "covered" && <StatusBadge type={v.status}>{v.status}</StatusBadge>}
                          </div>
                          <span className="text-[11px]" style={{ color: t.textSubtle }}>{v.dbui || "—"}</span>
                        </div>
                      </td>
                      {/* DBUI — visual only */}
                      <td className="px-4 py-4 align-middle">
                        <div className="flex justify-center">
                          {v.previewVariant !== undefined ? (
                            <StatePreviewButton variant={v.previewVariant} label={v.previewLabel || v.name} state={activeState} theme="dbui" size={activeSize} iconOnly={iconOnly} />
                          ) : (
                            <span className="text-[11px]" style={{ color: t.textSubtle }}>—</span>
                          )}
                        </div>
                      </td>
                      {/* SHADCN — visual only */}
                      <td className="px-4 py-4 align-middle">
                        <div className="flex justify-center">
                          {v.previewVariant !== undefined ? (
                            <StatePreviewButton variant={v.previewVariant} label={v.previewLabel || v.name} state={activeState} theme="shadcn" size={activeSize} iconOnly={iconOnly} />
                          ) : (
                            <span className="text-[11px]" style={{ color: t.textSubtle }}>—</span>
                          )}
                        </div>
                      </td>
                      {/* DUBOIS — variant name + commentary */}
                      <td className="px-5 py-4 align-middle">
                        <div className="flex flex-col gap-1">
                          <span className="text-[12px]" style={{ color: t.text }}>{v.dubois}</span>
                          <span className="text-[11px] leading-[1.5]" style={{ color: t.textMuted }}>{stateInfo.dubois}</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Code Block ───

function Code({ children }: { children: string }) {
  const { t } = useTheme()
  return (
    <pre
      className="text-[12px] leading-[1.6] p-4 rounded-lg overflow-x-auto"
      style={{ backgroundColor: t.cardBg, border: `1px solid ${t.border}`, fontFamily: MONO, color: t.textMuted }}
    >
      <code>{children.trim()}</code>
    </pre>
  )
}

// ─── Component Section ───

const DUBOIS_STORYBOOK = "https://ui-infra.dev.databricks.com/storybook/js/packages/du-bois/index.html"
const DUBOIS_IFRAME = "https://ui-infra.dev.databricks.com/storybook/js/packages/du-bois/iframe.html"

type TabKey = "dbui" | "code" | "dubois" | "figma"

function Section({
  id,
  title,
  description,
  code,
  figmaStatus,
  duboisStoryId,
  hasVariantBar,
  children,
}: {
  id: string
  title: string
  description: string
  code: string
  figmaStatus?: "ready" | "planned" | "none"
  duboisStoryId?: string
  hasVariantBar?: boolean
  children: React.ReactNode
}) {
  const { t } = useTheme()
  const [tab, setTab] = useState<TabKey>("dbui")
  const isLocal = typeof window !== "undefined" && window.location.hostname === "localhost"
  const status = figmaStatus || "planned"
  const statusColor = status === "ready" ? t.success : status === "planned" ? t.primary : t.textSubtle
  const statusLabel = status === "ready" ? "Figma ready" : status === "planned" ? "Figma planned" : "Code only"

  const allTabs: { key: TabKey; label: string; localOnly?: boolean }[] = [
    { key: "dbui", label: "DBUI" },
    { key: "code", label: "Code" },
    { key: "dubois", label: "DuBois", localOnly: true },
    { key: "figma", label: "Figma" },
  ]
  const tabs = allTabs.filter((t) => !t.localOnly || isLocal)

  return (
    <section id={id} className="scroll-mt-20">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-[22px] leading-[1.2] mb-1" style={{ fontFamily: SERIF }}>
            <em className="font-normal">{title}</em>
          </h2>
          <p className="text-[13px]" style={{ color: t.textMuted }}>{description}</p>
        </div>
        <span
          className="text-[11px] px-2 py-0.5 rounded-full flex-shrink-0 mt-1"
          style={{ fontFamily: MONO, color: statusColor, border: `1px solid ${statusColor}33`, backgroundColor: `${statusColor}0D` }}
        >
          {statusLabel}
        </span>
      </div>

      <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${t.border}`, borderBottomLeftRadius: hasVariantBar ? 0 : undefined, borderBottomRightRadius: hasVariantBar ? 0 : undefined, borderBottom: hasVariantBar ? "none" : undefined }}>
        {/* Tab bar */}
        <div className="flex items-center gap-0 px-4" style={{ backgroundColor: t.cardBg, borderBottom: `1px solid ${t.border}` }}>
          {tabs.map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className="text-[12px] px-3 py-2.5 relative transition-colors"
              style={{
                fontFamily: MONO,
                color: tab === item.key ? t.text : t.textSubtle,
              }}
            >
              {item.label}
              {tab === item.key && (
                <span
                  className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                  style={{ backgroundColor: t.primary }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "dbui" && (
          <div className="p-6 min-h-[120px] flex flex-col gap-4 items-start justify-center">
            {children}
          </div>
        )}
        {tab === "code" && (
          <div className="p-4">
            <pre
              className="text-[12px] leading-[1.6] overflow-x-auto"
              style={{ fontFamily: MONO, color: t.textMuted }}
            >
              <code>{code.trim()}</code>
            </pre>
          </div>
        )}
        {tab === "dubois" && (
          duboisStoryId ? (
            <div className="w-full">
              <iframe
                src={`${DUBOIS_STORYBOOK}?path=/story/${duboisStoryId}&nav=0&panel=0&toolbar=0`}
                className="w-full border-0"
                style={{ height: "400px", background: "#fff" }}
                title={`DuBois ${title}`}
              />
              <div className="flex items-center justify-between px-4 py-2" style={{ borderTop: `1px solid ${t.border}` }}>
                <span className="text-[11px]" style={{ fontFamily: MONO, color: t.textSubtle }}>
                  DuBois Storybook · localhost only
                </span>
                <a
                  href={`${DUBOIS_STORYBOOK}?path=/story/${duboisStoryId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px]"
                  style={{ fontFamily: MONO, color: t.primary }}
                >
                  Open in Storybook →
                </a>
              </div>
            </div>
          ) : (
            <div className="p-6 min-h-[120px] flex items-center justify-center">
              <p className="text-[13px]" style={{ fontFamily: MONO, color: t.textSubtle }}>
                No DuBois equivalent mapped
              </p>
            </div>
          )
        )}
        {tab === "figma" && (
          <div className="p-6 min-h-[120px] flex items-center justify-center">
            <p className="text-[13px]" style={{ fontFamily: MONO, color: t.textSubtle }}>
              Figma embed coming soon
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Nav (table of contents) ───

const COMPONENTS = [
  { id: "button", label: "Button" },
  { id: "input", label: "Input" },
  { id: "textarea", label: "Textarea" },
  { id: "select", label: "Select" },
  { id: "dropdown", label: "Dropdown Menu" },
  { id: "checkbox", label: "Checkbox" },
  { id: "radio", label: "Radio Group" },
  { id: "switch", label: "Switch" },
  { id: "toggle", label: "Toggle" },
  { id: "badge", label: "Badge" },
  { id: "alert", label: "Alert" },
  { id: "tabs", label: "Tabs" },
  { id: "card", label: "Card" },
  { id: "tooltip", label: "Tooltip" },
  { id: "slider", label: "Slider" },
  { id: "progress", label: "Progress" },
  { id: "skeleton", label: "Skeleton" },
  { id: "separator", label: "Separator" },
  { id: "dialog", label: "Dialog" },
  { id: "sheet", label: "Sheet" },
  { id: "accordion", label: "Accordion" },
  { id: "popover", label: "Popover" },
  { id: "hover-card", label: "Hover Card" },
  { id: "toggle-group", label: "Toggle Group" },
  { id: "avatar", label: "Avatar" },
  { id: "table", label: "Table" },
  { id: "pagination", label: "Pagination" },
  { id: "breadcrumb", label: "Breadcrumb" },
  { id: "input-otp", label: "Input OTP" },
  { id: "spinner", label: "Spinner" },
]

// ─── Page ───

export default function ComponentsPage() {
  const { t } = useTheme()
  const [progress] = useState(62)

  return (
    <TooltipProvider>
      <div>
        {/* Header */}
        <section className="pt-24 pb-16 px-8" style={{ borderBottom: `1px solid ${t.border}` }}>
          <div className="max-w-[1100px] mx-auto">
            <p className="text-[11px] tracking-[0.2em] uppercase mb-4" style={{ fontFamily: MONO, color: t.textSubtle }}>
              Component Reference
            </p>
            <h1 className="text-[42px] leading-[1.05] tracking-[-0.01em] mb-6" style={{ fontFamily: SERIF }}>
              <em className="font-normal">Components</em>
            </h1>
            <p className="text-[19px] max-w-[560px] leading-[1.5]" style={{ fontFamily: SERIF, color: t.textMuted }}>
              Every shadcn component, dressed in DuBois tokens.
              Live preview on the left, usage code on the right.
            </p>
          </div>
        </section>

        {/* Body */}
        <section className="py-16 px-8">
          <div className="max-w-[1100px] mx-auto flex gap-16">
            {/* Sidebar TOC */}
            <nav className="hidden lg:block w-[160px] flex-shrink-0 sticky top-20 self-start">
              <p className="text-[11px] tracking-[0.15em] uppercase mb-4" style={{ fontFamily: MONO, color: t.textSubtle }}>
                Components
              </p>
              <div className="flex flex-col gap-1.5">
                {COMPONENTS.map((c) => (
                  <a
                    key={c.id}
                    href={`#${c.id}`}
                    className="text-[13px] transition-colors hover:underline"
                    style={{ fontFamily: MONO, color: t.textMuted }}
                  >
                    {c.label}
                  </a>
                ))}
              </div>
            </nav>

            {/* Component sections */}
            <div className="flex-1 min-w-0 flex flex-col gap-16">

              {/* ─── Button ─── */}
              <div>
              <Section
                id="button"
                title="Button"
                duboisStoryId="primitives-button-stories--default"
                description="6 variants × 8 sizes. Primary is DuBois blue600."
                hasVariantBar
                code={`<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>

{/* Sizes */}
<Button size="xs">XS</Button>
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>`}
              >
                <div className="flex flex-wrap gap-2">
                  <Button>Default</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link</Button>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="xs">XS</Button>
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </Section>

              <VariantBar label="Variant Mapping" variants={BUTTON_VARIANTS} states={6} sizes={2} />
              </div>

              {/* ─── Input ─── */}
              <Section
                id="input"
                title="Input"
                duboisStoryId="primitives-input-stories--default"
                description="Text input with DuBois border tokens. --input for borders, --ring for focus."
                code={`<Input placeholder="Email address" />
<Input type="password" placeholder="Password" />
<Input disabled placeholder="Disabled" />`}
              >
                <div className="flex flex-col gap-3 w-full max-w-[300px]">
                  <Input placeholder="Email address" />
                  <Input type="password" placeholder="Password" />
                  <Input disabled placeholder="Disabled" />
                </div>
              </Section>

              {/* ─── Textarea ─── */}
              <Section
                id="textarea"
                title="Textarea"
                duboisStoryId="primitives-input-stories--textarea"
                description="Multi-line input. Same border tokens as Input."
                code={`<Textarea placeholder="Type your message..." />`}
              >
                <Textarea placeholder="Type your message..." className="max-w-[300px]" />
              </Section>

              {/* ─── Select ─── */}
              <Section
                id="select"
                title="Select"
                duboisStoryId="primitives-select-stories--default"
                description="Dropdown select with 2 sizes. Uses --popover for dropdown surface."
                code={`<Select>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="cherry">Cherry</SelectItem>
  </SelectContent>
</Select>`}
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

              {/* ─── Dropdown Menu ─── */}
              <Section
                id="dropdown"
                title="Dropdown Menu"
                duboisStoryId="primitives-dropdownmenu-stories--default"
                description="Context menu with items, separators, labels, and checkbox items. Supports destructive variant."
                code={`<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">
      Delete account
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
              >
                <div className="flex gap-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="outline" />}>
                      Open Menu
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>Show sidebar</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>Show statusbar</DropdownMenuCheckboxItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">Delete account</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Section>

              {/* ─── Checkbox ─── */}
              <Section
                id="checkbox"
                title="Checkbox"
                duboisStoryId="primitives-checkbox-stories--default"
                description="Uses --primary for checked state."
                code={`<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms</Label>
</div>`}
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

              {/* ─── Radio Group ─── */}
              <Section
                id="radio"
                title="Radio Group"
                duboisStoryId="primitives-radio-stories--default"
                description="Uses --primary for selected indicator."
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

              {/* ─── Switch ─── */}
              <Section
                id="switch"
                title="Switch"
                duboisStoryId="primitives-switch-stories--default"
                description="2 sizes. Uses --primary for on state."
                code={`<Switch />
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

              {/* ─── Toggle ─── */}
              <Section
                id="toggle"
                title="Toggle"
                duboisStoryId="primitives-segmentedcontrol-stories--default"
                description="2 variants × 3 sizes."
                code={`<Toggle>Default</Toggle>
<Toggle variant="outline">Outline</Toggle>
<Toggle size="sm">Small</Toggle>
<Toggle size="lg">Large</Toggle>`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Toggle defaultPressed>Default</Toggle>
                  <Toggle variant="outline">Outline</Toggle>
                  <Toggle size="sm">Sm</Toggle>
                  <Toggle size="lg">Lg</Toggle>
                </div>
              </Section>

              {/* ─── Badge ─── */}
              <Section
                id="badge"
                title="Badge"
                duboisStoryId="primitives-tag-stories--default"
                description="6 variants. Primary uses DuBois blue."
                code={`<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="ghost">Ghost</Badge>`}
              >
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="ghost">Ghost</Badge>
                </div>
              </Section>

              {/* ─── Alert ─── */}
              <Section
                id="alert"
                title="Alert"
                duboisStoryId="primitives-notification-stories--default"
                description="2 variants: default and destructive."
                code={`<Alert>
  <AlertTitle>Note</AlertTitle>
  <AlertDescription>
    This is a default alert.
  </AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Something went wrong.
  </AlertDescription>
</Alert>`}
              >
                <div className="flex flex-col gap-3 w-full">
                  <Alert>
                    <AlertTitle>Note</AlertTitle>
                    <AlertDescription>This is a default alert with DuBois border tokens.</AlertDescription>
                  </Alert>
                  <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>Something went wrong. Uses --destructive.</AlertDescription>
                  </Alert>
                </div>
              </Section>

              {/* ─── Tabs ─── */}
              <Section
                id="tabs"
                title="Tabs"
                duboisStoryId="primitives-tabs-stories--default"
                description="2 list variants: default (pill) and line."
                code={`<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Account</TabsTrigger>
    <TabsTrigger value="tab2">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">...</TabsContent>
  <TabsContent value="tab2">...</TabsContent>
</Tabs>

{/* Line variant */}
<TabsList variant="line">...</TabsList>`}
              >
                <div className="flex flex-col gap-6 w-full">
                  <Tabs defaultValue="tab1">
                    <TabsList>
                      <TabsTrigger value="tab1">Account</TabsTrigger>
                      <TabsTrigger value="tab2">Password</TabsTrigger>
                      <TabsTrigger value="tab3">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">
                      <p className="text-[13px] pt-3" style={{ color: t.textMuted }}>Account settings content.</p>
                    </TabsContent>
                    <TabsContent value="tab2">
                      <p className="text-[13px] pt-3" style={{ color: t.textMuted }}>Password settings content.</p>
                    </TabsContent>
                  </Tabs>
                  <Tabs defaultValue="t1">
                    <TabsList variant="line">
                      <TabsTrigger value="t1">Overview</TabsTrigger>
                      <TabsTrigger value="t2">Analytics</TabsTrigger>
                      <TabsTrigger value="t3">Reports</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </Section>

              {/* ─── Card ─── */}
              <Section
                id="card"
                title="Card"
                duboisStoryId="primitives-card-stories--default"
                description="Container with header, content, footer. 2 sizes."
                code={`<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content here.</p>
  </CardContent>
  <CardFooter>
    <Button>Save</Button>
  </CardFooter>
</Card>`}
              >
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Cluster Configuration</CardTitle>
                    <CardDescription>Set up your compute resources.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      <Label>Cluster name</Label>
                      <Input placeholder="my-cluster" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Create</Button>
                  </CardFooter>
                </Card>
              </Section>

              {/* ─── Tooltip ─── */}
              <Section
                id="tooltip"
                title="Tooltip"
                duboisStoryId="primitives-tooltip-stories--default"
                description="Hover to see tooltip. Uses --popover tokens."
                code={`<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">Hover me</Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>Tooltip content</p>
  </TooltipContent>
</Tooltip>`}
              >
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant="outline">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is a tooltip</p>
                  </TooltipContent>
                </Tooltip>
              </Section>

              {/* ─── Slider ─── */}
              <Section
                id="slider"
                title="Slider"
                duboisStoryId="primitives-slider-stories--default"
                description="Range input. Track uses --primary."
                code={`<Slider defaultValue={[50]} max={100} step={1} />`}
              >
                <div className="w-full max-w-[300px]">
                  <Slider defaultValue={[50]} max={100} step={1} />
                </div>
              </Section>

              {/* ─── Progress ─── */}
              <Section
                id="progress"
                title="Progress"
                duboisStoryId="primitives-progress-stories--default"
                description="Determinate progress bar. Fill uses --primary."
                code={`<Progress value={62} />`}
              >
                <div className="w-full max-w-[300px]">
                  <Progress value={progress} />
                </div>
              </Section>

              {/* ─── Skeleton ─── */}
              <Section
                id="skeleton"
                title="Skeleton"
                duboisStoryId="primitives-skeleton-stories--default"
                description="Loading placeholder. Uses --skeleton token."
                code={`<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-4 w-[200px]" />
<Skeleton className="h-10 w-10 rounded-full" />`}
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[160px]" />
                  </div>
                </div>
              </Section>

              {/* ─── Separator ─── */}
              <Section
                id="separator"
                title="Separator"
                description="Horizontal or vertical divider. Uses --border."
                code={`<Separator />
<Separator orientation="vertical" />`}
              >
                <div className="w-full flex flex-col gap-4">
                  <div>
                    <p className="text-[13px] mb-2">Horizontal</p>
                    <Separator />
                  </div>
                  <div className="flex items-center gap-4 h-8">
                    <span className="text-[13px]">Left</span>
                    <Separator orientation="vertical" />
                    <span className="text-[13px]">Right</span>
                  </div>
                </div>
              </Section>

              {/* ─── Dialog ─── */}
              <Section
                id="dialog"
                title="Dialog"
                duboisStoryId="primitives-dialogcombobox-stories--default"
                description="Modal dialog with header, content, footer. Uses --popover surface."
                code={`<Dialog>
  <DialogTrigger>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
              >
                <Dialog>
                  <DialogTrigger render={<Button variant="outline" />}>
                    Open Dialog
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure?</DialogTitle>
                      <DialogDescription>This action cannot be undone. This will permanently delete your cluster.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </Section>

              {/* ─── Sheet ─── */}
              <Section
                id="sheet"
                title="Sheet"
                description="Slide-out panel from the edge. Uses --background surface."
                code={`<Sheet>
  <SheetTrigger>
    <Button variant="outline">Open Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Settings</SheetTitle>
      <SheetDescription>Configure your preferences.</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`}
              >
                <Sheet>
                  <SheetTrigger render={<Button variant="outline" />}>
                    Open Sheet
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Settings</SheetTitle>
                      <SheetDescription>Configure your cluster preferences here.</SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-col gap-3 mt-4">
                      <Label>Cluster name</Label>
                      <Input placeholder="my-cluster" />
                    </div>
                  </SheetContent>
                </Sheet>
              </Section>

              {/* ─── Accordion ─── */}
              <Section
                id="accordion"
                title="Accordion"
                duboisStoryId="primitives-accordion-stories--default"
                description="Collapsible content sections. Uses --border for dividers."
                code={`<Accordion>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It follows WAI-ARIA patterns.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
              >
                <Accordion className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is DBUI?</AccordionTrigger>
                    <AccordionContent>DBUI is the DuBois design language on shadcn components.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How does token mapping work?</AccordionTrigger>
                    <AccordionContent>Every DuBois token is mapped to a shadcn CSS variable in globals.css.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Can I use this with LLMs?</AccordionTrigger>
                    <AccordionContent>Yes — the registry is designed so LLMs can produce pixel-perfect Databricks UI.</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Section>

              {/* ─── Popover ─── */}
              <Section
                id="popover"
                title="Popover"
                duboisStoryId="primitives-popover-stories--default"
                description="Floating content panel triggered by a button."
                code={`<Popover>
  <PopoverTrigger>
    <Button variant="outline">Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>Popover content here.</p>
  </PopoverContent>
</Popover>`}
              >
                <Popover>
                  <PopoverTrigger render={<Button variant="outline" />}>
                    Open Popover
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="flex flex-col gap-2">
                      <Label>Width</Label>
                      <Input placeholder="100%" />
                    </div>
                  </PopoverContent>
                </Popover>
              </Section>

              {/* ─── Hover Card ─── */}
              <Section
                id="hover-card"
                title="Hover Card"
                description="Card that appears on hover. Uses --popover surface."
                code={`<HoverCard>
  <HoverCardTrigger>Hover me</HoverCardTrigger>
  <HoverCardContent>
    <p>Card content on hover.</p>
  </HoverCardContent>
</HoverCard>`}
              >
                <HoverCard>
                  <HoverCardTrigger className="text-[13px] underline cursor-pointer" style={{ color: t.primary, fontFamily: MONO }}>
                    Hover over this link
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarFallback>DB</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-[13px] font-semibold">Databricks</p>
                        <p className="text-[12px]" style={{ color: t.textMuted }}>The data and AI company.</p>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </Section>

              {/* ─── Toggle Group ─── */}
              <Section
                id="toggle-group"
                title="Toggle Group"
                duboisStoryId="primitives-segmentedcontrol-stories--default"
                description="A set of toggles where one or multiple can be selected."
                code={`<ToggleGroup>
  <ToggleGroupItem value="a">Left</ToggleGroupItem>
  <ToggleGroupItem value="b">Center</ToggleGroupItem>
  <ToggleGroupItem value="c">Right</ToggleGroupItem>
</ToggleGroup>`}
              >
                <div className="flex flex-col gap-4">
                  <ToggleGroup>
                    <ToggleGroupItem value="a">Left</ToggleGroupItem>
                    <ToggleGroupItem value="b">Center</ToggleGroupItem>
                    <ToggleGroupItem value="c">Right</ToggleGroupItem>
                  </ToggleGroup>
                  <ToggleGroup variant="outline">
                    <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
                    <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
                    <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </Section>

              {/* ─── Avatar ─── */}
              <Section
                id="avatar"
                title="Avatar"
                duboisStoryId="primitives-avatar-stories--default"
                description="User avatar with image and fallback."
                code={`<Avatar>
  <AvatarImage src="..." alt="User" />
  <AvatarFallback>MM</AvatarFallback>
</Avatar>`}
              >
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarFallback>MM</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>DB</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                </div>
              </Section>

              {/* ─── Table ─── */}
              <Section
                id="table"
                title="Table"
                duboisStoryId="primitives-table-stories--default"
                description="Data table with header, rows, and cells."
                code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>my-cluster</TableCell>
      <TableCell>Running</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
              >
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cluster</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Runtime</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>prod-etl</TableCell>
                      <TableCell><Badge>Running</Badge></TableCell>
                      <TableCell>15.4 LTS</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>dev-notebook</TableCell>
                      <TableCell><Badge variant="secondary">Terminated</Badge></TableCell>
                      <TableCell>14.3 LTS</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ml-training</TableCell>
                      <TableCell><Badge variant="destructive">Error</Badge></TableCell>
                      <TableCell>15.4 ML</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Section>

              {/* ─── Pagination ─── */}
              <Section
                id="pagination"
                title="Pagination"
                duboisStoryId="primitives-pagination-stories--default"
                description="Page navigation controls."
                code={`<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`}
              >
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </Section>

              {/* ─── Breadcrumb ─── */}
              <Section
                id="breadcrumb"
                title="Breadcrumb"
                duboisStoryId="primitives-breadcrumb-stories--default"
                description="Navigation breadcrumb trail."
                code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
              >
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Workspace</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Clusters</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>prod-etl</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </Section>

              {/* ─── Input OTP ─── */}
              <Section
                id="input-otp"
                title="Input OTP"
                description="One-time password input with individual character slots."
                code={`<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`}
              >
                <InputOTP maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </Section>

              {/* ─── Spinner ─── */}
              <Section
                id="spinner"
                title="Spinner"
                duboisStoryId="primitives-spinner-stories--default"
                description="Loading indicator."
                code={`<Spinner />`}
              >
                <Spinner />
              </Section>

            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-8" style={{ borderTop: `1px solid ${t.border}` }}>
          <div className="max-w-[1100px] mx-auto flex justify-between items-end">
            <div>
              <span className="text-[14px] tracking-wider" style={{ fontFamily: MONO, color: t.textSubtle }}>DBUI</span>
              <p className="text-[14px] mt-1" style={{ color: t.textSubtle, opacity: 0.5 }}>
                DuBois design language on shadcn components.
              </p>
            </div>
            <p className="text-[11px]" style={{ fontFamily: MONO, color: t.textSubtle, opacity: 0.4 }}>
              Design · Databricks · 2026
            </p>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  )
}
