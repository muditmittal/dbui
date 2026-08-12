---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/identify-purpose
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Identify Purpose

## In brief

**Goal** — It is easier to operate and navigate content.

**What to do** — Use code to indicate the meaning of all controls and other key information, where available.

**Why it's important** — Some people with cognitive disabilities may not understand a control's purpose from the name alone.

## Intent

The intent of this success criterion is to ensure that the purpose of many elements on a page can be programmatically determined, so that user agents can extract and present that purpose to users using different modalities.

Many users with limited vocabularies rely on familiar terms or symbols in order to use the web. However, what is familiar to one user may not be familiar to another. When authors indicate the purpose, users can take advantage of personalization and user preferences to load a set of symbols or vocabulary familiar to them.

This success criterion requires the author to programmatically associate the purpose of icons, regions and components (such as buttons, links, and fields) so that user agents can determine the purpose of each and adapt indicators or terminology to make them understandable for the user. It is achieved by adding semantics or metadata that provide this context. It is similar to adding role information (as required by 4.1.2) but instead of providing information about what the UI component is (such as an image) it provides information about what the component represents (such as a link to the home page).

Identifying regions of the page allows people to remove or highlight regions with their user agent.

Products for people who are non-vocal often use symbols to help users communicate. These symbols are in fact people's language. Unfortunately, many of these symbols are both subject to copyright and not interoperable. That means end users can only use one device, and cannot use content, apps, or assistive technologies that have not been made by a single company.

This Success Criterion enables symbols to be interoperable so that symbol users can understand different content that was not just made by one company.  When users' symbols are mapped to the same nodes, then user agents can load the user-understandable symbol. People can then buy the symbols and use them across different devices or applications. (Note that the symbols would still be proprietary, but they could then be interoperable.)

## Benefits

People who benefit have many different cognitive disabilities including:

- Memory

- Focus and attention

- Language-related

- Executive function and decision making.

Meeting this success criterion helps users who need extra support or a familiar interface, including the need for:

- Symbols and graphics with which users are familiar

- Fewer features and less cognitive overload

- Keyboard shortcuts

## Examples

- A website uses [ARIA landmarks](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/) to identify the regions of the page, and users can hide areas that do not have a role of `main`.

- The links in the navigation of a website are marked up so that users can add their own icons.

- Icons on a website are marked up so that users can substitute their own icon sets into the page.

## Resources

- [Making Content Usable for People with Cognitive and Learning Disabilities](https://www.w3.org/TR/coga-usable/)

- [WAI-Adapt Overview, enabling users to adapt content presentation](https://www.w3.org/WAI/adapt/)

- [Personalization and User Preferences](https://w3c.github.io/coga/issue-papers/#personalization-and-user-preferences)

- [The coga.personalisation project](https://github.com/ayelet-seeman/coga.personalisation/)

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
