---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/contained-list/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
Design annotations are needed for specific instances shown below, but for the
standard contained list component, Carbon already incorporates accessibility.

  What Carbon provides
  Design recommendations
  Development considerations

## What Carbon provides

Carbon bakes keyboard operation into its components, improving the experience of
blind users and others who operate via the keyboard. Carbon incorporates many
other accessibility considerations, some of which are described below.

### Keyboard interactions

The default contained list is not interactive, but several of its variants
include keyboard operation. In all interactive variants, the `Tab` key is used
for navigation and both `Space` and `Enter` are used to activate components.

Users tab between any actionable items in the list, regardless of whether each
item is clickable or contains an action button (such as ‘delete’). It is
possible for multiple tab stops to exist for each list item.

![The user tabs to each row of a clickable contained list.](images/contained-list-accessibility-1.png)

  In a clickable contained list, each list item is a tab stop, activated with
  Enter or Space.

![The user tabs to each row of a clickable contained list.](images/contained-list-accessibility-2.png)

  Where a contained list has buttons on each row, the buttons are in the tab
  order.

![The user tabs to the first row of a clickable contained list, and then tabs to an actionable item at the end of the same row.](images/contained-list-accessibility-3.png)

  If a contained list contains both clickable rows and action items, there are
  multiple tab stops on each row.

## Design recommendations

### Indicate when the contained list is clickable

There is no persistent visual indicator that the list items in a contained list
are clickable. To help developers distinguish them from the default contained
list in your designs, annotate if each row in a list is intended to be
clickable. There is no need to annotate clickable buttons on each row since
these are visually identifiable.

![Two contained lists, the first with a pink annotation reading "clickable rows", the second showing a button on each row, with no annotation](images/contained-list-accessibility-5.png)

  Annotate if the rows of a contained list are clickable. Do not annotate if it
  is only buttons on each row that are actionable.

## Development considerations

Keep these considerations in mind if you are modifying Carbon or creating a
custom component.

- The contained list is implemented as a list (usually a `<ul>`) with each item
  an `<li>`, and the list title associated with the list through use of
  `aria-labelledby`.
- Any operable variant, whether a clickable list or a list with action items, is
  a `<button>` implemented as a child of the `<li>`.
