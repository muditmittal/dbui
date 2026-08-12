---
source: patternfly
title: Red Hat PatternFly
url: https://www.patternfly.org/components/accessibility/accordion
license: MIT
bucket: A
sha: 7315296b4ecc182757b45b46f0474fafcff11366
retrieved: 2026-08-11
---
## Accessibility

To implement an accessible PatternFly **accordion**:

- Give each accordion toggle a unique and descriptive label.

For the PatternFly React library:

- Include the `isExpanded` prop on the accordion toggle based on the toggle's state.

For the HTML/CSS library:

- Include the `aria-expanded` attribute on the accordion toggle based on the toggle's state.

## Testing

At a minimum, an accordion should meet the following criteria:





    <kbd>Tab</kbd> navigates to the next accordion toggle or focusable element, and <kbd>Shift</kbd> + <kbd>Tab</kbd> navigates to the previous accordion toggle or focusable element.</span>} />


    Accordion toggles can be collapsed or expanded via keyboard by pressing <kbd>Space</kbd> or <kbd>Enter</kbd>.</span>} />





    This can be checked with a screen reader, or by checking that the <code className="ws-code">aria-expanded</code> attribute is accurate and updating in the DOM.</span>} />


## React customization

The following React props have been provided for more fine-tuned control over accessibility.

| Prop | Applied to | Reason |
|---|---|---|
| `aria-label="[text that labels the accordion component]"` | `Accordion` | Adds an accessible name to the accordion for assistive technologies. If there is no other surrounding context provided for an accordion, especially if there are multiple accordions on a page, this should be passed in with descriptive text. |
| `headingLevel="[a heading tag]"` | `Accordion` | When `asDefinitionList={false}` is passed in, sets the container for the accordion toggle to one of the six heading elements (`h3` by default). Be sure to not skip heading levels when passing this prop in. For example, if an accordion is within a page section that has an `h2` heading, you should not pass `headingLevel="h4"`. |
| `aria-label="[text that labels the accordion content]"` | `AccordionContent` | Adds an accessible name to the content of an accordion item. |
| `isHidden` | `AccordionContent` | Determines whether the content of the accordion item is hidden or not. Should be used along with the `isExpanded` prop on the accordion toggle. |
| `isExpanded` | `AccordionToggle` | Adds styling to visually determine whether the toggle is expanded or collapsed. Also sets the accessibility attribute `aria-expanded` with a value of "true" or "false", which notifies screen readers whether the accordion toggle is expanded ("true") or collapsed ("false"). Should be used along with the `isHidden` prop on the accordion content. |

### isHidden and isExpanded

The `isHidden` and `isExpanded` props should always have opposite values of one another; if an accordion toggle is collapsed (`isExpanded={false}`), then the accordion content should be hidden (`isHidden={true}`). For example:

```noLive
const [expandedItem, setExpandedItem] = React.useState('accordion-item-1');



      Toggle text...


      Content text...



```

### Aria-label

Passing in the `aria-label` prop to the accordion component can be helpful when there are multiple accordions on a page, or when there is no other surrounding context:

```noLive

  ...

  ...

```

## HTML/CSS customization

The following HTML attributes and PatternFly classes can be used for more fine-tuned control over accessibility.

| Attribute or class | Applied to | Reason |
|---|---|---|
| `aria-label="[text that labels the accordion component]"` | `.pf-v6-c-accordion` | Adds an accessible name to the accordion for screen readers. If there is no other surrounding context provided for an accordion, especially if there are multiple accordions on a page, this should be passed in with descriptive text. <br/><br/> See the [aria-label prop example](#aria-label) in the React customization section. |
| `aria-expanded="[true or false]"` | `.pf-v6-c-accordion__toggle` | Indicates whether the accordion toggle is expanded (true) or collapsed (false) to assistive technologies. **Required**. |
| `aria-label="[text that labels the accordion content]"` | `.pf-v6-c-accordion__expanded-content` | Adds an accessible name to the content of an accordion item. |
| `hidden` | `.pf-v6-c-accordion__expanded-content` | Hides the accordion content. **Required** when `aria-expanded="false"` is passed in. |
| `aria-hidden="true"` | `.pf-v6-c-accordion__toggle-icon > i` | Removes the accordion toggle icon from the accessibility tree, preventing assistive technologies from potentially announcing duplicate or unnecessary information without visually hiding it. **Required**. |

## Additional considerations

Consumers must ensure they take any additional considerations when customizing an accordion, using it in a way not described or recommended by PatternFly, or in various other specific use-cases not outlined elsewhere on this page.

- Avoid adding complex interaction to the accordion. This can often cause loops or traps that prevent users from efficiently navigating the content when using a keyboard.

## Further reading

To read more about accessibility with accordions, refer to the following resources:

- [ARIA Authoring Practices Guide - Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
