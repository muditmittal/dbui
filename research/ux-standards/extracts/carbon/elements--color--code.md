---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/elements/color/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
The Carbon color package helps teams build engaging digital experiences through
consistent application of color.

If you're using `@carbon/react`, you probably don't need need to install the
color package separately. See our [Carbon React](/developing/frameworks/react/)
guide to start building.

## Usage

### Sass

The `@carbon/colors` package enables you to access colors from the IBM Design
Language in Sass. You can access a color directly from the package by writing
the following:

```scss
@use '@carbon/colors';

.selector {
  background: colors.$blue-50;
}
```

For a full list of colors exported, refer to the
[API](https://github.com/carbon-design-system/carbon/blob/main/packages/colors/docs/sass.md#api)
section in the package's Sass Documentation.

In addition to individual colors, you can access all colors in a `Map` using the
`$colors` variable.

```scss
@use '@carbon/colors';
@each $swatch, $grades in colors.$colors {
  @each $grade in $grades {
    //
  }
}
```

Each key in the `$colors` map is the name of a group of colors, also known as a
swatch. The value of each entry is a `Map` where the keys are the color grade
and the values are the hex codes for the color at that grade. For example:

```scss
$colors: (
  blue: (
    10: #edf5ff,
    20: #d0e2ff,
    30: #a6c8ff,
    40: #78a9ff,
    50: #4589ff,
    60: #0f62fe,
    70: #0043ce,
    80: #002d9c,
    90: #001d6c,
    100: #001141,
  ),
);
```

### JavaScript

For JavaScript, you can import and use this module by doing the following in
your code:

```js
// ESM

// CommonJS
const { black, blue, warmGray } = require('@carbon/colors');
```

Each color swatch is exported as a variable, and each color name is also
exported as an object that can be called by specifying grade, for example:

```js
black;
blue[50]; // Using the `blue` object.
warmGray100; // Using the `warmGray100` variable.
```

## Resources
