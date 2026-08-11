import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { Base } from "dbui-shells/shell"
import {
  ChatWorkbench,
  type ChatPreviewTab,
} from "dbui-shells/shells/ChatWorkbench"
import {
  Message,
  MessageContent,
  Plan,
  PlanItem,
  PromptInput,
  PromptInputActions,
  PromptInputContext,
  PromptInputSubmit,
  PromptInputTextarea,
  Reasoning,
  Response,
  Source,
  Sources,
  Task,
  TaskItem,
  type ChatStatus,
} from "dbui-chat"
import { Button } from "dbui/components/ui/button"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "dbui/components/ui/tooltip"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "dbui/components/ui/table"
import { At } from "dbui/components/icons/At"
import { Paperclip } from "dbui/components/icons/Paperclip"
import { Copy } from "dbui/components/icons/Copy"
import { ThumbsUp } from "dbui/components/icons/ThumbsUp"
import { ThumbsDown } from "dbui/components/icons/ThumbsDown"
import { Share } from "dbui/components/icons/Share"
import { Search } from "dbui/components/icons/Search"
import { Table as TableIcon } from "dbui/components/icons/Table"
import { FileDocument } from "dbui/components/icons/FileDocument"
import { Notebook } from "dbui/components/icons/Notebook"
import { Terminal } from "dbui/components/icons/Terminal"
import { History } from "dbui/components/icons/History"
import { Dashboard } from "dbui/components/icons/Dashboard"

const meta: Meta = {
  title: "Components/Shells/Chat Workbench",
  parameters: { layout: "fullscreen" },
}

export default meta

const CONVERSATIONS = [
  { id: "c1", title: "At-risk renewals this quarter", group: "Today" },
  { id: "c2", title: "Why did the nightly job slow down?", group: "Today" },
  { id: "c3", title: "Draft a lineage summary for orders", group: "Yesterday" },
  { id: "c4", title: "Column-level PII audit", group: "Yesterday" },
  { id: "c5", title: "Compare warehouse costs by team", group: "Earlier" },
  { id: "c6", title: "Explain the retention model", group: "Earlier" },
]

const ANSWER = `I found **14 enterprise customers** with elevated renewal risk this quarter, representing **$8.6M in ARR**.

The risk is less about churn history and more about recent engagement drop-off — accounts with both declining usage and unresolved support activity are the ones worth a call this week.`

const FOLLOW_UP = `Here's the regional split. \`us-east\` carries the largest share of at-risk ARR:

- **US East** — $4.2M across 6 accounts
- **US West** — $2.1M across 4 accounts
- **EMEA** — $1.6M across 3 accounts
- **APAC** — $0.7M across 1 account`

