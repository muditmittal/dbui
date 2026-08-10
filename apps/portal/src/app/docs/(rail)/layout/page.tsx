import { LayoutDoc } from "@/components/LayoutDoc"

export const metadata = { title: "Layout — DBUI" }

/**
 * A route segment named `layout` sitting beside `docs/layout.tsx`, which is the
 * docs layout component. Next resolves the file as the segment's layout and the
 * directory as a child segment, so the two do not collide — but the names are
 * one character apart and a file moved into the wrong one silently replaces the
 * chrome for every docs page.
 */
export default function LayoutPage() {
  return <LayoutDoc />
}
