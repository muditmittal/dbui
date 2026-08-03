import { run as buildStructure } from "../src/tools/build-structure.js"
import { run as hydrate } from "../src/tools/hydrate.js"
import { run as validate } from "../src/tools/validate.js"
import { run as renderFigma } from "../src/tools/render-figma.js"
import { run as renderReact } from "../src/tools/render-react.js"

console.log("\n=== STAGE 1: build_structure ===")
const structure = buildStructure({
  shellProps: { defaultActive: "recents" },
  regions: [{ role: "list", description: "card listing recent items" }]
})
structure.regions[0].match = "Card"
structure.regions[0].matchKind = "component"
console.log(JSON.stringify(structure, null, 2))

console.log("\n=== STAGE 2: hydrate ===")
const hydrated = hydrate({
  structure,
  content: { list: { children: "Recent items go here" } }
})
console.log(JSON.stringify(hydrated, null, 2))

console.log("\n=== STAGE 3: validate ===")
const validation = validate({ spec: hydrated.spec })
console.log(JSON.stringify(validation, null, 2))

console.log("\n=== STAGE 4a: render_figma ===")
const figmaResult = renderFigma({ spec: hydrated.spec })
console.log({ ok: !!figmaResult.code, codeLines: figmaResult.code?.split("\n").length, warnings: figmaResult.warnings })

console.log("\n=== STAGE 4b: render_react (tsx mode) ===")
const reactResult = renderReact({ spec: hydrated.spec, mode: "tsx", name: "LoopTest" })
console.log(reactResult.tsx)
