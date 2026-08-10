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
  PromptInput,
  PromptInputContextBar,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
  PromptInputButton,
  PromptInputSubmit,
  Suggestions,
  Suggestion,
  SuggestionIcon,
  FollowUps,
  FollowUp,
  Actions,
  Action,
  Loader,
  type ChatStatus,
} from "dbui-chat"
import { At } from "dbui/components/icons/At"
import { Paperclip } from "dbui/components/icons/Paperclip"
import { Copy } from "dbui/components/icons/Copy"
import { ThumbsUp } from "dbui/components/icons/ThumbsUp"
import { ThumbsDown } from "dbui/components/icons/ThumbsDown"
import { Overflow } from "dbui/components/icons/Overflow"
import { SparkleFill } from "dbui/components/icons/SparkleFill"
import { GenieCode } from "dbui/components/icons/GenieCode"

const meta: Meta = {
  title: "Components/Chat/Thread",
  parameters: { layout: "padded" },
}

export default meta

interface Turn {
  id: string
  from: "user" | "assistant"
  text: string
  reasoning?: string
  duration?: number
  followUps?: string[]
}

const ANSWER = `I found **14 enterprise customers** with elevated renewal risk this quarter, representing **$8.6M in ARR**. The top 3 accounts to review are:

| Customer | ARR at risk | Main risk signal |
| --- | --- | --- |
| Northstar Health | $2.1M | Usage down 38% QoQ |
| Bell & Finch Retail | $1.7M | Open Sev 2 support issue |
| Atlas Benefits Group | $1.2M | No exec contact in 75 days |

Overall, the risk appears less related to churn history and more related to recent engagement drop-off. I'd recommend prioritizing accounts with both declining usage and unresolved support activity.`

const INITIAL_TURNS: Turn[] = [
  {
    id: "t1",
    from: "user",
    text: "Can you show me our top at-risk renewals?",
  },
  {
    id: "t2",
    from: "assistant",
    text: ANSWER,
    reasoning:
      "The user wants at-risk renewals. I should join the renewals table with recent usage telemetry and open support cases, then rank by ARR at risk. Certified metrics take priority over ad-hoc ones.",
    duration: 40,
    followUps: [
      "Show me the full list of at-risk renewals with owner, ARR, and risk reason",
      "Break down renewal risk by region, segment, and account owner",
      "Create a reusable skill to identify high-risk renewals each week",
    ],
  },
]

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

function AssistantTurn({ turn }: { turn: Turn }) {
  return (
    <Message from="assistant">
      <MessageContent from="assistant">
        {turn.reasoning ? (
          <Reasoning duration={turn.duration} className="mb-2">
            {turn.reasoning}
          </Reasoning>
        ) : null}
        <Response>{turn.text}</Response>
        <Actions className="mt-2">
          <Action label="Copy">
            <Copy />
          </Action>
          <Action label="Good response">
            <ThumbsUp />
          </Action>
          <Action label="Bad response">
            <ThumbsDown />
          </Action>
          <Action label="More actions">
            <Overflow />
          </Action>
        </Actions>
        {turn.followUps?.length ? (
          <>
            <hr className="my-3 border-border-base" />
            <FollowUps>
              {turn.followUps.map((item) => (
                <FollowUp key={item}>{item}</FollowUp>
              ))}
            </FollowUps>
          </>
        ) : null}
      </MessageContent>
    </Message>
  )
}

/** A full thread: reasoning, markdown answer with a dbui table, actions, follow-ups. */
export const FullThread: StoryObj = {
  render: () => {
    const [turns, setTurns] = React.useState<Turn[]>(INITIAL_TURNS)
    const [status, setStatus] = React.useState<ChatStatus>("ready")
    const [context, setContext] = React.useState([
      { id: "renewals", label: "renewals", detail: "sales_main.crm" },
    ])

    const handleSubmit = ({ text }: { text: string }) => {
      const userTurn: Turn = { id: `u${Date.now()}`, from: "user", text }
      setTurns((prev) => [...prev, userTurn])
      setStatus("submitted")

      // Simulate a round trip, then stream the reply word by word.
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
      }, 600)
    }

    return (
      <Frame>
        <Conversation>
          <ConversationContent>
            {turns.map((turn) =>
              turn.from === "user" ? (
                <Message key={turn.id} from="user">
                  <MessageContent from="user">{turn.text}</MessageContent>
                </Message>
              ) : (
                <AssistantTurn key={turn.id} turn={turn} />
              )
            )}
            {status === "submitted" ? <Loader /> : null}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <div className="border-t border-border-base p-3">
          <PromptInput accent="ai" onSubmit={handleSubmit}>
            <PromptInputContextBar
              items={context}
              onRemove={(id) =>
                setContext((prev) => prev.filter((item) => item.id !== id))
              }
            />
            <PromptInputTextarea placeholder="Ask a question..." />
            <PromptInputFooter>
              <PromptInputTools>
                <PromptInputButton aria-label="Mention an object">
                  <At />
                </PromptInputButton>
                <PromptInputButton aria-label="Attach a file">
                  <Paperclip />
                </PromptInputButton>
              </PromptInputTools>
              <PromptInputSubmit status={status} />
            </PromptInputFooter>
          </PromptInput>
          <p className="mt-2 text-center text-[12px] leading-[16px] text-text-subtle">
            Always review the accuracy of responses.
          </p>
        </div>
      </Frame>
    )
  },
}

