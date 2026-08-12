---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Bypass Blocks

## In brief

**Goal** — Users can more easily navigate by keyboard.

**What to do** — Provide a means of skipping repeating content.

**Why it's important** — Users reliant on the keyboard interface can move around pages efficiently.

## Intent of Bypass Blocks

The intent of this success criterion is to allow people who navigate sequentially
through content more direct access to the primary content of the web page. Web pages
and applications often have content that appears on other pages or screens. Examples
of repeated blocks of content include but are not limited to navigation links, header
content, and advertising frames. Small repeated sections such as individual words,
phrases or single links are not considered blocks for the purposes of this provision.

Users who navigate sequentially through content will generally have to navigate through
repeated content on each page. This is in contrast to a sighted user's ability to ignore
the repeated material either by focusing on the center of the screen (where main content
usually appears) or a mouse user's ability to select a link with a single mouse click
rather than encountering every link or form control that comes before the item they want.

It is not the intent of this success criterion to require authors to provide methods
that are redundant to functionality provided by the user agent. Most web browsers
provide keyboard shortcuts to move the user focus to the top of the page, so if a
set of navigation links is provided at the bottom of a web page providing a "skip"
link may be unnecessary.

Although this success criterion deals with blocks of content that are repeated on
multiple pages, we also strongly promote structural markup on individual pages as
per Success Criteria 1.3.1.

Although the success criterion does not specifically use the term “within a set of
web pages”, the concept of the pages belonging to a set is implied.  An author would
not be expected to avoid any possible duplication of content in any two pages that
are not in some way related to each other, and are not "web pages that share a common
purpose and that are created by the same author, group or organization” (the definition
of set of web pages).

Even for web pages that are not in a set, if a web page has blocks of text that are
repeated within the page it may be helpful (but not required) to provide a means to
skip over them.

## Benefits of Bypass Blocks

When this success criterion is not satisfied, it may be difficult for people with
some disabilities to reach the main content of a web page quickly and easily:

- Screen reader users who visit several pages on the same site can avoid having to hear
all header content and dozens of navigation links on every page before the main
content is spoken.

- People who use only the keyboard or a keyboard interface can reach content with fewer
keystrokes. Otherwise, they might have to make dozens of keystrokes before reaching
a link in the main content area. This can take a long time and may cause severe physical
pain for some users.

- People who use screen magnifiers do not have to search through the same header content or
other blocks of information to find where the main content begins each time they enter
a new page.

- People with cognitive limitations as well as people who use screen readers may benefit
when links are grouped into lists

## Examples of Bypass Blocks

- A news organization's home page contains a main story in the middle of the page, surrounded
by many blocks and sidebars for advertising, searching, and other services. There
is a link at the top of the page that jumps to the main story. Without using this
link, a keyboard user needs to tab through approximately 40 links to reach the main
story; the screen reader user has to listen to 200 words; and the screen magnifier
user must search around for the location of the main body.

- An e-commerce website includes a long list of filters prior to the search results listing.
A link above the list enables users to skip the filters and get to the product results quickly.

## Resources for Bypass Blocks

- [WebAIM: Semantic Structure](http://webaim.org/techniques/semanticstructure/)

- [Heading Tags](http://accessibility.psu.edu/headingshtml/)

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
