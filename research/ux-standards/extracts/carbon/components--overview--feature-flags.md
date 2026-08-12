---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/overview/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
Feature flags enable new behaviors and styling, allowing users to opt-in to new
breaking changes while staying on the current major version.

Overview
Components with feature flags
How to implement

## Overview

When a new feature flag is introduced, it is set to false or "off" by default to
ensure backward compatibility. We are not deprecating the current components but
encourage all teams to use the new feature flag-enabled components in their
products moving forward. Once the next major release (v12) is released in the
future, these feature flags will become the default version of the component.

## Components with feature flags

The following components have v12 feature flags, with changes related to either
design or development.

| Component                    | Design change                                                                    | Code change                                                                                                                                                                                   |
| ---------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Menu buttons (Overflow menu) | No design change                                                                 |  }>React             |
| Modal                        | No design change                                                                 |  }>React                    |
| Notification                 | No design change                                                                 |  }>React |
| Structured list              | Usage tab |  }>React           |
| Tile                         | Usage tab            |  }>React                     |
| Toggle                       | Usage tab          |  }>React                   |
| Tree view                    | No design change                                                                 |  }>React                 |

## How to implement

### Code

Each framework handles feature flags differently. At the moment, only React has
available feature flags. This may change in the future, check back later for
updates related to all available feature flags.

React

The development specifics for feature flags in React can be found in the
[@carbon/react](https://react.carbondesignsystem.com/?path=/docs/getting-started-feature-flags--overview)
framework.

### Design

Inside a design file, click on the component with a feature flag (A). In the
properties panel, locate the **v12 feature flag** boolean property (B). By
default, this feature is turned off, but can be toggled on to enable the v12
feature flag.

![Feature flag implementation in Figma](images/feature-flag-implementation-1.png)

Additionally, when clicking on the **components details** (C) in the properties
panel, a description of the v12 feature flag, and a link to the component's
usage guidance is provided for more information in the **Component
documentation** window (D).

![Feature flag implementation in Figma](images/feature-flag-implementation-2.png)
