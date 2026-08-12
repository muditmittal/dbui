---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Visual Presentation

## In brief

**Goal** — Text appearance can be altered by users to meet preferences.

**What to do** — Meet text display requirements or allow users to adjust them.

**Why it's important** — Some text formats are more readable for people with cognitive disabilities and low vision.

## Intent of Visual Presentation

The intent of this success criterion is to ensure that visually  rendered text is
presented in such a manner that it can be perceived  without its layout interfering
with its readability. People with some  cognitive, language and learning disabilities
and some low vision users  cannot perceive the text and/or lose their reading place
if the text is presented in a  manner that is difficult for them to read.

People with some visual or cognitive disabilities need to be  able to select the color
of text and the color of the background. They  sometimes choose combinations that
seem unintuitive to someone without  that disability. Sometimes these combinations
have very low contrast.  Sometimes only very specific color combinations work for
them. Control of color or other aspects of text presentation makes a huge difference
to their comprehension.

For people with some reading or vision disabilities, long  lines of text can become
a significant barrier. They have trouble  keeping their place and following the flow
of text. Having a narrow  block of text makes it easier for them to continue on to
the next line  in a block. Lines should not exceed 80 characters or glyphs (40 if
CJK), where glyphs are the element of writing in the writing system for the text. Studies
have shown that Chinese, Japanese and Korean (CJK) characters are approximately twice
as wide as non-CJK characters when both types of characters are displayed with characteristics
that achieve the same readability, so the maximum line width for CJK characters is
half that of non-CJK characters.

People with some cognitive disabilities find it difficult to track text where the
lines are close together. Providing extra space between lines and paragraphs allows
them to better track the next line and to recognize when they have reached the end
of a paragraph. It is best if there are several different options, for instance, space-and-a-half
and double spacing for line spacing. By space and a half within paragraphs we mean
that top of one line is 150% further from the top of the line below it than would
be true when the text is 'single spaced' (the default spacing for the font). By Paragraph
spacing that is 1.5 times larger than the line spacing we mean that the spacing from
the top of the last line of 1 paragraph is 250% farther from the Top of the first
line of the next paragraph (i.e., that there is a blank line between the two paragraphs
that is 150% of the single space blank line).

People with certain cognitive disabilities have problems  reading text that is both
left and right justified. The uneven spacing  between words in fully justified text
can cause "rivers of white" space  to run down the page making reading difficult and
in some cases  impossible. Text justification can also cause words to be spaced  closely
together, so that it is difficult for them to locate word  boundaries.

The resizing provision ensures that visually rendered text, including
controls and labels using text, can be made larger without requiring the user to then
scroll left and right to see all of the content. When the content has been authored
so that this is possible, the content is said to reflow. This permits people with
low vision and people with cognitive disabilities to increase the size of the text
without becoming disoriented.

The scaling of content is primarily a user agent  responsibility. User agents that
satisfy UAAG 1.0 Checkpoint 4.1 allow  users to configure text scale. The author's
responsibility is to create  web content that does not prevent the user agent from
scaling the  content and that allows the reflow of the content within the current
width of the viewport. See
[1.4.4 Resize Text](resize-text) for additional discussion of resizing text.

The horizontal scrolling requirement is not intended to apply to small-screen devices
where long words may be displayed on a single line and require users to scroll horizontally.
For the purposes of this requirement, authors should ensure that content meets this
requirement on standard desktop/laptop displays with the browser window maximized.
Since people generally keep their computers for several years, it is best not to rely
on the latest desktop/laptop display resolutions but to consider the common desktop/laptop
display resolutions over the course of several years when making this evaluation.

Wrapping should always be possible as long as words are not so long that a single
word is more than half the width of a full screen. Very long URIs may run off the side of an enlarged screen, but they would not be considered text
for "reading" and, therefore, would not violate this provision.

This provision does not mean that a user would never need to use horizontal scrolling.
It only means that they would not need to use horizontal scrolling back and forth
to read a line of text. For example, if a page consisted of two equal sized columns
of text, it would automatically meet this provision. Enlarging the page would mean
that the first column was completely on screen and the user could just scroll vertically
down the page to read it. To read the second column, they would horizontally scroll
to the right, where the right hand column would then fit entirely within the width
of the screen, and read that column without further horizontal scrolling.

## Benefits of Visual Presentation

This success criterion helps low vision users by letting them see  text without distracting
presentational features. It lets them  configure text in ways that will be easier
for them to see by letting  them control the color and size of blocks of text.

This success criterion helps people with cognitive, language  and learning disabilities
perceive text and track their location within  blocks of text.

- People with some cognitive disabilities can read text better when they select their
own foreground and background color combinations.

