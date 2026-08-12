---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/on-input
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding On Input

## In brief

**Goal** — Content can be operated more predictably.

**What to do** — Forewarn users if their context will change based on their input.

**Why it's important** — Content that behaves predictably is especially important to people with disabilities.

## Intent of On Input

The intent of this success criterion is to ensure that entering data or selecting
a form control has predictable effects. Changing the setting of any user interface
component is changing some aspect in the control that will persist when the user is
no longer interacting with it. So checking a checkbox, entering text into a text field,
or changing the selected option in a list control changes its setting, but activating
a link or a button does not. Changes in context can confuse users who do not easily
perceive the change or are easily distracted by changes. Changes of context are appropriate
only when it is clear that such a change will happen in response to the user's action.

This success criterion covers changes in context due to changing the setting or value of a control.

In contrast, clicking on a link is activating it, rather than changing its setting. Buttons differ depending on their action:

**Buttons that change state** —
A button that has its state toggled, for example by using an `aria-pressed` attribute, is changing its setting.

A button that becomes disabled when activated is changing its setting.

**Buttons that submit data** —
A button that submits a form and navigates the user to a new page is activating a control, not changing a setting.

**Buttons that move focus** —
A button that moves focus, for example to a newly opened modal dialog, a slide-out navigation panel, or the first item in a `listbox` is activating a control, not changing its setting.

What is meant by "component" and "user interface component" here is also sometimes
called "user interface element".

## Benefits of On Input

- Unexpected changes of context can be so disorienting for users with visual disabilities
or cognitive limitations, to the point where these users may be unable to use the content.
This success criterion helps users with disabilities by making interactive content
more predictable.

-

Users are less likely to become disoriented while navigating/operating a site. For example:

Individuals who are blind or have low vision may have difficulty knowing when a visual
context change has occurred, such as a new window popping up. In this case, warning
users of context changes in advance minimizes confusion when the user discovers that
the back button no longer behaves as expected.

- Some individuals with low vision, with reading and intellectual disabilities, and
others who have difficulty interpreting visual cues may benefit from additional cues
in order to detect changes of context.

## Examples of On Input

- A form is provided for creating calendar entries in a web-based calendaring and scheduling
application. Along with the standard fields for subject, time and location,
a select dropdown allows the user to choose the type of calendar entry to create. The calendar
entry type can be meeting, appointment or reminder.  If the user selects the
meeting option, additional fields are displayed on the page for entering the meeting
participants. Different fields appear if the reminder option is chosen. Because only
parts of the entry change and the overall structure remains the same, the basic context
remains for the user.

- A form contains fields representing US phone numbers. All of the numbers have a three
digit area code followed by a three digit prefix and finally a four digit number,
and each part of the phone number is entered into a separate field. When the user
completes the entry of one field the focus automatically moves to the next field of
the phone number. This behavior of phone fields is described for the user at the beginning
of the form.

## Resources for On Input

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
