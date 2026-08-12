---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/three-flashes
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Three Flashes

## In brief

**Goal** — Content does not trigger seizures.

**What to do** — Do not flash content more than 3 times a second.

**Why it's important** — Flashing content can cause migraines, dizziness, nausea, and seizures.

## Intent of Three Flashes

The purpose of this success criterion is to further reduce the chance of seizures.
Seizures cannot be completely eliminated since some people are so sensitive.  However,
by eliminating all 3-per-second flashing over any area of the screen, the chances
of a person having a seizure are further reduced than when just meeting the measures
ordinarily used today in standards internationally, as we do at Level A.

Compared to [Success Criterion 2.3.1 Three Flashes or Below Threshold](three-flashes-or-below-threshold)
– which allows flashing if it is dim enough or has a small enough area – this criterion
does not allow any flashing that occurs at a frequency greater than 3 per second, regardless
of brightness or size. As a result, even a single flashing pixel would violate this criterion. The
intent is to guard against flashing larger than a single pixel, but since an unknown
amount of magnification or high contrast setting may be applied, the prohibition is
against any flashing.

In some cases, what we refer to as "blinking" and what we refer to as "flashing" may
overlap slightly.  We are using different terms for the two because "blinking" causes
a distraction problem which you can allow for a short time as long as it stops (or
can be stopped) whereas "flashing" is a seizure trigger and cannot be allowed or it
will cause a seizure. The seizure would occur faster than most users could turn it
off.  "Blink" therefore refers to slow repeating changes that would distract.  "Flash"
refers to changes that could cause a seizure if they were bright enough or persisted
long enough. Blinking usually doesn't occur at speeds of 3 per second or more so blink
and flash do not overlap. However, blinking can occur faster than 3 per second so
there could be an overlap. See
[2.2.2 Pause, Stop, Hide](pause-stop-hide) for more information on blink.

## Benefits of Three Flashes

- Individuals who have seizures when viewing flashing material will be able to view
all of the material on a site without having a seizure and without having to miss
the full experience of the content by being limited to text alternatives. This includes
people with photosensitive epilepsy as well as other photosensitive seizure disorders.

## Examples of Three Flashes

- A movie with a scene involving very bright lightning flashes is edited so that the
lightning only flashes three times in any one second period.

## Resources for Three Flashes

- [Harding FPA Web Site](https://www.hardingfpa.com/)

- [Trace Center Photosensitive Epilepsy Analysis Tool (PEAT)](https://trace.umd.edu/peat/)

- [Information about Photosensitive Seizure Disorders](https://trace.umd.edu/information-about-photosensitive-seizure-disorders/)

- [Epilepsy Action](https://www.epilepsy.org.uk/)

- [Epilepsy Foundation - Photosensitivity and Seizures](http://www.epilepsy.com/learn/triggers-seizures/photosensitivity-and-seizures)

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
