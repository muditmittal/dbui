---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/overview/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
Manual and automated tests assess the accessibility of Carbon components against
established standards. Read on to learn about how components are tagged with
test statuses across the website.

Accessibility tag status
Accessibility test categories
All component accessibility status

## Accessibility tag status

Automated accessibility verification tests (AVT) are run for each change
proposed to the Carbon codebase. Additional manual tests are done periodically,
such as screenreader testing. These tests ensure a consistent baseline of
accessibility for each stable component.

Carbon implements a robust matrix of AVT to ensure that every Carbon component
meets the utmost standards of accessibility. The status of this testing is
outlined across the website through a detailed matrix of test categories and
tags, outlined below.

| Tag                                                  | Meaning                                                                                                                                                                                                                                                                             |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|        | Automated tests have been implemented, pass, and show no violations via the [IBM Equal Access Accessibility Checker](https://github.com/IBMa/equal-access) for a component’s default state, advanced states, and keyboard navigation.                                               |
|       | Some testing has been done, but is still incomplete and in progress. For example, manual tests may not have covered all use cases, or automated tests may not cover all component states. Previously existing tests may have become invalid and are temporarily skipped or removed. |
|        | Manual testing has been performed and validated by a human to ensure proper accessibility, such as screen reader testing.                                                                                                                                                           |
|  | In some cases, testing data is not available for certain components or component states. For instance, keyboard navigation testing is not necessary for components that are non-interactive.                                                                                        |
|     | Automated or manual testing has been deferred. Most often this applies to preview or unstable components that do not have testing performed until they are [moved to stable](https://github.com/carbon-design-system/carbon/blob/main/docs/preview-code.md).                        |

## Accessibility test categories

Every accessibility test falls into one of four categories. Marked with the tags
above, these categories show the status for each of these discrete areas of
testing. This additional detail helps clarify exactly what ways a component has
been tested for accessibility.

| Test                | Meaning                                                                                                                                                            | Possible tags                                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Default state       | Test(s) that ensure the initial render state of a component is accessible.                                                                                         |  <br/><br/>                                          |
| Advanced states     | Tests that ensure additional states of the component are accessible. This could be interactive states of a component or its multiple variants.                     |  <br/><br/>                                          |
| Keyboard navigation | Tests that ensure focus is properly managed, and all interactive functions of a component have a proper keyboard-accessible equivalent.                            |  <br/><br/>                                       |
| Screen reader       | This manual testing ensures that the visual information on the screen is properly conveyed and read correctly by screen readers such as JAWS, VoiceOver, and NVDA. | <br/><br/> <br/> |
