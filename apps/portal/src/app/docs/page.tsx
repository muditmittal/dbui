import { redirect } from "next/navigation"

/**
 * There is no docs landing page. An index that only lists the nav is a page a
 * reader passes through, so `/docs` drops straight onto the first thing worth
 * reading. The layer model that used to live here moved to `/docs/foundations`,
 * which is where it belongs.
 */
export default function DocsIndex() {
  redirect("/docs/principles")
}
