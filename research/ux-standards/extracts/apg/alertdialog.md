---
source: apg
title: ARIA Authoring Practices Guide
url: https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/
license: W3C Software and Document License
bucket: A
sha: 7e4034b262bc0d25332e330d8a582aaf34113829
retrieved: 2026-08-11
---
# Alert and Message Dialogs Pattern

## About This Pattern

An alert dialog is a [modal dialog](../dialog-modal/dialog-modal-pattern.html) that interrupts the user's workflow to communicate an important message and acquire a response.
Examples include action confirmation prompts and error message confirmations.
The [alertdialog](#alertdialog) role enables assistive technologies and browsers to distinguish alert dialogs from other dialogs so they have the option of giving alert dialogs special treatment, such as playing a system alert sound.

## Example

[Alert Dialog Example](../alertdialog/examples/alertdialog.html): A confirmation prompt that demonstrates an alert dialog.

## Keyboard Interaction

See the keyboard interaction section for the [modal dialog pattern](../dialog-modal/dialog-modal-pattern.html).

## WAI-ARIA Roles, States, and Properties

- The element that contains all elements of the dialog, including the alert message and any dialog buttons, has role [alertdialog](#alertdialog).

- The dialog container element has [aria-modal](#aria-modal) set to `true`.

- The element with role `alertdialog` has either:

A value for [aria-labelledby](#aria-labelledby) that refers to the element containing the title of the dialog if the dialog has a visible label.

- A value for [aria-label](#aria-label) if the dialog does not have a visible label.

- The element with role `alertdialog` has a value set for [aria-describedby](#aria-describedby) that refers to the element containing the alert message.

### Note

- Because marking a dialog modal by setting [aria-modal](#aria-modal) to `true` can prevent users of some assistive technologies from perceiving content outside the dialog, users of those technologies will experience severe negative ramifications if a dialog is marked modal but does not behave as a modal for other users.
So, mark a dialog modal **only when both:**

Application code prevents all users from interacting in any way with content outside of it.

- Visual styling obscures the content outside of it.

- The `aria-modal` property introduced by ARIA 1.1 replaces [aria-hidden](#aria-hidden) for informing assistive technologies that content outside a dialog is inert.
However, in legacy dialog implementations where `aria-hidden` is used to make content outside a dialog inert for assistive technology users, it is important that:

`aria-hidden` is set to `true` on each element containing a portion of the inert layer.

- The dialog element is not a descendant of any element that has `aria-hidden` set to `true`.
