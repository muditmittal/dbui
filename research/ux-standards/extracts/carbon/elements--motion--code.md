---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/elements/motion/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
The Carbon motion package empowers consistent cadence and movement of elements
across digital experiences.

If you're using `@carbon/react`, you probably don't need need to install the
motion package separately. See our [Carbon React](/developing/frameworks/react/)
guide to start building.

## Usage

The `@carbon/motion` package enables you to access motion curves and durations
built for the IBM Design Language in Sass. You can access these values directly
from the package by writing the following:

```scss
@use '@carbon/motion';
.selector {
  // Set `transition-timing-function` directly
  @include motion.motion(standard, productive);

  // Alternatively
  transition: opacity motion.motion(standard, productive);

  // Or use a duration
  transition: opacity motion.$duration-fast-01;
}
```

#### API

<br />

| Name                    | Type     |
| :---------------------- | :------- |
| `$duration-fast-01`     | Duration |
| `$duration-fast-02`     | Duration |
| `$duration-moderate-01` | Duration |
| `$duration-moderate-02` | Duration |
| `$duration-slow-01`     | Duration |
| `$duration-slow-02`     | Duration |
| `$easings`              | Map      |
| `@mixin motion`         | Mixin    |
| `@function motion`      | Mixin    |

### JavaScript

If you're using `@carbon/motion` as a JavaScript dependency, we export our
easings and a function called `motion` that you can use. For example:

```js
// CommonJS
const { easings, motion } = require('@carbon/motion');
```

You can also include this as a JavaScript module:

```js
// ESM

motion('standard', 'productive'); // Returns a string `cubic-bezier()` function
```

### Configuration

You can configure parts of the `@carbon/motion` package with Sass Modules. For
example, you can change the `$prefix` used by writing the following:

```scss
@use '@carbon/motion' with (
  $prefix: 'custom-prefix'
);
```

For a full list of options that you can configure, check out the table below.

| Option    | Description                                                       | Default |
| :-------- | :---------------------------------------------------------------- | :------ |
| `$prefix` | The prefix that is used in selectors, CSS Custom Properties, etc. | `'cds'` |

## Resources
