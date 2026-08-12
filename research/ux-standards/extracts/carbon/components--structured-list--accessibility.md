---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/structured-list/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
No accessibility annotations are needed for structured lists, but keep these
considerations in mind if you are modifying Carbon or creating a custom
component.

  Accessibility considerations
  Resources
  Accessibility testing

## Accessibility considerations

1. The structured list headers accurately describe the data contained in the
   rows and columns.
2. If the structured list has a labels it should be clear and concise.
3. If the structured list has a caption or description, `aria-describedby`
   should be set on the table element with a value referring to the element
   containing the description.

## Resources

- [W3C WAI-ARIA Authoring Practices Table Design Pattern](https://www.w3.org/TR/wai-aria-practices-1.1/#table)
  covers the usage of ARIA names, state and roles, as well as the expected
  keyboard interactions.
- [W3C Tutorial - Table Concepts](https://www.w3.org/WAI/tutorials/tables/)
  covers the usage of various tables, headers, and captions.
- [IBM Accessibility Requirements](https://www.ibm.com/able/requirements/requirements/):
  - [1.3.1 Info and Relationships](https://www.ibm.com/able/requirements/requirements/#1_3_1)
    (WCAG Success Criteria
    [1.3.1](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships))
  - [1.3.2 Meaningful Sequence](https://www.ibm.com/able/requirements/requirements/#1_3_2)
    (WCAG Success Criteria
    [1.3.2](https://www.w3.org/WAI/WCAG21/Understanding/meaningful-sequence))
  - [2.1.1 Keyboard](https://www.ibm.com/able/requirements/requirements/#2_1_1)
    (WCAG Success Criteria
    [2.1.1](https://www.w3.org/WAI/WCAG21/Understanding/keyboard))
  - [2.4.3 Focus Order](https://www.ibm.com/able/requirements/requirements/#2_4_3)
    (WCAG Success Criteria
    [2.4.3](https://www.w3.org/WAI/WCAG21/Understanding/focus-order))
  - [2.4.6 Headings and Labels](https://www.ibm.com/able/requirements/requirements/#2_4_6)
    (WCAG Success Criteria
    [2.4.6](https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels))
  - [2.4.7 Focus Visible](https://www.ibm.com/able/requirements/requirements/#2_4_7)
    (WCAG Success Criteria
    [2.4.7](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible))
  - [4.1.2 Name, Role, Value](https://www.ibm.com/able/requirements/requirements/#4_1_2)
    (WCAG Success Criteria
    [4.1.2](https://www.w3.org/TR/UNDERSTANDING-WCAG20/ensure-compat-rsv.html))

## Accessibility testing
