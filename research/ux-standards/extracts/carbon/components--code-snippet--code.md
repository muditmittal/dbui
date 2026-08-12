---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/components/code-snippet/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
Preview the code snippet component with the React live demo. For detailed code
usage documentation, see the Storybooks for each framework below.

## Documentation

















## Live demo

## Sample data

```javascript
const codeSnippet = `"scripts": {
  "build": "lerna run build --stream --prefix --npm-client yarn",
  "ci-check": "carbon-cli ci-check",
  "clean": "lerna run clean && lerna clean --yes && rimraf node_modules",
  "doctoc": "doctoc --title '## Table of Contents'",
  "format": "prettier --write '**/*.{js,md,scss,ts}' '!**/{build,es,lib,storybook,ts,umd}/**'",
  "format:diff": "prettier --list-different '**/*.{js,md,scss,ts}' '!**/{build,es,lib,storybook,ts,umd}/**' '!packages/components/**'",
  "lint": "eslint actions config codemods packages",
  "lint:styles": "stylelint '**/*.{css,scss}' --report-needless-disables --report-invalid-scope-disables",
  "sync": "carbon-cli sync",
  "test": "cross-env BABEL_ENV=test jest",
  "test:e2e": "cross-env BABEL_ENV=test jest --testPathPattern=e2e --testPathIgnorePatterns='examples,/packages/components/,/packages/react/'"
},
"resolutions": {
  "react": "~16.9.0",
  "react-dom": "~16.9.0",
  "react-is": "~16.9.0",
  "react-test-renderer": "~16.9.0"
}`;

const codeSnippetSingle = `node -v`;
```
