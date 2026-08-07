import { Tabs, TabsList, TabsTrigger, TabsContent } from "dbui/components/ui/tabs"

import { DocHeader, Para, Code, RefTable, SourceNote } from "@/components/docs/Prose"
import { DocAccordion } from "@/components/docs/DocAccordion"
import {
  AnchoredSection,
  Subsection,
  PrincipleEntry,
  ToneEntry,
  ToneScale,
  WordTable,
  type Moment,
  type Tone,
} from "@/components/docs/VoiceKit"

/**
 * The rendered view of `packages/dbui/docs/brandvoice.md`. Every rule on this
 * page comes from that file and none is added here — the CLI and the MCP server
 * serve the same material, so a rule invented in this component would be a rule
 * only the portal knows about.
 *
 * The page is a reference rather than an essay. It is entered from a search or
 * a link, read one section deep and left, which is why the long entries
 * collapse and the three word lists share one set of tabs: the reader wants one
 * answer, not the whole standard.
 */

/**
 * One definition per section, used for the heading and the anchor, so a link
 * can never name a heading that has since been reworded.
 */
const S = {
  principles: { id: "core-principles", title: "Voice principles" },
  scale: { id: "tone-scale", title: "Tone scale" },
  grammar: { id: "grammar", title: "Grammar" },
  casing: { id: "casing", title: "Punctuation" },
  reference: { id: "terminology", title: "Terminology and checks" },
  methodology: { id: "methodology", title: "Methodology and sources" },
}

const PRINCIPLES = [
  {
    name: "Clear over clever",
    meaning: "Plain, precise words instead of marketing jargon",
    write: "Query sample data",
    avoid: "Unleash insights",
  },
  {
    name: "Direct and concise",
    meaning: "Lead with the primary action, use the fewest words possible",
    write: "Delete catalog",
    avoid: "Click here to delete the catalog",
  },
  {
    name: "Honest, not hype",
    meaning: "State what is true, including technical limits",
    write: "Runs on serverless compute",
    avoid: "Blazing-fast compute",
  },
  {
    name: "Smart but approachable",
    meaning: "Assume competence; explain the new, not the obvious",
    write: "Deleting removes all child objects",
    avoid: "Oops, careful",
  },
]

/** The `term` of a tone on the scale is the context it belongs to. */
const TONE_SCALE: Array<{ tone: Tone; term: string; guidance: string; example: string }> = [
  {
    tone: "Warm",
    term: "Empty states, onboarding, success toasts",
    guidance: "Brief encouragement for first-run or success moments",
    example: "Create your first query to explore your data",
  },
  {
    tone: "Neutral",
    term: "Nav labels, page titles, field labels",
    guidance: "The default instructive, matter-of-fact style",
    example: "Genie answers questions about your data",
  },
  {
    tone: "Cautious",
    term: "Errors, delete confirmations, permission grants",
    guidance: "Firm and precise for destructive or security actions",
    example: "Deleting this catalog can't be undone",
  },
]

/**
 * The `term` of a moment is the kind of string being written. Each moment names
 * the tone that governs it, and the page groups on that field rather than
 * repeating the list — a moment can belong to one tone and only one.
 */
const MOMENTS: Array<Moment & { tone: Tone }> = [
  {
    term: "Navigation label",
    tone: "Neutral",
    guidance: "Noun, 1–2 words, matches the destination exactly",
    example: "SQL warehouses",
  },
  {
    term: "Page title",
    tone: "Neutral",
    guidance: "Names the object or task, no end punctuation",
    example: "Create a metastore",
  },
  {
    term: "Button / CTA",
    tone: "Neutral",
    guidance: "Verb plus object. Loading uses the present continuous",
    example: "Add data · Saving… · Delete",
  },
  {
    term: "Description",
    tone: "Neutral",
    guidance: "Explains what and why in two sentences or fewer",
    example: "Genie answers questions about your data.",
  },
  {
    term: "Tooltip",
    tone: "Neutral",
    guidance: "Adds information not already in the label. No final period",
    example: "Serverless compute starts in seconds",
  },
  {
    term: "Empty state",
    tone: "Warm",
    guidance: "Title of six words or fewer, one sentence for the next step",
    example: "No queries yet. Create a query to start.",
  },
  {
    term: "Error message",
    tone: "Cautious",
    guidance: "State what happened, why, and what to do next",
    example: "Couldn't run the query. Retry in a few seconds.",
  },
  {
    term: "Destructive action",
    tone: "Cautious",
    guidance: "State the exact irreversible consequence",
    example: "This can't be undone.",
  },
]

