---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/community/patterns/edit-pattern/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
#### Maintainers:

[Vikki Paterson](https://github.com/vikkipaterson),
[Chloe Poulter](https://github.com/chloepoulterdesign)

Editing is making changes to a resource that already exists in the system.
Updating and editing should use the same behavior as when the resource is
created. This should only vary in situations where the number of editable fields
is significantly smaller or larger than during creation, or the context of
current settings is required.

  Low-impact edit
  High-impact edit
  Optional extras

![Contextual image of an edit modal](images/Contextual.png)

Example of an edit modal in context

## Low-impact edit

For low-impact edits, allow editing with no warning. This approach is typically
used when editing doesn’t have a wider impact.

![Example of an edit button in a table](images/02.png)

Example of an edit button in a table

### Modal

If an object was created in a modal, its editable fields can be made available
in a modal. A modal can also be used where a small subset of fields are
editable. If enough fields are editable to require scrolling, use a side-panel
or full-page edit dialog instead.

![Example of a low consequence edit action in a modal](images/03.png)

Example of a low consequence edit action in a modal

### Side-panel

If an object was created in a side panel, its editable fields can be made
available in a side panel. A side panel can also be used where context in the
main view of the screen is useful in the editing flow.

![Example of a low-impact edit action in a side panel](images/LowSidepanel.png)

Example of a low impact edit action in a side panel

### Full page

When an object is created in a full-page flow and the majority of fields become
editable, a full-page edit flow should be used. This is made possible by
including a configuration/properties view.

![Example of a properties view in reading (top) and editing (bottom) views](images/05.png)

  Example of a properties view in reading (top) and editing (bottom) views

## High-impact edit

Warn the user of the consequences of editing. This pattern is typically used
when editing has a wider impact. Inform users of the likely consequences of the
edit to their system, and inform them that editing cannot be undone. Include a
warning stage.

### Modal

A high-impact edit action of only a few fields can use a danger modal. A second
confirm edit modal should also be inserted before the changes are saved. If
desired, the confirmation modal can include a
[summary of changes](#summary-of-changes).

![Example of a high-impact editing modal and consequent warning modal](images/HighModal.png)

  Example of a high-impact editing modal and consequent warning modal

### Side-panel

If an object was created in a side panel, or there are too many editable fields
for a modal, a slide-over panel can be used.

![Example of a high-impact edit action in a side panel](images/HighSidepanel.png)

Example of a high-impact edit action in a side panel

High-impact side panel edits should also warn the user of destructive edits with
a warning before changes are saved.

![Example of a warning screen in a side panel before a user saves changes](images/08.png)

  Example of a warning screen in a side panel before a user saves changes

### Full page

When an object was created in a full-page flow, or the volume of editable fields
is high, use a full-page edit dialog.

![Example of a full-page edit view](images/09.png)

Example of a full-page edit view

![Example of a modal warning users of the consequences of saving after a full-page edit](images/10.png)

  Example of a modal warning users of the consequences of saving after a
  full-page edit

## Optional extras

### Summary of changes

Adding a summary of changes to the warning stage of a high-impact flow can help
the user manage and understand all of the changes they have made.

![Example of a summary of changes in a modal](images/12.png)

Example of a summary of changes in a modal

### Non-editable fields

When a small number of fields are not editable, display their set value in a
disabled field.

![Example of a single non-editable field](images/11.png)

Example of a single non-editable field

Where a majority of variables are not editable, consider using an option that
will display only editable fields. In a small number of cases, make individual
variables editable in modals.

### Success notifications

An optional success notification can be used to confirm that the user's changes
have been saved.

![Example of a successful editing toast notification](images/13.png)

Example of a successful editing toast notification
