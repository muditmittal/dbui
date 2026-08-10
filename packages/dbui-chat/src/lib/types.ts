/**
 * Runtime-agnostic types for Genie chat surfaces.
 *
 * Deliberately plain: no dependency on the `ai` package or any agent runtime, so
 * the same components can be driven by mock data, a scripted prototype, or a
 * real streaming backend.
 */

export type MessageRole = "user" | "assistant" | "system"

/** Lifecycle of the current turn. Drives the submit button and loaders. */
export type ChatStatus = "ready" | "submitted" | "streaming" | "error"

/** A cited source shown under or beside an assistant answer. */
export interface SourceRef {
  id?: string
  title: string
  href?: string
}

/** What the user typed plus anything they attached. */
export interface PromptSubmission {
  text: string
  files?: File[]
}

/** A pill describing the object a prompt is scoped to (asset, workspace, run). */
export interface PromptContextItem {
  id: string
  label: string
  /** Secondary text, e.g. a catalog path. */
  detail?: string
}
