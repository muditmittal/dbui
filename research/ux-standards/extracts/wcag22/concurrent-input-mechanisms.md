---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/concurrent-input-mechanisms
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Concurrent Input Mechanisms

## In brief

**Goal** — Users can choose different ways of inputting content.

**What to do** — Do not prevent users from switching their mode of input.

**Why it's important** — People may not be able to work using just one input method.

## Intent

The intent of this success criterion is to ensure that people can use and switch between different modes of input when interacting with web content. Users may employ a variety of input mechanisms when interacting with web content. These may be a combination of mechanisms such as a keyboard or keyboard-like interfaces and pointer devices like a mouse, stylus or touchscreen.

Even though a device may have a primary input mechanism, the user may choose to employ alternative input mechanisms when interacting with the device. For example, the primary mechanism for mobile phones and tablets is the touchscreen.  The user of these devices may choose to use a paired mouse or external keyboard as an alternative to using the touchscreen.

Users should be able to switch input mechanisms at any point should the user determine that certain tasks and interactions are more easily accomplished by using an alternative input mechanism. Content must not limit the user's interaction to any particular input mechanism unless the restriction is essential, or is required to ensure the security of the content or to respect user settings.

Note: A touch-typing web application, which teaches users how to touch-type on a keyboard and/or measures their proficiency and speed, would be an example of an essential limitation to a particular input mechanism.

## Benefits

- Users can interact with web content with whichever input mechanism is preferred and available to them.

- Users may switch between input mechanisms when they desire or the circumstances require it.

- Users are allowed to add and remove input mechanisms at any point, where supported by the operating system.

## Examples

- A user with mobility impairment pairs a mouse and keyboard to a mobile phone with a touchscreen. The phone can thereafter be operated by those input devices and the content does not accept the touchscreen as the only input mechanism.

- On a touch-enabled laptop with coarse precision, people who have difficulty activating a small target because of hand tremors, limited dexterity or other reasons are still able to interact with content using their keyboard and trackpad.

- A user starts interacting with a page using a desktop keyboard, and then attaches a secondary touch-enabled monitor. Content can be operated using this newly added input mechanism and does not assume that the keyboard, the first input mechanism it detected, is the only one in use.

- A speech input user navigates content using voice commands which translate to simulate mouse (and keyboard) commands. When talking with a colleague, however, the user turns speech recognition off and uses the mouse instead.

- A user opens a menu with a mouse, and then navigates between the menu items with arrow keys.

## Resources

- [W3C Pointer Events - Level 2](https://www.w3.org/TR/pointerevents2/)

- [Patrick H. Lauke - Detecting touch: it's the 'why', not the 'how'](https://hacks.mozilla.org/2013/04/detecting-touch-its-the-why-not-the-how/)

- [Chris Wilson / Paul Kinlan: Touch And Mouse - Together Again For The First Time](https://web.dev/articles/mobile-touchandmouse)

- [W3C Touch Events - Level 2: Interaction with Mouse Events and click](https://www.w3.org/community/reports/touchevents/CG-FINAL-touch-events-20240704/#mouse-events)

- [W3C CSS Media Queries Level 4: Interaction Media Features](https://www.w3.org/TR/mediaqueries-4/#mf-interaction)

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
