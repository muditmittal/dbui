# DuBois Design System — Complete Reference

Extracted from `databricks-eng/universe` repo, `design-system/src/` directory.

---

## PART 1: DESIGN TOKENS

### Primitive Colors
Source: `design-system/src/theme/_generated/PrimitiveColors.ts`

| Token | Value |
|-------|-------|
| blue100 | #F0F8FF |
| blue200 | #D7EDFE |
| blue300 | #BAE1FC |
| blue400 | #8ACAFF |
| blue500 | #4299E0 |
| blue600 | #2272B4 |
| blue700 | #0E538B |
| blue800 | #04355D |
| brown | #A6630C |
| coral | #C83243 |
| green100 | #F3FCF6 |
| green200 | #D4F7DF |
| green300 | #B1ECC5 |
| green400 | #8DDDA8 |
| green500 | #3BA65E |
| green600 | #277C43 |
| green700 | #115026 |
| green800 | #093919 |
| grey050 | #F6F7F9 |
| grey100 | #E8ECF0 |
| grey200 | #D1D9E1 |
| grey300 | #C0CDD8 |
| grey350 | #92A4B3 |
| grey400 | #8396A5 |
| grey500 | #5F7281 |
| grey600 | #445461 |
| grey650 | #37444F |
| grey700 | #1F272D |
| grey800 | #11171C |
| indigo | #434A93 |
| lemon | #FACB66 |
| lime | #308613 |
| neutral050 | #F7F7F7 |
| neutral100 | #EBEBEB |
| neutral200 | #D8D8D8 |
| neutral300 | #CBCBCB |
| neutral350 | #A2A2A2 |
| neutral400 | #939393 |
| neutral500 | #6F6F6F |
| neutral600 | #525252 |
| neutral650 | #424242 |
| neutral700 | #262626 |
| neutral800 | #161616 |
| pink | #B45091 |
| purple | #8A63BF |
| red100 | #FFF5F7 |
| red200 | #FDE2E8 |
| red300 | #FBD0D8 |
| red400 | #F792A6 |
| red500 | #E65B77 |
| red600 | #C82D4C |
| red700 | #9E102C |
| red800 | #630316 |
| teal | #04867D |
| turquoise | #137DAE |
| white | #FFFFFF |
| yellow100 | #FFF9EB |
| yellow200 | #FCEACA |
| yellow300 | #F8D4A5 |
| yellow400 | #F2BE88 |
| yellow500 | #DE7921 |
| yellow600 | #BE501E |
| yellow700 | #93320B |
| yellow800 | #5F1B02 |

### AI Brand Gradient Colors
Source: `design-system/src/theme/colors.ts`

| Token | Value |
|-------|-------|
| branded.ai.gradientStart | #4299E0 |
| branded.ai.gradientMid | #CA42E0 |
| branded.ai.gradientEnd | #FF5F46 |

---

### Semantic Colors — Light Mode
Source: `design-system/src/theme/_generated/SemanticColors-Light.ts`

