---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/breadcrumb/
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

| Element        | Property   | Color token     |
| -------------- | ---------- | --------------- |
| Text: enabled  | text-color | `$link-primary` |
| Text: current  | text-color | `$text-primary` |
| Slash          | text-color | `$text-primary` |
| Overflow: icon | svg        | `$link-primary` |

![Breadcrumb color and overflow color](images/breadcrumb-style-color-overflow-2.png)

Breadcrumb color and overflow color

### Breadcrumb interactive state color

| State   | Element | Property   | Color token           |
| ------- | ------- | ---------- | --------------------- |
| Hover   | Text    | text-color | `$link-primary-hover` |
| Focus   | Text    | text-color | `$link-primary`       |
|         | Border  | border     | `$focus`              |
| Active  | Text    | text-color | `$text-primary`       |
|         | Border  | border     | `$focus`              |
| Current | Text    | text-color | `$text-primary`       |

![Breadcrumb interactive state color](images/breadcrumb-style-interactive-state-color-1.png)

Breadcrumb interactive state color

### Breadcrumb overflow interactive state color

A group of breadcrumbs with overflow content uses the overflow menu component to
disclose additional breadcrumbs in a menu view. A tooltip component appears in
the hover, focus, and active states. Use the [menu](/components/menu/style) and
[tooltip](/components/tooltip/style) colors for these instances.

| State  | Element | Property | Color token           |
| ------ | ------- | -------- | --------------------- |
| Hover  | Icon    | svg      | `$link-primary-hover` |
| Focus  | Icon    | svg      | `$link-primary`       |
|        | Border  | border   | `$focus`              |
| Active | Icon    | svg      | `$icon-primary`       |
|        | Border  | border   | `$focus`              |

![Breadcrumb overflow interactive state color.](images/breadcrumb-style-interactive-state-color-overflow-1.png)

Breadcrumb overflow interactive state color

## Typography

There are two sizes of breadcrumbs: small and medium. Each breadcrumb size uses
a different type token. Breadcrumbs receive an underline in the hover, focus,
and active states.

| Element             | Font-size (px/rem) | Font-weight   | Type token         |
| ------------------- | ------------------ | ------------- | ------------------ |
| Text: small         | 12 / 0.75          | Regular / 400 | `$label-01`        |
| Text: medium        | 14 / 0.875         | Regular / 400 | `$body-compact-01` |
| Text: overflow menu | 14 / 0.875         | Regular / 400 | `$body-compact-01` |

## Structure

When an overflow menu is present to disclose overflow breadcrumbs, use the
[menu](/components/menu/style/#structure) component structure.

### Small breadcrumb structure

| Element             | Property                  | px/rem   | Spacing token |
| ------------------- | ------------------------- | -------- | ------------- |
| Link                | margin-left, margin-right | 4 / 0.25 | `$spacing-02` |
| Link: overflow icon | margin-left, margin-right | 4 / 0.25 | `$spacing-02` |
| Link: overflow menu | height                    | 40 / 2.5 | `$spacing-08` |

<div className="image--fixed">

![Structure and spacing measurements for small breadcrumb | px / rem](images/breadcrumb-style-structure-small-1.png)

</div>

  Structure and spacing measurements for small breadcrumb | px / rem

<div className="image--fixed">

![Structure and spacing measurements for small breadcrumb overflow | px / rem](images/breadcrumb-style-structure-small-overflow-2.png)

</div>

  Structure and spacing measurements for small breadcrumb overflow | px / rem

### Medium breadcrumb structure

| Element             | Property                  | px/rem   | Spacing token |
| ------------------- | ------------------------- | -------- | ------------- |
| Link                | margin-left, margin-right | 8 / 0.5  | `$spacing-03` |
| Link: overflow icon | margin-left, margin-right | 8 / 0.5  | `$spacing-03` |
| Link: overflow menu | height                    | 40 / 2.5 | `$spacing-08` |

<div className="image--fixed">

![Structure and spacing measurements for medium breadcrumb | px / rem](images/breadcrumb-style-structure-medium-1.png)

</div>

  Structure and spacing measurements for medium breadcrumb | px / rem

<div className="image--fixed">

![Structure and spacing measurements for medium breadcrumb overflow | px / rem](images/breadcrumb-style-structure-medium-overflow-2.png)

</div>

  Structure and spacing measurements for medium breadcrumb overflow | px / rem

### Size

| Element    | Size        | Height (px/rem) |
| ---------- | ----------- | --------------- |
| Breadcrumb | Small (sm)  | 16 / 1          |
|            | Medium (md) | 18 / 1.125      |

![Size measurements for small and medium breadcrumb | px / rem](images/breadcrumb-style-size.png)

Size measurements for small and medium breadcrumb | px / rem

## Feedback

Help us improve this component by providing feedback, asking questions, and
leaving any other comments on
[GitHub](https://github.com/carbon-design-system/carbon-website/issues/new?assignees=&labels=feedback&template=feedback.md).
