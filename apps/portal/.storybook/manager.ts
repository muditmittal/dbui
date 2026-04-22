import { addons } from "@storybook/manager-api"

addons.setConfig({
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
  },
  initialActive: "canvas",
})

// Redirect bare URL or unknown paths to the DBUI landing page
if (window.location.search === "" || window.location.search === "?") {
  window.location.search = "?path=/story/dbui--default"
}

// Catch 404s: if the story iframe fails to load, redirect to home
window.addEventListener("message", (e) => {
  try {
    const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data
    if (data?.type === "storybook/docs-renderer" && data?.args?.[0]?.type === "error") {
      window.location.search = "?path=/story/dbui--default"
    }
  } catch {}
})
