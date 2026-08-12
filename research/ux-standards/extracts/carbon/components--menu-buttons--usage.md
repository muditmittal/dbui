---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/menu-buttons/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
Feature flag

Menu buttons, including menu buttons, combo buttons, and overflow menus, open a
menu with a list of interactive options.

Live demo
Overview
Formatting
Content
Universal behaviors
Menu button
Combo button
Overflow menu
Related
References
Feedback

## Live demo

## Overview

There are three variants of menu buttons (or menu triggers): menu button, combo
button, and overflow menu button. Menu buttons are comprised of a button and a
[menu](/components/menu/usage/), which can be clicked to trigger an action or
selected to initiate an action from a menu.

![Overview image of menu buttons](images/usage-menu-button-overview.png)

### When to use

#### Hiding extra actions in limited screen space

Menu button, combo button, and overflow menu are useful when you need to show
numerous options but have limited screen space available to display them. By
hiding less frequently used or advanced options until the user needs them, it
avoids cluttering the main interface with too many options.

### Variants

| Variant                         | Purpose                                                                                                                                           |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Menu button](#menu-button)     | Use a menu button when all actions in the menu list share the same level of importance. They are usually used in the page header.                 |
| [Combo button](#combo-button)   | Use a combo button when screen real estate is limited and one of the actions has particular importance. They are usually used in the page header. |
| [Overflow menu](#overflow-menu) | Use an overflow menu when additional options are available to the user and there is a space constraint. They are usually used in rows or cards.   |

### Feature flags

A [feature flag](/components/overview/feature-flags/) has been added to the
overflow menu variant of menu buttons to improve accessibility and changes parts
of its functionality, not its visual appearance. For code-specific feature flag
information, refer to the [Code](/components/menu-buttons/code/) tab. The
current overflow menu is not being deprecated, but teams are encouraged to use
the feature flag overflow menu for their products moving forward. Once the next
major release (v12) is released in the future, this feature flag will become the
default version of the component.

## Formatting

### Anatomy

![Menu button anatomy diagram](images/usage-menu-button-anatomy.png)

#### 1. Menu button

A. Primary button <br /> B. Menu <br />

#### 2. Combo button

A. Primary button <br /> B. Menu <br /> C. Icon button <br />

#### 3. Overflow menu

A. Icon button <br /> B. Menu <br />

### Sizing

#### Height

Menu buttons come in four sizes: **extra small**, **small**, **medium**, and
**large**. When using menu buttons, the height of each item in the menu reflects
the same size of the trigger button being used. See more about size
specifications on the [Style](/components/menu-buttons/style/) tab.

| Size        | Height (px / rem) |
| ----------- | ----------------- |
| Extra small | 24 / 1.5          |
| Small       | 32 / 2            |
| Medium      | 40 / 2.5          |
| Large       | 48 / 3            |

![Combo button height](images/usage-combo-button-height.png)



![Do match the height of the menu buttons and the menu](images/usage-sizing-height-do.png)




![Do not mix the height of the menu buttons and the menu](images/usage-sizing-height-dont.png)



#### Width

By default, the [menu button](/components/menu-buttons/usage/#menu-button) and
[combo button](/components/menu-buttons/usage/#combo-button) follow the
[button structure style](https://carbondesignsystem.com/components/button/style#structure),
and the menu maintains a minimum width of 160px to prevent a narrow appearance.

![Menu width](images/usage-menu-buttons-width.png)

  Menu default width when both button label and menu option labels are short

If the menu item labels become longer, the menu button and combo button remain
the same size while the menu component can expand up to a maximum of 288px.
Conversely, if the button labels become longer, the menu component should not
appear narrower but should extend to match the width of the menu buttons.

If you opt for
[fluid-width default buttons](https://carbondesignsystem.com/components/button/usage/#alignment),
both the menu button (or the combo button) and the menu should have the same
width.



![Do use the minimum width of menu](images/usage-menu-width-do-1.png)




![Do not narrow the menu to fit with other elements](images/usage-menu-width-dont-1.png)





![Do match the width when the menu button or combo button labels become longer](images/usage-menu-width-do-2.png)




![Do not make the menu appear shorter than the menu button or combo button](images/usage-menu-width-dont-2.png)



Ghost buttons only adhere to the
[button](https://carbondesignsystem.com/components/button/style/) style. This is
because enlarging the ghost button's width to match the menu's width would
result in the caret appearing disconnected from its associated button,
especially when the menu button is in its closed state.



![Do use default ghost button in all cases](images/usage-menu-ghost-button-width-do.png)




![Do not use fluid ghost button in any cases](images/usage-menu-ghost-button-width-dont.png)



### Alignment

#### Default

By default, combo button, menu button, or overflow button remains positioned at
the top, to the left or right side of the menu when it is open, depending on the
available space and layout.

![Menu default alignments](images/usage-menu-alignment-menu-button-default.png)

#### Alternatives

Alternatively, open menus can be positioned at the bottom, to the left or right
of its associated menu button trigger, depending on the available space and
layout.

![Menu alternative alignments](images/usage-menu-alignment-menu-button-alternatives.png)

### Placement

#### Menu and combo buttons

These buttons are ideal for page headers, where multiple, distinct actions may
impact the page content, and where real-estate is limited. In the page header
component, multiple buttons will become a single action button at smaller screen
sizes. These buttons should only be used when the actions affect a full page or
a large object on a page (examples include a canvas UI, diagram, or whole data
table).

![Menu button alignment example](images/usage-menu-placement-1.png)

#### Overflow menu

When actions affect a smaller proportion of a page, such as table rows or cards,
use an overflow menu.

![Overflow menu alignment example](images/usage-menu-placement-2.png)

## Content

### Main elements

#### Label

The text label of the button is important to communicate the action that is
triggered when the user interacts with it. The text label must accurately
describe the button action or indicate that interacting with it displays a list
of possible actions.

### Further guidance

For further content guidance, see Carbon's
[content guidelines](/guidelines/content/overview).

## Universal behaviors

### States

The default and interactive states of menu buttons should follow the button
[style](https://carbondesignsystem.com/components/button/style) guidelines.

- Combo buttons are available only as primary buttons.
- Menu buttons come in three different button types: primary, tertiary, and
  ghost.
- The icon button of overflow menu is treated as the ghost button, displaying
  only an icon and following its designated color and style.

### Interactions

#### Menu button

Users can reveal the menu by:

- Clicking anywhere on the container of a menu button
- Or tabbing into the menu button and pressing `Return` or `Enter`

![Menu button interactions](images/usage-menu-keyboard-menu-button.png)

Mouse and keyboard interactions for menu button

#### Combo button

Users can reveal the menu by:

- Clicking anywhere on the container of the primary button or the icon button.
  If clicking on the primary button, this will apply to certain elements,
  depending on user interaction.
- Or tabbing into the combo button which will focus on the primary button first
  then the icon button. Then, pressing the `Return` or `Enter` to trigger the
  action of the primary button or menu under the icon button.

![Combo button mouse interaction](images/usage-menu-mouse-combo-button.png)

Mouse interactions for combo button

![Combo button keyboard interaction](images/usage-menu-keyboard-combo-button.png)

Keyboard interactions for combo button

#### Overflow menu

Users can reveal the overflow menu by:

- Clicking anywhere on the container of the icon button
- Or tabbing into the icon button and pressing `Return` or `Enter`

![Overflow menu mouse and keyboard interactions](images/usage-menu-mouse-keyboard-overflow-menu.png)

Keyboard interactions for overflow menu

## Menu button

Menu buttons group actions that share the same level of importance. The icon
used within the menu button should always be a caret in order to visually convey
to the user that there are options to select from. There are three main use
cases where using a menu button is recommended:

- Grouping objects with the same common action
- Actions related to a common label
- Distinct actions applied to the same object or page

Menu button comes in three different button types: primary, tertiary, and ghost.
For detailed visuals, visit the
[Style](/components/menu-buttons/style/#menu-button-color) tab.

![An example of menu button](images/usage-menu-button-1.png)

### Best practices

#### Grouping objects with the same common action

Menu buttons are effective when a single action affects multiple distinct
objects. This is particularly applicable when users need to Create or Add
various objects, and all these objects are equally relevant options.

The shared action should not be repeated in the menu list. This adds unnecessary
clutter and makes each option less distinct at a glance.



![Do add distinct items for the action](images/usage-menu-button-2.png)

![Do not repeat the action in the action item](images/usage-menu-button-3.png)



#### Actions associated with a shared label

Another common use of a menu button is grouping actions related to a common
label. An example of this is when users have multiple approaches to execute an
action, all of which are presented as choices within the menu button.

![Actions associated with a shared label](images/usage-menu-button-4.png)

#### Distinct actions applied to the same object or page

In many cases, actions on a page may not use the same verb or have a shared
label for the menu button. When grouped actions remain distinct, consider
labeling the menu button as 'Actions' to encompass all available choices.

![Distinct actions applied to the same object or page](images/usage-menu-button-5.png)

Example shows the menu button with possible actions that could influence the data within tab contents

## Combo button

A combo button is composed of two buttons: the left is the default option (the
most commonly used selection), and the right (chevron icon) shows the rest of
the available options. A combo button provides quick access to a default action
while also offering a list of related actions or options.

The combo button is expected to have less use than the menu button, as the
additional actions are more hidden than they would be in menu button. However,
this button does have particular use where screen real estate is limited and one
of the actions has particular importance.

Combo button has only one button type: primary.

![An example of combo button](images/usage-menu-combo-button-1.png)

### Best practices

#### Choose a default action

Remember to choose the default, primary action that will be displayed in the
primary button so it is not hidden within the menu of additional actions. The
primary default action is typically the most commonly used action there is to
take.

![Choose a default action](images/usage-menu-combo-button-2.png)

  Example shows that users mostly choose to save records, while less common
  options are hidden as extra actions.

#### Reduce visual complexity on a page

Combo buttons reduce visual complexity by grouping similar commands together.
For example, how navigation menus group together related options to enable
conceptual understanding of the site information structure.

![Reduce visual complexity on a page](images/usage-menu-combo-button-3.png)

  Example shows that many actions (ghost buttons) applying to the same data can
  be replaced by the combo button.

## Overflow menu

Overflow menu is also another option that is available to the user when there is
a space constraint, usually used in data table rows or in cards. Overflow menu
has the ghost button style only.

![An example of overflow menu](images/usage-overflow-1.png)

### Best practices

#### Overflow menu in cards

When there are more than three interactive icons, consider moving less important
ones into the overflow menu. The overflow menu then takes the place of a third
action.

![An example of overflow menu in cards](images/usage-overflow-2.png)

#### Overflow menu icon

The overflow icon can be customized to align with the product's requirements.
However, it's advisable to make minimal changes to the overflow menu's icon to
maintain consistency across the product and ensure a consistent user experience.

![An example of another overflow menu icon](images/usage-overflow-3.png)

#### Overflow versus tab tip (popover)

Overflow menu displays extra options with simple text, typically utilized within
data table rows or cards. The
[tab tip](https://carbondesignsystem.com/components/popover/usage/#tab-tip)
popover allows the user to include more complex inputs such as a checkbox group
or a radio button group, usually connected to a data table toolbar.

![An example of overflow menu](images/usage-overflow-menu.png)

Use overflow menus in data table row

![An example of a popover](images/usage-popover.png)

Use a popover in the data table toolbar

## Related

#### Menu

To learn more about how to use the menu component, see
[menu buttons](/components/menu/usage/).

#### Dropdown

To understand how the menu component can be used differently from the dropdown
component, see [dropdown](/components/dropdown/usage).

#### Popover

The popover component is visually similar to menu, but is used for different
purposes. See [popover](/components/dropdown/usage) for more information.

## References

- Anna Kaley,
  [Contextual Menus: Delivering Relevant Tools for Tasks](https://www.nngroup.com/articles/contextual-menus/),
  (Nielsen Norman Group, 2019)
- Page Laubheimer,
  [Split Buttons: Definition](https://www.nngroup.com/articles/split-buttons/),
  (Nielsen Norman Group, 2019)

## Feedback

Help us improve this component by providing feedback, asking questions, and
leaving any other comments on
[GitHub](https://github.com/carbon-design-system/carbon-website/issues/new?assignees=&labels=feedback&template=feedback.md).
