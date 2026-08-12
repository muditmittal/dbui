---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Animation from Interactions

## In brief

**Goal** — Users are not harmed or distracted by motion.

**What to do** — Support user preferences for motion, and eliminate unnecessary motion effects.

**Why it's important** — People can get sick from motion effects.

## Intent

The intent of this success criterion is to allow users to prevent animation from being displayed on web pages. Some users experience distraction or nausea from animated content. For example, if scrolling a page causes elements to move (other than the essential movement associated with scrolling) it can trigger vestibular disorders. Vestibular (inner ear) disorder reactions include dizziness, nausea and headaches. Another animation that is often non-essential is parallax scrolling. Parallax scrolling occurs when backgrounds move at a different rate to foregrounds. Animation that is essential to the functionality or information of a web page is allowed by this success criterion.

"Animation from interactions" applies when a user’s interaction initiates non-essential animation. In contrast, [2.2.2 Pause, Stop, Hide](pause-stop-hide.html) applies when the web page initiates animation "automatically" that is not in response to an intentional user activation. There may be situations where a particular animation may fail _both_ success criteria.

The impact of animation on people with vestibular disorders can be quite severe. Triggered reactions include nausea, migraine headaches, and potentially needing bed rest to recover.

**How can a website reduce the chances of triggering a vestibular disorder?** Choose any one of the following solutions. Avoid using unnecessary animation. Provide a control for users to turn off non-essential animations from user interaction. Take advantage of the reduce motion feature in the user agent or operating system.

**What about movement caused by a user scrolling a page?** Moving new content into the viewport is essential for scrolling. The user controls the essential scrolling movement so it is allowed. Only add non-essential animation to the scrolling interaction in a responsible way. Always give users the ability to turn off unnecessary movement.

## Benefits

- **Vestibular Disorder**

People with vestibular disorders need control over movement triggered by interactions. Non-essential movement can trigger vestibular disorder reactions. Vestibular (inner ear) disorder reactions include distraction, dizziness, headaches and nausea.

- Persona Quote: "Stop that extra movement! You are making me so dizzy I cannot concentrate. Now I have to turn off my computer and go lie down."

## Examples

**Parallax scrolling with option to turn off unnecessary motion globally** —
A site includes extra animations when the user scrolls. Decorative elements move in and out of view
horizontally when the essential page content is scrolled vertically. A control at the top of each page
allows the user to turn off unnecessary animations. The ability to turn off non-essential animations is a site-wide setting.

**Transitions that support the reduce motion preference** —
A site includes a non-essential transition when loading new content. The transition is a page-flipping
animation that respects the `prefers-reduced-motion` CSS media query. When the user enables the reduce motion preference,
the page-flipping animation is turned off.

**Essential animation** —
A web application provides a feature to author animated sequences. As part of this tool the author needs to preview the animation.

## Resources

- [Mozilla documentation for `prefers-reduced-motion`](//developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

- [Demonstration of `prefers-reduced-motion` in Webkit](//webkit.org/blog-files/prefers-reduced-motion/prm.htm)

- [An Introduction to the Reduced Motion Media Query](https://css-tricks.com/introduction-reduced-motion-media-query/)

- [Designing Safer Web Animations for Motion Sensitivity](http://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity)

- [**iOS:** Reduce Motion on iPhone, iPad or iPod touch](https://support.apple.com/en-gb/HT202655)

- [**Mac:** Reduce Motion](https://apple.stackexchange.com/questions/253756/speed-up-mission-control-animations-in-macos-sierra)

- [**Windows 10:** Reduce motion](//www.laptopmag.com/articles/disable-minimize-maximize-animations-windows-10)

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
