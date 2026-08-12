import createMDX from "@next/mdx"

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The docs pages are authored as MDX, ported straight from Storybook.
  pageExtensions: ["ts", "tsx", "mdx"],
  // The workspace packages ship TypeScript source, not build output, so Next has
  // to compile them itself.
  transpilePackages: ["dbui", "dbui-shells", "dbui-viz", "dbui-chat"],

  async redirects() {
    return [
      // Humans use /install (React page). Agents fetch /install.md — keep that
      // URL stable so copied CLAUDE.md prompts and README instructions resolve
      // to the raw step list rather than HTML.
      {
        source: "/install.md",
        destination:
          "https://raw.githubusercontent.com/muditmittal/dbui/main/packages/dbui/install.md",
        permanent: false,
      },
      // `/docs/checks` was renamed to `/docs/standards` once Guidelines landed
      // beside it and the pair needed names that said which one binds. Kept
      // permanent because the old URL is in shipped docs and in agent prompts.
      //
      // Also in `vercel.json`, the way `/install.md` is. Vercel resolves its own
      // redirects before the app ever runs, so that copy is what serves
      // production; this one is what makes the URL work in `next dev`.
      {
        source: "/docs/checks",
        destination: "/docs/standards",
        permanent: true,
      },
    ]
  },
}

export default createMDX()(nextConfig)