/** Where each tone sits on the rail, in the order the rail runs. */
const TONE_ZONES: Array<{ tone: Tone; where: string }> = [
  { tone: "Warm", where: "Empty states" },
  { tone: "Neutral", where: "Labels" },
  { tone: "Cautious", where: "Error states" },
]

const CASING = [
  { exception: "Branded products", casing: "Title Case", example: "Unity Catalog, Delta Live Tables" },
  { exception: "Generic terms", casing: "lowercase", example: "notebook, cluster, job, lakehouse" },
  { exception: "Permission tokens", casing: "ALL CAPS", example: "ALL PRIVILEGES, CAN MANAGE" },
  { exception: "Common acronyms", casing: "As-is", example: "SQL, API, ML" },
]

const GRAMMAR = [
  { category: "Person", rule: 'Use "you"', guidance: 'Use "you" or an implied "you". Avoid "we".' },
  { category: "Tense", rule: "Present tense", guidance: 'Prefer "save" over "will save"' },
  { category: "Voice", rule: "Active voice", guidance: 'Prefer "You deleted the table" over the passive' },
  {
    category: "Clarity",
    rule: "Plain language",
    guidance: '15–20 words per sentence; remove intensifiers such as "very"',
  },
  {
    category: "Data",
    rule: "Numerals",
    guidance: 'Digits for all numerals in a sentence, e.g. "In 1,234 days"',
  },
  {
    category: "Punctuation",
    rule: "Style",
    guidance: "No serial comma. No emoji, no exclamation points.",
  },
]

const ACCESSIBILITY = [
  { rule: "Alt text", guideline: "70–155 characters, front-load key terms, end with a period" },
  { rule: "Icon controls", guideline: <>Must have a non-empty <Code>aria-label</Code></> },
  {
    rule: "Stand-alone text",
    guideline: 'Link and button text must make sense alone — never "click here"',
  },
  { rule: "Contrast", guideline: "Meet WCAG AA, minimum 4.5:1 for body text" },
  { rule: "Spatial references", guideline: "Use element labels, never location or direction" },
]

const GLOBALIZATION = [
  { rule: "Whole strings", guideline: "Never concatenate fragments at runtime" },
  {
    rule: "Expansion room",
    guideline: "Leave roughly 30% extra space for translation; avoid fixed widths",
  },
  { rule: "Standard formats", guideline: <>ISO 8601 (<Code>YYYY-MM-DD</Code>) for all dates</> },
  { rule: "Image text", guideline: "Keep meaningful text out of images; use numbered callouts" },
]

const CONTENT_QUALITY = [
  { rule: "Sentence case", guideline: "Throughout, except branded names" },
  {
    rule: "Banned words",
    guideline: 'Remove marketing terms such as "leverage", "utilize", "seamless"',
  },
  { rule: "Active verbs", guideline: "Buttons must start with an active verb" },
  { rule: "Destructive actions", guideline: 'Explicitly state "This can\'t be undone"' },
]

