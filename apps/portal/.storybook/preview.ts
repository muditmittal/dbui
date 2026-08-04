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
        // Storybook is the component sandbox now. The docs live in the Next.js
        // site under /docs; only the library and its galleries remain here.
        order: [
          "Home",
          "Components",
          [
            "Overview",
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
