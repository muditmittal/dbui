---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/reading-level
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Reading Level

## In brief

**Goal** — Users can get a simplified version of complex information.

**What to do** — When text information becomes complex, create a more easily understood version.

**Why it's important** — More people, especially those with cognitive disabilities, can understand the meaning of content.

## Intent of Reading Level

Content should be written as clearly and simply as possible. The intent of this Success
Criterion is:

- to ensure that additional content is available to aid the understanding of difficult
or complex text;

- to establish a testable measure indicating when such additional content is required.

This success criterion helps people with reading disabilities while also allowing
authors to publish difficult or complex web content. Text difficulty is described
in terms of the level of education required to read the text. Education levels are
defined according to the International Standard Classification of Education [[UNESCO]], which was created to allow international comparison among systems of education.

Difficult or complex text may be appropriate for most members of the intended audience
(that is, most of the people for whom the content has been created). But there are
people with disabilities, including reading disabilities, even among highly educated
users with specialized knowledge of the subject matter. It may be possible to accommodate
these users by making the text more readable. If the text cannot be made more readable,
then supplemental content is needed. Supplemental content is required when text demands
reading ability more advanced than the lower secondary education level—that is, more
than nine years of school. Such text presents severe obstacles to people with reading
disabilities and is considered difficult even for people without disabilities who
have completed upper secondary education.

Reading disabilities such as dyslexia make it difficult to recognize written or printed
words and associate them with the correct sounds. This is called "decoding" the text.
Decoding must be automatic in order for people to read fluently. The act of decoding
text word by word consumes much of the mental energy that most people are able to
use for understanding what they read.
Text that uses short, common words and short sentences is easier to decode and usually
requires less advanced reading ability than text that uses long sentences and long
or unfamiliar words.

Educators can measure the education level required to read text content. For
example, qualified teachers can evaluate text according to local education standards
to determine if it requires reading ability beyond what is expected for students in
the last year of lower secondary education.

Because people's names, the names of cities or other proper names cannot be changed
to shorter names with fewer syllables, and because doing so or just referring to everyone
by pronouns can make sentences harder to understand, the success criterion specifies
that proper names can be ignored or removed from the text before assessing whether
it meets the reading ability requirement. Titles refer to the name of documents, books,
movies, etc. Titles are removed or ignored for the analysis because changing the words
in titles might make the titles easier to read but would make it impossible to understand
the item to which the title refers. This would make it harder to read and understand
the content. (e.g., a book, academic paper, article, etc.). Therefore, titles are
also exempted specifically.

When a web page contains multiple languages, a readability result should be calculated
for each language that constitutes at least 5% of the content and that is used in
full sentences or paragraphs (not just individual words or phrases). The overall readability
of the page should be judged on the language that yields the worst readability results.

### Levels of education

**Primary education** —
First 6 years of school

**Lower secondary education** —
7-9 years of school

**Upper secondary education** —
10-12 years of school

**Advanced education** —
More than 12 years of school

Adapted from [International Standard Classification of Education (UNESCO)](https://uis.unesco.org/en/topic/international-standard-classification-education-isced).

According to the Open Society Mental Health Initiative, the concept of Easy to Read
cannot be universal, and it will not be possible to write a text that will suit the
abilities of all people with literacy and comprehension problems. Using the clearest
and simplest language appropriate is highly desirable, but the Accessibility Guidelines Working Group
could not find a way to test whether this had been achieved. The use of reading level
is a way to introduce testability into a success criterion that encourages clear writing.
Supplementary content can be a powerful technique for people with some classes of
cognitive disability.

## Benefits of Reading Level

This success criterion may help people who:

- Have difficulty comprehending and interpreting written language (e.g., articles, instructions,
or newspapers in text or braille), for the purpose of obtaining general knowledge
or specific information

## Examples of Reading Level

**A scientific journal including readable summaries of complex research articles** —
A scientific journal includes articles written in highly technical language aimed
at specialists in the field.  The journal's Table of Contents page includes a plain-language
summary of each article. The summaries are intended for a general audience with eight
years of school. The metadata for the journal uses the Dublin Core specification to
identify the education level of the articles' intended audience as "advanced," and
the education level of the intended audience for the summaries as "lower secondary
education."

**Medical information for members of the public** —
A medical school operates a website that explains recent medical and scientific discoveries.
The articles on the site are written for people without medical training. Each article
uses the Dublin Core metadata specification to identify the education level of the
intended audience as "lower secondary education". A link on each page displays the education level and other
metadata. No supplemental content is required because people who read at the lower
secondary education level can read the articles.

**An e-learning application** —
An on-line course about Spanish cultural history includes a unit on Moorish architecture.
The unit includes text written for students with different reading abilities. Photographs
and drawings of buildings illustrate architectural concepts and styles. Graphic organizers
are used to illustrate complex relationships, and an audio version using synthetic
speech is available. The metadata for each version describes the academic level of
the content. The learning application uses this metadata and metadata about the students
to provide versions of instructional content that match the needs of individual students.

## Resources for Reading Level

- [The US Government's plain language guide series](https://digital.gov/guides/plain-language) provides general information about plain language as well as information about use
of plain language in US Government documents, including legal requirements

- [The Plain English Campaign website](https://www.plainenglish.co.uk/) provides useful information and guidance for authors writing in English.

- [Entry for Audience Education Level. Using Dublin Core – Dublin Core Qualifiers](https://www.dublincore.org/specifications/dublin-core/usageguide/qualifiers/)

- [IMS Learner Information Packaging Model Information Specification, Table 6.3  "accessibility" learner information data structure detailed description](https://www.imsglobal.org/profiles/lipinfo01.html#tab6.3)

- [Inclusion Europe – Easy to read](https://www.inclusion.eu/easy-to-read)

- [Government of Canada: Readability formulas, programs and tools: Do they work for plain language?](https://our-languages.canada.ca/en/blogue-blog/readability-formulas-eng)

- [ISO 24495-1:2023 – Plain language](https://www.iso.org/standard/78907.html)

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
