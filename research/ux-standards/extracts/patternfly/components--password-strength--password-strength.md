---
source: patternfly
title: Red Hat PatternFly
url: https://www.patternfly.org/components/password-strength
license: MIT
bucket: A
sha: 7315296b4ecc182757b45b46f0474fafcff11366
retrieved: 2026-08-11
---
import '../components.css';

A **password strength indicator** is displayed to a user after they have entered a password in a field. It allows the user to understand the strength of a password after it has met the password requirements. The strength of the password is determined by a validation algorithm after the specific rules are met.  Using a password strength indicator allows users to create stronger passwords, offering better protection from breaches.

## Elements

<div class="ws-docs-content-img">![password strength indicator weak](./img/password-weak.svg)</div>
<br/>

The password strength indicator is located on the top right corner of the input field. It displays the following strength types:
1. Password strength: Indicates if the password used is weak or strong.
2. Toggle: Used to hide and unhide the password characters.
3. Helper text: Displays password requirements and recommendations to improve password strength.

## Behavior

The password strength indicator:
- is displayed after the password has met all password requirements.
- icons and words are not editable after it is dispalyed.
