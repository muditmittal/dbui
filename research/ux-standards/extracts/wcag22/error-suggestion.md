---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Error Suggestion

## In brief

**Goal** — Users get suggestions on how to resolve errors.

**What to do** — Where errors are detected, suggest known ways to correct them.

**Why it's important** — People can address errors faster and with reduced effort.

## Intent of Error Suggestion

The intent of this success criterion is to ensure that users receive appropriate suggestions
for correction of an input error if it is possible. The definition of "input error"
says that it is "information provided by the user that is not accepted" by
the system. Some examples of information that is not accepted include information
that is required but omitted by the user and information that is provided by the user
but that falls outside the required data format or allowed values.

Success Criterion 3.3.1 Error Identification provides for notification of errors. However, persons with
cognitive limitations may find it difficult to understand how to correct the errors.
People with visual disabilities may not be able to figure out exactly how to correct
the error. In the case of an unsuccessful form submission, users may abandon the form
because they may be unsure of how to correct the error even though they are aware
that it has occurred.

The content author may provide the description of the error, or the user agent may
provide the description of the error based on technology-specific, programmatically
determined information.

## Benefits of Error Suggestion

- Providing information about how to correct input errors allows users who have learning
disabilities to fill in a form successfully.

- Users who are blind or have impaired vision understand more easily the nature of the
input error and how to correct it.

- People with motion impairment can reduce the number of times they need to change an
input value.

## Examples of Error Suggestion

**Additional Help for Correcting An Input Error** —
The result of a form that was not successfully submitted describes an
input error in place in the page along with the correct input and offers additional
help for the form field that caused the input error.

**Suggestions from a Limited Set of Values** —

An input field requires that a month name be entered. If the user enters "12," suggestions
for correction may include:

- A list of the acceptable values, e.g., "Choose one of: January, February, March, April,
May, June, July, August, September, October, November, December."

- The conversion of the input data interpreted as a different month format, e.g., "Do
you mean 'December'?"

## Resources for Error Suggestion

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
