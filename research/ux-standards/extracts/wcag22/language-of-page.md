---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/language-of-page
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Language of Page

## In brief

**Goal** — Assistive technology can determine the language of a page.

**What to do** — Indicate the predominant language on a page.

**Why it's important** — People using assistive technology get information in the correct language.

## Intent of Language of Page

The intent of this success criterion is to ensure that content developers provide
information in the web page that user agents need to present text and other linguistic
content correctly. Both assistive technologies and conventional user agents can render
text more accurately when the language of the web page is identified. Screen readers
can load the correct pronunciation rules. Visual browsers can display characters and
scripts correctly. Media players can show captions correctly. As a result, users with
disabilities will be better able to understand the content.

The default human language of the web page is the default text-processing language
as discussed in
[Internationalization Best Practices: Specifying Language in XHTML & HTML Content](https://www.w3.org/International/techniques/authoring-html#gslang). When a web page uses several languages, the default text-processing language is
the language which is used most. (If several languages are used equally, the first
language used should be chosen as the default human language.)

For multilingual sites targeting Conformance Level A, the Working Group strongly encourages
developers to follow Success Criterion 3.1.2 Language of Parts as well even though that is a Level AA
success criterion.

## Benefits of Language of Page

This success criterion helps:

- people who use screen readers or other technologies that convert text into synthetic
speech;

- people who find it difficult to read written material with fluency and accuracy, such
as recognizing characters and alphabets or decoding words;

- people with certain cognitive, language and learning disabilities who use text-to-speech
software

- people who rely on captions for synchronized media.

## Examples of Language of Page

**Example 1. A web page with content in two languages** —
A web page produced in Germany and written in HTML includes content in both German
and English, but most of the content is in German. The default human language is identified
as German (de) by the lang attribute on the html element.

## Resources for Language of Page

- [Internationalization Best Practices: Specifying Language in XHTML & HTML Content](https://www.w3.org/International/techniques/authoring-html#gslang)

- [Declaring language in HTML](https://www.w3.org/International/questions/qa-html-language-declarations)

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
