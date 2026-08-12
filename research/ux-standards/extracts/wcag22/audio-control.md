---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/audio-control
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Audio Control

## In brief

**Goal** — A page that plays music or sounds doesn't disrupt people.

**What to do** — If you play audio content automatically, let people turn it down or off.

**Why it's important** — Sound distracts some people, and also interferes with screen readers.

## Intent of Audio Control

Individuals who use screen reading software can find it hard to hear the speech output
if there is other audio playing at the same time. This difficulty is exacerbated when
the screen reader's speech output is software based (as most are today) and is controlled
via the same volume control as the sound. Therefore, it is important that the user
be able to turn off the background sound.

Having control of the volume includes
being able to reduce its volume to zero. Muting the system volume is not "pausing or stopping" the autoplay audio. Both the "pause or stop" and control of audio volume need to be independent of the overall system volume.

Playing audio automatically when landing on a page may affect a screen reader user's
ability to find the mechanism to stop it because they navigate by listening and automatically
started sounds might interfere with that navigation. Therefore, we discourage the
practice of automatically starting sounds (especially if they last more than 3 seconds),
and encourage that the sound be
_started_ by an action initiated by the user after they reach the page, rather than requiring
that the sound be
_stopped_ by an action of the user after they land on the page.

See also [1.4.7 Low or No Background Audio](low-or-no-background-audio).

In the context of this success criterion, "plays automatically" broadly refers to audio that is not started/played as a direct result of a user's intentional activation. For example, selecting a link or button with clear labelling or context that it will start an experience where audio will play is an example of starting in response to a user's intended action. This criterion is also not intended to apply to a conference call or other interaction where two-way voice communication may take place; the potential for any participant to speak during a conference call is not equivalent to audio that "plays automatically for more than 3 seconds." However, a mechanism to control the volume of conference call output independently from the overall system volume would be a best practice.

## Benefits of Audio Control

- Individuals who use screen reading technologies can hear the screen reader without
other sounds playing. This is especially important for those who are hard of hearing
and for those whose screen readers use the system volume (so they cannot turn sound
down and screen reader up).

- This success criterion also benefits people who have difficulty focusing on visual
content (including text) when audio is playing.

## Examples of Audio Control

- An audio file begins playing automatically when a page is opened. However, the audio
can be stopped by the user by selecting a "silent" link at the top of the page.

## Resources for Audio Control

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