- People with some cognitive disabilities can track their  locations more easily when
blocks of text are narrow and when they can  configure the amount of space between
lines and paragraphs.

- People with some cognitive disabilities can read text more easily when the spacing
between words is regular.

## Examples of Visual Presentation

The following images show examples of single-spacing, space-and-a-half and double-spaced text in a paragraph.

Examples of glyphs include  "A", "→" (an arrow symbol), and "さ" (a Japanese character).

## Resources for Visual Presentation

- [CSS 2 Box Model](https://www.w3.org/TR/CSS2/box.html)

- [CSS 2 Visual formatting Model](https://www.w3.org/TR/CSS2/visuren.html)

- [CSS 2 Visual formatting Model Details](https://www.w3.org/TR/CSS2/visudet.html)

- [About fluid and fixed width layouts](https://web.archive.org/web/20050419043926/http://www.456bereastreet.com/archive/200504/about_fluid_and_fixed_width_layouts/)

- [Accessible CSS](http://cookiecrook.com/AIR/2003/train/accessiblecss.php)

- [Practical Typography - Line Length](https://practicaltypography.com/line-length.html)

- [Developing sites for users with Cognitive disabilities and learning difficulties](http://juicystudio.com/article/cognitive-impairment.php)

- [RDFA Primer](https://www.w3.org/TR/2007/WD-xhtml-rdfa-primer-20071026/)

- [MULTIFUNK: Bringing computer-supported reading one step further](https://web.archive.org/web/20030407195127/http://publications.nr.no/Multifunk-NR-rapport.pdf), Date: April 2002, ISBN: 82-539-0491-6, Author: Gjertrud W. Kamstrup, Eva Mjøvik,
Anne-Lise Rygvold og Bjørn Gunnar Saltnes

- [Effective Monitor Display Design](http://eric.ed.gov/?id=EJ601947) on the  ERIC web portal

- [Cognitive difficulties and access to information systems - an interaction design perspective](http://www.sigaccess.org/2005/09/september-2005-newsletter/)", Peter Gregor and Anna Dickinson, Applied Computing, University of Dundee

- Legge, G.E., Pelli, D.G., Rubin, G.S., & Schleske, M.M.:Psychophysics of reading.
I. Normal Vision,Vision Research, 25, 239-252, 1985.

- Legge, G.E., Rubin, G.S., Pelli, D.G., & Schleske, M.M.:Psychophysics of reading.
II. Low Vision,Vision Research, 25, 253-266, 1985.

- Osaka,N. and Oda, K. (1991). Effective visual field size necessary for vertical reading
during Japanese text processing. Bulletin of Psychonomic Society,29(4),345-347.

- Beckmann, P.J. & Legge, G.E. (1996). Psychophysics of reading. XIV. The page-navigation
problem in using magnifiers. Vision Research, 36, 3723-3733.

- 川嶋英嗣・小田浩一(2003).読書におけるスクロール方向とウィンドウ幅の影響　日本心理学会第67回大会, 502.

- 小田浩一・今橋真理子(1995). 文字認知の閾値と読みの閾値.  VISION, 7,
165-168.

- Osaka,N. (1994). Size of saccade and fixation duration of eye movements during reading:
psychophysics of Japanese text processing. Journal of Optical Society of America A,
9(1), 5-13.

- 山中今日子・小田浩一 (2007). 漢字の画数と書体のウェイトが視認性に及ぼす
影響. 視覚学会2007年夏季大会ポスター 1p1 Vision, P.167.

- [Line Length, Volume, and Density](http://paul-m-jones.com/post/2008/03/09/line-length-volume-and-density/)

- [Guidance on accessible publishing](http://webarchive.nationalarchives.gov.uk/20130812104657/http://odi.dwp.gov.uk/inclusive-communications/channels/publishing.php)

- [An Accessibility Frontier: Cognitive disabilities and learning difficulties](http://usability.com.au/2004/12/an-accessibility-frontier-cognitive-disabilities-and-learning-difficulties-2004/)

- [Cognitive/Perceptual Difference And Good Web Design](http://leftbrainrightbrain.co.uk/2005/03/08/cognitiveperceptual-difference-and-good-web-design/)

- [6 Surprising Bad Practices That Hurt Dyslexic Users](http://uxmovement.com/content/6-surprising-bad-practices-that-hurt-dyslexic-users/)

- [Design for Dyslexics](https://web.archive.org/web/20070313232158/http://accessites.org/site/2006/11/designing-for-dyslexics-part-3-of-3/)

- [Web Design for Dyslexia](http://www.dyslexia.com/library/webdesign.htm)

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