| Token | Value |
|-------|-------|
| actionDangerDefaultBackgroundDefault | rgba(200, 45, 76, 0.0000) |
| actionDangerDefaultBackgroundHover | rgba(200, 45, 76, 0.0800) |
| actionDangerDefaultBackgroundPress | rgba(200, 45, 76, 0.1600) |
| actionDangerDefaultBorderDefault | red600 |
| actionDangerDefaultBorderHover | red700 |
| actionDangerDefaultBorderPress | red800 |
| actionDangerDefaultTextDefault | red600 |
| actionDangerDefaultTextHover | red700 |
| actionDangerDefaultTextPress | red800 |
| actionDangerPrimaryBackgroundDefault | red600 |
| actionDangerPrimaryBackgroundHover | red700 |
| actionDangerPrimaryBackgroundPress | red800 |
| actionDangerPrimaryText | white |
| actionDefaultBackgroundDefault | rgba(34, 114, 180, 0.0000) |
| actionDefaultBackgroundHover | rgba(34, 114, 180, 0.0800) |
| actionDefaultBackgroundPress | rgba(34, 114, 180, 0.1600) |
| actionDefaultBorderDefault | neutral300 |
| actionDefaultBorderFocus | blue600 |
| actionDefaultBorderHover | blue600 |
| actionDefaultBorderPress | blue800 |
| actionDefaultIconDefault | neutral600 |
| actionDefaultIconHover | blue700 |
| actionDefaultIconPress | blue800 |
| actionDefaultTextDefault | grey800 |
| actionDefaultTextHover | blue700 |
| actionDefaultTextPress | blue800 |
| actionDisabledBackground | neutral100 |
| actionDisabledBorder | neutral200 |
| actionDisabledText | neutral350 |
| actionIconBackgroundDefault | rgba(34, 114, 180, 0.0000) |
| actionIconBackgroundHover | rgba(34, 114, 180, 0.0800) |
| actionIconBackgroundPress | rgba(34, 114, 180, 0.1600) |
| actionIconIconDefault | neutral600 |
| actionIconIconHover | blue700 |
| actionIconIconPress | blue800 |
| actionLinkDefault | blue600 |
| actionLinkHover | blue700 |
| actionLinkPress | blue800 |
| actionPrimaryBackgroundDefault | blue600 |
| actionPrimaryBackgroundHover | blue700 |
| actionPrimaryBackgroundPress | blue800 |
| actionPrimaryIcon | white |
| actionPrimaryTextDefault | white |
| actionPrimaryTextHover | white |
| actionPrimaryTextPress | white |
| actionTertiaryBackgroundDefault | rgba(34, 114, 180, 0.0000) |
| actionTertiaryBackgroundHover | rgba(34, 114, 180, 0.0800) |
| actionTertiaryBackgroundPress | rgba(34, 114, 180, 0.1600) |
| actionTertiaryIconDefault | blue600 |
| actionTertiaryIconHover | blue700 |
| actionTertiaryIconPress | blue800 |
| actionTertiaryTextDefault | blue600 |
| actionTertiaryTextHover | blue700 |
| actionTertiaryTextPress | blue800 |
| backgroundDanger | red100 |
| backgroundPrimary | white |
| backgroundSecondary | neutral050 |
| backgroundSuccess | green100 |
| backgroundWarning | yellow100 |
| border | neutral100 |
| borderAccessible | neutral500 |
| borderDanger | red300 |
| borderWarning | yellow300 |
| codeBackground | rgba(82, 82, 82, 0.0800) |
| overlayOverlay | rgba(0, 0, 0, 0.2600) |
| progressFill | neutral300 |
| progressFillPrimary | blue500 |
| progressTrack | neutral100 |
| skeleton | rgba(162, 162, 162, 0.1600) |
| tableBackgroundSelectedDefault | rgba(82, 82, 82, 0.0800) |
| tableBackgroundSelectedHover | rgba(82, 82, 82, 0.1200) |
| tableBackgroundUnselectedDefault | white |
| tableBackgroundUnselectedHover | rgba(82, 82, 82, 0.0400) |
| textPlaceholder | neutral500 |
| textPrimary | neutral800 |
| textSecondary | neutral500 |
| textValidationDanger | red600 |
| textValidationSuccess | green600 |
| textValidationWarning | yellow600 |
| tooltipBackgroundTooltip | neutral800 |

---

### Semantic Colors — Dark Mode
Source: `design-system/src/theme/_generated/SemanticColors-Dark.ts`

