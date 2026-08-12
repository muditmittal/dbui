---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Link Purpose (In Context)

## In brief

**Goal** — Users understand what each link will do.

**What to do** — Provide descriptive names or context for all links.

**Why it's important** — People with visual and cognitive disabilities can navigate more easily.

## Intent of Link Purpose (In Context)

The intent of this success criterion is to help users understand the purpose of each
link so they can decide whether they want to follow the link. Whenever possible, provide
link text that identifies the purpose of the link without needing additional context.
Assistive technology has the ability to provide users with a list of links that are
on the web page. Link text that is as meaningful as possible will aid users who want
to choose from this list of links. Meaningful link text also helps those who wish
to tab from link to link. Meaningful links help users choose which links to follow
without requiring complicated strategies to understand the page.

The text of, or associated with, the link is intended to describe the purpose of the
link. In cases where the link takes one to a document or a web application, the name
of the document or web application would be sufficient to describe the purpose of
the link (which is to take you to the document or web application). Note that it is
not required to use the name of the document or web application; other things may
also describe the purpose of the link.

[Success Criterion 2.4.2 Page Titled](page-titled)
deals with the titles of pages. Here also, the name of a document or web application
being presented on the page would be sufficient to describe the purpose of the page.
Having the link and the title agree, or be very similar, is good practice and provides
continuity between the link 'clicked on' and the web page that the user lands on.

In some situations, authors may want to provide part of the description of the link
in logically related text that provides the context for the link. In this case the
user should be able to identify the purpose of the link without moving focus from
the link. In other words, they can arrive on a link and find out more about it without
losing their place. This can be achieved by putting the description of the link in
the same sentence, paragraph, list item, or table cell as the link, or in the table header cell for a link in a data table, because these are directly associated with the link itself. Alternatively, authors may choose to use an ARIA technique to associate additional
text on the page with the link.

This context will be most usable if it precedes the link. (For instance, if you must
use ambiguous link text, it is better to put it at the end of the sentence that describes
its destination, rather than putting the ambiguous phrase at the beginning of the
sentence.) If the description follows the link, there can be confusion and difficulty
for screen reader users who are reading through the page in order (top to bottom).

It is a best practice for links with the same destination to have consistent text
(and this is a requirement per
[Success Criterion 3.2.4 Consistent Identification](consistent-identification)
for pages in a set). It is also a best practice for links with different purposes
and destinations to have different link text.

A best practice for links to conforming alternate versions is to ensure that the link text to the conforming alternate version indicates in link text that the page it leads to represents the more accessible version. This information may also be provided in text - the goal is to ensure that the end user knows what the purpose of the link is.

The success criterion includes an exception for links for which the purpose of the
link cannot be determined from the information on the web page. In this situation,
the person with the disability is not at a disadvantage; there is no additional context
available to understand the link purpose. However, whatever amount of context is available
on the web page that can be used to interpret the purpose of the link must be made
available in the link text or programmatically associated with the link to satisfy
the success criterion.

There may be situations where the purpose of the link is supposed to be unknown
or obscured. For instance, a game may have links identified only as door #1, door
#2, and door #3. This link text would be sufficient because the purpose of the links
is to create suspense for all users.

See also
[2.4.9 Link Purpose (Link Only)](link-purpose-link-only).

## Benefits of Link Purpose (In Context)

- This success criterion helps people with motion impairment by letting them skip links
that they are not interested in, avoiding the keystrokes needed to visit the referenced
content and then returning to the current content.

- People with cognitive limitations will not become disoriented by multiple means of
navigation to and from content they are not interested in.

- People with visual disabilities will be able to determine the purpose of a link by
exploring the link's context.

## Examples of Link Purpose (In Context)

**A link contains text that gives a description of the information at that URI** —
A page contains the sentence "There was much bloodshed during the Medieval period
of history." Where "Medieval period of history" is a link.

**A link is preceded by a text description of the information at that URI** —
A page contains the sentence "Learn more about the Government of Ireland's Commission
on Electronic Voting at Go Vote!" where "Go Vote!" is a link.

**Both an icon and text are included in the same link** —
An icon of a voting machine and the text "Government of Ireland's Commission of Electronic
Voting" are combined to make a single link. The alt text for the icon is null, since
the purpose of the link is already described by the text of the link next to the icon.

**A list of book titles** —
A list of books is available in three formats: HTML, PDF, and mp3 (a recording of
a person reading the book). To avoid hearing the title of each book three times (once
for each format), the first link for each book is the title of the book, the second
link says "PDF" and the third says, "mp3."

**News article summaries** —
A web page contains a collection of news articles. The main page lists the first few
sentences of each article, followed by a "Read more" link. A screen reader command
to read the current paragraph provides the context to interpret the purpose of the
link.

## Resources for Link Purpose (In Context)

- [Using Link Titles to Help Users Predict Where They Are Going](https://www.nngroup.com/articles/using-link-titles-to-help-users-predict-where-they-are-going/)

- [WebAIM Techniques for Hypertext Links](http://webaim.org/techniques/hypertext/)

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
