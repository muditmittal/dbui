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
        order: [
          "Home",
          "Icons",
          "Tokens",
          "Actions",
          "Controls",
          "Content",
          "Overlays",
          "Compositions",
          "Surfaces",
        ],
      },
    },
  },
}

export default preview
