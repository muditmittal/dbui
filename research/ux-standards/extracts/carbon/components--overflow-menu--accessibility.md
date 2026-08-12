---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/overflow-menu/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
No accessibility annotations are needed for overflow menus, but keep these
considerations in mind if you are modifying Carbon or creating a custom
component.

What Carbon provides
Development considerations

## What Carbon provides

Carbon bakes keyboard operation into its components, improving the experience of
blind users and others who operate via keyboard. Carbon also incorporates other
accessibility considerations, some of which are described below.

### Keyboard interaction

Each overflow menu is in the tab order and is activated by `Space` or `Enter`.
When the menu is open, the first item takes focus. Focus is moved between menu
items with the `Up` and `Down` arrow keys. `Space` or `Enter` activates the item
with focus (which causes focus to go somewhere else and the menu to close).
`Esc` collapses the menu and puts focus onto the menu button.

![example of overflow menu keyboard interaction](images/overflow-menu-accessibility-1.png)

  Overflow menus are reached by Tab. Space and Enter keys open the menu as well
  as activating menu items with focus.

![illustration showing an open menu with the focus on the first item, and the arrow and Esc keys called out](images/overflow-menu-accessibility-2.png)

  When opened, the first item in the menu takes focus. Arrow keys move focus,
  Esc closes the menu.

## Development considerations

Keep these considerations in mind if you are modifying Carbon or creating a
custom component.

- Overflow menus are buttons with `aria-haspopup` set to "true".
- The overflow menu is named with `aria-label`.
- Each menu item is an `li` in a `ul`.
- Each list item contains a button with `role="menuitem"` and `tabindex="-1"`.
  See the
  [ARIA authoring practices on menubutton](https://w3c.github.io/aria-practices/#menubutton)
  for more considerations.
