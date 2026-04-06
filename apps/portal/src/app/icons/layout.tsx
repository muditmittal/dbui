import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Icons — DBUI",
  description:
    "450 DuBois icons classified by usage role — action, object, indicator, and component. Searchable and synced from the Databricks codebase.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
