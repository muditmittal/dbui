"use client"

import * as React from "react"

export interface Size {
  width: number
  height: number
}

/**
 * useMeasure — observe an element's content box.
 *
 * Vega needs explicit pixel dimensions to lay out marks. Rather than relying on
 * Vega-Lite's `width: "container"` (which mis-measures inside flex and grid
 * parents), every chart measures its own wrapper and passes real numbers into
 * the spec. This is what makes the charts responsive by default.
 */
export function useMeasure<T extends HTMLElement = HTMLDivElement>(): [
  React.RefObject<T | null>,
  Size,
] {
  const ref = React.useRef<T | null>(null)
  const [size, setSize] = React.useState<Size>({ width: 0, height: 0 })

  React.useEffect(() => {
    const element = ref.current
    if (!element) return

    const update = (width: number, height: number) => {
      setSize((prev) =>
        prev.width === width && prev.height === height
          ? prev
          : { width, height }
      )
    }

    const rect = element.getBoundingClientRect()
    update(Math.round(rect.width), Math.round(rect.height))

    if (typeof ResizeObserver === "undefined") return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const box = entry.contentRect
        update(Math.round(box.width), Math.round(box.height))
      }
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return [ref, size]
}
