import figma from "@figma/code-connect"
import { Message, MessageContent } from "dbui-chat/components/message"
import { Confirmation } from "dbui-chat/components/confirmation"
import { Suggestions, Suggestion } from "dbui-chat/components/suggestion"
import { Checkpoint } from "dbui-chat/components/checkpoint"
import { Queue, QueueSection, QueueItem } from "dbui-chat/components/queue"
import { Artifact } from "dbui-chat/components/artifact"
import { MessageActions } from "dbui-chat/components/message-actions"
import { MessageThumbnail } from "dbui-chat/components/message-thumbnail"
import { Source as SourceLink, Sources as SourcesList } from "dbui-chat/components/sources"
import { Reasoning } from "dbui-chat/components/reasoning"
import { Task, TaskItem } from "dbui-chat/components/task"
import { Plan, PlanItem } from "dbui-chat/components/plan"
import { Sources, Source } from "dbui-chat/components/sources"
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputActions,
  PromptInputSubmit,
} from "dbui-chat/components/prompt-input"
import {
  Details,
  DetailsHeader,
  DetailsRows,
  DetailsRow,
} from "dbui-chat/components/details"

// The chat family, in one file because they are one surface: a thread is a Message
// holding a Reasoning, a Task, a Plan and its Sources, with a PromptInput below.
//
// None of these had Code Connect. `dbui-chat` shipped its Figma components and its
// React components separately, so the whole package was invisible from the design
// side — selecting `Task` in Figma returned nothing, and there was no signal that
// the React component existed.

// ── Message ──────────────────────────────────────────────────────────────────
// `Role` is who is speaking; `Content` is whether the body is text or media, which
// in React is just what you put in `MessageContent`.
figma.connect(
  Message,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=4839-17688",
  {
    props: {
      role: figma.enum("Role", { Input: "user", Response: "assistant" }),
    },
    example: ({ role }) => (
      <Message role={role}>
        <MessageContent>Which tables changed in the last 24 hours?</MessageContent>
      </Message>
    ),
  }
)

// ── Confirmation ─────────────────────────────────────────────────────────────
// `state` is a value rather than an unmount, so an answered question stays in the
// thread as a record of what was decided. The Figma component draws the request;
// the accepted and rejected readings are the same component with `state` set.
figma.connect(
  Confirmation,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=5080-7831",
  {
    example: () => (
      <Confirmation
        title="Drop 3 tables in main.staging?"
        state="request"
        acceptLabel="Drop tables"
        onAccept={() => console.log("accept")}
        onReject={() => console.log("reject")}
      >
        staging.orders_tmp, staging.users_tmp and staging.scratch.
      </Confirmation>
    ),
  }
)

// ── Suggestions ──────────────────────────────────────────────────────────────
// Ignorable by design. A choice the agent needs answered is a `Confirmation`, and
// that difference is the whole reason both exist.
figma.connect(
  Suggestions,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=5080-7848",
  {
    example: () => (
      <Suggestions>
        <Suggestion>Show me the failing tables</Suggestion>
        <Suggestion>Group these by catalog</Suggestion>
        <Suggestion>Who owns them?</Suggestion>
      </Suggestions>
    ),
  }
)

// ── Checkpoint ───────────────────────────────────────────────────────────────
// A rule across the thread rather than a turn, which is why it spans the width.
figma.connect(
  Checkpoint,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=5080-7857",
  {
    example: () => (
      <Checkpoint
        label="Before the schema change"
        timestamp="2 min ago"
        onRestore={() => console.log("restore")}
      />
    ),
  }
)

// ── Queue ────────────────────────────────────────────────────────────────────
// Lives in the rail, not the transcript. Pending first, because a reader opens the
// rail to answer "what is left".
figma.connect(
  Queue,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=5080-7889",
  {
    example: () => (
      <Queue>
        <QueueSection label="Pending" count={2}>
          <QueueItem status="running">Add form validation</QueueItem>
          <QueueItem status="pending">Write unit tests</QueueItem>
        </QueueSection>
        <QueueSection label="Completed" count={2} defaultOpen={false}>
          <QueueItem status="done">Refactor Button component</QueueItem>
          <QueueItem status="done">Rename the column</QueueItem>
        </QueueSection>
      </Queue>
    ),
  }
)

