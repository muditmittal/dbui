/**
 * DBUI Drift Check
 *
 * Compares Figma component properties against local manifest files.
 * Run via: npx ts-node scripts/drift-check.ts
 *
 * Or more practically, tell Isaac "drift check" and he'll:
 * 1. Run this logic via Figma MCP
 * 2. Compare against specs/components/*.manifest.json
 * 3. Output a diff table
 * 4. Fix code if needed
 * 5. Update spreadsheet Col N with "Updated on MM/DD"
 *
 * This file documents the expected structure so the check can be
 * reproduced by any agent in any session.
 */

export interface ManifestFile {
  $component: string
  $figmaId: string
  $figmaUrl: string
  $codePath?: string
  $storyPath?: string
  variants?: Record<string, {
    figma: string[]
    code?: string[]
    mapping?: Record<string, string>
  }>
  props?: Record<string, {
    figmaType: string
    default: any
    code: string
  }>
  innerComponents?: Record<string, any>
  note?: string
}

export interface FigmaComponentProps {
  name: string
  type: "COMPONENT" | "COMPONENT_SET"
  variantCount: number
  properties: Record<string, {
    type: "VARIANT" | "BOOLEAN" | "TEXT" | "INSTANCE_SWAP"
    defaultValue: any
    variantOptions?: string[]
  }>
}

export interface DriftResult {
  component: string
  figmaId: string
  status: "no-drift" | "drift-found" | "error"
  changes: DriftChange[]
}

export interface DriftChange {
  type: "variant-added" | "variant-removed" | "variant-renamed" | "prop-added" | "prop-removed" | "default-changed" | "count-changed"
  property: string
  before: any
  after: any
}

/**
 * Figma MCP script to pull all component properties in one call.
 * Copy-paste this into use_figma when running drift check.
 */
export const FIGMA_PULL_SCRIPT = `
const page = figma.root.children.find(p => p.name === 'Components');
await figma.setCurrentPageAsync(page);

const manifests = MANIFEST_IDS; // Replace with actual IDs from manifest files

const results = {};
for (const [name, id] of Object.entries(manifests)) {
  const comp = page.findOne(n => n.id === id);
  if (!comp) { results[name] = { error: 'not found' }; continue; }
  const props = {};
  if (comp.componentPropertyDefinitions) {
    for (const [key, def] of Object.entries(comp.componentPropertyDefinitions)) {
      props[key] = { type: def.type, defaultValue: def.defaultValue, variantOptions: def.variantOptions };
    }
  }
  results[name] = {
    name: comp.name,
    type: comp.type,
    variantCount: comp.children?.length || 0,
    properties: props
  };
}
return results;
`

/**
 * Compare function — given a manifest and fresh Figma data, find diffs.
 */
export function compareManifestToFigma(
  manifest: ManifestFile,
  figma: FigmaComponentProps
): DriftChange[] {
  const changes: DriftChange[] = []

  // Check variant count
  if (manifest.variants) {
    for (const [propName, spec] of Object.entries(manifest.variants)) {
      if (!spec.figma) continue

      // Find matching Figma property
      const figmaProp = Object.entries(figma.properties).find(
        ([key]) => key === propName || key.startsWith(propName)
      )

      if (!figmaProp) {
        changes.push({
          type: "variant-removed",
          property: propName,
          before: spec.figma,
          after: null,
        })
        continue
      }

      const [, figmaDef] = figmaProp
      const figmaOptions = figmaDef.variantOptions || []

      // Check for added options
      for (const opt of figmaOptions) {
        if (!spec.figma.includes(opt)) {
          changes.push({
            type: "variant-added",
            property: propName,
            before: null,
            after: opt,
          })
        }
      }

      // Check for removed options
      for (const opt of spec.figma) {
        if (!figmaOptions.includes(opt)) {
          changes.push({
            type: "variant-removed",
            property: propName,
            before: opt,
            after: null,
          })
        }
      }

      // Check default changed
      if (figmaDef.defaultValue !== undefined) {
        const manifestDefault = spec.figma[0] // First option is usually default
        // Only flag if we can determine it changed
      }
    }
  }

  // Check boolean/text props
  if (manifest.props) {
    for (const [propName, spec] of Object.entries(manifest.props)) {
      const figmaProp = Object.entries(figma.properties).find(
        ([key]) => key.startsWith(propName) || key.includes(propName)
      )

      if (!figmaProp) {
        changes.push({
          type: "prop-removed",
          property: propName,
          before: spec,
          after: null,
        })
      }
    }

    // Check for new props in Figma not in manifest
    for (const [key, def] of Object.entries(figma.properties)) {
      const cleanKey = key.replace(/#\d+:\d+$/, "") // Remove Figma hash suffixes
      if (def.type === "VARIANT") continue // Variants handled above

      const inManifest = Object.keys(manifest.props || {}).some(
        (k) => key.startsWith(k) || key.includes(k) || cleanKey === k
      )
      if (!inManifest) {
        changes.push({
          type: "prop-added",
          property: cleanKey,
          before: null,
          after: { type: def.type, default: def.defaultValue },
        })
      }
    }
  }

  return changes
}

/**
 * Format drift results as a markdown table for output.
 */
export function formatDriftReport(results: DriftResult[]): string {
  const lines: string[] = []
  lines.push("## Drift Check Report — " + new Date().toISOString().split("T")[0])
  lines.push("")

  const drifted = results.filter((r) => r.status === "drift-found")
  const clean = results.filter((r) => r.status === "no-drift")
  const errors = results.filter((r) => r.status === "error")

  lines.push(`**${clean.length} clean** | **${drifted.length} with drift** | **${errors.length} errors**`)
  lines.push("")

  if (drifted.length === 0) {
    lines.push("No drift detected. All manifests match Figma.")
    return lines.join("\n")
  }

  lines.push("| Component | Change | Property | Before | After |")
  lines.push("|---|---|---|---|---|")

  for (const result of drifted) {
    for (const change of result.changes) {
      lines.push(
        `| ${result.component} | ${change.type} | ${change.property} | ${JSON.stringify(change.before) ?? "—"} | ${JSON.stringify(change.after) ?? "—"} |`
      )
    }
  }

  return lines.join("\n")
}
