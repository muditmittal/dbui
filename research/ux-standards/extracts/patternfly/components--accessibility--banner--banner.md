---
source: patternfly
title: Red Hat PatternFly
url: https://www.patternfly.org/components/accessibility/banner
license: MIT
bucket: A
sha: 7315296b4ecc182757b45b46f0474fafcff11366
retrieved: 2026-08-11
---
## Accessibility

To implement an accessible PatternFly **banner**:

- Check the color contrast of a banner and any text on it to make sure they can be read by users with color blindness or other visual impairments.
- When a banner is used to convey status, add an icon that also conveys status visually, and provide screen reader text using `.pf-screen-reader` or an equivalent.

## Testing

At a minimum, a banner should meet the following criteria:








    If the banner conveys status, a status icon and <code className="ws-code">.pf-screen-reader</code> element is included.</span>} />


## React customization

The following React props have been provided for more fine-tuned control over accessibility.

| Prop | Applied to | Reason |
| -- | -- | -- |
| `screenReaderText="[visually hidden text that describes the banner status]"` | `Banner` | Adds text that is accessible only to assistive technologies and is not visually rendered. This prop should only be passed in when the banner is meant to convey status. |

## HTML/CSS customization

The following HTML attributes and PatternFly classes can be used for more fine-tuned control over accessibility.

| Attribute or class | Applied to | Reason |
|---|---|---|
| `.pf-screen-reader` | `span` | Provides an accessible description of the type of banner. **Required if banner conveys status** |
