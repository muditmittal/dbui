---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/button/
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

### Primary button color

| Element   | Property         | Color token       |
| --------- | ---------------- | ----------------- |
| Label     | text-color       | `$text-on-color`  |
| Icon      | svg              | `$icon-on-color`  |
| Container | background-color | `$button-primary` |

![Primary button color](images/button-style-primary.png)

![Primary icon only button color](images/button-style-primary-icon-only.png)

Primary button interactive state color

| State    | Element   | Property         | Color token               |
| -------- | --------- | ---------------- | ------------------------- |
| Hover    | Container | background-color | `$button-primary-hover`   |
| Focus    | Container | border           | `$focus`                  |
|          |           | inset            | `$focus-inset`            |
| Active   | Container | background-color | `$button-primary-active`  |
| Disabled | Label     | text-color       | `$text-on-color-disabled` |
|          | Icon      | svg              | `$icon-on-color-disabled` |
|          | Container | background-color | `$button-disabled`        |

![Primary button interactive states color](images/button-style-primary-interactive-states.png)

![Primary icon only button interactive states color](images/button-style-primary-icon-only-interactive-states.png)

### Secondary button color

| Element   | Property         | Color token         |
| --------- | ---------------- | ------------------- |
| Label     | text-color       | `$text-on-color`    |
| Icon      | svg              | `$icon-on-color`    |
| Container | background-color | `$button-secondary` |

![Secondary button color](images/button-style-secondary.png)

![Secondary icon only button color](images/button-style-secondary-icon-only.png)

Secondary button interactive state color

| State    | Element   | Property         | Color token                |
| -------- | --------- | ---------------- | -------------------------- |
| Hover    | Container | background-color | `$button-secondary-hover`  |
| Focus    | Container | border           | `$focus`                   |
|          |           | inset            | `$focus-inset`             |
| Active   | Container | background-color | `$button-secondary-active` |
| Disabled | Label     | text-color       | `$text-on-color-disabled`  |
|          | Icon      | svg              | `$icon-on-color-disabled`  |
|          | Container | background-color | `$button-disabled`         |

![Secondary button interactive states color](images/button-style-secondary-interactive-states.png)

![Secondary icon only button interactive states color](images/button-style-secondary-icon-only-interactive-states.png)

### Tertiary button color

| Element   | Property         | Color token        |
| --------- | ---------------- | ------------------ |
| Label     | text-color       | `$button-tertiary` |
| Icon      | svg              | `$button-tertiary` |
| Container | background-color | transparent        |
|           | border           | `$button-tertiary` |

![Tertiary button color](images/button-style-tertiary.png)

![Tertiary icon only button color](images/button-style-tertiary-icon-only.png)

Tertiary button interactive state color

| State    | Element   | Property         | Color token               |
| -------- | --------- | ---------------- | ------------------------- |
| Hover    | Label     | text-color       | `$text-inverse`           |
|          | Icon      | svg              | `$icon-inverse`           |
|          | Container | background-color | `$button-tertiary-hover`  |
| Focus    | Container | background-color | `$button-tertiary`        |
|          |           | border           | `$focus`                  |
|          |           | inset            | `$focus-inset`            |
| Active   | Label     | text-color       | `$text-inverse`           |
|          | Icon      | svg              | `$icon-inverse`           |
|          | Container | background-color | `$button-tertiary-active` |
| Disabled | Label     | text-color       | `$text-disabled`          |
|          | Icon      | svg              | `$icon-disabled`          |
|          | Container | background-color | transparent               |
|          |           | border           | `$button-disabled`        |

![Tertiary button interactive states color](images/button-style-tertiary-interactive-states.png)

![Tertiary icon only button interactive states color](images/button-style-tertiary-icon-only-interactive-states.png)

### Ghost button color

Ghost button color

| Element   | Property         | Color token     |
| --------- | ---------------- | --------------- |
| Label     | text-color       | `$link-primary` |
| Icon      | svg              | `$link-primary` |
| Container | background-color | transparent     |

Ghost icon only button color

| Element   | Property         | Color token     |
| --------- | ---------------- | --------------- |
| Icon      | svg              | `$icon-primary` |
| Container | background-color | transparent     |

![Ghost button color](images/button-style-ghost.png)

