# Peer Design Systems — Voice, Tone & Content Design Research

**Purpose:** Establish the depth and structure that leading design systems use for Voice & Tone / Content design, so DBUI can match their standard. Every claim below is quoted or closely paraphrased from a real source with a URL. Anything unverified is explicitly flagged.

**Date compiled:** 2026-07-22
**Systems covered:** Adobe Spectrum · IBM Carbon · Google Material Design 3

**Sourcing notes on verification method:**
- **Carbon** — server-rendered; fetched directly and reliably. High confidence.
- **Spectrum** — client-rendered SPA. Plain fetch returned empty. Content below was recovered via a JS-rendering reader proxy of the live pages and cross-checked against the public sitemap (`spectrum.adobe.com/sitemap.xml`). Page structure and quotes are from the live pages. High confidence on quotes; images/examples referenced by their alt text.
- **Material 3** — client-rendered SPA. The M3 page *bodies* could not be extracted even via reader proxy (deep client rendering). Page **existence and titles were confirmed** by resolving each `m3.material.io` URL. The **substance** (principles, tone map, mechanics) is quoted from Google's own equivalent guidance that mirrors the M3 content section: the official **Material Communication codelab** (`codelabs.developers.google.com`), the **legacy Material (m1) writing style page**, and search-surfaced snippets of the M3 style-guide pages. Each quote is attributed to the exact URL it came from. Where a statement is from m1/codelab rather than the m3 page body, it is marked **[m1]** or **[codelab]**.

---

## 1. ADOBE SPECTRUM

Primary hub: https://spectrum.adobe.com/page/voice-and-tone/

### 1.1 Section outline (the full content/writing section — from sitemap)
Spectrum treats content as a first-class system. Its writing/content pages are:

1. **Voice and tone** — https://spectrum.adobe.com/page/voice-and-tone/
2. **Grammar and mechanics** — https://spectrum.adobe.com/page/grammar-and-mechanics/
3. **In-product word list** (terminology database) — https://spectrum.adobe.com/page/in-product-word-list/
4. **Inclusive UX writing** — https://spectrum.adobe.com/page/inclusive-ux-writing/
5. **Writing about people** — https://spectrum.adobe.com/page/writing-about-people/
6. **Writing for readability** — https://spectrum.adobe.com/page/writing-for-readability/
7. **Writing for errors** — https://spectrum.adobe.com/page/writing-for-errors/
8. **Writing for onboarding** — https://spectrum.adobe.com/page/writing-for-onboarding/
9. **Writing with visuals** — https://spectrum.adobe.com/page/writing-with-visuals/
10. (Related, design-side) **Inclusive design** — https://spectrum.adobe.com/page/inclusive-design/

The **Grammar and mechanics** page alone has this sub-outline (its own on-page TOC):
AP style · Active and passive voice · Contractions · Verb tenses · Capitalization · Pronouns · Punctuation · Abbreviations · Numbers · Dates and time · Lists.

### 1.2 Voice principles (named pillars, with quotes)
Spectrum applies its overall design principles (rational, human, focused, collaborative) to language, then states three **voice** principles:

- **Clear and understandable** — "Ensure decisions about grammar and mechanics are research-informed and tested. Avoid language that's overly opinionated, funny, or trendy."
- **Friendly, honest, and responsible** — "Vary sentence style and structure for readability and relatability. Acknowledge and account for users' emotions."
- **Concise and simple** — "Describe only what's needed, without unnecessary decoration. Avoid creating new concepts and only name things when necessary."

> Source: https://spectrum.adobe.com/page/voice-and-tone/

