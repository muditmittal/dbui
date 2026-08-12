---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/progress-bar/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
## Color

| Element            | Property   | Color token           |
| ------------------ | ---------- | --------------------- |
| Label              | text-color | `$text-primary`       |
| Helper text        | text-color | `$text-helper`        |
| Helper text: error | text-color | `$text-error`         |
| Track              | background | `$border-subtle`      |
| Bar: active        | background | `$border-interactive` |
| Bar: success       | background | `$support-success`    |
| Icon: success      | fill       | `$support-success`    |
| Bar: error         | background | `$support-error`      |
| Icon: error        | fill       | `$support-error`      |

![Progress bar statuses](images/progress-bar-style-1.png)

Progress bar statuses

## Typography

| Element     | Font-size (px/rem) | Font-weight   | Type token         |
| ----------- | ------------------ | ------------- | ------------------ |
| Label       | 14px / 0.875rem    | Regular / 400 | `$body-compact-01` |
| Helper text | 12px / 0.75rem     | Regular / 400 | `$helper-text-01`  |

## Structure

Depending on the use case, the progress bar can use three text alignment
options: default, inline, or indented. The width of a progress bar can be
customized appropriately for its context. The minimum width of a progress bar is
48px. Keep its width to a maximum of six columns when possible.

| Element              | Property       | px / rem | Spacing token |
| -------------------- | -------------- | -------- | ------------- |
| Label (top aligned)  | padding-bottom | 8 / 0.5  | `$spacing-03` |
| Helper text          | padding-top    | 8 / 0.5  | `$spacing-03` |
| Label (left aligned) | padding-right  | 16 / 1   | `$spacing-05` |

<div className="image--fixed">

![Structure and spacing measurements for the progress bar.](images/progress-bar-style-4.png)

</div>

  Structure and spacing measurements the progress bar | px / rem

<div className="image--fixed">

![Structure and spacing measurements for the progress bar with an icon.](images/progress-bar-style-5.png)

</div>

  Structure and spacing measurements the progress bar with an icon | px / rem

## Sizes

There are two sizes for the progress bar height: big and small.

| Size  | Height px / rem |
| ----- | --------------- |
| Big   | 8 / 0.5         |
| Small | 4 / 0.25        |

<div className="image--fixed">

![Progress bar sizes](images/progress-bar-style-6.png)

</div>
