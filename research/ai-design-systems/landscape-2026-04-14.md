# AI-First Design Systems — Landscape Research
> Date: 2026-04-14 | Author: Isaac (for Mudit)

## llms.txt Adopters

| Design System | URL | Approach |
|---|---|---|
| **Nord Health** | nordhealth.design/ai/llms-txt/ | Gold standard. /llms.txt (5K tokens) + /llms-full.txt (1M tokens). Agent Skills via `npx skills add`. Compatible with 40+ AI tools. |
| **Ant Design** | ant.design/docs/react/llms | llms.txt + llms-full.txt. 73 components with "When to Use", code examples, API, tokens, FAQ. |
| **Carbon (IBM)** | carbondesignsystem.com/llms.txt | Index with foundations, 60+ components, 15 composition patterns, data viz guidelines. |
| **MUI (Material UI)** | mui.com/material-ui/llms.txt | Versioned llms.txt files (e.g., per major version). |
| **Chakra UI** | chakra-ui.com/docs/get-started/ai/llms | Segmented: /llms-components.txt, /llms-v3-migration.txt. |
| **Ark UI** | ark-ui.com/docs/overview/llms.txt | Separate llms.txt per framework (React, Solid, Vue, Svelte). |
| **Atlassian** | atlassian.design/llms.txt | Enterprise-scale adoption. |

**Who does NOT have llms.txt:** Apple HIG, Google Material Design 3, Adobe Spectrum, Microsoft Fluent, Shopify Polaris.

## shadcn Custom Registries (184 published)

| Registry | URL | What it does |
|---|---|---|
| **Vercel registry-starter** | github.com/vercel/registry-starter | Official template, branded "AI-Native Design System." "Open in v0" buttons. |
| **Kibo UI** | kibo-ui.com | Higher-level components (data tables, file dropzones, AI chat). |
| **prompt-kit** | prompt-kit.com | AI-specific: PromptInput, ResponseStream, Markdown, Chat. |
| **AI Elements (Vercel)** | elements.ai-sdk.dev | Official Vercel AI SDK components. 30+ for streaming, tool calls, reasoning. |
| **assistant-ui** | r.assistant-ui.com | Full AI chat interface (Thread, Message, Composer). |
| **Supabase** | supabase.com/ui/r/ | Enterprise company publishing internal DS as shadcn registry. |
| **Auth0, Clerk, Algolia** | Various | Product companies distributing branded UI via registries. |

## MCP Servers for Design Systems

| Tool | What it does |
|---|---|
| **Figma MCP** (official) | Reads Figma variables, tokens, components. Auto-generates rules files. |
| **Storybook MCP** | Exposes "Component Manifest" — optimized payload with APIs, variants, tokens. |
| **shadcn/ui MCP** | Fetches component docs and registry info into AI agents. |
| **design-systems-mcp** (Southleft) | 188+ curated entries with W3C, WCAG, DS best practices via vector search. |

## shadcn/skills (March 2026)

- Generates `.shadcn/skills.md` per project with machine-readable component docs
- Reads components.json, knows framework, aliases, icon library
- `registry:base` distributes entire design system as single payload
- Prevents AI hallucinations with accurate, project-specific specs

## Figma-to-Code AI Tools

| Tool | Approach |
|---|---|
| **Anima** | 1.5M installs, IBM-backed. Maps to existing component libraries. |
| **Builder.io Visual Copilot** | Maps Figma to YOUR React components, not generating new ones. |
| **Locofy** | Lightning (one-click AI) + Classic (manual). Multi-framework. |
| **Semi Design** (ByteDance) | 3000+ tokens, "Design to Code in one click", DSM auto-generates Figma Kit from code. |

## Emerging Concepts

| Name | What's novel |
|---|---|
| **Context-Based Design Systems** (Southleft) | Components carry metadata about meaning, behavior, usage context — not just visual specs. |
| **Brad Frost AI & DS Course** | aianddesign.systems — $500 course, covers context-based systems, AI-generated components. |
| **llms-txt-hub** | github.com/thedaviddias/llms-txt-hub — directory of sites implementing llms.txt. |
| **awesome-cursorrules** | github.com/PatrickJS/awesome-cursorrules — curated .cursorrules including DS rules. |

## DBUI Priority Actions

1. **Deploy portal** → llms.txt + registry go live (done, needs deploy)
2. **Agent Skills** → `npx skills add https://dbuidesign.vercel.app` (Nord's model)
3. **`.shadcn/skills.md`** → leverage shadcn v4 native support
4. **DBUI MCP server** → queryable tokens/components
5. **v0 integration** → "Open in v0" buttons, custom theme
