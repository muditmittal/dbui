import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "components/conversation": "src/components/conversation.tsx",
    "components/message": "src/components/message.tsx",
    "components/response": "src/components/response.tsx",
    "components/reasoning": "src/components/reasoning.tsx",
    "components/prompt-input": "src/components/prompt-input.tsx",
    "components/task": "src/components/task.tsx",
    "components/plan": "src/components/plan.tsx",
    "components/sources": "src/components/sources.tsx",
    "components/details": "src/components/details.tsx",
    "lib/utils": "src/lib/utils.ts",
    "lib/types": "src/lib/types.ts",
  },
  format: ["esm"],
  dts: false,
  sourcemap: true,
  splitting: true,
  treeshake: true,
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    // dbui is vendored into the consuming app, not bundled here.
    /^dbui/,
  ],
  noExternal: ["clsx", "tailwind-merge"],
  outDir: "dist",
  clean: true,
  jsx: "automatic",
  banner: { js: '"use client";' },
})