// ── Artifact ─────────────────────────────────────────────────────────────────
// A handle rather than the thing: the preview is capped inside the component so
// every artifact in a thread ends at the same height.
figma.connect(
  Artifact,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=5080-7902",
  {
    example: () => (
      <Artifact title="revenue_by_region.sql" kind="SQL" onOpen={() => console.log("open")}>
        {`select region, sum(amount) as revenue\nfrom main.sales.orders\ngroup by region`}
      </Artifact>
    ),
  }
)

// ── Message Thumbnail ────────────────────────────────────────────────────────
// Figma's `.Thumbnail` — the 40×40 media tile on a `Content=Media` turn. It was
// the last Figma-only piece in the chat set: drawn, used in the Message variants,
// and with nothing to render it.
//
// The size is not a prop. A row of tiles that each size to their own image is a
// ragged row, and the tile is a handle for opening the thing rather than a preview.
figma.connect(
  MessageThumbnail,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=4839-17686",
  {
    example: () => <MessageThumbnail src="/attachment.png" alt="Revenue by region" />,
  }
)

// ── Message Actions ──────────────────────────────────────────────────────────
// Figma's `.Actions` — four ghost icon buttons then the Sources trigger. It was a
// recipe in the Thread story until the state model made the case for a component:
// the thumbs are one value, not two toggles, and copy has a confirmed state.
//
// Omitting a handler omits its control, so there is no variant axis to map — the
// row's shape is which callbacks the caller passes.
figma.connect(
  MessageActions,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=4839-17680",
  {
    example: () => (
      <MessageActions
        copyText="Sales grew 4.2% week over week."
        feedback={null}
        onFeedbackChange={(value) => console.log(value)}
        onShare={() => console.log("share")}
      >
        <SourcesList count={2}>
          <SourceLink href="#">main.sales.orders</SourceLink>
          <SourceLink href="#">Weekly pipeline runbook</SourceLink>
        </SourcesList>
      </MessageActions>
    ),
  }
)

// ── Reasoning ────────────────────────────────────────────────────────────────
figma.connect(
  Reasoning,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=4839-17676",
  {
    example: () => <Reasoning>Checking lineage for 12 tables</Reasoning>,
  }
)

// ── Task ─────────────────────────────────────────────────────────────────────
figma.connect(
  Task,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=4847-16131",
  {
    props: {
      status: figma.enum("Status", {
        Complete: "complete",
        Running: "running",
        Error: "error",
      }),
      defaultOpen: figma.enum("State", { Expanded: true, Collapsed: false }),
    },
    example: ({ status, defaultOpen }) => (
      <Task title="Scan governed assets" status={status} defaultOpen={defaultOpen}>
        <TaskItem>Read 1,204 tables</TaskItem>
        <TaskItem>Resolved 88 lineage edges</TaskItem>
      </Task>
    ),
  }
)

// ── Plan ─────────────────────────────────────────────────────────────────────
figma.connect(
  Plan,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=4849-5156",
  {
    props: {
      defaultOpen: figma.enum("State", { Expanded: true, Collapsed: false }),
    },
    example: ({ defaultOpen }) => (
      <Plan defaultOpen={defaultOpen}>
        <PlanItem status="done">Find tables with no owner</PlanItem>
        <PlanItem status="active">Group them by catalog</PlanItem>
        <PlanItem status="pending">Draft the ownership request</PlanItem>
      </Plan>
    ),
  }
)

// ── Sources ──────────────────────────────────────────────────────────────────
figma.connect(
  Sources,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=4890-5458",
  {
    props: {
      defaultOpen: figma.enum("State", { Expanded: true, Collapsed: false }),
    },
    example: ({ defaultOpen }) => (
      <Sources defaultOpen={defaultOpen}>
        <Source href="#">main.default.users</Source>
        <Source href="#">main.default.orders</Source>
      </Sources>
    ),
  }
)

// ── Prompt Input ─────────────────────────────────────────────────────────────
figma.connect(
  PromptInput,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=4839-17704",
  {
    example: () => (
      <PromptInput>
        <PromptInputTextarea placeholder="Ask about your data" />
        <PromptInputActions>
          <PromptInputSubmit />
        </PromptInputActions>
      </PromptInput>
    ),
  }
)

// ── Details ──────────────────────────────────────────────────────────────────
figma.connect(
  Details,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=4839-17814",
  {
    example: () => (
      <Details>
        <DetailsHeader title="users" />
        <DetailsRows>
          <DetailsRow label="Owner">Mudit Mittal</DetailsRow>
          <DetailsRow label="Rows">4.2M</DetailsRow>
        </DetailsRows>
      </Details>
    ),
  }
)
