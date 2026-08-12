---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/list/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
No accessibility annotations are needed for lists, but keep these considerations
in mind if you are modifying Carbon or creating a custom component.

  What Carbon provides
  Development considerations

## What Carbon provides

Carbon incorporates many accessibility considerations, some of which are
described below.

### Keyboard interaction

Lists are not keyboard operable, unless the list items themselves are operable.
In such a situation, the list items will retain the component’s default keyboard
interaction. For example, in a list of links, each
[link](https://carbondesignsystem.com/components/link/usage) will be in the tab
order and can be activated by `Enter`.

## Development considerations

Keep this in mind if you’re modifying Carbon or creating a custom component:

- Carbon uses native
  [HTML](https://www.w3.org/WAI/tutorials/page-structure/content/#lists)
  unordered (`ul`) and ordered (`ol`) lists and list items (`li`), then styles
  them with CSS.
- Carbon uses `::before` and `::marker` CSS pseudo-elements for the numbering
  and bulleting of lists, which are properly read by assistive technologies such
  as [screen readers](https://www.ibm.com/able/toolkit/verify/screen-reader/).
