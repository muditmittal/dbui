---
source: patternfly
title: Red Hat PatternFly
url: https://www.patternfly.org/components/accessibility/sidebar
license: MIT
bucket: A
sha: 7315296b4ecc182757b45b46f0474fafcff11366
retrieved: 2026-08-11
---
## Accessibility

To implement an accessible PatternFly **sidebar**:

- Ensure the sidebar panel follows our documentation on [accessible scrollable elements](/accessibility/develop#scrollable-elements) if its content creates a scrollable container

## Testing

At a minimum, a sidebar should meet the following criteria:


    <kbd>Tab</kbd> navigates to the next focusable element, and <kbd>Shift</kbd> + <kbd>Tab</kbd> navigates to the previous focusable element.</span>} />


    If the sidebar panel content creates a scrollbale container, it follows our documentation on accessible scrollable elements.</span>} />


## React customization

The following React props have been provided for more fine-tuned control over accessibility.

| Prop | Applied to | Reason |
|---|---|---|
| `aria-label="[text that labels the sidebar]"` or `aria-labelledby="[id of the element that labels the sidebar]"` | `SidebarPanel` | Adds an accessible name to the sidebar for assistive technologies. **Required** when `role="region"` is also passed in. |
| `role="region"` | `SidebarPanel` | Sets the sidebar role to a region, exposing it to assistive technologies. This should be passed in if the sidebar content causes a scrollable container and `tabIndex="0"` is also passed in. |
| `tabIndex="0"` | `SidebarPanel` | Makes the sidebar container focusable via keyboard and other assistive technologies. **Required** when the sidebar content causes a scrollable container. |

## HTML/CSS customization

The following HTML attributes and PatternFly classes can be used for more fine-tuned control over accessibility.

| Attribute or class | Applied to | Reason |
|---|---|---|
| `aria-label="[text that labels the sidebar]"` or `aria-labelledby="[id of the element that labels the sidebar]"` | `.pf-v6-c-sidebar__panel` | Adds an accessible name to the sidebar for assistive technologies. **Required** when `role="region"` is also passed in. |
| `role="region"` | `.pf-v6-c-sidebar__panel` | Sets the sidebar role to a region, exposing it to assistive technologies. This should be passed in if the sidebar content causes a scrollable container and `tabIndex="0"` is also passed in. |
| `tabindex="0"` | `.pf-v6-c-sidebar__panel` | Makes the sidebar container focusable via keyboard and other assistive technologies. **Required** when the sidebar content causes a scrollable container. |
