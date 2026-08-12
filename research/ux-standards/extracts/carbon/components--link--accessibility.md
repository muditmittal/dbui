---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/link/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
Design annotations are needed for specific instances shown below, but for the
standard link component, Carbon already incorporates accessibility.

  What Carbon provides
  Design recommendations
  Development considerations

## What Carbon provides

Carbon bakes keyboard operation into its components, improving the experience of
blind users and others who operate via the keyboard. Carbon incorporates many
other accessibility considerations, some of which are described below.

### Keyboard interactions

No annotations for keyboard interactions are needed. All links are in the tab
order, and activated with standard keys. Where Carbon links are not persistently
underlined, they receive an underline on focus.

![example of link keyboard interaction](images/link-accessibility-1.png)

  Links are reached by Tab key and activated with the Enter key.

### Contrast

Carbon’s link text and visited link text colors meet the minimum contrast
requirement of 4.5:1 with its background. Carbon also uses a link color and a
visited link color that contrast 3:1 against body text, so that they are
distinguishable even without an underline.

![a blue link contrasts 4.5:1 against the white background and 3:1 against the black body text ](images/link-accessibility-2.png)

  Link text has sufficient contrast with both its background and surrounding
  body text.

![a purple link contrasts 4.5:1 against the white background and 3:1 against the black body text ](images/link-accessibility-3.png)

  Visited link text has sufficient contrast with both its background and
  surrounding body text.

## Design recommendations

### Ensure link context

If your design uses generic link names such as “read more,” consider making them
unique. Otherwise, annotate a connection with other text in the design that
provides context. This will allow developers to implement in a way that
increases accessibility. See the Equal Access Toolkit
[link text topic](https://www.ibm.com/able/toolkit/design/content/#link-text).

![an annotation, connecting an IBM Cloud heading with a Learn more link, reads "associate link with heading"](images/link-accessibility-4.png)

  Annotate the connection between generic links and text that gives context.

## Development considerations

Keep these considerations in mind if you are modifying Carbon or creating a
custom component.

- Associate generic links such as “read more” with other contextual text, using
  either `aria-describedby` or `aria-labelledby` (to concatenate multiple text
  strings). See the
  [Equal Access Toolkit guidance](https://www.ibm.com/able/toolkit/develop/text-and-non-text/#aria-labelling)
  for more details.
- See the [ARIA authoring practices](https://w3c.github.io/aria-practices/#link)
  for more considerations.
