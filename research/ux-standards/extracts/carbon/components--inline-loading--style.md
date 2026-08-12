---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/inline-loading/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
## Color

| Class                        | Property | Color token           |
| ---------------------------- | -------- | --------------------- |
| `.cds--loading__background`  | stroke   | `$border-subtle` \*   |
| `.cds--loading__stroke`      | stroke   | `$border-interactive` |
| `.cds--inline-loading__text` | color    | `$text-secondary`     |
| `status: finished`           | svg      | `$support-success`    |
| `status: finished`           | svg      | `$support-error`      |

  \* Denotes a contextual color token that will change values based on the layer
  it is placed on.

![Example of inline loading states](images/inline-loading-states-style.png)

## Typography

Text should be set in sentence case, with only the first word in a phrase and
any proper nouns capitalized.

| Element | Font-size (px/rem) | Font-weight   | Type token         |
| ------- | ------------------ | ------------- | ------------------ |
| Text    | 14 / 0.75          | Regular / 400 | `$body-compact-01` |

## Structure

| Class     | Property      | px / rem | Spacing token |
| --------- | ------------- | -------- | ------------- |
| Spinner   | width, height | 16 / 1   | –             |
| Checkmark | width, height | 16 / 1   | –             |

<div className="image--fixed">

![Inline loading spinner structure measurements](images/inline-loading-style-1.png)

</div>

### Placement

The inline loading component should appear during any user action loading. If
button is used to trigger the action, the inline loading component should
replace that button.

<div className="image--fixed">

![Inline loading spinner in context example](images/inline-loading-style-3.png)

</div>

  Structure measurements for small and large loading spinner | px / rem
