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
type Mode = (typeof MODES)[number]

export const COLOR_MODE_KEY = "dbui-color-mode"

const isMode = (v: string | null | undefined): v is Mode => v === "light" || v === "dark"

/** Private browsing refuses both reads and writes, so every access is guarded. */
function storedMode(): Mode | null {
  try {
    const value = localStorage.getItem(COLOR_MODE_KEY)
    return isMode(value) ? value : null
  } catch {
    return null
  }
}

export function ColorModeControl() {
  const [mode, setMode] = React.useState<Mode>("light")

  const apply = React.useCallback((next: Mode, persist: boolean) => {
    setMode(next)
    document.documentElement.classList.toggle("dark", next === "dark")
    if (!persist) return
    try {
      localStorage.setItem(COLOR_MODE_KEY, next)
    } catch {
      // The mode still applies for this session, so there is nothing to say.
    }
  }, [])

  React.useEffect(() => {
    // Read the element rather than resolving the preference again. The pre-paint
    // script already answered this, and asking twice is how a control ends up
    // disagreeing with the page it controls.
    setMode(document.documentElement.classList.contains("dark") ? "dark" : "light")
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

  return (
    <SegmentControl
      size="md"
      value={[mode]}
      onValueChange={(next) => apply(isMode(next[0]) ? next[0] : "light", true)}
      aria-label="Color mode"
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
