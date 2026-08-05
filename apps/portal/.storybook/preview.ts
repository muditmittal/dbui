import type { Preview } from "@storybook/react"
import "../src/app/globals.css"

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#1e1e1e" },
        { name: "muted", value: "#f5f5f5" },
      ],
    },
    options: {
      storySort: {
        method: "alphabetical",
        // Storybook is the component sandbox. The docs live in the Next.js site
        // under /docs, and so does the gallery. Storybook opens on the first
        // entry, which is why the landing page sits first and points at it.
        order: [
          "Components",
          [
            "Components",
            "Actions",
            "Controls",
            "Content",
            "Overlays",
            "Icons",
            "Viz",
            "Genie",
            "Compositions",
            "Shells",
          ],
        ],
      },
    },
  },
}

export default preview
