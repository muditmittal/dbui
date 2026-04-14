# DBUI Design System — Global Rules

> **Purpose:** Permanent reference for system-wide visual decisions. These rules apply to ALL components and inform new work.
> Per-component specs are temporary — generated during Figma→code handoff, discarded after implementation.
>
> **Last updated:** 2026-04-10

---

## Figma→Code Handoff Workflow

1. You finalize a component in Figma
2. We generate a temporary handoff spec with ⚠️ verify items (lives in `specs/handoff/`)
3. You approve — mark ✅ or correct ⚠️ items
4. I implement from the approved spec
5. Handoff spec is deleted — the code is now the source of truth

### Value notation (for handoff specs)
- **Token names** when mapping is known (e.g., `shadow/shadow-xs`, `Paragraph`, `action/primary`)
- **⚠️ (exact value), (assumed token)** when uncertain — you spot and correct these
- **Raw value** when no token exists — explicitly marked

---

## Global Rules (apply to ALL components unless overridden)

These are system-wide. If a component follows these exactly, I won't repeat them.

### Typography
| Property | Figma Text Style | Font | Tailwind |
|----------|-----------------|------|----------|
| Body text | `Paragraph` | SF Pro Text 400, 13px/20px | `text-[13px] leading-[20px] font-normal` |
| Labels/headings | `Bold` | SF Pro Text 600, 13px/20px | `text-[13px] leading-[20px] font-semibold` |
| Captions/hints | `Hint` | SF Pro Text 400, 12px/16px | `text-[12px] leading-[16px]` |
| Code | `Code` | SF Mono 400, 13px/20px | `font-mono text-[13px] leading-[20px]` |
| Small headings | `Title 4` | SF Pro Display 600, 13px/20px | `font-display text-[13px] leading-[20px] font-semibold` |
| Section headings | `Title 3` | SF Pro Display 600, 18px/24px | `font-display text-[18px] leading-[24px] font-semibold` |
| Page headings | `Title 2` | SF Pro Display 600, 22px/28px | `font-display text-[22px] leading-[28px] font-semibold` |
| Large headings | `Title 1` | SF Pro Display 600, 32px/40px | `font-display text-[32px] leading-[40px] font-semibold` |

### Shadows
| Figma Effect Style | CSS Value | Tailwind | Use for |
|-------------------|-----------|----------|---------|
| `shadow/shadow-xs` | `0 1px 0 rgba(0,0,0,0.05)` | `shadow-xs` | Form controls, bordered buttons |
| `shadow/shadow-sm` | `0 2px 3px + 0 1px` | `shadow-sm` | Elevated elements (active pill tabs) |
| `shadow/shadow` | `0 3px 6px` | `shadow` | Cards |
| `shadow/shadow-md` | `0 2px 16px rgba(0,0,0,0.08)` | `shadow-md` | Popovers, dropdowns |
| `shadow/shadow-lg` | `0 8px 40px rgba(0,0,0,0.13)` | `shadow-lg` | Dialogs, modals |
| `shadow/shadow-focus` | `0 0 0 1px white, 0 0 0 3px var(--ring)` | `shadow-focus` | Focus indicator (filled variants) |

### Radius
| Figma Variable | CSS Value | Tailwind | Use for |
|---------------|-----------|----------|---------|
| `radius/radius-sm` | 4px | `rounded-sm` | Buttons, inputs, form controls |
| `radius/radius-md` | 8px | `rounded-lg` | Cards, dialogs, popups, dropdown menus |
| `radius/radius-xl` (16px) | `rounded-xl` | Drawer corners |
| `radius/radius-2xl` | 999px | `rounded-full` | Badges, pills, switch, radio |

### Interactive States (non-filled variants)
| State | Background | Border | Text | Shadow |
|-------|-----------|--------|------|--------|
| Default | transparent | `border/input` | `text/foreground` | `shadow/shadow-xs` |
| Hover | `action/hover` | `action/primary` | varies | `shadow/shadow-xs` |
| Press/Active | `action/press` | `action/primary-press` | varies | `shadow/shadow-xs` |
| Focus | — | `action/ring`, border-width 2px | unchanged | varies |
| Disabled | — | `action/disabled` | `text/disabled-foreground` | none |

### Interactive States (filled variants — Primary, Destructive)
| State | Background | Text | Shadow |
|-------|-----------|------|--------|
| Default | `action/primary` / `action/destructive` | `action/primary-foreground` / `action/destructive-foreground` | `shadow/shadow-xs` |
| Hover | `action/primary-hover` / `action/destructive-hover` | unchanged | `shadow/shadow-xs` |
| Press | `action/primary-press` / `action/destructive-press` | unchanged | `shadow/shadow-xs` |
| Focus | unchanged bg | unchanged | `shadow/shadow-focus` |
| Disabled | `action/disabled` | `action/disabled-foreground` | none |

### Focus Ring
| Type | Tokens | Tailwind |
|------|--------|----------|
| Non-filled | `action/ring` at 2px border-width | `focus-visible:border-2 focus-visible:border-ring` |
| Filled | `shadow/shadow-focus` | `focus-visible:shadow-focus focus-visible:overflow-clip` |
| Danger variant focus | Uses `action/ring` (blue), NOT `action/destructive` | `focus-visible:border-ring` |

### Validation States (form controls)
| Validation | Border Token | Shadow |
|-----------|-------------|--------|
| Error | `action/destructive` | `shadow/shadow-xs` (unchanged) |
| Warning | `action/warning` | `shadow/shadow-xs` (unchanged) |
| Success | `action/success` | `shadow/shadow-xs` (unchanged) |

---