![Ghost icon only button color](images/button-style-ghost-icon-only.png)

Ghost button interactive state color

| State    | Element   | Property         | Color token           |
| -------- | --------- | ---------------- | --------------------- |
| Hover    | Label     | text-color       | `$link-primary-hover` |
|          | Icon      | svg              | `$link-primary-hover` |
|          | Container | background-color | `$background-hover`   |
| Focus    | Container | background-color | `$focus`              |
| Active   | Container | background-color | `$background-hover`   |
| Disabled | Label     | text-color       | `$text-disabled`      |
|          | Icon      | svg              | `$icon-disabled`      |

Ghost icon only button interactive state color

| State    | Element   | Property         | Color token          |
| -------- | --------- | ---------------- | -------------------- |
| Hover    | Container | background-color | `$background-hover`  |
| Focus    | Container | border           | `$focus`             |
| Active   | Container | background-color | `$background-active` |
| Disabled | Icon      | svg              | `$icon-disabled`     |

![Ghost button interactive states color](images/button-style-ghost-interactive-states.png)

![Ghost icon only button interactive states color](images/button-style-ghost-icon-only-interactive-states.png)

### Danger primary button color

| Element   | Property         | Color token              |
| --------- | ---------------- | ------------------------ |
| Label     | text-color       | `$text-on-color`         |
| Icon      | svg              | `$icon-on-color`         |
| Container | background-color | `$button-danger-primary` |

![Danger primary button color](images/button-style-danger-primary.png)

Danger primary button color

Danger primary button interactive state color

| State    | Element   | Property         | Color token               |
| -------- | --------- | ---------------- | ------------------------- |
| Hover    | Container | background-color | `$button-danger-hover`    |
| Focus    | Container | border           | `$focus`                  |
|          |           | inset            | `$focus-inset`            |
| Active   | Container | background-color | `$button-danger-active`   |
| Disabled | Label     | text-color       | `$text-on-color-disabled` |
|          | Icon      | svg              | `$icon-on-color-disabled` |
|          | Container | background-color | `$button-disabled`        |

![Danger primary button interactive states color](images/button-style-danger-primary-interactive-states.png)

Danger primary button interactive state color

### Danger tertiary button color

| Element   | Property   | Color token                |
| --------- | ---------- | -------------------------- |
| Label     | text-color | `$button-danger-secondary` |
| Icon      | svg        | `$button-danger-secondary` |
| Container | border     | `$button-danger-secondary` |

![Danger tertiary button color](images/button-style-danger-tertiary.png)

Danger tertiary button color

Danger tertiary button interactive state color

| State    | Element   | Property         | Color token             |
| -------- | --------- | ---------------- | ----------------------- |
| Hover    | Label     | text-color       | `$text-on-color`        |
|          | Icon      | svg              | `$icon-on-color`        |
|          | Container | background-color | `$button-danger-hover`  |
| Focus    |           | border           | `$focus`                |
|          |           | inset            | `$focus-inset`          |
| Active   | Label     | text-color       | `$text-on-color`        |
|          | Icon      | svg              | `$icon-on-color`        |
|          | Container | background-color | `$button-danger-active` |
| Disabled | Label     | text-color       | `$text-disabled`        |
|          | Icon      | svg              | `$icon-disabled`        |
|          | Container | background-color | `$button-disabled`      |

![Danger tertiary button interactive state color](images/button-style-danger-tertiary-interactive-states.png)

Danger tertiary button interactive state color

### Danger ghost button color

| Element   | Property         | Color token                |
| --------- | ---------------- | -------------------------- |
| Label     | text-color       | `$button-danger-secondary` |
| Icon      | svg              | `$button-danger-secondary` |
| Container | background-color | transparent                |

![Danger ghost button color](images/button-style-danger-ghost.png)

Danger ghost button color

Danger ghost button interactive state color

| State    | Element   | Property         | Color token             |
| -------- | --------- | ---------------- | ----------------------- |
| Hover    | Label     | text-color       | `$text-on-color`        |
|          | Icon      | svg              | `$icon-on-color`        |
|          | Container | background-color | `$button-danger-hover`  |
| Focus    |           | border           | `$focus`                |
|          |           | inset            | `$focus-inset`          |
| Active   | Label     | text-color       | `$text-on-color`        |
|          | Icon      | svg              | `$icon-on-color`        |
|          | Container | background-color | `$button-danger-active` |
| Disabled | Label     | text-color       | `$text-disabled`        |
|          | Icon      | svg              | `$icon-disabled`        |
|          | Container | background-color | `$button-disabled`      |

