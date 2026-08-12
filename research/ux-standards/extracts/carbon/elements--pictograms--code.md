---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/elements/pictograms/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
Carbon pictograms are provided through a set of packages allowing the use of
pictograms in multiple frameworks. Pictograms are supported in vanilla, React,
Angular, and Vue.

Get started
Usage
Resources

## Get started

To install `@carbon/pictograms-react` in your project, you will need to run the
following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/pictograms-react
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/pictograms-react
```

## Usage

You can import a pictogram component into your project by referring to its name:

```jsx

```

We also provide CommonJS and UMD files in the `lib` and `umd` directories,
respectively.

To import using CommonJS, you can do the following:

```js
const { Airplane } = require('@carbon/pictograms-react');
```

_Note: if you would like to find the import path for a pictogram, you can
reference our
[Pictogram Library](https://www.carbondesignsystem.com/elements/pictograms/library)_

### Icon fill

All icons from the library support being styled by the `fill` property. You can
change the color of an icon by passing in a custom class name that sets this
property (preferred), or by passing in an inline style. For example:

```css
// CSS custom class name to set the fill of the icon to `rebeccapurple`
svg.my-custom-class {
  fill: rebeccapurple;
}
```

```jsx

function MyComponent() {
  return (
    <button>

    </button>
  );
}
```

### Focus and `aria-label`

By default, the icon components from `@carbon/pictograms-react` are treated as
decorative content. This means that we set `aria-hidden="true"` unless certain
props are passed to the component.

If you would like the icon to be announced by a screen reader, you can supply an
`aria-label` or `aria-labelledby`. For example:

```jsx

function MyComponent() {
  return (
    <button>

    </button>
  );
}
```

Doing this will add the appropriate `role` to the `<svg>` node, as well.

If you would like the `<svg>` to receive focus, you will need to pass in a
`tabIndex` value. For example:

```jsx

function MyComponent() {
  return ;
}
```

Including `tabIndex` and `aria-label` (or `aria-labelledby`) will set the
corresponding `tabindex` on the underlying `<svg>` and verify support in older
browsers like Internet Explorer 11 by setting `focusable` to `true`.

## Resources
