import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
  ConversationEmpty,
  Message,
  MessageContent,
  Response,
  Reasoning,
  Task,
  TaskItem,
  Plan,
  PlanItem,
  Sources,
  Source,
  PromptInput,
  PromptInputContext,
  PromptInputTextarea,
  PromptInputActions,
  PromptInputSubmit,
  type ChatStatus,
} from "dbui-chat"
import { Button, ButtonIcon } from "dbui/components/ui/button"
import { AiGradientIcon } from "dbui/components/ui/ai-gradient-icon"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "dbui/components/ui/tooltip"
import { At } from "dbui/components/icons/At"
import { Paperclip } from "dbui/components/icons/Paperclip"
import { Copy } from "dbui/components/icons/Copy"
import { ThumbsUp } from "dbui/components/icons/ThumbsUp"
import { ThumbsDown } from "dbui/components/icons/ThumbsDown"
import { Share } from "dbui/components/icons/Share"
import { Sparkle } from "dbui/components/icons/Sparkle"
import { Search } from "dbui/components/icons/Search"
import { Table as TableIcon } from "dbui/components/icons/Table"
import { FileDocument } from "dbui/components/icons/FileDocument"
import { Terminal } from "dbui/components/icons/Terminal"

const meta: Meta = {
  title: "Components/Chat/Thread",
  parameters: { layout: "padded" },
}

export default meta

const ANSWER = `I found **14 enterprise customers** with elevated renewal risk this quarter, representing **$8.6M in ARR**. The top 3 accounts to review are:

| Customer | ARR at risk | Main risk signal |
| --- | --- | --- |
| Northstar Health | $2.1M | Usage down 38% QoQ |
| Bell & Finch Retail | $1.7M | Open Sev 2 support issue |
| Atlas Benefits Group | $1.2M | No exec contact in 75 days |

Overall, the risk appears less related to churn history and more related to recent engagement drop-off.`

const CANNED_REPLY = `Here's the breakdown by region. \`us-east\` carries the largest share of at-risk ARR:

- **US East** — $4.2M across 6 accounts
- **US West** — $2.1M across 4 accounts
- **EMEA** — $1.6M across 3 accounts
- **APAC** — $0.7M across 1 account`

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[640px] w-full max-w-[760px] flex-col overflow-hidden rounded-2 border border-border-base bg-surface-base">
      {children}
    </div>
  )
}

function Piece({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-2 type-label-bold text-text-base">{title}</h3>
      <div className="flex flex-col gap-3 rounded-2 border border-border-base bg-surface-base p-4">
        {children}
      </div>
    </section>
  )
}

/**
 * The answer action row. This is a recipe, not a component — four ghost icon
 * Buttons with Tooltips, then the Sources trigger, which drops its list onto the
 * next line because the row wraps.
 */
function AnswerActions({ children }: { children?: React.ReactNode }) {
  const actions = [
    { label: "Copy", icon: <Copy /> },
    { label: "Good response", icon: <ThumbsUp /> },
    { label: "Bad response", icon: <ThumbsDown /> },
    { label: "Share", icon: <Share /> },
  ]

  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-1">
        {actions.map((action) => (
          <Tooltip key={action.label}>
            <TooltipTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={action.label}
                />
              }
            >
              {action.icon}
            </TooltipTrigger>
            <TooltipContent>{action.label}</TooltipContent>
          </Tooltip>
        ))}
        {children}
      </div>
    </TooltipProvider>
  )
}

