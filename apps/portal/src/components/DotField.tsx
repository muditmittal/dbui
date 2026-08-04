"use client"

import * as React from "react"

/**
 * A grid of dots that scatters away from the cursor and settles back.
 *
 * Canvas 2D rather than WebGL: the effect is a grid displacement, which needs no
 * GPU shader, and this way the page carries no 3D dependency. Roughly 2,000 dots
 * at a typical hero size, which stays comfortably inside a frame budget because
 * the per-dot work is a lerp and an arc.
 *
 * Honours prefers-reduced-motion by rendering the grid at rest and never
 * animating it.
 */

const SPACING = 22
const DOT_RADIUS = 1
const INFLUENCE = 150
const PUSH = 26
/** How fast a dot returns to its anchor. Lower is floatier. */
const EASE = 0.12

type Dot = {
  ax: number
  ay: number
  x: number
  y: number
  vx: number
  vy: number
  accent: boolean
}

export function DotField({ className }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    // Read the palette from the tokens rather than hardcoding, so the field
    // follows the theme like everything else on the page.
    const styles = getComputedStyle(document.documentElement)
    const base = styles.getPropertyValue("--db-text-subtle").trim() || "#525252"
    const accent = styles.getPropertyValue("--db-link-base").trim() || "#2272B4"

    let dots: Dot[] = []
    let width = 0
    let height = 0
    let raf = 0
    const pointer = { x: -9999, y: -9999, active: false }

    function build() {
      const rect = canvas!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas!.width = Math.floor(width * dpr)
      canvas!.height = Math.floor(height * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      dots = []
      for (let y = SPACING / 2; y < height; y += SPACING) {
        for (let x = SPACING / 2; x < width; x += SPACING) {
          dots.push({
            ax: x,
            ay: y,
            x,
            y,
            vx: 0,
            vy: 0,
            // A sparse scatter of accent dots keeps the field from reading flat.
            accent: Math.random() < 0.06,
          })
        }
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height)

      for (const d of dots) {
        if (!reduced && pointer.active) {
          const dx = d.x - pointer.x
          const dy = d.y - pointer.y
          const dist = Math.hypot(dx, dy)
          if (dist < INFLUENCE && dist > 0.001) {
            // Falls off with distance, so the disturbance has a soft edge.
            const force = (1 - dist / INFLUENCE) ** 2 * PUSH
            d.vx += (dx / dist) * force * 0.12
            d.vy += (dy / dist) * force * 0.12
          }
        }

        // Spring back to the anchor; velocity decays so it settles rather than
        // oscillating forever.
        d.vx += (d.ax - d.x) * EASE
        d.vy += (d.ay - d.y) * EASE
        d.vx *= 0.72
        d.vy *= 0.72
        d.x += d.vx
        d.y += d.vy

        const offset = Math.hypot(d.x - d.ax, d.y - d.ay)
        // Displaced dots grow and brighten, so motion reads as energy.
        const lift = Math.min(offset / 18, 1)
        ctx!.globalAlpha = (d.accent ? 0.5 : 0.22) + lift * 0.45
        ctx!.fillStyle = d.accent ? accent : base
        ctx!.beginPath()
        ctx!.arc(d.x, d.y, DOT_RADIUS + lift * 1.4, 0, Math.PI * 2)
        ctx!.fill()
      }
      ctx!.globalAlpha = 1

      raf = requestAnimationFrame(draw)
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = true
    }

    function onPointerLeave() {
      pointer.active = false
    }

    build()
    draw()

    const observer = new ResizeObserver(build)
    observer.observe(canvas)
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    document.addEventListener("pointerleave", onPointerLeave)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
      document.removeEventListener("pointerleave", onPointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className={className} />
}
