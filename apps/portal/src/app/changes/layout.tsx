import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Changelog — DBUI",
  description:
    "Every update to the DBUI design system — tokens, icons, components, and portal changes.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
