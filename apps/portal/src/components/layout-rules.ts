/**
 * The layout rules, in the only shape a layout rule is allowed to take here.
 *
 * A rule earns a row if it has all four slots. `statement` is what to do,
 * `fallback` is the value to reach for when nobody has decided, `exception` is
 * the one case that overrides it and `broken` is the observation that proves it
 * was ignored. A sentence that cannot fill those four slots is a preference,
 * and preferences belong in a review comment rather than in a guide — "keep
 * spacing consistent" has no default to fall back to and no way to fail.
 *
 * `checked` says who can verify it. `review` means a person reading the diff
 * can see it. `screen` means it shows up on the running page and needs no
 * source. Nothing here says `lint`, because the React linter checks tokens,
 * type and spacing rather than structure — that gap is stated on the page.
 *
 * Values are deliberately absent. Every inset, width and class name the page
 * shows comes from `layout-data.ts`, which reads them out of the component that
 * owns them.
 */

export type Rule = {
  id: string
  statement: string
  fallback: string
  exception: string
  broken: string
  checked: "review" | "screen"
}

/** The three regions that exist before a page has any content of its own. */
export const FRAME_RULES: Rule[] = [
  {
    id: "F1",
    statement: "Every page starts from the Base shell and nothing inside it sets a height.",
    fallback: "Wrap the page in Base and put the content in its one child slot.",
    exception: "None. A page that does not start from Base has no platform header and no nav.",
    broken: "Any h-screen, min-h-screen or 100vh below Base. The frame already owns the height, so a second one either overflows it or leaves a gap.",
    checked: "review",
  },
  {
    id: "F2",
    statement: "The frame never scrolls. A column inside it does.",
    fallback: "Let the content surface take the scroll. It is the only element in the frame that is allowed to.",
    exception: "None.",
    broken: "The browser window grows a scrollbar. At that point the platform header scrolls away, and every sticky element inside the page is measured against the wrong edge.",
    checked: "screen",
  },
  {
    id: "F3",
    statement: "The assistant panel is a sibling of the content surface, so opening it narrows the page rather than covering it.",
    fallback: "Build content that survives losing the panel's width without a horizontal scrollbar.",
    exception: "None. A panel that covers content is a dialog, and it follows the dialog rules instead.",
    broken: "Opening the assistant clips a table, or the content keeps its width and pushes a horizontal scrollbar onto the page.",
    checked: "screen",
  },
]

/** The page every product screen is until it has a reason not to be. */
export const PAGE_RULES: Rule[] = [
  {
    id: "P1",
    statement: "Three regions, one order: page header, controls bar, content.",
    fallback: "All three, in that order, as flat siblings of the content surface.",
    exception: "An editor replaces all three with a tab bar and a toolbar. A chat replaces them with a transcript and a composer. Those are the only two.",
    broken: "A fourth kind of chrome appears at page level, or a region shows up out of order.",
    checked: "review",
  },
  {
    id: "P2",
    statement: "Optional regions insert at fixed slots and nowhere else.",
    fallback: "Breadcrumb above the page header. Tabs between the page header and the controls bar. Featured band between the tabs and the controls bar.",
    exception: "The breadcrumb is required when the page is reached through a hierarchy and forbidden when the page title is the root of one.",
    broken: "Tabs above the page header, or a featured band below the controls bar. Both make the controls bar filter something that is no longer beneath it.",
    checked: "screen",
  },
  {
    id: "P3",
    statement: "The controls bar is a sibling of the page header, never a child of it.",
    fallback: "Two sibling elements, each setting its own inset, with no wrapper between them.",
    exception: "None.",
    broken: "A search or a filter sits inside the header's action cluster, or the two rows share one bordered container.",
    checked: "review",
  },
  {
    id: "P4",
    statement: "One page header per surface, and a rail's own header is not one.",
    fallback: "Exactly one page header, in the content surface.",
    exception: "A tree rail carries a header of its own. It holds the rail's scope switcher and never the page title.",
    broken: "Two titles compete for the top of the screen, or the rail's header carries the page's primary action.",
    checked: "screen",
  },
  {
    id: "P5",
    statement: "Trailing actions live in exactly one row.",
    fallback: "The page header, rightmost position.",
    exception: "A page whose header is a bare title can move the cluster into the controls bar. That is what the controls bar's action slot is for.",
    broken: "Both rows carry a trailing cluster. The reader then has to check two places to find out what a page can do.",
    checked: "screen",
  },
  {
    id: "P6",
    statement: "The page header is one line.",
    fallback: "Title on the left, actions on the right, nothing else.",
    exception: "None. Anything that does not fit is a control, and controls have their own row.",
    broken: "The header wraps at the width you designed for. That is the signal that a filter, a description or a status has been put in the wrong region.",
    checked: "screen",
  },
]

