---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/error-identification
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Error Identification

## In brief

**Goal** — Users know an error exists and what is wrong.

**What to do** — Provide descriptive notification of errors.

**Why it's important** — Flagging errors helps people with reduced sight and cognitive disabilities resolve them.

## Intent of Error Identification

The intent of this success criterion is to ensure that users are aware that an error
has occurred and can determine what is wrong. In the case of an unsuccessful form submission,
it is not sufficient to only re-display the form without providing any hint that the submission
failed.
The error must be indicated in text.

This SC requires that users be provided with information about the nature of the error, including the identity of the item in error. What the user should do to correct the item in error is covered by
[3.3.3 Error Suggestion](error-suggestion). Often, the error description can be phrased so that it meets both Success Criteria 3.3.1 Error Identification and 3.3.3 Error Suggestion at the same time. For instance, "Email is not valid" would pass 3.3.1, but "Please provide a valid email address in the format name@domain.com" also conveys how it can be fixed and passes both.

An "input error" includes:

- information that is required by the web page but omitted by the user, or

- information that is provided by the user but that falls outside the required data format or allowed values.

For example:

- the user fails to enter the proper abbreviation in a state, province, or region field;

- the user enters a state abbreviation that is not a valid state;

- the user enters a non existent zip or postal code;

- the user enters a birth date 2 years in the future;

- the user enters alphabetic characters or parentheses into their phone number field that only accepts numbers;

- the user enters a bid that is below the previous bid or the minimum bid increment.

If a user enters a value that is too high or too low, and the coding on the page automatically
changes that value to fall within the allowed range, the user's error would still
need to be described to them as required by the success criterion. Such an error description
telling the person of the changed value would meet both this success criterion (Error
Identification) and [3.3.3 Error Suggestion](error-suggestion).

The identification and description of an error can be combined with programmatic information
that user agents or assistive technologies can use to identify an error and provide
error information to the user. For example, certain technologies can specify that
the user's input must not fall outside a specific range, or that a form field is required.
This type of programmatic information is not required for this success criterion, but may be covered
by other criteria such as [4.1.2 Name, Role, Value](name-role-value).

It is perfectly acceptable to indicate the error in other ways such as through the use of an image,
color, or other visual indicator, in addition to the text description.

This criterion does not mandate any particular way in which errors should be displayed. Depending
on the situation, it may be more suitable for all errors to be listed at the start or before a form.
In other cases, it may be more appropriate to show errors inline, with error messages next to the specific
fields that are in error. Errors could also be listed in an alert, or dialog. This criterion does not
cover which of these methods should be used - the only requirement is for errors  to be presented to users in text or a text alternative.

See also [3.3.3 Error Suggestion](error-suggestion).

### User agent native HTML form validation

When using native HTML [client-side form validation](https://html.spec.whatwg.org/multipage/forms.html#client-side-form-validation),
user agents will automatically prevent the submission of incomplete or invalid forms, and display generic error messages to the user.
The user agent will generally set focus back to the first form field that is in error, and as a result scroll the page
so that the field in error and the generated error message will be visible in the viewport.

In most common user agent and screen reader combinations, the screen reader will announce the error message
and the programmatic name of the focused field.
While this meets the requirements of this success criterion, it should be noted that there are several disadvantages related to this approach:

- Depending on the user agent, the message may not be permanent, or fail to scroll with the page.

- Depending on the user agent, even if a user has zoomed-in (magnified) the content, the error messages will not appear magnified,
as the text in the validation message will be displayed at the same size as the user agent interface; the message may be too small for users to read.

- The default HTML validation error messages are generally quite generic, and they may not provide sufficiently helpful or specific suggestions to the user
that would conform to [3.3.3 Error Suggestion](error-suggestion).

- If several errors are present, only the first error message is exposed; once the user has provided an input that conforms to the type of field,
and resubmits the form, the next error (if present) will be exposed. This means that repeated resubmissions and corrections may be required.

As these problems relate to user agent behavior, developers will need to carefully consider if native browser validation is accessibility supported.

## Benefits of Error Identification

- Providing information about input errors in text allows users who are blind, have low vision, or have color vision deficiency to perceive the fact that an error occurred.

- This success criterion may help people with cognitive, language, and learning disabilities
who have difficulty understanding the specific reason why a form submission failed (in cases
where this is not already made obvious by the nature of the form).

## Examples of Error Identification

**Identifying errors in a form submission** —

An airline website offers a special promotion on discounted flights. The user is
asked to complete a simple form that asks for personal information such as name, address,
phone number, seating preference and email address. If any of the fields of the form
are either not completed or completed incorrectly, an alert is displayed notifying
the user which field or fields were missing or incorrect.

This success criterion does not mean that color or text styles cannot be used to indicate
errors. It simply requires that errors also be identified using text.

**Providing multiple cues** —
The user fails to fill in two fields on the form.  In addition to describing the error
and providing a unique character to make it easy to search for the fields, the fields
are highlighted in yellow to make it easier to visually search for them as well.

## Resources for Error Identification

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
