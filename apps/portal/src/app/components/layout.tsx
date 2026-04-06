import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Components — DBUI",
  description:
    "Browse DBUI components built on shadcn/ui with DuBois theming. Live previews, variant explorer, and usage examples.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
