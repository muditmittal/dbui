---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/audio-only-live
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Audio-only (Live)

## In brief

**Goal** — Live audio can be understood by more people.

**What to do** — Provide a text equivalent for live audio-only content.

**Why it's important** — People who cannot hear or understand real-time audio can read an equivalent.

## Intent of Audio-only (Live)

The intent of this success criterion is to make information conveyed by live audio,
such as web-based audio conferencing, live speeches and radio Webcasts, accessible through the
use of a text alternative. A live text caption service will enable live audio to be
accessible to people who are deaf or hard of hearing, or who cannot otherwise hear
the audio. Such services use a trained human operator who listens in to what is being
said and uses a special keyboard to enter the text with only a small delay. They are
able to capture a live event with a high degree of fidelity, and also to insert notes
on any non spoken audio which is essential to understanding the event. A transcript
is sometimes a possibility if the live audio is following a set script; but a live
caption service is preferred because it plays out at the same pace as the audio itself,
and can adapt to any deviations from the script that might occur.

Using untrained operators, or providing a transcript which differs markedly from what
actually happens would not be considered meeting this success criterion.

This success criterion was intended to apply to broadcast of audio and is not intended
to require that two-way audio calls between two or more individuals through web apps
must be captioned regardless of the needs of users. Responsibility for providing captions
would fall to the content providers (the callers) or the “host” caller, and not the
application.

## Examples of Audio-only (Live)

- A public relations firm uses web-based caption services to cover live events; the
output from the service is incorporated in a sub frame of the web page which includes
the streaming audio control.

- A live radio play of a fringe theatre group is being broadcast to the web. As the
actors stick largely to a set script, and the budget for the program is small, the
producers provide a link (with the playwright's permission) to the script of the play.

- A streaming audio server uses a technology which can also accommodate text and graphics,
such as HTML. A stenographer is used to create live captions at an
event, and these are mixed on the fly to produce live captions in the media stream
which can be viewed by the media player.

- A CEO is to give a press release by telephone to the media in response to a breaking
news story, the audio is being recorded and streamed over the internet, but due to
time constraints a web captioning service cannot be set up in time. As the press release
is a set statement which the CEO will be reading out, the company simultaneously provides
the transcript of the release.

## Resources for Audio-only (Live)

- [WebAIM Real time captioning resource](https://webaim.org/techniques/captions/realtime)

- [uiAccess list of transcription services](http://www.uiaccess.com/transcripts/transcript_services.html)

- [Transcripts on the Web: Getting people to your podcasts and videos](http://www.uiaccess.com/transcripts/transcripts_on_the_web.html)

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
