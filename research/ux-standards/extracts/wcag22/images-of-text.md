---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/images-of-text
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Images of Text

## In brief

**Goal** — Users can adjust how text is presented.

**What to do** — Use text instead of pictures of text.

**Why it's important** — People cannot alter how text looks in images.

## Intent of Images of Text

The intent of this success criterion is to encourage authors, who are using technologies
which are capable of achieving their desired default visual presentation, to enable
people who require a particular visual presentation of text to be able to adjust the
text presentation as needed. This includes people who require the text in a particular
font size, foreground and background color, font family, line spacing or alignment.

If authors can use text to achieve the same visual effect, they should present
the information as text rather than using an image. If for any reason, the author
cannot format the text to get the same effect, the effect won't be reliably presented
on the commonly available user agents, or using a technology to meet this criterion
would interfere with meeting other criteria such as 1.4.4, then an image of text can
be used. This includes instances where a particular presentation of text is essential
to the information being conveyed, such as type samples, logotypes, branding, etc.
Images of text may also be used in order to use a particular font that is either not
widely deployed or which the author doesn't have the right to redistribute, or to
ensure that the text would be anti-aliased on all user agents.

Images of text can also be used where it is possible for users to customize the image
of text to match their requirements.

The definition of images of text contains the note: This does not include text that is part of a picture that contains significant
other visual content. Examples of such pictures include graphs, screenshots, and diagrams which visually
convey important information through more than just text.

The success criterion is intended to address situations where images of text are used _rather than_ text. Where images of text are used _in addition to_ text to convey the same information, and where both are presented to the user, this success criterion is met. This allows authors to convey content using any styling they desire, while also presenting the information in text, which can then be manipulated by users to make it more distinguishable. This is in contrast to [1.4.9 Images of Text (No Exception)](images-of-text-no-exception), which applies to all images of text, regardless of whether or not they are used _in addition to_ text.

Techniques for satisfying this success criterion are the same as those for Success
Criterion 1.4.9, except that they only need to apply if the visual presentation can
be achieved with the technologies that the author is using. For Success Criterion
1.4.9, the sufficient techniques would be applied only when the user can customize
the output.

See also [1.4.9 Images of Text (No Exception)](images-of-text-no-exception).

## Benefits of Images of Text

- People with low vision who may have trouble reading the text with the authored font
family, size, and/or color can customize all these aspects.

- People with visual tracking problems who may have trouble reading the text with the
authored line spacing and/or alignment can reformat it to increase or decrease line spacing and change the alignment.

- People with cognitive disabilities that affect reading can change and restyle the text to suit their specific needs.

## Examples of Images of Text

**Styled Headings** —
Rather than using bitmap images to present headings in a specific font and size, an
author uses CSS to achieve the same result.

**Dynamically Generated Images** —
A web page uses server-side scripting to present text as an image. The page includes
controls that allow the user to adjust the font size and foreground and background
colors of the generated image.

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

**Customizable font settings in images of text** —
A website allows users to specify font settings and all images of text on the site
are then provided based on those settings.

**The text in an image is also provided as text.** —
A user has to upload an event poster image, which includes text, to their website's events
calendar. The site's CMS (content management system) is limited, and won't allow them to create
a custom HTML/CSS/SVG recreation of the poster. However, in addition to the image, they can add
regular text to the calendar entry, so they post both the poster and the text contained in the image.
This text is shown next to the poster image on the site's calendar page.

## Resources for Images of Text

- [Fundamental text and font styling](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Text_styling/Fundamentals)

- [Web fonts (MDN)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Text_styling/Web_fonts)

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
