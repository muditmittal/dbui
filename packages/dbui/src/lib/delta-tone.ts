/**
 * The three readings a change can have, as type colours.
 *
 * Shared by `StatCard` and `MetricCard` because Figma shares it too — both cards
 * put `Viz/Inner/Metric` in their header, so a change line that differed between
 * them would be a divergence from one source component.
 *
 * Deliberately not re-exported from the package barrel: it is how the cards agree
 * with each other, not a surface a consumer composes against.
 *
 * `neutral` is the default rather than `positive`, because whether up is good is
 * the caller's business — a rise in failed runs is not an improvement.
 */
export const DELTA_TONE = {
  neutral: "text-text-base",
  positive: "text-status-text-positive",
  negative: "text-status-text-negative",
} as const

export type DeltaTone = keyof typeof DELTA_TONE
