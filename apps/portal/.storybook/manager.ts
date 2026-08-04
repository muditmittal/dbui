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
  // Inlined rather than served: staticDirs is off, and the manager is a
  // separate bundle that cannot import from src. Cropped to the wordmark and
  // filled with text/strong so it matches the sidebar rather than pure black.
  brandImage:
    "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%2224%2024%20190%2068%22%20fill%3D%22%23171717%22%3E%3Cpath%20d%3D%22M194.633%2039.0781C189.281%2039.0781%20185.922%2036.1875%20185.922%2031.5391C185.922%2026.8906%20189.281%2024%20194.633%2024C199.984%2024%20203.344%2026.8906%20203.344%2031.5391C203.344%2036.1875%20199.984%2039.0781%20194.633%2039.0781ZM213.5%2090.4062H174.672V80.0938H187.953V57.2422H175.805V46.9297H201.273V80.0938H213.5V90.4062Z%22%2F%3E%3Cpath%20d%3D%22M165.258%2046.9297V90.4062H151.82V83.3359H151.078C149.086%2088.4922%20144.555%2091.4219%20138.539%2091.4219C129.086%2091.4219%20124.008%2085.7188%20124.008%2075.0156V46.9297H137.836V71.9297C137.836%2077.4766%20139.984%2080.1328%20144.477%2080.1328C148.812%2080.1328%20151.469%2076.9688%20151.469%2071.7734V46.9297H165.258Z%22%2F%3E%3Cpath%20d%3D%22M101.586%2091.0703C95.1016%2091.0703%2090.9609%2087.9844%2089.9844%2082.4375H89.125V90.4062H74.7109V30.6406H89.2031V54.7031H90.0625C91.1953%2049.2344%2095.3359%2046.1875%20101.586%2046.1875C111.508%2046.1875%20116.898%2052.8281%20116.898%2065.0547V72.2031C116.898%2084.4297%20111.508%2091.0703%20101.586%2091.0703ZM95.8047%2079.8594C100.219%2079.8594%20102.758%2077.0859%20102.758%2072.2812V64.5469C102.758%2059.7422%20100.219%2056.9688%2095.8047%2056.9688C91.3906%2056.9688%2088.8516%2059.7422%2088.8516%2064.5469V72.2812C88.8516%2077.0859%2091.3906%2079.8594%2095.8047%2079.8594Z%22%2F%3E%3Cpath%20d%3D%22M39.3594%2091.0703C29.4375%2091.0703%2024.0469%2084.4297%2024.0469%2072.2031V65.0547C24.0469%2052.8281%2029.4375%2046.1875%2039.3594%2046.1875C45.6094%2046.1875%2049.75%2049.2344%2050.8828%2054.7031H51.7422V30.6406H66.2344V90.4062H51.8203V82.4375H50.9609C49.9844%2087.9844%2045.8438%2091.0703%2039.3594%2091.0703ZM45.1406%2079.8594C49.5547%2079.8594%2052.0938%2077.0859%2052.0938%2072.2812V64.5469C52.0938%2059.7422%2049.5547%2056.9688%2045.1406%2056.9688C40.7266%2056.9688%2038.1875%2059.7422%2038.1875%2064.5469V72.2812C38.1875%2077.0859%2040.7266%2079.8594%2045.1406%2079.8594Z%22%2F%3E%3C%2Fsvg%3E",
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
