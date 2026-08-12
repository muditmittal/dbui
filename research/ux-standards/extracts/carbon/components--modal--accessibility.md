---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/modal/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
Design annotations are needed for specific instances shown below, but for the
standard modal dialog component, Carbon already incorporates accessibility.

  What Carbon provides
  Design recommendations
  Development considerations

## What Carbon provides

Carbon bakes keyboard operation into its components, improving the experience of
blind users and others who operate via the keyboard. Carbon incorporates many
other accessibility considerations, some of which are described below.

### Keyboard interactions

Modal dialogs take focus on appearance, and the tab order is constrained to the
modal’s controls until the modal is closed by choosing one of the buttons with
`Enter` or `Space`, or is dismissed by pressing `Esc`.

![illustration showing tab ring constrained within a modal with two buttons](images/modal-accessibility-1.png)

  Keyboard navigation is constrained to the dialog. Tab cycles through the
  components that take focus.

![Esc closes a modal, while Space and Enter keys activate buttons](images/modal-accessibility-2.png)

  The dialog is resolved by the user pressing Esc or activating a button.

### Focus handling

When the dialog appears, the first item that gets focus depends on the type of
dialog. Passive dialogs only contain a close button (X), so that takes focus.
For dialogs which prompt for confirmation or user decision, the primary button
takes focus (regardless of number of buttons). For destructive interactions, the
“cancel” button takes focus, not the red danger/delete button. The tab order
should proceed left and down from whichever item has focus then wrap back to the
close button (X).

![initial focus in the dialog varies across four types of modals](images/modal-accessibility-3.png)

The first item with focus varies depending on dialog type.

## Design recommendations

### Designate the input that takes focus in a transactional

The only time the starting focus would not be on a button is where a dialog
contains input fields. For such transactional dialogs, designers should annotate
that the first input field should receive focus. Note that text links are not
considered a user input in this context.



![annotation on input says 'focus lands here when modal opens'](images/modal-accessibility-4-do.png)





![annotation on link says 'focus lands here when modal opens'](images/modal-accessibility-4-dont.png)



## Development considerations

Keep these considerations in mind if you are modifying Carbon or creating a
custom component.

- Carbon assigns the container a role of "dialog" and sets `aria-modal` to
  `"true"`.
- The dialog is labelled via `aria-label`, using the same string used for the
  modal’s title; `aria-labelledby` could also be used to assign the title’s
  string.
- See the modal pattern in the
  [ARIA authoring practices](https://w3c.github.io/aria-practices/#dialog_modal)
  for more considerations.
