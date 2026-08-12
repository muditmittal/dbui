---
source: apg
title: ARIA Authoring Practices Guide
url: https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/
license: W3C Software and Document License
bucket: A
sha: 7e4034b262bc0d25332e330d8a582aaf34113829
retrieved: 2026-08-11
---
# Breadcrumb Pattern

## About This Pattern

A breadcrumb trail consists of a list of links to the parent pages of the current page in hierarchical order.
It helps users find their place within a website or web application.
Breadcrumbs are often placed horizontally before a page's main content.

## Example

[Breadcrumb design pattern example](examples/breadcrumb.html)

## Keyboard Interaction

Not applicable.

## WAI-ARIA Roles, States, and Properties

- Breadcrumb trail is contained within a navigation landmark region.

- The landmark region is labelled via [aria-label](#aria-label) or [aria-labelledby](#aria-labelledby).

- The link to the current page has [aria-current](#aria-current) set to `page`.
If the element representing the current page is not a link, aria-current is optional.
