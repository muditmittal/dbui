/** @type {import('next').NextConfig} */
const nextConfig = {
  // The workspace packages ship TypeScript source, not build output, so Next has
  // to compile them itself.
  transpilePackages: ["dbui", "dbui-shells", "dbui-viz", "dbui-genie"],

  // Storybook builds into public/storybook, so it is served as static files
  // under /storybook without a second deployment.
  async redirects() {
    return [
      { source: "/components", destination: "/storybook/index.html", permanent: false },
      {
        source: "/install",
        destination:
          "https://raw.githubusercontent.com/muditmittal/dbui/main/packages/dbui/install.md",
        permanent: false,
      },
    ]
  },
}

export default nextConfig
