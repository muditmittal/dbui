---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/non-text-content
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Non-text Content

## In brief

**Goal** — Non-text information is available to more people.

**What to do** — Create a text alternative for visual and auditory content.

**Why it's important** — People who can’t fully see or hear content can understand it.

## Intent of Non-text Content

The intent of this success criterion is to make information conveyed by non-text content
accessible through the use of a text alternative.  Text alternatives are a primary
way for making information accessible because they can be rendered through any sensory
modality (for example, visual, auditory or tactile) to match the needs of the user.
Providing text alternatives allows the information to be rendered in a variety of
ways by a variety of user agents. For example, people who cannot see a picture can
have the text alternative read aloud using synthesized speech. People who cannot
hear an audio file can have the text alternative displayed so that they can read
it. In the future, text alternatives will also allow information to be more easily
translated into sign language or into a simpler form of the same language.

### Note on CAPTCHA

CAPTCHAs are a controversial topic in the accessibility community. As is described in the
paper
[Inaccessibility of CAPTCHA](https://www.w3.org/TR/turingtest/), CAPTCHAs intrinsically push the edges of human abilities in an attempt to defeat
automated processes. Every type of CAPTCHA will be unsolvable by users with certain
disabilities. However, they are widely used, and the Web Content Accessibility Guidelines
Working Group believes that if CAPTCHAs were forbidden outright, websites would choose
not to conform to WCAG rather than abandon CAPTCHA. This would create barriers for
a great many more users with disabilities. For this reason the Working Group has chosen
to structure the requirement about CAPTCHA in a way that meets the needs of most people
with disabilities, yet is also considered adoptable by sites. Requiring two different
forms of CAPTCHA on a given site ensures that most people with disabilities will find
a form they can use.

Because some users with disabilities will still not be able to access sites that meet
the minimum requirements, the Working Group provides recommendations for additional
steps. Organizations motivated to conform to WCAG should be aware of the importance
of this topic and should go as far beyond the minimum requirements of the guidelines
as possible. Additional recommended steps include:

- Providing more than two modalities of CAPTCHAs

- Providing access to a human customer service representative who can bypass CAPTCHA

- Not requiring CAPTCHAs for authorized users

### Note on alternatives matching the language of content

Text alternatives and equivalents should match the human language of the original content (normally the default human language of the page). The [5.2 Conformance Requirements]({{ trUrl }}#conformance-reqs) section, through the defined terms used there, states that success criteria be met through accessibility-supported ways (5.2.4), where the technology is used “in the human language of the content.” Where an alternative version is used (5.2.1), it is defined as something that “provides all of the same information and functionality in the same human language.”

### Additional information

Non-text content can take a number of forms, and this success criterion specifies
how each is to be handled.

**For non-text content that is not covered by one of the other situations listed below,**
such as charts, diagrams, audio recordings, pictures, and animations, text alternatives
can make the same information available in a form that can be rendered through any
modality (for example, visual, auditory or tactile).  Short and long text alternatives
can be used as needed to convey the information in the non-text content.  Note that

**prerecorded
audio-only** and

**prerecorded
video-only** files are covered here.
**Live-audio-only** and
**Live-video-only** files are covered below (see 3rd paragraph following this one).

**For non-text content that is a control or accepts user input**, such as images used as submit buttons, image maps or complex animations, a name
is provided to describe the purpose of the non-text content so that the person at
least knows what the non-text content is and why it is there.

**Non-text content that is time-based media**
is made accessible through
[1.2: Time-Based Media](time-based-media).  However, it is important that users know what it is when they encounter it on a
page so they can decide what action if any they want to take with it.  A text alternative
that describes the time-based media and/or gives its title is therefore provided.

**For Live Audio-only and live video-only content**, it can be much more difficult to provide text alternatives that provide equivalent
information as live audio-only and live video-only content. For these types of non-text
content, text alternatives provide a descriptive label.

**Sometimes a test or exercise must be partially or completely presented in non-text
format.**  Audio or visual information is provided that cannot be changed to text because the
test or exercise must be conducted using that sense.  For example, a hearing test
would be invalid if a text alternative were provided.  A visual skill development
exercise would similarly make no sense in text form.  And a spelling test with text
alternatives would not be very effective.  For these cases, text alternatives should
be provided to describe the purpose of the non-text content; of course, the text alternatives
would not provide the same information needed to pass the test.

**Sometimes content is primarily intended to create a specific sensory experience** that words cannot fully capture. Examples include a symphony performance, works of
visual art etc. For such content, text alternatives at least identify the non-text
content with a descriptive label and where possible, additional descriptive text.
If the reason for including the content in the page is known and can be described
it is helpful to include that information.

**Sometimes there are non-text exercises that are used to prove you are human.** To avoid spam robots and other software from gaining access to a site a device called
a CAPTCHA is used. These usually involve visual or auditory tasks that are beyond
the current capabilities of web robots. Providing a text alternative to them would
however make them operable by Robots, thus defeating their purpose. In this case a
text alternative would describe the purpose of the CAPTCHA, and alternate forms using
different modalities would be provided to address the needs of people with different
disabilities.

**Sometimes there is non-text content that really is not meant to be seen or understood
by the user.** Transparent images used to move text over on a page; an invisible image that is used
to track usage statistics; and a swirl in the corner that conveys no information but
just fills up a blank space to create an aesthetic effect are all examples of this.
Putting alternative text on such items just distracts people using screen readers
from the content on the page. Not marking the content in any way, though, leaves users
guessing what the non-text content is and what information they may have missed (even
though they have not missed anything in reality). This type of non-text content, therefore,
is marked or implemented in a way that assistive technologies (AT) will ignore it
and not present anything to the user.

## Benefits of Non-text Content

- This success criterion helps people who have difficulty perceiving visual content.
Assistive technology can read text aloud, present it visually, or convert it to braille.

- Text alternatives may help some people who have difficulty understanding the meaning
of photographs, drawings, and other images  (e.g., line drawings, graphic designs,
paintings, three-dimensional representations), graphs, charts, animations, etc.

- People who are deaf, are hard of hearing, or who are having trouble understanding
audio information for any reason can read the text presentation. Research is ongoing
regarding automatic translation of text into sign language.

- People who are deaf-blind can read the text in braille.

- Additionally, text alternatives support the ability to search for non-text content
and to repurpose content in a variety of ways.

## Examples of Non-text Content

**A data chart** —
A bar chart compares how many widgets were sold in June, July, and August. The short
label says, "Figure one - Sales in June, July and August." The longer description
identifies the type of chart, provides a high-level summary of the data, trends and
implications comparable to those available from the chart. Where possible and practical,
the actual data is provided in a table.

**An audio recording of a speech** —
The link to an audio clip says, "Chairman's speech to the assembly." A link to a text
transcript is provided immediately after the link to the audio clip.

**An animation that illustrates how a car engine works** —
An animation shows how a car engine works. There is no audio and the animation is
part of a tutorial that describes how an engine works. Since the text of the tutorial
already provides a full explanation, the image is an alternative for text and the
text alternative includes only a brief description of the animation and refers to
the tutorial text for more information.

**A traffic web camera** —
A website allows users to select from a variety of web cameras positioned throughout
a major city. After a camera is selected, the image updates every two minutes. A short
text alternative identifies the web camera as "traffic web camera." The site also
provides a table of travel times for each of the routes covered by the web cameras.
The table is also updated every two minutes.

**A photograph of a historic event in a news story** —
A photograph of two world leaders shaking hands accompanies a news story about an
international summit meeting. The text alternative says, "President X of Country X
shakes hands with Prime Minister Y of country Y."

**A photograph of a historic event in content discussing diplomatic relationships** —
The same image is used in a different context intended to explain nuances in diplomatic
encounters. The image of the president shaking hands with the prime minister appears
on a website discussing intricate diplomatic relationships. The first text alternative
reads, "President X of country X shakes hands with Prime Minister Y of country Y on
January 2, 2009." An additional text alternative describes the room where the leaders
are standing as well as the expressions on the leaders' faces, and identifies the
other people in the room. The additional description might be included on the same
page as the photograph or in a separate file associated with the image through a link
or other standard programmatic mechanism.

**An audio recording of a press conference** —
A web page includes a link to an audio recording of a press conference. The link text
identifies the audio recording. The page also links to a text transcript of the press
conference. The transcript includes a verbatim record of everything the speakers say.
It identifies who is speaking as well as noting other significant sounds that are
part of the recording, such as applause, laughter, questions from the audience, and
so on.

**An e-learning application** —
An e-learning application uses sound effects to indicate whether or not the answers
are correct. The chime sound indicates that the answer is correct and the beep sound
indicates that the answer is incorrect. A text description is also included so that
people who can't hear or understand the sound understand whether the answer is correct
or incorrect.

**A linked thumbnail image** —
A thumbnail image of the front page of a newspaper links to the home page of the "Smallville
Times". The text alternative says "Smallville Times".

**The same image used on different sites** —
Different alternatives for an image of the world: An image of the world that is used
on a travel site as a link to the International Travel section has the text alternative
"International Travel". The same image is used as a link on a university website
with the text alternative "International Campuses".

**An image map** —
An image of a building floor plan is interactive, allowing the user to select a
particular room and navigate to a page containing information about that room.
The short text alternative describes the image and its interactive purpose:
"Building floor plan. Select a room for more information."

## Resources for Non-text Content

- [Excerpts from the NBA Tape Recording Manual, Third Edition](https://www.w3.org/2000/08/nba-manual/Overview.html)

- [Inaccessibility of CAPTCHA](https://www.w3.org/TR/turingtest/)

- [All That Malarkey: Accessible Alternatives](https://stuffandnonsense.co.uk/archives/accessible_alternatives.html)

- [456 Berea Street: The Alt and Title Attributes](http://www.456bereastreet.com/archive/200412/the_alt_and_title_attributes/)

- [The Alt and Accessibility](http://green-beast.com/blog/?p=81)

- [Better Connected, Better Results: Alt Text](http://www.accessibilitynews.ca/cwdo/resources/resources.php?resources=187)

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