/** A full thread: reasoning, an agent trace, a markdown answer, actions and sources. */
export const FullThread: StoryObj = {
  render: () => {
    interface Turn {
      id: string
      from: "user" | "assistant"
      text: string
      reasoning?: string
      duration?: number
      trace?: boolean
    }

    const [turns, setTurns] = React.useState<Turn[]>([
      { id: "t1", from: "user", text: "Can you show me our top at-risk renewals?" },
      {
        id: "t2",
        from: "assistant",
        text: ANSWER,
        reasoning:
          "Join the renewals table with recent usage telemetry and open support cases, then rank by ARR at risk. Certified metrics take priority over ad-hoc ones.",
        duration: 40,
        trace: true,
      },
    ])
    const [status, setStatus] = React.useState<ChatStatus>("ready")
    const [context, setContext] = React.useState([
      { id: "renewals", label: "renewals", detail: "sales_main.crm" },
    ])

    const handleSubmit = ({ text }: { text: string }) => {
      setTurns((prev) => [...prev, { id: `u${Date.now()}`, from: "user", text }])
      setStatus("submitted")

      window.setTimeout(() => {
        const id = `a${Date.now()}`
        setTurns((prev) => [...prev, { id, from: "assistant", text: "" }])
        setStatus("streaming")

        const words = CANNED_REPLY.split(" ")
        let cursor = 0
        const tick = window.setInterval(() => {
          cursor += 1
          setTurns((prev) =>
            prev.map((turn) =>
              turn.id === id
                ? { ...turn, text: words.slice(0, cursor).join(" ") }
                : turn
            )
          )
          if (cursor >= words.length) {
            window.clearInterval(tick)
            setStatus("ready")
          }
        }, 45)
      }, 700)
    }

    return (
      <Frame>
        <Conversation>
          <ConversationContent>
            {turns.map((turn) =>
              turn.from === "user" ? (
                <Message key={turn.id} from="user">
                  <MessageContent>{turn.text}</MessageContent>
                </Message>
              ) : (
                <Message key={turn.id} from="assistant">
                  <MessageContent>
                    {turn.reasoning ? (
                      <Reasoning duration={turn.duration} className="mb-2">
                        {turn.reasoning}
                      </Reasoning>
                    ) : null}
                    {turn.trace ? (
                      <div className="mb-3 flex flex-col gap-2">
                        <Task title="Searched the catalog">
                          <TaskItem icon={<Search />}>
                            modified_at &gt; now() - 7 days
                          </TaskItem>
                          <TaskItem icon={<TableIcon />}>sales_main.crm.renewals</TaskItem>
                        </Task>
                        <Plan count={3}>
                          <PlanItem status="done">Find accounts up for renewal</PlanItem>
                          <PlanItem status="done">Rank by ARR at risk</PlanItem>
                          <PlanItem status="active">Summarise the top three</PlanItem>
                        </Plan>
                      </div>
                    ) : null}
                    <Response>{turn.text}</Response>
                    {turn.text ? (
                      <div className="mt-2">
                        <AnswerActions>
                          <Sources count={2}>
                            <Source href="#" icon={<TableIcon />}>
                              sales_main.crm.renewals
                            </Source>
                            <Source href="#" icon={<FileDocument />}>
                              Renewal risk methodology
                            </Source>
                          </Sources>
                        </AnswerActions>
                      </div>
                    ) : null}
                  </MessageContent>
                </Message>
              )
            )}
            {status === "submitted" ? <Reasoning isStreaming /> : null}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <div className="border-t border-border-base p-3">
          <PromptInput accent="ai" onSubmit={handleSubmit}>
            <PromptInputContext
              items={context}
              onRemove={(id) =>
                setContext((prev) => prev.filter((item) => item.id !== id))
              }
            />
            <PromptInputTextarea placeholder="Ask genie..." />
            <PromptInputActions>
              <div className="flex items-center gap-0.5">
                <Button variant="ghost" size="icon-sm" aria-label="Mention an object">
                  <At />
                </Button>
                <Button variant="ghost" size="icon-sm" aria-label="Attach a file">
                  <Paperclip />
                </Button>
              </div>
              <PromptInputSubmit status={status} />
            </PromptInputActions>
          </PromptInput>
          <p className="mt-2 text-center type-hint text-text-subtle">
            Check responses for accuracy
          </p>
        </div>
      </Frame>
    )
  },
}

/**
 * Empty state.
 *
 * The gradient is the AI signal, so it goes on the icons and nowhere else — the
 * composer stays quiet because it is chrome, the frame around Genie rather than
 * Genie. No rule above the composer either: it fades into the surface, so the
 * panel reads as one unit with the sections still in it.
 */
export const EmptyState: StoryObj = {
  render: () => (
    <Frame>
      <Conversation>
        <ConversationContent className="h-full p-0">
          <ConversationEmpty
            title="Genie"
            description="Ask Genie to fix issues faster."
            media={
              <AiGradientIcon>
                <Sparkle className="size-12" />
              </AiGradientIcon>
            }
          >
            {["Investigate", "Assign", "Fix"].map((item) => (
              <Button key={item} variant="secondary" size="md">
                <ButtonIcon>
                  <AiGradientIcon>
                    <Sparkle />
                  </AiGradientIcon>
                </ButtonIcon>
                {item}
              </Button>
            ))}
          </ConversationEmpty>
        </ConversationContent>
      </Conversation>

      <div className="-mt-6 bg-gradient-to-t from-surface-base from-60% to-transparent p-3 pt-10">
        <PromptInput>
          <PromptInputTextarea placeholder="Ask" />
          <PromptInputActions>
            <div className="flex items-center gap-0.5">
              <Button variant="ghost" size="icon-sm" aria-label="Mention an object">
                <At />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Attach a file">
                <Paperclip />
              </Button>
            </div>
            <PromptInputSubmit />
          </PromptInputActions>
        </PromptInput>
        <p className="mt-2 text-center type-hint text-text-subtle">
          Always review the accuracy of responses.
        </p>
      </div>
    </Frame>
  ),
}

/** Message — the user turn is a full-width filled box, the assistant sits flush. */
export const Messages: StoryObj = {
  render: () => (
    <div className="flex max-w-[440px] flex-col gap-4">
      <Message from="user">
        <MessageContent>
          Submitted prompt from the user goes here. This can include image, and other
          media as well.
        </MessageContent>
      </Message>
      <Message from="assistant">
        <MessageContent>
          Response from the system back to the user. This text response can include
          formatted text styling, links, mentions, tags, etc.
        </MessageContent>
      </Message>
    </div>
  ),
}

