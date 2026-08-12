---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Pause, Stop, Hide

## In brief

**Goal** — Fewer users are distracted by content that updates or moves.

**What to do** — Let users control content changes that occur in parallel with other content.

**Why it's important** — Some people with cognitive disabilities and attention deficits are distracted by continuous movement.

## Intent of Pause, Stop, Hide

The intent of this success criterion is to avoid distracting users during their interaction
with a web page.

In the context of this Success Criterion, "starts automatically" broadly refers to animations/updates
that are not the direct result of a user's intentional activation, for example, selecting a link or button.

"Moving, blinking and scrolling" refers to content in which the visible content conveys
a sense of motion. Common examples include motion pictures, synchronized media presentations,
animations, real-time games, and scrolling stock tickers. "Auto-updating" refers to
content that updates or disappears based on a preset time interval. Common time-based
content includes automatically updated weather information, news, stock price
updates, and auto-advancing presentations and messages. The requirements for moving,
blinking and scrolling content and for auto-updating content are the same except that:

- authors have the option of providing the user with a means to control the frequency of updates when content is auto-updating and

- there is no five second exception for auto-updating since it makes little sense to auto-update for a few seconds and then stop

Content that moves or auto-updates can be a barrier to anyone who has trouble reading
stationary text quickly as well as anyone who has trouble tracking moving objects.
It can also cause problems for screen readers.

Moving content can also be a severe distraction for some people. Certain groups, particularly
those with attention deficit disorders, find blinking content distracting, making
it difficult for them to concentrate on other parts of the web page. Five seconds
was chosen because it is long enough to get a user's attention, but not so long that
a user cannot wait out the distraction if necessary to use the page.

Content that is paused can either resume in real-time or continue playing from the
point in the presentation where the user left off.

-

Pausing and resuming where the user left off is best for users who want to pause to
read content and works best when the content is not associated with a real-time event
or status.

See [2.2.1 Timing Adjustable](timing-adjustable) for additional requirements related to time-limits for reading and interactions.

-

Pausing and jumping to current display (when pause is released) is better for information
that is real-time or "status" in nature. For example, weather radar, a stock ticker,
a traffic camera, or an auction timer, would present misleading information if a pause
caused it to display old information when the content was restarted.

Hiding content would have the same result as pausing and jumping to current display (when pause is released).

For a mechanism to be considered "a mechanism for the user to pause," it must provide
the user with a means to pause that does not tie up the user or the focus so that
the page cannot be used.  The word "pause" here is meant in the sense of a "pause
button" although other mechanisms than a button can be used.   Having an animation
stop only so long as a user has focus on it (where it restarts as soon as the user
moves the focus away) would not be considered a "mechanism for the user to pause"
because it makes the page unusable in the process and would not meet this SC.

This success criterion is specifically concerned with moving, blinking, scrolling, and
auto-updating visual content. For audio content that starts automatically, refer to [1.4.2 Audio Control](audio-control).

Moving, blinking, scrolling, auto-updating content is considered to _start automatically_ either when it starts
_without_ direct user activation or interaction (such as activating a button),
or when it starts as a result of an _indirect interaction_ (such as focusing/hovering
over an element, or scrolling an element into view). Content that
starts automatically from an indirect interaction also potentially fails
[2.3.3 Animation from Interactions](animation-from-interactions).

It is important to note that the terms "blinking" and "flashing" can sometimes refer to the same content.

- "Blinking" refers to content that causes a distraction problem. Blinking can be allowed
for a short time as long as it stops (or can be stopped)

- "Flashing" refers to content that can trigger a seizure (if it is more than 3 per
second and large and bright enough). This cannot be allowed even for a second or it
could cause a seizure. And turning the flash off is also not an option since the seizure
could occur faster than most users could turn it off.

- Blinking usually does not occur at speeds of 3 per second or more, but it can. If
blinking occurs faster than 3 per second, it would also be considered a flash.

"Flashing" content that starts automatically will also need to be evaluated against [2.3.1 Three Flashes or Below Threshold](three-flashes-or-below-threshold)
and [2.3.2 Three Flashes](three-flashes).

As a best practice, if a page contains more than one moving, blinking, scrolling, or auto-updating element,
provide a _single_ mechanism to pause, stop, hide, or (in the case of auto-updating content)
control the update frequency that affects all these elements at the same time.

While having separate controls for each of the elements _does_ satisfy the normative requirements
of this success criterion, this won't result in a good user experience for users, who will be forced to manually
pause, stop, hide, or control each moving, blinking, scrolling, or auto-updating element in isolation.

## Benefits of Pause, Stop, Hide

- Providing content that stops blinking after five seconds or providing a mechanism
for users to stop blinking content allows people with certain disabilities to interact
with the web page.

- One use of content that blinks is to draw the visitor's attention to that content.
Although this is an effective technique for all users with vision, it can be a problem
for some users if it persists. For certain groups, including people with low literacy,
reading and intellectual disabilities, and people with attention deficit disorders,
content that blinks may make it difficult or even impossible to interact with the
rest of the web page.

## Examples of Pause, Stop, Hide

**An essential animation can be paused without affecting the activity** —
A website helps users understand 'how things work' through animations that demonstrate
processes. Animations have "pause" and "restart" buttons.

**A stock ticker** —
A stock ticker has "pause" and "restart" buttons. Pausing the ticker causes it to
pause on the currently displayed stock. Restarting causes the ticker to resume from
the stopped point but with a notice that the display is delayed. Since the intent
of the stock ticker is usually to provide realtime information, there might also be
a button that would advance the ticker to the most recently traded stock.

**A game is designed so that users take turns rather than competing in real-time** —
One party can pause the game without invalidating the competitive aspect of it.

**A web advertisement** —
An advertisement blinks to get viewers attention but stops after 5 seconds

**A form prompt** —
A form blinks an arrow near the submit button if a user finishes filling out the form
but does not activate the submit button. The blinking stops after 5 seconds.

**An animation** —
An animation runs in the upper portion of the page but has a "freeze animation" button
near the bottom of the animation.

**A "loading" animation** —
A preloader animation is shown on a page which requires a certain percentage of a
large file to be downloaded before playback can begin. The animation is the only content
on the page and instructs the user to please wait while the video loads. Because the
moving content is not presented in parallel with other content, no mechanism to pause,
stop or hide it needs to be provided, even though the animation may run for more than
5 seconds for users with slower connections.

**A full-page advertisement** —
A site requires that all users view a 15 second advertisement before they can access
free content available from their site. Because viewing the advertisement is a requirement
for all users and because it is not presented in parallel with other content, no mechanism
to pause, stop or hide it needs to be provided.

## Resources for Pause, Stop, Hide

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
