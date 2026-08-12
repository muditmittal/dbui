---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/modal/
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

Refer to the [button](/components/button/style) for primary and secondary button
styling in the transactional modal.

| Elements         | Property         | Color token         |
| ---------------- | ---------------- | ------------------- |
| Container        | background-color | `$layer` \*         |
| Container        | border           | `$border-subtle` \* |
| Header label     | text color       | `$text-secondary`   |
| Header           | text color       | `$text-primary`     |
| Content          | text color       | `$text-primary`     |
| Close icon       | fill             | `$icon-primary`     |
| Close icon:hover | background-color | `$layer-hover` \*   |
| Page overlay     | color            | `$overlay`          |

  \* Denotes a contextual color token that will change values based on the layer
  it is placed on.

## Typography

Modal labels and headings should be set in sentence case. Keep all labels and
headings concise and to the point. Modal labels are optional.

| Element | Font-size (px/rem) | Font-weight   | Type token    |
| ------- | ------------------ | ------------- | ------------- |
| Label   | 12 / 0.75          | Regular / 400 | `$label-01`   |
| Heading | 20 / 1.25          | Regular / 400 | `$heading-03` |
| Content | 14 / 0.875         | Regular / 400 | `$body-01`    |

## Structure

| Element                     | Property                  | px / rem | Spacing token |
| --------------------------- | ------------------------- | -------- | ------------- |
| Container                   | border                    | 1px      | –             |
| Close button                | height, width             | 48 x 48  | –             |
| Close icon                  | height, width             | 16 x 16  | –             |
| Header label                | margin-bottom             | 4 / 0.25 | `$spacing-02` |
| Header                      | padding top, padding left | 16 / 1   | `$spacing-05` |
|                             | margin-bottom             | 16 / 1   | `$spacing-05` |
| Content                     | padding-left              | 16 / 1   | `$spacing-05` |
|                             | padding-right             | 20%      | –             |
|                             | margin-bottom             | 48 / 3   | `$spacing-09` |
| Footer (fluid button group) | border                    | 1px      | –             |

<div className="image--fixed">

![Structure and spacing measurements for a passive modal](images/modal-style-1.png)

</div>

  Structure and spacing measurements for a passive modal | px / rem

<div className="image--fixed">

![Structure and spacing measurements for a transactional modal](images/modal-style-2.png)

</div>

  Structure and spacing measurements for a transactional modal | px / rem

### Margin-right

Modals that are 36% width and larger have a `margin-right: 20%` (margin
percentage is based off the width of the modal window). If the modal is smaller
than 36% then it has a fixed `margin-right: 16px/1rem`. Body copy, including
titles, in a modal always follows the 20% margin-right rule. However, inputs and
other components may still expand to the full width of a modal window.

<div className="image--fixed">

![Margin-right for modals less than 36% and greater than 36%](images/modal-style-3.png)

</div>

  Margin-right for modals less than 36% (left) and greater than 36% (right).

### Button structure

| Number of buttons | Percentage width of modal | Positioning                 |
| ----------------- | ------------------------- | --------------------------- |
| 1                 | 50%                       | Flush right                 |
| 2                 | 50% each                  | Full bleed                  |
| 3                 | 25% each                  | Flush right                 |
| 3                 | 25% each                  | 1 flush left, 2 flush right |

![Modal button sizes](images/modal-style-button.png)

## Sizes

There are four modal sizes: extra small, small, medium, and large. Each modal
size has a responsive width that changes based on the browser size. As the
browser decreases, the modal width percentage increases thus maintaining a
proper ratio between the modal and browser. Modal widths are defined as
percentages of the browser but will still align to columns on the 2x grid.

![Modal sizes](images/modal-usage-sizes.png)

### Extra small (xs)

| Breakpoint | Percentage width | Column span | Margin-right |
| ---------- | ---------------- | ----------- | ------------ |
| 1584       | 24%              | 4 of 16     | 16px / 1rem  |
| 1312       | 24%              | 4 of 16     | 16px / 1rem  |
| 1056       | 32%              | 5 of 16     | 16px / 1rem  |
| 672        | 48%              | 4 of 8      | 16px / 1rem  |
| 320        | 100%             | 4 of 4      | 16px / 1rem  |

### Small (sm)

| Breakpoint | Percentage width | Column span | Margin-right |
| ---------- | ---------------- | ----------- | ------------ |
| 1584       | 36%              | 6 of 16     | 20%          |
| 1312       | 36%              | 6 of 16     | 20%          |
| 1056       | 42%              | 7 of 16     | 16px / 1rem  |
| 672        | 60%              | 5 of 8      | 16px / 1rem  |
| 320        | 100%             | 4 of 4      | 16px / 1rem  |

### Medium (md)

| Breakpoint | Percentage width | Column span | Margin-right |
| ---------- | ---------------- | ----------- | ------------ |
| 1584       | 48%              | 8 of 16     | 20%          |
| 1312       | 48%              | 8 of 16     | 20%          |
| 1056       | 60%              | 10 of 16    | 20%          |
| 672        | 84%              | 7 of 8      | 20%          |
| 320        | 100%             | 4 of 4      | 16px / 1rem  |

### Large (lg)

| Breakpoint | Percentage width | Column span | Margin-right |
| ---------- | ---------------- | ----------- | ------------ |
| 1584       | 72%              | 12 of 16    | 20%          |
| 1312       | 72%              | 12 of 16    | 20%          |
| 1056       | 84%              | 14 of 16    | 20%          |
| 672        | 96%              | 8 of 8      | 20%          |
| 320        | 100%             | 4 of 4      | 16px / 1rem  |

### Max sizes

Each modal size has a max height in order to maintain a proper window ratio.

| Modal size       | Max-height |
| ---------------- | ---------- |
| Extra small (xs) | 48%        |
| Small (sm)       | 72%        |
| Medium (md)      | 84%        |
| Large (lg)       | 96%        |

![Modal max heights](images/modal-usage-max-heights.png)

### Mobile

On mobile devices, at the smaller break points the max-height does not apply.
The height may either be 100% of the screen or maintain the height defined by
the content while sticking to the bottom of the mobile screen.

![Modal sizes](images/modal-style-4.png)

## AI presence

The following are the unique styles applied to the component when the AI label
is present. Unless specified, all other tokens in the component remain the same
as the non-AI variant. The AI styling spec of individual components inside of
the modal can be found on their respective style tabs.

For more information on the AI style elements, see the
[Carbon for AI](/guidelines/carbon-for-ai/) guidelines.

| Element                    | Property         | Token / Size        |
| -------------------------- | ---------------- | ------------------- |
| Modal:background           | background-color | `$layer` \*         |
|                            | box-shadow       | `$ai-drop-shadow`   |
|                            | inner-shadow     | `$ai-inner-shadow`  |
| Overlay                    | background-color | `$ai-overlay`       |
| Linear gradient:background | start            | `$ai-aura-start-sm` |
|                            | stop             | `$ai-aura-stop`     |
| Linear gradient:border     | top              | `$ai-border-start`  |
|                            | bottom           | `$ai-border-end`    |
| AI label                   | size             | large               |

![Modal AI presence](images/modal-style-presence.png)

Structure and spacing measurements for an AI Modal.
