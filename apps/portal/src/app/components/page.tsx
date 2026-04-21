"use client"

import { useState } from "react"
import { useTheme } from "@/components/theme-provider"
import { SyntaxHighlightedCode } from "@/components/syntax-highlighted-code"
import { Button } from "dbui/components/ui/button"
import { Input } from "dbui/components/ui/input"
import { Checkbox } from "dbui/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "dbui/components/ui/radio-group"
import { Switch } from "dbui/components/ui/switch"
import { Toggle } from "dbui/components/ui/toggle"
import { Label } from "dbui/components/ui/label"
import { Textarea } from "dbui/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "dbui/components/ui/select"
import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxEmpty, ComboboxChips, ComboboxChip, ComboboxChipsInput } from "dbui/components/ui/combobox"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "dbui/components/ui/tooltip"
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription } from "dbui/components/ui/popover"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "dbui/components/ui/hover-card"
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "dbui/components/ui/drawer"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuCheckboxItem } from "dbui/components/ui/dropdown-menu"
import { SplitButton, SplitButtonSeparator } from "dbui/components/ui/split-button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "dbui/components/ui/dialog"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "dbui/components/ui/alert-dialog"
import { Alert, AlertIcon, AlertContent, AlertTitle, AlertDescription, AlertAction, AlertClose } from "dbui/components/ui/alert"
import { Toaster } from "dbui/components/ui/sonner"
import { SegmentControl, SegmentControlItem } from "dbui/components/ui/segment-control"
import { Tabs as TabsComponent, TabsList, TabsTrigger, TabsContent } from "dbui/components/ui/tabs"
import { Slider } from "dbui/components/ui/slider"
import { RadioTileGroup, RadioTile, RadioTileHeader, RadioTileTitle, RadioTileDescription } from "dbui/components/ui/radio-tile"
import { toast } from "sonner"
import { Spinner } from "dbui/components/ui/spinner"
import { ChevronRight, Plus } from "lucide-react"

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

type ButtonState = "default" | "hover" | "press" | "focus" | "disabled" | "loading"

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
      default: { dbui: "bg-primary + shadow-xs", dubois: "Covered" },
      hover: { dbui: "bg-primary-hover", dubois: "Covered" },
      press: { dbui: "bg-primary-press", dubois: "Covered" },
      focus: { dbui: "2px ring INSIDE + shadow-focus (white gap + blue ring)", dubois: "Covered" },
      disabled: { dbui: "bg-disabled, text-white, no shadow", dubois: "Covered" },
      loading: { dbui: "Label opacity=0, Loading icon centered. Button keeps dimensions.", dubois: "Covered" },
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
      default: { dbui: "border-input, transparent bg, shadow-xs", dubois: "Covered" },
      hover: { dbui: "bg-hover (primary@8%), border-primary, text-primary-hover", dubois: "Covered" },
      press: { dbui: "bg-press (primary@16%), border-primary-press, text-primary-press", dubois: "Covered" },
      focus: { dbui: "2px ring INSIDE, shadow-xs", dubois: "Covered" },
      disabled: { dbui: "border-disabled, text-disabled-foreground, no shadow", dubois: "Covered" },
      loading: { dbui: "Label opacity=0, Loading icon centered", dubois: "Covered" },
    },
  },
  {
    name: "Secondary",
    dbui: 'variant="secondary"',
    dubois: 'type="tertiary"',
    status: "covered",
    previewVariant: "secondary",
    previewLabel: "Secondary",
    states: {
      default: { dbui: "bg-secondary, shadow-xs", dubois: "Covered" },
      hover: { dbui: "bg-hover (primary@8%), text-accent-foreground", dubois: "Covered" },
      press: { dbui: "bg-press (primary@16%), text-primary-press", dubois: "Covered" },
      focus: { dbui: "bg-secondary + 2px ring INSIDE", dubois: "Covered" },
      disabled: { dbui: "No fill, text-disabled-foreground, no shadow", dubois: "Covered" },
      loading: { dbui: "bg-secondary, Loading icon centered", dubois: "Covered" },
    },
  },
  {
    name: "Ghost",
    dbui: 'variant="ghost"',
    dubois: "—",
    status: "new",
    previewVariant: "ghost",
    previewLabel: "Ghost",
    states: {
      default: { dbui: "Transparent, text-foreground (grey)", dubois: "N/A" },
      hover: { dbui: "bg-hover (primary@8%), text-primary-hover", dubois: "N/A" },
      press: { dbui: "bg-press (primary@16%), text-primary-press", dubois: "N/A" },
      focus: { dbui: "2px ring INSIDE", dubois: "N/A" },
      disabled: { dbui: "text-disabled-foreground", dubois: "N/A" },
      loading: { dbui: "Loading icon centered", dubois: "N/A" },
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
      default: { dbui: "text-primary, no padding/radius/height/shadow", dubois: "Covered" },
      hover: { dbui: "Underline + text-primary-hover", dubois: "Covered" },
      press: { dbui: "Underline + text-primary-press", dubois: "Covered" },
      focus: { dbui: "1px ring OUTSIDE", dubois: "Covered" },
      disabled: { dbui: "text-disabled-foreground", dubois: "Covered" },
      loading: { dbui: "No loading state for Link", dubois: "N/A" },
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
      default: { dbui: "bg-destructive + shadow-xs", dubois: "Covered" },
      hover: { dbui: "bg-destructive-hover", dubois: "Covered" },
      press: { dbui: "bg-destructive-press", dubois: "Covered" },
      focus: { dbui: "shadow-focus (white gap + red ring)", dubois: "Covered" },
      disabled: { dbui: "bg-disabled, text-white, no shadow", dubois: "Covered" },
      loading: { dbui: "Label opacity=0, Loading icon centered", dubois: "Covered" },
    },
  },
  {
    name: "Danger",
    dbui: 'variant="danger"',
    dubois: 'type="default" danger',
    status: "covered",
    previewVariant: "danger",
    previewLabel: "Danger",
    states: {
      default: { dbui: "border-destructive, text-destructive + shadow-xs", dubois: "Covered" },
      hover: { dbui: "bg-destructive/10, border/text-destructive-hover", dubois: "Covered" },
      press: { dbui: "bg-destructive/20, border/text-destructive-press", dubois: "Covered" },
      focus: { dbui: "border-2 border-ring (blue focus ring)", dubois: "Covered" },
      disabled: { dbui: "border-disabled, text-disabled-foreground", dubois: "Covered" },
      loading: { dbui: "Same as default + spinner", dubois: "Covered" },
    },
  },
]

const BUTTON_STATES: { key: ButtonState; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "hover", label: "Hover" },
  { key: "press", label: "Press" },
  { key: "focus", label: "Focus" },
  { key: "disabled", label: "Disabled" },
  { key: "loading", label: "Loading" },
]

type ButtonSizeKey = "sm" | "md"

const BUTTON_SIZES: { key: ButtonSizeKey; label: string }[] = [
  { key: "md", label: "Default" },
  { key: "sm", label: "Small" },
]

// Map DBUI sizes → closest shadcn size
const SHADCN_SIZE_MAP: Record<ButtonSizeKey, string> = {
  sm: "sm",
  md: "default",
}

// DBUI icon-only sizes: sm→icon-sm (28px square), default→icon (32px square)
const DBUI_ICON_SIZE_MAP: Record<ButtonSizeKey, "icon-sm" | "icon-md"> = {
  sm: "icon-sm",
  md: "icon-md",
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

// ─── Form Control Variant Bar Types ───

type FormState = "default" | "hover" | "focus" | "disabled" | "error"

const FORM_STATES: { key: FormState; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "hover", label: "Hover" },
  { key: "focus", label: "Focus" },
  { key: "disabled", label: "Disabled" },
  { key: "error", label: "Danger" },
]

