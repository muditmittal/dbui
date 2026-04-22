import { addons } from "@storybook/manager-api"

addons.setConfig({
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
  },
  initialActive: "canvas",
})

// Redirect bare URL to the DBUI landing page
if (window.location.search === "" || window.location.search === "?") {
  window.location.search = "?path=/story/dbui--default"
}