/** Which container scrolls. The single most common thing to get wrong. */
export const SCROLL_RULES: Rule[] = [
  {
    id: "S1",
    statement: "One scrolling container per column.",
    fallback: "The content surface scrolls. Nothing inside it does.",
    exception: "A rail scrolls its own body. A menu capped by a max height is not a column and does not count against this.",
    broken: "Two scrollbars in one column. Usually caused by an inner overflow-y-auto with no height bounding it, which scrolls nothing until the window is small and then scrolls twice.",
    checked: "screen",
  },
  {
    id: "S2",
    statement: "The region that scrolls is the last region in its column.",
    fallback: "Content is last, so it takes whatever height the regions above it left.",
    exception: "None.",
    broken: "Anything rendered below the scrolling region. It becomes reachable only by scrolling past every record, which is why a page-level footer is impossible here.",
    checked: "screen",
  },
  {
    id: "S3",
    statement: "Only a header of the thing beneath it can stick.",
    fallback: "Nothing sticks. No component in the system sets a sticky position, so this governs the one a page adds for itself.",
    exception: "The controls bar sticks to the list it filters and a table header sticks to its own rows. When both stick they stack in that order.",
    broken: "A third sticky element, or one that is not a header of what scrolls under it. Sticky elements eat the top of the viewport and a page that sticks three of them has no content left above the fold.",
    checked: "screen",
  },
  {
    id: "S4",
    statement: "An editor does not scroll. Its panes do.",
    fallback: "Give every pane its own scroll and give the editor surface none.",
    exception: "None.",
    broken: "Dragging the output pane taller moves the code editor off screen instead of shrinking it.",
    checked: "screen",
  },
  {
    id: "S5",
    statement: "A transcript scrolls from the bottom and the composer sits outside it.",
    fallback: "The scroll container holds the turns. The composer is its sibling.",
    exception: "None.",
    broken: "The composer scrolls away while reading history, or a new turn arriving yanks the view down while the reader is scrolled up.",
    checked: "screen",
  },
]

/**
 * The hardest section, and the one the product has the most of. Every rule here
 * is an answer to the same question: how does a workbench with this many panels
 * still read as a simple screen.
 */
export const PANEL_RULES: Rule[] = [
  {
    id: "N1",
    statement: "Each edge means one thing, on every screen.",
    fallback: "Left is where you are. Right is what is about this. Bottom is what came out of this.",
    exception: "None. A panel whose content does not match its edge belongs on a different edge or in a dialog.",
    broken: "Filters open on the right, or metadata opens on the left. The cost is not the panel — it is that the reader can no longer predict what an edge holds, so every screen has to be learned separately.",
    checked: "screen",
  },
  {
    id: "N2",
    statement: "The left edge carries two ranks. Every other edge carries one.",
    fallback: "The product nav, which belongs to the app, and one rail, which belongs to the page. They nest outward in, so the nav is always the outer one.",
    exception: "None. A page that needs a second hierarchy puts it in the content, not on the edge.",
    broken: "Two rails docked left, or two panels sharing the right edge. Two panels at the same rank cannot both be closed from the same control, so one of them ends up with no way back.",
    checked: "screen",
  },
  {
    id: "N3",
    statement: "The panel that says where you are opens with the page. Everything else starts closed.",
    fallback: "The nav and the page's own rail are visible on load. Nothing on the right or the bottom is.",
    exception: "A shell can start the product nav collapsed when the page has a rail of its own and needs the width. The Base shell takes a prop for it, so it is a shell's decision rather than a page's.",
    broken: "A page opens with a panel nobody asked for. Every panel open on load is a decision taken away from the reader, and the right edge is where that is most expensive because it is the widest.",
    checked: "screen",
  },
  {
    id: "N4",
    statement: "A panel that can close has a control that reopens it, in a place that does not move.",
    fallback: "The platform header for frame-level panels, the region's own header for panels inside a region.",
    exception: "None.",
    broken: "Closing a panel removes the only route back to it. This is the failure that makes people stop closing panels at all, which is how a workbench ends up with four open.",
    checked: "screen",
  },
  {
    id: "N5",
    statement: "A panel that says where you are collapses to a width. A panel that says something about what you are looking at closes completely.",
    fallback: "Navigation collapses to icons. Content panels close.",
    exception: "Below the width where an icon rail would not fit either, navigation closes too.",
    broken: "Collapsing the rail loses your place in the hierarchy, so reopening it costs the same navigation you already did.",
    checked: "screen",
  },
  {
    id: "N6",
    statement: "If the page cannot be used while it is open, it is a dialog rather than a panel.",
    fallback: "A panel for anything read or referenced while working. A dialog for a decision that blocks.",
    exception: "None.",
    broken: "The panel has a cancel button, or opening it dims the page. Both mean the work stopped, and work that has stopped needs the dialog's focus trap and its escape route.",
    checked: "review",
  },
  {
    id: "N7",
    statement: "A panel never holds the page's primary action, the page title, a tab set that changes the main region, or a form that must be finished before leaving.",
    fallback: "Reference, detail, tools and conversation.",
    exception: "None. Each of those four belongs to the surface the panel sits beside.",
    broken: "Closing the panel makes the page unusable. That is the test — close it and see whether the page still works.",
    checked: "screen",
  },
]

