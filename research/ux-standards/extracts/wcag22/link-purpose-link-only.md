---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-link-only
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Link Purpose (Link Only)

## In brief

**Goal** — Users understand what each link will do.

**What to do** — Provide descriptive names for all links.

**Why it's important** — Descriptive link text is more understandable for all users, especially when using assistive technology.

## Intent of Link Purpose (Link Only)

The intent of this success criterion is to help users understand the purpose of each
link in the content, so they can decide whether they want to follow it. Best practice
is that links with the same destination would have the same descriptions, but links
with different purposes and destinations would have different descriptions (see also

[Success Criterion 3.2.4 Consistent Identification](consistent-identification)
which calls for consistency in identifying components that have the same functionality).
Because the purpose of a link can be identified from its link text, links can be understood
when they are out of context, such as when the user agent provides a list of all the
links on a page.

The text in the link is intended to describe the purpose of the link. In cases where
the link takes one to a document or a web application, the name of the document or
web application would be sufficient to describe the purpose of the link (which is
to take you to the document or web application). Note that it is not required to use
the name of the document or web application; other things may also describe the purpose
of the link.

[Success Criterion 2.4.2 Page Titled](page-titled)
deals with the titles of pages. Here also, the name of a document or web application
being presented on the page would be sufficient to describe the purpose of the page.
Having the link and the title agree, or be very similar, is good practice and provides
continuity between the link 'clicked on' and the web page that the user lands on.

The success criterion includes an exception for links for which the purpose of the
link cannot be determined from the information on the web page. In this situation,
the person with the disability is not at a disadvantage; there is no additional context
available to understand the link purpose. However, whatever amount of context is available
on the web page that can be used to interpret the purpose of the link must be made
available in the link text to satisfy the success criterion.

The word "mechanism" is used to allow authors to either make all links fully understandable
out of context by default or to provide a way to make them this way. This is done
because for some pages, making the links all unambiguous by themselves makes the pages
easier for some users and harder for others. Providing the ability to make the links
unambiguous (by themselves) or not provides both users with disabilities with the
ability to use the page in the format that best meets their needs.

For example: A page listing 100 book titles along with links to download the books
in HTML, PDF, DOC, TXT, MP3, or AAC might ordinarily be viewed as the title of the
book as a link with the words "in HTML" after it. then the sentence "Also available
in: " followed by a series of short links with text of "HTML", "PDF", "DOC", "TXT",
"MP3", and "AAC". At Level 3, some users could opt to view the page this way - because
they would find the page harder to understand or slower to use if the full title of
the book were included in each of the links. Others could opt to view the page with
the full title as part of each of the links so that each link was understandable in
itself. Both the former and the latter groups could include people with visual or
cognitive disabilities that used different techniques to browse or that had different
types or severities of disability.

## Benefits of Link Purpose (Link Only)

- This success criterion helps people with motion impairment by letting them skip web
pages that they are not interested in, avoiding the keystrokes needed to visit the
referenced content and then return to the current content.

- People with cognitive limitations will not become disoriented by extra navigation
to and from content they are not interested in.

- People with visual disabilities will benefit from not losing their place in the content
when they return to the original page. The screen reader's list of links is more useful
for finding information because the target of the links are described.

## Examples of Link Purpose (Link Only)

**Both an icon and text are included in the same link** —
An icon of a voting machine and the text "Government of Ireland's Commission of Electronic
Voting" are combined to make a single link.

**A list of book titles** —
A list of books is available in three formats: HTML, PDF, and mp3 (a recording of
a person reading the book). The title of the book is followed by links to the different
formats. The rendered text for each link is just the format type, but the text associated
with each link includes the title as well as the format; for instance, "Gulliver's
Travels, MP3."

## Resources for Link Purpose (Link Only)

- [Using Link Titles to Help Users Predict Where They Are Going](https://www.nngroup.com/articles/using-link-titles-to-help-users-predict-where-they-are-going/)

- [WebAIM Techniques for Hypertext Links](http://webaim.org/techniques/hypertext/)

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
