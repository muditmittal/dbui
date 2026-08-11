// DBUI Chat — chat-thread components for agentic and conversational interfaces
//
// Requires the dbui token layer:
//   @import "dbui/tokens/globals.css";
//
// Charts inside chat widgets come from dbui-viz, which needs no token layer
// beyond the one above.
//
// A component earns a place here only if it carries chat-specific behavior, a
// durable state model, or a visual contract that must hold across products. An
// arrangement of Button, Tooltip or Spinner is a recipe, and recipes live in the
// stories and the gallery rather than in this barrel.

// Behavior — no Figma counterpart, because there is nothing static to draw.
export {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
  ConversationEmpty,
  useConversation,
} from "./components/conversation"
export { Response, type ResponseProps } from "./components/response"

// A turn.
export { Message, MessageContent } from "./components/message"
export {
  PromptInput,
  PromptInputContext,
  PromptInputTextarea,
  PromptInputActions,
  PromptInputSubmit,
  type PromptInputProps,
} from "./components/prompt-input"

// The trace of a run. Reasoning is the thinking, Task is one step that happened,
// Plan is the steps intended, Sources says what the answer rests on.
export { Reasoning, type ReasoningProps } from "./components/reasoning"
export { Task, TaskItem, type TaskProps, type TaskItemProps, type TaskStatus } from "./components/task"
export { Plan, PlanItem, type PlanProps, type PlanItemProps, type PlanItemStatus } from "./components/plan"
export { Sources, Source, type SourcesProps, type SourceProps } from "./components/sources"

// Widgets — interactive answers the agent renders inline, rather than describing.
export {
  Details,
  DetailsHeader,
  DetailsRows,
  DetailsRow,
  DetailsFooter,
  type DetailsHeaderProps,
  type DetailsRowProps,
} from "./components/details"

// Types
export type {
  ChatStatus,
  MessageRole,
  PromptContextItem,
  PromptSubmission,
  SourceRef,
} from "./lib/types"

// Utilities
export { cn } from "./lib/utils"
