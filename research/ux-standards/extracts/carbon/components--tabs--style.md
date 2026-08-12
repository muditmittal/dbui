---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/tabs/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
The following page documents visual specifications such as color, typography,
structure, and size.

Color Typography
Structure Feedback

## Color

### Line tab color

| Type       | Element | Property         | Color token           |
| ---------- | ------- | ---------------- | --------------------- |
| Unselected | Tab     | background-color | transparent           |
|            |         | border-bottom    | `$border-subtle` \*   |
|            | Label   | text-color       | `$text-secondary`     |
|            | Icon    | svg              | `$icon-secondary`     |
| Selected   | Label   | text-color       | `$text-primary`       |
|            | Icon    | svg              | `$icon-primary`       |
|            | Tab     | border-bottom    | `$border-interactive` |

  \* Denotes a contextual color token that will change values based on the layer
  it is placed on.

![Example of selected and unselected line tabs](images/tab-style-1.png)

Example of selected and unselected line tabs.

<br />

#### Line tab interactive state color

<br />

| State    | Element         | Property         | Color token        |
| -------- | --------------- | ---------------- | ------------------ |
| Hover    | Label           | text-color       | `$text-primary`    |
|          | Icon            | svg              | `$icon-primary`    |
|          | Tab             | border-bottom    | `$border-strong`   |
| Focus    | Tab: unselected | border           | `$focus`           |
|          | Tab: selected   | border           | `$focus`           |
| Disabled | Label           | text-color       | `$text-disabled`   |
|          | Icon            | svg              | `$icon-disabled`   |
|          | Tab             | background-color | transparent        |
|          |                 | border-bottom    | `$border-disabled` |

![Examples of hover, unselected focus, selected focus, and disabled states for line tabs.](images/tab-style-2.png)

  Examples of hover, unselected focus, selected focus, and disabled states for
  line tabs.

<br />

#### Line tab scrollable states

<br />

| State   | Element | Property         | Color token                            |
| ------- | ------- | ---------------- | -------------------------------------- |
| Enabled | Icon    | svg              | `$icon-primary`                        |
|         | Button  | linear-gradient  | `$background` to 100% transparent, 8px |
|         |         | background-color | `$background`                          |
| Hover   | Button  | background-color | `$background-hover`                    |
| Active  | Button  | background-color | `$background-active`                   |

![Examples of enabled, hover, and active states for scrollable line tabs.](images/tab-style-3.png)

  Examples of enabled, hover, and active states for scrollable line tabs.

### Dismissible line tab color

| Type       | Element | Property         | Color token           |
| ---------- | ------- | ---------------- | --------------------- |
| Unselected | Tab     | background-color | transparent           |
|            |         | border-bottom    | `$border-subtle` \*   |
|            | Label   | text-color       | `$text-secondary`     |
|            | Icon    | svg              | `$icon-secondary`     |
| Selected   | Label   | text-color       | `$text-primary`       |
|            | Icon    | svg              | `$icon-primary`       |
|            | Tab     | border-bottom    | `$border-interactive` |

  \* Denotes a contextual color token that will change values based on the layer
  it is placed on.

![Example of selected and unselected dismissible line tabs.](images/tab-style-4.png)

Example of selected and unselected dismissible line tabs.

<br />

#### Dismissible line tab interactive state

<br />

| State    | Element         | Property         | Color token         |
| -------- | --------------- | ---------------- | ------------------- |
| Hover    | Label           | text-color       | `$text-primary`     |
|          | Icon            | svg              | `$icon-primary`     |
|          |                 | background-color | `$background-hover` |
|          | Tab             | border-bottom    | `$border-strong` \* |
| Focus    | Tab: unselected | border           | `$focus`            |
|          | Tab: selected   | border           | `$focus`            |
| Disabled | Label           | text-color       | `$text-disabled`    |
|          | Icon            | svg              | `$icon-disabled`    |
|          | Tab             | background-color | transparent         |
|          |                 | border-bottom    | `$border-disabled`  |

  \* Denotes a contextual color token that will change values based on the layer
  it is placed on.

![Examples of unselected close hover, unselected hover, unselected focus, and disabled states for dismissible line tabs.](images/tab-style-5.png)

  Examples of unselected close hover, unselected hover, unselected focus, and
  disabled states for dismissible line tabs.

![Examples of selected close hover and selected focus states for dismissible line tabs](images/tab-style-6.png)

  Examples of selected close hover and selected focus states for dismissible
  line tabs.

### Contained tab color

