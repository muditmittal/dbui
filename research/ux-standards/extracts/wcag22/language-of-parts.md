---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Language of Parts

## In brief

**Goal** — Assistive technology can identify the languages used within a page.

**What to do** — Indicate when words are in a different language.

**Why it's important** — People using assistive technology get information in the correct language.

## Intent of Language of Parts

The intent of this success criterion is to ensure that user agents can correctly present
phrases or passages written in multiple languages. This makes it possible for user agents and
assistive technologies to present content according to the  presentation and pronunciation
rules for that language. This applies to graphical browsers as well as screen readers,
braille displays, and other voice browsers.

Phrases and passages consist of _one or more words_. As a result, even an individual
word can be subject to the requirements of this criterion, unless it falls under one of the
exceptions.

Both assistive technologies and conventional user agents can render text more accurately
if the language of each passage of text is identified. Screen readers can use the
pronunciation rules of the language of the text. Visual browsers can display characters
and scripts in appropriate ways. This is especially important when switching between
languages that read from left to right and languages that read from right to left,
or when text is rendered in a language that uses a different alphabet. Users with
disabilities who know all the languages used in the web page will be better able to
understand the content when each passage is rendered appropriately.

When no other language has been specified for a phrase or passage of text, its human
language is the default human language of the web page (see [Success Criterion 3.1.1 Language of Page](language-of-page)).
So the human language of all content in single language documents can be programmatically
determined.

