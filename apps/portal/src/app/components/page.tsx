import { SiteHeader } from "@/components/SiteHeader"

export const metadata = { title: "Components — DBUI" }

/**
 * Storybook hosted inside the site chrome rather than linked away, so the top
 * nav stays put and Components reads as part of the portal.
 *
 * In development it points at the running Storybook; in production it points at
 * the static build, which `yarn build:site` emits into public/storybook. It is
 * an iframe rather than a proxy because Storybook serves its assets from
 * absolute paths, which a path rewrite would break.
 */
const STORYBOOK_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:6006"
    : "/storybook/index.html"

export default function ComponentsPage() {
  return (
    <div className="flex h-screen flex-col">
      <SiteHeader />
      <iframe
        src={STORYBOOK_URL}
        title="DBUI components"
        className="min-h-0 w-full flex-1 border-0"
      />
    </div>
  )
}
