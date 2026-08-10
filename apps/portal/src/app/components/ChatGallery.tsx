"use client"

import * as React from "react"
import Link from "next/link"

import {
  Actions,
  Action,
  Checkpoint,
  Conversation,
  ConversationContent,
  FollowUps,
  FollowUp,
  Loader,
  Message,
  MessageContent,
  Plan,
  PlanItem,
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  Queue,
  QueueItem,
  Reasoning,
  Response,
  Source,
  Sources,
  Suggestion,
  Suggestions,
  Task,
  TaskItem,
} from "dbui-chat"

import { Copy } from "dbui/components/icons/Copy"
import { Refresh } from "dbui/components/icons/Refresh"
import { Table as TableIcon } from "dbui/components/icons/Table"
import { FileDocument } from "dbui/components/icons/FileDocument"
import { Terminal } from "dbui/components/icons/Terminal"
import { Search } from "dbui/components/icons/Search"

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
function Panel({
  children,
  width = "w-90",
}: {
  children: React.ReactNode
  width?: string
}) {
  return <div className={width}>{children}</div>
}

const CHAT: { name: string; storyId?: string; demo: React.ReactNode }[] = [
  {
    name: "Conversation",
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
    demo: (
      <Panel>
        <Message from="user">
          <MessageContent>Which tables changed this week?</MessageContent>
        </Message>
        <Message from="assistant">
          <MessageContent>Four tables in main.sales were updated.</MessageContent>
        </Message>
      </Panel>
    ),
  },
  {
    name: "Response",
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
    demo: (
      <Panel>
        <Reasoning duration={12}>
          Checked the catalog for tables with a modified_at inside the last seven days,
          then ranked them by row delta.
        </Reasoning>
      </Panel>
    ),
  },
  {
    name: "Task",
    demo: (
      <Panel>
        <Task title="Searched the catalog" defaultOpen>
          <TaskItem icon={<Search />}>modified_at &gt; now() - 7 days</TaskItem>
          <TaskItem icon={<TableIcon />}>main.sales.orders</TaskItem>
          <TaskItem icon={<TableIcon />}>main.sales.customers</TaskItem>
        </Task>
        <Task title="Ran a query" status="running" />
        <Task title="Read schema" status="error" />
      </Panel>
    ),
  },
  {
    name: "Plan",
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
    name: "Queue",
    demo: (
      <Panel>
        <Queue count={2} defaultOpen>
          <QueueItem onRemove={() => {}}>Now chart the row counts over time</QueueItem>
          <QueueItem>And export the result as CSV</QueueItem>
        </Queue>
      </Panel>
    ),
  },
  {
    name: "Checkpoint",
    demo: (
      <Panel>
        <Checkpoint label="3 files changed" onRestore={() => {}} />
      </Panel>
    ),
  },
  {
    name: "Sources",
    demo: (
      <Panel>
        <Sources count={2} defaultOpen>
          <Source href="#" icon={<TableIcon />}>
            main.sales.orders
          </Source>
          <Source href="#" icon={<FileDocument />}>
            Weekly pipeline runbook
          </Source>
        </Sources>
      </Panel>
    ),
  },
  {
    name: "Actions",
    demo: (
      <Actions>
        <Action label="Copy">
          <Copy />
        </Action>
        <Action label="Retry">
          <Refresh />
        </Action>
      </Actions>
    ),
  },
  {
    name: "Loader",
    demo: <Loader label="Searching catalog" />,
  },
  {
    name: "Suggestion",
    demo: (
      <Suggestions>
        <Suggestion>Summarise this table</Suggestion>
        <Suggestion>Find recent changes</Suggestion>
        <Suggestion>Chart it over time</Suggestion>
      </Suggestions>
    ),
  },
  {
    name: "Follow Ups",
    demo: (
      <Panel>
        <FollowUps>
          <FollowUp>Which of these feed a dashboard?</FollowUp>
          <FollowUp>Show the schema change on customers</FollowUp>
        </FollowUps>
      </Panel>
    ),
  },
  {
    name: "Prompt Input",
    demo: (
      <Panel>
        <PromptInput>
          <PromptInputTextarea placeholder="Ask genie…" />
          <PromptInputFooter>
            <PromptInputTools>
              <Terminal />
            </PromptInputTools>
            <PromptInputSubmit />
          </PromptInputFooter>
        </PromptInput>
      </Panel>
    ),
  },
]

export const CHAT_GROUP = { id: "group-chat", label: "Chat" }

export function ChatGallery() {
  return (
    <div data-doc-generated className="mt-12">
      <section id={CHAT_GROUP.id} style={anchorOffset}>
        <h2 className="type-title-4 text-text-strong">Chat</h2>
        <p className="type-body text-text-subtle">
          The parts of a conversation with an agent. The first group renders a turn; the
          agentic ones render the trace of a run — what it did, what it plans, what is
          queued behind it, and what the answer rests on.
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
    </div>
  )
}
