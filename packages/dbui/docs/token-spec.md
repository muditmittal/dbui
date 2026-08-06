# Token spec

Generated from the shipped CSS by `scripts/export-token-spec.mjs`. Do not edit —
regenerate instead. This is exactly what `tokens.css` and `type.css` contain.

Spatial values ship in **rem**, authored in px against a 16px root, so they follow
a reader's browser font-size preference. The "At 16px root" column is what they
render at the default. Border width stays px so hairlines stay crisp.

**Dimensions** is the collection: space, size, radius and border, plus the grid
unit they are multiples of. Each family computes its own stops — none of them
reads another — and the scale they agree on is an authoring artifact that lives
in Figma and in `theme.config.mjs`, not a custom property. React ships
semantics only, the same way it does for colour.

**Scalars** is the two multipliers, and only those. They have no single px value
by design, and neither do the two `em` inline steps.


| Token | Category | Value | At 16px root | Dark |
| --- | --- | --- | --- | --- |
| `--db-action-default-base` | Color | #FAFAFA |  | #1F272D |
| `--db-action-default-hover` | Color | rgba(0, 0, 0, 0.06) |  | rgba(255, 255, 255, 0.08) |
| `--db-action-default-press` | Color | rgba(0, 0, 0, 0.1) |  | rgba(255, 255, 255, 0.12) |
| `--db-action-label-base` | Color | #262626 |  | #F6F7F9 |
| `--db-action-label-hover` | Color | #171717 |  | #FFFFFF |
| `--db-action-label-inverse-base` | Color | #FFFFFF |  | #11171C |
| `--db-action-label-inverse-hover` | Color | rgba(255, 255, 255, 0.8) |  | rgba(0, 0, 0, 0.8) |
| `--db-action-label-inverse-press` | Color | rgba(255, 255, 255, 0.7) |  | rgba(0, 0, 0, 0.7) |
| `--db-action-label-press` | Color | #000000 |  | #FFFFFF |
| `--db-action-negative-base` | Color | #C82D4C |  | #E65B77 |
| `--db-action-negative-hover` | Color | #9E102C |  | #F792A6 |
| `--db-action-negative-press` | Color | #630316 |  | #FBD0D8 |
| `--db-action-positive-base` | Color | #277C43 |  | #3BA65E |
| `--db-action-positive-hover` | Color | #115026 |  | #8DDDA8 |
| `--db-action-positive-press` | Color | #093919 |  | #B1ECC5 |
| `--db-action-primary-base` | Color | #171717 |  | #D1D9E1 |
| `--db-action-primary-hover` | Color | rgba(23, 23, 23, 0.9) |  | rgba(209, 217, 225, 0.9) |
| `--db-action-primary-press` | Color | rgba(23, 23, 23, 0.8) |  | rgba(209, 217, 225, 0.8) |
| `--db-action-selected-base` | Color | rgba(0, 0, 0, 0.06) |  | rgba(255, 255, 255, 0.08) |
| `--db-action-selected-hover` | Color | rgba(0, 0, 0, 0.1) |  | rgba(255, 255, 255, 0.12) |
| `--db-action-selected-press` | Color | rgba(0, 0, 0, 0.14) |  | rgba(255, 255, 255, 0.16) |
| `--db-border-accent` | Color | #2272B4 |  | #4299E0 |
| `--db-border-base` | Color | #E5E5E5 |  | rgba(255, 255, 255, 0.1) |
| `--db-border-disabled` | Color | rgba(0, 0, 0, 0.12) |  | rgba(255, 255, 255, 0.12) |
| `--db-border-inverse` | Color | #404040 |  | #C0CDD8 |
| `--db-border-strong` | Color | #D4D4D4 |  | rgba(255, 255, 255, 0.15) |
| `--db-border-subtle` | Color | #F5F5F5 |  | rgba(255, 255, 255, 0.06) |
| `--db-focus-ring` | Color | #171717 |  | #D1D9E1 |
| `--db-focus-ring-offset` | Color | #FFFFFF |  | #11171C |
| `--db-input-border-base` | Color | #E5E5E5 |  | rgba(255, 255, 255, 0.15) |
| `--db-input-border-focus` | Color | #171717 |  | #D1D9E1 |
| `--db-input-border-hover` | Color | #A3A3A3 |  | #8396A5 |
| `--db-link-base` | Color | #2272B4 |  | #8ACAFF |
| `--db-link-hover` | Color | #0E538B |  | #BAE1FC |
| `--db-link-press` | Color | #04355D |  | #D7EDFE |
| `--db-link-visited` | Color | #04355D |  | #D7EDFE |
| `--db-status-border-info` | Color | #0E538B |  | #4299E0 |
| `--db-status-border-negative` | Color | #9E102C |  | #E65B77 |
| `--db-status-border-positive` | Color | #3BA65E |  |  |
| `--db-status-border-warning` | Color | #DE7921 |  |  |
| `--db-status-surface-info` | Color | #F0F8FF |  | #021E38 |
| `--db-status-surface-negative` | Color | #FFF5F7 |  | #3A010B |
| `--db-status-surface-positive` | Color | #F3FCF6 |  | #04220E |
| `--db-status-surface-warning` | Color | #FFF9EB |  | #381001 |
| `--db-status-text-info` | Color | #2272B4 |  | #8ACAFF |
| `--db-status-text-negative` | Color | #C82D4C |  | #F792A6 |
| `--db-status-text-positive` | Color | #277C43 |  | #8DDDA8 |
| `--db-status-text-warning` | Color | #BE501E |  | #F2BE88 |
| `--db-surface-accent` | Color | #D7EDFE |  | #021E38 |
| `--db-surface-base` | Color | #FFFFFF |  | #11171C |
| `--db-surface-disabled` | Color | rgba(0, 0, 0, 0.12) |  | rgba(255, 255, 255, 0.12) |
| `--db-surface-hover` | Color | rgba(0, 0, 0, 0.03) |  | rgba(255, 255, 255, 0.04) |
| `--db-surface-inset` | Color | rgba(0, 0, 0, 0.08) |  | rgba(255, 255, 255, 0.08) |
| `--db-surface-inverse` | Color | #171717 |  | #F6F7F9 |
| `--db-surface-strong` | Color | #F5F5F5 |  | #2B343D |
| `--db-surface-subtle` | Color | #FAFAFA |  | #1F272D |
| `--db-text-accent` | Color | #0E538B |  | #8ACAFF |
| `--db-text-base` | Color | #262626 |  | #E8ECF0 |
| `--db-text-disabled` | Color | rgba(0, 0, 0, 0.38) |  | rgba(255, 255, 255, 0.38) |
| `--db-text-inverse` | Color | #FFFFFF |  | #11171C |
| `--db-text-strong` | Color | #171717 |  | #FFFFFF |
| `--db-text-subtle` | Color | #525252 |  | #92A4B3 |
| `--db-utility-scrim` | Color | rgba(0, 0, 0, 0.72) |  | rgba(0, 0, 0, 0.85) |
| `--db-utility-surface-skeleton` | Color | rgba(0, 0, 0, 0.12) |  | rgba(255, 255, 255, 0.12) |
| `--db-utility-text-skeleton` | Color | rgba(0, 0, 0, 0.2) |  | rgba(255, 255, 255, 0.2) |
| `--db-viz-categorical-1` | Color | #9575CD |  | #8555C9 |
| `--db-viz-categorical-10` | Color | #AD6DAD |  | #97409A |
| `--db-viz-categorical-2` | Color | #FFD54F |  | #BD7C30 |
| `--db-viz-categorical-3` | Color | #6CD7D2 |  | #2C8985 |
| `--db-viz-categorical-4` | Color | #F06292 |  | #A11E4E |
| `--db-viz-categorical-5` | Color | #D4E157 |  | #9E9D00 |
| `--db-viz-categorical-6` | Color | #A1887F |  | #A8796D |
| `--db-viz-categorical-7` | Color | #90A0E0 |  | #4E62BA |
| `--db-viz-categorical-8` | Color | #EF9B80 |  | #CC471F |
| `--db-viz-categorical-9` | Color | #96BEB5 |  | #217766 |
| `--db-viz-sequential-1` | Color | #E8ECF0 |  | #0A2C36 |
| `--db-viz-sequential-10` | Color | #0A2C36 |  | #F6F7F9 |
| `--db-viz-sequential-2` | Color | #D2F1FC |  | #084150 |
| `--db-viz-sequential-3` | Color | #A5E5F9 |  | #085B6E |
| `--db-viz-sequential-4` | Color | #65D3F4 |  | #0F7B95 |
| `--db-viz-sequential-5` | Color | #22BFE5 |  | #169DBD |
| `--db-viz-sequential-6` | Color | #169DBD |  | #22BFE5 |
| `--db-viz-sequential-7` | Color | #0F7B95 |  | #65D3F4 |
| `--db-viz-sequential-8` | Color | #085B6E |  | #A5E5F9 |
| `--db-viz-sequential-9` | Color | #084150 |  | #D2F1FC |
| `--db-density-scalar` | Scalars | 1 |  |  |
| `--db-type-scalar` | Scalars | 1 |  |  |
| `--db-border-0` | Dimensions | 0px | 0px |  |
| `--db-border-1` | Dimensions | 1px | 1px |  |
| `--db-border-2` | Dimensions | 2px | 2px |  |
| `--db-radius-0` | Dimensions | 0 | 0px |  |
| `--db-radius-1` | Dimensions | calc(var(--db-spacing-unit) * 1 * var(--db-density-scalar)) | 4px |  |
| `--db-radius-2` | Dimensions | calc(var(--db-spacing-unit) * 2 * var(--db-density-scalar)) | 8px |  |
| `--db-radius-3` | Dimensions | calc(var(--db-spacing-unit) * 3 * var(--db-density-scalar)) | 12px |  |
| `--db-radius-4` | Dimensions | calc(var(--db-spacing-unit) * 4 * var(--db-density-scalar)) | 16px |  |
| `--db-radius-6` | Dimensions | calc(var(--db-spacing-unit) * 6 * var(--db-density-scalar)) | 24px |  |
| `--db-radius-full` | Dimensions | 999px | 999px |  |
| `--db-size-10` | Dimensions | calc(var(--db-spacing-unit) * 10 * var(--db-density-scalar)) | 40px |  |
| `--db-size-2` | Dimensions | calc(var(--db-spacing-unit) * 2 * var(--db-density-scalar)) | 8px |  |
| `--db-size-3` | Dimensions | calc(var(--db-spacing-unit) * 3 * var(--db-density-scalar)) | 12px |  |
| `--db-size-4` | Dimensions | calc(var(--db-spacing-unit) * 4 * var(--db-density-scalar)) | 16px |  |
| `--db-size-6` | Dimensions | calc(var(--db-spacing-unit) * 6 * var(--db-density-scalar)) | 24px |  |
| `--db-size-7` | Dimensions | calc(var(--db-spacing-unit) * 7 * var(--db-density-scalar)) | 28px |  |
| `--db-size-8` | Dimensions | calc(var(--db-spacing-unit) * 8 * var(--db-density-scalar)) | 32px |  |
| `--db-space-0` | Dimensions | 0 | 0px |  |
| `--db-space-0-5` | Dimensions | calc(var(--db-spacing-unit) * 0.5 * var(--db-density-scalar)) | 2px |  |
| `--db-space-1` | Dimensions | calc(var(--db-spacing-unit) * 1 * var(--db-density-scalar)) | 4px |  |
| `--db-space-10` | Dimensions | calc(var(--db-spacing-unit) * 10 * var(--db-density-scalar)) | 40px |  |
| `--db-space-2` | Dimensions | calc(var(--db-spacing-unit) * 2 * var(--db-density-scalar)) | 8px |  |
| `--db-space-3` | Dimensions | calc(var(--db-spacing-unit) * 3 * var(--db-density-scalar)) | 12px |  |
| `--db-space-4` | Dimensions | calc(var(--db-spacing-unit) * 4 * var(--db-density-scalar)) | 16px |  |
| `--db-space-6` | Dimensions | calc(var(--db-spacing-unit) * 6 * var(--db-density-scalar)) | 24px |  |
| `--db-space-8` | Dimensions | calc(var(--db-spacing-unit) * 8 * var(--db-density-scalar)) | 32px |  |
| `--db-spacing-unit` | Dimensions | 0.25rem | 4px |  |
| `--db-font-family` | Typography | "Figtree", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif |  |  |
| `--db-font-family-block` | Typography | var(--db-mono-font-family) |  |  |
| `--db-font-family-body` | Typography | var(--db-font-family) |  |  |
| `--db-font-family-body-bold` | Typography | var(--db-font-family) |  |  |
| `--db-font-family-code` | Typography | var(--db-mono-font-family) |  |  |
| `--db-font-family-eyebrow` | Typography | var(--db-font-family) |  |  |
| `--db-font-family-hint` | Typography | var(--db-font-family) |  |  |
| `--db-font-family-label` | Typography | var(--db-font-family) |  |  |
| `--db-font-family-label-bold` | Typography | var(--db-font-family) |  |  |
| `--db-font-family-paragraph` | Typography | var(--db-font-family) |  |  |
| `--db-font-family-paragraph-bold` | Typography | var(--db-font-family) |  |  |
| `--db-font-family-title-1` | Typography | var(--db-font-family) |  |  |
| `--db-font-family-title-2` | Typography | var(--db-font-family) |  |  |
| `--db-font-family-title-3` | Typography | var(--db-font-family) |  |  |
| `--db-font-family-title-4` | Typography | var(--db-font-family) |  |  |
| `--db-font-size-block` | Typography | calc(0.875rem * var(--db-type-scalar)) | 14px |  |
| `--db-font-size-body` | Typography | calc(0.8125rem * var(--db-type-scalar)) | 13px |  |
| `--db-font-size-body-bold` | Typography | calc(0.8125rem * var(--db-type-scalar)) | 13px |  |
| `--db-font-size-code` | Typography | calc(0.8125rem * var(--db-type-scalar)) | 13px |  |
| `--db-font-size-eyebrow` | Typography | calc(0.6875rem * var(--db-type-scalar)) | 11px |  |
| `--db-font-size-hint` | Typography | calc(0.75rem * var(--db-type-scalar)) | 12px |  |
| `--db-font-size-label` | Typography | calc(0.8125rem * var(--db-type-scalar)) | 13px |  |
| `--db-font-size-label-bold` | Typography | calc(0.8125rem * var(--db-type-scalar)) | 13px |  |
| `--db-font-size-paragraph` | Typography | calc(0.9375rem * var(--db-type-scalar)) | 15px |  |
| `--db-font-size-paragraph-bold` | Typography | calc(0.9375rem * var(--db-type-scalar)) | 15px |  |
| `--db-font-size-title-1` | Typography | calc(2rem * var(--db-type-scalar)) | 32px |  |
| `--db-font-size-title-2` | Typography | calc(1.5rem * var(--db-type-scalar)) | 24px |  |
| `--db-font-size-title-3` | Typography | calc(1.25rem * var(--db-type-scalar)) | 20px |  |
| `--db-font-size-title-4` | Typography | calc(1rem * var(--db-type-scalar)) | 16px |  |
| `--db-font-weight` | Typography | 400 |  |  |
| `--db-font-weight-block` | Typography | 400 |  |  |
| `--db-font-weight-body` | Typography | 400 |  |  |
| `--db-font-weight-body-bold` | Typography | 600 |  |  |
| `--db-font-weight-bold` | Typography | 600 |  |  |
| `--db-font-weight-code` | Typography | 400 |  |  |
| `--db-font-weight-eyebrow` | Typography | 600 |  |  |
| `--db-font-weight-hint` | Typography | 400 |  |  |
| `--db-font-weight-label` | Typography | 400 |  |  |
| `--db-font-weight-label-bold` | Typography | 600 |  |  |
| `--db-font-weight-paragraph` | Typography | 400 |  |  |
| `--db-font-weight-paragraph-bold` | Typography | 600 |  |  |
| `--db-font-weight-title-1` | Typography | 600 |  |  |
| `--db-font-weight-title-2` | Typography | 600 |  |  |
| `--db-font-weight-title-3` | Typography | 600 |  |  |
| `--db-font-weight-title-4` | Typography | 600 |  |  |
| `--db-letter-spacing-block` | Typography | calc(0 * var(--db-type-scalar)) |  |  |
| `--db-letter-spacing-body` | Typography | calc(0 * var(--db-type-scalar)) |  |  |
| `--db-letter-spacing-body-bold` | Typography | calc(0 * var(--db-type-scalar)) |  |  |
| `--db-letter-spacing-code` | Typography | calc(0 * var(--db-type-scalar)) |  |  |
| `--db-letter-spacing-eyebrow` | Typography | calc(0.03125rem * var(--db-type-scalar)) | 0.5px |  |
| `--db-letter-spacing-hint` | Typography | calc(0 * var(--db-type-scalar)) |  |  |
| `--db-letter-spacing-label` | Typography | calc(0 * var(--db-type-scalar)) |  |  |
| `--db-letter-spacing-label-bold` | Typography | calc(0 * var(--db-type-scalar)) |  |  |
| `--db-letter-spacing-paragraph` | Typography | calc(0 * var(--db-type-scalar)) |  |  |
| `--db-letter-spacing-paragraph-bold` | Typography | calc(0 * var(--db-type-scalar)) |  |  |
| `--db-letter-spacing-title-1` | Typography | calc(-0.025rem * var(--db-type-scalar)) |  |  |
| `--db-letter-spacing-title-2` | Typography | calc(-0.0125rem * var(--db-type-scalar)) |  |  |
| `--db-letter-spacing-title-3` | Typography | calc(0 * var(--db-type-scalar)) |  |  |
| `--db-letter-spacing-title-4` | Typography | calc(0 * var(--db-type-scalar)) |  |  |
| `--db-line-height-block` | Typography | calc(1.375rem * var(--db-type-scalar)) | 22px |  |
| `--db-line-height-body` | Typography | calc(1.25rem * var(--db-type-scalar)) | 20px |  |
| `--db-line-height-body-bold` | Typography | calc(1.25rem * var(--db-type-scalar)) | 20px |  |
| `--db-line-height-code` | Typography | calc(1.25rem * var(--db-type-scalar)) | 20px |  |
| `--db-line-height-eyebrow` | Typography | calc(1rem * var(--db-type-scalar)) | 16px |  |
| `--db-line-height-hint` | Typography | calc(1rem * var(--db-type-scalar)) | 16px |  |
| `--db-line-height-label` | Typography | calc(1rem * var(--db-type-scalar)) | 16px |  |
| `--db-line-height-label-bold` | Typography | calc(1rem * var(--db-type-scalar)) | 16px |  |
| `--db-line-height-paragraph` | Typography | calc(1.375rem * var(--db-type-scalar)) | 22px |  |
| `--db-line-height-paragraph-bold` | Typography | calc(1.375rem * var(--db-type-scalar)) | 22px |  |
| `--db-line-height-title-1` | Typography | calc(2.5rem * var(--db-type-scalar)) | 40px |  |
| `--db-line-height-title-2` | Typography | calc(2rem * var(--db-type-scalar)) | 32px |  |
| `--db-line-height-title-3` | Typography | calc(1.75rem * var(--db-type-scalar)) | 28px |  |
| `--db-line-height-title-4` | Typography | calc(1.5rem * var(--db-type-scalar)) | 24px |  |
| `--db-mono-font-family` | Typography | "Commit Mono", ui-monospace, SFMono-Regular, "Cascadia Code", "Fira Code", monospace |  |  |
| `--db-elevation-0` | Elevation | none |  |  |
| `--db-elevation-1` | Elevation | 0 8px 40px rgba(0, 0, 0, 0.13) |  |  |
| `--db-elevation-2` | Elevation | 0 2px 16px rgba(0, 0, 0, 0.08) |  |  |
| `--db-elevation-3` | Elevation | 0 2px 3px rgba(0, 0, 0, 0.1), 0 1px 0 rgba(0, 0, 0, 0.05) |  |  |
| `--db-duration-default` | Motion | 300ms |  |  |
| `--db-duration-fast` | Motion | 150ms |  |  |
| `--db-duration-slow` | Motion | 450ms |  |  |
| `--db-ease-standard` | Motion | cubic-bezier(0.24, 1, 0.4, 1) |  |  |

## Type styles (composed)

| Utility | Size | Line height | Weight | Family | Case |
| --- | --- | --- | --- | --- | --- |
| `type-hint` | 12px | 16px | 400 | sans |  |
| `type-eyebrow` | 11px | 16px | 600 | sans | uppercase |
| `type-label` | 13px | 16px | 400 | sans |  |
| `type-label-bold` | 13px | 16px | 600 | sans |  |
| `type-body` | 13px | 20px | 400 | sans |  |
| `type-body-bold` | 13px | 20px | 600 | sans |  |
| `type-code` | 13px | 20px | 400 | mono |  |
| `type-block` | 14px | 22px | 400 | mono |  |
| `type-paragraph` | 15px | 22px | 400 | sans |  |
| `type-paragraph-bold` | 15px | 22px | 600 | sans |  |
| `type-title-4` | 16px | 24px | 600 | sans |  |
| `type-title-3` | 20px | 28px | 600 | sans |  |
| `type-title-2` | 24px | 32px | 600 | sans |  |
| `type-title-1` | 32px | 40px | 600 | sans |  |
