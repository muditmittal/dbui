---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/migrating/guide/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
Step-by-step guide to updating your code from Carbon v10 to v11.

Overview
Migrating a React app or library
Migrating an app or library using just styles
Migrating carbon-icons
Migrating Carbon elements

## Overview

This guide helps you update your project to Carbon v11. It is broken into
sections based on how you are using Carbon in your project today. For most teams
using Carbon, you'll want to use the
[Migrating a React app](#migrating-a-react-app) section.

One of the biggest changes to Carbon in v11 is that we moved to dedicated
packages under the `@carbon` scope. What this means for you is that if you were
previously using the following packages:

- `carbon-components`
- `carbon-components-react`
- `carbon-icons`
- `@carbon/icons-react`

You can access all of this work under one single package: `@carbon/react`. This
package will re-export all of the styles and icons for Carbon all in one
dependency.

If you were previously using `carbon-components`, the styles from this package
are available under `@carbon/styles`. They are also re-exported through
`@carbon/react`

Both the `carbon-components` and `carbon-components-react` packages are now
[deprecated](/deprecations).

## Migrating a React app or library

Starting in v11, the React components for Carbon live in the `@carbon/react`
package.

The `@carbon/react` package also includes the styles for Carbon along with
icons.

### Step 1: Install @carbon/react

To get started, uninstall the following packages if they exist in your project:

- `carbon-components`
- `carbon-components-react`
- `carbon-icons`
- `@carbon/icons-react`

```bash
npm uninstall carbon-components carbon-components-react carbon-icons @carbon/icons-react
```

Or, with [Yarn](https://yarnpkg.com/):

```bash
yarn remove carbon-components carbon-components-react carbon-icons @carbon/icons-react
```

Next, install the `@carbon/react` package:

```bash
npm install @carbon/react
```

Or, with [Yarn](https://yarnpkg.com/):

```bash
yarn add @carbon/react
```

Now that you've removed the old packages and brought in the new ones, run the
codemod below to fix your pathing.

```bash
npx @carbon/upgrade migrate update-carbon-components-react-import-to-scoped --write
```

After running the command, your code should start looking like this:

```jsx
// Before

// After

```

For full details, including options and commands available when using the
`@carbon/upgrade` CLI, see the
[package documentation](https://github.com/carbon-design-system/carbon/tree/main/packages/upgrade).

### Step 2: Install Dart Sass

If you were previously importing styles from `carbon-components`, you can now

function MyComponent() {
  return (
    <>




    </>
  );
}
```

They should start looking like this:

**After**

```jsx

function MyComponent() {
  return (
    <>




    </>
  );
}
```

#### Removed icons

The following deprecated icons have been removed. Use the table below to find
their replacement, if available, in v11.

| Asset                           | v10                         | v11                         |
| :------------------------------ | :-------------------------- | :-------------------------- |
| app-switcher                    | AppSwitcher                 | Switcher                    |
| arrows                          | Arrows                      | ArrowsVertical              |
| back-to-top                     | BackToTop                   | UpToTop                     |
| checkbox--undeterminate         | CheckboxUndeterminate       | CheckboxIndeterminate       |
| checkbox--undeterminate--filled | CheckboxUndeterminateFilled | CheckboxIndeterminateFilled |
| cloud--lightning                | CloudLightning              | Removed                     |
| cloud--rain                     | CloudRain                   | Removed                     |
| cloud--snow                     | CloudSnow                   | Removed                     |
| delete                          | Delete                      | TrashCan                    |
| edit-filter                     | EditFilter                  | FilterEdit                  |
| sunny                           | Sunny                       | Removed                     |
| research--bloch-sphere          | ResearchBlockSphere         | BlochSphere                 |
| research--hinton-plot           | ResearchHintonPlot          | HintonPlot                  |
| research--matrix                | ResearchMatrix              | Matrix                      |
| misuse--alt                     | MisuseAlt                   | MisuseOutline               |
| logo--google                    | LogoGoogle                  | Removed                     |
| mammogram--stacked              | MammogramStacked            | Removed                     |
| logo--delicious                 | LogoDelicious               | Removed                     |
| logo--stumbleupon               | LogoStumbleUpon             | Removed                     |
| letter--Aa--large               | LetterAaLarge               | TextFont                    |
| glyph--caution-inverted         | GlyphCautionInverted        | CautionInverted             |
| glyph--caution                  | GlyphCaution                | Caution                     |
| glyph--circle-fill              | GlyphCircleFill             | CircleFill                  |
| glyph--circle-stroke            | GlyphCircleStroke           | CircleStroke                |
| glyph--critical                 | GlyphCritical               | Critical                    |
| glyph--incomplete               | GlyphIncomplete             | Incomplete                  |
| glyph--square-fill              | GlyphSquareFill             | SquareFill                  |
| glyph--undefined                | GlyphUndefined              | Undefined                   |

However, in certain situations, we will be unable to infer what the correct
update should be for a certain usage of the icon component. We have written the
codemod to work for most situations, but you will see console warnings for files
that will require you to manually review them to make sure the transforms were
applied correctly.

The most common manual update that teams will need to make is if a `prop` where
the icon is passed to places a `ref` on the icon. For example,

```jsx
function MyComponent({ renderIcon: Icon }) {
  const ref = useRef(null);
  return ;
}

// Before

// After the codemod
 } />
```

In this situation, you will need to update your code to use `React.forwardRef`:

```jsx
 (

  ))}
/>;

// Or, alternatively:
const Search16 = React.forwardRef((props, ref) => {
  return ;
});

;
```

#### Manual migration

In addition to the automated codemods above, there are several patterns in your
codebase that you will need to update manually:

- If you use the name `ForwardRef(IconName16)` in a test you will need to
  manually change this. Prefer to use the component directly if using enzyme
- If you use snapshot tests, the structure will change and include a `size`
  prop. Make sure that the `size` prop value matches what your icon name used to
  be. For example, `` should become ``

### Step 6: Update components that have changed

In v11, we have updated the APIs of certain components in one of the following
ways:

- Update `className` usage to be applied to the outermost element of a component
- Remove props that have been deprecated in v10
- Refactor the API to ship an accessible component

For a full list of changes to components, check out our
[Migration Docs](https://github.com/carbon-design-system/carbon/blob/main/docs/migration/v11.md#carbon-components-react).
Below are some common changes that may impact you and your usage of Carbon.

#### Changes to `className`

The usage of `className` prop has been updated so that the class is passed to
the outermost element of a component's inner markup. This was already the case
for most components and this change brings along the remaining components in the
library to this convention.

The following components previously were not applying the `className` prop to
the outermost element. If you were using a custom `className` to target an inner
element for any of these components, you will have to update your selectors to
now account for the `className` being placed on the outermost element.

- Checkbox
- ComboBox
- Table
- TableToolbar
- DataTableSkeleton
- DatePicker
- DatePickerSkeleton
- DatePickerInput
- Dropdown
- FileUploaderDropContainer
- FileUploaderItem
- FormGroup
- FilterableMultiSelect
- MultiSelect
- NotificationTextDetails
- NotificationIcon
- NumberInput
- OverflowMenuItem
- RadioButtonGroup
- RadioTile
- Select
- Slider
- Switch
- TextArea
- ControlledPasswordInput
- PasswordInput
- TextInput
- TimePicker
- Tooltip
- HeaderContainer

#### Notification

We have updated the notification components to be more accessible out of the
box. `ToastNotification` and `InlineNotification` now have `role="status"` by
default with additional `role` options of `log` and `alert`. These components do
not receive focus and should be used for information-only use cases. These
components no longer accept actions or interactive children.

For notifications requiring an action, a new `ActionableNotification` component
is available. It has a `role="alertdialog"` and receives focus by default.
Automatic placement of focus can be turned off via the new `hasFocus` prop.

All notifications have a new optional `closeOnEscape` prop, it enables
notifications to closed by pressing the `escape` key. For more details, see the
[notification components accessibility page](https://www.carbondesignsystem.com/components/notification/accessibility).

#### Update `ToastNotification` usage

- `children` can no longer contain interactive elements. A `ToastNotification`
  containing an action or interactive children should be replaced with
  `ActionableNotification`.
- The `notificationType` prop is no longer needed and can be removed.
- The default `role` is now `status`. `log` and `alert` can also be used.
- The `closeOnEscape` prop toggles the closing of notifications via the `escape`
  key.

#### Update `InlineNotification` usage

- The `actions` prop has been removed. An `InlineNotification` containing an
  action or interactive children should be replaced with
  `ActionableNotification` configured with the `inline` prop.
- `children` can no longer contain interactive elements.
- The `notificationType` prop is no longer needed and can be removed.
- The default `role` is now `status`. `log` and `alert` can also be used.
- The `closeOnEscape` prop toggles the closing of notifications via the `escape`
  key.

#### When using `ActionableNotification`:

- The `inline` prop enables a styling variation resulting in a similar visual
  design to `InlineNotification`.
- The `actionButtonLabel` prop configures the action button text.
- The `hasFocus` prop toggles the automatic placement of focus.
- The `closeOnEscape` prop toggles the closing of notifications via the `escape`
  key.

#### Tabs

Tabs have been updated to be more composable so that you have the flexibility
and control to make them look and act how you want.

In v10, you may have code that looks like the following:

```js


    <p>Content for first tab goes here.</p>


    <p>Content for second tab goes here.</p>


    <p>Content for third tab goes here.</p>


    <p>Content for fourth tab goes here.</p>


```

Those same Tabs, migrated to v11:

```js


    Tab Label 1
    Tab Label 2
    Tab Label 3
    Tab Label 4 shows truncation


    Content for first tab goes here.
    Content for second tab goes here.
    Content for third tab goes here.
    Content for fourth tab goes here.


```

#### Update `Tabs` and `Tab` usage

All the same functionality for Tabs is available in v11 and more! However, some
props have been deprecated because they have either been renamed or are no
longer needed. Below are the minor tweaks in naming or implementation.

- the `type` prop is deprecated. Both "contained" and "default" tabs still exist
  but now can be called by adding the prop `contained` to the `TabList`.
- Default tabs are now referred to as line tabs in our documentation here and in
  our storybook.
- `hidden` prop is no longer needed with the new composable Tabs. You have
  control over tab content and when it is hidden through the `TabPanel` and
  `TabPanels` components.
- `selected` prop is now named `selectedIndex`.
- `tabContentClassName` is no longer needed. `TabPanel` (equivalent to tab
  content) takes in a className prop on its outermost node.
- For `Tab`, `label` is no longer needed. `children` of `Tab` are now the label.
- Due to its composability, `renderAnchor`, `renderButton`, `renderContent` are
  no longer needed on `Tab`. You now have full control over what is rendered
  inside of `Tab` and `TabPanel`.
- Because `renderButton` is no longer needed, the associated `tabIndex` prop has
  also been deprecated.
- `selected` on `Tab` is deprecated in favor or `selectedIndex`, now placed on
  `Tabs` instead.

For more details about the changes to Tabs, see our storybook documentation
[here](https://react.carbondesignsystem.com/?path=/docs/components-tabs--default).

### Step 7: Done with @carbon/react!

And that's it! You're done. At this point you have migrated to use Carbon v11
using the `@carbon/react` package.

If you run into any problems after this point, please feel free to reach out to
us over on Slack or open up a discussion on
[GitHub](https://github.com/carbon-design-system/carbon/discussions/categories/help).
We want to make this migration experience as seamless as possible and will be
monitoring both areas to help out.

## Migrating an app or library using just styles

Starting in v11, the styles for Carbon live in the `@carbon/styles` package.
Alternatively, you can continue to use `carbon-components` as it re-exports
styles from this package directly.

For teams using Svelte, Angular, Vue, LWC, or Web Components, please
[review the documentation](https://carbondesignsystem.com/developing/frameworks/web-components),
for those respective frameworks before making the migration to v11.

### Step 1: Install @carbon/styles

To get started, uninstall `carbon-components` from your project:

```bash
npm uninstall carbon-components
```

Or, with [Yarn](https://yarnpkg.com/):

```bash
yarn remove carbon-components
```

Next, install the `@carbon/styles` package:

```bash
npm install @carbon/styles
```

Or, with [Yarn](https://yarnpkg.com/):

```bash
yarn add @carbon/styles
```

### Step 2: Install and configure Dart Sass

Previously, `carbon-components` supported being compiled by different Sass
libraries. Starting in v11, the `@carbon/styles` package requires Dart Sass
through the `sass` package in order to compile. This change comes from our
migration to Sass Modules in order to improve our compilation times and overall
project structure.

If you don't have this dependency already in your project, you can install it:

```bash
npm install sass
```

Or, with [Yarn](https://yarnpkg.com/):

```bash
yarn add sass
```

Similarly, if you currently use `node-sass` now is a good time to remove that
dependency from your project. In most situations, Dart Sass is a drop-in
replacement for `node-sass` and should require no changes on your end in order
to use it once you install the dependency.

One you have Dart Sass installed, it's important that you configure your project
to support resolving imports in Sass from `node_modules`. Typically, this means
adding `node_modules` to your `includePaths` config for Sass in your bundler or
toolchain of choice.

To learn more about how to configure your specific toolchain to support this,
read the documentation for configuration
[here](https://github.com/carbon-design-system/carbon/blob/main/packages/styles/docs/sass.md#configuration).
We also have published a guide over on
[Medium](https://medium.com/carbondesign/migrating-from-node-sass-to-sass-eba9db004a3a)
to help out with common problems that come from this migration.











### Step 3: Update import paths and tokens

Now, open your project's root stylesheet to make the following changes:

```diff
- @import 'carbon-components/scss/globals/scss/styles.scss';
+ @use '@carbon/styles';
```

If you were providing any configuration options before you imported Carbon you
can now provide them using the `with` syntax:

```scss
@use '@carbon/styles' with (
  $css--default-type: true,
  $css--reset: true
);
```

For cases where your projects does't need to include everything via
`@use '@carbon/styles'`; and just want to do individual component styles.

```scss
// configure feature flags if needed, if not this line can be removed
@use '@carbon/styles/scss/config' with (
  $font-path: '@ibm/plex'
);

// ensure the css reset is included
@use '@carbon/styles/scss/reset';

// add styles for components individually
@use '@carbon/styles/scss/components/button';
```

When migrating your custom components, some of our most used sass assets are
included below, along with what you would need to have at the top of your file
to use it. Essentially, all we are doing is including the path where we would
[find these styles](https://github.com/carbon-design-system/carbon/tree/main/packages/styles/scss)
in our package.

| Carbon sass I'm using           | Sass modules to include                                   |
| ------------------------------- | --------------------------------------------------------- |
| Theme tokens                    | `@use '@carbon/styles/scss/theme' as *`                   |
| Theme mixins                    | `@use '@carbon/styles/scss/themes' as *`                  |
| Design language color tokens    | `@use '@carbon/styles/scss/colors' as *`                  |
| Spacing tokens                  | `@use '@carbon/styles/scss/spacing' as *`                 |
| Breakpoint mixins               | `@use '@carbon/styles/scss/breakpoint' as *`              |
| Motion tokens and functions     | `@use '@carbon/styles/scss/motion' as *`                  |
| Rem and other convert functions | `@use '@carbon/styles/scss/utilities/convert' as *`       |
| Z-index helper                  | `@use '@carbon/styles/scss/utilities/z-index' as *`       |
| Focus outline helper            | `@use '@carbon/styles/scss/utilities/focus-outline' as *` |
| Transform rotate helper         | `@use '@carbon/styles/scss/utilities/rotate' as *`        |
| Skeleton animation helper       | `@use '@carbon/styles/scss/utilities/skeleton' as *`      |

Now that you've migrated all of your imports, do a find/replace using your
favorite code editor. The prefix`carbon--` is no longer necessary. You can do a
find for `carbon--` and replace it with nothing to remove across all your files
like the example below. The full list of changes are available in our
[Migration Docs](https://github.com/carbon-design-system/carbon/blob/main/docs/migration/v11.md#changing-import-paths-from-scssglobalsscss-to-scss).

```diff
- @include carbon--breakpoint(lg) {
+ @include breakpoint(lg) {
      width: 42%;
  }
```

Once you've removed the prefix, your styles should all be set using the old, v10
tokens. We recommend teams install the community supported
[stylelint-plugin-carbon-tokens](https://github.com/carbon-design-system/stylelint-plugin-carbon-tokens)
to further assist in migrating your tokens to v11 tokens as the old v10 tokens
will be removed in our next major release.











### Step 4: Update bx to cds

If you are targeting specific selectors that use the `bx` prefix, you will need
to update your code to either target the `cds` prefix for selectors or update
Carbon's configuration to use `bx` as the prefix by writing the following:

```scss
// Option A
@use '@carbon/styles' with (
  $prefix: 'bx'
);
// Option B
@use '@carbon/styles/scss/config' with (
  $prefix: 'bx'
);
```

### Step 5: Enable flexbox grid

If you are using the flexbox-based grid in your project, you can continue to use
this feature in v11 by importing the following:

```scss
@use '@carbon/styles/scss/grid/flexbox';
```

This is important due to the fact that the CSS Grid implementation is used by
default in v11. However, bringing in the flexbox grid styles in this way means
that your layouts will continue to work the same as in v10.

### Step 6: Done with @carbon/styles!

And that's it! You're done. At this point you have migrated to use Carbon v11
using the `@carbon/styles` package.

If you run into any problems after this point, please feel free to reach out to
us over on Slack or open up a discussion on
[GitHub](https://github.com/carbon-design-system/carbon/discussions/categories/help).
We want to make this migration experience as seamless as possible and will be
monitoring both areas to help out.

## Migrating carbon-icons

The `carbon-icons` package has been deprecated and is no longer supported. To
use icons from the Carbon Design System, you should install the appropriate
library to use with your framework:

| Package                 | Framework          | Link                                                    |
| :---------------------- | :----------------- | :------------------------------------------------------ |
| `@carbon/icons-react`   | React              | [Link](https://npmjs.com/package/@carbon/icons-react)   |
| `@carbon/icons-angular` | Angular            | [Link](https://npmjs.com/package/@carbon/icons-angular) |
| `@carbon/icons-vue`     | Vue                | [Link](https://npmjs.com/package/@carbon/icons-vue)     |
| `carbon-icons-svelte`   | Svelte             | [Link](https://npmjs.com/package/carbon-icons-svelte)   |
| `@carbon/icons`         | Vanilla JavaScript | [Link](https://npmjs.com/package/@carbon/icons)         |

If you are using `@carbon/react`, you can directly import icons from
`@carbon/react/icons`.

## Migrating Carbon elements

The packages that we ship for the IBM Design Language have been updated in v11.
The most notable change is that these packages now require Dart Sass in order to
compile as they now use Sass Modules to improve compilation times.

If you were directly importing from one of these element packages, consider
importing from either `@carbon/styles` or `@carbon/react` instead. Both of these
packages provide entrypoints for elements packages on top of the styles for
Carbon itself.

For teams using these packages directly, you will need to update each of the
elements packages you're using to the latest version.

```bash
npm install @carbon/<package-name>@latest
```

Or, with [Yarn](https://yarnpkg.com/):

```bash
yarn upgrade @carbon/<package-name>@latest
```

Afterwards, you will need to update the import paths and import names themselves
that you bring in. In general, each package now supports importing from the
package directly and all `carbon--` prefixed variables, mixins, and functions
have been renamed to remove the prefix.

For full details fo the changes to each elements package, check out the links
below.

| Package            | Migration Docs                                                                                        |
| :----------------- | :---------------------------------------------------------------------------------------------------- |
| `@carbon/colors`   | [Link](https://github.com/carbon-design-system/carbon/blob/main/docs/migration/v11.md#carboncolors)   |
| `@carbon/elements` | [Link](https://github.com/carbon-design-system/carbon/blob/main/docs/migration/v11.md#carbonelements) |
| `@carbon/grid`     | [Link](https://github.com/carbon-design-system/carbon/blob/main/docs/migration/v11.md#carbongrid)     |
| `@carbon/layout`   | [Link](https://github.com/carbon-design-system/carbon/blob/main/docs/migration/v11.md#carbonlayout)   |
| `@carbon/motion`   | [Link](https://github.com/carbon-design-system/carbon/blob/main/docs/migration/v11.md#carbonmotion)   |
| `@carbon/themes`   | [Link](https://github.com/carbon-design-system/carbon/blob/main/docs/migration/v11.md#carbonthemes)   |
| `@carbon/type`     | [Link](https://github.com/carbon-design-system/carbon/blob/main/docs/migration/v11.md#carbontype)     |

If you were previously using the `@carbon/import-once` package, you can continue
to use this in v11. However, this package will receive no further updates after
Carbon switched to using Sass Modules.