const TERMINOLOGY = [
  { use: "click", not: "click on, select", reason: "Standardizes interaction verbs" },
  { use: "select / clear", not: "toggle, check", reason: "Removes ambiguity for checkboxes" },
  { use: "enter", not: "type, input", reason: "Covers both typing and pasting" },
  { use: "go to", not: "proceed, navigate", reason: "Simpler, easier to translate" },
  { use: "run", not: "execute", reason: "Avoids violent imagery" },
  { use: "log in", not: "sign in", reason: "Databricks house style" },
  { use: "built-in", not: "native", reason: "Plainer and more inclusive" },
  { use: "stop / cancel", not: "kill, abort", reason: "Avoids violent imagery" },
  { use: "in", not: "within", reason: "Simpler" },
  { use: "to", not: "in order to, for the purpose of", reason: "Direct" },
  { use: "or", not: "and/or", reason: '"and" is implied' },
  { use: "and", not: "as well as", reason: "Ambiguous" },
  { use: "can / might", not: "may", reason: '"may" implies permission' },
  { use: "because", not: "as, since, due to the fact that", reason: "Simpler to translate" },
  { use: "must", not: "have to, need to, should", reason: "Precise and translatable" },
  { use: "use", not: "utilize, leverage", reason: "Simpler language" },
  { use: "fewer", not: "less", reason: "For countable things" },
  { use: "verify / check", not: "ensure, make sure", reason: "Precise" },
  { use: "not valid", not: "invalid", reason: "Plainer, more accessible" },
  { use: "username", not: "user name", reason: "Standardizes spelling" },
  { use: "repository", not: "repo", reason: "Avoids short forms" },
  { use: "people / users", not: "guys, folks", reason: "Inclusive and professional" },
  { use: "allowlist / denylist", not: "whitelist, blacklist", reason: "Inclusive and professional" },
  { use: "primary / secondary", not: "master, slave", reason: "Inclusive and professional" },
  { use: "final check", not: "sanity check", reason: "Inclusive and professional" },
]

const PRODUCT_NAMES = [
  { use: "Git folders", not: "Repos", reason: "Avoid the legacy name" },
  { use: "AI/BI dashboards", not: "Lakeview, legacy dashboards", reason: "Avoid the legacy name" },
  { use: "Lakeflow Jobs", not: "Workflows", reason: "Avoid the legacy name" },
  { use: "Lakeflow Pipelines", not: "Delta Live Tables", reason: "Avoid the legacy name" },
  { use: "SQL warehouse", not: "SQL endpoint", reason: "Avoid the legacy name" },
]

const SOURCES = [
  { source: "go/uitext", covers: "The in-product UI text guide" },
  { source: "go/docstyleguide", covers: "Voice, tone and audience" },
  { source: "go/docstyleguide", covers: "Images, graphics, diagrams and screenshots (alt text)" },
  { source: "go/docterms", covers: "The A–Z word list, and the product and feature name lists" },
  { source: "Brand Guidelines", covers: "Brand voice and punctuation" },
]

const CHECKLIST_COLUMNS = [
  { key: "rule", header: "Rule", width: "w-[28%]" },
  { key: "guideline", header: "Guideline" },
]

