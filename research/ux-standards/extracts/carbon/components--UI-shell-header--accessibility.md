---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/UI-shell-header/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
Design annotations are needed for specific instances shown below, but for the
standard UI shell header component, Carbon already incorporates accessibility.

What Carbon provides
Design recommendations
Development considerations

## What Carbon provides

The Carbon header bakes in keyboard interaction, including a
skip-to-main-content mechanism. Carbon also supports assistive technologies such
as screen readers by setting labeling and page structure.

### Keyboard interaction

Each element in the header can be reached by the `Tab` key. A "Skip to main
content" link appears when a keyboard user first tabs into the page. Links and
icons are activated by `Enter`. Icons can also be activated by `Space`.

![example of header keyboard interaction](images/header-accessibility-1.png)

  Pressing the Tab key reveals a 'Skip to main' link and then moves between
  other header elements.

### Regions

![example of header keyboard interaction](images/header-accessibility-2.png)

  Carbon applies a header region around the whole UI shell header.

### Labeling

Carbon provides default names for each icon-only button in the header, and these
names are revealed on hover or focus. Interactions for some header components
are covered under other component topics such as
[search](/components/search/usage),
[notifications](/components/notifications/usage), and the
[UI shell right panel switcher](components/UI-shell-right-panel/usage/#switcher).

![annotation showing search, help, notification and app switcher icons](images/header-accessibility-3.png)

  Carbon provides default names for its icon-only components and reveals them on
  hover or focus.

## Design recommendations

For every product, there should be a one-time design exercise to annotate the UI
shell keyboard interaction. This is an important step to carry out, since header
functionality and component names vary significantly between products, even
though they appear similar until interacted with. Annotating expected behavior
increases consistent implementation. Where the product does not deviate from the
standard Carbon implementation, it can merely be annotated that the behavior
matches what is in the 'How Carbon works' section.

![Annotated header region stating 'Header functionality, roles and names match Carbon defaults'](images/header-accessibility-4.png)

  Annotate the header, even if your design matches the default Carbon UI shell
  header behavior.

Once a product-specific header annotation exists, individual product pages only
need to annotate the header if something differs.

Where the header deviates from the default Carbon behavior or labeling, it
should be annotated. Such annotations could call out different labels for icons
or indicate interaction changes such as keyboard navigation.

![an annotation stating the search bar is persistently expanded](images/header-accessibility-5.png)

  Annotate if the design modifies the default keyboard or component interaction.

## Development considerations

Keep these considerations in mind if you are modifying Carbon or creating a
custom component.

- Carbon uses the HTML 5 `header` component instead of an ARIA landmark to set
  the region.
- Carbon includes the "Skip to main content" link as the first item on the page
  with a `tabindex="0"`, but hides it through CSS until it receives focus.
