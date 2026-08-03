// DBUI Genie — chat-thread components for Databricks agentic interfaces
//
// Requires the dbui token layer:
//   @import "dbui/tokens/globals.css";
//
// Charts inside Genie widgets come from dbui-viz, which additionally needs
// dbui/tokens/viz.css.

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
