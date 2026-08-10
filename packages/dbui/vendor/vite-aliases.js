import { resolve } from "path"

/**
 * Vite resolve aliases for DBUI's vendored dependencies.
 * Import this in your vite.config.ts and spread into resolve.alias.
 *
 * Usage:
 *   import { dbuiAliases } from "./dbui/vendor/vite-aliases.js"
 *   export default defineConfig({
 *     resolve: { alias: { ...dbuiAliases } },
 *   })
 */
const vendor = (...segments) => resolve(process.cwd(), "dbui", "vendor", ...segments)

/**
 * Vite matches a string alias by prefix in insertion order, so the two named
 * subpath exports have to precede the bare `dbui-shells` entry. Behind it they
 * would resolve to `src/shell` and `src/catalog`, neither of which exists.
 * These two mirror the `exports` map in `dbui-shells/package.json`; every other
 * subpath already lines up with the `src` layout.
 */
export const dbuiAliases = {
  "dbui-shells/shell": resolve(process.cwd(), "dbui-shells", "src", "shells", "Base"),
  "dbui-shells/catalog": resolve(process.cwd(), "dbui-shells", "src", "shells", "CatalogExplorer"),
  "dbui": resolve(process.cwd(), "dbui", "src"),
  "dbui-shells": resolve(process.cwd(), "dbui-shells", "src"),

  "@base-ui/react": vendor("@base-ui/react"),
  "@base-ui/utils": vendor("@base-ui/utils"),
  "@babel/runtime": vendor("@babel/runtime"),
  "@floating-ui/react-dom": vendor("@floating-ui/react-dom"),
  "@floating-ui/dom": vendor("@floating-ui/dom"),
  "@floating-ui/core": vendor("@floating-ui/core"),
  "@floating-ui/utils": vendor("@floating-ui/utils"),
  "tabbable": vendor("tabbable"),
  "use-sync-external-store": vendor("use-sync-external-store"),
  "class-variance-authority": vendor("class-variance-authority"),
  "clsx": vendor("clsx"),
  "tailwind-merge": vendor("tailwind-merge"),
  "sonner": vendor("sonner"),
  "vaul": vendor("vaul"),
  "reselect": vendor("reselect"),
}
