---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/parsing
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Parsing

## In brief

**Goal** — Assistive technology can properly present page content.

**What to do** — Create web pages according to specifications.

**Why it's important** — People can browse web content more easily with their assistive technology.

## Intent of Parsing

This criterion has been removed from WCAG 2.2.

The intent of this success criterion was to ensure that user agents, including assistive technologies, can accurately interpret and parse content. Since WCAG 2.0 was published, the specifications (such as HTML) and browsers have improved their handling of parsing errors. It is also the case that assistive technology used to do their own parsing of markup, but now rely on the browser. For that reason this success criterion has been removed. Many issues that would have failed this criterion will fail [Info and Relationships](info-and-relationships) or [Name, Role, Value](name-role-value). Other issues are excepted by the "except where the specification allow these features" part of the criterion.

The following content is left for historical purposes to show the original intent.

Success Criterion [4.1.1 Parsing](https://www.w3.org/TR/WCAG21/#parsing) (Level A): In content implemented using markup languages, elements have complete start and end
tags, elements are nested according to their specifications, elements do not contain
duplicate attributes, and any IDs are unique, except where the specifications allow
these features.

Start and end tags that are missing a critical character in their formation, such
as a closing angle bracket or a mismatched attribute value quotation mark are not
complete.

The intent of this success criterion is to ensure that user agents, including assistive technologies, can accurately interpret and parse content.  If the content cannot be parsed into a data structure, then different user agents may present it differently or be completely unable to parse it. Some user agents use "repair techniques" to render poorly coded content.

Since repair techniques vary among user agents, authors cannot assume that content
will be accurately parsed into a data structure or that it will be rendered correctly
by specialized user agents, including assistive technologies, unless the content is
created according to the rules defined in the formal grammar for that technology.
In markup languages, errors in element and attribute syntax and
failure to provide properly nested start/end tags lead to errors that
prevent user agents from parsing the content reliably.
Therefore, the success criterion requires that the content can be parsed using only
the rules of the formal grammar.

The concept of "well formed" is close to what is required here. However, exact parsing
requirements vary amongst markup languages, and most non XML-based languages do not
explicitly define requirements for well formedness. Therefore, it was necessary to
be more explicit in the success criterion in order to be generally applicable to markup
languages. Because the term "well formed" is only defined in XML, and (because end
tags are sometimes optional) valid HTML does not require well formed code, the term
is not used in this success criterion.

With the exception of one success criterion (
[1.4.4 Resize Text](resize-text), which specifically mentions that the effect specified by the success criterion must
be achieved without relying on an assistive technology) authors can meet the Success
Criteria with content that assumes use of an assistive technology (or access features
in use agents) by the user, where such assistive technologies (or access features
in user agents) exist and are available to the user.

## Benefits of Parsing

- Ensuring that web pages have complete start and end tags and are nested according
to specification
helps ensure that assistive technologies can parse the content accurately and without
crashing.

## Examples of Parsing

## Resources for Parsing

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