/** The answer action row — a Button and Tooltip recipe, with Sources trailing it. */
function AnswerActions({ children }: { children?: React.ReactNode }) {
  const actions = [
    { label: "Copy", icon: <Copy /> },
    { label: "Good response", icon: <ThumbsUp /> },
    { label: "Bad response", icon: <ThumbsDown /> },
    { label: "Share", icon: <Share /> },
  ]

  return (
    <TooltipProvider>
      <div className="mt-2 flex flex-wrap items-center gap-1">
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

function RenewalsTable() {
  const rows = [
    { customer: "Northstar Health", arr: "2,100,000", signal: "Usage down 38% QoQ" },
    { customer: "Bell & Finch Retail", arr: "1,700,000", signal: "Open Sev 2 support issue" },
    { customer: "Atlas Benefits Group", arr: "1,200,000", signal: "No exec contact in 75 days" },
    { customer: "Kestrel Logistics", arr: "940,000", signal: "Usage down 22% QoQ" },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>ARR at risk</TableHead>
          <TableHead>Main risk signal</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.customer}>
            <TableCell>{row.customer}</TableCell>
            <TableCell numeric>{row.arr}</TableCell>
            <TableCell>{row.signal}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

/**
 * The full shell: conversation rail, thread, tabbed preview, tool rail. Every
 * retained chat component appears — Message, Reasoning, Task, Plan, Sources,
 * Response and Prompt Input — with the answer action row as a Button recipe.
 */
export const Playground: StoryObj = {
  render: () => {
    interface Turn {
      id: string
      from: "user" | "assistant"
      text: string
      reasoning?: string
      duration?: number
      trace?: boolean
      sources?: boolean
    }

    const [activeConversation, setActiveConversation] = React.useState("c1")
    const [status, setStatus] = React.useState<ChatStatus>("ready")
    const [context, setContext] = React.useState([
      { id: "renewals", label: "renewals", detail: "sales_main.crm" },
    ])
    const [turns, setTurns] = React.useState<Turn[]>([
      { id: "t1", from: "user", text: "Which enterprise renewals are most at risk this quarter?" },
      {
        id: "t2",
        from: "assistant",
        text: ANSWER,
        reasoning:
          "Join the renewals table with recent usage telemetry and open support cases, then rank by ARR at risk. Certified metrics take priority over ad-hoc ones.",
        duration: 40,
        trace: true,
        sources: true,
      },
    ])

    const [tabs, setTabs] = React.useState<ChatPreviewTab[]>([
      {
        id: "renewals",
        label: "at_risk_renewals",
        icon: <TableIcon />,
        content: <RenewalsTable />,
      },
    ])
    const [activeTabId, setActiveTabId] = React.useState("renewals")

    const openTab = (tab: ChatPreviewTab) => {
      setTabs((prev) => (prev.some((t) => t.id === tab.id) ? prev : [...prev, tab]))
      setActiveTabId(tab.id)
    }

    const closeTab = (id: string) => {
      setTabs((prev) => {
        const next = prev.filter((tab) => tab.id !== id)
        if (id === activeTabId && next.length > 0) setActiveTabId(next[0].id)
        return next
      })
    }

    const tools = [
      { id: "renewals", label: "At-risk renewals", icon: <TableIcon /> },
      { id: "notebook", label: "Scratch notebook", icon: <Notebook /> },
      { id: "logs", label: "Run logs", icon: <Terminal /> },
      { id: "dashboard", label: "Renewal dashboard", icon: <Dashboard /> },
      { id: "history", label: "Checkpoints", icon: <History /> },
    ]

    const TOOL_TABS: Record<string, ChatPreviewTab> = {
      renewals: {
        id: "renewals",
        label: "at_risk_renewals",
        icon: <TableIcon />,
        content: <RenewalsTable />,
      },
      notebook: {
        id: "notebook",
        label: "scratch.ipynb",
        icon: <Notebook />,
        content: (
          <Response>{`\`\`\`python
df = spark.table("sales_main.crm.renewals")
df.filter(df.risk_score > 0.8).orderBy("arr_at_risk", ascending=False).show()
\`\`\``}</Response>
        ),
      },
      logs: {
        id: "logs",
        label: "run.log",
        icon: <Terminal />,
        content: (
          <Response>{`\`\`\`
19:04:11  Resolved 4 tables
19:04:12  Scanned 2.1M rows
19:04:14  Ranked 14 accounts by ARR at risk
\`\`\``}</Response>
        ),
      },
      dashboard: {
        id: "dashboard",
        label: "Renewal risk",
        icon: <Dashboard />,
        content: (
          <p className="type-body text-text-subtle">
            A dashboard would render here. The preview region takes any content — a
            table, a notebook, a chart from dbui-viz.
          </p>
        ),
      },
      history: {
        id: "history",
        label: "Checkpoints",
        icon: <History />,
        content: (
          <p className="type-body text-text-subtle">
            Run history would render here.
          </p>
        ),
      },
    }

    const handleSubmit = ({ text }: { text: string }) => {
      setTurns((prev) => [...prev, { id: `u${Date.now()}`, from: "user", text }])
      setStatus("submitted")

      window.setTimeout(() => {
        const id = `a${Date.now()}`
        setTurns((prev) => [...prev, { id, from: "assistant", text: "" }])
        setStatus("streaming")

        const words = FOLLOW_UP.split(" ")
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
        }, 40)
      }, 700)
    }

    return (
      <Base defaultActive="genie" sidebarCollapsed>
        <ChatWorkbench
          conversations={CONVERSATIONS}
          activeConversationId={activeConversation}
          onSelectConversation={setActiveConversation}
          onNewConversation={() => setTurns([])}
          tabs={tabs}
          activeTabId={activeTabId}
          onSelectTab={setActiveTabId}
          onCloseTab={closeTab}
          tools={tools}
          activeToolId={activeTabId}
          onSelectTool={(id) => openTab(TOOL_TABS[id])}
          composer={
            <>
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
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Mention an object"
                    >
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
            </>
          }
        >
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
                        <TaskItem icon={<TableIcon />}>
                          sales_main.crm.renewals
                        </TaskItem>
                      </Task>
                      <Task title="Ran a query" />
                      <Plan count={3}>
                        <PlanItem status="done">Find accounts up for renewal</PlanItem>
                        <PlanItem status="done">Rank by ARR at risk</PlanItem>
                        <PlanItem status="active" description="Top three by ARR">
                          Summarise the accounts worth a call
                        </PlanItem>
                      </Plan>
                    </div>
                  ) : null}
                  <Response>{turn.text}</Response>
                  {turn.text ? (
                    <AnswerActions>
                      {turn.sources ? (
                        <Sources count={2}>
                          <Source href="#" icon={<TableIcon />}>
                            sales_main.crm.renewals
                          </Source>
                          <Source href="#" icon={<FileDocument />}>
                            Renewal risk methodology
                          </Source>
                        </Sources>
                      ) : null}
                    </AnswerActions>
                  ) : null}
                </MessageContent>
              </Message>
            )
          )}
          {status === "submitted" ? <Reasoning isStreaming /> : null}
        </ChatWorkbench>
      </Base>
    )
  },
}

/** No preview open and no tool rail — the thread at full width. */
export const ThreadOnly: StoryObj = {
  render: () => (
    <Base defaultActive="genie" sidebarCollapsed>
      <ChatWorkbench
        conversations={CONVERSATIONS}
        activeConversationId="c1"
        composer={
          <PromptInput accent="ai">
            <PromptInputTextarea placeholder="Ask genie..." />
            <PromptInputActions>
              <PromptInputSubmit />
            </PromptInputActions>
          </PromptInput>
        }
      >
        <Message from="user">
          <MessageContent>Which tables changed this week?</MessageContent>
        </Message>
        <Message from="assistant">
          <MessageContent>
            <Reasoning duration={12}>
              Checked the catalog for tables modified in the last seven days, then
              ranked them by row delta.
            </Reasoning>
            <Response>{`Four tables changed. The largest was **orders**.

- \`main.sales.orders\` — 2.1M rows added
- \`main.sales.customers\` — schema change`}</Response>
          </MessageContent>
        </Message>
      </ChatWorkbench>
    </Base>
  ),
}
