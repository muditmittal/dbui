---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/pronunciation
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Pronunciation

## In brief

**Goal** — Users can identify the pronunciation of ambiguous words.

**What to do** — Indicate how to pronounce a word, where its meaning is otherwise unclear.

**Why it's important** — Some people, including those with cognitive disabilities, may not understand the meaning of content.

## Intent of Pronunciation

The intent of this success criterion is to help people who are blind, people who have
low vision, and people with reading disabilities to understand content in cases where
meaning depends on pronunciation. Often words or characters have different meanings,
each with its own pronunciation. The meaning of such words or characters can usually
be determined from the context of the sentence. However, for more complex or ambiguous
sentences, or for some languages, the meaning of the word cannot be easily determined
or determined at all without knowing the pronunciation. When the sentence is read
aloud and the screen reader reads the word using the wrong pronunciation, it can be
even more difficult to understand than when read visually. When words are ambiguous
or indeterminate unless the pronunciation is known, then providing some means of determining
the pronunciation is needed.

For example, in the English language heteronyms are words that are spelled the same
but have different pronunciations and meanings, such as the words desert (abandon)
and desert (arid region). If the proper pronunciation can be determined from the context
of the sentence, then nothing is required.  If it cannot then some mechanism for determining
the proper pronunciation would be required. Additionally, in some languages certain
characters can be pronounced in different ways. In Japanese, for example, there are
characters like Han characters (kanji) that have multiple pronunciations. Screen readers
may speak the characters incorrectly without the information on pronunciation. When
read incorrectly, the content will not make sense to users.

## Benefits of Pronunciation

This success criterion may help people who:

- have difficulty decoding words

- have difficulty using context to aid understanding

- use technologies that read the words aloud

## Examples of Pronunciation

**Giving the reading of a person's name** —
Web content in Japanese provides kana (Japanese phonetic syllabary characters) written
next to Han characters (kanji)  show the pronunciation of a person's name. The kana
is provided to users in parentheses right after the word. Giving the reading of the
words written in Han characters (kanji) allows both sighted users and screen readers
to read/pronounce the words correctly. Note that screen readers will speak the word
twice: the Han characters (kanji) that can be pronounced in a wrong way are read first
and then kana is spoken in order to provide the correct reading.

**Showing the reading of the words by ruby element** —
Web content using HTML provides kana (phonetic syllabary characters) written
above the characters to show the reading (pronunciation) of the words by using the
ruby element.

**Providing sound files of the pronunciation** —
A document includes some words whose meaning cannot be determined without knowing
the correct pronunciation. Each word is linked to a sound file that gives the correct
pronunciation. Users can select these links to find out how to pronounce the words.

**Including pronunciation information in the glossary** —
A web page includes a glossary section. Some items in the glossary include pronunciation
information as well as definitions. Words in the content whose meaning cannot be determined
without knowing their pronunciation are linked to the appropriate entries in the glossary.

**Text that includes pronunciation information for characters shared by several languages
but pronounced differently in each language** —
A Japanese university website includes several short phrases quoted from scholarly
texts in Chinese and Korean. The quotations are written using the same script as the
Japanese text. Pronunciation information is provided to show the correct reading of
the Chinese and Korean characters.

For Japanese, the ruby element is used for showing the "reading" rather than "pronunciation."

## Resources for Pronunciation

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
