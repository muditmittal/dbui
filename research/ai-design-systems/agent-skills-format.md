# Agent Skills Discovery — Format Reference
> Research for DBUI implementation | 2026-04-14

## What is it?

Agent Skills is a Cloudflare-led RFC (github.com/cloudflare/agent-skills-discovery-rfc) that defines a standard way for websites to publish AI-consumable skill packages. Any AI tool (Claude Code, Cursor, Copilot, Windsurf, etc.) can discover and install these skills.

## How it works

1. Website publishes `/.well-known/agent-skills/index.json`
2. AI tool or CLI runs `npx skills add https://yoursite.com`
3. CLI fetches the index, downloads skill files, integrates into the project

## Format

### index.json (discovery endpoint)
```json
{
  "$schema": "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
  "skills": [
    {
      "name": "dbui",
      "type": "skill-md",
      "description": "DBUI Design System — Databricks DuBois tokens and components",
      "url": "/.well-known/agent-skills/dbui.md",
      "digest": "sha256:abc123..."
    }
  ]
}
```

### SKILL.md (the actual skill)
A markdown file with YAML frontmatter:
```markdown
---
name: DBUI
description: Databricks DuBois design system — shadcn/ui reskinned with DuBois tokens
---

# DBUI Design System

## Tokens
...

## Components
...

## Rules
...
```

### Two distribution types:
- **`skill-md`**: Single markdown file (like our llms.txt)
- **`archive`**: `.tar.gz`/`.zip` with SKILL.md + resources (scripts, examples, assets)

## Nord's implementation (gold standard)

Nord Health publishes:
- `/llms.txt` — 5K token overview for quick context
- `/llms-full.txt` — 1M+ token comprehensive reference
- Agent Skills endpoint — 55+ web components, CSS conventions, theming, accessibility

Their skill covers:
- Component guidance (how to use every `<nord-*>` component)
- CSS custom property naming (`--n-color-*`, `--n-space-*`)
- Tailwind integration
- Theming (brands, dark mode, high contrast)
- Form validation patterns
- Common mistakes and do/don't rules
- Links to every component doc page

## What DBUI needs to publish

### Minimum viable:
1. `apps/portal/public/.well-known/agent-skills/index.json`
2. `apps/portal/public/.well-known/agent-skills/dbui.md` (our llms.txt content in SKILL.md format)

### Enhanced:
3. Archive with llms.txt + design-tokens.json + component specs
4. Add `npx skills add https://dbuidesign.vercel.app` to README

## Supported tools (40+)
Claude Code, Cursor, Codex CLI, GitHub Copilot, Windsurf, Cline, Aider, Continue, and more.

## Fallback for tools without skills support
- `/llms.txt` at site root
- CLAUDE.md in repo root
- .cursorrules in repo root
