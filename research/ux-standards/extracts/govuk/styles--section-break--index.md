---
source: govuk
title: GOV.UK Design System and Service Manual
url: https://design-system.service.gov.uk/styles/section-break/
license: MIT for code; Open Government Licence v3.0 for documentation (Crown copyright)
bucket: A
sha: 051c2d422a5f14cbe9dde5acce3ad3def664a56c
retrieved: 2026-08-11
---
{% from "_example.njk" import example %}

You can use the `govuk-section-break` classes on an `<hr>` element to create a thematic break between sections of content. `govuk-section-break` has class-based modifiers for different size margins.

By default `govuk-section-break` is only visible by its margin. You can add the `govuk-section-break--visible` class to make it visible with a separator line.

{{ example({ group: "styles", item: "section-break", example: "section-break", html: true, open: true, size: "m" }) }}
