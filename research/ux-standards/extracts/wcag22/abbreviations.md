---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/abbreviations
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Abbreviations

## In brief

**Goal** — Users can identify and learn what abbreviations mean.

**What to do** — Provide the expanded form of abbreviations to users.

**Why it's important** — Some people, including those with cognitive disabilities, may not understand the shortened form of words.

## Intent of Abbreviations

The intent of this success criterion is to ensure that users can access the expanded
form of abbreviations.

If an abbreviation has become part of the language, it is exempt from this requirement.
For instance laser was an initialism (and many years ago commonly presented in capital letters as LASER). Now it is most commonly used as a word in its own right, and marking it as an abbreviation (expanding it to Light Amplification through the Stimulated Emission of Radiation) would likely be confusing and unhelpful for people.

If an abbreviation is listed in a common dictionary as a word, that is reasonable grounds to claim it has become part of the language.

Another signal that an abbreviation can be considered to have become part of the language are well-known company/organization names or product trademarks, such as IBM or NASA, that are generally used as words in their own right.

Beyond this, the criterion does not exempt abbreviations even if they are common or familiar.

## Benefits of Abbreviations

This success criterion may help people who:

- have difficulty decoding words;

- rely on screen magnifiers (magnification may reduce contextual cues);

- have limited memory;

- have difficulty using context to aid understanding.

Abbreviations may confuse some readers in different ways:

- Some abbreviations do not look like normal words and cannot be pronounced according
to the usual rules of the language. For example, the English word "room" is abbreviated
as "rm," which does not correspond to any English word or phoneme. The user has to
know that "rm" is an abbreviation for the word "room" in order to say it correctly.

- Sometimes, the same abbreviation means different things in different contexts. For
example, in the English sentence "Dr. Johnson lives on Boswell Dr.," the first "Dr."
is an abbreviation for "Doctor" and the second instance is an abbreviation for the
word "Drive" (a word that means "street"). Users must be able to understand the context
in order to know what the abbreviations mean.

- Some acronyms spell common words but are used in different ways. For example, "JAWS"
is an acronym for a screen reader whose full name is "Job Access with Speech." It
is also a common English word referring to the part of the mouth that holds the teeth.
The acronym is used differently than the common word.

- Some acronyms sound like common words but are spelled differently. For example, the
acronym for Synchronized Multimedia Integration Language, S M I L, is pronounced like
the English word "smile."

It would also help people with visual disabilities who:

- Lose context when zoomed-in with a screen magnifier

## Examples of Abbreviations

**An abbreviation whose expansion is provided the first time the abbreviation appears
in the content** —
The name, "World Wide Web Consortium," appears as the first heading on the organization's
home page. The abbreviation, "W3C," is enclosed in parentheses in the same heading.

**A dictionary search form** —
A website includes a search form provided by an on-line acronym service. Users enter
an acronym and the form returns a list of possible expansions from the sources that
it searched.

**A medical website** —
A medical website provides information for both doctors and patients. The site includes
a set of cascading dictionaries;  a very specialized medical dictionary is first,
followed by a second medical dictionary for the general public. The cascade also includes
a list of acronyms and abbreviations that are unique to the site, and finally there
is a standard dictionary as well. The standard dictionary at the end of the list provides
definitions for most words in the text. The specialized medical dictionary yields
definitions of unusual medical terms. Definitions for words that appear in more than
one dictionary are listed in the order of the cascade. The meaning of acronyms and
abbreviations is provided by the list of acronyms and abbreviations.

**Expanded forms of Abbreviations** —
The expanded form of each abbreviation is available in a programmatically determinable
manner. User agents that speak the text can use the expanded form to announce the
abbreviation. Other user agents might make the expanded form available as a tooltip
or as contextual help for the abbreviation.

## Resources for Abbreviations

- [Acronym finder](http://www.acronymfinder.com/) - You can search with the exact acronym, the beginning of the acronym, wildcards
and reverse lookup.

- [Abbreviations.com](http://www.abbreviations.com/).

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
