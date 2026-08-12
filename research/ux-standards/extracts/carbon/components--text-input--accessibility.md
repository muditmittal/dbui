---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/text-input/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
No accessibility annotations are needed for text inputs, but keep these
considerations in mind if you are modifying Carbon or creating a custom
component.

What Carbon provides
Development considerations

## What Carbon provides

Carbon bakes keyboard operation into its components, improving the experience of
blind users and others who operate via the keyboard. Carbon incorporates many
other accessibility considerations, some of which are described below.

### Keyboard navigation

Carbon’s text inputs and text areas replicate the default HTML component
operation. Each input field is a tab stop, as are any preceding information
icons (which open with `Enter`/`Space` and close with `Esc`). For password
inputs, Carbon provides a keyboard-operable ability to toggle the password
value’s visibility using `Enter` or `Space`.

![example of text input keyboard navigation](images/text-input-accessibility-1.png)

Each input is a tab stop, as are any information icons.

### Keyboard interaction

On focus, users can type directly into the input field. Any existing text in the
input is highlighted on focus and will be replaced when the user begins typing.
(Existing text in a text area is not highlighted on focus; instead the cursor is
placed at the start or the user’s prior point of interaction.) Users can
interact inside text inputs and text areas using standard arrow keys and
modifiers (`Ctrl` for Windows, `Option` for Mac).

![example of keyboard operation in text area](images/text-input-accessibility-2.png)

  Users can move around in text inputs and text areas using arrows keys and
  modifiers.

### Labeling and helper text

Carbon programmatically surfaces both the input's label and any helper text to
assistive technologies such as screen readers. Any error messages for text
inputs are also accessibly revealed.

![Date of release label and date input helper text are shown as being accessibly provided](images/text-input-accessibility-3.png)

Labels and helper text are accessibly provided.

## Development considerations

Keep these considerations in mind if you are modifying Carbon or creating a
custom component.

- Labels are properly associated with inputs using the `for` attribute.
- Helper text is surfaced to assistive technology through `aria-describedby`.
