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
    ]
  },
}

export default createMDX()(nextConfig)
