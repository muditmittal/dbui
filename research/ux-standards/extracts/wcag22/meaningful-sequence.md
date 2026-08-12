---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Meaningful Sequence

## In brief

**Goal** — The order of content can be understood by more people.

**What to do** — Use code to preserve meaningful content order.

**Why it's important** — Assistive technology can present content to users in the proper order.

## Intent of Meaningful Sequence

The intent of this success criterion is to enable a user agent to provide an alternative
presentation of content while preserving the reading order needed to understand the
meaning. It is important that it be possible to programmatically determine at least
one sequence of the content that makes sense. Content that does not meet this Success
Criterion may confuse or disorient users when assistive technology reads the content
in the wrong order, or when alternate style sheets or other formatting changes are
applied.

A sequence is
_meaningful_ if the order of content in the sequence cannot be changed without affecting its meaning.

For example, if a page contains two independent articles, the relative order of the
articles may not affect their meaning, as long as they are not interleaved. In such
a situation, the articles themselves may have meaningful sequence, but the container
that contains the articles may not have a meaningful sequence.

The semantics of some elements define whether or not their content is a meaningful
sequence. For instance, in HTML, text is always a meaningful sequence. Tables and
ordered lists are meaningful sequences, but unordered lists are not.

The order of content in a sequence is not always meaningful. For example, the relative
order of the main section of a web page and a navigation section does not affect their
meaning. They could occur in either order in the programmatically determined reading
sequence. As another example, a magazine article contains several callout sidebars.
The order of the article and the sidebars does not affect their meaning. In these
cases there are a number of different reading orders for a web page that can satisfy
the success criterion.

For clarity:

- Providing a particular linear order is only required where it affects meaning.

- There may be more than one order that is "correct" (according to the WCAG 2 definition).

- Only one correct order needs to be provided.

## Benefits of Meaningful Sequence

- This success criterion may help people who rely on assistive technologies that read
content aloud. The meaning evident in the sequencing of the information in the default
presentation will be the same when the content is presented in spoken form.

## Examples of Meaningful Sequence

- **Example 1:** In a multi-column document, the linear presentation of the content flows from the
top of a column to the bottom of the column, then to the top of the next column.

- **Example 2:** CSS is used to position a navigation bar, the main story on a page, and a side story.
The visual presentation of the sections does not match the programmatically determined
order, but the meaning of the page does not depend on the order of the sections.

## Resources for Meaningful Sequence

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
