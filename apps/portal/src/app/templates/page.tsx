import { redirect } from "next/navigation"

/**
 * The shells moved into the docs rail, where the redesigned navigation puts them
 * beside Components and Layout. This route stays so bookmarks and the links
 * already written against it keep landing on the page that replaced it.
 */
export default function TemplatesPage() {
  redirect("/docs/shells")
}
