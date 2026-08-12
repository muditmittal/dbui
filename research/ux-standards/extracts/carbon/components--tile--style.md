---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/tile/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
The following page documents visual specifications such as color, typography,
structure, and AI presence.

Color
Typography
Structure
AI presence
Feedback

## Color

### Base tile color

| Element   | Property         | Color token     |
| --------- | ---------------- | --------------- |
| Container | background-color | `$layer` \*     |
| Text      | text color       | `$text-primary` |

![Base tile color](images/tile-style-color-base.png)

Base tile color

### Clickable tile color

Clickable tiles have an available
[feature flag](/components/overview/feature-flags/).

| Element               | Property         | Color token         |
| --------------------- | ---------------- | ------------------- |
| Container             | background-color | `$layer` \*         |
| Text                  | text color       | `$text-primary`     |
| Border (feature flag) | border           | `$border-tile` \*   |
| Icon                  | svg              | `$icon-interactive` |

  \* Denotes a contextual color token that will change values based on the layer
  it is placed on.

![Clickable tile color with the feature flag enabled](images/tile-style-color-clickable-flag-enabled.png)

![Clickable tile color with the feature flag disabled](images/tile-style-color-clickable-flag-disabled.png)

Clickable tile interactive state color

| State    | Element   | Property         | Color token        |
| -------- | --------- | ---------------- | ------------------ |
| Hover    | Container | background-color | `$layer-hover` \*  |
| Focus    | Container | border           | `$focus`           |
| Disabled | Container | border           | `$border-disabled` |
|          | Text      | text color       | `$text-disabled`   |
|          | Icon      | svg              | `$icon-disabled`   |

  \* Denotes a contextual color token that will change values based on the layer
  it is placed on.

![Clickable tile interactive color with the feature flag enabled](images/tile-style-interactive-color-clickable-flag-enabled.png)

![Clickable tile interactive color with the feature flag disabled](images/tile-style-interactive-color-clickable-flag-disabled.png)

### Selectable tile color

Selectable tiles have available
[feature flags](/components/overview/feature-flags/).

| Element   | Property         | Color token       |
| --------- | ---------------- | ----------------- |
| Container | background-color | `$layer` \*       |
| Text      | text color       | `$text-primary`   |
| Border    | border           | `$border-tile` \* |
| Icon      | svg              | `$icon-primary`   |

  \* Denotes a contextual color token that will change values based on the layer
  it is placed on.

![Selectable tile color with the feature flag enabled](images/tile-style-color-selectable-flag-enabled.png)

![Selectable tile color with the feature flag disabled](images/tile-style-color-selectable-flag-disabled.png)

Selectable tile interactive state color

| State          | Element   | Property         | Color token        |
| -------------- | --------- | ---------------- | ------------------ |
| Hover          | Container | background-color | `$layer-hover` \*  |
| Hover selected | Container | background-color | `$layer-hover` \*  |
|                |           | border           | `$border-inverse`  |
| Selected       | Container | border           | `$border-inverse`  |
| Focus          | Container | border           | `$focus`           |
| Disabled       | Container | border           | `$border-disabled` |
|                | Text      | text color       | `$text-disabled`   |
|                | Icon      | svg              | `$icon-disabled`   |

  \* Denotes a contextual color token that will change values based on the layer
  it is placed on.

![Selectable tile interactive color with the feature flag enabled](images/tile-style-interactive-color-single-select-flag-enabled.png)

![Selectable tile interactive color with the feature flag disabled](images/tile-style-interactive-color-single-select-flag-disabled.png)

### Expandable tile color

Expandable tiles have an available
[feature flag](/components/overview/feature-flags/).

| Element   | Property         | Color token       |
| --------- | ---------------- | ----------------- |
| Container | background-color | `$layer` \*       |
|           | text color       | `$text-primary`   |
|           | border           | `$border-tile` \* |
| Icon      | svg              | `$icon-primary`   |

![Expandable tile color with the feature flag enabled](images/tile-style-color-expandable-flag-enabled.png)

![Expandable tile color with the feature flag disabled](images/tile-style-color-expandable-flag-disabled.png)

Expandable tile interactive state color

| State    | Element   | Property         | Color token        |
| -------- | --------- | ---------------- | ------------------ |
| Hover    | Container | background-color | `$layer-hover` \*  |
| Focus    | Container | border           | `$focus`           |
| Disabled | Container | border           | `$border-disabled` |
|          | Text      | text color       | `$text-disabled`   |
|          | Icon      | svg              | `$icon-disabled`   |

  \* Denotes a contextual color token that will change values based on the layer
  it is placed on.

![Expandable tile interactive color without interactive elements and the feature flag enabled](images/tile-style-interactive-color-expandable-flag-enabled.png)

![Expandable tile interactive color without interactive elements and the feature flag disabled](images/tile-style-interactive-color-expandable-flag-disabled.png)

![Expandable tile interactive color with interactive elements and feature flag enabled](images/tile-style-interactive-color-expandable-element-flag-enabled.png)

![Expandable tile interactive color with interactive elements and feature flag disabled](images/tile-style-interactive-color-expandable-element-flag-disabled.png)

## Typography

The default token for tile titles is `$body-compact-01`, although it can be
customized as needed by product teams.

