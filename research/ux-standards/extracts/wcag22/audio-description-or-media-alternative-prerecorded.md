---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/audio-description-or-media-alternative-prerecorded
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Audio Description or Media Alternative (Prerecorded)

## In brief

**Goal** — Prerecorded videos can be understood by more people.

**What to do** — Provide a description of the visual content in videos.

**Why it's important** — People who are blind or who cannot understand the visual content can have it described.

## Intent of Audio Description or Media Alternative (Prerecorded)

The intent of this success criterion is to provide people who are blind or visually
impaired access to the visual information in a synchronized media presentation in the same human language as the video or page on which it appears. This
success criterion describes two approaches, either of which can be used.

One approach is to provide audio description of the video content. The audio description
augments the audio portion of the presentation with the information needed when the
video portion is not available. During existing pauses in dialogue, audio description
provides information about actions, characters, scene changes, and on-screen text
that  are important and are not described or spoken in the main sound track.

The second approach involves providing all of the information in the synchronized
media (both visual and auditory) in text form. An alternative for time-based media
provides a running description of all that is going on in the synchronized media content.
The alternative for time-based media reads something like a screenplay or book. Unlike
audio description, the description of the video portion is not constrained to just
the pauses in the existing dialogue. Full descriptions are provided of all visual
information, including visual context, actions and expressions of actors, and any
other visual material. In addition, non-speech sounds (laughter, off-screen voices,
etc.) are described, and transcripts of all dialogue are included. The sequence of
description and dialogue transcripts are the same as the sequence in the synchronized
media itself. As a result, the alternative for time-based media can provide a much
more complete representation of the synchronized media content than audio description
alone.

If there is any interaction as part of the synchronized media presentation (e.g.,
"press now to answer the question") then the alternative for time-based media would
provide hyperlinks or whatever is needed to provide the same functionality.

For 1.2.3, 1.2.5, and 1.2.7, if all of the important information in the video track is already
conveyed in the audio track, no additional audio description is necessary.

1.2.3 Audio Description or Media Alternative (Prerecorded),
1.2.5 Audio Description (Prerecorded), and 1.2.8 Media Alternative (Prerecorded)
overlap somewhat with each other. This is to give the author
some choice at the minimum conformance level, and to provide additional requirements
at higher levels. At Level A in Success Criterion 1.2.3, authors do have the choice
of providing either an audio description or a full text alternative. If they wish
to conform at Level AA, under Success Criterion 1.2.5 authors must provide an audio
description - a requirement already met if they chose that alternative for 1.2.3,
otherwise an additional requirement. At Level AAA under Success Criterion 1.2.8 they
must provide an extended text description. This is an additional requirement if both
1.2.3 and 1.2.5 were met by providing an audio description only. If 1.2.3 was met,
however, by providing a text description, and the 1.2.5 requirement for an audio description
was met, then 1.2.8 does not add new requirements.

See also
[1.2.5 Audio Description (Prerecorded)](audio-description-prerecorded),
[1.2.7 Extended Audio Description (Prerecorded)](extended-audio-description-prerecorded) and
[1.2.8 Media Alternative (Prerecorded)](media-alternative-prerecorded).

## Benefits of Audio Description or Media Alternative (Prerecorded)

- This success criterion may help some people who have difficulty watching video or
other synchronized media content, including people who have difficulty perceiving
or understanding moving images.

## Examples of Audio Description or Media Alternative (Prerecorded)

**A movie with audio description** —

**Describer:**A title, "Teaching Evolution Case Studies. Bonnie Chen." A teacher shows photographs
of birds with long, thin beaks.

**Bonnie Chen:**"These photos were all taken at the Everglades."

**Describer:**The teacher hands each student two flat, thin wooden sticks.

**Bonnie Chen:**"Today you will pretend to be a species of wading bird that has a beak like this."

**Describer:**The teacher holds two of the sticks to her mouth making the shape of a beak.

Transcript of audio based on the first few minutes of "[Teaching Evolution Case Studies, Bonnie Chen](https://www.pbs.org/wgbh/evolution/educators/teachstuds/tvideos.html)" (copyright WGBH and Clear Blue Sky Productions, Inc.)

**An alternative for time-based media for a training video** —
A company purchases a Training video for use by its employees and puts it on the company's
intranet. The video involves explaining use of a new technology and has a person talking
and showing things at the same time. Since there is no place to insert audio description
of the visual demonstrations during gaps in dialogue, the company provides an alternative
for time-based media that all employees, including those who cannot see the demonstrations,
can use to better understand what is being presented.

## Resources for Audio Description or Media Alternative (Prerecorded)

- [Making Audio and Video Media Accessible, W3C Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/media/av/)

- [GBH - Integrate audio descriptions into multimedia presentations using SMIL](https://www.wgbh.org/foundation/services/ncam/tools-resources/accessible-digital-media-guidelines-guideline-h-multimedia)

- [Standard Techniques in Audio Description](http://joeclark.org/access/description/ad-principles.html)

- [Synchronized Multimedia Integration Language (SMIL) 1.0](https://www.w3.org/TR/REC-smil/)

- [Synchronized Multimedia Integration Language (SMIL 2.0)](https://www.w3.org/TR/SMIL/)

- [Accessibility Features of SMIL](https://www.w3.org/TR/SMIL-access/)

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
