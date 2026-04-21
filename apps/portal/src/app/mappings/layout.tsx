import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Token Mappings — DBUI",
  description:
    "Cross-reference table mapping Figma variables to DuBois tokens to Tailwind classes. 189 tokens with light/dark values.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
