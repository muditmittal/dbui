---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Consistent Identification

## In brief

**Goal** — Actions are more predictable across pages.

**What to do** — Identify repeating functions consistently.

**Why it's important** — Consistently identified actions are especially important to people with disabilities.

## Intent of Consistent Identification

The intent of this success criterion is to ensure consistent identification of functional
components that appear repeatedly within a set of web pages. A strategy that people
who use screen readers use when operating a website is to rely heavily on their familiarity
with functions that may appear on different web pages. If identical functions have
different labels (or, more generally, a different [accessible name](https://www.w3.org/TR/accname/#dfn-accessible-name))
on different web pages, the site will be considerably more difficult
to use. It may also be confusing and increase the cognitive load for people with cognitive
limitations. Therefore, consistent labeling will help.

This consistency extends to the text alternatives. If icons or other non-text items
have the same functionality, then their text alternatives should be consistent as
well.

If there are two components on a web page that both have the same functionality as
a component on another page in a set of web pages, then all 3 must be consistent.
Hence the two on the same page will be consistent.

While it is desirable and best practice always to be consistent within a single web
page, 3.2.4 Consistent Identification only addresses consistency within a set of
web pages where something is repeated on more than one page in the set.

## Benefits of Consistent Identification

- People who learn functionality on one page on a site can find the desired functions
on other pages if they are present.

- When non-text content is used in a consistent way to identify components with the
same functionality, people with difficulty reading text or detecting text alternatives
can interact with the web without depending on text alternatives.

- People who depend on text alternatives can have a more predictable experience. They
can also search for the component if it has a consistent label on different pages.

## Examples of Consistent Identification

**Example 1: Document icon button** —
A document icon button is used to indicate document download throughout a site. The text
alternative for the icon always begins with the word “Download," followed by a shortened
form of the document title. Using different text alternatives to identify document
names for different documents is a consistent use of text alternatives.

**Example 2: Check mark toggle** —
A toggle control uses a check mark icon. The toggle is used in different contexts, and has
different accessible names: on one page, it has a text alternative of "approved",
while on another page it has a text alternative of "included".
Since the toggles serve different functions, they can have different text alternatives.

**Example 3: Consistent references to other pages** —
A website publishes articles on-line. Each article spans multiple web pages and
each page contains a link to the first page, the next page and the previous page of
the article. If the references to the next page read "page 2", "page 3", "page 4"
etcetera, the labels are not the same but they are consistent. Therefore, these references
are not failures of this success criterion.

**Example 4: Icon buttons with similar functions** —
An e-commerce application uses a printer icon button that allows the user to print receipts
and invoices. In one part of the application, the printer icon button is labeled "Print receipt"
and is used to print receipts, while in another part it is labeled "Print invoice"
and is used to print invoices. The labeling is consistent ("Print x"), but the labels
are different to reflect the different functions of the icons. Therefore, this example
does not fail the success criterion.

**Example 5: Save icon button** —
A common "save" icon is used for buttons throughout a site where page save function is provided.
These icons all have a consistent text alternative / accessible name.

**Example 6: Icon link and adjacent link to same destination** —
A graphical link containing an icon and a text link are next to each other, and go to the same location.
The best practice would be to group them into one link as per
. However if they are visually positioned one above the other but separated in the
source, this may not be possible. To meet the Success Criterion, the link text for
these two links need only be consistent, not identical. But best practice is to have
identical text so that when users encounter the second one, it is clear that it goes
to the same place as the first.

**Example 7: Example of a Failure** —
A submit "search" button on one web page and a "find" button on another web page both
have a field to enter a term and list topics in the website related to the term submitted.
In this case, the buttons have the same functionality but are not labeled consistently.

**Example 8: Failure primarily impacting assistive technology users** —
Two buttons with the same functionality visually have the same text, but have been given
different `aria-label="..."` accessible names that don't match/include the visible text.
For users of assistive technologies, these two buttons will be announced differently and inconsistently.
Note that this would likely also fail [2.5.3 Label in Name](label-in-name).

## Resources for Consistent Identification

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
