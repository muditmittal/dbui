import { DocHeader, Para, Code, RefTable, SourceNote } from "@/components/docs/Prose"
import { AnchoredSection, JumpTo, PrincipleEntry } from "@/components/docs/VoiceKit"

/**
 * The rendered view of `packages/dbui/docs/brandvoice.md`. Every rule on this
 * page comes from that file and none is added here — the CLI and the MCP server
 * serve the same material, so a rule invented in this component would be a rule
 * only the portal knows about.
 *
 * The page is a reference rather than an essay. It is entered from a search or
 * a link, read one section deep and left, which is what the jump list and the
 * anchors are for.
 */

const SECTIONS = [
  { id: "core-principles", title: "Core principles" },
  { id: "tone-scale", title: "Voice and tone scale" },
  { id: "tone-in-ui-context", title: "Tone in UI context" },
  { id: "casing-and-punctuation", title: "Casing and punctuation" },
  { id: "grammar-and-mechanics", title: "Grammar and mechanics" },
  { id: "accessibility", title: "Accessibility" },
  { id: "globalization", title: "Globalization" },
  { id: "content-quality", title: "Content quality" },
  { id: "terminology", title: "Terminology" },
  { id: "product-names", title: "Product names" },
  { id: "methodology", title: "Methodology and sources" },
]

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

const TONE_SCALE = [
  {
    tone: "Warm",
    context: "Empty states, onboarding, success toasts",
    guidance: "Brief encouragement for first-run or success moments",
    example: "Create your first query to explore your data",
  },
  {
    tone: "Neutral",
    context: "Nav labels, page titles, field labels",
    guidance: "The default instructive, matter-of-fact style",
    example: "Genie answers questions about your data",
  },
  {
    tone: "Cautious",
    context: "Errors, delete confirmations, permission grants",
    guidance: "Firm and precise for destructive or security actions",
    example: "Deleting this catalog can't be undone",
  },
]

const MOMENTS = [
  {
    moment: "Navigation label",
    tone: "Neutral",
    guidance: "Noun, 1–2 words, matches the destination exactly",
    example: "SQL warehouses",
  },
  {
    moment: "Page title",
    tone: "Neutral",
    guidance: "Names the object or task, no end punctuation",
    example: "Create a metastore",
  },
  {
    moment: "Button / CTA",
    tone: "Neutral",
    guidance: "Verb plus object. Loading uses the present continuous",
    example: "Add data · Saving… · Delete",
  },
  {
    moment: "Description",
    tone: "Neutral",
    guidance: "Explains what and why in two sentences or fewer",
    example: "Genie answers questions about your data.",
  },
  {
    moment: "Tooltip",
    tone: "Neutral",
    guidance: "Adds information not already in the label. No final period",
    example: "Serverless compute starts in seconds",
  },
  {
    moment: "Empty state",
    tone: "Warm",
    guidance: "Title of six words or fewer, one sentence for the next step",
    example: "No queries yet. Create a query to start.",
  },
  {
    moment: "Error message",
    tone: "Cautious",
    guidance: "State what happened, why, and what to do next",
    example: "Couldn't run the query. Retry in a few seconds.",
  },
  {
    moment: "Destructive action",
    tone: "Cautious",
    guidance: "State the exact irreversible consequence",
    example: "This can't be undone.",
  },
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

export function VoiceDoc() {
  return (
    <>
      <DocHeader title="Product UI: voice and tone">
        The standard for user-facing copy in the Databricks product UI. It governs navigation,
        titles, buttons, descriptions, tooltips, modals, empty states and errors, so the product
        reads as one cohesive, professional, task-oriented experience.
      </DocHeader>

      <div className="mt-8 flex flex-col gap-4">
        <SourceNote>
          This page renders <Code>packages/dbui/docs/brandvoice.md</Code>, which the CLI and the MCP
          server serve to agents through <Code>dbui docs brandvoice</Code>. That file is the source
          of truth for the content design linters, and it is a working draft maintained with
          Databricks content writers — the terminology and product-name tables are the most stable
          part.
        </SourceNote>
        <JumpTo sections={SECTIONS} />
      </div>

      <AnchoredSection id="core-principles" title="Core principles">
        <Para>
          The Databricks voice is professional, authoritative and concise, but human and
          approachable. American spelling throughout — color, behavior, optimize, canceled. This
          applies to code comments and token names as well as UI copy.
        </Para>
        <div className="mt-2 flex flex-col gap-10">
          {PRINCIPLES.map((principle) => (
            <PrincipleEntry key={principle.name} {...principle} />
          ))}
        </div>
      </AnchoredSection>

      <AnchoredSection id="tone-scale" title="Voice and tone scale">
        <Para>
          Voice is the constant personality of the product. Tone flexes with the user&rsquo;s
          context and the stakes involved.
        </Para>
        <RefTable
          columns={[
            { key: "tone", header: "Tone", width: "w-[16%]" },
            { key: "context", header: "Context", width: "w-[26%]" },
            { key: "guidance", header: "Guidance" },
            { key: "example", header: "Example" },
          ]}
          rows={TONE_SCALE}
        />
      </AnchoredSection>

      <AnchoredSection id="tone-in-ui-context" title="Tone in UI context">
        <RefTable
          columns={[
            { key: "moment", header: "Moment", width: "w-[22%]" },
            { key: "tone", header: "Tone", width: "w-[13%]" },
            { key: "guidance", header: "Guidance" },
            { key: "example", header: "Example" },
          ]}
          rows={MOMENTS}
        />
      </AnchoredSection>

      <AnchoredSection id="casing-and-punctuation" title="Sentence casing and punctuation">
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

      <AnchoredSection id="grammar-and-mechanics" title="Grammar and mechanics">
        <RefTable
          columns={[
            { key: "category", header: "Category", width: "w-[20%]" },
            { key: "rule", header: "Rule", width: "w-[24%]" },
            { key: "guidance", header: "Guidance" },
          ]}
          rows={GRAMMAR}
        />
      </AnchoredSection>

      <AnchoredSection id="accessibility" title="Accessibility">
        <RefTable
          columns={[
            { key: "rule", header: "Rule", width: "w-[28%]" },
            { key: "guideline", header: "Guideline" },
          ]}
          rows={ACCESSIBILITY}
        />
      </AnchoredSection>

      <AnchoredSection id="globalization" title="Globalization">
        <RefTable
          columns={[
            { key: "rule", header: "Rule", width: "w-[28%]" },
            { key: "guideline", header: "Guideline" },
          ]}
          rows={GLOBALIZATION}
        />
      </AnchoredSection>

      <AnchoredSection id="content-quality" title="Content quality">
        <RefTable
          columns={[
            { key: "rule", header: "Rule", width: "w-[28%]" },
            { key: "guideline", header: "Guideline" },
          ]}
          rows={CONTENT_QUALITY}
        />
      </AnchoredSection>

      <AnchoredSection id="terminology" title="Terminology">
        <RefTable
          columns={[
            { key: "use", header: "Use", width: "w-[25%]" },
            { key: "not", header: "Not", width: "w-[33%]" },
            { key: "reason", header: "Reason" },
          ]}
          rows={TERMINOLOGY}
        />
      </AnchoredSection>

      <AnchoredSection id="product-names" title="Product names">
        <RefTable
          columns={[
            { key: "use", header: "Use", width: "w-[27%]" },
            { key: "not", header: "Not", width: "w-[35%]" },
            { key: "reason", header: "Reason" },
          ]}
          rows={PRODUCT_NAMES}
        />
      </AnchoredSection>

      <AnchoredSection id="methodology" title="Methodology and sources">
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
    </>
  )
}