| Token | Value |
|-------|-------|
| actionDangerDefaultBackgroundDefault | rgba(247, 146, 166, 0.0000) |
| actionDangerDefaultBackgroundHover | rgba(247, 146, 166, 0.0800) |
| actionDangerDefaultBackgroundPress | rgba(247, 146, 166, 0.1600) |
| actionDangerDefaultBorderDefault | red500 |
| actionDangerDefaultBorderHover | red400 |
| actionDangerDefaultBorderPress | red300 |
| actionDangerDefaultTextDefault | red500 |
| actionDangerDefaultTextHover | red400 |
| actionDangerDefaultTextPress | red300 |
| actionDangerPrimaryBackgroundDefault | red500 |
| actionDangerPrimaryBackgroundHover | red400 |
| actionDangerPrimaryBackgroundPress | red300 |
| actionDangerPrimaryText | grey800 |
| actionDefaultBackgroundDefault | rgba(138, 202, 255, 0.0000) |
| actionDefaultBackgroundHover | rgba(138, 202, 255, 0.0800) |
| actionDefaultBackgroundPress | rgba(138, 202, 255, 0.1600) |
| actionDefaultBorderDefault | grey650 |
| actionDefaultBorderFocus | blue400 |
| actionDefaultBorderHover | blue400 |
| actionDefaultBorderPress | blue300 |
| actionDefaultIconDefault | grey350 |
| actionDefaultIconHover | blue400 |
| actionDefaultIconPress | blue300 |
| actionDefaultTextDefault | grey100 |
| actionDefaultTextHover | blue400 |
| actionDefaultTextPress | blue300 |
| actionDisabledBackground | grey650 |
| actionDisabledBorder | grey600 |
| actionDisabledText | grey500 |
| actionIconBackgroundDefault | rgba(255, 255, 255, 0.0000) |
| actionIconBackgroundHover | rgba(255, 255, 255, 0.0800) |
| actionIconBackgroundPress | rgba(255, 255, 255, 0.1600) |
| actionIconIconDefault | grey350 |
| actionIconIconHover | grey300 |
| actionIconIconPress | grey200 |
| actionLinkDefault | blue500 |
| actionLinkHover | blue400 |
| actionLinkPress | blue300 |
| actionPrimaryBackgroundDefault | blue500 |
| actionPrimaryBackgroundHover | blue400 |
| actionPrimaryBackgroundPress | blue300 |
| actionPrimaryIcon | grey800 |
| actionPrimaryTextDefault | grey800 |
| actionPrimaryTextHover | grey800 |
| actionPrimaryTextPress | grey800 |
| actionTertiaryBackgroundDefault | rgba(143, 205, 255, 0.0000) |
| actionTertiaryBackgroundHover | rgba(143, 205, 255, 0.0800) |
| actionTertiaryBackgroundPress | rgba(143, 205, 255, 0.1600) |
| actionTertiaryIconDefault | blue500 |
| actionTertiaryIconHover | blue400 |
| actionTertiaryIconPress | blue300 |
| actionTertiaryTextDefault | blue500 |
| actionTertiaryTextHover | blue400 |
| actionTertiaryTextPress | blue300 |
| backgroundDanger | rgba(200, 45, 76, 0.1600) |
| backgroundPrimary | grey800 |
| backgroundSecondary | grey700 |
| backgroundSuccess | rgba(39, 124, 67, 0.1600) |
| backgroundWarning | rgba(190, 80, 30, 0.1600) |
| border | grey700 |
| borderAccessible | grey300 |
| borderDanger | red500 |
| borderWarning | yellow500 |
| codeBackground | grey650 |
| overlayOverlay | rgba(0, 0, 0, 0.4500) |
| progressFill | grey500 |
| progressFillPrimary | blue600 |
| progressTrack | grey650 |
| skeleton | rgba(144, 164, 181, 0.1600) |
| tableBackgroundSelectedDefault | rgba(189, 205, 219, 0.0800) |
| tableBackgroundSelectedHover | rgba(189, 205, 219, 0.1200) |
| tableBackgroundUnselectedDefault | grey800 |
| tableBackgroundUnselectedHover | rgba(189, 205, 219, 0.0400) |
| textPlaceholder | grey400 |
| textPrimary | grey100 |
| textSecondary | grey350 |
| textValidationDanger | red500 |
| textValidationSuccess | green500 |
| textValidationWarning | yellow500 |
| tooltipBackgroundTooltip | grey100 |

---

### Protected Semantic Colors (Tag colors)
Source: `design-system/src/theme/_generated/ProtectedSemanticColors.ts`

#### Light Mode Tag Colors

