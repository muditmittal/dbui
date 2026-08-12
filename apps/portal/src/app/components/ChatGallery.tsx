"use client"

import * as React from "react"
import Link from "next/link"

import {
  Conversation,
  ConversationContent,
  Details,
  DetailsFooter,
  DetailsHeader,
  DetailsRow,
  DetailsRows,
  Message,
  MessageContent,
  Plan,
  PlanItem,
  PromptInput,
  PromptInputActions,
  PromptInputSubmit,
  PromptInputTextarea,
  Reasoning,
  Response,
  Source,
  Sources,
  Task,
  TaskItem,
} from "dbui-chat"

import { Button } from "dbui/components/ui/button"
import { Copy } from "dbui/components/icons/Copy"
import { ThumbsUp } from "dbui/components/icons/ThumbsUp"
import { Table as TableIcon } from "dbui/components/icons/Table"
import { FileDocument } from "dbui/components/icons/FileDocument"
import { Search } from "dbui/components/icons/Search"
import { At } from "dbui/components/icons/At"

import { anchorOffset } from "@/components/docs/anchor"

/**
 * The Chat group, declared here rather than generated.
 *
 * Same seam as `ShellsGallery`: `gallery-data.ts` is built from
 * `component-index.md`, which is scoped to `packages/dbui` because the CLI and
 * `dbui doctor` count its rows. `dbui-chat` is a second package, so its rows are
 * written out here instead. Two hand-authored groups is the point at which this
 * should become one generated thing reading several packages — flagged rather than
 * fixed, because the generator change is larger than the two files it would replace.
 */

/** A thread-width column. Chat components are composed in a panel, not a page. */
function Panel({ children }: { children: React.ReactNode }) {
  return <div className="w-90">{children}</div>
}

const STORY = "components-chat-thread"

