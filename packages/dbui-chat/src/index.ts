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
  MessageThumbnail,
  type MessageThumbnailProps,
} from "./components/message-thumbnail"
export {
  PromptInput,
  PromptInputContext,
  PromptInputTextarea,
  PromptInputActions,
  PromptInputSubmit,
  type PromptInputProps,
} from "./components/prompt-input"

// The row that acts on an answer. A component rather than a recipe because the
// feedback pair is one value and not two toggles, and copy has a confirmed state
// — both are behaviour the call sites should not each reimplement.
export {
  MessageActions,
  type MessageActionsProps,
  type MessageFeedback,
} from "./components/message-actions"

// The trace of a run. Reasoning is the thinking, Task is one step that happened,
// Plan is the steps intended, Sources says what the answer rests on.
export { Reasoning, type ReasoningProps } from "./components/reasoning"
export {
  Task,
  TaskItem,
  TaskInput,
  TaskOutput,
  type TaskProps,
  type TaskItemProps,
  type TaskIOProps,
  type TaskStatus,
} from "./components/task"
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


// The reader's side of the conversation. Confirmation blocks and needs an answer;
// Suggestion is ignorable by design. That difference is the whole reason both exist.
export { Confirmation, type ConfirmationProps, type ConfirmationState } from "./components/confirmation"
export { Suggestions, Suggestion, type SuggestionsProps, type SuggestionProps } from "./components/suggestion"

// The state of the work, and where a reader can return to.
export { Queue, QueueSection, QueueItem, type QueueSectionProps, type QueueItemProps, type QueueItemStatus } from "./components/queue"
export { Checkpoint, type CheckpointProps } from "./components/checkpoint"

// What the agent produced, as a handle rather than the thing itself.
export { Artifact, type ArtifactProps } from "./components/artifact"

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
