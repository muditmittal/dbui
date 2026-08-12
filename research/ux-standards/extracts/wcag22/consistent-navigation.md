---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Consistent Navigation

## In brief

**Goal** — Content can be navigated more predictably.

**What to do** — Consistently order navigation that repeats across multiple pages.

**Why it's important** — Content that behaves predictably is especially important to people with disabilities.

## Intent of Consistent Navigation

The intent of this success criterion is to encourage the use of consistent
visual layout and source order for users who interact with repeated content within
a set of web pages and need to locate specific information or functionality more than
once.

Individuals with low vision who use screen magnification to display a small portion
of the screen at a time often use visual cues and page boundaries to quickly locate
repeated content.
Presenting repeated content in the same order is also important for visual users who
use spatial memory or visual cues within the design to locate repeated content.

Likewise, users who are blind and navigate through content on pages sequentially
benefit from having navigational mechanisms occur in a consistent order relative
to the overall source order and structure of the page.

It is important to note that the use of the phrase "same order" in this section is
not meant to imply that sub-navigation menus cannot be used or that blocks of secondary
navigation or page structure cannot be used. Instead, this success criterion is intended
to assist users who interact with repeated content across web pages to be able to
predict the location of the content they are looking for and find it more quickly
when they encounter it again.

Users may initiate a change in the order by using adaptive user agents or by setting
preferences so that the information is presented in a way that is most useful to them.

## Benefits of Consistent Navigation

- Ensuring that repeated components occur in the same order on each page of a site helps
users become comfortable that they will able to predict where they can find things
on each page. This helps users with
**cognitive limitations**, users with
**low vision**, users with
**intellectual disabilities**, and also those who are
**blind**.

## Examples of Consistent Navigation

**A consistently located control** —
A search field is the last item on every web page in a site. Users can quickly locate the search function.

**An expanding navigation menu** —
A navigation menu includes a list of seven items with links to the main sections of a site.
When a user selects one of these items, a list of sub-navigation items is inserted
into the top-level navigation menu.

**Consistently positioned skip navigation controls** —
A "skip navigation" (or "skip to main content") link is included as the first link
on every page in a website. The link allows users to quickly bypass heading information
and navigational content and begin interacting with the main content of a page.

**Skip to navigation link** —
Navigational content is consistently located at the end of each page in a set of web
pages. A "skip to navigation" link is consistently located at the beginning of each
page so that keyboard users can easily locate it when needed.

## Resources for Consistent Navigation

- Detweiler, M.C. and Omanson, R.C. (1996), Ameritech Web Page User Interface Standards and Design Guidelines.

- [IBM: User experience design - Navigation](https://www.ibm.com/able/toolkit/design/ux/navigation/).

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
