---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/code-snippet/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
No accessibility annotations are needed for code snippets, but keep these
considerations in mind if you are modifying Carbon or creating a custom
component.

  What Carbon provides
  Development considerations

## What Carbon provides

Carbon bakes keyboard operation into its components, as well as many other
accessibility considerations.

### Keyboard interaction

For all three variants, the code snippet can be copied with `Space` or `Enter`.
Arrow keys can operate scroll bars.

![inline code snippet keyboard interaction](images/code-snippet-accessibility-1.png)

By default, each inline code snippet is reachable by `Tab` and copied with
`Space` or `Enter`.

![single line code snippet interaction, with 2 tab stops](images/code-snippet-accessibility-2.png)

The single line code snippet tabstop supports left and right arrow key
scrolling.

![multi-line code snippet keyboard interaction](images/code-snippet-accessibility-3.png)

The multi-line’s buttons are reachable by `Tab` and activated with `Space` or
`Enter`.

### Labeling and updates

Carbon provides the copy button's default label and tooltip behavior. Carbon
handles notices about the success of the copy function, as well as updates to
the Show more mechanism.

![hovering on the button exposes ‘copy to clipboard’ tooltip](images/code-snippet-accessibility-4.png)

The code snippet’s buttons expose their labels on hover or focus.

![the activated button shows a ‘copied!’ message](images/code-snippet-accessibility-5.png)

The results of activating buttons are provided in text.

## Development considerations

Keep this in mind if you are modifying Carbon or creating a custom component:

- the inline code text is implemented as a button so its text can be copied
- single line snippets take an additional tabstop to support arrow key scrolling
