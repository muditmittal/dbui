/**
 * dbui_get_rules
 *
 * Return composition rules ("Button.link must not have ButtonIcon",
 * "RadioTile must be inside RadioTileGroup", etc.) for a given component
 * or all components.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rules = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/rules.json"), "utf-8"))

export const tool = {
  name: "dbui_get_rules",
  description:
    "Return DBUI composition rules — design constraints ('Button.link must not have ButtonIcon', etc.) authored by humans for the system. Use BEFORE composing a component to know its constraints, or AFTER lint flags a violation to look up the rationale.",
  inputSchema: {
    type: "object",
    properties: {
      component: {
        type: "string",
        description: "Optional component name to filter rules (e.g. 'Button', 'Alert', 'RadioTile'). Leave empty for all rules.",
      },
      severity: {
        type: "string",
        enum: ["error", "warning"],
        description: "Optional severity filter.",
      },
    },
  },
}

export function run({ component, severity }) {
  let result = rules
  if (component) result = result.filter((r) => r.component === component)
  if (severity) result = result.filter((r) => r.severity === severity)
  return {
    component: component || "all",
    severity: severity || "all",
    count: result.length,
    rules: result,
  }
}
