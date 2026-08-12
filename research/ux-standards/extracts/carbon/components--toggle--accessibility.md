---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/toggle/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
No accessibility annotations are needed for toggles, but keep these
considerations in mind if you are modifying Carbon or creating a custom
component.

What Carbon provides
Design recommendations
Development considerations

## What Carbon provides

Carbon bakes keyboard operation into its components, improving the experience of
blind users and others who operate via keyboard. Carbon also incorporates other
accessibility considerations, some of which are described below.

### Keyboard interaction

Each toggle is in the tab order. Pressing `Enter` or `Space` changes the
toggle's state between off and on.

![illustration showing tab and other keyboard operation](images/toggle-accessibility-1.png)

  Toggles are reached by Tab and activated by Space or Enter keys.

### Redundant state information

Carbon’s default toggle uses both color and text to indicate on or off. Where
space constraints make a smaller toggle desirable, Carbon adds a tickmark to the
toggle’s “on” state so that if the text is not included, the component’s on/off
state can be distinguished without relying on use of color. The state is also
captured programmatically for users who cannot see or understand the visual
indicators.



![The alert toggle shows "off" and "on" to indicate state](images/toggle-accessibility-2-do.png)




![Toggles in the Alert column of a table show their "on" state with a green tickmark](images/toggle-accessibility-3-do.png)



## Design recommendations

Design annotations are not needed, but keep the following point in mind.

### Do not change the toggle's label based on its state

It is essential that designers distinguish between the text indicating the
on/off state of the toggle and the text that is the toggle’s label. The label's
text should not change based on the on/off state.



![the same 'Alerts' toggle keeping its label in both states](images/toggle-accessibility-4-do.png)




![The toggle changing its label from 'Alerts on' to 'Alerts off'](images/toggle-accessibility-4-dont.png)



## Development considerations

Keep this in mind if you’re modifying Carbon or creating a custom component.

- Toggle is implemented as a button with a role of `switch`.
- “On” and “off” text is `aria-hidden`; the state of the toggle is surfaced with
  `aria-checked` set to “true” or “false”.
- The toggle's `label` is set with `for`.
- See the
  [ARIA authoring practices guidance on switch](https://w3c.github.io/aria-practices/#switch)
  for more considerations.
