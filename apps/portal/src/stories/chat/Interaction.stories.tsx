import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import {
  Confirmation,
  Suggestions,
  Suggestion,
  Queue,
  QueueSection,
  QueueItem,
  Checkpoint,
  Artifact,
  Message,
  MessageContent,
  Task,
  TaskItem,
  TaskInput,
  TaskOutput,
  type ConfirmationState,
} from "dbui-chat"
import { CodeBlock } from "dbui/components/ui/code-block"
import { Query } from "dbui/components/icons/Query"
import { Button } from "dbui/components/ui/button"

const meta: Meta = {
  title: "Components/Chat/Interaction",
  parameters: { layout: "padded" },
}

export default meta

function Section({
  title,
  hint,
  children,
}: {
  title: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-10">
      <h3 className="mb-1 type-body-bold text-text-base">{title}</h3>
      {hint ? <p className="mb-3 type-hint text-text-subtle">{hint}</p> : null}
      {children}
    </section>
  )
}

/** The reader answering the agent — the one thing a transcript could not do before. */
export const Answering: StoryObj = {
  render: () => {
    const [state, setState] = React.useState<ConfirmationState>("request")
    const [picked, setPicked] = React.useState<string | null>(null)

    return (
      <div className="max-w-[560px]">
        <Section
          title="Confirmation — it blocks, and it stays"
          hint="Answered is a value rather than an unmount, so the thread keeps a record of what was decided."
        >
          <Confirmation
            title="Drop 3 tables in main.staging?"
            state={state}
            acceptLabel="Drop tables"
            onAccept={() => setState("accepted")}
            onReject={() => setState("rejected")}
          >
            staging.orders_tmp, staging.users_tmp and staging.scratch. This cannot
            be undone.
          </Confirmation>
          <Button
            variant="link"
            size="sm"
            className="mt-3 px-0"
            onClick={() => setState("request")}
          >
            Reset
          </Button>
        </Section>

        <Section
          title="All three states"
          hint="Declining is the system working, so the rejected mark is neutral rather than danger."
        >
          <div className="flex flex-col gap-3">
            {(["request", "accepted", "rejected"] as const).map((s) => (
              <Confirmation
                key={s}
                title="Grant read on main.sales to the analytics group?"
                state={s}
                acceptLabel="Grant access"
              >
                14 tables, 2 views.
              </Confirmation>
            ))}
          </div>
        </Section>

        <Section
          title="Suggestions — ignorable by design"
          hint="Nothing here blocks. A choice the agent needs answered is a Confirmation instead."
        >
          <Suggestions>
            <Suggestion onPick={setPicked}>Show me the failing tables</Suggestion>
            <Suggestion onPick={setPicked}>Group these by catalog</Suggestion>
            <Suggestion onPick={setPicked}>Who owns them?</Suggestion>
          </Suggestions>
          <p className="mt-3 type-hint text-text-subtle">
            {picked ? `Picked: ${picked}` : "Nothing picked yet."}
          </p>
        </Section>
      </div>
    )
  },
}

/** What the agent produced, and where the reader can go back to. */
export const Outputs: StoryObj = {
  render: () => (
    <div className="max-w-[560px]">
      <Section
        title="Artifact — a handle, not the thing"
        hint="The preview is capped here rather than at the call site, so every artifact in a thread ends at the same height."
      >
        <Artifact
          title="revenue_by_region.sql"
          kind="SQL"
          icon={<Query />}
          onOpen={() => console.log("open")}
        >
          <CodeBlock
            className="rounded-none border-0"
            code={`select region, sum(amount) as revenue\nfrom main.sales.orders\nwhere order_date >= current_date - 30\ngroup by region\norder by revenue desc`}
            language="sql"
            copyable={false}
          />
        </Artifact>
      </Section>

      <Section
        title="Checkpoint — a rule across the thread"
        hint="It spans the full width because it belongs to the transcript, not to either side of it."
      >
        <div className="flex flex-col gap-4">
          <Message from="assistant">
            <MessageContent>Renamed the column and updated 4 queries.</MessageContent>
          </Message>
          <Checkpoint
            label="Before the schema change"
            timestamp="2 min ago"
            onRestore={() => console.log("restore")}
          />
          <Message from="user">
            <MessageContent>Actually, revert that.</MessageContent>
          </Message>
        </div>
      </Section>

      <Section
        title="Task with input and output"
        hint="TaskInput and TaskOutput are parts of Task rather than a separate Tool component — Task already declares one per tool call."
      >
        <Task title="Ran a query" status="complete" defaultOpen>
          <TaskInput>{`{ "warehouse": "shared-sql", "limit": 100 }`}</TaskInput>
          <TaskOutput>{`region   revenue\n─────────────────\nEMEA     1,204,551\nAMER       988,120\nAPAC       412,004`}</TaskOutput>
          <TaskItem>main.sales.orders</TaskItem>
        </Task>
      </Section>
    </div>
  ),
}

/** The rail beside the thread. */
export const WorkQueue: StoryObj = {
  name: "Queue",
  render: () => (
    <div className="max-w-[320px]">
      <Section
        title="Queue — the state of the work"
        hint="Pending first, because a reader opens the rail to answer 'what is left'. Completed stays collapsed — it is there to be trusted, not read."
      >
        <Queue>
          <QueueSection label="Pending" count={2}>
            <QueueItem status="running">Add form validation</QueueItem>
            <QueueItem status="pending">Write unit tests</QueueItem>
          </QueueSection>
          <QueueSection label="Completed" count={3} defaultOpen={false}>
            <QueueItem status="done">Refactor Button component</QueueItem>
            <QueueItem status="done">Rename the column</QueueItem>
            <QueueItem status="done">Update 4 queries</QueueItem>
          </QueueSection>
        </Queue>
      </Section>
    </div>
  ),
}
