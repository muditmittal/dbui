---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/images-of-text-no-exception
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Images of Text (No Exception)

## In brief

**Goal** — Users can always adjust how text is presented.

**What to do** — Do not use pictures of text unless there is no other way to present information.

**Why it's important** — People cannot alter how text looks in images.

## Intent of Images of Text (No Exception)

The intent of this success criterion is to enable people who require a particular
visual presentation of text to be able to adjust the text presentation as required.
This includes people who require the text in a particular font size, foreground and
background color, font family, line spacing or alignment.

This means implementing the text in a manner that allows its presentation to be changed
or providing a mechanism by which users can select an alternate presentation. Using
images of text is an example of an implementation that does not allow users to alter
the presentation of the text within it.

In some situations, a particular visual presentation of the text is essential to the
information being conveyed. This means that information would be lost without that
particular visual presentation. In this case implementing the text in a manner that
allows its presentation to be changed is not required. This includes text that demonstrates
a particular visual aspect of the text, such as a particular font family, or text
that conveys an identity, such as text within a company logo.

Text that is decorative does not require implementing the text in a manner that allows
its presentation to be changed.

The definition of image of text contains the note: Note: This does not include text that is part of a picture that contains significant
other visual content. Examples of such pictures include graphs, screenshots, and diagrams which visually
convey important information through more than just text.

## Benefits of Images of Text (No Exception)

- People with low vision (who may have trouble reading the text with the authored font
family, size and/or color).

- People with visual tracking problems (who may have trouble reading the text with the
authored line spacing and/or alignment).

- People with cognitive disabilities that affect reading.

## Examples of Images of Text (No Exception)

**A quote** —
A web page contains a quote. The quote itself is presented as italicized text, indented
from the left margin. The name of the person to whom the quote is attributed is below
the quote with 1.5x the line space and further indented from the left margin. CSS
is used to position the text; set the spacing between lines; as well as display the
text's font family, size, color and decoration.

**Navigation items** —
A web page contains a menu of navigation links that have both an icon and text to
describe their target. CSS is used to display the text's font family, size and foreground
and background colors; as well as the spacing between the navigation links.

**A logo containing text** —
A website contains the organization's logo in the top left corner of each web page.
The logo contains logotype (text as part, or all, of the logo). The visual presentation
of the text is essential to the identity of the logo and is included as a gif image
which does not allow the text characteristics to be changed. The image has a text
alternative.

**Representation of a font family** —
A web page contains information about a particular font family. Substituting the font
family with another font would defeat the purpose of the representation. The representation
is included as a jpeg image which does not allow the text characteristics to be changed.
The image has a text alternative.

**A representation of a letter** —
A web page contains a representation of an original letter. The depiction of the letter
in its original format is essential to information being conveyed about the time period
in which it was written. The letter is included as a gif image which does not allow
the text characteristics to be changed. The image has a text alternative.

**Symbolic text characters** —
A form allows users to enter blocks of text. The form provides a number of buttons,
including functions to style the text and check spelling. Some of the buttons use
text characters that do not form a sequence that expresses something in human language.
For example "B" to increase font weight, "I" to italicize the text and "ABC" to check
the spelling. The symbolic text characters are included as gif images which do not
allow the text characteristics to be changed. The buttons have text alternatives.

## Resources for Images of Text (No Exception)

- [CSS @ Ten: The Next Big Thing (A List Apart)](http://alistapart.com/article/cssatten)

- [Weblog comments: WebKit now supports CSS @font-face rules](http://clagnut.com/blog/2042/)

- [Creating Cross Browser Compatible CSS Text Shadows](http://www.workingwith.me.uk/articles/css/cross-browser-drop-shadows)

- [CSS and text](http://www.yourhtmlsource.com/stylesheets/csstext.html)

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
