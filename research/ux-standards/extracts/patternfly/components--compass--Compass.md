---
source: patternfly
title: Red Hat PatternFly
url: https://www.patternfly.org/components/compass/Compass
license: MIT
bucket: A
sha: 7315296b4ecc182757b45b46f0474fafcff11366
retrieved: 2026-08-11
---
To help you use the Compass layout, there are several variants and props exposed on other PatternFly components that may be useful:

- `isPlain` on [data list](/components/data-list#plain) and [table](/components/table#plain). This flag will set a transparent background for these components, allowing the glass effect in a wrapping `` to appear as the background.
- `isGlass` on [card](/components/card#modifiers), without any wrapping `Panel` components. A glass `` should be passed directly to ``.
- `isVertical` on [action list](/components/action-list#vertical-action-list). This flag sets the orientation on `` to support vertical icon lists for the sidebars.
- `isNav` on [tabs](/components/tabs#tabs-used-for-site-navigation). This flag enables a new styling of `` to be used as a top-page navigation.
- `isCircle` on [button](/components/button#circle-buttons) and [menu toggle](/components/menus/menu-toggle#plain-circle-toggle). This flag sets a border radius on the `` and ``, allowing buttons and plain icon menu toggles to be circular and typical menu toggles to be a rounded pill shape.
- `isPill` on [drawer](/components/drawer#pill). This flag sets a border radius and inset on the ``, making it appear as if the drawer is floating above other content.
- `isThinking` or `pf-v6-m-thinking` on `` and [ChatBot's message bar](/extensions/chatbot/ui/#message-bar-with-ai-indicator-styles). This prop, or class name, may be set to turn on a pulsing color animation around the chat message bar.
- `hasAiIndicator` or `pf-v6-m-ai-indicator` on [ChatBot's message bar](/extensions/chatbot/ui/#message-bar-with-ai-indicator-styles). This prop, or class name, may be set to enable a gradient border around the chat message bar.

### Card and data view layout

This demo uses the [data view extension](/extensions/data-view/overview) to place interactive data within a card as the main page content.

```js file="./CompassIntegrationsDemo.tsx" isFullscreen
```

### Dashboard layout

This demo creates a [dashboard](/patterns/dashboard) of multiple cards as the main page content.

```js file="./dashboard.tsx" isFullscreen
```
