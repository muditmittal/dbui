---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/popover/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
## Color

| Element   | Property         | Color token           |
| --------- | ---------------- | --------------------- |
| Container | background-color | `$layer` \*           |
|           | background-color | `$background-inverse` |

  \* Denotes a contextual color token that will change values based on the layer
  it is placed on.

![Popover container colors.](images/popover-style-1.png)

## Structure

The width and height of a popover container can vary depending on the amount of
content within it. We recommend to not exceed a popover width size of four
columns.

| Element   | Property      | px / rem | Spacing token |
| --------- | ------------- | -------- | ------------- |
| Container | max-width     | 352 / 22 | –             |
|           | padding       | 16 / 1   | `$spacing-05` |
| Caret tip | height, width | 8 / .5   | –             |
|           | margin-top    | 4 / .25  | `$spacing-02` |

<div className="image--fixed">

![Structure and spacing measurements for a popover container.](images/popover-style-3.png)

</div>

  Structure and spacing measurements a popover container. | px / rem

<div className="image--fixed">

![Structure and spacing measurements between a popover container and trigger button.](images/popover-style-4.png)

</div>

  Structure and spacing measurements between a popover container and trigger
  button. | px / rem
