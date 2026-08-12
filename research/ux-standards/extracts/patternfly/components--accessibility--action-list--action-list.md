---
source: patternfly
title: Red Hat PatternFly
url: https://www.patternfly.org/components/accessibility/action-list
license: MIT
bucket: A
sha: 7315296b4ecc182757b45b46f0474fafcff11366
retrieved: 2026-08-11
---
## Accessibility

To implement an accessible PatternFly **action list**:

- Ensure each action in the action list can be navigated to via keyboard.
- Provide an `aria-label` for an action if it does not have its own visible text content.
- If passing in another PatternFly component as an action, ensure that component follows its own accessibility documentation.

## Testing

At a minimum, an action list should meet the following criteria:


    <kbd>Tab</kbd> navigates to the next action or focusable element, and <kbd>Shift</kbd> + <kbd>Tab</kbd> navigates to the previous action or focusable element.</span>} />


    If an action does not have its own visible text content, an <code className="ws-code">aria-label</code> is applied to it.</span>} description="An example for when you must do this is if an action list item contains only an icon." />


## React customization

An action list does not have any further React props for accessibility.

## HTML/CSS customization

An action list does not have any further HTML/CSS attributes or classes for accessibility.
