---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/change-on-request
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Change on Request

## In brief

**Goal** — Users have full control of major content changes.

**What to do** — Provide ways for users to trigger or turn off changes of context.

**Why it's important** — Content that behaves predictably is especially important to people with disabilities.

## Intent of Change on Request

The intent of this success criterion is to encourage design of web content that gives
users full control of changes of context.
This success criterion aims to eliminate potential confusion that may be caused by
unexpected changes of context, such as launching new windows, or automatic
submission of forms after selecting an item from a list.
Such unexpected changes of context may cause difficulties for people with motor impairments,
people with low vision, people who are blind, and people with certain cognitive limitations.

Some types of change of context are not disruptive to some users, or actively benefit
some users. For example, single-switch users rely on context changes that are animated
by the system, and the preferences of low-vision users may vary depending on how much
of the content they can see at once and how much of the session structure they can
retain in working memory. Some types of content, such as slide shows, require the
ability to change context in order to provide the intended user experience. Content
that initiates changes of context automatically only when user preferences allow can
conform to this success criterion.

It is possible for more than one change of context to occur simultaneously. For example,
clicking on a link which opens a new window or tab is an example of two separate
changes of context related to the change in content and to the change in the viewport
(window or tab). The change in the content in this case is initiated by user request when
they click on the link, but _opening a new window or tab_ cannot be regarded as user-initiated if it happens without the user explicitly requesting it.

## Benefits of Change on Request

-

Individuals who are unable to detect changes of context or who may not realize that the context has changed are less likely to become disoriented if they initiate the change themselves.
For example:

individuals who are blind or have low vision may have difficulty knowing when a visual
context change has occurred, such as a new window popping up. In this case, warning
users of context changes in advance minimizes confusion when the user discovers that
the back button no longer behaves as expected.

- Some individuals with low vision, with reading and intellectual disabilities, and
who have difficulty interpreting visual cues may benefit from additional cues in order
to detect changes of context.

- People with certain
**cognitive limitations** do not get confused if automatic redirects are performed by the web server instead
of the browser.

## Examples of Change on Request

**An "update now" button** —
Instead of automatically updating the content, the author provides an "Update now"
button that requests a refresh of the content.

**An automatic redirection** —
Users are automatically redirected from an old page to a new page in such a way that
they never realize the redirect has occurred.

## Resources for Change on Request

- [Use standard redirects: don't break the back button!](https://www.w3.org/QA/Tips/reback) (W3C
QA Tip).

- [RFC 9110: HTTP Semantics 15.4. Redirection 3xx](https://www.rfc-editor.org/rfc/rfc9110#name-redirection-3xx).

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
