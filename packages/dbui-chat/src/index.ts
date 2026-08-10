// DBUI Chat — chat-thread components for agentic and conversational interfaces
//
// Requires the dbui token layer:
//   @import "dbui/tokens/globals.css";
//
// Charts inside chat widgets come from dbui-viz, which needs no token layer
// beyond the one above.

export {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
  ConversationEmpty,
  useConversation,
} from "./components/conversation"
export { Message, MessageContent, MessageAvatar } from "./components/message"
export { Response, type ResponseProps } from "./components/response"
export { Reasoning, type ReasoningProps } from "./components/reasoning"
export {
  PromptInput,
  PromptInputContextBar,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
  PromptInputButton,
  PromptInputButtonIcon,
  PromptInputSubmit,
  type PromptInputProps,
} from "./components/prompt-input"
export { Suggestions, Suggestion, SuggestionIcon } from "./components/suggestion"
export { FollowUps, FollowUp } from "./components/follow-ups"
export { Actions, Action, type ActionProps } from "./components/actions"
export { Loader } from "./components/loader"

// Agentic — the trace of a run rather than a single answer. Task is one step that
// happened, Plan is the steps intended, Queue is what the user stacked up behind
// them, Checkpoint marks a seam to return to, Sources says what the answer rests on.
export { Task, TaskItem, type TaskProps, type TaskItemProps, type TaskStatus } from "./components/task"
export { Plan, PlanItem, type PlanProps, type PlanItemProps, type PlanItemStatus } from "./components/plan"
export { Queue, QueueItem, type QueueProps, type QueueItemProps } from "./components/queue"
export { Checkpoint, type CheckpointProps } from "./components/checkpoint"
export { Sources, Source, type SourcesProps, type SourceProps } from "./components/sources"

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