/** Reasoning — streaming with no body is the waiting state; with a body it discloses. */
export const ReasoningStates: StoryObj = {
  render: () => (
    <div className="flex max-w-[440px] flex-col gap-6">
      <Piece title="Waiting — no body, so it is a live status row">
        <Reasoning isStreaming />
        <Reasoning isStreaming label="Searching catalog" />
      </Piece>
      <Piece title="Settled — a body makes it a disclosure">
        <Reasoning duration={12}>
          Checked the catalog for tables with a modified_at inside the last seven days,
          then ranked them by row delta.
        </Reasoning>
        <Reasoning label="Waiting for user response">
          Paused until the reviewer confirms the join key.
        </Reasoning>
      </Piece>
    </div>
  ),
}

/** Task — one tool call, in each of its three states. */
export const Tasks: StoryObj = {
  render: () => (
    <div className="flex max-w-[440px] flex-col gap-6">
      <Piece title="States">
        <Task title="Searched the catalog" defaultOpen>
          <TaskItem icon={<Search />}>modified_at &gt; now() - 7 days</TaskItem>
          <TaskItem icon={<TableIcon />}>main.sales.orders</TaskItem>
        </Task>
        <Task title="Ran a query" status="running" />
        <Task title="Read schema" status="error" />
      </Piece>

      <Piece title="Rows without an icon keep the column">
        <Task title="Ran a query" defaultOpen>
          <TaskItem icon={<Terminal />}>SELECT 1</TaskItem>
          <TaskItem>Returned 14 rows in 382 ms</TaskItem>
          <TaskItem icon={<TableIcon />}>sales_main.crm.renewals</TaskItem>
        </Task>
      </Piece>
    </div>
  ),
}

/** Plan — the checklist, open by default while a run is in flight. */
export const Plans: StoryObj = {
  render: () => (
    <div className="flex max-w-[440px] flex-col gap-6">
      <Plan count={4}>
        <PlanItem status="done">Find tables changed this week</PlanItem>
        <PlanItem status="active" description="Ranking by row delta">
          Measure the size of each change
        </PlanItem>
        <PlanItem status="pending">Summarise the largest three</PlanItem>
        <PlanItem status="cancelled">Check downstream dashboards</PlanItem>
      </Plan>
      <Plan count={4} defaultOpen={false} />
    </div>
  ),
}

/** Sources — the trigger sits in the action row, the list takes the line below. */
export const SourcesInActionRow: StoryObj = {
  render: () => (
    <div className="max-w-[440px]">
      <AnswerActions>
        <Sources count={3}>
          <Source href="#" icon={<TableIcon />}>
            main.sales.orders
          </Source>
          <Source href="#" icon={<TableIcon />}>
            main.sales.customers
          </Source>
          <Source href="#" icon={<FileDocument />}>
            Weekly pipeline runbook
          </Source>
        </Sources>
      </AnswerActions>
    </div>
  ),
}

/** Prompt Input — default border, AI gradient border, and the streaming swap. */
export const Composer: StoryObj = {
  render: () => {
    const [status, setStatus] = React.useState<ChatStatus>("ready")

    return (
      <div className="flex max-w-[440px] flex-col gap-6">
        <Piece title="Default">
          <PromptInput>
            <PromptInputTextarea placeholder="Ask genie..." />
            <PromptInputActions>
              <PromptInputSubmit />
            </PromptInputActions>
          </PromptInput>
        </Piece>

        <Piece title="Genie accent, with context and tools">
          <PromptInput accent="ai">
            <PromptInputContext
              items={[{ id: "orders", label: "orders", detail: "main.sales" }]}
            />
            <PromptInputTextarea placeholder="Ask genie..." />
            <PromptInputActions>
              <div className="flex items-center gap-0.5">
                <Button variant="ghost" size="icon-sm" aria-label="Mention an object">
                  <At />
                </Button>
              </div>
              <PromptInputSubmit status={status} />
            </PromptInputActions>
          </PromptInput>
          <Button
            variant="outline"
            size="sm"
            className="self-start"
            onClick={() =>
              setStatus((prev) => (prev === "ready" ? "streaming" : "ready"))
            }
          >
            Toggle status (currently {status})
          </Button>
        </Piece>
      </div>
    )
  },
}

/** Response — markdown coverage, including a dbui table. */
export const ResponseMarkdown: StoryObj = {
  render: () => (
    <div className="max-w-[560px]">
      <Response>
        {`### Headings, lists and code

1. Ordered items render with decimal markers
2. Inline \`code\` uses the code-background token

> Blockquotes are muted with a left rule

\`\`\`sql
SELECT customer_name, arr_at_risk
FROM sales_main.crm.renewals
WHERE risk_score > 0.8
\`\`\`

| Metric | Value |
| --- | --- |
| Queries | 21,437 |
| P90 latency | 382 ms |`}
      </Response>
    </div>
  ),
}
