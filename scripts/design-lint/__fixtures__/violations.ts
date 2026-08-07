/**
 * The module-scope half of the fixture. Deliberately wrong — see violations.tsx.
 *
 * A .ts file with no JSX in it, because that is the shape every rule used to
 * miss: dbui-viz held 63 hexes in exactly this form and reported clean.
 */

// no-module-color-literal — a palette written into a module has one value in
// both modes, whether or not the hex is on the allowlist.
export const seriesPalette = {
  pink: "#F06292",
  teal: "#3FC3BD",
}

export const scrim = "rgba(0, 0, 0, 0.72)"
