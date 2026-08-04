"use client"

import * as React from "react"

import { Base } from "dbui-shells/shell"

/**
 * The real Base shell, scaled into browser chrome — not a screenshot.
 *
 * Rendered at a fixed 1440px and zoomed to fit, so the layout resolves at its
 * design width rather than reflowing into a phone layout inside a small frame.
 * Pointer events are captured so a stray click cannot navigate the preview.
 */
export function ShellPreview() {
  const ref = React.useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = React.useState(0.5)

  React.useEffect(() => {
    const update = () => {
      if (ref.current) setZoom(ref.current.offsetWidth / 1440)
    }
    update()
    const observer = new ResizeObserver(update)
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-lg border border-border-base bg-surface-base shadow-[var(--db-elevation-2)]"
    >
      <div className="flex items-center gap-3 border-b border-border-base bg-surface-subtle px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="block size-2.5 rounded-full bg-border-strong" />
          <span className="block size-2.5 rounded-full bg-border-strong" />
          <span className="block size-2.5 rounded-full bg-border-strong" />
        </div>
        <div className="type-hint flex-1 rounded-sm border border-border-base bg-surface-base px-3 py-1 text-text-subtle">
          databricks.com
        </div>
      </div>

      {/* Base sets h-screen; inside a scaled frame it has to fill the box instead. */}
      <style>{`#dbui-shell-preview > div { height: 100% !important; }`}</style>
      <div
        style={{ zoom, width: 1440, aspectRatio: "1440 / 860", overflow: "hidden" }}
        aria-hidden
      >
        <div
          id="dbui-shell-preview"
          style={{ height: "100%", pointerEvents: "none" }}
          tabIndex={-1}
        >
          <Base defaultActive="catalog">
            <div className="type-body flex h-full items-center justify-center text-text-subtle">
              Your page content goes here — every product page starts with this shell.
            </div>
          </Base>
        </div>
      </div>
    </div>
  )
}
