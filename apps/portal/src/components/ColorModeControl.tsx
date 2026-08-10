"use client"

import * as React from "react"

import { SegmentControl, SegmentControlItem } from "dbui/components/ui/segment-control"
import { Sun } from "dbui/components/icons/Sun"
import { Moon } from "dbui/components/icons/Moon"

/**
 * Light and dark, written as the `dark` class on `<html>`.
 *
 * That class is the whole toggle: DBUI ships both value sets in tokens.css and
 * every component reads them as custom properties, so nothing re-renders and no
 * component knows a theme exists.
 *
 * There is no third "system" segment. The system preference is the default, not
 * a choice — the script in `app/layout.tsx` resolves it before paint and this
 * control reads the result, so the segment already shows what the reader's
 * machine asked for without anyone having selected it.
 */
const MODES = ["light", "dark"] as const
export type ColorMode = (typeof MODES)[number]

export const COLOR_MODE_KEY = "dbui-color-mode"

const isMode = (v: string | null | undefined): v is ColorMode => v === "light" || v === "dark"

/** Private browsing refuses both reads and writes, so every access is guarded. */
function storedMode(): ColorMode | null {
  try {
    const value = localStorage.getItem(COLOR_MODE_KEY)
    return isMode(value) ? value : null
  } catch {
    return null
  }
}

/**
 * The mode the document is actually in, read off the element the pre-paint
 * script writes.
 *
 * The class on `<html>` is the only source of truth. Resolving the preference a
 * second time is how a control ends up disagreeing with the page it controls,
 * and a page-local override that seeded itself from `localStorage` would read
 * `null` on a first visit and land on light while the document sat in dark.
 *
 * The observer is what lets anything downstream be an override rather than a
 * rival: a reader who moves the footer moves the document, and every control
 * reading this hook re-seeds from it instead of quietly keeping its own answer.
 */
export function useGlobalColorMode(): ColorMode {
  // Light until the effect runs, matching the server render. The pre-paint
  // script has already dressed the document, so nothing flashes — only the
  // control's own segment settles a frame later.
  const [mode, setMode] = React.useState<ColorMode>("light")

  React.useEffect(() => {
    const read = () =>
      setMode(document.documentElement.classList.contains("dark") ? "dark" : "light")
    read()
    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  return mode
}

/** The two segments, so the footer and any page-local override are one control. */
function ModeSegments({
  value,
  onValueChange,
  label,
}: {
  value: ColorMode
  onValueChange: (next: ColorMode) => void
  label: string
}) {
  return (
    <SegmentControl
      size="md"
      value={[value]}
      onValueChange={(next) => onValueChange(isMode(next[0]) ? next[0] : "light")}
      aria-label={label}
    >
      <SegmentControlItem value="light" aria-label="Light">
        <Sun />
      </SegmentControlItem>
      <SegmentControlItem value="dark" aria-label="Dark">
        <Moon />
      </SegmentControlItem>
    </SegmentControl>
  )
}

export function ColorModeControl() {
  const mode = useGlobalColorMode()

  const apply = React.useCallback((next: ColorMode, persist: boolean) => {
    // No local state to set. The class is what the hook reads back, so writing
    // it once is the whole update and the control cannot drift from the page.
    document.documentElement.classList.toggle("dark", next === "dark")
    if (!persist) return
    try {
      localStorage.setItem(COLOR_MODE_KEY, next)
    } catch {
      // The mode still applies for this session, so there is nothing to say.
    }
  }, [])

  React.useEffect(() => {
    // Track the system only until someone chooses. After that the choice is
    // theirs, and sunset does not get to undo it.
    if (storedMode()) return
    const query = window.matchMedia("(prefers-color-scheme: dark)")
    const sync = () => apply(query.matches ? "dark" : "light", false)
    query.addEventListener("change", sync)
    return () => query.removeEventListener("change", sync)
  }, [apply])

  return <ModeSegments value={mode} onValueChange={(next) => apply(next, true)} label="Color mode" />
}

/**
 * A mode switch that changes what a preview shows and nothing else.
 *
 * It writes no class and no storage, so a reader can look at the dark values of
 * one section without the page around them changing. What it must not be is a
 * second setting: it seeds from `useGlobalColorMode`, and re-seeds whenever the
 * footer moves, so the two can only disagree while someone is deliberately
 * holding them apart.
 */
export function useColorModeOverride(): [ColorMode, (next: ColorMode) => void] {
  const global = useGlobalColorMode()
  const [mode, setMode] = React.useState<ColorMode>(global)
  React.useEffect(() => setMode(global), [global])
  return [mode, setMode]
}

export function ColorModeOverride({
  value,
  onValueChange,
  label,
}: {
  value: ColorMode
  onValueChange: (next: ColorMode) => void
  label: string
}) {
  return <ModeSegments value={value} onValueChange={onValueChange} label={label} />
}
