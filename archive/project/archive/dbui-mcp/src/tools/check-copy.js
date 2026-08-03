/**
 * dbui_check_copy
 *
 * Checks user-facing copy (button labels, headings, error messages, empty
 * states, tooltips, descriptions) against packages/dbui/docs/brandvoice.md.
 *
 * Catches:
 *   - Banned words (utilize/leverage/seamless/robust/awesome/folks/...)
 *   - Emoji + exclamation marks in product UI
 *   - Title Case where Sentence case is required
 *   - Generic OK/Yes/No buttons (should use the action verb)
 *   - "Are you sure?" rhetorical questions in confirmation dialogs
 *   - "Successfully ..." in toasts
 *   - Hedging ("may", "might", "could potentially", "please be advised")
 *   - Marketing speak ("ecosystem", "solution", "best-in-class")
 *
 * Per-surface rules:
 *   - tooltip:  ≤8 words, no final period, capitalize first word
 *   - button:   verb-first, no period
 *   - heading:  noun phrase, sentence case, no marketing
 *   - toast:    short past-tense or imperative; no "Successfully"
 *   - empty:    title ≤6 words, description ≤20 words + 1 imperative CTA
 *   - error:    cause + next step; no "Oh no"; no emoji
 *   - status:   one-word or two; sentence case; matches system vocab
 *   - confirm:  no "Are you sure?"; no Yes/No buttons
 */

// ── Source-of-truth lists from brandvoice.md ──
const BANNED_WORDS = [
  // Marketing speak
  { word: "utilize", suggest: "use" },
  { word: "leverage", suggest: "use" },
  { word: "in order to", suggest: "to" },
  { word: "at this time", suggest: "now (or omit)" },
  { word: "please be advised", suggest: "(omit; just say it)" },
  { word: "kindly", suggest: "(omit)" },
  { word: "robust", suggest: "reliable, fast, accurate (whichever is true)" },
  { word: "seamless", suggest: "(omit; describe the actual benefit)" },
  { word: "cutting-edge", suggest: "(omit; let the feature speak)" },
  { word: "state-of-the-art", suggest: "(omit)" },
  { word: "best-in-class", suggest: "(omit)" },
  { word: "ecosystem", suggest: "platform, products" },
  { word: "solution", suggest: "feature, product, service" },
  { word: "stakeholders", suggest: "the specific role (admin, data engineer, …)" },
  { word: "synergies", suggest: "(banned)" },
  { word: "circle back", suggest: "(banned)" },
  { word: "low-hanging fruit", suggest: "(banned)" },
  { word: "holistic", suggest: "(omit; be specific)" },
  { word: "empower", suggest: "help, let, give" },
  { word: "unlock", suggest: "help, let, give" },
  { word: "simply", suggest: "(omit — usually condescending)" },
  { word: "just", suggest: "(omit — usually condescending)" },
  { word: "folks", suggest: "people, users, team" },
  { word: "guys", suggest: "people, users, team" },
  { word: "y'all", suggest: "people, users, team" },
  { word: "awesome", suggest: "(omit; show, don't tell)" },
  { word: "amazing", suggest: "(omit; show, don't tell)" },
  // Hedging
  { word: "may", suggest: "be specific — say 'will' if certain" },
  { word: "might", suggest: "be specific — say 'will' if certain" },
  { word: "could potentially", suggest: "say 'will' or 'may' (pick one)" },
  { word: "please", suggest: "(omit — imperative is the default)" },
]

const STATUS_VOCAB_PREFERRED = ["Running", "Failed", "Pending", "Succeeded", "Active", "Disabled", "Draft", "Healthy"]
const STATUS_VOCAB_BAD = [
  { word: "In progress", suggest: "Running" },
  { word: "In-progress", suggest: "Running" },
  { word: "Successful", suggest: "Succeeded" },
  { word: "Active", suggest: "Active" },
]

const GENERIC_BUTTON_LABELS = new Set(["OK", "Yes", "No", "Submit", "Done"])

// Emoji range — covers most pictorial emoji
const EMOJI_RE = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F02F}\u{1F1E6}-\u{1F1FF}\u{2300}-\u{23FF}\u{2700}-\u{27BF}\u{2B00}-\u{2BFF}]/u

// ── Helpers ──

function isSentenceCase(text) {
  // Heuristic: a sentence-case heading has only the first word capitalized
  // (plus brand nouns / acronyms). Title case has every word capitalized.
  const words = text.trim().split(/\s+/)
  if (words.length < 3) return true // too short to judge
  // Acronyms / brand nouns we accept as capital
  const ALLOW_CAPS = new Set([
    "Databricks", "Unity", "Catalog", "Genie", "Mosaic", "AI", "BI", "API",
    "SQL", "URL", "JSON", "ML", "LLM", "JWT", "I", "OAuth", "GPU", "CPU",
  ])
  let capitalsBeyondFirst = 0
  for (let i = 1; i < words.length; i++) {
    const w = words[i].replace(/[^\w]/g, "")
    if (!w) continue
    if (/^[A-Z]/.test(w) && !ALLOW_CAPS.has(w)) capitalsBeyondFirst++
  }
  // If more than 1/3 of non-first words are capitalized, looks like Title Case
  return capitalsBeyondFirst / (words.length - 1) <= 0.34
}

