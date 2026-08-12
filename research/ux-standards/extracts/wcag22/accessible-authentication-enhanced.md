---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-enhanced
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Accessible Authentication (Enhanced)

## In brief

**Goal** — Make logins possible with less mental effort.

**What to do** — Don't make people recognize objects or user-supplied images and media to login.

**Why it's important** — Some people with cognitive disabilities can't do puzzles, including identifying objects and non-text information they previously supplied.

## Intent of Accessible Authentication (Enhanced)

The purpose of this success criterion is to ensure there is an accessible, easy-to-use, and secure method to log in, access content, and undertake tasks. This criterion is the same as [3.3.8 Accessible Authentication (Minimum)](accessible-authentication-minimum) but without the exceptions for objects and user-provided content.

An example of a CAPTCHA where users are asked to recognize common objects – in this case, selecting all images that contain a car. While these are excepted in [3.3.8 Accessible Authentication (Minimum)](accessible-authentication-minimum), they are _not_ excepted in this success criterion.

Any required step of the authentication process:

- cannot display a selection of images, videos, or audio clips, where users must choose which image they provided;

- cannot display a selection of images, where users must choose the images which contain a specific object, such as a car.

## Benefits of Accessible Authentication (Enhanced)

The benefits of this success criterion are the same as [Accessible Authentication (Minimum)](accessible-authentication-minimum.html#benefits).

People with cognitive issues relating to memory, reading (for example, dyslexia), numbers (for example, dyscalculia), or perception-processing limitations will be able to authenticate irrespective of the level of their cognitive abilities.

## Examples of Accessible Authentication (Enhanced)

The examples of this success criterion are very similar to the [Accessible Authentication (Minimum)](accessible-authentication-minimum.html#examples) examples.

- A website uses a properly marked up username (or email) and password fields as the login authentication (meeting [Success Criterion 1.3.5 Input Purpose](identify-input-purpose) and [Success Criterion 4.1.2 Name, Role, Value](name-role-value)). The user's browser or integrated third-party password manager extension can identify the purpose of the inputs and automatically fill in the username and password.

- A website does not block paste functionality. The user is able to use a third-party password manager to store credentials, copy them, and paste them directly into a login form.

- A website uses WebAuthn so the user can authenticate with their device instead of username/password. The user's device could use any available modality. Common methods on laptops and phones are facial-scan, fingerprint, and PIN (Personal Identification Number). The website is not enforcing any particular use; it is assumed a user will set up a method that suits them.

- A website offers the ability to login with a third-party provider using the OAuth method.

- A website that requires two-factor authentication allows for multiple options for the 2nd factor, including a USB-based method where the user simply presses a button to enter a time-based token.

- A website that requires two-factor authentication displays a QR code which can be scanned by an app on a user's device to confirm identity.

- A website that requires two-factor authentication sends a notification to a user's device. The user must use their device's authentication mechanism (for example, user-defined PIN, fingerprint, facial recognition) to confirm identity.

## Resources

- [Cognitive Accessibility Gap Analysis Topic 1: Authentication and Safety](https://www.w3.org/TR/coga-gap-analysis/#table1)

- [Cognitive Accessibility Issue Papers 4. Web Security and Privacy Technologies](https://w3c.github.io/coga/issue-papers/#web-security-and-privacy-technologies) and [Web Security and Privacy Technologies](https://w3c.github.io/coga/issue-papers/privacy-security.html)

- [Making Content Usable for People with Cognitive and Learning Disabilities 4.7.1 Provide a Login that Does Not Rely on Memory or Other Cognitive Skills](https://www.w3.org/TR/coga-usable/#provide-a-login-that-does-not-rely-on-memory-or-other-cognitive-skills-pattern)

- [Security and Privacy Technologies issue paper from the Cognitive Task Force](https://rawgit.com/w3c/coga/master/issue-papers/privacy-security.html).

- [WebAuthN specification](https://www.w3.org/TR/webauthn/).

- [Web Authentication API on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API).

- [WebAuthN Demo site](https://webauthn.io/).

- [OAuth on Wikipedia](https://en.wikipedia.org/wiki/OAuth).

- ["Let them paste passwords", from the UK's National Cyber Security Centre (archived)](https://webarchive.nationalarchives.gov.uk/ukgwa/20240306114738/https://www.ncsc.gov.uk/blog-post/let-them-paste-passwords)

- [NIST SP 800-63 Digital Identity Guidelines (Second Public Draft of Revision 4) / SP 800-63B Authentication & Authenticator Management](https://pages.nist.gov/800-63-4/sp800-63b.html)

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
