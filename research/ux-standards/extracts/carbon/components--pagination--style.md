---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/pagination/
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

### Pagination color

| Element                         | Property         | Color token         |
| ------------------------------- | ---------------- | ------------------- |
| Container                       | background-color | `$layer` \*         |
| Border                          | border-top       | `$border-subtle` \* |
| Text: items per page            | text-color       | `$text-primary`     |
| Text: number of items           | text-color       | `$text-primary`     |
| Text: page range of total items | text-color       | `$text-secondary`   |
| Icon                            | fill             | `$icon-primary`     |

  \* Denotes a contextual color token that will change values based on the layer
  it is placed on.

![Example of pagination color](images/pagination-style-color-pagination.png)

Example of pagination color

#### Pagination interactive state color

The pagination variant has nested select and ghost icon buttons with interactive
states. See the
[select](https://carbondesignsystem.com/components/select/style/) and
[button](https://carbondesignsystem.com/components/button/style/#ghost-button)
style tab for more information.

| State    | Element    | Property         | Color token     |
| -------- | ---------- | ---------------- | --------------- |
| Hover    | Background | background-color | `$layer` \*     |
| Focus    | Border     | border           | `$focus`        |
| Disabled | Text       | text-color       | `$text-primary` |
|          | Icon       | fill             | `$icon-primary` |
|          | Background | background-color | `$layer` \*     |

  \* Denotes a contextual color token that will change values based on the layer
  it is placed on.

![Example of pagination interactive state color](images/pagination-style-interactive-pagination.png)

Example of pagination interactive state color

### Pagination nav color

| Element        | Property         | Color token           |
| -------------- | ---------------- | --------------------- |
| Container      | background-color | transparent           |
| Text           | text-color       | `$text-primary`       |
| Icon           | fill             | `$icon-primary`       |
| Page: selected | border           | `$border-interactive` |

![Example of pagination nav color](images/pagination-style-color-pagination-nav.png)

Example of pagination nav color

#### Pagination nav interactive state color

The pagination nav variant has nested ghost icon buttons with interactive
states. See the
[button](https://carbondesignsystem.com/components/button/style/#ghost-button)
style tab for more information.

| State    | Element    | Property         | Color token           |
| -------- | ---------- | ---------------- | --------------------- |
| Hover    | Background | background-color | `$layer-hover` \*     |
| Focus    | Border     | border           | `$focus`              |
| Selected | Border     | border           | `$border-interactive` |
| Disabled | Text       | text-color       | `$text-disabled`      |
|          | Icon       | fill             | `$icon-disabled`      |
|          | Background | background-color | transparent           |

  \* Denotes a contextual color token that will change values based on the layer
  it is placed on.

![Example of pagination nav interactive state color](images/pagination-style-interactive-pagination-nav.png)

Example of pagination nav interactive state color

## Typography

Pagination text should be set in sentence case with the first letter of each
word capitalized.

### Pagination typography

| Element | Font-size (px/rem) | Font-weight   | Type token         |
| ------- | ------------------ | ------------- | ------------------ |
| Text    | 14 / 0.875         | Regular / 400 | `$body-compact-01` |

### Pagination nav typography

| Element          | Font-size (px/rem) | Font-weight    | Type token            |
| ---------------- | ------------------ | -------------- | --------------------- |
| Text: unselected | 14 / 0.875         | Regular / 400  | `$body-compact-01`    |
| Text: selected   | 14 / 0.875         | SemiBold / 600 | `$heading-compact-01` |

## Structure

### Pagination structure

The pagination variant is connected to the bottom of data tables, and its width
is determined by the width of the data table.

| Element                         | Property                    | px / rem  | Spacing token |
| ------------------------------- | --------------------------- | --------- | ------------- |
| Container                       | border                      | 1px       | –             |
|                                 | padding-left, padding-right | 16 / 1    | `$spacing-05` |
| Select control: items per page  | padding-left                | 8 / .5    | `$spacing-03` |
|                                 | padding-right               | 16 / 1    | `$spacing-05` |
| Select control: number of pages | padding-left                | 16 / 1    | `$spacing-05` |
|                                 | padding-right               | 8 / .5    | `$spacing-03` |
| Chevron icon                    | svg                         | 16 x 16px | –             |
| Caret icon                      | svg                         | 16 x 16px | –             |

<div className="image--fixed">

![Structure and spacing measurements for pagination | px / rem](images/pagination-style-structure-pagination.png)

</div>

Structure and spacing measurements for pagination | px / rem

### Pagination nav structure

The pagination nav variant is placed near the information it is paginated to,
and its width is determined by the number of pages available.

| Element          | Property | px / rem  | Spacing token |
| ---------------- | -------- | --------- | ------------- |
| Border: selected | border   | 4px       | –             |
| Caret icon       | svg      | 16 x 16px | –             |

<div className="image--fixed">

![Structure and spacing measurements for pagination nav | px / rem](images/pagination-style-structure-pagination-nav.png)

</div>

  Structure and spacing measurements for pagination nav | px / rem

## Size

The pagination component is available in three sizes for both variants:
**large**, **medium**, and **small**.

| Element          | Size        | Height (px / rem) |
| ---------------- | ----------- | ----------------- |
| Container height | Large (lg)  | 48 / 3            |
|                  | Medium (md) | 40 / 2.5          |
|                  | Small (sm)  | 32 / 2            |
| Icon button      | Large (lg)  | 48 / 3            |
|                  | Medium (md) | 40 / 2.5          |
|                  | Small (sm)  | 32 / 2            |

### Pagination size

<div className="image--fixed">

![Large, medium, and small sizes of pagination](images/pagination-usage-sizes.png)

</div>

Large, medium, and small sizes of pagination

### Pagination nav size

<div className="image--fixed">

![Large, medium, and small sizes of pagination nav](images/pagination-usage-sizes-pagination-nav.png)

</div>

Large, medium, and small sizes of pagination nav

## Feedback

Help us improve this component by providing feedback, asking questions, and
leaving any other comments
on[GitHub](https://github.com/carbon-design-system/carbon-website/issues/new?assignees=&labels=feedback&template=feedback.md).
