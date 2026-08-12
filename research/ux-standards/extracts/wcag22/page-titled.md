---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/page-titled
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Page Titled

## In brief

**Goal** — Each web page has a meaningful title.

**What to do** — Provide a descriptive page title using appropriate technology.

**Why it's important** — Page titles help users identify and distinguish different pages.

## Intent of Page Titled

The intent of this success criterion is to help users find content and orient themselves
within it by ensuring that each web page has a descriptive title. Titles identify
the current location without requiring users to read or interpret page content. When
titles appear in site maps or lists of search results, users can more quickly identify
the content they need. User agents make the title of the page easily available to
the user for identifying the page. For instance, a user agent may display the page
title in the  window title bar or as the name of the tab containing the page.

In cases where the page is a document or a web application, the name of the document
or web application would be sufficient to describe the purpose of the page. Note that
it is not required to use the name of the document or web application; other things
may also describe the purpose or the topic of the page.

In cases such as Single Page Applications (SPAs), where various distinct pages/views are
all nominally served from the same URI and the content of the page is changed dynamically,
the title of the page should also be changed dynamically to reflect the content or topic of
the current view.

[Success Criteria 2.4.4 Link Purpose (In Context)](link-purpose-in-context) and
[2.4.9 Link Purpose (Link Only)](link-purpose-link-only) deal with the purpose of
links, many of which are links to web pages. Here also,
the name of a document or web application being linked to would be sufficient to describe
the purpose of the link. Having the link and the title agree, or be very similar,
is good practice and provides continuity between the link 'clicked on' and the web
page that the user lands on.

## Benefits of Page Titled

- This criterion benefits all users in allowing users to quickly and easily identify
whether the information contained in the web page is relevant to their needs.

- People with visual disabilities will benefit from being able to differentiate content
when multiple web pages are open.

- People with cognitive disabilities, limited short-term memory and reading disabilities
also benefit from the ability to identify content by its title.

- This criterion also benefits people with severe mobility impairments whose mode of
operation relies on audio when navigating between web pages.

## Examples of Page Titled

**An HTML web page** —
The descriptive title of an HTML web page is marked up with the <title> element so
that it will be displayed in the title bar of the user agent.

**A set of web pages** —

The title of the landing page is "ARIA Authoring Practices Guide | APG | WAI | W3C"

- The patterns list page has the title "Patterns | APG | WAI | W3C"

Specific patterns are pages titled "X Pattern | APG | WAI | W3C" (e.g., "Alert and Message Dialogs Pattern | APG | WAI | W3C")

Specific examples for each pattern are pages titled "X Example | APG | WAI | W3C" (e.g., "Alert Dialog Example | APG | WAI | W3C")

- Practices page has the title "Practices | APG | WAI | W3C"

- Index page has the title "Index | APG | WAI | W3C"

**A web application** —
A banking application lets users inspect their bank accounts, view past statements,
and perform transactions. The web application dynamically generates titles for each
web page, e.g., "Bank XYZ, accounts for Alex Smith" "Bank XYZ, December 2005 statement
for Account 1234-5678".

## Resources for Page Titled

- [<title>: The Document Title element: Usage notes (Accessibility)](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/title#accessibility).

- [Guidelines for Accessible and Usable Web Sites: Observing Users Who Work With Screen
Readers (PDF)](https://redish.net/wp-content/uploads/Theorfanos_Redish_InteractionsPaperAuthorsVer.pdf). Theofanos, M.F., and Redish, J. (2003).  Interactions, Volume X, Issue 6, November-December
2003, pages 38-51,
[https://dl.acm.org/doi/10.1145/947226.947227](https://dl.acm.org/doi/10.1145/947226.947227)

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
