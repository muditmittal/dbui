---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/modal/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
Preview the modal component with the React live demo. For detailed code usage
documentation, see the Storybooks for each framework below.

## Documentation



Feature flag















### Feature flags

A [feature flag](/components/overview/feature-flags/) has been added to modal to
improve accessibility and changes parts of its functionality, not its visual
appearance. For more code-specific feature flag information, refer to the
[@carbon/react](https://react.carbondesignsystem.com/?path=/docs/components-modal-feature-flag--flag-details)
framework. Once the next major release (v12) is released in the future, this
feature flag will become the default version of the component.

The `enable-focus-wrap-without-sentinels` flag is a new approach to focus wrap
behavior, modifying the DOM to no longer include hidden "sentinel nodes" that
previously marked the beginning and end of the wrapped focus. This behavior
considers all interactive child nodes and wraps focus based on their tab order.

## Live demo
