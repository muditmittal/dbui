---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Three Flashes or Below Threshold

## In brief

**Goal** — Content does not trigger seizures.

**What to do** — Avoid content that flashes, or keep it under thresholds.

**Why it's important** — Flashing content can cause migraines, dizziness, nausea, and seizures.

## Intent of Three Flashes or Below Threshold

The intent of this success criterion is to allow users to access the full content
of a site without inducing seizures due to photosensitivity.

Individuals who have photosensitive seizure disorders can have a seizure triggered
by content that flashes at certain frequencies for more than a few flashes. People
are even more sensitive to red flashing than to other colors, so a special test is
provided for saturated red flashing. These guidelines were originally based on guidelines for
the broadcasting industry as adapted for desktop monitors, where content is viewed
from a closer distance (using a larger angle of vision).

Flashing can be caused by the display, the computer rendering the image or by the
content being rendered. The author has no control of the first two. They can be addressed
by the design and speed of the display and computer. The intent of this criterion
is to ensure that flicker that violates the flash thresholds is not caused by the
content itself. For example, the content could contain a video clip or animated image
of a series of strobe flashes, or close-ups of rapid-fire explosions.

This success criterion replaces a much more restrictive criterion in WCAG 1.0 that
did not allow any flashing (even of a single pixel) within a broad frequency range
(3 to 50 Hz). This success criterion is based on existing specifications in use in
the UK and by others for television broadcast and has been adapted for computer display
viewing. In WCAG 2.0, a 1024 x 768 screen was used as the reference screen resolution for the
evaluation. The 341 x 256 pixel block represents a 10 degree viewport at a typical
viewing distance. (The 10 degree field is taken from the original specifications and
represents the central vision portion of the eye, where people are most susceptible
to photo stimuli.)

With the proliferation of devices of varying screen sizes (from small handhelds to large living room displays), as well as the adoption of CSS pixels as a density-independent unit of measurement, the prior assessment criteria may seem outdated. However, an image of a consistent size uses up relatively the same percentage of a user's visual field on any device. On a large screen, the image takes up less size, but the large screen takes up a larger part of the visual field. On a mobile screen, the image may take up most or all of the screen; however, the mobile screen itself takes up a smaller portion of the user's visual field. So the same dimension of the flashing content, represented in CSS pixels can still provide a consistent means of assessment. Substituting CSS pixels for the original pixel block means that the combined area of flashing becomes 341 x 256 CSS pixels, or a flashing area of 87,296 CSS pixels.

Content should be analyzed at the largest scale at which a user may view the content, and at the standard zoom level of the user agent. For example, with a video that may play in an area of a web page and also at full screen, the video should be analyzed for risks at full screen.

Where video content is provided in color spaces other than sRGB, the version provided with the highest dynamic range should be tested. In such cases the industry standard definition of a general flash is a change in luminance of 20 cd/m2 or more where the darker image is below 160 cd/m2. ([ITU-R BT.1702](https://www.itu.int/rec/R-REC-BT.1702/).) This is applicable for standard dynamic range (SDR) and high dynamic range (HDR) content. For HDR content when the darker state is 160 cd/m2 or more, a general flash is one where the Michelson contrast is 1/17 or greater — where the Michelson contrast is calculated as (LHigh - LLow) / (LHigh + LLow), and where LHigh and LLow are the luminance of the high and low luminance states, respectively.

For short clips that might be looped (such as GIF animations), the content should be analyzed while looping.

The specification cannot account for the actual viewing distance that a person chooses. Users that are closer to their screens than the idealized viewing distance will be affected by flashing areas that normatively pass. The same problem applies to users who rely on zoom or screen magnification. Conversely, users who are further away from the screen than the idealized distance should be able to tolerate flashing areas that are larger than the threshold.

The combined area of flashes occurring concurrently and contiguously means the total
area that is actually flashing at the same time. It is calculated by adding up the
contiguous area that is flashing simultaneously within any 10 degree angle of view.

The terms "blinking" and "flashing" can sometimes refer to the same content.

- "Blinking" refers to content that causes a distraction problem. Blinking can be allowed
for a short time as long as it stops (or can be stopped)

- "Flashing" refers to content that can trigger a seizure (if it is more than 3 per
second and large and bright enough). This cannot be allowed even for a second or it
could cause a seizure. And turning the flash off is also not an option since the seizure
could occur faster than most users could turn it off.

- Blinking usually does not occur at speeds of 3 per second or more, but it can. If
blinking occurs faster than 3 per second, it would also be considered a flash.

The new working definition in the field for **"pair of opposing transitions involving a saturated red"** is a pair of opposing transitions where, one transition is either to or from a state with a value R/(R + G + B) that is greater than or equal to 0.8, and the difference between states is more than 0.2 (unitless) in the CIE 1976 UCS chromaticity diagram. [ISO 9241-391]

The chromaticity difference is calculated as:

- `SQRT( (u'1 - u'2)^2 + (v'1 - v'2)^2 )`

where u'1 and v'1 are chromaticity coordinates of State 1 and u'2 and v'2 are chromaticity coordinates of State 2. The 1976 UCS chromaticity coordinates of u' and v' are calculated as:

- `u' = 4 * X / (X + 15 * Y + 3 * Z)`

- `v' = 9 * Y / (X + 15 * Y + 3 * Z)`

where X, Y, and Z are the tristimulus values of a color in the CIE XYZ colorspace, which can be calculated as:

- `X = 0.4124564 * R + 0.3575761 * G + 0.1804375 * B`

- `Y = 0.2126729 * R + 0.7151522 * G + 0.0721750 * B`

- `Z = 0.0193339 * R + 0.1191920 * G + 0.9503041 * B`

where R, G, & B are values that range from 0-1 as specified in “relative luminance” definition.

## Benefits of Three Flashes or Below Threshold

- Individuals who have seizures when viewing flashing material will be able to view
all of the material on a site without having a seizure and without having to miss
the full experience of the content by being limited to text alternatives. This includes
people with photosensitive epilepsy as well as other photosensitive seizure disorders.

## Examples of Three Flashes or Below Threshold

- A website has video of muzzle flash of machine gun fire, but limits the size of the
flashing image to a small portion of the screen below the flash threshold size.

- A movie with a scene involving very bright lightning flashes is edited so that the
lightning only flashes three times in any one second period.

## Resources for Three Flashes or Below Threshold

- [Harding FPA Web Site](https://www.hardingfpa.com/)

- [Trace Center Photosensitive Epilepsy Analysis Tool (PEAT)](https://trace.umd.edu/peat/)

- [Information about Photosensitive Seizure Disorders](https://trace.umd.edu/information-about-photosensitive-seizure-disorders/)

- [Epilepsy Action](https://www.epilepsy.org.uk/)

- [Epilepsy Foundation - Photosensitivity and Seizures](http://www.epilepsy.com/learn/triggers-seizures/photosensitivity-and-seizures)

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
