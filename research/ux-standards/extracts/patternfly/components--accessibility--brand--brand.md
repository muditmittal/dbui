---
source: patternfly
title: Red Hat PatternFly
url: https://www.patternfly.org/components/accessibility/brand
license: MIT
bucket: A
sha: 7315296b4ecc182757b45b46f0474fafcff11366
retrieved: 2026-08-11
---
## Accessibility

To implement an accessible PatternFly **brand** component:

- Do not make the brand itself interactive or focusable via keyboard
- Apply alternative text to the brand
- Ensure assistive technologies such as screen readers can navigate to the brand if there is alternative text applied

## Testing

At a minimum, a brand should meet the following criteria:





    The brand has alternative text via <code className="ws-code">alt</code>.</span>} description={<span>If the brand is only decorative, the <code className="ws-code">alt</code> should have an empty string passed in as a value.</span>} />





## React customization

The following React props have been provided for more fine-tuned control over accessibility.

| Prop | Applied to | Reason |
| -- | -- | -- |
| `alt="[the brand name or text describing the brand]"` | `Brand` | Provides an accessible description of the brand. **Required** <br/><br/> This prop will be used for all `source` elements and the fallback `img` when a `picture` brand is used. |

## HTML/CSS customization

The following HTML attributes and PatternFly classes can be used for more fine-tuned control over accessibility.

| Attribute or class | Applied to | Reason |
|---|---|---|
| `alt="[the brand name or text describing the brand]"` | `.pf-v6-c-brand > img` | Provides an accessible description of the brand. **Required** <br/><br/> This attribute will be used for all `source` elements and the fallback `img` when a `picture` brand is used. |

## Further reading

To read more about accessibility with a brand, refer to the following resources:

- [WCAG 1.1: Text Alternatives](https://www.w3.org/TR/WCAG22/#text-alternatives)
- [Alternative text](https://webaim.org/techniques/alttext/) by WebAIM
