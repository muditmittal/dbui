---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/contained-list/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
The following page documents visual specifications such as color, typography,
structure, and size.

Color
Typography
Structure
Size
Feedback

## Color

| Element               | Property         | Color token        |
| --------------------- | ---------------- | ------------------ |
| List title: on-page   | text color       | `$text-primary`    |
|                       | background-color | `$background`      |
| List title: disclosed | text color       | `$text-secondary`  |
|                       | background-color | `$layer`\*         |
| List item             | text color       | `$text-primary`    |
|                       | background-color | transparent        |
| Icon (optional)       | svg              | `$icon-primary`    |
| Row divider           | border-bottom    | `$border-subtle`\* |

  \* Denotes a contextual color token that will change values based on the layer
  it is placed on.

![Enabled states for contained list variants](images/contained-list-style-1.png)

Example of enabled states for contained list variants.

### Interactive states

| Element  | Property         | Color token        |
| -------- | ---------------- | ------------------ |
| Hover    | background-color | `$layer-hover`\*   |
| Focus    | border           | `$focus`           |
| Active   | background-color | `$layer-active`\*  |
| Disabled | text color       | `$text-disabled`   |
|          | border           | `$border-disabled` |

  \* Denotes a contextual color token that will change values based on the layer
  it is placed on.

![Interactive states for contained list item rows](images/contained-list-style-2.png)

Example of interactive states for contained list item rows.

<br />

![Interactive states for contained list inline actions](images/contained-list-style-3.png)

  Example of interactive states for contained list inline actions.

## Typography

All contained list text should be set in sentence case, with only the first word
in a phrase and any proper nouns capitalized.

| Element               | Font-size (px/rem) | Font-weight    | Type token            |
| --------------------- | ------------------ | -------------- | --------------------- |
| List title: on-page   | 14 / 0.875         | SemiBold / 600 | `$heading-compact-01` |
| List title: disclosed | 12 / 0.75          | Regular / 400  | `$label-01`           |
| List item             | 14 / 0.875         | Regular / 400  | `$body-01`            |

## Structure

| Element                              | Property                    | px / rem | Spacing token |
| ------------------------------------ | --------------------------- | -------- | ------------- |
| List header area: on-page            | height                      | 32 / 2   | `$spacing-07` |
|                                      | padding-left, padding-right | 16 / 1   | `$spacing-05` |
| List header area: disclosed          | height                      | 48 / 3   | `$spacing-09` |
|                                      | padding-left, padding-right | 16 / 1   | `$spacing-05` |
| List item                            | padding-left, padding-right | 16 / 1   | `$spacing-05` |
| Non-interactive icon (optional)      | height, width               | 16px     | —             |
|                                      | padding left, padding-right | 16 / 1   | `$spacing-05` |
| Inline action icon button (optional) | height, width               | 16px     | —             |
|                                      | padding left, padding-right | 16 / 1   | `$spacing-05` |
| Search icon button (optional)        | height, width               | 16px     | —             |
|                                      | padding left, padding-right | 16 / 1   | `$spacing-05` |

<div className="image--fixed">

![Structure and spacing measurements for the on-page list variant](images/contained-list-style-4.png)

</div>

  Structure and spacing measurements for the on-page list variant | px / rem

<br />

<div className="image--fixed">

![Structure and spacing measurements for the disclosed list variant.](images/contained-list-style-5.png)

</div>

  Structure and spacing measurements for the disclosed list variant. | px / rem

<br />

<div className="image--fixed">

![Structure and spacing measurements for height and width of row content.](images/contained-list-style-6.png)

</div>

  Structure and spacing measurements for height and width of row content. | px /
  rem

<br />

<div className="image--fixed">

![Structure and spacing measurements for padding and rule alignment.](images/contained-list-style-7.png)

</div>

  Structure and spacing measurements for padding and rule alignment. | px / rem

<br />

<div className="image--fixed">

![Structure and spacing measurements for inline actions.](images/contained-list-style-8.png)

</div>

  Structure and spacing measurements for inline actions | px / rem

<br />

<div className="image--fixed">

![Structure and spacing measurements for non-interactive icons.](images/contained-list-non-interactive-icons-style.png)

</div>

  Structure and spacing measurements for non-interactive icons | px / rem

<br />

<div className="image--fixed">

![Structure and spacing measurements for search and filtering.](images/contained-list-search-style.png)

</div>

  Structure and spacing measurements for search and filtering | px / rem

## Size

### On-page list

| Size             | Element        | Height px / rem |
| ---------------- | -------------- | --------------- |
| Small (sm)       | Header and row | 32 / 2          |
| Medium (md)      | Header and row | 40 / 2.5        |
| Large (lg)       | Header and row | 48 / 3          |
| Extra large (xl) | Header         | 48 / 3          |
|                  | Row            | 64 / 4          |

<div className="image--fixed">

![Sizes for contained list on-page variant.](images/contained-list-style-9.png)

</div>

Sizes for contained list on-page variant | px / rem

### Disclosed list

| Size       | Element | Height px / rem |
| ---------- | ------- | --------------- |
| Large (lg) | Header  | 32 / 2          |
|            | Row     | 48 / 3          |

<div className="image--fixed">

![Sizes for contained list disclosed variant.](images/contained-list-style-10.png)

</div>

Sizes for contained list disclosed variant | px / rem

## Feedback

Help us improve this component by providing feedback, asking questions, and
leaving any other comments on
[GitHub](https://github.com/carbon-design-system/carbon-website/issues/new?assignees=&labels=feedback&template=feedback.md).