Framing quote: "Just as products should look and act consistently, they should also speak consistently. We speak with one voice and vary our tone depending on situational context." (https://spectrum.adobe.com/page/voice-and-tone/)

### 1.3 Tone model — YES, flexes tone by context/emotion (a labeled spectrum)
"If voice is our products' personality, then **tone** is all the different ways we express that personality. Tone can vary depending on the people we talk to, as well as the situations in which we talk to those people... The right tone depends on a user's contextual needs and corresponding emotions for that experience."

Spectrum defines an explicit 5-point **tone spectrum**, each with an *Attitude* and a *Frequency* (how often it should be used):

| Tone | Attitude | Example | Frequency |
|---|---|---|---|
| **Motivational** | Positive and encouraging | "We're looking out for you and cheering you on. You've got this!" | Rarely |
| **Helpful** | Polite and respectful | "We know you're busy, so we'll make this brief." | Occasionally |
| **Instructive** | Neutral and direct | "Here is the information you need." | Often |
| **Reassuring** | Professional and reliable | "We know you're worried about this issue, and we're here to help." | Occasionally |
| **Supportive** | Concerned and empathetic | "Something bad has happened and we understand how you feel. We want to inform, guide, and support you through this." | Rarely |

> Source: https://spectrum.adobe.com/page/voice-and-tone/  (note: the points "aren't necessarily binary… it could exist somewhere between those points.")

### 1.4 Mechanics checklist
From https://spectrum.adobe.com/page/grammar-and-mechanics/ unless noted:
- **Base style:** Follows **AP style**; U.S. English is the source language; content is internationalized per locale.
- **Capitalization:** **Sentence case** for everything, including titles and UI elements. "Use sentence case for all aspects of designing Adobe product experiences, including titles and UI elements (e.g., tooltips, tabs, menu items)." Title case "only when it clarifies that we're speaking about a specific, official entity"; all caps "sparingly" (acronyms only).
- **Voice:** "Use active voice in most cases and use passive voice sparingly." Passive is a deliberate tool to "soften and provide distance" (e.g., "Your payment was declined." not "We declined your payment.").
- **Contractions:** "Use contractions to sound more conversational and natural." Avoid colloquial/old-fashioned ones; avoid in legal, payment, and account-security contexts.
- **Verb tenses:** "In general, use simple verb tenses: past, present, and future."
- **Pronouns:** Prefer **second person** ("you, your"); "talk to the user — not as them." Avoid speaking as the user.
- **Punctuation:** Don't use punctuation in place of words; **no ampersands** in UI copy ("Using the word 'and' is more inclusive, localizable, and readable"); use the **serial (Oxford) comma**.
- **Numbers, Dates and time, Abbreviations, Lists:** dedicated sections exist (own rules per locale).
- **Terminology:** A curated **In-product word list** flags each term as *Preferred* / *Use with caution* / *Avoid* with rationale (e.g., prefer "app" over "application"; avoid vague "asset"; don't coin `auto-` verbs when space allows).
- **UI-text patterns:** Dedicated pattern pages for **errors** (anatomy, component selection, empathy), **onboarding**, and **writing with visuals**.

### 1.5 Accessibility / inclusive language / localization stance
- **Inclusive UX writing** page: "Inclusive UX writing is accessible, but the reverse isn't always true." It covers visible text, non-visible descriptions (alt text), and provides a Preferred/Avoid table, e.g.:
  - "People" over "Customers" ("Be inclusive of current and potential users… not just the paying ones").
  - "You" over "Users" when addressing the reader.
  - "Play video" over "Watch video" ("Not everyone is 'watching'").
  > Source: https://spectrum.adobe.com/page/inclusive-ux-writing/
- **Localization:** built into mechanics — "in-product language is internationalized according to specific locale standards and style"; ampersands avoided partly because spelling out "and" is "more … localizable." (https://spectrum.adobe.com/page/grammar-and-mechanics/)
- Separate **Writing about people** page for identity-respectful language (verified to exist via sitemap; body not deep-quoted here).

### 1.6 Verbatim example quotes
1. "We speak with one voice and vary our tone depending on situational context." — https://spectrum.adobe.com/page/voice-and-tone/
2. "Describe only what's needed, without unnecessary decoration. Avoid creating new concepts and only name things when necessary." — https://spectrum.adobe.com/page/voice-and-tone/
3. "Use sentence case for all aspects of designing Adobe product experiences, including titles and UI elements (e.g., tooltips, tabs, menu items)." — https://spectrum.adobe.com/page/grammar-and-mechanics/
4. "Inclusive UX writing is accessible, but the reverse isn't always true." — https://spectrum.adobe.com/page/inclusive-ux-writing/
5. "The best error message is no error happening at all." — https://spectrum.adobe.com/page/writing-for-errors/

---

## 2. IBM CARBON

Primary hub: https://carbondesignsystem.com/guidelines/content/overview

### 2.1 Section outline
Carbon's Content guidelines pages:
1. **Overview** (Content foundations, Voice and tone, Writing for accessibility, References) — https://carbondesignsystem.com/guidelines/content/overview
2. **Writing style** — https://carbondesignsystem.com/guidelines/content/writing-style
3. **Action labels** (a full A–Z verb glossary) — https://carbondesignsystem.com/guidelines/content/action-labels

The **Writing style** page sub-outline: Capitalization · Simple writing · Conversational style · Inclusive language · Pronouns · Active and passive voice.
Carbon also defers heavily to two external corporate references: **IBM Style** (the corporate style guide) and the **IBM Accessibility → Content design** section.

### 2.2 Voice principles (Carbon inherits IBM brand voice)
Carbon doesn't coin its own adjectives; it points to IBM's brand voice. "When IBM content is at its best," it:
- "has a clear point of view."
- "is simple and logical."
- "builds on solid research, data, and analysis."
- "is intellectually ambitious, expressing a bigger idea."
- "is persuasive, not poetic."
- "is confident, but not boastful."
- "elevates facts and outcomes."
- "engages the thinker by speaking like the thinker."

> Source: https://carbondesignsystem.com/guidelines/content/overview

### 2.3 Tone model — YES, tone adapts to situation (described, not gridded)
"Tone describes how the IBM voice is expressed, and as such it can adapt to different situations. For example, the words chosen for error messages differ greatly from words you might see in an onboarding flow. The tone of error messages is economical and direct… Onboarding flows typically take a little more time, with full sentences and friendly explanations. The underlying voice in each case is consistent but with different word choices and a different sentence structure."

Carbon also frames a **conversational level** that shifts along the user journey: "The most conversational content is usually found in the 'discover, try, and buy' phases… Probably the least conversational content can be found in error messages where an economy of words is desirable."

> Source: https://carbondesignsystem.com/guidelines/content/overview and /writing-style

### 2.4 Mechanics checklist
From https://carbondesignsystem.com/guidelines/content/writing-style:
- **Capitalization:** **Sentence case** for ALL UI text. Explicitly bans title case and all caps, with reasoning. "Use sentence–case capitalization for all UI text elements." "Carbon does not consider UI elements within a product to be proper nouns." Detailed rules for when caps are allowed (product names, org names, trademarks, initialisms/acronyms, people, places).
- **Simple writing:** "Use the simplest term that is appropriate for your audience… Be succinct… Omit wordy or redundant phrases." "Put the thesaurus away!"
- **Tense:** "Use simple present tense." Avoid "have, has, had, been, should, would, and will."
- **Contractions:** Allowed — "Don't be afraid to use contractions when they fit the context and improve the flow."
- **Exclamation marks:** "Use exclamation marks only positively, not negatively… no more than one… in a context."
- **Politeness terms:** "We recommend avoiding terms of politeness such as please and thank you in a UI as they can be inappropriate or offensive in some cultural contexts" (use only when user is inconvenienced).
- **Word precision:** "can" = ability, "may" = permission, "might" = possibility (prefer "might").
- **Pronouns:** "Use the second person (you, your) as often as possible." First person "we/our" for IBM; avoid gender-specific third person.
- **Active vs passive:** Prefer active for directness; passive acceptable "if the true subject… is a system, and the human is secondary."
- **Terminology / word list:** A canonical **Action labels** A–Z glossary defines the exact verb to use for each UI action (Add, Apply, Cancel, Clear, Create vs New, Delete vs Remove vs Clear, Log in vs Sign in, etc.), with "Compare" cross-references. TIP: "Create a terminology list of words for your product that includes preferred words and words not to use."

### 2.5 Accessibility / inclusive language / localization stance
- **Inclusive language:** "IBM is committed to eliminating language that supports racial, cultural, or gender bias. It is critical that all words used in any capacity in product offerings be inclusive." Points to the IBM Terminology database + Inclusive IT Terminology site.
- **Writing for accessibility:** defers to IBM Accessibility → Content design, covering "text alternatives for visuals or audio content; errors and other messages; labels and inputs for forms; guidance for providing adequate context" + WCAG.
- **Localization:** IBM Style's stated purpose includes content being "appropriate for global audiences, and easy to translate"; politeness-term caution is explicitly cultural.

### 2.6 Verbatim example quotes
1. "Use sentence–case capitalization for all UI text elements. This style is predominantly lowercase." — https://carbondesignsystem.com/guidelines/content/writing-style
2. "The underlying voice in each case is consistent but with different word choices and a different sentence structure, the style and tone adapts." — https://carbondesignsystem.com/guidelines/content/overview
3. "Respect a user's time and make things quick and easy to read. Always trim back to as few words as possible, although don't be terse." — https://carbondesignsystem.com/guidelines/content/writing-style
4. "It is critical that all words used in any capacity in product offerings be inclusive in their language." — https://carbondesignsystem.com/guidelines/content/writing-style
5. "Use the second person (you, your) as often as possible. Second person is friendlier and more engaging." — https://carbondesignsystem.com/guidelines/content/writing-style

---

## 3. GOOGLE MATERIAL DESIGN 3

Primary hub: https://m3.material.io/foundations/content-design/overview
**Verification caveat:** M3 page bodies are client-rendered and could not be extracted; page existence/titles were URL-verified. Substance is quoted from Google's own mirror sources and marked **[codelab]** (https://codelabs.developers.google.com/codelabs/material-communication-guidance) or **[m1]** (https://m1.material.io/style/writing.html), or from M3 style-guide search snippets where noted.

### 3.1 Section outline (M3 content-design section — URLs confirmed to resolve)
1. **Overview** — https://m3.material.io/foundations/content-design/overview
2. **Style guide → Voice and tone** — https://m3.material.io/foundations/content-design/style-guide/voice-and-tone
3. **Style guide → UX writing best practices** — https://m3.material.io/foundations/content-design/style-guide/ux-writing-best-practices
4. **Style guide → Word choice** — https://m3.material.io/foundations/content-design/style-guide/word-choice
5. **Style guide → Grammar and punctuation** — https://m3.material.io/foundations/content-design/style-guide/grammar-and-punctuation
6. **Style guide → Capitalization** — https://m3.material.io/foundations/content-design/style-guide/capitalization
7. **Style guide → Global writing** — https://m3.material.io/foundations/content-design/style-guide/global-writing
8. **Notifications** — https://m3.material.io/foundations/content-design/notifications
9. **Accessibility** — https://m3.material.io/foundations/content-design/accessibility
10. **Alt text** — https://m3.material.io/foundations/content-design/alt-text

Philosophy statement (page banner text): "UI text should be understandable by anyone, anywhere." — https://m3.material.io/foundations/content-design/style-guide/grammar-and-punctuation ; legacy: "Text should be understandable by anyone, anywhere, regardless of their culture or language. Clear, accurate, and concise text makes interfaces more usable and builds trust." **[m1]** https://m1.material.io/style/writing.html

### 3.2 Voice principles (writing principles / voice descriptors)
Material frames writing **principles** first, then voice as brand personality. Core writing principles: **[codelab]**
- "Be concise, but not robotic — Write short, scannable segments of text that focus on a limited number of ideas."
- "Write simply and directly — Use simple, direct language that makes text easy to understand."
- "Address users clearly — In English, the second person (you or your) is often more direct and clear."
- "Communicate the essential details… so that users can focus on the task at hand."
> The principles "are designed to build trust and improve clarity through accurate and concise language."

Example **voice principles** (voice as personality, with sample descriptors): **[codelab]**
- "Helpful: Write like a human, not a machine. Explain errors and suggest a solution."
- "Accessible: Make text easy to understand for any new user…"
- "Inspirational: Emphasize benefits and accomplishments… in a positive, active voice."
> "Voice principles guide word choice and work best when accompanied by examples… Without examples, principles can often be too abstract."
> Source: https://codelabs.developers.google.com/codelabs/material-communication-guidance

### 3.3 Tone model — YES, and it's the most methodical: a "tone map" grid
"A voice should be consistent across an experience, while tone is contextual and can vary." "The tone of your writing communicates mood and emotion, whether or not you intend to." **[codelab]**

**Tone map method:** pick two spectrum axes (e.g., "Playful vs. serious," "Concise vs. detailed," "Emotive vs. neutral," "Casual vs. rigid"), draw a grid, then plot common message types on it — Onboarding, Confirmation & acknowledgement, Help & feedback, Errors, Notifications, Labels, Empty states. Considerations per message: available screen space; how critical comprehension is (destructive action at stake?); what you want the user to feel.
> "your tone should vary in response to points along a user journey, such as onboarding, confirmations, and errors."
> Source: https://codelabs.developers.google.com/codelabs/material-communication-guidance

### 3.4 Mechanics checklist
Base style: "This style guide is specific to English-language UX writing. Google generally follows Associated Press (AP) style." — https://m3.material.io/foundations/content-design/style-guide/grammar-and-punctuation
- **Capitalization:** **Sentence case.** "Titles, headings, labels, and menu items should use sentence-style capitalization (capitalizing only the first word of a sentence)." **[m1]** https://m1.material.io/style/writing.html ; dedicated M3 page: /style-guide/capitalization
- **Periods/punctuation:** "Skip periods and unnecessary punctuation… To help readers scan text, avoid using periods and other unnecessary punctuation" (esp. single-sentence UI like bulleted lists, dialog body). (grammar-and-punctuation)
- **Contractions:** "Contractions can make a sentence easier to understand and scan." (grammar-and-punctuation)
- **Serial comma:** "Use the serial (or Oxford) comma, except before an ampersand." (grammar-and-punctuation)
- **Numbers:** "Use commas for numbers between 1,000 and 1 million." Numerals over spelled-out — "'1, 2, 3' not 'one, two, three'." **[m1]** (grammar-and-punctuation / m1)
- **Ampersands:** "The '&' symbol can be used instead of 'and' in headlines, column headers, table headers, navigation labels, and buttons. However, when there's room, spelling out 'and' can improve readability." (grammar-and-punctuation)
- **Exclamation points / ellipses / dashes / hyphens / italics:** each has a rule — exclamation "sparingly," italics "sparingly" ("use bold weight instead"), "Don't use caps blocks." (grammar-and-punctuation)
- **Tense:** "Write in the present tense to describe product behavior. Avoid using the future tense." **[codelab/m1]**
- **Word choice / terminology:** "Write for all reading levels… No jargon… Use consistent words." Consistency tracked in a **content matrix** (spreadsheet) that includes a **word list** of terms to use and terms to avoid. **[codelab]**
- **UI-element references:** "Refer to UI elements and controls by label" (don't state the element type). **[codelab]**
- **Components / UI patterns:** dedicated guidance for **Dialogs, Snackbars, Banners** (priority ladder: Snackbar = low, Banner = medium, Dialog = highest) and a separate **Notifications** page. **[codelab]** + https://m3.material.io/foundations/content-design/notifications

### 3.5 Accessibility / inclusive language / localization stance
- **Accessibility & Alt text:** dedicated M3 pages. Distinguishes "Visible text" (labels, buttons, links, forms) vs "Nonvisible text" (alt text). "Alt text is a short label (up to 125 characters)… Since alt text is only for images, there is no need to add 'image of' or 'picture of'." **[codelab]** + https://m3.material.io/foundations/content-design/alt-text
- **Global writing / localization:** dedicated **Global writing** page. Core philosophy is explicitly cross-cultural: "understandable by anyone, anywhere, regardless of their culture or language." Codelab notes examples are American-English but "with sensitivity to changes in context and culture, this guidance can be applied to a UI in any language." https://m3.material.io/foundations/content-design/style-guide/global-writing
- **Inclusive voice:** an "Accessible" voice principle plus a "clear and inclusive voice" is called out as a goal. **[codelab]**

### 3.6 Verbatim example quotes
1. "UI text should be understandable by anyone, anywhere." — https://m3.material.io/foundations/content-design/style-guide/grammar-and-punctuation
2. "This style guide is specific to English-language UX writing. Google generally follows Associated Press (AP) style." — https://m3.material.io/foundations/content-design/style-guide/grammar-and-punctuation
3. "A voice should be consistent across an experience, while tone is contextual and can vary." — https://codelabs.developers.google.com/codelabs/material-communication-guidance
4. "Titles, headings, labels, and menu items should use sentence-style capitalization (capitalizing only the first word of a sentence)." — https://m1.material.io/style/writing.html
5. "Use the serial (or Oxford) comma, except before an ampersand." — https://m3.material.io/foundations/content-design/style-guide/grammar-and-punctuation

---

## 4. COMPARISON — WHAT SUBSECTIONS ALL THREE COVER (the "standard depth")

| Subsection / capability | Spectrum | Carbon | Material 3 |
|---|:--:|:--:|:--:|
| Explicit **voice principles** (named pillars) | ✅ 3 pillars | ✅ (IBM brand voice, 9 traits) | ✅ (principles + voice descriptors) |
| **Voice vs. tone** distinction | ✅ | ✅ | ✅ |
| **Tone flexes by context/emotion** | ✅ 5-point labeled spectrum (+frequency) | ✅ described (by journey phase) | ✅ **tone map** grid (axes × message types) |
| **Capitalization** rule (all use **sentence case**) | ✅ | ✅ | ✅ |
| **Punctuation** rules | ✅ | ✅ (partial) | ✅ |
| **Contractions** guidance | ✅ | ✅ | ✅ |
| **Numbers / dates / time** | ✅ | partial | ✅ |
| **Active vs. passive voice** | ✅ | ✅ | ✅ (present tense/active) |
| **Pronouns / person** (all favor 2nd person) | ✅ | ✅ | ✅ |
| **Terminology / word list** (preferred vs avoid) | ✅ In-product word list | ✅ Action labels A–Z | ✅ content matrix + word list |
| **Base external style** (AP etc.) | ✅ AP | ✅ IBM Style | ✅ AP |
| **UI-text patterns: errors** | ✅ dedicated page | ✅ (tone + labels) | ✅ (dialogs/snackbars) |
| **UI-text patterns: onboarding** | ✅ dedicated page | ✅ mentioned | ✅ (tone map + notifications) |
| **UI-text patterns: notifications/empty states** | ✅ (via patterns) | partial | ✅ Notifications page |
| **Accessibility writing (alt text / visible vs nonvisible)** | ✅ Inclusive UX writing | ✅ (IBM Accessibility) | ✅ Accessibility + Alt text pages |
| **Inclusive language** | ✅ + Writing about people | ✅ | ✅ (Accessible principle) |
| **Localization / global writing** | ✅ (locale-aware mechanics) | ✅ (IBM Style, cultural notes) | ✅ dedicated Global writing page |
| **Writing with visuals / image+text pairing** | ✅ dedicated page | partial | ✅ (accessible content design) |

### The common subsection set (present in ALL three)
1. Voice principles (named pillars)
2. Voice-vs-tone distinction
3. A tone model that flexes by context/emotion
4. Capitalization = **sentence case** (universal across all three)
5. Grammar & mechanics (punctuation, contractions, numbers, active voice, pronouns/2nd person)
6. A base external style standard (AP for Spectrum & Material; IBM Style for Carbon)
7. Terminology / word list (preferred vs. avoid)
8. UI-text patterns for errors (and onboarding/notifications)
9. Accessibility writing (alt text, visible vs. non-visible text)
10. Inclusive language
11. Localization / global writing

### Depth signature
- **Spectrum** = broadest content section (10 pages), strongest on *emotional* tone (labeled spectrum w/ frequency) and inclusive/identity writing ("Writing about people").
- **Material 3** = most *methodical* — the **tone map** (axes × message types) is a repeatable process artifact, plus dedicated Global writing + Alt text pages.
- **Carbon** = most *prescriptive on terminology* — the **Action labels A–Z** is an exhaustive canonical verb list; leans on IBM Style for the rest.
