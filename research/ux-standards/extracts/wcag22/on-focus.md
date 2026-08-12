---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/on-focus
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding On Focus

## In brief

**Goal** — Content can be navigated more predictably.

**What to do** — Do not change a user's context when items get focus.

**Why it's important** — Content that behaves predictably is especially important to people with disabilities.

## Intent of On Focus

The intent of this success criterion is to ensure that functionality is predictable
as visitors navigate their way through a document. Any component that is able to trigger
an event when it receives focus must not change the context.          Examples of
changing context when a component receives focus include, but are not limited to:

- forms submitted automatically when a component receives focus;

- new windows launched when a component receives focus;

- focus is changed to another component when that component receives focus;

Focus may be moved to a control either via the keyboard (e.g. tabbing to a control) or the mouse (e.g. clicking on a text field). Moving the mouse over a control does not move the focus
unless scripting implements this behavior. Note that for some types of controls, clicking
on a control may also activate the control (e.g. button), which may, in turn, initiate a change in context.

What is meant by "component" here is also sometimes called "user interface element"
or "user interface component".

## Benefits of On Focus

- This success criterion helps people with visual disabilities, cognitive limitations,
and motor impairments by reducing the chance that a change of context will occur unexpectedly.

## Examples of On Focus

**Example 1: A dropdown menu** —
A dropdown menu on a page allows users to choose between jump destinations. If the
person uses the keyboard to move down to a choice and activates it (with a spacebar
or enter key) it will jump to a new page.  However, if the person moves down to a
choice and either hits the escape or the tab key to move out of the pulldown menu
– it does not jump to a new screen as the focus shifts out of the dropdown menu.

**Example of a Failure: A help dialog** —
When a field receives focus, a help dialog window describing the field and providing
options opens. As a keyboard user tabs through the web page, the dialog opens, moving
the keyboard focus away from the control every time the user attempts to tab past
the field.

## Resources for On Focus

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
