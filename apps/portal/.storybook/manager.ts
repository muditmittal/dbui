import { addons } from "@storybook/manager-api"
import { create } from "@storybook/theming/create"

/**
 * Storybook's chrome — sidebar, toolbar, search — themed with DBUI's own token
 * values. The manager runs outside the preview iframe, so it cannot read the
 * CSS custom properties; these are the resolved light-mode values from
 * tokens.css and must be updated if those change.
 */
const dbui = create({
  base: "light",

  // Storybook is framed inside the portal at /components, where the site header
  // already carries the wordmark. A second logo directly beneath it was just
  // repetition, so this labels the section instead.
  brandTitle: "Components",
  brandUrl: "/",
  brandTarget: "_self",

  // surface/base, surface/subtle, border/base
  appBg: "#FAFAFA",
  appContentBg: "#FFFFFF",
  appPreviewBg: "#FFFFFF",
  appBorderColor: "#E5E5E5",
  appBorderRadius: 8,

  // text/base, text/subtle
  textColor: "#262626",
  textMutedColor: "#525252",
  textInverseColor: "#FFFFFF",

  // colorSecondary fills the selected sidebar row and the search focus ring.
  // A near-black here turns navigation into a primary button, so it carries the
  // neutral selected wash instead; manager-head.html holds the rest.
  colorPrimary: "#171717",
  colorSecondary: "#E5E5E5",

  // Toolbar
  barTextColor: "#525252",
  barSelectedColor: "#171717",
  barHoverColor: "#171717",
  barBg: "#FFFFFF",

  // Search and form controls
  inputBg: "#FFFFFF",
  inputBorder: "#E5E5E5",
  inputTextColor: "#262626",
  inputBorderRadius: 4,

  fontBase: '"Figtree", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: '"Commit Mono", ui-monospace, SFMono-Regular, "Cascadia Code", monospace',
})

addons.setConfig({
  theme: dbui,
  sidebar: {
    showRoots: true,
  },
})
