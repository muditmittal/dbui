import type { MDXComponents } from "mdx/types"

/**
 * Required by the App Router for MDX. The ported pages bring their own
 * primitives from DocKit, so this only needs to exist — there is nothing to map
 * globally, and mapping bare HTML here would fight DocKit's own styling.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return components
}
