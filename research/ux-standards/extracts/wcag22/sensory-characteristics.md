---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/sensory-characteristics
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Sensory Characteristics

## In brief

**Goal** — Instructions are understandable by more people.

**What to do** — Describe controls by name, not just by appearance or location.

**Why it's important** — People who are blind or have low vision need non-visual instructions.

## Intent of Sensory Characteristics

The intent of this success criterion is to ensure that all users can access instructions
for using the content, even when they cannot perceive shape or size or use information
about spatial location or orientation.
Some content relies on knowledge of the shape or position of objects that are not
available from the structure of the content (for example, "round button" or "button
to the right").
Some users with disabilities are not able to perceive shape or position due to the
nature of the assistive technologies they use.
This success criterion requires that additional information be provided to clarify
instructions that are dependent on this kind of information.

Providing information using shape and/or location, however, is an effective method
for many users including those with cognitive limitations.
This provision should not discourage those types of cues as long as the information
is also provided in other ways.

In some languages, it is commonly understood that "above" refers to the content previous
to that point in the content and "below" refers to the content after that point. In
such languages, if the content being referenced is in the appropriate place in the
reading order and the references are unambiguous, statements such as "choose one of
the links below" or "all of the above" would conform to this success criterion.

WCAG was designed to apply only to controls that were displayed on a web page. The
intent was to avoid describing controls solely via references to visual or auditory
cues. When applying this to instructions for operating physical hardware controls
(e.g. a web kiosk with dedicated content), tactile cues on the hardware might be described
(e.g. the arrow shaped key, the round key on the right side). This success criterion
is not intended to prevent the use of tactile cues in instructions.

## Benefits of Sensory Characteristics

- People who are blind and people who have low vision may not be able to understand
instructions if they rely only on a description of the shape and/or location of content.
Providing additional information in any instructions other than shape and/or location
will allow users to understand the instructions even if they cannot perceive shape
and/or location.

## Examples of Sensory Characteristics

**Example 1: Instructions for interpreting a schedule of competitive events references
colored icons in different shapes to indicate the venue for each event** —
A table presents a list of times across the top row and a list of events in the first
vertical column and instructions are provided under the table: "Events marked with a
blue diamond are played on field A and events marked with a green circle are played
on field B." The instructions rely on color and shape only and result in a failure of
this criterion.

**Example 2: An online multi-page survey** —
An online multi-page survey uses a link implemented as a green arrow icon placed
in the lower right hand corner of the content to move from one survey page to the
next. The arrow is clearly labeled with "Next" and the instructions state, "To move
to the next section of the survey, select the green arrow icon labeled 'Next' in the
lower right corner below the last survey question."
The instruction uses positioning and color to help identify the icon;
the instruction does not rely on these sensory characteristics since it also refers to
the label, so it passes this criterion.

## Resources for Sensory Characteristics

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
