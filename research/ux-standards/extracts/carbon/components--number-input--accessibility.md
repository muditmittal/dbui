---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/number-input/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
Design annotations are needed for specific instances shown below, but for the
standard number input component, Carbon already incorporates accessibility.

What Carbon provides
Design recommendations
Development considerations

## What Carbon provides

Carbon bakes keyboard operation into its components, improving the experience of
blind users and others who operate via the keyboard. Carbon incorporates many
other accessibility considerations, some of which are described below.

### Keyboard interaction

The Carbon number input replicates the behavior of the stock HTML component. The
number input takes a single tab stop. The + and - buttons, operable by pointer,
are not in the tab order. When the input has focus, the arrow keys give keyboard
users the same ability to incrementally adjust the values. As well, users can
directly type numeric values in the input. Only numerals are allowed to be
entered.

![example of number input keyboard interaction](images/number-input-accessibility-1.png)

  The number input is reachable by Tab and changed with the arrow keys or by
  directly entering a number.

### Error handling

Carbon provides errors and warning messages to assistive technology. This is an
improvement on the stock HTML number input, which simply prevents the typing of
alphabetic characters without explanation. Carbon also adds an error or warning
icon and puts error messages in red as a further visual cue.

![The letter e is in the input, a red exclamation mark appears beside it, the border of the input is in red and a red text message appears underneath 'Number is not valid'](images/number-input-accessibility-2.png)

  Messages are surfaced to assistive technologies, and color alone is not used
  to visually signal errors.

## Design recommendations

Design annotations are needed for the following instance.

### Cue users for value and step

Carbon offers the ability for the author to set minimum and maximum values for
the input. When setting limits on number entry, designers should warn the user
in advance, instead of users discovering limits through an error message. This
is particularly the case if designers alter the step value, which determines the
increment change when activating the +/- buttons or arrow keys. If a user
directly enters a value that does not match the step increment, it will be
disallowed for no apparent reason, so advanced warnings are crucial.

![a numeric input with helper text to enter values between 30 and 70, in increments of 5](images/number-input-accessibility-3.png)

Notify users of allowable input ranges through helper text.

## Development considerations

Keep this in mind if you’re modifying Carbon or creating a custom component.

- Carbon uses `aria-describedby` to associate the helper text and error messages
  with the input.
- The red error SVG icons have `aria-hidden="true"` set, since the helper text
  provides the same information.
