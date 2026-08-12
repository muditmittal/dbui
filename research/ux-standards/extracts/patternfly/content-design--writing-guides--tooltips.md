---
source: patternfly
title: Red Hat PatternFly
url: https://www.patternfly.org/content-design/writing-guides/tooltips
license: MIT
bucket: A
sha: 7315296b4ecc182757b45b46f0474fafcff11366
retrieved: 2026-08-11
---
A **tooltip** is a message box that is shown when a UI element, like a button or an icon, is in a hover state. They contain short descriptions that offer additional information to help users better understand elements within a UI.

      I'm a button with a tooltip!

When writing tooltips, follow these general recommendations:

<div class="ws-content-table">

| **Don't** | **Do** |
|----------------------------------------|---------------------|
| Don't repeat information that is already available in the UI. | Do write content that is succinct, clear, and effective. |
| Don't use tooltips for critical information. | Do use tooltips for additional, non-essential information. |
| Don't end sentence fragments in a period. | Do end full sentences in a period. |
| Don’t place tooltips on question-mark icons (). Instead, use a [popover](/components/popover).  | Do follow [our tooltip development accessibility guidelines](/components/tooltip/accessibility) to ensure that tooltip content is available to all users.|

</div>

You can find additional guidance in [the tooltip design guidelines.](/components/tooltip/design-guidelines)

## Icon tooltips
Icons allow you to save space in a UI and provide users with another recognition method.

It's often important to place tooltips on icons, especially when they aren't accompanied by a text label. This helps ensure that your users can hover over an icon to understand the action that it is linked to. When you use a tooltip with an icon, limit the content to 1 or 2 words that identify the icon accurately and clearly.

For example:







In PatternFly, there are commonly used icons that hold universal meanings. These should always use the same tooltip description, as shown in the following table:

You can learn more about the usage of these icons in our [design foundations.](/foundations-and-styles/iconography)