![Danger ghost button interactive state color](images/button-style-danger-ghost-interactive-states.png)

Danger ghost button interactive state color

## Typography

Button label should be set in sentence case, with only the first word in a
phrase and any proper nouns capitalized.

| Element                   | Font-size (px/rem) | Font-weight   | Type token         |
| ------------------------- | ------------------ | ------------- | ------------------ |
| Button label              | 14 / 0.875         | Regular / 400 | `$body-compact-01` |
| Button label (expressive) | 16 / 1             | Regular / 400 | `$body-compact-02` |

## Structure

Primary, secondary, tertiary, danger primary and danger tertiary button follows
the same structure measurements. A button cannot have label or any element
within 16 pixels / 1 rem of its borders. For a button with an icon, the space
between the button label and the icon must be greater than or equal to 16 pixels
/ 1 rem. This is to accommodate for instances where two or more buttons with
icons appear together.

### Button structure

| Element             | Property                    | px / rem | Spacing token |
| ------------------- | --------------------------- | -------- | ------------- |
| Button without icon | padding-left                | 16 / 1   | `$spacing-05` |
|                     | padding-right               | 64 / 4   | `$spacing-10` |
| Button with icon    | padding-left, padding-right | 16 / 1   | `$spacing-05` |
|                     | spacing                     | 32 / 2   | `$spacing-07` |
| Icon only button    | padding-left, padding-right | 16 / 1   | `$spacing-05` |
| Icon                | svg                         | 16 x 16  | –             |
| Icon: expressive    | size                        | 20 x 20  | –             |
| Focus               | box-shadow: inset           | 1px      | –             |

![Button structure](images/button-style-structure.png)

Structure measurements for a button | px / rem

### Ghost button structure

Ghost and danger ghost button follow the same structure measurements.

| Element                   | Property                    | px / rem | Spacing token |
| ------------------------- | --------------------------- | -------- | ------------- |
| Ghost button without icon | padding-left, padding-right | 16 / 1   | `$spacing-05` |
| Ghost button with icon    | spacing                     | 8 / 0.5  | `$spacing-03` |
| Ghost icon only button    | padding-left, padding-right | 16 / 1   | `$spacing-05` |

![Ghost button structure](images/button-style-structure-ghost.png)

Structure measurements for ghost button | px / rem

### Button groups structure

The following specs are not built into any of the button components but are
recommended by design as the proper distance between buttons.

For button groups, the primary button is positioned on the outside of the set,
while the secondary button is positioned inside.

| Element       | Property                  | px / rem | Spacing token |
| ------------- | ------------------------- | -------- | ------------- |
| Button groups | border (fluid)            | 1px      | –             |
|               | spacing (fixed)           | 16px     | `$spacing-05` |
|               | margin-left, margin-right | 0        | –             |

![Button groups structure](images/button-style-structure-button-groups.png)

Structure measurements for button groups | px / rem

## Size

There are seven button sizes: **extra small**, **small**, **medium**, **large
(productive)**, **large (expressive)**, **extra large**, and **2XL**. The large
(expressive) button is used in editorial and digital marketing experiences. See
[Button sizes](/components/button/usage#button-sizes) on the Usage tab for more
information about specific use cases for each button size.

| Variant           | Size               | Height (px / rem) |
| ----------------- | ------------------ | ----------------- |
| Button            | Extra small        | 24 / 1.5          |
|                   | Small              | 32 / 2            |
|                   | Medium             | 40 / 2.5          |
|                   | Large (productive) | 48 / 3            |
|                   | Large (expressive) | 48 / 3            |
| Full bleed button | Extra large        | 64 / 4            |
|                   | 2XL                | 80 / 5            |

![Button sizes](images/button-style-sizes.png)

Button sizes

## Feedback

Help us improve this component by providing feedback, asking questions, and
leaving any other comments on
[GitHub](https://github.com/carbon-design-system/carbon-website/issues/new?assignees=&labels=feedback&template=feedback.md).
