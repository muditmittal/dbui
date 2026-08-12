---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/elements/2x-grid/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
The Carbon Grid package helps developers build digital experiences with the 2x
Grid. The project allows you to use CSS grid to build a variety of layouts.

If you're using `@carbon/react`, you you probably don't need to install the grid
package separately. See our [Carbon React](/developing/frameworks/react/) guide
to start building.

Documentation
API & Helpers
Legacy

## Documentation

### CSS Grid

Carbon provides grid components, using CSS Grid to help developers use the 2x
Grid. These components include `Grid` and `Column` and allow you to define
column widths by breakpoint, based on a 16 column grid.











  The Carbon grid is an important tool for placing elements on the screen. When
  used correctly, complex layouts can be achieved with little or no custom CSS
  (`display: flex`, `position` declarations, size/width overrides, etc.)

### AspectRatio

When designing fluid layouts, it's helpful for an asset or card to be a specific
aspect ratio. The `AspectRatio` component supports rendering your content in a
specific aspect ratio through the ratio prop. This allows you to specify the
proportion between the width and the height of your content.











## API & Helpers

There are many ways to make the 2x Grid work for your application using our API.
The examples below illustrate two ways of removing visibility of a given
component based on the breakpoint.

```css
@use '@carbon/grid' as *;

.component {
  display: block;

  /* applies styles inside mixin on md breakpoint or below, like max-width */
  @include breakpoint-down('md') {
    display: none;
  }
}

.component {
  display: none;

  /* applies styles inside mixin on lg breakpoint and above */
  @include breakpoint('lg') {
    display: block;
  }
}
```

In addition, you can also use Helpers to control what is being displayed on the
screen at a given breakpoint.

```css
@use '@carbon/styles/scss/utilities/helper-classes';

.my-class {
  @include helper-classes.hide-at-sm();
}
```


















## Legacy

### Flexbox Grid

The default grid in v11 is based off of CSS Grid, to enable the legacy
[FlexGrid](https://react.carbondesignsystem.com/?path=/docs/elements-flexgrid--auto-columns)
implementation, built using Flexbox, you will need to include the following in
your Sass files:

```scss
@use '@carbon/grid';

// Emit the flex-grid styles
@include grid.flex-grid();
```
