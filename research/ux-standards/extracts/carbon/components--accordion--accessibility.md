---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/accordion/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
Design annotations are needed for specific instances shown below, but for the
standard accordion component, Carbon already incorporates accessibility.

  What Carbon provides
  Design recommendations
  Development considerations

## What Carbon provides

Carbon bakes keyboard operation into its components, improving the experience of
blind users and others who operate via the keyboard. Carbon incorporates many
other accessibility considerations, some of which are described below.

### Keyboard interactions

Each accordion is a tab stop. `Space` or `Enter` keys expand or collapse
accordions, which are collapsed by default. Interactive elements within expanded
accordions integrate into the tab order automatically.

![example of accordion keyboard interaction](images/accordion-accessibility-1.png)

  Accordions and interactive elements in the expanded content are in the tab
  order and keyboard operable.

### Labeling and states

The collapsed or expanded state of the accordions is
[programmatically set](https://www.ibm.com/able/requirements/requirements/#4_1_2)
by default, eliminating the need for designers to provide
[text equivalents](https://www.ibm.com/able/toolkit/design/content/#alternative-text-for-visuals)
for the chevron icons.

![expanded and collapsed accordions](images/accordion-accessibility-2.png)

Carbon handles the accessibility of the chevron indicators.

## Design recommendations

Design annotations are needed for the following instances.

### Headings

Carbon accordions are not set as headings by default. For improved
accessibility, annotate accordions as headings on the first occurrence in a
product. Annotate the heading level of accordions as needed. See
[Indicate heading levels](https://www.ibm.com/able/toolkit/design/content/#headings).

![H1 and H2 annotations for headings, plus direction to ‘include accordion titles as headings'](images/accordion-accessibility-3.png)

  If accordion titles act as headings, annotate for development.

### Alignment

Carbon chevrons are right-aligned by default, but left-aligned chevrons are more
accessible for users with low vision, as the expanded/collapsed indicator is
closer to the accordion title.

![annotation stating ‘position chevrons on the left of accordion titles'](images/accordion-accessibility-4.png)

Annotate if the accordion chevrons should be left-aligned.

## Development considerations

Keep these considerations in mind if you are modifying Carbon or creating a
custom component:

- The accordion header has a role of `<button>`, with an `aria-expanded`
  attribute set to `"true"` or `"false"`.
- The button has an `aria-controls` property set to the unique id of the panel
  it controls.
- Since accordions are typically grouped together, Carbon puts each button
  inside a list item in an unordered list, which provides additional context to
  screen reader users; where only one accordion is used, it should not be put in
  a list.
- When accordion titles are used as headings, the buttons are also wrapped in an
  element with an appropriate heading level; ARIA can be used to set both the
  heading role and the level (via `aria-level`).
- See the
  [ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices-1.2/#accordion)
  for more guidance.
