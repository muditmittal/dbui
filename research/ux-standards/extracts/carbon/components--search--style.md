---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/search/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
## Color

| Element            | Property         | Color token         |
| ------------------ | ---------------- | ------------------- |
| Field              | background-color | `$field` \*         |
|                    | border-bottom    | `$border-strong` \* |
| Label text (fluid) | text-color       | `$text-secondary`   |
| Placeholder text   | text-color       | `$text-placeholder` |
| Search icon        | fill             | `$icon-secondary`   |

  \* Denotes a contextual color token that will change values based on the layer
  it is placed on.

<div className="image--fixed">

![Example of search](images/search-style-1.png)

</div>

Example of search

### Interactive colors

| State    | Element            | Property      | Color token         |
| -------- | ------------------ | ------------- | ------------------- |
| Focus    | Field              | border        | `$focus`            |
| Filled   | Field text         | text-color    | `$text-primary`     |
|          | Close icon         | fill          | `$icon-primary`     |
| Disabled | Field text         | text-color    | `$text-disabled`    |
|          | Label text (fluid) | text-color    | `$text-disabled`    |
|          | Search icon        | fill          | `$icon-disabled`    |
|          | Field (fluid)      | border-bottom | `$border-subtle` \* |

![Examples of focus, filled, and disabled search states](images/search-style-fixed-2.png)

![Examples of focus, filled, and disabled search states](images/search-style-fluid-2.png)

## Typography

Search text should be set in sentence case, with only the first letter of the
first word capitalized.

| Element            | Font-size (px/rem) | Font-weight   | Type token         |
| ------------------ | ------------------ | ------------- | ------------------ |
| Field text         | 14 / 0.875         | Regular / 400 | `$body-compact-01` |
| Label text (fluid) | 12 / 0.75          | Regular / 400 | `$label-01`        |

## Structure

#### Default inputs

The width of the search field should appropriately fit the design and layout of
content. The width may vary based on the grid and layout.

| Element                      | Property                    | px / rem | Spacing token |
| ---------------------------- | --------------------------- | -------- | ------------- |
| Search icon <br/> Close icon | height, width               | 16 / 1   | –             |
| Small field                  | padding-left, padding-right | 32 / 2   | `$spacing-07` |
| Medium field                 | padding-left, padding-right | 40 / 2.5 | `$spacing-08` |
| Large field                  | padding-left, padding-right | 48 / 3   | `$spacing-09` |

<div className="image--fixed">

![Structure and spacing measurements for default small search](images/search-style-fixed-3a.png)

</div>

  Structure and spacing measurements for default small search | px | rem

<div className="image--fixed">

![Structure and spacing measurements for default medium search](images/search-style-fixed-3b.png)

</div>

  Structure and spacing measurements for default medium search | px | rem

<div className="image--fixed">

![Structure and spacing measurements for default large search](images/search-style-fixed-3c.png)

</div>

  Structure and spacing measurements for default large search | px | rem

#### Fluid inputs

The width of the search field should appropriately fit the design and layout of
content. The width may vary based on the grid and layout.

| Element     | Property                    | px / rem   | Spacing token |
| ----------- | --------------------------- | ---------- | ------------- |
| Label       | margin-bottom               | 4 / 0.25   | `$spacing-02` |
| Field       | padding-left                | 16 / 1     | `$spacing-05` |
|             | padding-right               | 80 / 5     | `$spacing-11` |
|             | border                      | 1px        | –             |
|             | margin-top, margin-bottom   | 13 / .8125 | –             |
| Close icon  | padding-right, padding-left | 12 / .75   | `$spacing-04` |
| Search icon | padding-right, padding-left | 12 / .75   | `$spacing-04` |

<div className="image--fixed">

![Structure and spacing measurements for fluid search](images/search-style-fluid-3a.png)

</div>

  Structure and spacing measurements for fluid search | px | rem

## Sizes

| Size        | Height px / rem |
| ----------- | --------------- |
| Small (sm)  | 32 / 2          |
| Medium (md) | 40 / 2.5        |
| Large (lg)  | 48 / 3          |

<div className="image--fixed">

![Sizes for search](images/search-style-size.png)

</div>

Search sizes | px / rem