const SELECTION_STATES: { key: FormState; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "hover", label: "Hover" },
  { key: "focus", label: "Focus" },
  { key: "disabled", label: "Disabled" },
]

type FormSizeKey = "sm" | "default"

const FORM_SIZES: { key: FormSizeKey; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "sm", label: "Small" },
]

type ToggleState = "default" | "hover" | "press" | "focus" | "disabled"

const TOGGLE_STATES: { key: ToggleState; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "hover", label: "Hover" },
  { key: "press", label: "Press" },
  { key: "disabled", label: "Disabled" },
]

type ToggleSizeKey = "sm" | "md"

const TOGGLE_SIZES: { key: ToggleSizeKey; label: string }[] = [
  { key: "md", label: "Default" },
  { key: "sm", label: "Small" },
]

// ─── Form Control Variant Data ───

// ─── Form Control Variant Data (matches Code Connect enums) ───

// Input.figma.js: Content enum = Placeholder | Value. Size enum = Default | Small.
// State enum = Default | Hover | Press | Focus | Disabled | Danger
const INPUT_VARIANTS: FormVariantRow[] = [
  { name: "Placeholder", dbui: 'Content="Placeholder"', dubois: "Input", status: "covered" },
  { name: "Value", dbui: 'Content="Value"', dubois: "Input (filled)", status: "covered" },
]

// Textarea.figma.js: No variant/size enums. State = Default | Hover | Press | Focus | Disabled | Danger
const TEXTAREA_VARIANTS: FormVariantRow[] = [
  { name: "Placeholder", dbui: "placeholder text", dubois: "Input (textarea)", status: "covered" },
  { name: "Value", dbui: "filled value", dubois: "Input (textarea, filled)", status: "covered" },
]

// Select.figma.js: Size enum = Default | Small. State = Default | Hover | Press | Focus | Disabled | Danger
const SELECT_VARIANTS: FormVariantRow[] = [
  { name: "Placeholder", dbui: "placeholder shown", dubois: "Select (DialogCombobox)", status: "covered" },
  { name: "Value", dbui: "value selected", dubois: "Select (filled)", status: "covered" },
]

// Combobox.figma.js: Size enum = Default | Small. State = Default | Hover | Press | Focus | Disabled | Danger
const COMBOBOX_VARIANTS: FormVariantRow[] = [
  { name: "Placeholder", dbui: "empty input", dubois: "DialogCombobox", status: "covered" },
  { name: "Value", dbui: "selected value", dubois: "DialogCombobox (filled)", status: "covered" },
]

// Checkbox.figma.js: Checked enum = Unchecked | Checked | Indeterminate. State = Default | Hover | Press | Focus | Disabled
const CHECKBOX_VARIANTS: FormVariantRow[] = [
  { name: "Unchecked", dbui: "defaultChecked={false}", dubois: "Checkbox", status: "covered" },
  { name: "Checked", dbui: "defaultChecked={true}", dubois: "Checkbox checked", status: "covered" },
  { name: "Indeterminate", dbui: 'checked="indeterminate"', dubois: "Checkbox indeterminate", status: "covered" },
]

// Radio.figma.js: Selected enum = false | true. State = Default | Hover | Press | Focus | Disabled
const RADIO_VARIANTS: FormVariantRow[] = [
  { name: "Unselected", dbui: "Selected=false", dubois: "Radio", status: "covered" },
  { name: "Selected", dbui: "Selected=true", dubois: "Radio selected", status: "covered" },
]

// Switch.figma.js: On enum = false | true. State = Default | Hover | Press | Focus | Disabled
const SWITCH_VARIANTS: FormVariantRow[] = [
  { name: "Off", dbui: "On=false", dubois: "Switch", status: "covered" },
  { name: "On", dbui: "On=true", dubois: "Switch checked", status: "covered" },
]

// ToggleButton.figma.js: Variant = Default | Outline. Size = Default | Small.
// State = Default | Hover | Press | Selected | Disabled
const TOGGLE_VARIANTS_DATA: FormVariantRow[] = [
  { name: "Default", dbui: 'variant="default"', dubois: "ToggleButton", status: "covered" },
  { name: "Outline", dbui: 'variant="outline"', dubois: "—", status: "new" },
  { name: "Icon", dbui: 'variant="icon"', dubois: "IconToggleButton", status: "covered" },
  { name: "Button", dbui: 'variant="button"', dubois: "—", status: "new" },
]

// SplitButton.figma.js: Variant = Primary | Outline. Size = Default | Small.
const SPLIT_BUTTON_VARIANTS: FormVariantRow[] = [
  { name: "Primary", dbui: 'variant="default"', dubois: 'type="primary"', status: "covered" },
  { name: "Outline", dbui: 'variant="outline"', dubois: "type=\"default\"", status: "covered" },
]

// SegmentControl.figma.js: Variant = Default | Outline. Size = Default(md) | Small(sm).
// No state enum on container (state is per-item)
const SEGMENT_CONTROL_VARIANTS: FormVariantRow[] = [
  { name: "Default", dbui: 'variant="default"', dubois: "SegmentedControlGroup", status: "covered" },
  { name: "Outline", dbui: 'variant="outline"', dubois: "—", status: "new" },
]

// ─── Vanilla shadcn Form Styles (zinc theme) ───

