import type { StorybookConfig } from "@storybook/react-webpack5"
import path from "path"

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
  ],
  typescript: {
    check: false,
    reactDocgen: false,
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  // staticDirs: ["../public"],
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        // Listed before "dbui" so the longer package names win.
        "dbui-viz": path.resolve(__dirname, "../../../packages/dbui-viz/src"),
        "dbui-genie": path.resolve(__dirname, "../../../packages/dbui-genie/src"),
        "dbui": path.resolve(__dirname, "../../../packages/dbui/src"),
        // Subpath aliases match the new src/{shells,compositions,components}/ folders
        "dbui-shells/shell": path.resolve(__dirname, "../../../packages/dbui-shells/src/shells/Base.tsx"),
        "dbui-shells/catalog": path.resolve(__dirname, "../../../packages/dbui-shells/src/shells/CatalogExplorer.tsx"),
        "dbui-shells/shells": path.resolve(__dirname, "../../../packages/dbui-shells/src/shells"),
        "dbui-shells/compositions": path.resolve(__dirname, "../../../packages/dbui-shells/src/compositions"),
        "dbui-shells/components": path.resolve(__dirname, "../../../packages/dbui-shells/src/components"),
        "dbui-shells": path.resolve(__dirname, "../../../packages/dbui-shells/src"),
        "@/components/icons": path.resolve(__dirname, "../../../packages/dbui/src/components/icons"),
        "@": path.resolve(__dirname, "../src"),
      }
    }

    // Raw source imports: import src from "dbui/components/ui/button?raw"
    config.module.rules.push({
      resourceQuery: /raw/,
      type: "asset/source",
    })

    // TypeScript support via ts-loader (skip ?raw imports)
    config.module.rules = config.module.rules || []
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /node_modules\/(?!dbui|dbui-shells)/,
      resourceQuery: { not: [/raw/] },
      use: [
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            configFile: path.resolve(__dirname, "../tsconfig.json"),
          },
        },
      ],
    })

    // Support CSS imports (Tailwind via PostCSS)
    config.module = config.module || { rules: [] }
    config.module.rules = config.module.rules || []
    // Remove any existing CSS rules
    config.module.rules = config.module.rules.filter(
      (rule) => rule && typeof rule === "object" && rule.test?.toString() !== "/\\.css$/"
    )
    // Add PostCSS loader for Tailwind v4
    config.module.rules.push({
      test: /\.css$/,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [require("@tailwindcss/postcss")({ base: path.resolve(__dirname, "../../..") })],
            },
          },
        },
      ],
    })

    return config
  },
}

export default config