/** How regions are spaced, and against which scale. */
export const RHYTHM_RULES: Rule[] = [
  {
    id: "D1",
    statement: "Regions carry their own inset. The stack that holds them carries none.",
    fallback: "Stack the regions with no gap and no space utility. Their own vertical padding produces the rhythm.",
    exception: "None.",
    broken: "A gap or a space utility on the element that stacks the regions. The padding then doubles unevenly, and the first region ends up further from the top edge than the others are from each other.",
    checked: "review",
  },
  {
    id: "D2",
    statement: "One horizontal inset per surface.",
    fallback: "Match the inset the page header and controls bar already set.",
    exception: "A rail sets its own, tighter inset, because its content is a tree rather than a row of controls.",
    broken: "Two sibling regions on one surface with different horizontal padding, so the left edge of the content moves as the eye goes down the page.",
    checked: "screen",
  },
  {
    id: "D3",
    statement: "Density comes from the scalars, never from a page overriding a component.",
    fallback: "Leave component padding alone.",
    exception: "None.",
    broken: "A padding or height utility applied to a DBUI component from a page. It makes that one screen denser and every other screen inconsistent with it, and it survives a density change that was meant to be global.",
    checked: "review",
  },
]

/**
 * What cannot go inside what. Each row names the failure rather than the
 * principle, because the failure is the thing a reviewer can actually see.
 */
export const NESTING: Array<{ container: string; never: string; failure: string }> = [
  {
    container: "Page header",
    never: "Filters, search, sort or a description",
    failure: "The header wraps, and the controls bar below it looks empty for no reason",
  },
  {
    container: "Card",
    never: "Another card",
    failure: "Depth stops carrying meaning, because two levels of it appear where one would have done",
  },
  {
    container: "Card",
    never: "A full-width table",
    failure: "The table's columns lose the page's edge, so two tables on one page never line up",
  },
  {
    container: "Tab set",
    never: "Another tab set",
    failure: "No way to tell which level a tab changes without clicking it",
  },
  {
    container: "Panel",
    never: "The page's primary action",
    failure: "Closing the panel disables the page",
  },
  {
    container: "Panel",
    never: "Another panel",
    failure: "There is no edge left to close the inner one from",
  },
  {
    container: "Dialog",
    never: "Another dialog",
    failure: "The stack has no back, so dismissing one dismisses a decision the reader had already made",
  },
  {
    container: "A scrolling region",
    never: "Another scrolling region",
    failure: "Two scrollbars, and neither one reaches the end of what it appears to hold",
  },
  {
    container: "A scrolling region",
    never: "Anything below it",
    failure: "The thing below is reachable only after scrolling past every record above it",
  },
]

/**
 * What distinguishes one archetype from another, stated as the three questions
 * that actually separate them. Not what a screen looks like — a dashboard and a
 * catalog look nothing alike and are the same archetype, while a notebook and a
 * table detail look similar and are not.
 */
export const ARCHETYPES: Array<{
  name: string
  unit: string
  scroll: string
  chrome: string
  shell: string
}> = [
  {
    name: "List",
    unit: "Peer records, none more important than another",
    scroll: "The content surface",
    chrome: "Page header and controls bar",
    shell: "A",
  },
  {
    name: "Detail",
    unit: "One object, seen from several angles",
    scroll: "The main column, with the metadata sidebar scrolling separately",
    chrome: "Breadcrumb, title row and sub-tabs",
    shell: "E",
  },
  {
    name: "Editor",
    unit: "A document the reader changes",
    scroll: "Each pane. Never the page",
    chrome: "Tab bar and toolbar, in place of a page header",
    shell: "D",
  },
  {
    name: "Chat",
    unit: "An append-only transcript",
    scroll: "The transcript, anchored to the bottom",
    chrome: "The composer, and nothing above it",
    shell: "None yet",
  },
  {
    name: "Canvas",
    unit: "A surface where position carries meaning",
    scroll: "The viewport over the canvas, in two axes",
    chrome: "A toolbar, in place of a page header",
    shell: "None yet",
  },
]
