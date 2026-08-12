---
source: patternfly
title: Red Hat PatternFly
url: https://www.patternfly.org/components/accessibility/breadcrumb
license: MIT
bucket: A
sha: 7315296b4ecc182757b45b46f0474fafcff11366
retrieved: 2026-08-11
---
## Accessibility

To implement an accessible PatternFly **breadcrumb** component:

- Give each item in the breadcrumb concise, descriptive text
- Ensure each breadcrumb item can be navigated to and interacted with via keyboard and other assistive technologies such as a screen reader
- Provide context to notify users if a breadcrumb item will open in a new tab or window
- Provide an `aria-label` to the breadcrumb if there are multiple `nav` elements or breadcrumb components on the page
- Follow the accessibility documentation for any other components used within a breadcrumb, such as a [dropdown](/components/menus/dropdown) used within a breadcrumb item

For the PatternFly React library:

- Pass in the `isActive` prop to the breadcrumb item whose page is currently active

For the HTML/CSS library:

- Pass in the `aria-current="page"` attribute to the breadcrumb item whose page is currently active

## Testing

At a minimum, a breadcrumb should meet the following criteria:





    <kbd>Tab</kbd> navigates to the next breadcrumb item or focusable element, and <kbd>Shift</kbd> + <kbd>Tab</kbd> navigates to the previous breadcrumb item or focusable element.</span>} />


    This can be best achieved by rendering an icon for visual context, and passing in visually-hidden text via the <code className="ws-code">pf-screen-reader</code> class.</span>} />


    The breadcrumb has an <code className="ws-code">aria-label</code> if there are other <code className="ws-code">nav</code> elements or breacrumbs on the page.</span>} description="This helps users of assistive technologies to differentiate between multiple navigational elements." />





    The breadcrumb item whose page is currently active has the <code className="ws-code">aria-current="page"</code> attribute.</span>} description="This notifies users of assistive technologies which breadcrumb item corresponds to the page they are currently on." />


## React customization

The following React props have been provided for more fine-tuned control over accessibility.

| Prop | Applied to | Reason |
|---|---|---|
| `aria-label="[text that labels the breadcrumb]"` | `Breadcrumb` | Adds an accessible name to the breadcrumb's internal `nav` element. |
| `isActive` | `BreadcrumbItem` | Sets the `aria-current` attribute on the breadcrumb item, which indicates the current page to users of assistive technologies. |

## HTML/CSS customization

The following HTML attributes and PatternFly classes can be used for more fine-tuned control over accessibility.

| Attribute or class | Applied to | Reason |
|---|---|---|
| `aria-label="[text that labels the breadcrumb]"` | `.pf-v6-c-breadcrumb` | Adds an accessible name to the breadcrumb's internal `nav` element. |
| `aria-current="page"` | `.pf-v6-c-breadcrumb__item`, `.pf-v6-c-breadcrumb__link` | Indicates the current page to users of assistive technologies. |
