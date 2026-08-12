---
source: patternfly
title: Red Hat PatternFly
url: https://www.patternfly.org/foundations-and-styles/styles/colors
license: MIT
bucket: A
sha: 7315296b4ecc182757b45b46f0474fafcff11366
retrieved: 2026-08-11
---
# PatternFly's palette

Our color palettes align with <a href="https://www.redhat.com/en/about/brand/standards/color" target="_blank" alt="Red Hat brand colors"> Red Hat's brand colors </a> and are designed to reinforce content and support effective communication across different UI needs. Colors are applied to PatternFly elements using [semantic design tokens.](/foundations-and-styles/design-tokens/overview) This guide offers guidance for color use in some of the most common scenarios, but it does not cover all tokens. Additional color usage information is included in our tokens documentation.

<div>

View all design tokens

</div>

Each example contains a descriptive label, a semantic token, and a color swatch circle. If you select a color swatch circle, you can see more details, including a hex code and usage information. Color swatches will automatically update to match light or dark theme colors, based on your browser settings.

## Brand colors

Brand colors are used to identify your brand, and are the colors most frequently used across your UI. Our brand color, "PatternFly blue", is used across all components. There are different brand tokens depending on the use case, like icon tokens, text tokens, global color tokens, and so on.




        Use to reinforce your brand. Often indicates a default or active state.


        Use for branded elements that are in a hover/focus state.


        Use for branded text elements.




    <img src="./img/brand-colors.png" alt="PatternFly blue colors" />


## Background colors

Background colors are used throughout components and, occasionally, for certain screens.




        Use as the primary background color for UI content such as cards, page sections, and other content areas.


        Use as the hover color for primary-colored backgrounds.


        Use as the secondary color for UI content. Also use for UI shell backgrounds, like navigation and mastheads.


        Use as the hover color for secondary-colored backgrounds.




    <img src="./img/background-colors.png" alt="PatternFly background colors" />


## Text and icon colors

Text and icon colors overlap, because they can be used inline with each other. Note that there are different tokens for standalone icons, inline icons, and standalone text. For more details view our [icons](/foundations-and-styles/iconography) and [typography](/foundations-and-styles/typography) guidelines.

Text and icons can also display status information, which is covered in the [status and state colors section.](#status-and-state-colors)




        Use as the primary color for standard text, like heading/body copy. Icons paired with regular text should inherit this color or should use --global--icon--color--regular.


        Use as a secondary text color for text in an element that requires less emphasis, like descriptions or inactive tab labels.


        Use as the default color for icons in icon buttons and/or when paired with regular-colored text.


        Use as the default text color for links.




    <img src="./img/text-icon-colors.png" alt="PatternFly text and icon colors" />


## Status and state colors

Status and state colors are indicators that communicate data and actions to users through the UI. PatternFly's status colors cover default, danger, success, information, and warning statuses, as well as disabled states.

### Danger




        Use as the default color for icons that convey danger, like in alerts or banners.


        Use as the default color for text that communicates a danger status.


        Use as the hover color for any element that conveys a danger status.




    <img src="./img/danger-colors.png" alt="PatternFly danger colors" />


### Warning




        Use as the default color for icons that convey a warning status, like in alerts or banners.


        Use as the default color for text that communicates a warning status.


        Use as the hover color for any element that conveys a warning status.




    <img src="./img/warning-colors.png" alt="PatternFly warning colors" />


### Disabled




        Use as the color for icons that show in disabled icon buttons and/or when paired with disabled-color text


        Use as the color of text on disabled elements, like disabled menu items.


        Use as the background color for disabled components.




    <img src="./img/disabled-colors.png" alt="PatternFly disabled colors" />


## Nonstatus colors




        Use as the default border color for any element that does not convey status and that you always want to be teal, like color-coded labels.


        Use as the default background color for any element that does not convey status and that you always will want to be purple, like color-coded labels and banners.


        Use as the hover state color for any element that uses the nonstatus green background color.




    <img src="./img/nonstatus-colors.png" alt="PatternFly nonstatus colors" />


## Contrast ratios

[Our accessibility standards](/accessibility/overview#accessibility-standards) are [level AA in the Web Content Accessibility Guidelines 2.2](https://www.w3.org/WAI/WCAG22/quickref/?versions=2.2&currentsidebar=%23col_customize&levels=aaa). To achieve level AA accessibility, your UI contrast ratios must be at or above 4.5:1 for normal text, 3:1 for large text, and 3:1 for graphics and other UI components. Additionally, on hover, link text color should have ample contrast from both the background color and the default state link color.

To check the contrast between background and text colors, use a <a href="https://color.a11y.com/?wc3" target="_blank" className="pf-m-link">WCAG AA-compliance tool.</a>

Beyond our standard contrast ratio, we support a high contrast and a glass contrast mode, as documented in our [theming guidelines](/foundations-and-styles/theming#contrast-modes).

## Color families
Our color palettes are organized into "families" that contain different shades of the same hue. In the following families, you can expand each color to see related tokens.