export function VoiceDoc() {
  return (
    <>
      <DocHeader title="Voice and tone">
        One voice for every string, so a nav label and an error read as the same product.
      </DocHeader>

      <img
        src="/docs/voice-hero.png"
        alt="Abstract mark for voice and tone: three overlapping profiles facing one way, with a blue spark and an orange stepped pattern."
        width={864}
        height={300}
        className="mt-10 h-auto w-full rounded-2"
      />

      <AnchoredSection {...S.principles}>
        <Para>
          The Databricks voice is professional, authoritative and concise, but human and
          approachable. American spelling throughout — color, behavior, optimize, canceled. This
          applies to code comments and token names as well as UI copy.
        </Para>
        <DocAccordion variant="list">
          {PRINCIPLES.map((principle) => (
            <PrincipleEntry key={principle.name} {...principle} />
          ))}
        </DocAccordion>
      </AnchoredSection>

      <AnchoredSection {...S.scale}>
        <Para>
          Voice is the constant personality of the product. Tone flexes with the user&rsquo;s
          context and the stakes involved.
        </Para>
        <ToneScale zones={TONE_ZONES} />
        <DocAccordion variant="list">
          {TONE_SCALE.map((entry) => (
            <ToneEntry
              key={entry.tone}
              {...entry}
              moments={MOMENTS.filter((moment) => moment.tone === entry.tone)}
            />
          ))}
        </DocAccordion>
      </AnchoredSection>

      <AnchoredSection {...S.grammar}>
        <RefTable
          columns={[
            { key: "category", header: "Category", width: "w-[20%]" },
            { key: "rule", header: "Rule", width: "w-[24%]" },
            { key: "guidance", header: "Guidance" },
          ]}
          rows={GRAMMAR}
        />
      </AnchoredSection>

      <AnchoredSection {...S.casing}>
        <Para>
          Use sentence case for every UI string — capitalize only the first word. Never use title
          case for generic labels. Follow US English, and do not use semicolons.
        </Para>
        <RefTable
          columns={[
            { key: "exception", header: "Exception", width: "w-[28%]" },
            { key: "casing", header: "Casing", width: "w-[22%]" },
            { key: "example", header: "Example" },
          ]}
          rows={CASING}
        />
      </AnchoredSection>

      {/*
        Three lists the reader consults one at a time. Stacked, the terminology
        table pushed the product names and the checklists below two screens of
        rows nobody was reading on the way past, so they share one set of tabs.
      */}
      <AnchoredSection {...S.reference}>
        <Para>
          The word to reach for, the name the product goes by now, and the passes to make before a
          string ships.
        </Para>
        <Tabs defaultValue="terminology" className="gap-4">
          <TabsList>
            <TabsTrigger value="terminology">Terminology</TabsTrigger>
            <TabsTrigger value="names">Product names</TabsTrigger>
            <TabsTrigger value="checks">Checks</TabsTrigger>
          </TabsList>

          {/*
            `keepMounted` on all three: a tab that mounts on click ships an
            HTML document holding a third of the standard, and the two tabs
            nobody clicked are missing from the source an agent or a crawler
            reads.
          */}
          <TabsContent keepMounted value="terminology">
            <WordTable rows={TERMINOLOGY} widths={["w-[25%]", "w-[33%]"]} />
          </TabsContent>

          <TabsContent keepMounted value="names">
            <WordTable rows={PRODUCT_NAMES} widths={["w-[27%]", "w-[35%]"]} />
          </TabsContent>

          <TabsContent keepMounted value="checks">
            <Subsection title="Accessibility">
              <RefTable columns={CHECKLIST_COLUMNS} rows={ACCESSIBILITY} />
            </Subsection>
            <Subsection title="Globalization">
              <RefTable columns={CHECKLIST_COLUMNS} rows={GLOBALIZATION} />
            </Subsection>
            <Subsection title="Content quality">
              <RefTable columns={CHECKLIST_COLUMNS} rows={CONTENT_QUALITY} />
            </Subsection>
          </TabsContent>
        </Tabs>
      </AnchoredSection>

      <AnchoredSection {...S.methodology}>
        <Para>
          The topics here draw on agent-readable design-system files and a study of the content
          principles of Adobe Spectrum, IBM Carbon and Material Design. The rules come from a sample
          of more than 100 Databricks documentation pages, reconciled with internal guidelines and
          refined to match the voice defined above.
        </Para>
        <RefTable
          columns={[
            { key: "source", header: "Source", width: "w-[32%]", mono: true },
            { key: "covers", header: "Covers" },
          ]}
          rows={SOURCES}
        />
      </AnchoredSection>

      <SourceNote>
        This page renders <Code>packages/dbui/docs/brandvoice.md</Code>, which the CLI and the MCP
        server serve to agents through <Code>dbui docs brandvoice</Code>. That file is the source of
        truth for the content design linters, and it is a working draft maintained with Databricks
        content writers — the terminology and product-name tables are the most stable part.
      </SourceNote>
    </>
  )
}
