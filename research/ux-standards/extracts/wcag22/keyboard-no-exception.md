---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/keyboard-no-exception
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Keyboard (No Exception)

## In brief

**Goal** — Everything can be done with a keyboard.

**What to do** — Ensure all pointer actions have a keyboard equivalent.

**Why it's important** — People who can only use the keyboard interface need to be able to accomplish everything.

## Intent of Keyboard (No Exception)

The intent of this success criterion is to ensure that
**all** content is operable from the keyboard. This is the same as Success Criterion 2.1.1,
except that no exceptions are allowed. This does not mean that content where the underlying
function requires input that depends on the path of the user's movement and not just
the endpoints (excluded from the requirements of 2.1.1) must be made keyboard accessible.
Rather, it means that content that uses path-dependent input cannot conform to this
success criterion and therefore cannot meet Guideline 2.1 at Level AAA.

Platforms and user agents usually have conventions for how web content or
applications are controlled with a keyboard interface. If content does not follow
the platform/user agent conventions it may be difficult to use, as users will need
to learn different interaction methods. As a _best practice_, content
should follow the platform/user agent conventions. However, deviating from these
conventions does _not_ fail the normative requirement of this success criterion.

For instance, buttons that have focus can generally be activated using both the
`Enter` key and the `Space` bar. If a custom button control
in a web application instead only reacts to `Enter`
(or even a completely custom key or key combination), this still
**satisfies** the requirements of this success criterion.

This success criterion does not require that every visible control that can be activated
using a pointer (such as a mouse or touchscreen input) must also be focusable and actionable using the keyboard.
The normative requirement is only that there must be a way for keyboard interface users to perform
the same, or comparable, actions and to operate the content. Generally, the easiest way
to achieve this is to provide controls that can be operated with all possible input devices;
however, if a web application implements a separate mode of operation for keyboard interface users,
it will **not** fail the success criterion.

## Examples of Keyboard (No Exception)

## Resources for Keyboard (No Exception)

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
