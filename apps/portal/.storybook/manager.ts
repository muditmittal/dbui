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

  brandTitle: "DBUI",
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

  // action/primary — the neutral primary from the Stage B redesign
  colorPrimary: "#171717",
  colorSecondary: "#171717",

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

  fontBase:
    '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: '"SF Mono", SFMono-Regular, ui-monospace, "Cascadia Code", monospace',
})

addons.setConfig({
  theme: dbui,
  sidebar: {
    showRoots: true,
  },
})
