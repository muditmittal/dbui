---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/radio-button/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
No accessibility annotations are needed for radio buttons, but keep these
considerations in mind if you are modifying Carbon or creating a custom
component.

What Carbon provides
Development considerations

## What Carbon provides

Carbon bakes keyboard operation into its components, improving the experience of
blind users and others who operate via the keyboard. Carbon incorporates many
other accessibility considerations, some of which are described below.

### Keyboard interaction

A group of radio buttons takes a single tab stop. Carbon does not require any
item to be selected by default, and the first item will always take focus in
case of no selection. The user changes the selected radio button using the arrow
keys (up/down or left/right). Pressing `Tab` again will move focus out of the
radio button group to the next component.

![example of tabbing into a radio button group and arrowing between selections](images/radio-button-accessibility-1.png)

  A radio button group is a single tab stop and radio buttons are selected using
  arrow keys.

### Labeling and states

Carbon surfaces the labeling of radio buttons and groups to screen readers and
other assistive technologies. Carbon also provides state and context
information, such as the number of items in the radio button group.

!["color group, Purple radio button checked, 2 of 3"](images/radio-button-accessibility-2.png)

  JAWS screen reader output, based on the information provided by Carbon.

## Development considerations

Keep this in mind if you’re modifying Carbon or creating a custom component.

- Carbon uses `fieldset` and `legend` to group and label sets of radio buttons.
- Carbon uses `label` and `for` to programmatically connect radio buttons with
  their labels.
- Required radio button groups must be identified programmatically, either via
  the label or with `aria-required`.
- See the
  [ARIA authoring practices](https://www.w3.org/WAI/ARIA/apg/patterns/radiobutton/)
  for more considerations.
