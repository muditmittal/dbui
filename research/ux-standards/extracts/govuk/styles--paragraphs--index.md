---
source: govuk
title: GOV.UK Design System and Service Manual
url: https://design-system.service.gov.uk/styles/paragraphs/
license: MIT for code; Open Government Licence v3.0 for documentation (Crown copyright)
bucket: A
sha: 051c2d422a5f14cbe9dde5acce3ad3def664a56c
retrieved: 2026-08-11
---
{% from "_example.njk" import example %}

{% include "_new-type-scale.njk" %}

The default paragraph font size is 19px.

{{ example({ group: "styles", item: "paragraphs", example: "body", html: true, open: true }) }}

You can also add classes to create a lead paragraph or smaller body copy to convey hierarchy in your page.

## Lead paragraph

A lead paragraph is an introductory paragraph that you can use at the top of a page to summarise the content. Lead paragraphs use 24px type on desktop and if it’s needed you should only use it once per page.

{{ example({ group: "styles", item: "paragraphs", example: "lead", html: true, open: true }) }}

## Body small

You can use the `govuk-body-s` class sparingly to make your paragraph font size 16px instead of 19px.

The majority of your body copy should use the standard 19px paragraph size.

{{ example({ group: "styles", item: "paragraphs", example: "small", html: true, open: true }) }}
