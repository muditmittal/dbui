---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/data-visualization/color-palettes/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
The color palette for data visualizations is a select subset of the IBM Design
Language color palette. It is designed to maximize accessibility and harmony
within a page.

**Note:** This guidance is a work in progress. To see our roadmap, make feature
requests, or contribute, please go to carbon-charts
[GitHub repository](https://github.com/carbon-design-system/carbon-charts).

Categorical palettes
Sequential palettes
Alert palette
Gradient use
Color in action

## Categorical palettes

Categorical (or qualitative) palettes are best when you want to distinguish
discrete categories of data that do not have an inherent correlation.

The colors of this palette should be applied in sequence strictly as described
below. The sequence is carefully curated to maximize contrast between
neighboring colors to help with visual differentiation.

You can override the categorical sequence with one of the following palettes if
the exact number of data categories is predictable.

## Sequential palettes

### Monochromatic

The monochromatic palettes are good for relationship charts and trend charts. In
light themes, the darkest color denotes the largest values. In dark themes, the
lightest color denotes the largest values.

### Diverging palettes

Please note that diverging palettes do not differentiate between light and dark
themes.

#### Palette 1

The red-cyan palette has a natural association with temperature. Use this
palette for data representing hot-vs-cold.

#### Palette 2

The purple-teal palette is good for data with no temperature associations, such
as performance, sales, and rates of change.

## Alert palette

Alert colors are used to reflect status. Typically, red represents danger or
error; orange represents a serious warning; yellow represents a regular warning,
and green represents normal or success.

## Gradient use

**Note:** Gradients are not yet supported in Carbon Charts. This exploration is
subject to change.

Gradients are good for highlighting extremes in a range of values. Use a
gradient on single category visualizations only if needed. Multiple gradients
are often inaccessible and are discouraged in our system. Gradients should not
be used to represent any meaningful progression or divergence. Never use a
gradient in place of a sequential palette.

For the full list of approved gradient options, see the IBM Design Language
[Color page](https://www.ibm.com/design/language/color#gradients).

![Gradient palette](images/gradient.png)

## Color in action

See the IBM Design color palette in action across multiple business units and
applications. Deliberate hits of color are composed with rich neutrals for a
well-balanced cohesive experience.

![example of a bubble chart](images/color_gallery_1.png)

![example of a radar chart](images/color_gallery_2.png)

![example of a donut chart](images/color_gallery_3.png)

![example of a stream chart](images/color_gallery_4.png)

![example of a heat map](images/color_gallery_5.png)

![example of a proportional diagram](images/color_gallery_6.png)

![example of an alluvial diagram](images/color_gallery_7.png)