In certain situations or modes of operation, screen readers and other assistive technologies will announce an element using its computed [accessible name](https://www.w3.org/TR/accname/#dfn-accessible-name). As an example, this currently happens in most commonly available screen readers when accessing the isolated list of links in the current page.

Accessible names are "flat" strings, and don't contain any structure or information. Despite being correctly denoted in the underlying code or markup, changes in the natural language of content are not exposed to assistive technologies in these cases. As a result, assistive technologies won't switch pronunciation rules or voice/language packs for the specified language(s). While there may be workarounds for certain simple cases – such as moving the `lang` language attribute to the element itself, rather than indicating a change of language on a child nodes inside the element – these may not work in all user agent/assistive technology combinations.

As these problems are caused by limitations of user agents and assistive technologies, and are outside of an author's control, they _don't fail_ the requirements of this success criterion. When evaluating content against this success criterion, auditors can therefore not solely rely on the spoken output from assistive technologies, but must verify whether or not changes in natural language have been identified correctly in the underlying code or markup.

While the concept and definition of _proper names_ varies across languages,
it generally refers to a name which is taken to distinctly identify its referent – including,
but not limited to, a product's brand name or the name of a specific person or place. Proper names can be used
across languages without translation (though it may be transliterated from its original writing system). Proper names
generally don't require an explicit programmatic change of language. As a simple example, in an English
document about philosophy, the name "Albert Camus" does _not_ need to be explicitly denoted
as being in French.

Individual words or phrases in one language can become part of another language. For
example, "rendezvous" is a French word that has been adopted in English, appears in
English dictionaries, and is properly pronounced by English screen readers. Hence
a passage of English text may contain the word "rendezvous" without specifying that
its human language is French and still satisfy this success criterion. Frequently,
when the human language of text appears to be changing for a single word, that word
has become part of the language of the surrounding text. Because this is so common
in some languages, single words should be considered part of the language of the surrounding
text unless it is clear that a change in language was intended. If there is doubt
whether a change in language is intended, consider whether the word would be pronounced
the same (except for accent or intonation) in the language of the immediately surrounding
text.

Pronunciation quality and accuracy can vary significantly across
screen readers and speech synthesizers.

Although a borrowed French word like “rendezvous” may be pronounced
intelligibly in an English context, others may not. This can be
especially true of [proper
names](#:~:text=While%20the%20concept,being%20in%20French.).

Though **not normatively required** to satisfy this
success criterion, it’s a best practice to programmatically indicate
the source language of these words to encourage accurate
pronunciation and improve understandability. For example, using the
`lang` attribute in HTML:

`It can be a <span lang="fr">faux pas</span> to omit the <code>lang</code> attribute.`

When the language of the part uses a different writing system (or a transliteration)
than the language of the page, explicitly specifying the source language is
especially helpful for accurate pronunciation:

`Good <span lang="zh-Latn-pinyin">feng shui</span> begins with good markup.`

Most professions require frequent use of technical terms which may originate from
a foreign language. Such terms are usually not translated to all languages. The universal
nature of technical terms also facilitate communication between professionals.

Some common examples of technical terms include: Homo sapiens, Alpha Centauri, hertz,
and habeas corpus.

Identifying changes in language is important for a number of reasons:

- It allows braille translation software to follow changes in language, e.g., substitute
control codes for accented characters, and insert control codes necessary to prevent
erroneous creation of Grade 2 braille contractions.

- Speech synthesizers that support multiple languages will be able to speak the text
in the appropriate accent with proper pronunciation. If changes are not marked, the
synthesizer will try its best to speak the words in the  default language it works
in. Thus, the French word for car, "voiture" would be pronounced "voyture" by a speech
synthesizer that uses English as its default language.

- Marking changes in language can benefit future developments in technology, for example
users who are unable to translate between languages themselves will be able to use
machines to translate unfamiliar languages.

- Marking changes in language can also assist user agents in providing definitions using
a dictionary.

## Benefits of Language of Parts

This success criterion helps:

- people who use screen readers or other technologies that convert text into synthetic
speech;

- people who find it difficult to read written material with fluency and accuracy, such
as recognizing characters and alphabets, decoding words, and understanding words and
phrases;

- people with certain cognitive, language and learning disabilities who use text-to-speech
software;

- people who rely on captions to recognize language changes in the soundtrack of synchronized
media content.

## Examples of Language of Parts

### A German phrase in an English sentence

In the sentence, "He maintained that the DDR (German Democratic Republic) was just a 'Treppenwitz der Weltgeschichte'," the German phrase 'Treppenwitz der Weltgeschichte' is marked as German. Depending on the markup language, English may either be marked as the language for the entire document except where specified, or marked at the paragraph level. When a screen reader encounters the German phrase, it changes pronunciation rules from English to German to pronounce the word correctly.

### Alternative language links

An HTML web page includes links to versions of the page in other languages (e.g.,
Deutsch, Français, Nederlands, Catalan, etc.). The text of each link is the name of the language, in that language. The language of each link is indicated via a `lang` attribute.
`<ul>
<li><a href="..." lang="de">Deutsch</a></li>
<li><a href="..." lang="it">Italiano</a></li>
<li><a href="..." lang="fr">Français</a></li>
...
<li><a href="..." lang="zh-hant">繁體中文</a></li>
</ul>`

### "Podcast" used in a French sentence

Because "podcast" is part of the vernacular of the immediately surrounding text in the following excerpt, "À l'occasion de l'exposition "Energie éternelle. 1500 ans d'art indien", le Palais des Beaux-Arts de Bruxelles a lancé son premier podcast. Vous pouvez télécharger ce podcast au format M4A et MP3", no indication of language change is required.

### The element's content and attribute values are in different languages

This example assumes that the page's default content is in English. The link's `title` attribute is in English, but the nested `span` element that contains the word Español has a `lang="es"` attribute.

`<a title="Spanish" href="qa-html-language-declarations-es.html"><span lang="es">Español</span></a>`

## Resources for Language of Parts

- [HTML - The `lang` and `xml:lang` attributes](https://html.spec.whatwg.org/multipage/dom.html#attr-lang).

- [Language tags in HTML and XML](https://www.w3.org/International/articles/language-tags/index.en).

- [Authoring HTML: Language declarations](https://www.w3.org/TR/i18n-html-tech-lang/).

- [Declaring language in HTML](https://www.w3.org/International/questions/qa-html-language-declarations)

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