| Token | Value |
|-------|-------|
| tagBackgroundBrown | rgba(171, 86, 2, 0.0800) |
| tagBackgroundCharcoal | neutral650 (#424242) |
| tagBackgroundCoral | rgba(240, 0, 64, 0.0600) |
| tagBackgroundDefault | rgba(22, 22, 22, 0.0500) |
| tagBackgroundIndigo | rgba(1, 68, 255, 0.0600) |
| tagBackgroundLemon | rgba(255, 191, 1, 0.1800) |
| tagBackgroundLime | rgba(2, 179, 2, 0.0800) |
| tagBackgroundPink | rgba(240, 1, 150, 0.0600) |
| tagBackgroundPurple | rgba(59, 0, 255, 0.0500) |
| tagBackgroundTeal | rgba(2, 192, 150, 0.0900) |
| tagBackgroundTurquoise | rgba(2, 192, 213, 0.0900) |
| tagHover | rgba(34, 114, 180, 0.0800) |
| tagPress | rgba(34, 114, 180, 0.1600) |
| tagInverse | neutral800 (#161616) |
| tagIconBrown | #815E46 |
| tagIconCharcoal | neutral350 (#A2A2A2) |
| tagIconCoral | #CA244E |
| tagIconDefault | neutral600 (#525252) |
| tagIconHover | neutral600 |
| tagIconIndigo | #3451B2 |
| tagIconLemon | #915830 |
| tagIconLime | #227534 |
| tagIconPink | #C41C87 |
| tagIconPress | neutral600 |
| tagIconPurple | #5746AF |
| tagIconTeal | #00776B |
| tagIconTurquoise | #00708D |
| tagTextBrown | #3E332E |
| tagTextCharcoal | neutral100 (#EBEBEB) |
| tagTextCoral | #64172B |
| tagTextDefault | neutral800 (#161616) |
| tagTextIndigo | #101D46 |
| tagTextLemon | #4F3422 |
| tagTextLime | #203C25 |
| tagTextPink | #651249 |
| tagTextPurple | #2F265F |
| tagTextTeal | #0D3D38 |
| tagTextTurquoise | #0D3C48 |

#### Dark Mode Tag Colors

| Token | Value |
|-------|-------|
| tagBackgroundBrown | rgba(171, 86, 2, 0.1000) |
| tagBackgroundCharcoal | grey300 (#C0CDD8) |
| tagBackgroundCoral | rgba(240, 0, 64, 0.1000) |
| tagBackgroundDefault | rgba(232, 236, 240, 0.0800) |
| tagBackgroundIndigo | rgba(1, 68, 255, 0.1200) |
| tagBackgroundLemon | rgba(255, 191, 1, 0.1800) |
| tagBackgroundLime | rgba(2, 179, 2, 0.0800) |
| tagBackgroundPink | rgba(240, 1, 150, 0.1200) |
| tagBackgroundPurple | rgba(59, 0, 255, 0.1200) |
| tagBackgroundTeal | rgba(2, 192, 150, 0.1200) |
| tagBackgroundTurquoise | rgba(2, 192, 213, 0.1200) |
| tagHover | rgba(138, 202, 255, 0.0800) |
| tagPress | rgba(138, 202, 255, 0.1600) |
| tagInverse | grey800 (#11171C) |
| tagIconBrown | #DAB594 |
| tagIconCharcoal | grey650 (#37444F) |
| tagIconCoral | #FF859D |
| tagIconDefault | grey350 (#92A4B3) |
| tagIconHover | grey350 |
| tagIconIndigo | #99A2FF |
| tagIconLemon | #FFCD4D |
| tagIconLime | #70D083 |
| tagIconPink | #F986C9 |
| tagIconPress | grey350 |
| tagIconPurple | #B399FF |
| tagIconTeal | #0AD8B6 |
| tagIconTurquoise | #1FD0F3 |
| tagTextBrown | #F2E1CA |
| tagTextCharcoal | grey800 (#11171C) |
| tagTextCoral | #FED2E1 |
| tagTextDefault | grey100 (#E8ECF0) |
| tagTextIndigo | #DDDFFE |
| tagTextLemon | #FFE7B3 |
| tagTextLime | #C2F0C2 |
| tagTextPink | #FDD1EA |
| tagTextPurple | #E2DDFE |
| tagTextTeal | #ADF0DD |
| tagTextTurquoise | #B6ECF7 |

---

### Border Radii
Source: `design-system/src/theme/_generated/BorderRadii.ts`

| Token | Value |
|-------|-------|
| borderRadius0 | 0 |
| borderRadiusSm | 4px |
| borderRadiusMd | 8px |
| borderRadiusLg | 12px |
| borderRadiusXl | 16px |
| borderRadiusFull | 999px |

Legacy (from `borders.ts`): `borderRadiusMd: 4`, `borderRadiusLg: 8`

---

### Shadows
Source: `design-system/src/theme/shadows.ts`

#### Light Mode
| Token | Value |
|-------|-------|
| xs | `0px 1px 0px 0px rgba(0, 0, 0, 0.05)` |
| sm | `0px 2px 3px -1px rgba(0, 0, 0, 0.05), 0px 1px 0px 0px rgba(0, 0, 0, 0.02)` |
| md | `0px 3px 6px 0px rgba(0, 0, 0, 0.05)` |
| lg | `0px 2px 16px 0px rgba(0, 0, 0, 0.08)` |
| xl | `0px 8px 40px 0px rgba(0, 0, 0, 0.13)` |

#### Dark Mode
| Token | Value |
|-------|-------|
| xs | `0px 1px 0px 0px rgba(0, 0, 0, 0.45)` |
| sm | `0px 2px 3px -1px rgba(0, 0, 0, 0.45), 0px 1px 0px 0px rgba(0, 0, 0, 0.26)` |
| md | `0px 3px 6px 0px rgba(0, 0, 0, 0.45)` |
| lg | `0px 2px 16px 0px rgba(0, 0, 0, 0.61)` |
| xl | `0px 8px 40px 0px rgba(0, 0, 0, 0.87)` |

#### Legacy Shadows (deprecated)
| Token | Light | Dark |
|-------|-------|------|
| shadowLow | `0px 4px 16px rgba(31, 39, 45, 0.12)` | `0px 4px 16px rgba(0, 0, 0, 0.12)` |
| shadowHigh | `0px 8px 24px rgba(31, 39, 45, 0.2)` | `0px 8px 24px rgba(0, 0, 0, 0.2)` |

---

### Typography
Source: `design-system/src/theme/typography.ts`

| Token | Value |
|-------|-------|
| fontSizeSm | 12 |
| fontSizeBase / fontSizeMd | 13 |
| fontSizeLg | 18 |
| fontSizeXl | 22 |
| fontSizeXxl | 32 |
| lineHeightSm | 16px |
| lineHeightBase / lineHeightMd | 20px |
| lineHeightLg | 24px |
| lineHeightXl | 28px |
| lineHeightXxl | 40px |
| typographyRegularFontWeight | 400 |
| typographyBoldFontWeight | 600 |

---

### Spacing
Source: `design-system/src/theme/spacing.ts`

Base unit: **8px**

| Token | Value |
|-------|-------|
| xs | 4px |
| sm | 8px |
| mid | 12px |
| md | 16px |
| lg | 24px |
| xl | 32px |

---

### General Variables
Source: `design-system/src/theme/generalVariables.ts`

| Token | Value |
|-------|-------|
| borderRadiusBase | 4 |
| borderWidth | 1 |
| heightSm | 32 |
| heightBase | 40 |
| iconSize | 24 |
| iconFontSize | 16 |
| buttonHeight | 40 |
| buttonInnerHeight | 22 (40 - 8*2 - 1*2) |

---

## PART 2: ALL COMPONENTS

### Component Index

| # | Component | Variants/Types | Sizes | Key Props | Source | Storybook |
|---|-----------|---------------|-------|-----------|--------|-----------|
| 1 | **AccessibleContainer** | — | — | (wrapper component) | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/AccessibleContainer) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/AccessibleContainer) |
| 2 | **Accordion** | deEmphasized header style | — | children, deEmphasized | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Accordion) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Accordion) |
| 3 | **Alert** | type: `'info' \| 'error' \| 'warning'` (AlertType, excludes 'success') | `'small' \| 'large'` (default: large) | message, description, closable, actions (ButtonProps[]), banner | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Alert) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Alert) |
| 4 | **AutoComplete** | — | — | Wraps AntD AutoComplete; standard AutoCompleteProps | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/AutoComplete) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/AutoComplete) |
| 5 | **Avatar** | type: `'user' \| 'entity'`; background: `'indigo' \| 'teal' \| 'pink' \| 'purple' \| 'brown'` | `'xxs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | src, icon, label, type, backgroundcolor; also AvatarGroup, DBAssistantAvatar | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Avatar) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Avatar) |
| 6 | **Breadcrumb** | — | — | Compound: Breadcrumb, Breadcrumb.Item | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Breadcrumb) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Breadcrumb) |
| 7 | **Button** | type: `'primary' \| 'link' \| 'tertiary'` (default: secondary/default); danger: boolean | `'middle' \| 'small'` (default: middle) | icon, endIcon, loading, loadingDescription, danger, disabled, href, htmlType, onClick | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Button) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Button) |
| 8 | **Card** | — | — | disableHover, onClick, href; extends HTMLDivElement | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Card) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Card) |
| 9 | **Checkbox** | — | — | isChecked (boolean\|null for indeterminate), onChange, isDisabled, wrapperStyle; CheckboxGroup: layout `'vertical' \| 'horizontal'` | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Checkbox) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Checkbox) |
| 10 | **ContextMenu** | — | — | Compound: Root, Trigger, Content, Item, CheckboxItem, RadioGroup, RadioItem, SubTrigger, SubContent, Label, Separator, Group, Arrow, Sub, ItemIndicator | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/ContextMenu) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/ContextMenu) |
| 11 | **DatePicker** | DatePicker, RangePicker, TimePicker, QuarterPicker, WeekPicker, MonthPicker, YearPicker | — | Standard AntD DatePicker props + wrapperDivProps | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/DatePicker) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/DatePicker) |
| 12 | **DialogCombobox** | multiselect support | — | label, value, stayOpenOnSelection, multiSelect, placeholder; Compound with Content, CountBadge, Footer, AddButton, etc. | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/DialogCombobox) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/DialogCombobox) |
| 13 | **DialogPrimitive** | — | — | Re-exports Radix Dialog primitives | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/DialogPrimitive) | — |
| 14 | **Drawer** | — | `'default' \| 'small'` (default: default) | Compound: Root, Trigger, Content; Content props: title, footer, size, onInteractOutside | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Drawer) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Drawer) |
| 15 | **Dropdown** | — | — | Wraps AntD Dropdown; standard DropdownProps | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Dropdown) | — |
| 16 | **DropdownMenu** | — | — | Compound: Root, Content, Item, CheckboxItem, RadioGroup, RadioItem, SubTrigger, SubContent, Label, Separator, Group, Arrow, Trigger | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/DropdownMenu) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/DropdownMenu) |
| 17 | **Empty** | — | — | title, description, image, button | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Empty) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Empty) |
| 18 | **FormMessage** | type: `'error'` (default) | — | id, message, type, className | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/FormMessage) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Form) |
| 19 | **FormV2** | — | — | React Hook Form adapters (RHFAdapters); form context management | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/FormV2) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/FormUI) |
| 20 | **Graphic** | auto light/dark variant selection | — | component (SVG component) | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Graphic) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Graphic) |
| 21 | **Grid** | — | — | Compound: Row, Col (wraps AntD Grid) | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Grid) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Grid) |
| 22 | **Header** | — | — | title, titleElementLevel, breadcrumbs, buttons (as Space children) | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Header) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Header) |
| 23 | **Hint** | — | — | Standard span HTML attributes | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Hint) | — |
| 24 | **HoverCard** | — | — | Merges Radix HoverCard Root + Content props: defaultOpen, open, onOpenChange, openDelay, closeDelay, side, align, etc. | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/HoverCard) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/HoverCard) |
| 25 | **Icon** | color: `'danger' \| 'warning' \| 'success' \| 'ai'` | — | component (SVG component), color, style | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Icon) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Icon) |
| 26 | **Input** | — | `'middle' \| 'small'` (default: middle) | validationState, locked, hasValue; also Input.Password, Input.TextArea, Input.Group | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Input) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Input) |
| 27 | **Label** | — | — | required, infoPopoverProps, htmlFor | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Label) | — |
| 28 | **Layout** | — | — | Compound: Layout, Layout.Header, Layout.Content, Layout.Footer, Layout.Sider (wraps AntD Layout) | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Layout) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Layout) |
| 29 | **List** | — | — | Wraps AntD List; standard ListProps<T> | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/List) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Listbox) |
| 30 | **LoadingState** | — | — | loading, loadingDescription; provides LoadingStateContext | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/LoadingState) | — |
| 31 | **Menu** | — | — | Compound: Menu, Menu.Item, Menu.SubMenu (wraps AntD Menu) | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Menu) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Menu) |
| 32 | **Modal** | — | `'normal' \| 'wide' \| 'extraWide'` | visible, onOk, onCancel, title, footer, size, confirmLoading, okText, cancelText, closable, destroyOnClose | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Modal) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Modal) |
| 33 | **NavigationMenu** | — | — | Compound: Root, List, Item (Radix NavigationMenu); Item has `active` prop | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/NavigationMenu) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/NavigationMenu) |
| 34 | **Notification** | — | — | Compound (Radix Toast): Root, Title, Description, Close, Provider, Viewport | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Notification) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Notification) |
| 35 | **Overflow** | — | — | Extends PopoverProps | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Overflow) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Overflow) |
| 36 | **PageWrapper** | — | — | Standard div wrapper with theme padding | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/PageWrapper) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/PageWrapper) |
| 37 | **Pagination** | — | — | Wraps AntD Pagination; pageSizeSelectAriaLabel, pageQuickJumperAriaLabel | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Pagination) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Pagination) |
| 38 | **Popover** | — | — | Compound (Radix Popover): Root, Trigger, Content, Close, Arrow, Anchor; also InfoPopover | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Popover) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Popover) |
| 39 | **PreviewCard** | — | `'default' \| 'large'` | title, subtitle, startIcon, titleActions, onClick, href, disabled, fullBleedImage, size | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/PreviewCard) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/PreviewCard) |
| 40 | **Progress** | — | — | Compound (Radix Progress): Root (value, minWidth, maxWidth), Indicator | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Progress) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Progress) |
| 41 | **Radio** | — | — | Radio, Radio.Group (layout: vertical/horizontal), Radio.HorizontalGroup, Radio.VerticalGroup | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Radio) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Radio) |
| 42 | **RadioTile** | — | — | Extends RadioProps with tile-style rendering | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/RadioTile) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/RadioTile) |
| 43 | **ResourceStatusIndicator** | status: `'online' \| 'disconnected' \| 'offline'` | — | status, style | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/ResourceStatusIndicator) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/ResourceStatusIndicator) |
| 44 | **SegmentedControl** | — | `'middle' \| 'small'` (default: middle) | SegmentedControlGroup (RadioGroup-based), SegmentedControlButton; onlyIcon support | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/SegmentedControl) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/SegmentedControl) |
| 45 | **Select** | — | — | Wraps DialogCombobox (single-select); placeholder, value, label | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Select) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Select) |
| 46 | **Sidebar** | — | — | Compound: Nav, NavButton (active, icon), Content (disableResize), Panel, PanelHeader, PanelHeaderTitle, PanelHeaderButton, PanelBody | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Sidebar) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Sidebar) |
| 47 | **Skeleton** | GenericSkeleton, ParagraphSkeleton, TitleSkeleton, TableSkeleton | — | loadingDescription | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Skeleton) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Skeleton) |
| 48 | **Slider** | — | — | Compound (Radix Slider): Root, Track, Range, Thumb | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Slider) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Slider) |
| 49 | **SnackBar** | — | — | Global snackbar queue; uses Notification primitives internally | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/SnackBar) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/SnackBar) |
| 50 | **Space** | — | — | Wraps AntD Space; size, direction, wrap | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Space) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Space) |
| 51 | **Spacer** | — | `'xs' \| 'sm' \| 'md' \| 'lg'` (default: md) | size, shrinks | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Spacer) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Spacer) |
| 52 | **Spinner** | — | `'small' \| 'default' \| 'large'` (default: default) | size, label, loadingDescription, inheritColor, animationDuration | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Spinner) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Spinner) |
| 53 | **SplitButton** | type: `'default' \| 'primary'` | `'middle' \| 'small'` | Primary button + dropdown menu; dropdownMenuRootProps, deprecatedMenu | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/SplitButton) | — |
| 54 | **Stepper** | direction: horizontal/vertical (auto-responsive) | — | steps (Step[]), currentStepIndex; Step: title, description, status, icon | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Stepper) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Stepper) |
| 55 | **Steps** | — | — | Wraps AntD Steps | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Steps) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Steps) |
| 56 | **Switch** | — | — | checked, defaultChecked, disabled, checkedChildren, unCheckedChildren, onChange, onClick, autoFocus | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Switch) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Switch) |
| 57 | **TableUI** | — | `'default' \| 'small'` | Compound: Table, TableRow, TableCell, TableHeader, TableRowAction, TableRowActionHeader, TableRowMultiAction, TableRowSelectCell, TableFilterInput, TableFilterLayout | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/TableUI) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/TableUI) |
| 58 | **Tabs** | — | — | Compound (Radix Tabs): Root, List (addButtonProps), Trigger, Content | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Tabs) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Tabs) |
| 59 | **Tag** | color: `'default' \| 'brown' \| 'coral' \| 'charcoal' \| 'indigo' \| 'lemon' \| 'lime' \| 'pink' \| 'purple' \| 'teal' \| 'turquoise'` | — | color, closable, closeButtonProps, onClose | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Tag) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Tag) |
| 60 | **ToggleButton** | — | `'middle' \| 'small'` (default: middle) | pressed, defaultPressed, icon, children | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/ToggleButton) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/ToggleButton) |
| 61 | **Tooltip** | — | — | Standard tooltip; extends Radix-based tooltip | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Tooltip) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Tooltip) |
| 62 | **Tree** | — | `'default' \| 'small' \| 'x-small' \| 'xx-small'` | treeData, selectedKeys, expandedKeys, autoExpandParent, onSelect, onExpand, onCheck, checkable, mode | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Tree) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Tree) |
| 63 | **TypeaheadCombobox** | — | — | Compound: Controls, CheckboxItem, Footer, AddButton, CountBadge + more | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/TypeaheadCombobox) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/TypeaheadCombobox) |
| 64 | **Typography** | — | — | Compound: Typography.Title, Typography.Text, Typography.Link, Typography.Paragraph | [Source](https://github.com/databricks-eng/universe/tree/master/design-system/src/design-system/Typography) | [Stories](https://github.com/databricks-eng/universe/tree/master/js/packages/du-bois/src/primitives/Typography) |

### Typography Sub-Components Detail

| Sub-Component | Key Props |
|---------------|-----------|
| **Typography.Title** | level (1-5), elementLevel, withoutMargins, color, ellipsis |
| **Typography.Text** | size: `'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl'`, color, bold, ellipsis, code, disabled |
| **Typography.Link** | href, target, onClick (extends AntD Link) |
| **Typography.Paragraph** | color, disabled, ellipsis |

### Button Detailed Breakdown

Height: 32px (middle), 24px (small)
Border radius: borderRadiusSm (4px)
Padding: 4px 12px (middle), 0px 8px (small)
Icon-only: width matches height, no border, tertiary-style background
Shadow: xs

| Type | Background | Text | Border |
|------|-----------|------|--------|
| Default (secondary) | transparent | grey800 / grey100 | neutral300 / grey650 |
| Primary | blue600 / blue500 | white / grey800 | none (box-shadow: xs) |
| Tertiary | transparent | blue600 / blue500 | none |
| Link | transparent | blue600 / blue500 | none |
| Danger (secondary) | transparent | red600 / red500 | red600 / red500 |
| Danger Primary | red600 / red500 | white / grey800 | none |
| Disabled | neutral100 / grey650 | neutral350 / grey500 | neutral200 / grey600 |

---

### Additional Components in Storybook Only

The following appear in the du-bois storybook (`js/packages/du-bois/src/primitives/`) but may not have dedicated source directories:
- **Banner**
- **Colors** (documentation)
- **Listbox**
- **PillControl**
- **Toolbar**
- **TreeGrid**
