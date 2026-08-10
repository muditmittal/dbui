import { redirect } from "next/navigation"

/**
 * The gallery moved to `/components`, which is where the top nav already sent
 * people and which now shows the grid rather than dropping them into Storybook.
 * This route stays so bookmarks and the links already written against it keep
 * landing on the page that replaced it.
 */
export default function ComponentsDocsPage() {
  redirect("/components")
}
