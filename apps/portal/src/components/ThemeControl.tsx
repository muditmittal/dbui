"use client"

import * as React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "dbui/components/ui/select"

/**
 * The aesthetic axis, written as `data-theme` on `<html>`.
 *
 * Third of three dials in the footer and the only one that changes what the
 * system LOOKS like rather than how much of it fits on screen. Mode is a class,
 * the type scale is a root font size, and this is a set of token values — three
 * attributes on one element, none of which knows about the others.
 *
 * That independence is the whole claim being demonstrated. Switching theme
 * repaints the chrome, the accent, the two faces and the control corners
 * without touching the mode, the scale, or the density scalar a page may have
 * set on a subtree, because a theme block declares only the tokens it moves.
 * Nothing re-renders and no component knows a theme exists — the same property
 * that makes `dark` a one-line toggle.
 *
 * ## Why a select rather than segments
 *
 * Segments were right for two themes and stop being right at three. A segment
 * group states every option at once, so it grows with the roster and it grows
 * sideways in a footer that already holds two other controls — and the theme
 * names are words rather than glyphs, so they are the widest thing in the row.
 * A select spends the width of one option however many there are, which is the
 * property that matters when the roster is expected to reach four.
 *
 * `ghost` because the footer is a toolbar, which is what the component's own
 * `@guideline` says to use it for. The `@constraint` puts the switch to Combobox
 * at ten options; the roster is finite and curated and will not reach it.
 *
 * The roster is generated from `theme.config.mjs`, so a theme added there
 * appears in this control without an edit and a renamed one cannot go on being
 * offered here after it stops existing.
 */
import { themes, themeAttribute, themeDefault } from "@/stories/tokens/theme-data"

const THEME_ATTR = themeAttribute
const THEME_NAMES = themes.map((t) => t.name)
const LABELS: Record<string, string> = Object.fromEntries(themes.map((t) => [t.name, t.label]))

/**
 * The theme whose values are also in `:root`, so it is the one the attribute
 * never has to spell out — the same rule the type scale follows. A default
 * written into the DOM is indistinguishable from a preference, and the day the
 * default moves, every reader who ever touched the control would be pinned to
 * the old one.
 */
const DEFAULT_THEME = themeDefault

export const THEME_KEY = "dbui-theme"

const isTheme = (v: string | null | undefined): v is string =>
  typeof v === "string" && THEME_NAMES.includes(v)

/**
 * The theme the document is actually in, read off the element rather than from
 * storage.
 *
 * The attribute is the only source of truth, for the reason `ColorModeControl`
 * documents: a control that resolves the preference a second time is a control
 * that can disagree with the page it controls. The observer is what lets a
 * page-local preview be an override rather than a rival.
 */
export function useGlobalTheme(): string {
  const [theme, setTheme] = React.useState<string>(DEFAULT_THEME)

  React.useEffect(() => {
    const read = () => {
      const current = document.documentElement.getAttribute(THEME_ATTR)
      setTheme(isTheme(current) ? current : DEFAULT_THEME)
    }
    read()
    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: [THEME_ATTR] })
    return () => observer.disconnect()
  }, [])

  return theme
}

/** The menu, so the footer and any page-local override are one control. */
function ThemeSelect({
  value,
  onValueChange,
  label,
}: {
  value: string
  onValueChange: (next: string) => void
  label: string
}) {
  return (
    <Select
      value={value}
      onValueChange={(next) => onValueChange(isTheme(next) ? next : DEFAULT_THEME)}
    >
      <SelectTrigger variant="ghost" aria-label={label}>
        {/* A render child, because the trigger otherwise prints the raw value:
            the attribute spells `dubois` and the control has to say "DuBois".
            The name is an identifier and the label is the copy, and this is the
            one place the two meet. */}
        <SelectValue>{(v) => LABELS[v as string] ?? v}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {themes.map((t) => (
          // Named rather than swatched. A theme is a face and a corner as well
          // as a palette, so a color dot would describe a third of it and imply
          // the other two do not move.
          <SelectItem key={t.name} value={t.name}>
            {t.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function ThemeControl() {
  const theme = useGlobalTheme()

  const apply = React.useCallback((next: string) => {
    const root = document.documentElement
    // The default is the absence of the attribute, so the default page carries
    // no state and nothing has to be undone to get back to it.
    if (next === DEFAULT_THEME) root.removeAttribute(THEME_ATTR)
    else root.setAttribute(THEME_ATTR, next)
    try {
      if (next === DEFAULT_THEME) localStorage.removeItem(THEME_KEY)
      else localStorage.setItem(THEME_KEY, next)
    } catch {
      // Private browsing refuses the write. The theme still applies for this
      // session, so there is nothing useful to tell the reader.
    }
  }, [])

  React.useEffect(() => {
    // A theme that has been renamed or retired is still in someone's storage.
    // The pre-paint script already ignores a value it does not recognize, so the
    // page renders correctly either way — left there it is a preference that can
    // never be honored and never be seen.
    try {
      const stored = localStorage.getItem(THEME_KEY)
      if (stored !== null && !isTheme(stored)) localStorage.removeItem(THEME_KEY)
    } catch {
      // Private browsing refuses both the read and the write. Nothing to clean.
    }
  }, [])

  // One theme is not a choice. The control disappears rather than rendering a
  // menu nobody can move.
  if (THEME_NAMES.length < 2) return null

  return <ThemeSelect value={theme} onValueChange={apply} label="Theme" />
}

/* There is deliberately no page-local `ThemeOverride` yet, though the CSS
 * supports one: the attribute is unprefixed by `:root`, so setting it on a
 * subtree themes that subtree and two themes can render side by side in one
 * page. `ColorModeOverride` exists because the Tokens page needs it; a theme
 * equivalent with no caller would be an export nothing verifies. Add it with
 * the surface that uses it. */
