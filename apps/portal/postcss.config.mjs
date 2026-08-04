import path from "node:path"

/**
 * Tailwind v4 runs as a PostCSS plugin. Storybook configures this inline in
 * .storybook/main.ts; Next needs it here.
 *
 * `base` points at the repo root because the `@source` globs in globals.css are
 * written relative to it, so Tailwind scans the whole workspace rather than just
 * this app. Derived from cwd because Turbopack's module runtime resolves
 * `new URL(...)` as an import and leaves `import.meta.dirname` undefined; Next
 * always runs with cwd at the app directory.
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {
      base: path.resolve(process.cwd(), "..", ".."),
    },
  },
}

export default config
