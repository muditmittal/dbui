---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Pointer Cancellation

## In brief

**Goal** — Reduce accidental activation of controls by mouse or touch.

**What to do** — Make pointer cancellation predictable and consistent.

**Why it's important** — Make it easier for anyone to recover from something they didn’t mean to do.

## Intent

The intent of this success criterion is to make it easier for users to prevent accidental or erroneous pointer input. People with various disabilities can inadvertently initiate touch or mouse events with unwanted results. Each of the following subsections roughly aligns with the bullets of this Success Criterion, and outlines a means of allowing users to cancel pointer operations.

### Up-Event activation or completion

The most accessible way to incorporate pointer cancellation is to make activation occur on the up-event.

Up-event activation refers to the activation of a target when the pointer is released. In a touchscreen interaction, when the finger touches a target, the up-event activation only occurs when the finger is lifted while still being within the target boundary. Similarly in mouse interaction, the up-event occurs when the mouse button is released while the cursor is still within the boundary of the initial target set when the mouse button was pressed.

Authors can reduce the problem of users inadvertently triggering an action by using generic platform activation/click events that activate functionality on the up-event. For example, the `click` event in JavaScript triggers on release of the primary mouse button, and is an example of an implicit up-event. Despite its name, the `click` event is device-independent and also works for touch and keyboard interaction.

The preference for up-events is implicit in the success criterion wording of the first bullet: The down-event of the pointer is not used to execute any part of the function. Authors meet the first bullet by using only the up-event.

### Up-Event Abort or Undo

Where the interaction is equivalent to a simple "click", up-event activation has a built-in ability to cancel. There is a distinction between when someone touches a screen and when they remove their finger. Similarly, in mouse interaction, there is a difference between pressing and releasing the mouse button. When activation occurs only as the pointer is released, users have the opportunity to Abort (cancel) the activation. Users who have difficulty accurately using a mouse or touchscreen benefit greatly from this basic behavior. They normally receive visual feedback when an item is pressed. If they discover they have selected the wrong item, they can cancel the action by moving their pointer or finger away from the target before releasing.

For more complex interactions, such as drag and drop, the down- and up-events may initiate and end a series of actions to complete a process. For example, with drag and drop, the item may be:

- selected with a press (down-event),

- moved to a new location, while still being depressed, and

- released (up-event) to conclude the drop action.

In such a complex action, the need for an Abort or Undo function increases. Designers may elect to confirm the move through something like a confirmation dialog or an undo button, giving the user the ability to Undo the process just completed. Alternatively, the ability to Abort the action can be achieved if, before completing step 3, the user returns the selected item to its original location and concludes the process there. If other parts of the screen disallow a move, the user can conclude the drag and drop there, effectively nullifying the operation.

### Up Reversal

In other interactions, the down-event may trigger a behavior which can be reversed when the up-event concludes. Examples of this include press-and-hold actions such as where a transient popup appears (or a video plays) when the user presses on an object (down-event), but the popup (or video) disappears as soon as the user releases the pointer (up-event). Since the up-event reverses the preceding down event, the user is returned to their prior point, and has effectively cancelled the operation.

### Down-Event

Completing the function on the down-event is only permitted when it is essential that the up-event not be used.

The most prevalent essential down-event activation occurs in keyboard emulation. On a physical keyboard, keys by default activate on the down-event -- a letter appears when the key is pressed. If a software keyboard emulator tried to override this expected behavior by making letters appear when the key is released, the behavior would be unexpected and would adversely affect expected interaction.

Note that a keyboard has a built-in Backspace or Delete button, which effectively provides an Undo option. Undo is not a requirement of the down-event Essential exception; however, providing an easy way for users to undo any action is a recommended practice (and may be a functional necessity), even where it is not a requirement of this success criterion.

Other examples where the timing of an activation is essential and requires the down-event would be:

- An activity that emulates a physical on-press trigger, such as when playing an on-screen piano keyboard. Activation on the up-event would significantly alter the desired behavior.

- A program for shooting skeets where waiting for the "up" event would invalidate the precise timing necessary for the activation.

## Benefits

- Makes it easier for all users to recover from hitting the wrong target.

- Helps people with visual disabilities, cognitive limitations, and motor impairments by reducing the chance that a control will be accidentally activated or an action will occur unexpectedly, and also ensures that where complex controls are activated, a means of Undoing or Aborting the action is available.

- Individuals who are unable to detect changes of context are less likely to become disoriented while navigating a site.

## Examples

- For interface elements that have a single tap or long press as input, the corresponding event is triggered when the finger is lifted inside that element.

- A drag-and-drop interface allows users to sort vertically stacked cards by picking up one card with the pointer (down-event), move it to a new position, and insert it at the new location when the pointer is released (up-event). Releasing the pointer outside the drop target area reverts the action, i.e., it moves the card back to the old position before the interaction started.

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