function wordCount(s) {
  return s.trim().split(/\s+/).filter(Boolean).length
}

function endsWithPeriod(s) {
  return /[.!?]$/.test(s.trim())
}

// ── Main ──

export const tool = {
  name: "dbui_check_copy",
  description:
    "Validate user-facing copy (button labels, headings, error messages, empty states, tooltips, etc.) against the DBUI brand voice rules in packages/dbui/docs/brandvoice.md. Use BEFORE finalizing any UI text. Returns violations with concrete rewrite suggestions.",
  inputSchema: {
    type: "object",
    properties: {
      text: {
        type: "string",
        description: "The copy to check. Can be a single label or a full block.",
      },
      surface: {
        type: "string",
        enum: ["button", "heading", "tooltip", "toast", "empty-title", "empty-description", "error", "confirm-title", "confirm-description", "status", "field-label", "field-helper", "tab", "page-description", "auto"],
        description:
          "Where this copy will appear. Different surfaces have different rules (tooltips ≤8 words, button labels are verbs, etc.). Use 'auto' if unsure.",
        default: "auto",
      },
    },
    required: ["text"],
  },
}

export function run({ text, surface = "auto" }) {
  const t = (text || "").trim()
  if (!t) return { text, surface, violations: [], note: "Empty input." }

  const violations = []

  // ── Universal rules (any surface) ──

  // No emoji
  if (EMOJI_RE.test(t)) {
    violations.push({
      level: "error",
      rule: "no-emoji",
      message: `Emoji are not allowed in product copy.`,
      fix: `Remove the emoji. Reserve emoji for marketing surfaces only.`,
    })
  }

  // No exclamation marks
  if (/!/.test(t)) {
    violations.push({
      level: "error",
      rule: "no-exclamation",
      message: `Exclamation marks are not allowed in product copy.`,
      fix: `End with a period or no punctuation. "Welcome!" → "Welcome".`,
    })
  }

  // Banned words (case-insensitive whole-word check)
  for (const { word, suggest } of BANNED_WORDS) {
    const re = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i")
    if (re.test(t)) {
      violations.push({
        level: "warning",
        rule: "banned-word",
        word,
        message: `"${word}" is on the brandvoice ban list.`,
        fix: `Replace with: ${suggest}`,
      })
    }
  }

  // Marketing-speak phrasing
  const marketingPhrases = [
    { phrase: /\bget started in seconds\b/i, fix: "State the actual time-to-first-value if known." },
    { phrase: /\bworld-?class\b/i, fix: "Omit; describe the actual capability." },
    { phrase: /\bnext-generation\b/i, fix: "Omit." },
    { phrase: /\binnovati(?:ng|on|ve)\b/i, fix: "Show the feature, don't claim innovation." },
    { phrase: /\bone-stop\b/i, fix: "Be specific about what's covered." },
  ]
  for (const { phrase, fix } of marketingPhrases) {
    if (phrase.test(t)) {
      violations.push({
        level: "warning",
        rule: "marketing-speak",
        message: `Marketing phrase detected.`,
        fix,
      })
      break
    }
  }

  // ── Surface-specific rules ──

  if (surface === "tooltip") {
    if (wordCount(t) > 8) {
      violations.push({
        level: "warning",
        rule: "tooltip-too-long",
        message: `Tooltip is ${wordCount(t)} words; brandvoice says ≤8.`,
        fix: `Trim to ≤8 words. "Click to open in a new browser tab." → "Open in new tab".`,
      })
    }
    if (endsWithPeriod(t)) {
      violations.push({
        level: "warning",
        rule: "tooltip-period",
        message: `Tooltips don't end with a period.`,
        fix: `Drop the trailing punctuation.`,
      })
    }
  }

  if (surface === "button") {
    if (GENERIC_BUTTON_LABELS.has(t)) {
      violations.push({
        level: "error",
        rule: "generic-button-label",
        message: `Generic button label "${t}" is not on-brand.`,
        fix: `Use the action verb: "Delete", "Save", "Run query", "Cancel". Confirmation buttons should match the dialog's verb.`,
      })
    }
    if (wordCount(t) > 4) {
      violations.push({
        level: "info",
        rule: "button-too-long",
        message: `Button label is ${wordCount(t)} words; usually 1–3 is right.`,
        fix: `Trim. "Save your changes" → "Save".`,
      })
    }
    if (endsWithPeriod(t)) {
      violations.push({
        level: "warning",
        rule: "button-period",
        message: `Button labels don't end with a period.`,
        fix: `Drop the trailing punctuation.`,
      })
    }
  }

  if (surface === "heading" || surface === "page-description") {
    if (!isSentenceCase(t)) {
      violations.push({
        level: "warning",
        rule: "title-case",
        message: `Headings use sentence case, not Title Case.`,
        fix: `Lowercase non-first words (except brand names + acronyms). "Manage Your Catalogs" → "Manage your catalogs" (or better: "Catalogs").`,
      })
    }
  }

  if (surface === "toast") {
    if (/successfully/i.test(t)) {
      violations.push({
        level: "warning",
        rule: "toast-successfully",
        message: `"Successfully ..." is filler in toasts.`,
        fix: `Drop "Successfully". "Successfully copied path" → "Path copied".`,
      })
    }
    if (wordCount(t) > 8) {
      violations.push({
        level: "info",
        rule: "toast-too-long",
        message: `Toast is ${wordCount(t)} words; transient feedback should be terse.`,
        fix: `Cut to one short clause. "Your table has been deleted from Unity Catalog." → "Table deleted".`,
      })
    }
  }

  if (surface === "empty-title") {
    if (wordCount(t) > 6) {
      violations.push({
        level: "warning",
        rule: "empty-title-too-long",
        message: `Empty-state title is ${wordCount(t)} words; brandvoice says ≤6.`,
        fix: `Tighten. "You don't have any dashboards yet" → "No dashboards yet".`,
      })
    }
    if (/^you/i.test(t) || /^there are/i.test(t)) {
      violations.push({
        level: "warning",
        rule: "empty-title-second-person",
        message: `Empty-state titles are noun phrases, not "You don't have…".`,
        fix: `"You don't have any X" → "No X yet".`,
      })
    }
  }

  if (surface === "empty-description") {
    if (wordCount(t) > 20) {
      violations.push({
        level: "warning",
        rule: "empty-description-too-long",
        message: `Empty-state description is ${wordCount(t)} words; brandvoice says ≤20.`,
        fix: `Trim. State the surface's purpose + what to do next, in one sentence.`,
      })
    }
  }

  if (surface === "error") {
    // Should have cause + next step
    const sentences = t.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean)
    if (sentences.length < 2 && wordCount(t) < 10) {
      violations.push({
        level: "warning",
        rule: "error-incomplete",
        message: `Error message looks incomplete.`,
        fix: `Format: cause + next step. "Couldn't run the query." → "Couldn't run the query. The warehouse is starting up. Retry in a few seconds."`,
      })
    }
    if (/something went wrong/i.test(t) || /oh no/i.test(t)) {
      violations.push({
        level: "error",
        rule: "error-vague",
        message: `Vague error language.`,
        fix: `Replace "Something went wrong" with the actual cause + next step.`,
      })
    }
  }

  if (surface === "confirm-title" || surface === "confirm-description") {
    if (/are you sure/i.test(t)) {
      violations.push({
        level: "error",
        rule: "confirm-rhetorical",
        message: `"Are you sure?" is a rhetorical hedge; brandvoice says no.`,
        fix: `State the action: "Delete users table?" instead of "Are you sure?".`,
      })
    }
    if (surface === "confirm-description" && !/can't be undone|cannot be undone|will be (deleted|removed|revoked)/i.test(t)) {
      violations.push({
        level: "info",
        rule: "confirm-no-consequence",
        message: `Confirmation description should name the irreversible consequence.`,
        fix: `Add: "All rows, columns, and permissions will be deleted. This can't be undone."`,
      })
    }
  }

  if (surface === "status") {
    for (const { word, suggest } of STATUS_VOCAB_BAD) {
      if (new RegExp(`\\b${word}\\b`, "i").test(t)) {
        violations.push({
          level: "warning",
          rule: "status-vocab",
          message: `"${word}" is not in the system status vocabulary.`,
          fix: `Use ${suggest}.`,
        })
      }
    }
    if (wordCount(t) > 2) {
      violations.push({
        level: "info",
        rule: "status-too-long",
        message: `Status badges are 1–2 words.`,
        fix: `Trim. "Currently running" → "Running".`,
      })
    }
  }

  if (surface === "field-label") {
    if (/required/i.test(t)) {
      violations.push({
        level: "warning",
        rule: "field-label-required",
        message: `Don't include "required" in the label; the asterisk handles that.`,
        fix: `Drop the word. "Workspace name (required)" → "Workspace name".`,
      })
    }
    if (endsWithPeriod(t) || /[:?]$/.test(t)) {
      violations.push({
        level: "warning",
        rule: "field-label-punctuation",
        message: `Field labels don't end with punctuation.`,
        fix: `Drop the trailing character.`,
      })
    }
  }

  // Capitalization quirks: "databricks" lowercase
  if (/\bdatabricks\b/.test(t) && !/Databricks/.test(t)) {
    violations.push({
      level: "error",
      rule: "brand-lowercase",
      message: `"Databricks" must be capitalized.`,
      fix: `Replace lowercase "databricks" with "Databricks".`,
    })
  }

  return {
    text,
    surface,
    summary: {
      errors: violations.filter((v) => v.level === "error").length,
      warnings: violations.filter((v) => v.level === "warning").length,
      info: violations.filter((v) => v.level === "info").length,
    },
    violations,
    note:
      violations.length === 0
        ? "Copy passes brandvoice checks."
        : `Open packages/dbui/docs/brandvoice.md for the full ruleset and on-brand examples.`,
  }
}
