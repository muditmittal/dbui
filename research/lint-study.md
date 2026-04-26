# Design Lint Study — Figma + React App

> Research output from a Cursor session on 2026-04-26. Captures the landscape of design lint tools (Figma plugins, ESLint plugins, Stylelint plugins, codemods, MCP-based linters) and a recommended stack for DBUI.
>
> **How to use this in another session:** read this file end-to-end before designing a custom DBUI lint solution. Treat it as the prior-art map. Sections 1–4 explain the tooling space. Section 5 is the concrete DBUI recommendation. Section 6 is the source list.

---

## TL;DR — recommended stack for DBUI

| Layer | Tool | Why for DBUI |
|---|---|---|
| **Code (off-the-shelf)** | [Deslint](https://www.deslint.com/) ESLint plugin + MCP | Purpose-built for AI-generated code; auto-fixes arbitrary Tailwind values to nearest token; ships as MCP so Cursor/Claude can self-correct ([Deslint](https://dev.to/jaydrao215/i-built-a-design-quality-gate-for-ai-generated-code-heres-why-visual-regression-isnt-enough-5epf), Apr 2026) |
| **Code (DBUI-specific)** | Custom `@dbui/eslint-plugin` (~6 rules) | No off-the-shelf plugin covers the `<Base>`-required, no-asChild, dbui-icons-only, 13px rules |
| **CSS-side fallback** | [Stylelint](https://www.npmjs.com/package/stylelint-design-tokens-plugin) + design-tokens-plugin | Catches hex colors in raw CSS that ESLint can't see |
| **Figma (zero build)** | [ComponentQA](https://componentqa.com/) ($16/mo) or [DesignLint AI](https://www.designlintai.tech/) (free tier) | Both auto-audit, deep-link to violations, suggest token replacements |
| **Figma (custom rules)** | Fork [destefanis/design-lint](https://github.com/srizon/figma-design-lint) | Open source, well-trodden customization path |
| **Bridge** | DTIF JSON as shared token source | Both sides lint against the same file |

The interesting recent development: in 2026, design lint moved from "find detached instances" tools toward **AI-aware verification layers** that suggest the right fix and integrate with coding agents via MCP. Deslint is the leading example of this.

---

## 1. Figma side

### Off-the-shelf plugins (recommended for DBUI now)

| Plugin | Strength | Token-fix capability | Pricing |
|---|---|---|---|
| **[ComponentQA](https://componentqa.com/)** | Design system **observability** — dashboard with trends/severity scoring, deep links into Figma to problematic nodes ([ComponentQA](https://componentqa.com/), 2026) | Token Integrity feature flags hardcoded colors against your variables | Free (5 credits) → Pro $16/mo → Team $60/mo (5 seats) |
| **[DesignLint AI](https://www.designlintai.tech/)** | AI-powered, supports Figma Variables + Tokens Studio + W3C DTCG; batch-fixes across instances ([DesignLint AI](https://www.designlintai.tech/), 2026) | Custom rules definable; PDF/JSON audit reports | Free 50 checks/mo → Team $49/mo |
| **[FigmaLint](https://github.com/southleft/figmalint)** | Open source, AI suggestions for hardcoded → token via fuzzy match; flags missing interactive states + a11y | Auto-fix bind hardcoded colors to closest variable | Free, MIT |
| **[Design Lint](https://github.com/destefanis/design-lint)** (destefanis fork) | Classic open source — detached instances, mixed styles, missing styles | Suggests existing variables (exact / similar / fuzzy) | Free, MIT |
| **[TokenOps](https://www.figma.com/community/plugin/1588136910586914696/tokenops-figma-variables-tokens-linter-audit-find-replace-remap-migration-for-design-systems)** | Audit + find/replace + remap for migrations | Token migration UI | Figma Community plugin |
| **[Fix Detached](http://dominate.design/fix-detached)** | Niche: only detached recovery, preserves overrides | Reattach with override preservation | Free |

### What these plugins detect

The shared detection pattern across all of them ([ComponentQA](https://componentqa.com/), [FigmaLint](https://github.com/southleft/figmalint)):

- **Hardcoded colors:** node has fill but `boundVariables` is empty → flag, suggest closest variable by HEX distance
- **Detached instances:** node looks like a component but `mainComponent` is null → flag, offer reattach
- **Mixed styles:** text node has both a textStyleId AND raw fontSize override → flag
- **Missing states:** component variant set lacks Hover/Focus/Disabled → flag (this is what FigmaLint adds beyond classic Design Lint)
- **Token integrity:** variable reference points to a deleted/renamed token → flag

### Build your own (when off-the-shelf isn't enough)

The standard path ([Daniel Destefanis tutorial](https://building.theatlantic.com/how-to-set-up-custom-design-linting-in-figma-using-the-design-lint-plugin-c435e2f8851b), [Figma Plugin docs](https://developers.figma.com/docs/plugins/plugin-quickstart-guide/)):

1. Fork the open-source Design Lint repo
2. Plugin architecture is **two halves**: `code.js` (sandbox, walks Figma node tree) + `ui.html` (iframe, handles UI / network)
3. Add custom rules — for DBUI you'd want:
   - "Custom: prefix detected on raw frame" (per `composition-rules.md`)
   - "Auto-layout missing on component" (per `CLAUDE.md` zero-hardcoded-values rule)
   - "padding/radius value not bound to variable"
   - "icon used outside its category" (e.g., `use:component` icons used as nav items)
4. Use [`@figma/eslint-plugin-figma-plugins`](https://github.com/figma/eslint-plugin-figma-plugins) to keep your plugin code aligned with Figma's API best practices

The plugins above already cover ~80% of generic cases — only fork if you need DBUI-specific rules (Custom: prefix, composition rules, the "no use:component icons in nav" rule).

---

## 2. React/code side

### Off-the-shelf plugins (ranked by fit for DBUI)

| Plugin | What it does | Auto-fix | Best for |
|---|---|---|---|
| **[Deslint](https://www.deslint.com/docs/rules)** (`@deslint/eslint-plugin`) | 34 rules across colors / spacing / typography / a11y / consistency / motion. Tailwind-focused. Flags `bg-[#FF5733]`, `p-[13px]`, contrast failures, missing dark variants ([Deslint Rules Reference](https://www.deslint.com/docs/rules)) | **Yes** — auto-fixes arbitrary values to nearest design token ([Deslint](https://www.deslint.com/)) | DBUI's exact use case (Tailwind v4 + AI agents) |
| **[@atlaskit/eslint-plugin-design-system](https://www.npmjs.com/package/@atlaskit/eslint-plugin-design-system)** | The gold standard. `ensure-design-token-usage`, `no-deprecated-design-token-usage`, `no-banned-imports`, `no-css-tagged-template-expression`, plus per-component migration rules ([npm](https://www.npmjs.com/package/@atlaskit/eslint-plugin-design-system), v13.43.2 Apr 2026) | Yes, many rules ship `--fix` autofixes | Reference patterns to copy into your own plugin |
| **[@lapidist/design-lint](https://design-lint.lapidist.net/)** | DTIF-native; multi-framework (React/Vue/Svelte/Angular/HTML); JS + TS + CSS in one tool ([design-lint](https://design-lint.lapidist.net/)) | Yes (`--fix`) | If you want one tool that handles JSX + CSS + DTIF tokens together |
| **[Stylelint Polaris](https://polaris.shopify.com/tools/stylelint-polaris)** | 40+ Stylelint rules; `selector-disallowed-list` to block component overrides | Some autofixes | Reference for CSS-side enforcement |
| **[@metamask/eslint-plugin-design-tokens](https://github.com/MetaMask/eslint-plugin-design-tokens)** | `no-deprecated-classnames` with replacement suggestions | Yes | Lightweight reference |
| **[eslint-plugin-tailwindcss](https://github.com/poupe-ui/eslint-plugin-tailwindcss/blob/HEAD/docs/rules/no-arbitrary-value-overuse.md)** | `no-arbitrary-value-overuse` — caps arbitrary values per file | No (warns only) | If Deslint is overkill |
| **[stylelint-design-tokens-plugin](https://www.npmjs.com/package/stylelint-design-tokens-plugin)** | Reads JSON token file, validates `env(--token)` usage in CSS ([npm](https://www.npmjs.com/package/stylelint-design-tokens-plugin)) | No | CSS-only fallback |
| **[forbid-elements](https://github.com/jsx-eslint/eslint-plugin-react/issues/3876)** (eslint-plugin-react) | Block specific JSX elements like raw `<button>` ([Stack Overflow](https://stackoverflow.com/questions/69372035/eslint-custom-rule-disable-specific-html-elements-in-jsx-syntax)) | No | Quick wins, no plugin needed |
| **`no-restricted-imports`** (built-in ESLint) | Block imports with custom error message → "use `@dbui/components/ui/button`" ([ESLint](http://eslint.org/docs/rules/no-restricted-imports)) | No | Free, ships with ESLint |

### How auto-fix actually suggests the right token

This is the part most people don't know. There are **three patterns** ([Deslint blog](https://www.deslint.com/blog/tailwind-arbitrary-values), [eslint-plugin-react-native-design-tokens](https://github.com/sugitata/eslint-plugin-react-native-design-tokens)):

1. **Nearest-value match** — for colors, compute HEX distance (Euclidean RGB or LAB) → suggest closest token. For spacing, snap to nearest in the scale (e.g. 13px → 12px/`spacing-mid`).
2. **Pattern-based** — regex maps (`#FFFFFF` → `--background`, `font-medium` → `font-semibold`).
3. **Suggestion strings per project** — rule accepts a `suggestion` config, points to your specific token names ([react-native-design-tokens](https://github.com/sugitata/eslint-plugin-react-native-design-tokens)).

In an ESLint rule, the auto-fix is implemented via the `fix(fixer)` callback in `context.report` ([ESLint custom rule tutorial](https://eslint.org/docs/latest/extend/custom-rule-tutorial), [Backlight](https://medium.com/quick-code/use-eslint-to-enforce-design-system-eaffbb1cd4e7)):

```js
context.report({
  node,
  message: `Use semantic token instead of ${value}. Suggested: ${suggestion}.`,
  fix(fixer) {
    return fixer.replaceText(node, suggestion);
  },
});
```

For one-shot bulk migrations (DBUI v1 → v2), use [jscodeshift](https://github.com/criography/jscodeshaft) or copy the [@mui/codemod](https://www.npmjs.com/package/@mui/codemod?activeTab=readme) pattern — codemods are heavier than ESLint fixers but transform whole codebases in one run.

### What to write yourself for DBUI

The `CLAUDE.md` and `llms.txt` already encode rules that no off-the-shelf plugin covers. Ship a tiny `@dbui/eslint-plugin` with these 6:

| Rule | Detects | Auto-fix |
|---|---|---|
| `dbui/no-raw-button` | `<button>` (lowercase JSX) | Import `Button` from `dbui/components/ui/button`, replace `<button>` with `<Button>` |
| `dbui/no-raw-input` | `<input>` (lowercase JSX) | Same pattern with `Input` |
| `dbui/icons-from-dbui` | `from "lucide-react"`, `from "@heroicons/*"`, `from "react-icons/*"` | Rewrite import to `from "dbui/components/icons/{Name}"` |
| `dbui/no-asChild` | `asChild` prop on Base UI primitives | Rewrite to `render={<Component />}` |
| `dbui/typography-13px` | `text-sm` (Tailwind default = 14px) | Replace with `text-[13px]` (DBUI base = 13px) |
| `dbui/base-shell-required` | Top-level page component without `<Base>` wrapper | Suggest only (file-level, can't auto-fix safely) |

The Backlight tutorial walks the whole pipeline ([Use ESLint to Enforce Design System](https://medium.com/quick-code/use-eslint-to-enforce-design-system-eaffbb1cd4e7)): JSX → AST → visitor pattern → `context.report` with fix. Use [astexplorer.net](https://astexplorer.net/) to author rules interactively.

---

## 3. CI integration

What teams actually wire up ([@lapidist/design-lint CI docs](https://design-lint.lapidist.net/), [Deslint](https://www.deslint.com/)):

- **Per-PR lint** — `eslint --max-warnings 0` in GitHub Actions; PR fails if any DBUI lint errors
- **Lint cache** — caches between runs (`.eslintcache`) for speed on big repos
- **Figma audit job** — schedule ComponentQA dashboards; weekly Slack digest of violations
- **Token sync job** — pull tokens from Figma via [Specify](https://backlight.dev/docs/specify) or Tokens Studio → write `tokens.json` → both Figma and code lint read the same file
- **MCP integration** — Deslint ships an MCP server; agents (Cursor, Claude Code, Windsurf) call it on every save and self-correct violations before human review ([Deslint](https://dev.to/jaydrao215/i-built-a-design-quality-gate-for-ai-generated-code-heres-why-visual-regression-isnt-enough-5epf))

The MCP angle is especially relevant given prior plans for an `@dbui/mcp` server. Deslint demonstrates the pattern: lint rules + MCP exposure = agent self-correction loop. Ship `dbui:lint(file)` as a tool alongside `dbui:search_components`.

---

## 4. Bridging Figma ↔ code (the actual hard part)

Most tools only do one side. The shared-source-of-truth approach that works:

```
            tokens.json (DTIF)
              /          \
       Figma plugin     ESLint plugin
       (lints file)     (lints code)
              \          /
        Code Connect (mappings)
```

Pieces:
- **DTIF** — [Design Token Interchange Format](https://dtif.lapidist.net/) is the W3C-track shared format both sides parse natively (used by lapidist's design-lint)
- **Token sync** — Specify or Tokens Studio writes `tokens.json` from Figma; both Figma plugin and ESLint plugin read it
- **Code Connect** — verifies the Figma component maps to the expected code import (DBUI already does this for ~600 components per `figma.config.json`)
- **Knapsack** — paid platform that hosts the dashboard view of "where the systems disagree" ([Knapsack](https://www.knapsack.cloud/features/component-and-pattern-management))

Backlight.dev was the leading product here but [shut down June 2025](https://backlight.dev/features). The replacements as of 2026 are Knapsack (enterprise), DTIF + lapidist/design-lint (open source), or rolling a thin sync (which is what fits DBUI's scale).

---

## 5. Concrete recommendation for DBUI

Given the existing setup (Tailwind v4, AI-agent first, MCP plans, 47 semantic tokens, tokens already in `globals.css`):

| # | What | Effort | Impact |
|---|---|---|---|
| 1 | Install **Deslint** as ESLint plugin in the monorepo. Configure to error on `no-arbitrary-colors`, `no-arbitrary-spacing`, `no-arbitrary-typography`, `no-arbitrary-zindex`, `no-arbitrary-border-radius`, `no-inline-styles`. | 1 hr | Catches 80% of generic Tailwind drift across the portal + any consumer |
| 2 | Build **`@dbui/eslint-plugin`** with the 6 DBUI-specific rules above. Use Atlassian's plugin source as a reference. | 2-3 days | Catches DBUI-specific violations no off-the-shelf plugin sees |
| 3 | Ship a **`tokens.json` (DTIF)** file alongside `globals.css` so both Figma and code lints read the same source of truth | Half day | Prevents Figma ↔ code drift |
| 4 | **ComponentQA Pro** ($16/mo) on the DBUI Figma file. Get the dashboard + deep links + alerts. | 1 hr | Catches Figma-side drift without authoring rules |
| 5 | Wire ESLint into GitHub Actions with `--max-warnings 0` for the dbui packages | 1 hr | Enforces in CI |
| 6 | Later: expose `@dbui/eslint-plugin` rules as MCP tools (the Deslint pattern) so agents self-correct in real time | 2-3 days | Multiplier on rules; closes the AI loop |

Steps 1, 2, 4, 5 are the 80/20. They land DBUI's lint coverage in roughly a week of work. Steps 3 and 6 set up the eventual Figma↔code↔MCP triangle.

This pairs cleanly with prior eslint-plugin plans — Deslint covers the generic part you'd otherwise have to build, leaving only the DBUI-specific rules in the custom plugin.

### Suggested file layout for the custom plugin

```
packages/dbui-eslint-plugin/
├── package.json              # name: "@muditmittal/dbui-eslint-plugin"
├── README.md                 # rule list + install instructions
├── src/
│   ├── index.ts              # exports rules + recommended config
│   ├── rules/
│   │   ├── no-raw-button.ts
│   │   ├── no-raw-input.ts
│   │   ├── icons-from-dbui.ts
│   │   ├── no-asChild.ts
│   │   ├── typography-13px.ts
│   │   └── base-shell-required.ts
│   └── utils/
│       ├── ast-helpers.ts    # JSXElement matchers, import helpers
│       └── token-map.ts      # hex→token, class→token mappings (read from tokens.json)
└── tests/
    └── rules/
        └── *.test.ts         # use @typescript-eslint/rule-tester
```

Each rule should:
1. Have a `meta` block with `type: "problem"`, `fixable: "code"`, and a `messages` map keyed by violation type
2. Implement `create(context)` returning visitors (e.g. `JSXOpeningElement`, `ImportDeclaration`)
3. Provide both `fix(fixer)` (auto-applied with `--fix`) AND `suggest` (manual review) where the fix is non-trivial
4. Read project-specific config (e.g. token map path) from `context.options[0]`

### Recommended `eslint.config.js` shape for consumers

```js
import dbui from "@muditmittal/dbui-eslint-plugin";
import deslint from "@deslint/eslint-plugin";

export default [
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { dbui, deslint },
    rules: {
      // Generic Tailwind drift (off-the-shelf)
      "deslint/no-arbitrary-colors": "error",
      "deslint/no-arbitrary-spacing": "error",
      "deslint/no-arbitrary-typography": "error",
      "deslint/no-arbitrary-zindex": "error",
      "deslint/no-arbitrary-border-radius": "error",
      "deslint/no-inline-styles": "error",

      // DBUI-specific (custom)
      "dbui/no-raw-button": "error",
      "dbui/no-raw-input": "error",
      "dbui/icons-from-dbui": "error",
      "dbui/no-asChild": "error",
      "dbui/typography-13px": "warn",
      "dbui/base-shell-required": "warn",
    },
  },
];
```

---

## 6. Sources

- [Deslint — Design Quality Gate for AI-Generated Code](https://www.deslint.com/) (2026)
- [Deslint Rules Reference (34 rules)](https://www.deslint.com/docs/rules) (2026)
- [Deslint blog — Tailwind arbitrary values](https://dev.to/jaydrao215/i-built-a-design-quality-gate-for-ai-generated-code-heres-why-visual-regression-isnt-enough-5epf) (2026)
- [@atlaskit/eslint-plugin-design-system](https://www.npmjs.com/package/@atlaskit/eslint-plugin-design-system) (v13.43.2, Apr 2026)
- [Atlassian ensure-design-token-usage rule](https://atlassian.design/components/eslint-plugin-design-system/ensure-design-token-usage) (2026)
- [@lapidist/design-lint — DTIF-native linter](https://design-lint.lapidist.net/) (2026)
- [DesignLint AI — Figma plugin](https://www.designlintai.tech/) (2026)
- [ComponentQA — Figma observability](https://componentqa.com/) (2026)
- [FigmaLint by southleft](https://github.com/southleft/figmalint) (2026)
- [Tokens Studio for Figma](https://www.figma.com/community/plugin/843461159747178978/tokens-studio-for-figma-figma-tokens) (2026)
- [Stylelint Polaris (Shopify)](https://polaris.shopify.com/tools/stylelint-polaris) (2026)
- [stylelint-design-tokens-plugin](https://www.npmjs.com/package/stylelint-design-tokens-plugin) (2026)
- [eslint-plugin-tailwindcss no-arbitrary-value-overuse](https://github.com/poupe-ui/eslint-plugin-tailwindcss/blob/HEAD/docs/rules/no-arbitrary-value-overuse.md) (2026)
- [@metamask/eslint-plugin-design-tokens](https://github.com/MetaMask/eslint-plugin-design-tokens) (2026)
- [ESLint custom rule tutorial](https://eslint.org/docs/latest/extend/custom-rule-tutorial)
- [Backlight — Use ESLint to Enforce Design System](https://medium.com/quick-code/use-eslint-to-enforce-design-system-eaffbb1cd4e7)
- [no-restricted-imports — ESLint built-in](http://eslint.org/docs/rules/no-restricted-imports)
- [Figma Plugin Quickstart](https://developers.figma.com/docs/plugins/plugin-quickstart-guide/) (2026)
- [Setting up custom design linting in Figma](https://building.theatlantic.com/how-to-set-up-custom-design-linting-in-figma-using-the-design-lint-plugin-c435e2f8851b) (Atlantic eng blog)
- [@mui/codemod](https://www.npmjs.com/package/@mui/codemod?activeTab=readme) (reference codemod pattern)
- [v0 Design System Enforcement](https://ronniehuss.co.uk/inside-ai-coding-assistants-v0-design-system-enforcement/) (2026)
