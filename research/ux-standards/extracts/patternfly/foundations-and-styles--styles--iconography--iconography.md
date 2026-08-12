---
source: patternfly
title: Red Hat PatternFly
url: https://www.patternfly.org/foundations-and-styles/styles/iconography
license: MIT
bucket: A
sha: 7315296b4ecc182757b45b46f0474fafcff11366
retrieved: 2026-08-11
---
import './icons.css';
import '../../../components/components.css';

We use <a href="https://www.redhat.com/en/about/brand/standards/icons">Red Hat brand UI icons</a> (`rh-ui-*`) in PatternFly, which are delivered via the [`@patternfly/react-icons` package](https://www.npmjs.com/package/@patternfly/react-icons) and the [icon component](/components/icon). The [all icons](#all-icons) table at the end of this page lists the icons commonly used in PatternFly, including their usage details.

The [iconography documentation of the Red Hat Design System (RHDS)](https://ux.redhat.com/foundations/iconography/) outlines the full Red Hat icon catalog, including:
- UI icons (the same set we use, plus more variants)
- A large set of standard icons (more general, illustrative, and typically less appropriate for product UIs)
- Microns (smaller, compact icons)
- Social icons

In general, rely on the all-icons table on this page and supplement your needs with the RHDS catalog if needed. If there's no icon for your use case, [submit a new icon request](https://docs.google.com/forms/d/e/1FAIpQLSde61rTDD4keaZEA3JFzBPbQVJ5EgEkhNapsYoI6ajKCsX4_Q/viewform) to the Brand team.

## Migrating to Red Hat icons

To migrate from our previous Font Awesome and PatternFly icon sets without having to manually update every import, apply the `pf-v6-icon-set-rh-ui` class on an outer element (typically the `<html>` element). PatternFly uses the mapping in [`pfToRhIcons.mjs`](https://github.com/patternfly/patternfly-react/blob/main/packages/react-icons/scripts/icons/pfToRhIcons.mjs) to decide which legacy icons render as Red Hat UI icons. Not every legacy icon is mapped, so some might still require direct updates. This class also only points to the UI Red Hat icon set, not [microns](https://ux.redhat.com/foundations/iconography/#micron-icons) or [standard icons](https://ux.redhat.com/foundations/iconography/#standard-icons), which you might prefer for some scenarios.

While you can still use the previous Font Awesome (`fa`, `fas`, `far`, and similar) or PatternFly (`pf`) icons if your product already relies on them, they are not the recommended path for new work.

## Inline icons

Rather than pixels, icons are sized in rems, which are relative to your page’s root font size. For example, if the root size is 10px, a rem size of 1.5 is 15px. PatternFly’s default root is 16px. If you change the root, the following tables’ size values will only be accurate in rems.

[Inline icons](/components/icon#inline) must be center-aligned horizontally when placed next to text and center-aligned vertically when stacked.

<div class="ws-docs-content-img">
![Icons correctly center-aligned beside icons incorrectly front-aligned.](./icon-alignment.svg)
</div>

Use the following semantic tokens to ensure that icons are properly aligned and match the correct font size:

### Headings

| **Size** | **Token** | **Example** |
| --- | --- | :---: |
|  1.375rem (22px)   | `--pf-t--global--icon--size--font--heading--h1` |     Heading     |
| 1.25rem (20px)    | `--pf-t--global--icon--size--font--heading--h2` |     Heading     |
| 1.125rem (18px) | `--pf-t--global--icon--size--font--heading--h3` |     Heading     |
| 1rem (16px) | `--pf-t--global--icon--size--font--heading--h4` |     Heading     |
| 1rem (16px) | `--pf-t--global--icon--size--font--heading--h5` |     Heading     |
| 1rem (16px) | `--pf-t--global--icon--size--font--heading--h6` |     Heading     |

### Body text

| **Size** | **Token** | **Example** |
| --- | --- | :---: |
| 0.75rem (12px)  | `--pf-t--global--icon--size--font--body--sm`  |   Small body  |
| 0.875rem (14px) | `--pf-t--global--icon--size--font--body--default`  |   Default body
| 1rem (16px)  | `--pf-t--global--icon--size--font--body--lg`  |   Large body

## Standalone icons

Occasionally, you may need to use a standalone icon that isn't aligned with any kind of text. We support a range of icon sizes for these use cases, including small, medium, large, x-large, 2xl, and 3xl icons. These sizes correspond to the following font sizes and tokens:

| **Size** | **Token** | **Example** |
| --- | --- | :---: |
| Small (0.75rem, 12px) |  `--pf-t--global--icon--size--sm` | |
| Medium (0.875rem, 14px) |  `--pf-t--global--icon--size--md` | |
| Large (1rem, 16px) |  `--pf-t--global--icon--size--lg` | |
| X-large (1.375rem, 22px) | `--pf-t--global--icon--size--xl` |   |
| 2xl (3.5rem, 56px) | `--pf-t--global--icon--size--2xl` |   |
| 3xl (6rem, 96px) | `--pf-t--global--icon--size--3xl` |  |

Most standalone icons in PatternFly components are medium, since that is typically the most versatile size for a UI&mdash;other sizes are used sparingly.

## Icon colors
All icon colors that you use should align with the proper [semantic design token.](/foundations-and-styles/design-tokens/all-design-tokens) For example, a warning icon should use our approved warning color token, a danger icon should use our approved danger color token, and so on.

| **Icon state** | **Color token** | **Example** |
| --- | --- | :---: |
| Danger | `--pf-t--global--icon--color--status--danger--default` |    |
| Warning  | `--pf-t--global--icon--color--status--warning--default` |  |
| Success | `--pf-t--global--icon--color--status--success--default` |  |
| Info | `--pf-t--global--icon--color--status--info--default` |  |
| Custom | `--pf-t--global--icon--color--status--custom--default` |  |

To learn more about icon colors and color tokens, visit our [colors page.](/foundations-and-styles/colors)

## Using icons in development

Developers should first refer to our [development onboarding guide](/get-started/develop#using-icons) to install, import, and use icons within your product. For React and HTML examples, [refer to the icon component.](/components/icon)

### React imports
Once installed, you can import individual icons from the [react-icons package](https://www.npmjs.com/package/@patternfly/react-icons). For example

`import RhUiStarIcon from '@patternfly/react-icons/dist/esm/icons/rh-ui-star-icon';`

## All icons

The table lists Red Hat UI icons with usage guidance for PatternFly. For the full catalog of Red Hat icons (UI, standard, microns, and social), refer to [the RDHS iconography guidelines](https://ux.redhat.com/foundations/iconography/).

For guidance on icon tooltips, [refer to our tooltips writing guide.](/content-design/writing-guides/tooltips#icon-tooltips)

Click an icon to download it as an SVG, or click the React name to copy the icon's name for use in React.
