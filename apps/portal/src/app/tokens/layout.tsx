import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tokens — DBUI",
  description:
    "189 design tokens bridging Figma variables, DuBois semantics, and Tailwind utilities. Light and dark values with color swatches.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