const SC_FORM = {
  border: "#e3e3e7",
  bg: "#ffffff",
  fg: "#08080a",
  muted: "#71717a",
  ring: "#08080a",
  destructive: "#ee4444",
  accent: "#f4f4f5",
  primary: "#17171b",
  primaryFg: "#f9f9f9",
  radius: "calc(0.5rem - 2px)",
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
    borderRadius: "4px",
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
    height: size === "sm" ? "32px" : "36px",
    minWidth: size === "sm" ? "32px" : "36px",
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
  if (state === "press") style = { ...style, ...hoverMap[variant] }
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
  .force-state-hover button[data-variant="outline"] { background-color: var(--color-hover) !important; border-color: var(--color-primary) !important; color: var(--color-primary-hover) !important; }
  .force-state-hover button[data-variant="secondary"] { background-color: var(--color-hover) !important; color: var(--color-accent-foreground) !important; }
  .force-state-hover button[data-variant="ghost"] { background-color: var(--color-hover) !important; color: var(--color-primary-hover) !important; }
  .force-state-hover button[data-variant="destructive"] { background-color: var(--color-destructive-hover) !important; }
  .force-state-hover button[data-variant="link"] { text-decoration: underline !important; color: var(--color-primary-hover) !important; }
  /* Press */
  .force-state-press button[data-variant="default"] { background-color: var(--color-primary-press) !important; }
  .force-state-press button[data-variant="destructive"] { background-color: var(--color-destructive-press) !important; }
  .force-state-press button[data-variant="outline"] { background-color: var(--color-press) !important; border-color: var(--color-primary-press) !important; color: var(--color-primary-press) !important; }
  .force-state-press button[data-variant="secondary"] { background-color: var(--color-press) !important; color: var(--color-primary-press) !important; }
  .force-state-press button[data-variant="ghost"] { background-color: var(--color-press) !important; color: var(--color-primary-press) !important; }
  .force-state-press button[data-variant="link"] { text-decoration: underline !important; color: var(--color-primary-press) !important; }
  /* Focus — filled variants: shadow-focus (white gap + blue ring), non-filled: 2px inside border */
  .force-state-focus button[data-variant="default"] { box-shadow: 0 0 0 1px white, 0 0 0 3px var(--color-ring) !important; overflow: clip !important; border-color: transparent !important; outline: none !important; }
  .force-state-focus button[data-variant="destructive"] { box-shadow: 0 0 0 1px white, 0 0 0 3px var(--color-ring) !important; overflow: clip !important; border-color: transparent !important; outline: none !important; }
  .force-state-focus button[data-variant="outline"] { border-width: 2px !important; border-color: var(--color-ring) !important; outline: none !important; }
  .force-state-focus button[data-variant="secondary"] { border-width: 2px !important; border-color: var(--color-ring) !important; outline: none !important; }
  .force-state-focus button[data-variant="ghost"] { border-width: 2px !important; border-color: var(--color-ring) !important; outline: none !important; }
  .force-state-focus button[data-variant="link"] { border-width: 1px !important; border-style: solid !important; border-color: var(--color-ring) !important; outline: none !important; }
`

const FORCE_STATE_FORM_CSS = `
  /* ── Input / Textarea / Select ── */

  /* Hover: border-primary-hover + bg-hover (matches Tailwind hover: classes) */
  .force-form-hover input,
  .force-form-hover textarea,
  .force-form-hover [data-slot="select-trigger"] {
    border-color: var(--color-primary-hover) !important;
    background-color: var(--color-hover) !important;
  }

  /* Focus: border-2 border-ring, NO shadow-focus (text inputs use border only) */
  .force-form-focus input,
  .force-form-focus textarea,
  .force-form-focus [data-slot="select-trigger"] {
    border-color: var(--color-ring) !important;
    border-width: 2px !important;
    box-shadow: none !important;
  }

  /* Disabled: bg-disabled + border-disabled + text-disabled-foreground + no shadow */
  .force-form-disabled input,
  .force-form-disabled textarea,
  .force-form-disabled [data-slot="select-trigger"] {
    background-color: var(--color-disabled) !important;
    border-color: var(--color-disabled) !important;
    color: var(--color-disabled-foreground) !important;
    box-shadow: none !important;
    pointer-events: none !important;
  }

  /* Error: border-destructive + ring-destructive/20 stacked with shadow-xs */
  .force-form-error input,
  .force-form-error textarea,
  .force-form-error [data-slot="select-trigger"] {
    border-color: var(--color-destructive) !important;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-destructive) 20%, transparent), 0 1px 0 rgba(0,0,0,0.05) !important;
  }

  /* ── Checkbox / Radio ── */

  .force-form-hover [data-slot="checkbox"],
  .force-form-hover button[role="radio"] {
    border-color: var(--color-primary-hover) !important;
    background-color: var(--color-hover) !important;
  }
  .force-form-focus [data-slot="checkbox"],
  .force-form-focus button[role="radio"] {
    border-color: var(--color-ring) !important;
    box-shadow: 0 0 0 1px white, 0 0 0 3px var(--color-ring) !important;
  }

  /* ── Switch ── */

  .force-form-hover button[role="switch"]:not([data-checked]) {
    background-color: var(--color-hover) !important;
    border: 1px solid var(--color-primary-hover) !important;
  }
  .force-form-hover button[role="switch"][data-checked] {
    background-color: var(--color-primary-hover) !important;
  }
  .force-form-focus button[role="switch"] {
    box-shadow: 0 0 0 1px white, 0 0 0 3px var(--color-ring) !important;
  }

  /* ── Toggle ── */

  .force-form-hover button[data-slot="toggle"] {
    background-color: var(--color-hover) !important;
  }
  .force-form-press button[data-slot="toggle"] {
    background-color: var(--color-press) !important;
  }
  .force-form-focus button[data-slot="toggle"] {
    border-width: 2px !important;
    border-color: var(--color-ring) !important;
  }

  /* ── Segment Control ── */

  .force-form-hover button[data-slot="segment-control-item"] {
    background-color: var(--color-hover) !important;
  }
  .force-form-press button[data-slot="segment-control-item"] {
    background-color: var(--color-press) !important;
  }
  .force-form-focus button[data-slot="segment-control-item"] {
    border-width: 2px !important;
    border-color: var(--color-ring) !important;
  }
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

  const stateClass = (state === "hover" || state === "press" || state === "focus") ? `force-state-${state}` : ""
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
          {states} states × {sizes} sizes × {variants.length} variants
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

          {forceStateCss && <style>{forceStateCss}</style>}

          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr style={{ borderBottom: `1px solid ${t.border}`, backgroundColor: t.bg }}>
                  <th className="text-left px-5 py-2.5 font-normal" style={{ color: t.textSubtle, width: "22%", fontFamily: MONO }}>Variant</th>
                  <th className="text-center px-4 py-2.5 font-normal" style={{ color: t.textSubtle, width: "30%", fontFamily: MONO }}>DBUI</th>
                  <th className="text-center px-4 py-2.5 font-normal" style={{ color: t.textSubtle, width: "30%", fontFamily: MONO }}>shadcn</th>
                  <th className="text-left px-5 py-2.5 font-normal" style={{ color: t.textSubtle, width: "18%", fontFamily: MONO }}>DuBois</th>
                </tr>
              </thead>
              <tbody>
                {variants.map((v, i) => (
                  <tr
                    key={v.name}
                    style={{ borderBottom: i < variants.length - 1 ? `1px solid ${t.border}` : undefined }}
                  >
                    <td className="px-5 py-4 align-middle" style={{ fontFamily: MONO }}>
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px]" style={{ color: t.text }}>{v.name}</span>
                          {v.status !== "covered" && <StatusBadge type={v.status}>{v.status}</StatusBadge>}
                        </div>
                        <span className="text-[11px]" style={{ color: t.textSubtle }}>{v.dbui || "—"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 align-middle" style={{ fontFamily: "inherit" }}>
                      <div className="flex justify-center">
                        {renderDbui(v, activeState, activeSize)}
                      </div>
                    </td>
                    <td className="px-4 py-4 align-middle" style={{ fontFamily: "inherit" }}>
                      <div className="flex justify-center">
                        {renderShadcn(v, activeState, activeSize)}
                      </div>
                    </td>
                    <td className="px-5 py-4 align-middle" style={{ fontFamily: MONO }}>
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

// ─── Code Block ───

function Code({ children }: { children: string }) {
  return <SyntaxHighlightedCode code={children} />
}

// ─── Component Section ───

const DUBOIS_STORYBOOK = "https://ui-infra.dev.databricks.com/storybook/js/packages/du-bois/index.html"
const DUBOIS_IFRAME = "https://ui-infra.dev.databricks.com/storybook/js/packages/du-bois/iframe.html"

/** DuBois UI Kit file in Figma. Append `?node-id=123-456` (from Figma: Copy link to selection) for a component. */
const FIGMA_LIBRARY_FILE = "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv"

/**
 * Per-section Figma URLs. Keys match Section `id`. Omit a key to hide the badge for that section.
 */
const FIGMA_URLS: Partial<Record<string, string>> = {
  button: FIGMA_LIBRARY_FILE,
}

type TabKey = "dbui" | "code" | "dubois"

function Section({
  id,
  title,
  code,
  duboisStoryId,
  figmaUrl,
  hasVariantBar,
  children,
}: {
  id: string
  title: string
  code: string
  duboisStoryId?: string
  /** Overrides FIGMA_URLS[id] when set */
  figmaUrl?: string
  hasVariantBar?: boolean
  children: React.ReactNode
}) {
  const { t } = useTheme()
  const [tab, setTab] = useState<TabKey>("dbui")
  const isLocal = typeof window !== "undefined" && window.location.hostname === "localhost"
  const allTabs: { key: TabKey; label: string; localOnly?: boolean }[] = [
    { key: "dbui", label: "DBUI" },
    { key: "code", label: "Code" },
    { key: "dubois", label: "DuBois", localOnly: true },
  ]
  const tabs = allTabs.filter((t) => !t.localOnly || isLocal)

  const resolvedFigmaUrl = figmaUrl ?? FIGMA_URLS[id]

  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="text-[22px] leading-[1.2] font-semibold mb-4" style={{ color: t.text }}>
        {title}
      </h2>

      <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${t.border}`, borderBottomLeftRadius: hasVariantBar ? 0 : undefined, borderBottomRightRadius: hasVariantBar ? 0 : undefined, borderBottom: hasVariantBar ? "none" : undefined }}>
        {/* Tab bar */}
        <div
          className="flex items-center justify-between gap-3 px-1 min-h-[41px]"
          style={{ borderBottom: `1px solid ${t.border}` }}
        >
          <div className="flex items-center gap-0">
            {tabs.map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className="text-[13px] px-3 py-2.5 relative transition-colors"
                style={{
                  color: tab === item.key ? t.text : t.textSubtle,
                  fontWeight: tab === item.key ? 500 : 400,
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          {resolvedFigmaUrl ? (
            <a
              href={resolvedFigmaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-medium px-2 py-1 rounded-md mr-2 shrink-0 transition-opacity hover:opacity-90"
              style={{
                fontFamily: MONO,
                color: t.primary,
                border: `1px solid ${t.border}`,
                backgroundColor: t.cardBg,
              }}
            >
              Figma
            </a>
          ) : null}
        </div>

        {/* Tab content */}
        {tab === "dbui" && (
          <div className="p-6 min-h-[120px] flex flex-col gap-4 items-start justify-center">
            {children}
          </div>
        )}
        {tab === "code" && (
          <div className="p-4">
            <SyntaxHighlightedCode code={code} />
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
      </div>
    </section>
  )
}

// ─── Nav (table of contents) ───

const COMPONENTS = [
  // ── Button Family ──
  { id: "button", label: "Button" },
  { id: "split-button", label: "Split Button" },
  { id: "toggle", label: "Toggle" },
  { id: "segment-control", label: "Segment Control" },
  // ── Input Family ──
  { id: "input", label: "Input" },
  { id: "textarea", label: "Textarea" },
  // ── Selection Family ──
  { id: "checkbox", label: "Checkbox" },
  { id: "radio", label: "Radio Group" },
  { id: "switch", label: "Switch" },
  { id: "select", label: "Select" },
  { id: "combobox", label: "Combobox" },
  { id: "typeahead-combobox", label: "TypeaheadCombobox" },
  { id: "dropdown", label: "Dropdown Menu" },
  // ── Controls ──
  { id: "tabs", label: "Tabs" },
  { id: "slider", label: "Slider" },
  { id: "radio-tile", label: "Radio Tile" },
  // ── Overlays ──
  { id: "dialog", label: "Dialog" },
  { id: "alert-dialog", label: "Alert Dialog" },
  { id: "drawer", label: "Drawer" },
  { id: "popover", label: "Popover" },
  { id: "tooltip", label: "Tooltip" },
  { id: "hover-card", label: "Hover Card" },
  // ── Feedback ──
  { id: "alert", label: "Alert" },
  { id: "toast", label: "Toast" },
]

// ─── Page ───

export default function ComponentsPage() {
  const { t } = useTheme()
  const [componentSearch, setComponentSearch] = useState("")

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
              Every shadcn component, dressed in DuBois tokens. Live preview on the left, usage code on the right.
            </p>
          </div>
        </section>

        {/* Search + Filter bar */}
        <section
          className="sticky top-12 z-40 px-8 py-3 backdrop-blur-xl"
          style={{ backgroundColor: `${t.bg}cc`, borderBottom: `1px solid ${t.border}` }}
        >
          <div className="max-w-[1100px] mx-auto flex items-center gap-4">
            <div className="relative flex-1 max-w-[360px]">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke={t.textSubtle} strokeWidth="1.5">
                <circle cx="7" cy="7" r="5.5" />
                <path d="M11 11l3.5 3.5" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search components…"
                value={componentSearch}
                onChange={(e) => setComponentSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-md text-[13px] outline-none transition-colors"
                style={{ fontFamily: MONO, color: t.text, backgroundColor: t.cardBg, border: `1px solid ${t.border}` }}
              />
            </div>
            <div className="flex items-center gap-1">
              {["All", "Controls", "Content", "Containers", "Compositions"].map((cat) => (
                <button
                  key={cat}
                  className="text-[11px] px-2.5 py-1 rounded-md transition-colors"
                  style={{
                    fontFamily: MONO,
                    color: cat === "All" ? t.text : t.textSubtle,
                    backgroundColor: cat === "All" ? t.hoverBg : "transparent",
                    border: cat === "All" ? `1px solid ${t.border}` : "1px solid transparent",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
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
                hasVariantBar
                code={`{/* Variants */}
<Button>Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>
<Button size="icon-md" variant="ghost" aria-label="Add"><Plus /></Button>

{/* Sizes */}
<Button size="sm">Small</Button>
<Button size="md">Default</Button>`}
              >
                <div className="flex flex-col gap-4 w-full">
                  {/* Row labels share fixed width so previews align */}
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span
                      className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none"
                      style={{ fontFamily: MONO, color: t.textSubtle }}
                    >
                      7 Variants
                    </span>
                    <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                      <Button>Primary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button variant="link">Link</Button>
                      <Button size="icon-md" variant="ghost" aria-label="Add">
                        <Plus className="size-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span
                      className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none"
                      style={{ fontFamily: MONO, color: t.textSubtle }}
                    >
                      2 Sizes
                    </span>
                    <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                      <Button size="sm">Small</Button>
                      <Button size="md">Default</Button>
                    </div>
                  </div>
                </div>
              </Section>

              <VariantBar label="Variants" variants={BUTTON_VARIANTS} states={6} sizes={2} />
              </div>

              {/* ─── Split Button ─── */}
              <div>
              <Section
                id="split-button"
                title="Split Button"
                hasVariantBar
                code={`<SplitButton>
  <Button>Save</Button>
  <SplitButtonSeparator />
  <Button size="icon-md" aria-label="More options">
    <ChevronDown className="size-4" />
  </Button>
</SplitButton>

{/* Outline variant */}
<SplitButton>
  <Button variant="outline">Export</Button>
  <SplitButtonSeparator />
  <Button variant="outline" size="icon-md">
    <ChevronDown className="size-4" />
  </Button>
</SplitButton>`}
              >
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>2 Variants</span>
                    <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
                      <SplitButton>
                        <Button>Save</Button>
                        <SplitButtonSeparator />
                        <Button size="icon-md" aria-label="More">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </Button>
                      </SplitButton>
                      <SplitButton>
                        <Button variant="outline">Export</Button>
                        <SplitButtonSeparator />
                        <Button variant="outline" size="icon-md" aria-label="More">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </Button>
                      </SplitButton>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>2 Sizes</span>
                    <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
                      <SplitButton>
                        <Button size="sm">Small</Button>
                        <SplitButtonSeparator />
                        <Button size="icon-sm" aria-label="More">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </Button>
                      </SplitButton>
                      <SplitButton>
                        <Button>Default</Button>
                        <SplitButtonSeparator />
                        <Button size="icon-md" aria-label="More">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </Button>
                      </SplitButton>
                    </div>
                  </div>
                </div>
              </Section>

              <FormVariantBar<ToggleState, ToggleSizeKey>
                label="Variants"
                variants={SPLIT_BUTTON_VARIANTS}
                states={TOGGLE_STATES}
                sizes={TOGGLE_SIZES}
                forceStateCss={FORCE_STATE_FORM_CSS}
                renderDbui={(v, state, size) => {
                  const variant = v.name === "Outline" ? "outline" as const : "default" as const
                  const iconSize = size === "sm" ? "icon-sm" as const : "icon-md" as const
                  const stateClass = (state === "hover" || state === "press") ? `force-form-${state}` : ""
                  return (
                    <div className={stateClass}>
                      <SplitButton>
                        <Button variant={variant} size={size} disabled={state === "disabled"}>{v.name}</Button>
                        <SplitButtonSeparator />
                        <Button variant={variant} size={iconSize} disabled={state === "disabled"} aria-label="More">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </Button>
                      </SplitButton>
                    </div>
                  )
                }}
                renderShadcn={(v, state, size) => {
                  const variant = v.name === "Outline" ? "outline" : "default"
                  const iconSize = size === "sm" ? "icon-sm" : "icon-md"
                  return (
                    <div style={{ display: "inline-flex", alignItems: "stretch" }}>
                      <button style={{ ...shadcnButtonStyle(variant, state, size), borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRight: "none" }} disabled={state === "disabled"}>{v.name}</button>
                      <div style={{ width: "1px", alignSelf: "stretch", backgroundColor: variant === "outline" ? SC_FORM.border : "rgba(255,255,255,0.2)" }} />
                      <button style={{ ...shadcnButtonStyle(variant, state, iconSize, true), borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeft: "none" }} disabled={state === "disabled"}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      </button>
                    </div>
                  )
                }}
              />
              </div>

              {/* ─── Toggle ─── */}
              <div>
              <Section
                id="toggle"
                title="Toggle"
                duboisStoryId="primitives-segmentedcontrol-stories--default"
                hasVariantBar
                code={`<Toggle>Default</Toggle>
<Toggle variant="outline">Outline</Toggle>
<Toggle variant="icon" size="icon-md" aria-label="Like"><ThumbsUpIcon /></Toggle>
<Toggle variant="button"><CheckboxIcon />Button</Toggle>
<Toggle size="sm">Small</Toggle>
<Toggle defaultPressed>Pressed</Toggle>`}
              >
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>4 Variants</span>
                    <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                      <Toggle defaultPressed>Default</Toggle>
                      <Toggle variant="outline">Outline</Toggle>
                      <Toggle variant="icon" size="icon-md" defaultPressed aria-label="Like"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg></Toggle>
                      <Toggle variant="button" defaultPressed><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="1" width="14" height="14" rx="3" /><path d="M4.5 8L7 10.5L11.5 5.5" /></svg>Button</Toggle>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>2 Sizes</span>
                    <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                      <Toggle size="sm">Small</Toggle>
                      <Toggle size="md">Default</Toggle>
                    </div>
                  </div>
                </div>
              </Section>

              <FormVariantBar<ToggleState, ToggleSizeKey>
                label="Variants"
                variants={TOGGLE_VARIANTS_DATA}
                states={TOGGLE_STATES}
                sizes={TOGGLE_SIZES}
                forceStateCss={FORCE_STATE_FORM_CSS}
                renderDbui={(v, state, size) => {
                  const variant = v.name === "Default" ? "default" as const : v.name === "Outline" ? "outline" as const : v.name === "Icon" ? "icon" as const : "button" as const
                  const isIcon = variant === "icon"
                  const toggleSize = isIcon ? (size === "sm" ? "icon-sm" as const : "icon-md" as const) : size
                  const stateClass = (state === "hover" || state === "press") ? `force-form-${state}` : ""
                  return (
                    <div className={stateClass}>
                      <Toggle variant={variant} size={toggleSize} disabled={state === "disabled"} data-slot="toggle">
                        {isIcon ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg> : variant === "button" ? <><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="1" width="14" height="14" rx="3" /><path d="M4.5 8L7 10.5L11.5 5.5" /></svg>{v.name}</> : v.name}
                      </Toggle>
                    </div>
                  )
                }}
                renderShadcn={(v, state, size) => {
                  const variant = v.name === "Outline" ? "outline" as const : "default" as const
                  return (
                    <button style={shadcnToggleStyle(state, variant, size, false)}>
                      {v.name}
                    </button>
                  )
                }}
              />
              </div>

              {/* ─── Segment Control ─── */}
              <div>
              <Section
                id="segment-control"
                title="Segment Control"
                duboisStoryId="primitives-segmentedcontrol-stories--default"
                hasVariantBar
                code={`<SegmentControl>
  <SegmentControlItem value="a">Left</SegmentControlItem>
  <SegmentControlItem value="b">Center</SegmentControlItem>
  <SegmentControlItem value="c">Right</SegmentControlItem>
</SegmentControl>

{/* Outline variant */}
<SegmentControl variant="outline">...</SegmentControl>

{/* Small size */}
<SegmentControl size="sm">...</SegmentControl>`}
              >
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>2 Variants</span>
                    <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                      <SegmentControl defaultValue={["a"]}>
                        <SegmentControlItem value="a">Left</SegmentControlItem>
                        <SegmentControlItem value="b">Center</SegmentControlItem>
                        <SegmentControlItem value="c">Right</SegmentControlItem>
                      </SegmentControl>
                      <SegmentControl variant="outline" defaultValue={["bold"]}>
                        <SegmentControlItem value="bold">Bold</SegmentControlItem>
                        <SegmentControlItem value="italic">Italic</SegmentControlItem>
                      </SegmentControl>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>2 Sizes</span>
                    <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                      <SegmentControl size="sm" defaultValue={["a"]}>
                        <SegmentControlItem value="a">Small</SegmentControlItem>
                        <SegmentControlItem value="b">Size</SegmentControlItem>
                      </SegmentControl>
                      <SegmentControl defaultValue={["a"]}>
                        <SegmentControlItem value="a">Default</SegmentControlItem>
                        <SegmentControlItem value="b">Size</SegmentControlItem>
                      </SegmentControl>
                    </div>
                  </div>
                </div>
              </Section>

              <FormVariantBar<ToggleState, ToggleSizeKey>
                label="Variants"
                variants={SEGMENT_CONTROL_VARIANTS}
                states={TOGGLE_STATES}
                sizes={TOGGLE_SIZES}
                forceStateCss={FORCE_STATE_FORM_CSS}
                renderDbui={(v, state, size) => {
                  const variant = v.name === "Outline" ? "outline" as const : "default" as const
                  const stateClass = (state === "hover" || state === "press") ? `force-form-${state}` : ""
                  return (
                    <div className={stateClass}>
                      <SegmentControl variant={variant} size={size} defaultValue={["a"]}>
                        <SegmentControlItem value="a" disabled={state === "disabled"}>One</SegmentControlItem>
                        <SegmentControlItem value="b" disabled={state === "disabled"}>Two</SegmentControlItem>
                        <SegmentControlItem value="c" disabled={state === "disabled"}>Three</SegmentControlItem>
                      </SegmentControl>
                    </div>
                  )
                }}
                renderShadcn={(v, state, size) => {
                  const isOutline = v.name === "Outline"
                  const h = size === "sm" ? "24px" : "32px"
                  const px = size === "sm" ? "6px" : "10px"
                  const fontSize = "14px"
                  const containerBg = SC_FORM.accent
                  const selectedBg = "#fff"
                  const items = ["One", "Two", "Three"]
                  return (
                    <div style={{
                      display: "inline-flex",
                      alignItems: "center",
                      borderRadius: SC_FORM.radius,
                      backgroundColor: containerBg,
                      padding: "2px",
                      border: isOutline ? `1px solid ${SC_FORM.border}` : "none",
                      opacity: state === "disabled" ? 0.5 : 1,
                    }}>
                      {items.map((item, i) => (
                        <div key={item} style={{
                          height: h,
                          padding: `0 ${px}`,
                          fontSize,
                          fontWeight: 500,
                          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: SC_FORM.radius,
                          backgroundColor: i === 0 ? selectedBg : "transparent",
                          color: SC_FORM.fg,
                          boxShadow: i === 0 ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
                          border: i === 0 ? `1px solid ${SC_FORM.border}` : "1px solid transparent",
                          cursor: state === "disabled" ? "not-allowed" : "pointer",
                        }}>
                          {item}
                        </div>
                      ))}
                    </div>
                  )
                }}
              />
              </div>

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
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>2 Sizes</span>
                    <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                      <Input placeholder="Default (32px)" className="w-[200px]" />
                      <Input size="sm" placeholder="Small (24px)" className="w-[200px]" />
                    </div>
                  </div>
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
                        placeholder={v.name === "Value" ? undefined : "Placeholder"}
                        defaultValue={v.name === "Value" ? "john@databricks.com" : undefined}
                        size={size}
                        disabled={state === "disabled"}
                        aria-invalid={state === "error" ? true : undefined}
                        className="w-[200px]"
                      />
                    </div>
                  )
                }}
                renderShadcn={(v, state, size) => (
                  <input
                    style={shadcnInputStyle(state === "disabled" ? "disabled" : state, size)}
                    placeholder={v.name === "Value" ? undefined : "Placeholder"}
                    defaultValue={v.name === "Value" ? "john@databricks.com" : undefined}
                    disabled={state === "disabled"}
                    readOnly
                  />
                )}
              />
              </div>

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
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>States</span>
                    <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                      <Textarea placeholder="Default" className="w-[180px] min-h-[60px]" />
                      <Textarea disabled placeholder="Disabled" className="w-[180px] min-h-[60px]" />
                      <Textarea aria-invalid placeholder="Danger" className="w-[180px] min-h-[60px]" />
                    </div>
                  </div>
                </div>
              </Section>

              <FormVariantBar<FormState, FormSizeKey>
                label="Variants"
                variants={TEXTAREA_VARIANTS}
                states={FORM_STATES}
                forceStateCss={FORCE_STATE_FORM_CSS}
                renderDbui={(v, state) => {
                  const stateClass = (state === "hover" || state === "focus") ? `force-form-${state}` : state === "error" ? "force-form-error" : ""
                  return (
                    <div className={stateClass}>
                      <Textarea
                        placeholder={v.name === "Value" ? undefined : "Placeholder"}
                        defaultValue={v.name === "Value" ? "This is some content..." : undefined}
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
                      resize: "none" as const,
                    }}
                    placeholder={v.name === "Value" ? undefined : "Placeholder"}
                    defaultValue={v.name === "Value" ? "This is some content..." : undefined}
                    disabled={state === "disabled"}
                    readOnly
                  />
                )}
              />
              </div>

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
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>3 States</span>
                    <div className="flex flex-wrap items-center gap-4 flex-1 min-w-0">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox />
                        <span className="text-[13px]">Unchecked</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox defaultChecked />
                        <span className="text-[13px]">Checked</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox disabled />
                        <span className="text-[13px]">Disabled</span>
                      </label>
                    </div>
                  </div>
                </div>
              </Section>

              <FormVariantBar<FormState, string>
                label="Variants"
                variants={CHECKBOX_VARIANTS}
                states={SELECTION_STATES}
                forceStateCss={FORCE_STATE_FORM_CSS}
                renderDbui={(v, state) => {
                  const checked = v.name === "Checked"
                  const indeterminate = v.name === "Indeterminate"
                  const stateClass = (state === "hover" || state === "focus") ? `force-form-${state}` : ""
                  return (
                    <div className={`flex items-center gap-2 ${stateClass}`}>
                      <Checkbox defaultChecked={checked || indeterminate} disabled={state === "disabled"} />
                      <span className="text-[13px]">Label</span>
                    </div>
                  )
                }}
                renderShadcn={(v, state) => {
                  const checked = v.name === "Checked"
                  const indeterminate = v.name === "Indeterminate"
                  return (
                    <div className="flex items-center gap-2">
                      <div style={shadcnCheckboxStyle(state, checked || indeterminate)}>
                        {checked && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                        {indeterminate && (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        )}
                      </div>
                      <span style={{ fontSize: "14px", fontFamily: 'ui-sans-serif, system-ui, sans-serif', color: state === "disabled" ? SC_FORM.muted : SC_FORM.fg }}>Label</span>
                    </div>
                  )
                }}
              />
              </div>

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
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>Selected</span>
                    <div className="flex flex-wrap items-center gap-4 flex-1 min-w-0">
                      <RadioGroup defaultValue="option-1">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <RadioGroupItem value="option-1" />
                          <span className="text-[13px]">Default plan</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <RadioGroupItem value="option-2" />
                          <span className="text-[13px]">Pro plan</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <RadioGroupItem value="option-3" />
                          <span className="text-[13px]">Enterprise</span>
                        </label>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </Section>

              <FormVariantBar<FormState, string>
                label="Variants"
                variants={RADIO_VARIANTS}
                states={SELECTION_STATES}
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
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>2 Sizes</span>
                    <div className="flex flex-wrap items-center gap-4 flex-1 min-w-0">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Switch defaultChecked />
                        <span className="text-[13px]">Default</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Switch size="sm" defaultChecked />
                        <span className="text-[13px]">Small</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>States</span>
                    <div className="flex flex-wrap items-center gap-4 flex-1 min-w-0">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Switch />
                        <span className="text-[13px]">Off</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Switch defaultChecked />
                        <span className="text-[13px]">On</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <Switch disabled />
                        <span className="text-[13px]">Disabled</span>
                      </label>
                    </div>
                  </div>
                </div>
              </Section>

              <FormVariantBar<FormState, FormSizeKey>
                label="Variants"
                variants={SWITCH_VARIANTS}
                states={SELECTION_STATES}
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
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>2 Sizes</span>
                    <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                      <Select>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Default (32px)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="cherry">Cherry</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger className="w-[200px]" size="sm">
                          <SelectValue placeholder="Small (28px)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a">Option A</SelectItem>
                          <SelectItem value="b">Option B</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
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
                      <Select defaultValue={v.name === "Value" ? "apple" : undefined}>
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
                    <span>{v.name === "Value" ? "Apple" : "Select a fruit"}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={SC_FORM.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                )}
              />
              </div>

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
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>2 Sizes</span>
                    <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                      <Combobox>
                        <ComboboxInput placeholder="Default (32px)" className="w-[200px]" />
                        <ComboboxContent>
                          <ComboboxList>
                            <ComboboxItem value="apple">Apple</ComboboxItem>
                            <ComboboxItem value="banana">Banana</ComboboxItem>
                            <ComboboxItem value="cherry">Cherry</ComboboxItem>
                          </ComboboxList>
                          <ComboboxEmpty>No results.</ComboboxEmpty>
                        </ComboboxContent>
                      </Combobox>
                      <Combobox>
                        <ComboboxInput placeholder="Small (28px)" inputSize="sm" className="w-[200px]" />
                        <ComboboxContent>
                          <ComboboxList>
                            <ComboboxItem value="a">Option A</ComboboxItem>
                          </ComboboxList>
                          <ComboboxEmpty>No results.</ComboboxEmpty>
                        </ComboboxContent>
                      </Combobox>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>Clear</span>
                    <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                      <Combobox>
                        <ComboboxInput placeholder="With clear button" showClear className="w-[200px]" />
                        <ComboboxContent>
                          <ComboboxList>
                            <ComboboxItem value="a">Option A</ComboboxItem>
                            <ComboboxItem value="b">Option B</ComboboxItem>
                          </ComboboxList>
                          <ComboboxEmpty>No results.</ComboboxEmpty>
                        </ComboboxContent>
                      </Combobox>
                    </div>
                  </div>
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
                          placeholder={v.name === "Value" ? "Apple" : "Search..."}
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
                      {v.name === "Value" ? "Apple" : "Search..."}
                    </span>
                  </div>
                )}
              />
              </div>

              {/* ─── TypeaheadCombobox ─── */}
              <Section
                id="typeahead-combobox"
                title="TypeaheadCombobox"
                code={`<Combobox>
  <ComboboxChips>
    <ComboboxChip value="react">React</ComboboxChip>
    <ComboboxChip value="vue">Vue</ComboboxChip>
    <ComboboxChipsInput placeholder="Add tag..." />
  </ComboboxChips>
  <ComboboxContent>
    <ComboboxList>
      <ComboboxItem value="angular">Angular</ComboboxItem>
      <ComboboxItem value="svelte">Svelte</ComboboxItem>
    </ComboboxList>
  </ComboboxContent>
</Combobox>`}
              >
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>Multi-select</span>
                    <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                      <Combobox>
                        <ComboboxChips className="w-[300px]">
                          <ComboboxChip>React</ComboboxChip>
                          <ComboboxChip>Vue</ComboboxChip>
                          <ComboboxChipsInput placeholder="Add framework..." />
                        </ComboboxChips>
                        <ComboboxContent>
                          <ComboboxList>
                            <ComboboxItem value="angular">Angular</ComboboxItem>
                            <ComboboxItem value="svelte">Svelte</ComboboxItem>
                            <ComboboxItem value="solid">Solid</ComboboxItem>
                          </ComboboxList>
                          <ComboboxEmpty>No results.</ComboboxEmpty>
                        </ComboboxContent>
                      </Combobox>
                    </div>
                  </div>
                </div>
              </Section>

              {/* ─── Dropdown Menu ─── */}
              <Section
                id="dropdown"
                title="Dropdown Menu"
                duboisStoryId="primitives-dropdownmenu-stories--default"
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
    <DropdownMenuCheckboxItem checked>Show sidebar</DropdownMenuCheckboxItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">Delete account</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
              >
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>4 Item Types</span>
                    <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                      <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="outline" />}>
                          Open Menu
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Action item</DropdownMenuItem>
                          <DropdownMenuItem>Another action</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuCheckboxItem checked>Multi-select</DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>Another option</DropdownMenuCheckboxItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem variant="destructive">Destructive</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </Section>

              {/* ─── Tabs ─── */}
              <Section
                id="tabs"
                title="Tabs"
                code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from "dbui/components/ui/tabs"

<Tabs defaultValue="tab-1">
  <TabsList>
    <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
    <TabsTrigger value="tab-3">Tab 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab-1">Content for Tab 1</TabsContent>
  <TabsContent value="tab-2">Content for Tab 2</TabsContent>
  <TabsContent value="tab-3">Content for Tab 3</TabsContent>
</Tabs>`}
              >
                <div className="flex flex-col gap-6 w-full">
                  <div className="flex items-start gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none pt-2" style={{ fontFamily: MONO, color: t.textSubtle }}>Default (lined)</span>
                    <TabsComponent defaultValue="tab-1" className="flex-1 min-w-0">
                      <TabsList>
                        <TabsTrigger value="tab-1">Overview</TabsTrigger>
                        <TabsTrigger value="tab-2">Configuration</TabsTrigger>
                        <TabsTrigger value="tab-3">Permissions</TabsTrigger>
                      </TabsList>
                      <TabsContent value="tab-1"><div className="pt-3 text-[13px]" style={{ color: t.textSubtle }}>Overview content</div></TabsContent>
                      <TabsContent value="tab-2"><div className="pt-3 text-[13px]" style={{ color: t.textSubtle }}>Configuration content</div></TabsContent>
                      <TabsContent value="tab-3"><div className="pt-3 text-[13px]" style={{ color: t.textSubtle }}>Permissions content</div></TabsContent>
                    </TabsComponent>
                  </div>
                  <div className="flex items-start gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none pt-2" style={{ fontFamily: MONO, color: t.textSubtle }}>Pill</span>
                    <TabsComponent defaultValue="tab-1" className="flex-1 min-w-0">
                      <TabsList variant="pill">
                        <TabsTrigger value="tab-1">Overview</TabsTrigger>
                        <TabsTrigger value="tab-2">Configuration</TabsTrigger>
                        <TabsTrigger value="tab-3">Permissions</TabsTrigger>
                      </TabsList>
                      <TabsContent value="tab-1"><div className="pt-3 text-[13px]" style={{ color: t.textSubtle }}>Overview content</div></TabsContent>
                      <TabsContent value="tab-2"><div className="pt-3 text-[13px]" style={{ color: t.textSubtle }}>Configuration content</div></TabsContent>
                      <TabsContent value="tab-3"><div className="pt-3 text-[13px]" style={{ color: t.textSubtle }}>Permissions content</div></TabsContent>
                    </TabsComponent>
                  </div>
                </div>
              </Section>

              {/* ─── Slider ─── */}
              <Section
                id="slider"
                title="Slider"
                code={`import { Slider } from "dbui/components/ui/slider"

<Slider defaultValue={[50]} min={0} max={100} />
<Slider defaultValue={[25, 75]} min={0} max={100} />`}
              >
                <div className="flex flex-col gap-6 w-full">
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>Single</span>
                    <div className="flex-1 min-w-0 max-w-xs"><Slider defaultValue={[50]} min={0} max={100} /></div>
                  </div>
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>Range</span>
                    <div className="flex-1 min-w-0 max-w-xs"><Slider defaultValue={[25, 75]} min={0} max={100} /></div>
                  </div>
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>Disabled</span>
                    <div className="flex-1 min-w-0 max-w-xs"><Slider defaultValue={[50]} min={0} max={100} disabled /></div>
                  </div>
                </div>
              </Section>

              {/* ─── Radio Tile ─── */}
              <Section
                id="radio-tile"
                title="Radio Tile"
                code={`import { RadioTileGroup, RadioTile, RadioTileHeader, RadioTileTitle, RadioTileDescription } from "dbui/components/ui/radio-tile"

<RadioTileGroup defaultValue="option-1">
  <RadioTile value="option-1">
    <RadioTileHeader>
      <RadioTileTitle>Standard cluster</RadioTileTitle>
    </RadioTileHeader>
    <RadioTileDescription>Best for general-purpose workloads</RadioTileDescription>
  </RadioTile>
  <RadioTile value="option-2">
    <RadioTileHeader>
      <RadioTileTitle>GPU cluster</RadioTileTitle>
    </RadioTileHeader>
    <RadioTileDescription>Optimized for ML training and inference</RadioTileDescription>
  </RadioTile>
</RadioTileGroup>`}
              >
                <div className="flex flex-col gap-4 w-full max-w-md">
                  <RadioTileGroup defaultValue="option-1">
                    <RadioTile value="option-1">
                      <RadioTileHeader>
                        <RadioTileTitle>Standard cluster</RadioTileTitle>
                      </RadioTileHeader>
                      <RadioTileDescription>Best for general-purpose workloads</RadioTileDescription>
                    </RadioTile>
                    <RadioTile value="option-2">
                      <RadioTileHeader>
                        <RadioTileTitle>GPU cluster</RadioTileTitle>
                      </RadioTileHeader>
                      <RadioTileDescription>Optimized for ML training and inference</RadioTileDescription>
                    </RadioTile>
                    <RadioTile value="option-3" disabled>
                      <RadioTileHeader>
                        <RadioTileTitle>Serverless</RadioTileTitle>
                      </RadioTileHeader>
                      <RadioTileDescription>Not available in your region</RadioTileDescription>
                    </RadioTile>
                  </RadioTileGroup>
                </div>
              </Section>

              {/* ─── Dialog ─── */}
              <Section
                id="dialog"
                title="Dialog"
                code={`<Dialog>
  <DialogTrigger>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>Make changes to your profile.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

{/* Sizes: normal (640px), wide (880px), extrawide (1200px) */}
<DialogContent size="wide">...</DialogContent>`}
              >
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>3 Sizes</span>
                    <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                      <Dialog>
                        <DialogTrigger render={<Button variant="outline" />}>
                          Open Dialog
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Profile</DialogTitle>
                            <DialogDescription>Make changes to your profile here.</DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button>Save</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </Section>

              {/* ─── Alert Dialog ─── */}
              <Section
                id="alert-dialog"
                title="Alert Dialog"
                code={`<AlertDialog>
  <AlertDialogTrigger>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
              >
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>Confirmation</span>
                    <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                      <AlertDialog>
                        <AlertDialogTrigger render={<Button variant="destructive" />}>
                          Delete Cluster
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>This will permanently delete the cluster and all associated data.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </Section>

              {/* ─── Drawer ─── */}
              <Section
                id="drawer"
                title="Drawer"
                code={`<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Settings</DrawerTitle>
      <DrawerDescription>Configure your preferences.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
      <Button>Save</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
              >
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>Bottom Sheet</span>
                    <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button variant="outline">Open Drawer</Button>
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>Settings</DrawerTitle>
                            <DrawerDescription>Configure your cluster preferences here.</DrawerDescription>
                          </DrawerHeader>
                          <div className="p-4">
                            <Label>Cluster name</Label>
                            <Input placeholder="my-cluster" className="mt-2" />
                          </div>
                          <DrawerFooter>
                            <DrawerClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                            <Button>Apply</Button>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    </div>
                  </div>
                </div>
              </Section>

              {/* ─── Popover ─── */}
              <Section
                id="popover"
                title="Popover"
                code={`<Popover>
  <PopoverTrigger>
    <Button variant="outline">Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Popover Title</PopoverTitle>
      <PopoverDescription>Content goes here.</PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>`}
              >
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>Interactive</span>
                    <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                      <Popover>
                        <PopoverTrigger render={<Button variant="outline" />}>
                          Open Popover
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverHeader>
                            <PopoverTitle>Dimensions</PopoverTitle>
                            <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
                          </PopoverHeader>
                          <div className="flex flex-col gap-2 pt-2">
                            <Label>Width</Label>
                            <Input placeholder="100%" />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              </Section>

              {/* ─── Tooltip ─── */}
              <Section
                id="tooltip"
                title="Tooltip"
                code={`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>Tooltip text</TooltipContent>
  </Tooltip>
</TooltipProvider>`}
              >
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>Hover</span>
                    <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                      <Tooltip>
                        <TooltipTrigger>
                          <Button variant="outline">Hover me</Button>
                        </TooltipTrigger>
                        <TooltipContent>This is a tooltip</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </Section>

              {/* ─── Hover Card ─── */}
              <Section
                id="hover-card"
                title="Hover Card"
                code={`<HoverCard>
  <HoverCardTrigger>Hover me</HoverCardTrigger>
  <HoverCardContent>
    <p>Rich content on hover.</p>
  </HoverCardContent>
</HoverCard>`}
              >
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>Hover</span>
                    <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                      <HoverCard>
                        <HoverCardTrigger className="text-[13px] underline cursor-pointer" style={{ color: t.primary, fontFamily: MONO }}>
                          Hover over this link
                        </HoverCardTrigger>
                        <HoverCardContent>
                          <div>
                            <p className="text-[13px] font-semibold">Databricks</p>
                            <p className="text-[12px]" style={{ color: t.textMuted }}>The data and AI company.</p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  </div>
                </div>
              </Section>

              {/* ─── Alert ─── */}
              <Section
                id="alert"
                title="Alert"
                code={`<Alert variant="warning">
  <AlertIcon><WarningFillIcon /></AlertIcon>
  <AlertContent>
    <AlertTitle>Warning</AlertTitle>
    <AlertDescription>This action may have consequences.</AlertDescription>
  </AlertContent>
  <AlertAction><Button variant="outline" size="sm">Label</Button></AlertAction>
  <AlertClose />
</Alert>`}
              >
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>4 Variants</span>
                    <div className="flex flex-col gap-3 flex-1 min-w-0">
                      <Alert variant="danger">
                        <AlertIcon><svg className="size-4" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></AlertIcon>
                        <AlertContent>
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>Something went wrong.</AlertDescription>
                        </AlertContent>
                        <AlertAction><Button variant="outline" size="sm">Label</Button></AlertAction>
                        <AlertClose />
                      </Alert>
                      <Alert variant="warning">
                        <AlertIcon><svg className="size-4" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1L15 14H1L8 1Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="8" cy="11" r="0.75"/><rect x="7.25" y="6" width="1.5" height="3.5" rx="0.75"/></svg></AlertIcon>
                        <AlertContent>
                          <AlertTitle>Warning</AlertTitle>
                          <AlertDescription>This action may have consequences.</AlertDescription>
                        </AlertContent>
                        <AlertAction><Button variant="outline" size="sm">Label</Button></AlertAction>
                        <AlertClose />
                      </Alert>
                      <Alert variant="info">
                        <AlertIcon><svg className="size-4" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="5" r="1"/><rect x="7.25" y="7" width="1.5" height="4" rx="0.75"/></svg></AlertIcon>
                        <AlertContent>
                          <AlertTitle>Info</AlertTitle>
                          <AlertDescription>This is an informational alert.</AlertDescription>
                        </AlertContent>
                        <AlertAction><Button variant="outline" size="sm">Label</Button></AlertAction>
                        <AlertClose />
                      </Alert>
                      <Alert variant="success">
                        <AlertIcon><svg className="size-4" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg></AlertIcon>
                        <AlertContent>
                          <AlertTitle>Success</AlertTitle>
                          <AlertDescription>Operation completed successfully.</AlertDescription>
                        </AlertContent>
                        <AlertAction><Button variant="outline" size="sm">Label</Button></AlertAction>
                        <AlertClose />
                      </Alert>
                    </div>
                  </div>
                </div>
              </Section>

              {/* ─── Toast ─── */}
              <Section
                id="toast"
                title="Toast"
                code={`import { toast } from "sonner"

toast.success("Cluster created successfully")
toast.info("Deployment in progress")
toast.warning("API rate limit approaching")
toast.error("Connection failed")`}
              >
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex items-center gap-4 w-full min-w-0">
                    <span className="w-[7.5rem] shrink-0 text-right text-[12px] font-medium leading-none" style={{ fontFamily: MONO, color: t.textSubtle }}>4 Types</span>
                    <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                      <Button variant="outline" size="sm" onClick={() => toast.success("Cluster created successfully")}>Success</Button>
                      <Button variant="outline" size="sm" onClick={() => toast.info("Deployment in progress")}>Info</Button>
                      <Button variant="outline" size="sm" onClick={() => toast.warning("API rate limit approaching")}>Warning</Button>
                      <Button variant="outline" size="sm" onClick={() => toast.error("Connection failed")}>Error</Button>
                    </div>
                  </div>
                </div>
              </Section>

            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-8" style={{ borderTop: `1px solid ${t.border}` }}>
          <div className="max-w-[1100px] mx-auto text-center">
            <span className="text-[14px] font-semibold tracking-wider block" style={{ color: t.textMuted }}>DBUI</span>
            <p className="text-[13px] mt-1.5" style={{ color: t.textSubtle }}>
              DuBois design language on shadcn components.
            </p>
            <p className="text-[12px] mt-1" style={{ color: t.textSubtle, opacity: 0.6 }}>
              Design · Databricks · 2026
            </p>
          </div>
        </footer>
      </div>
      <Toaster />
    </TooltipProvider>
  )
}
