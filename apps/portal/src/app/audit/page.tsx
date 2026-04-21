"use client"

import { Button } from "dbui/components/ui/button"

// Force-state utility: applies visual state via inline styles + data attributes
function ForceState({ state, children }: { state: string; children: React.ReactNode }) {
  // We wrap in a div that applies CSS to force visual states on the child
  return (
    <div
      data-force-state={state}
      className="inline-flex"
      style={{ position: "relative" }}
    >
      {children}
    </div>
  )
}

const BUTTON_VARIANTS = ["default", "outline", "secondary", "ghost", "link", "destructive", "danger"] as const
const BUTTON_SIZES = ["md", "sm"] as const
const FIGMA_VARIANT_NAMES: Record<string, string> = {
  default: "Primary",
  outline: "Outline",
  secondary: "Secondary",
  ghost: "Ghost",
  link: "Link",
  destructive: "Destructive",
  danger: "Danger",
}

export default function AuditPage() {
  return (
    <div className="p-8 bg-background text-foreground" style={{ fontFamily: "SF Pro Text, system-ui, sans-serif" }}>
      <h1 className="text-[32px] font-semibold mb-8">Component Audit</h1>

      {/* ─── Button ─── */}
      <section className="mb-16">
        <h2 className="text-[22px] font-semibold mb-4">Button</h2>
        <p className="text-[13px] text-muted-foreground mb-6">7 variants × 2 sizes × 6 states = 82 variants (Link has no Loading)</p>

        {BUTTON_VARIANTS.map((variant) => (
          <div key={variant} className="mb-8">
            <h3 className="text-[13px] font-semibold mb-3">{FIGMA_VARIANT_NAMES[variant]}</h3>
            <table className="border-collapse">
              <thead>
                <tr>
                  <th className="text-[12px] font-semibold text-muted-foreground text-left pr-6 pb-2 w-20">Size</th>
                  <th className="text-[12px] font-semibold text-muted-foreground text-center px-4 pb-2">Default</th>
                  <th className="text-[12px] font-semibold text-muted-foreground text-center px-4 pb-2">Hover</th>
                  <th className="text-[12px] font-semibold text-muted-foreground text-center px-4 pb-2">Press</th>
                  <th className="text-[12px] font-semibold text-muted-foreground text-center px-4 pb-2">Focus</th>
                  <th className="text-[12px] font-semibold text-muted-foreground text-center px-4 pb-2">Disabled</th>
                  {variant !== "link" && (
                    <th className="text-[12px] font-semibold text-muted-foreground text-center px-4 pb-2">Loading</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {BUTTON_SIZES.map((size) => (
                  <tr key={size}>
                    <td className="text-[12px] text-muted-foreground pr-6 py-3">{size === "md" ? "Default" : "Small"}</td>
                    <td className="px-4 py-3">
                      <Button variant={variant} size={size}>Label</Button>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant={variant} size={size} className="[&]:bg-[var(--hover)] [&]:border-[var(--primary)] [&]:text-[var(--primary-hover)]">Label</Button>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant={variant} size={size} className="[&]:bg-[var(--press)]">Label</Button>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant={variant} size={size} className="[&]:border-2 [&]:border-[var(--ring)]">Label</Button>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant={variant} size={size} disabled>Label</Button>
                    </td>
                    {variant !== "link" && (
                      <td className="px-4 py-3">
                        <Button variant={variant} size={size} loading>Label</Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </section>
    </div>
  )
}