| Type       | Element         | Property         | Color token           |
| ---------- | --------------- | ---------------- | --------------------- |
| Unselected | Tab             | background-color | `$layer-accent` \*    |
|            |                 | border-right     | `$border-strong` \*   |
|            | Label           | text-color       | `$text-secondary`     |
|            | Secondary label | text-color       | `$text-secondary`     |
|            | Icon            | svg              | `$icon-secondary`     |
| Selected   | Tab             | background-color | `$layer` \*           |
|            |                 | border-top       | `$border-interactive` |
|            | Label           | text-color       | `$text-primary`       |
|            | Secondary label | text-color       | `$text-primary`       |
|            | Icon            | svg              | `$icon-primary`       |

  \* Denotes a contextual color token that will change values based on the layer
  it is placed on.

![Examples of selected and unselected contained tabs.](images/tab-style-7.png)

Examples of selected and unselected contained tabs.

<br />

#### Contained tab interactive state color

<br />

| State    | Element         | Property         | Color token               |
| -------- | --------------- | ---------------- | ------------------------- |
| Hover    | Tab             | background-color | `$layer-accent-hover` \*  |
|          | Label           | text-color       | `$text-primary`           |
|          | Secondary label | text-color       | `$text-primary`           |
|          | Icon            | svg              | `$icon-primary`           |
| Focus    | Tab             | border           | `$focus`                  |
| Disabled | Label           | text-color       | `$text-on-color-disabled` |
|          | Secondary label | text-color       | `$text-on-color-disabled` |
|          | Icon            | svg              | `$icon-on-color-disabled` |
|          | Tab             | background-color | `$button-disabled`        |

  \* Denotes a contextual color token that will change values based on the layer
  it is placed on.

![Examples of hover, unselected focus, selected focus, and disabled states for contained tabs.](images/tab-style-8.png)

  Examples of hover, unselected focus, selected focus, and disabled states for
  contained tabs.

<br />

#### Contained tab scrollable states

<br />

| State   | Element | Property         | Color token               |
| ------- | ------- | ---------------- | ------------------------- |
| Enabled | Icon    | svg              | `$icon-secondary`         |
|         | Button  | background-color | `$layer-accent` \*        |
| Hover   | Button  | background-color | `$layer-accent-hover` \*  |
|         | Icon    | svg              | `$icon-primary`           |
| Active  | Button  | background-color | `$layer-accent-active` \* |

  \* Denotes a contextual color token that will change values based on the layer
  it is placed on.

![Examples of enabled, hover, and active states for contained scrollable tabs.](images/tab-style-9.png)

  Examples of enabled, hover, and active states for contained scrollable tabs.

### Dismissible contained tab color

| Type       | Element          | Property         | Color token           |
| ---------- | ---------------- | ---------------- | --------------------- |
| Unselected | Tab              | background-color | `$layer-accent` \*    |
|            |                  | border-right     | `$border-strong` \*   |
|            | Label            | text-color       | `$text-secondary`     |
|            | Icon             | svg              | `$icon-secondary`     |
|            | Dismissible icon | svg              | `$icon-secondary`     |
| Selected   | Tab              | background-color | `$layer` \*           |
|            |                  | border-top       | `$border-interactive` |
|            | Label            | text-color       | `$text-primary`       |
|            | Icon             | svg              | `$icon-primary`       |
|            | Dismissible icon | svg              | `$icon-primary`       |

  \* Denotes a contextual color token that will change values based on the layer
  it is placed on.

![Examples of selected and unselected dismissible contained tabs.](images/tab-style-10.png)

  Examples of selected and unselected dismissible contained tabs.

<br />

#### Dismissible contained tab interactive state color

<br />

| State    | Element                      | Property         | Color token               |
| -------- | ---------------------------- | ---------------- | ------------------------- |
| Hover    | Tab                          | background-color | `$layer-accent-hover` \*  |
|          | Label                        | text-color       | `$text-primary`           |
|          | Icon                         | svg              | `$icon-primary`           |
|          | Dismissible icon             | svg              | `$icon-primary`           |
|          | Dismissible icon: selected   | background-color | `$layer-hover` \*         |
|          | Dismissible icon: unselected | background-color | `$layer-accent-hover` \*  |
| Focus    | Tab                          | border           | `$focus`                  |
| Disabled | Label                        | text-color       | `$text-on-color-disabled` |
|          | Icon                         | svg              | `$icon-on-color-disabled` |
|          | Tab                          | background-color | `$button-disabled`        |

  \* Denotes a contextual color token that will change values based on the layer
  it is placed on.

