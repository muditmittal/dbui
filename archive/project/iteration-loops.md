# Iteration loops — screenshot → DBUI output

Workflows for "you give me a screenshot, I produce DBUI-compliant React or Figma." Both follow the same shape: **draft → render → compare → revise → repeat**.

The Figma loop is fully autonomous today. The React loop has one human step (open URL + screenshot) until we add a headless browser. Both close under an hour of focused work.

---

## Loop A — Figma (fully autonomous)

```
┌────────────────────────────┐
│ 1. User shares screenshot   │
└──────────────┬──────────────┘
               ▼
┌────────────────────────────┐
│ 2. Agent reads it (Read)    │
│    Describes structurally   │
└──────────────┬──────────────┘
               ▼
┌────────────────────────────┐
│ 3. dbui_resolve_component   │  for each visible piece
│    dbui_resolve_icon         │  for each icon
│    dbui_resolve_token        │  for each color
└──────────────┬──────────────┘
               ▼
┌────────────────────────────┐
│ 4. dbui_compose_figma_frame  │  emits use_figma JS
└──────────────┬──────────────┘
               ▼
┌────────────────────────────┐
│ 5. use_figma (Figma MCP)     │  creates the frame on canvas
│    → returns rootId          │
└──────────────┬──────────────┘
               ▼
┌────────────────────────────┐
│ 6. get_screenshot(rootId)    │  captures the rendered Figma frame
└──────────────┬──────────────┘
               ▼
┌────────────────────────────┐
│ 7. Agent reads BOTH images   │
│    Identifies differences    │
│    (vision native to Claude) │
└──────────────┬──────────────┘
               ▼
       ┌───────┴───────┐
       │ Close enough? │
       └───┬───────┬───┘
        no │       │ yes
           ▼       ▼
       loop to 4  Done
```

**Where the leverage comes from:**

- Step 4 emits ready-to-run `use_figma` JS so step 5 is one MCP call.
- Step 6 uses the same MCP tool as everywhere else — no extra deps.
- Step 7 uses Claude's built-in vision; no separate diff tool needed.

**What ships in the agent's prompt:**

> When you create or revise a Figma frame from a reference screenshot:
> 1. Call `dbui_compose_figma_frame` with the layout you intend.
> 2. Run the resulting code via `use_figma`.
> 3. Call `get_screenshot` on the rootId to capture what you built.
> 4. Read the source screenshot and your screenshot side-by-side.
> 5. Note differences (alignment, spacing, missing elements, wrong icons, wrong colors).
> 6. If meaningful differences remain, repeat.

---

## Loop B — React (semi-autonomous, today)

```
┌────────────────────────────┐
│ 1. User shares screenshot   │
└──────────────┬──────────────┘
               ▼
┌────────────────────────────┐
│ 2. Agent reads it (Read)    │
└──────────────┬──────────────┘
               ▼
┌────────────────────────────┐
│ 3. dbui_resolve_*            │  same as Figma loop
└──────────────┬──────────────┘
               ▼
┌────────────────────────────┐
│ 4. Agent generates JSX       │
└──────────────┬──────────────┘
               ▼
┌────────────────────────────┐
│ 5. dbui_lint_react_snippet   │  catches arbitrary tokens, raw HTML
│    dbui_check_composition    │  catches custom-card patterns
│    dbui_check_copy           │  catches brandvoice violations
└──────────────┬──────────────┘
               ▼
┌────────────────────────────┐
│ 6. Agent fixes violations    │  using resolver tools
└──────────────┬──────────────┘
               ▼
┌────────────────────────────┐
│ 7. dbui_render_react_preview │  writes _preview/<name>.stories.tsx
│    → returns Storybook URL   │
└──────────────┬──────────────┘
               ▼
       ┌───────────────┐
       │ HUMAN STEP    │  open URL, screenshot, drop back
       │ (until #8)    │
       └───────┬───────┘
               ▼
┌────────────────────────────┐
│ 8. Agent compares both       │
│    images (vision)            │
└──────────────┬──────────────┘
               ▼
       ┌───────┴───────┐
       │ Close enough? │
       └───┬───────┬───┘
        no │       │ yes
           ▼       ▼
       loop to 4   Done
                   ↓
                   call render_react_preview
                   with cleanup: true
```

**The human step disappears when** we install a headless browser. See "Wiring puppeteer" below.

---

## Wiring puppeteer for full React autonomy

When network access permits, install `puppeteer-core`:

```bash
yarn add -D puppeteer-core
# Either bring your own Chrome, or:
yarn add -D @puppeteer/browsers
npx @puppeteer/browsers install chrome@latest
```

Then add a new tool `dbui_capture_react_preview` (sketch):

```js
// packages/dbui-mcp/src/tools/capture-react-preview.js
import puppeteer from "puppeteer-core"

export const tool = {
  name: "dbui_capture_react_preview",
  description: "Open a Storybook URL in headless Chrome and capture a screenshot.",
  inputSchema: {
    type: "object",
    properties: {
      url: { type: "string" },
      width: { type: "number", default: 1280 },
      height: { type: "number", default: 800 },
    },
    required: ["url"],
  },
}

export async function run({ url, width = 1280, height = 800 }) {
  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome",
    headless: "new",
  })
  try {
    const page = await browser.newPage()
    await page.setViewport({ width, height })
    await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 })
    // Storybook renders inside #storybook-preview-iframe — drill into it
    const frameHandle = await page.$("#storybook-preview-iframe")
    const frame = frameHandle ? await frameHandle.contentFrame() : page
    const screenshotPath = `/tmp/dbui-preview-${Date.now()}.png`
    await frame.screenshot({ path: screenshotPath, fullPage: true })
    return { ok: true, path: screenshotPath, message: `Saved to ${screenshotPath}.` }
  } finally {
    await browser.close()
  }
}
```

Wire it into `index.js` next to the other tools. The React loop becomes:

```
... 7. dbui_render_react_preview → URL
   8. dbui_capture_react_preview(URL) → /tmp/preview-<n>.png
   9. Agent reads /tmp/preview-<n>.png + source side-by-side
  10. Compare, revise, loop
```

No human step.

---

## What's "good enough"?

A useful threshold for stopping the loop:

| Property | Loose | Tight |
|---|---|---|
| Component identity (right Card, right Button) | All present | All present |
| Layout (rows, columns, gap shape) | Right-ish | ±4px on every gap |
| Color | Right family (primary, success, etc.) | Exact token |
| Type size + weight | Right ramp slot | Identical |
| Copy | Same intent | Same words |
| Iconography | Right concept | Identical icon |

Pick "loose" for a first pass; "tight" only if the user asks for pixel parity.

---

## Cleanup

`render_react_preview` writes files to `apps/portal/src/stories/_preview/`. Always clean up after a session:

```js
dbui_render_react_preview({ name: "FooBar", code: "...", cleanup: true })
```

Or wipe the whole directory:

```bash
rm -rf apps/portal/src/stories/_preview/
```
