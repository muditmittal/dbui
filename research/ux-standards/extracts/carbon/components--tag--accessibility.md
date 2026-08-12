---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/tag/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
No accessibility annotations are needed for tags, but keep these considerations
in mind if you are modifying Carbon or creating a custom component.

  What Carbon provides
  Design recommendations
  Development considerations

## What Carbon provides

Carbon bakes keyboard operation into its components, improving the experience of
blind users and others who operate via the keyboard. Carbon incorporates many
other accessibility considerations, some of which are described below.

### Keyboard interaction

Read-only tags are not in the tab order, are not interactive, and do not receive
focus.

Dismissible tags are in the tab order and receive focus around the close icon.
Pressing `Enter` or `Space` will dismiss the tag. Tabbing away from the tag will
move focus to the next element in the tab order.

![Dismissible tag in the tab order receiving focus on the close icon to potentially dismiss the tag.](images/tag-accessibility-dismissible.png)

Selectable tags are in the tab order and focus is shown around each tag.
Pressing `Enter` or `Space` toggles the selection on and off.

![A group of selectable tags in the tab order, with each tag receiving focus to select or deselect.](images/tag-accessibility-selectable.png)

Operational tags are in the tab order and focus is shown around each tag.
Pressing `Enter` or `Space` will disclose additional related tags.

![An operational tag in the tab order, disclosing related tags.](images/tag-accessibility-operational.png)

## Design recommendations

Design annotations are not needed, but keep the following point in mind.

When the tag's title is too long to fit within the available space of the tag
container, the title can be truncated with an ellipsis. By mouse, the full title
is disclosed in a browser tooltip on hover. By keyboard, the full title is
disclosed on focus in a tooltip. Truncation should be set at the title's start,
middle, or end, depending on what is best for the given use case.

![A tag’s truncated full title disclosed in a tooltip on hover by mouse and on focus by keyboard.](images/tag-usage-overflow.png)

  Truncated tag title disclosed in a tooltip on hover by mouse and on focus by
  keyboard.

## Development considerations

Keep this in mind if you’re modifying Carbon or creating a custom component.

- Do not add an `onClick` functionality to the dismissible tag, and only reserve
  interactions for the close icon in the tag.
- Do not nest buttons within the operational tag. Consider using the `as` prop
  to change an element tag to avoid nesting buttons.