![Unselected close hover, unselected hover, unselected focus, and disabled states for dismissible contained
tabs.](images/tab-style-11.png)

  Examples of unselected close hover, unselected hover, unselected focus, and
  disabled states for dismissible contained tabs.

![Selected close hover and selected focus states for dismissible contained
tabs.](images/tab-style-12.png)

  Examples of selected close hover and selected focus states for dismissible
  contained tabs.

### Vertical tab color

| Type       | Element             | Property                                 | Color token              |
| ---------- | ------------------- | ---------------------------------------- | ------------------------ |
| Unselected | Tab                 | background-color                         | `$layer` \*              |
|            |                     | border-bottom, border-right, border-left | `$border-subtle` \*      |
|            | Label               | text-color                               | `$text-secondary`        |
|            | Extended background | background-color                         | `$layer` \*              |
|            |                     | border-right                             | `$border-subtle` \*      |
| Selected   | Tab                 | background-color                         | `$layer` \*              |
|            |                     | border-bottom                            | `$border-subtle` \*      |
|            |                     | border-left                              | `$border-interactive` \* |
|            | Label               | text-color                               | `$text-primary`          |
| tab panel  | background          | background-color                         | `$layer` \*              |

  \* Denotes a contextual color token that will change values based on the layer
  it is placed on.

![Examples of selected and unselected vertical tabs.](images/tab-style-20.png)

Examples of selected and unselected vertical tabs.

#### Vertical tab interactive state color

<br />

| State    | Element           | Property         | Color token               |
| -------- | ----------------- | ---------------- | ------------------------- |
| Hover    | Label             | text-color       | `$text-primary`           |
|          | Tab               | background-color | `$layer-hover` \*         |
| Focus    | Tab: unselected   | border           | `$focus`                  |
|          | Label: unselected | text-color       | `$text-secondary`         |
|          | Tab: selected     | border           | `$focus`                  |
|          | Label: selected   | text-color       | `$text-primary`           |
| Disabled | Label             | text-color       | `$text-on-color-disabled` |

![Examples of hover, unselected focus, selected focus, and disabled states for vertical tabs.](images/tab-style-21.png)

  Examples of hover, unselected focus, selected focus, and disabled states for
  vertical tabs.

<br />

## Typography

Tab labels should be set in sentence case, and should not exceed three words.

| Element           | Font-size (px/rem) | Font-weight    | Type token            |
| ----------------- | ------------------ | -------------- | --------------------- |
| Label: unselected | 14 / 0.875         | Regular / 400  | `$body-compact-01`    |
| Label: selected   | 14 / 0.875         | SemiBold / 600 | `$heading-compact-01` |
| Secondary label   | 12 / 0.75          | Regular / 400  | `$label-01`           |

## Structure

### Line tab structure

| Element         | Property                    | px / rem   | Spacing token |
| --------------- | --------------------------- | ---------- | ------------- |
| Tab             | height                      | 40 / 2.5   | –             |
|                 | border-bottom               | 2px        | –             |
|                 | width                       | auto-width | –             |
|                 | margin-left                 | 1px        | –             |
| Label           | padding-left, padding-right | 16 / 1     | `$spacing-05` |
|                 | padding-top, padding-bottom | 8 / 0.5    | `$spacing-03` |
| Icon            | padding-right               | 16 / 1     | `$spacing-05` |
|                 | padding-left                | 8 / 0.5    | `$spacing-03` |
|                 | svg                         | 16 x 16    | –             |
| Scrollable icon | svg                         | 16 x 16    | –             |

<div className="image--fixed">

![Structure and spacing measurements for line tabs.](images/tab-style-13.png)

</div>

Structure and spacing measurements for line tabs | px / rem

<br />

#### Line tab icon-only modifier

<br />

| Element  | Property      | px / rem | Spacing token |
| -------- | ------------- | -------- | ------------- |
| Tab (md) | height, width | 40 / 2.5 | –             |
|          | svg           | 16 x 16  | –             |
| Tab (lg) | height, width | 48 / 3   | –             |
|          | svg           | 20 x 20  | –             |

<div className="image--fixed">

![Structure and spacing measurements for line tabs in px and rem](images/tab-style-14.png)

</div>

  Structure and spacing measurements for icon-only line tabs | px / rem

### Dismissible line tab structure

