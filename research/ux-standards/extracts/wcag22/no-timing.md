---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/no-timing
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding No Timing

## In brief

**Goal** — Users do not face time limits.

**What to do** — Do not use time limits, except for video and live events.

**Why it's important** — People with disabilities often need more time to complete actions.

## Intent of No Timing

The intent of this success criterion is to minimize the occurrence of content that
requires timed interaction. This enables people with blindness, low vision, cognitive
limitations, or motor impairments to interact with content. This differs from the
Level A success criterion in that the only exception is for real-time events.

Video only, such as sign language, is covered in
[Guideline 1.1](text-alternatives).

## Benefits of No Timing

- People with physical disabilities often need more time to react, to type and to complete
activities.  People with low vision need more time to locate things on screen and
to read.   People who are blind and using screen readers may need more time to understand
screen layouts, to find information and to operate controls.  People who have cognitive
or language limitations need more time to read and to understand.  People who are
deaf and communicate in sign language may need more time to read information printed
in text (which may be a second language for some).

- In circumstances where a sign-language interpreter may be relating audio content to
a user who is deaf, control over time limits is also important.

## Examples of No Timing

**A test is designed so that time to complete the test does not affect the scoring** —
Rather than calibrating an on-line test using a time limit, the test is calibrated
based on scores when users have no time limits.

**A game is designed so that users take turns rather than competing in real-time** —
One party can pause the game without invalidating the competitive aspect of it.

## Resources for No Timing

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
