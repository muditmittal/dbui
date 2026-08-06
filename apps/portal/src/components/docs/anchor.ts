/**
 * The offset a jump target has to clear: the site header plus whatever bar is
 * pinned under it.
 *
 * It lives in its own module because both sides need it. `StickyBar` measures
 * the two boxes and writes the property, and server-rendered sections consume it
 * as a scroll margin — and a server module cannot import a value out of a client
 * one. The fallback covers the frame before the bar has measured itself and the
 * page that anchors without one.
 */
export const ANCHOR_OFFSET_VAR = "--docs-anchor-offset"

export const anchorOffset = { scrollMarginTop: `var(${ANCHOR_OFFSET_VAR}, 8rem)` } as const