| Element          | Property                    | px / rem   | Spacing token |
| ---------------- | --------------------------- | ---------- | ------------- |
| Tab              | height                      | 40 / 2.5   | –             |
|                  | border-bottom               | 2px        | –             |
|                  | width                       | auto-width | –             |
|                  | margin-left                 | 1px        | –             |
| Label            | padding-left, padding-right | 16 / 1     | `$spacing-05` |
|                  | padding-top, padding-bottom | 8 / 0.5    | `$spacing-03` |
| Dismissible icon | padding-right               | 16 / 1     | `$spacing-05` |
|                  | padding-left                | 8 / 0.5    | `$spacing-03` |
|                  | svg                         | 16 x 16    | –             |
| Icon             | padding-right               | 8 / 0.5    | `$spacing-03` |
|                  | padding-left                | 16 / 1     | `$spacing-05` |
|                  | svg                         | 16 x 16    | –             |

<div className="image--fixed">

![Structure and spacing measurements for dismissible line tabs without icons (top) and with icons (bottom).](images/tab-style-15.png)

</div>

  Structure and spacing measurements for line tabs without icons (top) and with
  icons (bottom) | px / rem

### Contained tab structure

| Element           | Property                    | px / rem         | Spacing token |
| ----------------- | --------------------------- | ---------------- | ------------- |
| Tab               | height                      | 40 / 2.5         | –             |
|                   | border-top                  | 2px              | –             |
|                   | width                       | auto-width, grid | –             |
| Label             | padding-left, padding-right | 16 / 1           | `$spacing-05` |
| Icon              | padding-right               | 16 / 1           | `$spacing-05` |
|                   | padding-left                | 16 / 1           | `$spacing-05` |
|                   | svg                         | 16 x 16          | –             |
| Tab               | border-right                | 1px              | –             |
| Scrollable icon   | svg                         | 16 x 16          | –             |
| Scrollable button | border-right, border-left   | 1px              | –             |

<div className="image--fixed">

![Structure and spacing measurements for contained tabs in px and rem](images/tab-style-16.png)

</div>

  Structure and spacing measurements for contained tabs | px / rem

<br />

#### Contained tab icon-only modifier

<br />

| Element  | Property      | px / rem | Spacing token |
| -------- | ------------- | -------- | ------------- |
| Tab (lg) | height, width | 48 / 3   | –             |
|          | svg           | 20 x 20  | –             |

<div className="image--fixed">

![Structure and spacing measurements for icon-only contained tabs in px and
  rem](images/tab-style-17.png)

</div>

  Structure and spacing measurements for icon-only contained tabs | px / rem

### Dismissible contained tab structure

| Element          | Property                    | px / rem         | Spacing token |
| ---------------- | --------------------------- | ---------------- | ------------- |
| Tab              | height                      | 40 / 2.5         | –             |
|                  | border-top                  | 2px              | –             |
|                  | width                       | auto-width, grid | –             |
| Label            | padding-left, padding-right | 16 / 1           | `$spacing-05` |
| Dismissible icon | padding-right               | 16 / 1           | `$spacing-05` |
|                  | padding-left                | 8 / .5           | `$spacing-03` |
|                  | svg                         | 16 x 16          | –             |
| Icon             | padding-right               | 8 / .5           | `$spacing-03` |
|                  | padding-left                | 16 / 1           | `$spacing-05` |
|                  | svg                         | 16 x 16          | –             |
| Tab              | border-right                | 1px              | –             |

<div className="image--fixed">

![Structure and spacing measurements for dismissible contained tabs in px and rem](images/tab-style-18.png)

</div>

  Structure and spacing measurements for dismissible contained tabs without
  icons (top) and with icons (bottom)| px / rem

### Vertical tab structure

| Element             | Property                    | px / rem | Spacing token |
| ------------------- | --------------------------- | -------- | ------------- |
| Tab                 | height                      | 64 / 4   | –             |
|                     | border-left                 | 3 px     | –             |
| Tab: unselected     | border-bottom, border-right | 1 px     | –             |
| Tab: selected       | border-bottom               | 1 px     | –             |
| Label               | padding-left, padding-right | 16 / 1   | `$spacing-05` |
| Extended background | border-right                | 1 px     | –             |

<div className="image--fixed">

![Structure and spacing measurements for vertical tabs in px and rem](images/tab-style-22.png)

</div>

  Structure and spacing measurements for vertical tabs without overflow (left)
  and with overflow (right) | px / rem

## Feedback

Help us improve this component by providing feedback, asking questions, and
leaving any other comments on
[GitHub](https://github.com/carbon-design-system/carbon-website/issues/new?assignees=&labels=feedback&template=feedback.md).
