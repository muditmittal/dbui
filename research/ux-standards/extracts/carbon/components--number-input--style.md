---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/number-input/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
The following page documents visual specifications such as color, typography,
structure, size, and AI presence.

Color
Typography
Structure
Sizes
AI presence

## Color

| Element  | Property         | Color token         |
| -------- | ---------------- | ------------------- |
| Label    | text color       | `$text-secondary`   |
| Number   | text color       | `$text-primary`     |
| Field    | background-color | `$field` \*         |
|          | border-bottom    | `$border-strong` \* |
| Controls | svg color        | `$icon-primary`     |

  \* Denotes a contextual color token that will change values based on the layer
  it is placed on.

![Default number input example](images/number-input-style-1.png)

![Fluid number input example](images/number-input-style-1b.png)

### Interactive states

| State     | Element         | Property                   | Color token         |
| --------- | --------------- | -------------------------- | ------------------- |
| Hover     | Controls        | background-color           | `field-hover` \*    |
| Focus     | Field           | border                     | `$focus`            |
|           | Controls        | border                     | `$focus`            |
| Invalid   | Field           | border                     | `$support-error`    |
|           | Error icon      | svg                        | `$support-error`    |
|           | Error message   | text color                 | `$text-error`       |
| Warning   | Warning icon    | svg                        | `support-warning`   |
|           | Warning message | text color                 | `text-primary`      |
| Disabled  | Label           | text color                 | `$text-disabled`    |
|           | Field           | background-color           | `$field` \*         |
|           |                 | border-bottom (default)    | transparent         |
|           |                 | border-bottom (fluid)      | `$border-subtle` \* |
|           | Number          | text color                 | `$text-disabled`    |
|           | Controls        | svg color                  | `$icon-disabled`    |
| Read-only | Field           | background-color (default) | transparent         |
|           |                 | background-color (fluid)   | `$field` \*         |
|           |                 | border-bottom              | `$border-subtle` \* |
|           | Number          | text color (default)       | `$text-primary`     |
|           |                 | text color (fluid)         | `$text-secondary`   |
|           | Controls        | svg color                  | `$icon-disabled`    |

![Default number input interactive states](images/number-input-usage-6.png)

![Fluid number input interactive states](images/number-input-usage-6-fluid.png)

Number input states example.

## Typography

Number input labels should use sentence case, with only the first word in a
phrase and any proper nouns capitalized.

| Element         | Font-size (px/rem) | Font-weight   | Type token         |
| --------------- | ------------------ | ------------- | ------------------ |
| Label           | 12 / 0.75          | Regular / 400 | `$label-01`        |
| Field input     | 14 / 0.875         | Regular / 400 | `$body-compact-01` |
| Error message   | 12 / 0.75          | Regular / 400 | `$label-01`        |
| Warning message | 12 / 0.75          | Regular / 400 | `$label-01`        |
| Helper text     | 12 / 0.75          | Regular / 400 | `$helper-text-01`  |

## Structure

### Default input

The add and subtract icons can be found in the [icons](/elements/icons/library)
library.

| Element         | Property                    | px / rem | Spacing token |
| --------------- | --------------------------- | -------- | ------------- |
| Label           | margin-bottom               | 8 / 0.5  | `$spacing-03` |
| Field (default) | height                      | 40 / 2.5 | –             |
|                 | border-bottom               | 1px      | –             |
| Number          | padding-left                | 16 / 1   | `$spacing-05` |
| Controls        | padding-left, padding-right | 16 / 1   | `$spacing-05` |

<div className="image--fixed">

![Structure and spacing for number input](images/number-input-style-3.png)

</div>

  Structure and spacing measurements for a default number input | px / rem

### Fluid input

| Element              | Property                    | px / rem    | Spacing token |
| -------------------- | --------------------------- | ----------- | ------------- |
| Label                | padding-bottom              | 4 / 0.25    | `$spacing-02` |
| Field                | height                      | 64 / 4      | `$spacing-10` |
|                      | padding-left, padding-right | 16 / 1      | `$spacing-05` |
|                      | padding-top, padding-bottom | 13 / 0.8125 | –             |
|                      | border-bottom               | 1px         | –             |
| Add or subtract icon | height, width               | 16 / 1      | –             |
| Focus                | border                      | 2px         | –             |
| Error                | border                      | 2px         | –             |
|                      | padding-top, padding-bottom | 8 / 0.5     | `$spacing-03` |

<div className="image--fixed">

![Structure and spacing for number input](images/number-input-style-1-fluid.png)

</div>

  Structure and spacing measurements for a fluid number input | px / rem

## Sizes

### Default input heights

The height varies for each size variant and the width varies based on content,
layout, and design.

| Element | Size        | Height (px/rem) |
| ------- | ----------- | --------------- |
| Field   | Small (sm)  | 32 / 2          |
|         | Medium (md) | 40 / 2.5        |
|         | Large (lg)  | 48 / 3          |

<div className="image--fixed">

![Sizes for number input](images/number-input-style-size.png)

</div>

Sizes for number input fields | px / rem

## AI presence

The following are the unique styles applied to the component when the AI label
is present. Unless specified, all other tokens in the component remain the same
as the non-AI variant.

For more information on the AI style elements, see the
[Carbon for AI](/guidelines/carbon-for-ai/) guidelines.

| Element         | Property         | Token / Size        |
| --------------- | ---------------- | ------------------- |
| Linear gradient | start            | `$ai-aura-start-sm` |
|                 | stop             | `$ai-aura-stop`     |
| Field           | border-bottom    | `$ai-border-strong` |
|                 | background color | `$field`\*          |
| AI label        | size             | mini                |

  \* Denotes a contextual color token that will change values based on the layer
  it is placed on.

![Default number input AI example](images/number-input-style-ai-presence-ai-revert-default.png)

![Fluid number input AI example](images/number-input-style-ai-presence-ai-revert-fluid.png)
