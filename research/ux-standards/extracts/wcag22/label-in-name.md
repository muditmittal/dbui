---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/label-in-name
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Label in Name

## In brief

**Goal** — The visual label for controls is a trigger for speech activation.

**What to do** — Where practical, make the control’s text label and name match.

**Why it's important** — People who operate with voice interaction use the visible labels in their commands.

## Intent

The intent of this success criterion is to ensure that the words which visually label a component are also the words associated with the component programmatically. This helps ensure that people with disabilities can rely on visible labels as a means to interact with the components.

Most controls are accompanied by a visible text **label**. Those same controls have a programmatic **name**, also known as the [accessible name](https://www.w3.org/TR/accname/#dfn-accessible-name). Users typically have a much better experience if the words and characters in the visible label of a control match or are contained within the accessible name. When these match, speech-input users (i.e., users of speech recognition applications) can navigate by speaking the visible text labels of components, such as menus, links, and buttons, that appear on the screen. Sighted users who use text-to-speech (e.g., screen readers) will also have a better experience if the text they hear matches the text they see on the screen.

Note that where a visible text label does not exist for a component, this success criterion does not apply to that component.

Where text labels exist and are properly linked to the user interface components through established authoring practices, the label and name will normally match. When they don't match, speech-input users who attempt to use the visible text label as a means of navigation or selection (e.g., "move to Password") will be unsuccessful.  The speech-based navigation fails because the visible label spoken by the users does not match (or is not part of) the accessible name that is enabled as a speech-input command. In addition, when the accessible name is different from the visible label, it may function as a hidden command that can be accidentally activated by speech-input users.

Mismatches between visible labels and programmatic names for controls are even more of an issue for speech-input and text-to-speech users who also have cognitive challenges. Mismatches create an extra cognitive load for speech-input users, who must remember to say a speech command that is different from the visible label they see on a control. It also creates extra cognitive load for a text-to-speech user to absorb and understand speech output that does not match the visible label.

Note that when a user interface component lacks an [accessible name](https://www.w3.org/TR/accname/#dfn-accessible-name) — a failure of [4.1.2 Name, Role, Value](name-role-value) — and has a visible text label, then it also fails this success criterion.

### Identifying label text for components

In order for the label text and accessible name to be matched, it is first necessary to determine which text on the screen should be considered a label for any given control. There are often multiple text strings in a user interface that may be relevant to a control. However, there are reasons why it is best to conservatively interpret the label as being only the text in close proximity.

Conventionally the label for user interface components is the adjacent text string. The typical positioning for left to right languages is:

- immediately to the left of comboboxes, dropdown lists, text inputs, and other widgets (or in the absence of left-side labels, immediately above and aligned with the left edge of each input)

- immediately to the right of checkboxes and radio buttons

- inside buttons and tabs or immediately below icons serving as buttons

The rationale for some of these conventions is explained in [G162: Positioning labels to maximize predictability of relationships](../../Techniques/general/G162).

It is important to bias towards treating only the adjacent text as a label because liberal interpretations of what constitutes a text label can jeopardize the value of this success criterion (SC) by lessening predictability. Isolating the label to the single string in close proximity to the component makes it easier for developers, testers, and end users to identify the label targeted for evaluation in this SC. Predictable interpretation of labeling allows users of speech recognition technologies to interact with the element via its conventionally positioned label, and allows users of screen reading technologies to enjoy consistency between the nearby visible label and the announced name of the component.

Note that placeholder text within an input field is not considered an appropriate means of providing a label. The [HTML Standard](https://html.spec.whatwg.org/multipage/input.html#the-placeholder-attribute) states The placeholder attribute should not be used as an alternative to a `label`. However, it is worth noting that "label" in that statement is in code brackets and links to the `label` element. For the purposes of this Label in Name Success Criterion, "label" is not used in such a programmatic sense but is simply referring to a text string in close visual proximity to a component. As such, in the absence of any other nearby text string (as described in the preceding list), if an input contains placeholder text, such text may be a candidate for Label in Name. This is supported both through the accessible name calculation (discussed later) and from the practical sense that where a visible label is not otherwise provided, it is likely that a speech-input user may attempt to use the placeholder text value as a means of interacting with the input.

### Text labels "express something in human language"

#### Symbolic text characters

For the purposes of this SC, text should not be considered a visible label if it is used in a symbolic manner, rather than directly expressing something in human language as per the definition of text in WCAG. For example, [1.4.5 Images of Text](images-of-text) describes considerations for "symbolic text characters." In the images of text example "B", "I", and "ABC" appear on icons in a text editor, where they are meant to symbolize the functions for Bold, Italics, and Spelling, respectively. In such a case, the accessible name should be the function the button serves (e.g., "Spell check" or "Check spelling"), not the visible symbolic characters. A similar text editor is shown in the figure below.

A detail of the rich text editor in Github, showing a variety of unlabeled icons, including icons resembling text characters.

Likewise, where an author has used a greater-than symbol (">") to mimic the appearance of the right-facing arrow, the text does not convey something in human language. It is a symbol, in this scenario likely meant to mimic the icons used for a "Play" button or a "Next" arrow.

#### Punctuation and capitalization

This criterion is primarily aimed at users of speech recognition / voice control. Capitalization (upper- or lowercase) and most punctuation are generally ignored when a user speaks a label as a means of interacting with a control. For this reason, differences in capitalization and punctuation are not relevant when evaluating this criterion.

In the following example, while it is certainly not an error to include the colon and capitalization in the accessible name, a computed name of "first name" is considered equivalent to "First Name:" and passes the requirements of this criterion.

A text input with a label of "First Name:" above it.

`<p>First Name:</p>
<input type="text" … aria-label="first name">`

Likewise, in the following example, while the visible label for the button is "Next…", having "Next" as the accessible name passes.

A large button labelled "Next…".

`<button … aria-label="Next">Next…</button>`

There are situations where capitalization can impact meaning – for instance, where the use of uppercase letters indicates an abbreviation. While in the context of speech recognition / voice control this won't matter, the difference may be relevant for screen reader users. As a best practice, while normatively this success criterion is "case-insensitive", it's still recommended that authors match the case/capitalization of the visible label and the accessible name in these cases.

#### Mathematical expressions and formulae

Mathematical expressions are an exception to the previous subsection about symbolic characters. Math symbols can be used as labels; for example "A>B" and "11×3=33" and convey meaning.

Two radio buttons – the first labelled "A>B", the second labelled "11×3=33".

The label should not be overwritten in the accessible name, and substitutions of words where a formula is used should be avoided since there are multiple ways to express the same equation. For example, making the name "eleven multiplied by three is equivalent to thirty-three" might mean a user who said "eleven times three equals thirty-three" may not match. It is best to leave the formulas as used in the label and count on the user's familiarity with their speech software to achieve a match. Further, converting a mathematical formula label into an accessible name that is a spelled-out equivalent may create issues for translation. The name should match the label's formula text. Note that a consideration for authors is to use the proper symbol in the formula. For instance `11x3` (with a lower or upper case letter "X"), `11*3` (with the asterisk symbol), and `11×3` (with the `&times;` symbol) are all easy for sighted users to interpret as meaning the same formula, but may not all be matched to "11 times 3" by speech recognition / voice control software. The proper operator symbol (in this case the `&times;` symbol) should be used.

### Accessible Name and Description Computation specification

It is important to understand how the accessible name is derived. The [Accessible Name and Description Computation 1.1](https://www.w3.org/TR/accname-1.1/) and the [HTML Accessibility API Mappings 1.0](https://w3c.github.io/html-aam/#accessible-name-and-description-computation) describe how the accessible name is computed, including which attributes are considered in its calculation, and in what order of preference. If a component has multiple possible attribute values that could be used for its accessible name, only the most preferred of those values will be computed. None of the other, less preferred values will be part of the name. For the most part, existing established programmatic relationships between labels and controls are reinforced by the specification.

Other text displayed on the screen that is correctly coded to meet [1.3.1 Info and Relationships](info-and-relationships) is **not** normally factored into the calculation for the accessible name of a UI component without author intervention (via ARIA labeling techniques). The most common of these are:

- headings and instructions

- group labels for sets of components (i.e., used with `legend`/`fieldset` or with role of `group` or `radiogroup`)

Such textual information may constitute part of the component's _description_. So from both a programmatic viewpoint, and from the conservative tactic of only considering a label to be "adjacent text," neither headings, instructions, nor group 'labels' should normally be considered **labels** for the purpose of this success criterion.

It is important to note that the specification allows authors to override the name calculated through native semantics. Both `aria-label` and `aria-labelledby` take precedence in the name calculation, overriding the visible text as the accessible name even when the visible text label is programmatically associated with the control. For this reason, when a visible label already exists, `aria-label` should be avoided or used carefully, and `aria-labelledby` should be used as a supplement with care.

Finally, `aria-describedby` is not included in the Accessible Name computation (instead it is part of the Accessible Description computation). By convention, text associated with a control through `aria-describedby` is announced immediately after the accessible name by screen readers. Therefore, the context of headings, instructions, and group labels can be provided through the accessible description to assist users of screen readers without affecting the experience of those who navigate using speech recognition software.

#### Text in parentheses

Note: The term "parenthetical" in this section is describing text that literally appears within a set of round brackets (). It is not used in the more abstract sense of "information related to".

It is important to mention parenthetical text in labels in the context of accessible name versus description. In common usage, text in parentheses is considered secondary but relevant to meaning. Users of speech recognition would not typically announce text in parentheses as part of the input name. For that reason, parenthetical text may be optionally considered a description and left out of the accessible name.

However, where parenthetical information provides important context, such as indication of a required field or limitations on what is allowed for input, this information must be provided programmatically in some other way to the user if that information is not included as part of the accessible name. For example, "Name (required)" and "Date (YYYY-MM-DD)" could accept "Name" and "Date" as the accessible names. However, in order to pass [1.3.1 Info and Relationships](info-and-relationships), authors would need to programmatically surface both the required state and the limit on the allowed data formatting (in this example, eight integers fitting the YYYY-MM-DD pattern). The "required" state could be surfaced through the HTML `required` attribute or by using `aria-required="true"`. The allowed data formatting could be surfaced by being referenced using the `aria-describedby` attribute.

## Benefits

- Speech-input users can directly activate controls on a page with fewer surprising changes of focus.

- Text-to-speech users will have a better experience because the labels that they hear match the visible text labels that
they see on the screen.

## Examples

- **Accessible name matches visible label:** The accessible name and visible label of a control match.

- **Accessible name starts with visible label:** The accessible name "Search for a value" begins with the text of the visible label, "Search".

## Related Resources

- [Accessible Name and Description Computation](https://www.w3.org/TR/accname-aam-1.1/)

- [Accessible Name and Description Computation in HTML Accessibility API Mappings 1.0](https://www.w3.org/TR/html-aam-1.0/#accessible-name-and-description-computation)

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
