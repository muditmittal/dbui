---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Content on Hover or Focus

## In brief

**Goal** — More users can perceive and dismiss non-persistent content.

**What to do** — If hover or focus causes content changes, ensure interaction is predictable.

**Why it's important** — Unpredictable temporary content can be hard for some to consume and may disrupt others.

## Intent

Additional content that appears and disappears in coordination with keyboard focus or pointer hover often leads to accessibility issues. Reasons for such issues include:

- the user may not have intended to trigger the interaction

- the user may not know new content has appeared

- the new content may interfere with a user's ability to do a task

Examples of such interactions can include custom tooltips, sub-menus and other non-modal popups which display on hover and focus. The intent of this success criterion is to ensure that authors who cause additional content to appear and disappear in this manner must design the interaction in such a way that users can:

- perceive the additional content AND

- dismiss it without disrupting their page experience.

There are usually more predictable and accessible means of adding content to the page, which authors are recommended to employ. If an author _does_ choose to make additional content appear and disappear in coordination with hover and keyboard focus, this success criterion specifies three conditions that must be met:

- dismissible

- hoverable

- persistent

Each of these is discussed in a separate section.

### Dismissible

The intent of this condition is to ensure that the additional content does not interfere with viewing or operating the page's original content. Particularly for screen magnification users, the portion of the page visible in the viewport can be significantly reduced. The magnified view generally follows the mouse pointer or keyboard focus, so screen magnification users navigate by moving the mouse or moving the keyboard focus to pan the magnified viewport and display another portion of the screen. However, if additional content is displayed on hover or focus, it can make this type of navigation difficult – users won't be able to see the actual page content, as it will be covered by the additional content instead. For this reason, it's important to provide a way for users to dismiss any additional content without the need to move their mouse or keyboard focus, such as pressing the `Esc` key.

The condition includes two exemptions where being able to dismiss the additional content without moving pointer hover or keyboard focus is not required:

- The additional content communicates an input error message: these can persist without being dismissible, as they generally require the user's attention, explicit confirmation or remedial action.

- The additional content does not replace or obscure other meaningful content (including the trigger element itself): if the additional content only appears over white space or purely decorative content, such as a background graphic which provides no information, it won't interfere with a user's ability to view or operate the page.

### Hoverable

The intent of this condition is to ensure that additional content which may appear on hover of a target may also be hovered itself.  Content which appears on hover can be difficult or impossible to perceive if a user is required to keep their mouse pointer over the trigger. When the added content is large, magnified views may mean that the user needs to scroll or pan to completely view it, which is impossible unless the user is able to move their pointer off the trigger without the additional content disappearing.

Another common situation is when large pointers have been selected via platform settings or assistive technology. Here, the pointer can obscure a significant area of the additional content. A technique to view the content fully in both situations is to move the mouse pointer directly from the trigger onto the new content.  This capability also offers significant advantages for users who utilize screen reader feedback on mouse interactions.  This condition generally implies that the additional content overlaps or is positioned adjacent to the target.

### Persistent

The intent of this condition is to ensure users have adequate time to perceive the additional content after it becomes visible.  Users with disabilities may require more time for many reasons, such as to change magnification, move the pointer, or simply to bring the new content into their visual field.  Once it appears, the content should remain visible until:

- The user removes hover or focus from the trigger and the additional content, consistent with the typical user experience;

- The user dismisses the additional content via the mechanism provided to satisfy the Dismissible condition; or

- The information conveyed by the additional content becomes invalid, such as a 'busy' message that is no longer valid.

### Additional Notes

- This criterion does not attempt to solve such issues when the appearance of the additional content is completely controlled by the user agent. A prominent example is the common behavior of browsers to display the `title`  attribute in HTML as a small tooltip.

- Modal dialogs are out of scope for this criterion because they must take keyboard focus  and thus should not appear on hover or focus.  Refer to [Success Criterion 3.2.1 On Focus](on-focus).

- Content which can be triggered via pointer hover should also be able to be triggered by keyboard focus.  Refer to [Success Criterion 2.1.1 Keyboard](keyboard).

## Benefits

- Users with low vision who view content under magnification will be better able to view content on hover or focus without reducing their desired magnification.

- Users who increase the size of mouse cursors via platform settings or assistive technology will be able to employ a technique to view obscured content on hover.

- Users with low vision or cognitive disabilities will have adequate time to perceive additional content appearing on hover or focus and to view the trigger content with less distraction.

- users with low pointer accuracy will be able to more easily dismiss unintentionally-triggered additional content

## Examples

### Example 1: Dismissible Tooltip

A tooltip is displayed below a LVTF button on hover so as not to obscure the button itself. It does however obscure content below the button (the next red button, called ~comment-zoom-content). To meet the Dismissible requirement, a user can press the Escape key to clear the tooltip without moving the mouse, as demonstrated in the second image.

The button's tooltip also appears on focus and can be removed with the Escape key. The screen shot shows the same LVTF button with focus, but the tooltip has been dismissed and is no longer visible.

### Example 2: Hoverable Tooltip

A button's tooltip is displayed directly below it on mouse hover which can easily be obscured by a large pointer.  The tooltip itself is able to be hovered so the mouse pointer can be moved down to its bottom edge in order to view the tooltip text.

## Resources

- [Tooltip design described in WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
