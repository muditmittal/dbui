---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/list/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
The following page documents visual specifications such as color, typography,
and structure.

Color
Typography
Structure
Feedback

## Color

Both the unordered and ordered list variants share the same color properties.

| Element | Property   | Color token     |
| ------- | ---------- | --------------- |
| Item    | text-color | `$text-primary` |

![Example of unordered and ordered list color](images/list-style-color.png)

Example of unordered and ordered list color

## Typography

List items should use sentence case, that is, only the first word and any proper
nouns are capitalized. In IBM product, use the 14px options below. For IBM.com,
use the larger expressive 16px options.

| Element                   | Font-size (px/rem) | Font-weight   | Type token |
| ------------------------- | ------------------ | ------------- | ---------- |
| Item                      | 14 / 0.875         | Regular / 400 | `$body-01` |
| Item: nested              | 14 / 0.875         | Regular / 400 | `$body-01` |
| Item (expressive)         | 16 / 1             | Regular / 400 | `$body-02` |
| Item: nested (expressive) | 16 / 1             | Regular / 400 | `$body-02` |

## Structure

There are two types of lists: **unordered** and **ordered**. In unordered lists,
level 1 markers are en dashes, while level 2 markers are squares. In ordered
lists, level 1 markers are numbers, and level 2 markers are letters. Both
variants follow the same structural properties.

| Element       | Property      | px / rem | Spacing token |
| ------------- | ------------- | -------- | ------------- |
| Item: Level 1 | margin-bottom | 0        | –             |
| Item: Level 2 | margin-bottom | 0        | –             |
|               | padding-left  | 16 / 1   | `$spacing-05` |

<div className="image--fixed">

![Structure and spacing measurements for ordered and unordered lists](images/list-style-structure.png)

</div>

  Structure and spacing measurements for an unordered and an ordered list | px /
  rem

## Feedback

Help us improve this component by providing feedback, asking questions, and
leaving any other comments on
[GitHub](https://github.com/carbon-design-system/carbon-website/issues/new?assignees=&labels=feedback&template=feedback.md).