const CHAT: { name: string; storyId?: string; demo: React.ReactNode }[] = [
  {
    name: "Conversation",
    storyId: `${STORY}--full-thread`,
    demo: (
      <Panel>
        <div className="h-45 rounded-2 border border-border-base">
          <Conversation>
            <ConversationContent>
              <Message from="user">
                <MessageContent>Which tables changed this week?</MessageContent>
              </Message>
              <Message from="assistant">
                <MessageContent>
                  Four tables in main.sales were updated. The largest change was to orders.
                </MessageContent>
              </Message>
            </ConversationContent>
          </Conversation>
        </div>
      </Panel>
    ),
  },
  {
    name: "Message",
    storyId: `${STORY}--messages`,
    demo: (
      <Panel>
        <div className="flex flex-col gap-2">
          <Message from="user">
            <MessageContent>Which tables changed this week?</MessageContent>
          </Message>
          <Message from="assistant">
            <MessageContent>Four tables in main.sales were updated.</MessageContent>
          </Message>
        </div>
      </Panel>
    ),
  },
  {
    name: "Response",
    storyId: `${STORY}--response-markdown`,
    demo: (
      <Panel>
        <Response>{`Four tables changed. The largest was **orders**.

- \`main.sales.orders\` — 2.1M rows added
- \`main.sales.customers\` — schema change`}</Response>
      </Panel>
    ),
  },
  {
    name: "Reasoning",
    storyId: `${STORY}--reasoning-states`,
    demo: (
      <Panel>
        <div className="flex flex-col gap-2">
          <Reasoning isStreaming />
          <Reasoning duration={12}>
            Checked the catalog for tables with a modified_at inside the last seven days,
            then ranked them by row delta.
          </Reasoning>
        </div>
      </Panel>
    ),
  },
  {
    name: "Task",
    storyId: `${STORY}--tasks`,
    demo: (
      <Panel>
        <Task title="Searched the catalog" defaultOpen>
          <TaskItem icon={<Search />}>modified_at &gt; now() - 7 days</TaskItem>
          <TaskItem icon={<TableIcon />}>main.sales.orders</TaskItem>
        </Task>
        <Task title="Ran a query" status="running" />
        <Task title="Read schema" status="error" />
      </Panel>
    ),
  },
  {
    name: "Plan",
    storyId: `${STORY}--plans`,
    demo: (
      <Panel>
        <Plan count={4}>
          <PlanItem status="done">Find tables changed this week</PlanItem>
          <PlanItem status="active" description="Ranking by row delta">
            Measure the size of each change
          </PlanItem>
          <PlanItem status="pending">Summarise the largest three</PlanItem>
          <PlanItem status="cancelled">Check downstream dashboards</PlanItem>
        </Plan>
      </Panel>
    ),
  },
  {
    name: "Sources",
    storyId: `${STORY}--sources-in-action-row`,
    // Sources renders its trigger inline and its list on the next line, so the
    // demo shows it where it belongs: at the end of an answer's action row.
    demo: (
      <Panel>
        <div className="flex flex-wrap items-center gap-1">
          <Button variant="ghost" size="icon-sm" aria-label="Copy">
            <Copy />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Good response">
            <ThumbsUp />
          </Button>
          <Sources count={2} defaultOpen>
            <Source href="#" icon={<TableIcon />}>
              main.sales.orders
            </Source>
            <Source href="#" icon={<FileDocument />}>
              Weekly pipeline runbook
            </Source>
          </Sources>
        </div>
      </Panel>
    ),
  },
  {
    name: "Details",
    storyId: "components-chat-details--playground",
    demo: (
      <Panel>
        <Details>
          <DetailsHeader
            icon={<TableIcon />}
            title="user_accounts"
            path="main . user_management"
          />
          <DetailsRows defaultValue={["usage"]}>
            <DetailsRow value="details" label="Details" summary="Table" />
            <DetailsRow value="usage" label="Usage" summary="21,437">
              <p className="type-body text-text-subtle">
                Queried 21,437 times in the last 30 days.
              </p>
            </DetailsRow>
            <DetailsRow value="size" label="Size" summary="81.3 GB" />
          </DetailsRows>
          <DetailsFooter>As of 12 hours ago</DetailsFooter>
        </Details>
      </Panel>
    ),
  },
  {
    name: "Prompt Input",
    storyId: `${STORY}--composer`,
    demo: (
      <Panel>
        <PromptInput accent="ai">
          <PromptInputTextarea placeholder="Ask genie..." />
          <PromptInputActions>
            <Button variant="ghost" size="icon-sm" aria-label="Mention an object">
              <At />
            </Button>
            <PromptInputSubmit />
          </PromptInputActions>
        </PromptInput>
      </Panel>
    ),
  },
]

export const CHAT_GROUP = { id: "group-chat", label: "Chat" }

export function ChatGallery() {
  return (
    // No wrapper and no top margin: this renders inside the gallery's own column
    // now, between Content and Feedback, so the column's gap sets the spacing the
    // way it does for every other group.
    <section data-doc-generated id={CHAT_GROUP.id} style={anchorOffset}>
        <h2 className="type-title-4 text-text-strong">Chat</h2>
        <p className="type-body text-text-subtle">
          The parts of a conversation with an agent. Conversation and Response carry
          behavior; Message and Prompt Input render a turn; Reasoning, Task, Plan and
          Sources render the trace of a run — what it thought, what it did, what it
          plans, and what the answer rests on. Answer actions and starter prompts are
          Button recipes rather than components.
        </p>
        <div className="mt-2 divide-y divide-border-subtle border-t border-border-subtle">
          {CHAT.map((item) => (
            <div
              key={item.name}
              className="grid grid-cols-1 gap-x-8 gap-y-3 py-6 md:grid-cols-[15rem_minmax(0,1fr)]"
            >
              <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                {item.storyId ? (
                  <Link
                    href={`/components?path=/story/${item.storyId}`}
                    className="type-label-bold text-text-strong no-underline hover:text-text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span className="type-label-bold text-text-strong">{item.name}</span>
                )}
              </div>
              <div className="min-w-0">{item.demo}</div>
            </div>
          ))}
        </div>
    </section>
  )
}