| Element | Font-size (px/rem) | Font-weight   | Type token         |
| ------- | ------------------ | ------------- | ------------------ |
| Title   | 14 / 0.875         | Regular / 400 | `$body-compact-01` |

## Structure

### Base tile structure

| Element   | Property                    | px / rem | Spacing token |
| --------- | --------------------------- | -------- | ------------- |
| Container | min-height                  | 64 / 4   | –             |
|           | min-width                   | 128 / 8  | –             |
| Content   | padding-top, padding-bottom | 16 / 1   | `$spacing-05` |
|           | padding-left, padding-right | 16 / 1   | `$spacing-05` |

<div className="image--fixed">

![Structure and spacing measurements for base tile | px / rem](images/tile-style-structure-base.png)

</div>

Structure and spacing measurements for base tile | px / rem

### Clickable tile structure

| Element   | Property                    | px / rem  | Spacing token |
| --------- | --------------------------- | --------- | ------------- |
| Container | min-height                  | 64 / 4    | –             |
|           | min-width                   | 128 / 8   | –             |
| Content   | padding-top, padding-bottom | 16 / 1    | `$spacing-05` |
|           | padding-left, padding-right | 16 / 1    | `$spacing-05` |
| Icon      | padding-top, padding-bottom | 12 / 0.75 | `$spacing-04` |
|           | padding-left, padding-right | 12 / 0.75 | `$spacing-04` |
|           | size                        | 20px      | –             |

<div className="image--fixed">

![Structure and spacing measurements for clickable tile with eth feature flag enabled | px / rem](images/tile-style-structure-clickable.png)

</div>

  Structure and spacing measurements for clickable tile with the feature flag
  enabled | px / rem

### Selectable tile structure

| Element   | Property                    | px / rem | Spacing token |
| --------- | --------------------------- | -------- | ------------- |
| Container | min-height                  | 64 / 4   | –             |
|           | min-width                   | 128 / 8  | –             |
| Content   | padding-top, padding-bottom | 16 / 1   | `$spacing-05` |
|           | padding-left, padding-right | 16 / 1   | `$spacing-05` |
| Icon      | padding-top, padding-bottom | 16 / 1   | `$spacing-05` |
|           | padding-left, padding-right | 16 / 1   | `$spacing-05` |
|           | size                        | 16px     | –             |

<div className="image--fixed">

![Structure and spacing measurements for selectable tile with feature flags | px / rem](images/tile-style-structure-selectable.png)

</div>

  Structure and spacing measurements for selectable tile with the feature flags
  enabled | px / rem

### Expandable tile structure

| Element   | Property                    | px / rem | Spacing token |
| --------- | --------------------------- | -------- | ------------- |
| Container | min-height                  | 64 / 4   | –             |
|           | min-width                   | 128 / 8  | –             |
| Content   | padding-top, padding-bottom | 16 / 1   | `$spacing-05` |
|           | padding-left, padding-right | 16 / 1   | `$spacing-05` |
| Icon      | padding-top, padding-bottom | 16 / 1   | `$spacing-05` |
|           | padding-left, padding-right | 16 / 1   | `$spacing-05` |
|           | size                        | 16px     | –             |
| Link      | padding-bottom              | 16 / 1   | `$spacing-05` |
|           | padding-left, padding-right | 16 / 1   | `$spacing-05` |

<div className="image--fixed">

![Structure and spacing measurements for expandable tile with the feature flag enabled | px / rem](images/tile-style-structure-expandable.png)

</div>

  Structure and spacing measurements for expandable tile with the feature flag
  enabled | px / rem

### Proportions for grid

| Percentage | XL 1600-1200                            | L 1200-992                              | M 992-768                               | S 768-576                               | XS 576-0                                |
| ---------- | --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| 100%       |  |  |  |  |  |
| 1/2        |  |  |  |  |  |
| 2/3        |  |  |  |  |                                         |
| 1/3        |  |  |  |  |                                         |
| 1/4        |  |  |  |  |                                         |
| 1/6        |  |  |                                         |                                         |                                         |

## AI presence

The following are the unique styles applied to the components when the AI label
is present. Unless specified, all other tokens in the components remain the same
as the non-AI variants.

For more information on the AI style elements, see the
[Carbon for AI](/guidelines/carbon-for-ai/) guidelines.

| Element                    | Property         | Token / Size       |
| -------------------------- | ---------------- | ------------------ |
| Tile:background            | background-color | `$layer` \*        |
|                            | box-shadow       | `$ai-drop-shadow`  |
|                            | inner-shadow     | `$ai-inner-shadow` |
| Linear-gradient:background | start            | `$ai-aura-start`   |
|                            | top              | `$ai-aura-stop`    |
| Linear-gradient:border     | start            | `$ai-border-start` |
|                            | stop             | `$ai-border-stop`  |
| AI label                   | size             | mini               |

  \* Denotes a contextual color token that will change values based on the layer
  it is placed on.

![Structure and spacing measurements for tile with AI presence](images/tile-style-AI-presence.png)

Structure and spacing measurements for tile with AI presence

## Feedback

Help us improve this component by providing feedback, asking questions, and
leaving any other comments on
[GitHub](https://github.com/carbon-design-system/carbon-website/issues/new?assignees=&labels=feedback&template=feedback.md).