/** Empty state with starter suggestions. */
export const EmptyState: StoryObj = {
  render: () => (
    <Frame>
      <Conversation>
        <ConversationContent className="h-full">
          <ConversationEmpty
            title="Get it done with Databricks"
            description="Ask about your data, or pick a place to start."
            media={<GenieCode />}
          >
            <Suggestions className="justify-center">
              {["Analyze data", "Summarize text", "Review asset ownership"].map(
                (item) => (
                  <Suggestion key={item}>
                    <SuggestionIcon>
                      <SparkleFill />
                    </SuggestionIcon>
                    {item}
                  </Suggestion>
                )
              )}
            </Suggestions>
          </ConversationEmpty>
        </ConversationContent>
      </Conversation>
      <div className="border-t border-border-base p-3">
        <PromptInput accent="ai">
          <PromptInputTextarea placeholder="Ask a question..." />
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputButton aria-label="Mention an object">
                <At />
              </PromptInputButton>
            </PromptInputTools>
            <PromptInputSubmit />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </Frame>
  ),
}

/** Each part in isolation, for spec review against Figma. */
export const Pieces: StoryObj = {
  render: () => {
    const [status, setStatus] = React.useState<ChatStatus>("ready")

    return (
      <div className="flex max-w-[680px] flex-col gap-8">
        <Piece title="Reasoning — collapsed, streaming, and settled">
          <Reasoning isStreaming>Working through the request…</Reasoning>
          <Reasoning duration={40}>
            Joining renewals with usage telemetry, then ranking by ARR at risk.
          </Reasoning>
          <Reasoning label="Waiting for user response" />
        </Piece>

        <Piece title="Message — user vs assistant">
          <Message from="user">
            <MessageContent from="user">
              Can you show me our top at-risk renewals?
            </MessageContent>
          </Message>
          <Message from="assistant">
            <MessageContent from="assistant">
              <Response>
                {
                  "Assistant turns sit **flush** on the surface with no bubble, using `13px` body text."
                }
              </Response>
            </MessageContent>
          </Message>
        </Piece>

        <Piece title="Response — markdown coverage">
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
        </Piece>

        <Piece title="Loader">
          <Loader />
          <Loader label="Searching catalog" />
        </Piece>

        <Piece title="Actions">
          <Actions>
            <Action label="Copy">
              <Copy />
            </Action>
            <Action label="Good response">
              <ThumbsUp />
            </Action>
            <Action label="Bad response">
              <ThumbsDown />
            </Action>
          </Actions>
        </Piece>

        <Piece title="Suggestions">
          <Suggestions>
            {["Analyze data", "Summarize text", "Code"].map((item) => (
              <Suggestion key={item}>
                <SuggestionIcon>
                  <SparkleFill />
                </SuggestionIcon>
                {item}
              </Suggestion>
            ))}
          </Suggestions>
        </Piece>

        <Piece title="FollowUps">
          <FollowUps>
            <FollowUp>Break down renewal risk by region and segment</FollowUp>
            <FollowUp>Create a reusable skill for this check</FollowUp>
          </FollowUps>
        </Piece>

        <Piece title="PromptInput — default border vs AI gradient border">
          <PromptInput>
            <PromptInputTextarea placeholder="Default composer" />
            <PromptInputFooter>
              <PromptInputTools />
              <PromptInputSubmit />
            </PromptInputFooter>
          </PromptInput>
          <PromptInput accent="ai">
            <PromptInputTextarea placeholder="Genie composer" />
            <PromptInputFooter>
              <PromptInputTools>
                <PromptInputButton aria-label="Mention an object">
                  <At />
                </PromptInputButton>
              </PromptInputTools>
              <PromptInputSubmit status={status} />
            </PromptInputFooter>
          </PromptInput>
          <button
            type="button"
            className="self-start rounded-1 border border-input-border-base px-2 py-1 text-[12px] text-text-base hover:bg-action-default-hover"
            onClick={() =>
              setStatus((prev) => (prev === "ready" ? "streaming" : "ready"))
            }
          >
            Toggle status (currently {status})
          </button>
        </Piece>
      </div>
    )
  },
}

function Piece({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section>
      <h3 className="mb-2 text-[13px] leading-[20px] font-semibold text-text-base">
        {title}
      </h3>
      <div className="flex flex-col gap-3 rounded-2 border border-border-base bg-surface-base p-4">
        {children}
      </div>
    </section>
  )
}
