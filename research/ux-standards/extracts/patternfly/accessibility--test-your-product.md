---
source: patternfly
title: Red Hat PatternFly
url: https://www.patternfly.org/accessibility/test-your-product
license: MIT
bucket: A
sha: 7315296b4ecc182757b45b46f0474fafcff11366
retrieved: 2026-08-11
---
# Testing your product's accessibility

This guide contains instructions and recommendations that you can use to robustly test your product's accessibility, in order to identify accessibility issues and opportunities for improvement.

**Keep in mind that this guide will not cover every scenario.**

## Standard testing procedures

Many accessibility issues can be found by doing a few standard checks.

### Validate your HTML

Good accessibility practices start with structural, semantic HTML. When a screen reader (or any sort of assistive technology) scans a web page, it gets information about the Document Object Model (DOM), or the HTML structure of the page. No styles or JavaScript will be read by a screen reader.

Screen readers (like Voice Over (VO), NVDA, or JAWS) don't just turn text into speech. They also use information in the HTML to list all of the headings on a page, give extra navigation controls to data tables, announce how many items are in a list, and more. This makes semantic HTML essential.

You can use an HTML validation tool to test your product, such as [W3C’s markup validation service](https://validator.w3.org/).

### Check for accessibility violations with an audit tool

When using PatternFly, we recommend checking for accessibility violations locally via aXe: The Accessibility Engine (using [aXe DevTools](https://www.deque.com/axe/devtools/), the [Chrome extension](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd), or the [Firefox extension](https://addons.mozilla.org/en-US/firefox/addon/axe-devtools/)). If you want to test prior to deployment, you can integrate aXe with [Cypress](https://www.cypress.io/).

#### Bulk testing with the patternfly-ally script

We offer the [patternfly-a11y script](https://github.com/patternfly/patternfly-a11y) for bulk testing, which reports any aXe accessibility violations from a set of pages. You can adapt this script to your needs by creating a configuration file that includes authentication, waits for specific items to finish loading (like a loading spinner), or addresses other items relevant to your use case. As a report, this script will deliver an [accessibility report via surge](http://a11y-os.surge.sh/).

Before using this script, your UI should be built in the CI workflow. Once built, create a job to run the script against that build. The script assumes that a web server is running and serving your product somewhere that the script can reach (for example, in `localhost:8000`).

### Test keyboard accessibility

The keyboard is an essential accessibility tool, so it is necessary to ensure that the following requirements are met:

- All functionality is keyboard accessible.
- Elements in the HTML and in the layout follow a logical order.
- Elements with focus are clearly visible.

### Test without styles

Screen readers cannot access style information, so you should disable styles for your product to test that your information architecture is effective and that elements have adequate text labels.

The [WAVE browser extension from WebAIM](https://wave.webaim.org/) allows you to disable styles if this isn't available in the browser you are using.

### Test with a screen reader

You can test with any screen reader that is available in your operating system. In PatternFly, we target:
  - [JAWS](https://www.freedomscientific.com/products/software/jaws/) with Chrome, Windows ([JAWS keyboard shortcuts](//dequeuniversity.com/screenreaders/jaws-keyboard-shortcuts)).
  - [VoiceOver](https://support.apple.com/guide/voiceover/welcome/mac) with Safari, Mac ([VoiceOver keyboard shortcuts](//dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts)).
  - [NVDA](https://www.nvaccess.org/download/) with Firefox, Windows ([NVDA keyboard shortcuts](//dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts)).

### Check color contrast

Your UI's colors should pass the following contrast checks to ensure that users across the vision spectrum can understand your product:
    - Text color against background color ([Understanding WCAG 1.4.3](//www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html))
    - Text color against link color ([WCAG Technique G183](https://www.w3.org/WAI/WCAG22/Techniques/general/G183))
    - Visible boundaries of buttons and form elements against adjacent background color ([Understanding WCAG 1.4.11](//www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html))

## Accessibility testing checklist

To keep track of your testing efforts, we recommend referencing the following checklist.

This checklist includes some of the main areas that the PatternFly team checks for to ensure that a UI meets consistent accessibility standards. To evaluate your specific implementation, we recommend checking these same areas in your product.

### Broad accessibility criteria



Keyboard navigation via the <kbd>tab</kbd> key can discover all information.</span>} description={<span>If content should be hidden from other assistive technology like a screen reader, <span className="ws-code">aria-hidden="true"</span> should be passed instead.</span>} id="general-criteria-4" />

 </>} id="general-criteria-5" />

### Structural accessibility criteria

 <b> Structure: </b> The visual information architecture maps to the various rotor menus that exist by default.</span>} body={<>

</>}  id="accessibility-points-7" />
<br/>
 <b> Labels: </b> </span>} body={<><b>Link</b> labels  are descriptive, informative, and unique (unless they have the same URL).</span> id="accessibility-points-8a"/>

  <b>Buttons and form controls:</b></span>} description={ <span>
    <li> All form controls have clear and descriptive labels. </li>
    <li> Expandable buttons display the expandable control and utilize <code className="ws-code">aria-expanded</code> to indicate that a button is expandable. <code className="ws-code">aria-expanded</code> should always have a boolean value if a button is meant to be expandable. </li>
  </span>
  }
  id="general-criteria-8b" />

    <b>Form inputs</b> have a label (even if it's not visible).</span>} id="general-criteria-8c" />

    <b>Icons</b> have some kind of text for screen readers (even if it's not visible.)</span>} id="general-criteria-8d" />

    <b>Images have proper alt text.</b></span>} description={<span>The exception to this practice is when images are primarily for presentation purposes and are not essential pieces of content. To signify that an image should be skipped by a screen reader, set the value of the alt attribute to an empty string: <code className="ws-code">alt=""</code></span>}  id="general-criteria-8e" />

     <b>Landmark</b> regions should have labels when there is more than one type of landmark, and they are not the same (such as navigation, main, form, etc.). Section element shouldn’t be used unless it has a label.</span>} id="general-criteria-8f" />

    <b>Tables</b> and table content is clearly described. WebAIM has additional guidance on <a href="https://webaim.org/techniques/tables/">creating accessible tables</a>.</span>} id="general-criteria-8g" />

    <b>ARIA</b> labels provide descriptive details to screen reader users, without reiterating or overriding the text that is already there. If there is visible text then there doesn’t need to be an ARIA label. </span>} id="general-criteria-8h" />

</>}  id="general-criteria-8" />
