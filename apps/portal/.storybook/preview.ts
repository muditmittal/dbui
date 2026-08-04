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
        // Two roots, like Astryx: Docs is the theory, Components is the library.
        // Within each, the order is how a builder moves through them — read the
        // foundations, then browse the gallery, then reach for a component.
        order: [
          "Home",
          "Docs",
          ["Foundations", "Tooling"],
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
