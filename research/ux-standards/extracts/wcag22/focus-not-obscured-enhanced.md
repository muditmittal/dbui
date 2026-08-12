---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-enhanced
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Focus Not Obscured (Enhanced)

## In brief

**Goal** — Don't cover any part of the item with focus.

**What to do** — Ensure when an item gets keyboard focus, it is fully visible.

**Why it's important** — People who can't use a mouse need to see what has keyboard focus.

## Intent of Focus Not Obscured (Enhanced)

The intent of this success criterion is to ensure that the item receiving keyboard focus is always visible in the user's viewport. For sighted people who rely on a keyboard (or on a device that operates through the keyboard interface, such as a switch or voice input), knowing the current point of focus is critical. The component with focus signals the interaction point on the page. Where users cannot see the item with focus, they may not know how to proceed, or may even think the system has become unresponsive.

Typical types of content that can overlap focused items are sticky footers, sticky headers, and non-modal dialogs. As a user tabs through the page, these layers of content can hide the item receiving focus, along with its focus indicator.

A notification implemented as sticky content, such as a cookie banner, will fail this success criterion if it partially covers a component receiving focus. Ways of passing include making the banner modal so the user has to dismiss the banner before navigating through the page, or using [scroll padding](https://www.w3.org/TR/css-scroll-snap/#propdef-scroll-padding) so the banner does not overlap other content. Notifications that do not require user action could also meet this criterion by closing on loss of focus.

Another form of obscuring can occur when semi-transparent overlays, or overlays that apply a blur or other dimming effect, overlap the focused item. While subjectively this form of obscuring may still leave the focused element partially visible/recognizable, it _does fail_ the normative requirements of this success criterion, as it will make it more difficult for users to identify which component on the page currently has focus. In addition, these types of overlays may also cause failures of [1.4.11 Non-text Contrast](non-text-contrast) and/or [2.4.13 Focus Appearance](focus-appearance) if the focus indicator of the focused element is also affected.

This criterion evaluates the focused _component_, rather than the focus _indicator_. The component itself does not include the focus indicator when checking that "no part of the component is hidden" - unless the focus indicator is inside the component, or focus is indicated by a change to the component itself. Although users benefit from both the component and the focus indicator (if external to the component) not being obscured when tracking the focus, for the purposes of this criterion only checking the component provides a clearer metric. However, if the focus indicator is fully obscured, it would likely fail [2.4.7 Focus Visible](focus-visible).

## Benefits of Focus Not Obscured (Enhanced)

- Sighted users who rely on a keyboard interface to operate the page will be able to see the component which gets keyboard focus. Such users include those who rely on devices which use the keyboard interface, including speech input, sip-and-puff software, on-screen keyboards, scanning software, and a variety of assistive technologies and alternate keyboards.

- People with limited or low vision but who rely upon a pointing device (for viewport orientation and repositioning) benefit from a clearly visible indication of the current point of keyboard interaction, especially where magnification reduces the overall useable portion of content.

- People with attention limitations, short term memory limitations, or limitations in executive processes benefit by being able to more easily discover where the focus is located.

## Examples of Focus Not Obscured (Enhanced)

- A page has a sticky footer (attached to the bottom of the viewport). When tabbing down the page the focused item is not at all obscured by the footer because content in the viewport scrolls up to always display the item with keyboard focus using [scroll padding](https://www.w3.org/TR/css-scroll-snap/#propdef-scroll-padding).

- A page has a large (30% wide) cookie approval dialog. The dialog is modal, preventing access to the other controls in the page until it has been dismissed. Focus is not obscured because the cookie approval dialog (including the focus indicator) remains on screen until selections are made and submitted.

- A notification is implemented as a sticky header and the keyboard focus is moved to the notification. The notification disappears when it loses focus, and does not obscure any other controls (including the focus indicator visible prior to the notification).

## Resources

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
