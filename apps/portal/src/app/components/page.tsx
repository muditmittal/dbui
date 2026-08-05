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

/**
 * `?path=` is forwarded into the frame so a gallery tile on /docs/components can
 * open one component. Storybook reads the same parameter, so the route needs to
 * pass it through rather than translate it. Anything that is not a story id is
 * dropped: the value lands in a frame URL.
 */
export default async function ComponentsPage({
  searchParams,
}: {
  searchParams: Promise<{ path?: string }>
}) {
  const { path } = await searchParams
  const story = /^\/story\/[a-z0-9-]+$/i.test(path ?? "") ? path : null
  const src = story ? `${STORYBOOK_URL}/?path=${story}` : STORYBOOK_URL

  return (
    <div className="flex h-screen flex-col">
      <SiteHeader />
      <iframe src={src} title="DBUI components" className="min-h-0 w-full flex-1 border-0" />
    </div>
  )
}
