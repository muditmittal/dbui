"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "../../lib/cva"

import { cn } from "../../lib/utils"

/**
 * @standard Tabs
 * @guideline First tab is the default view
 * @guideline Keep labels to single words when possible
 * @guideline variant="pill" is for switching the panel: pick it whenever a click replaces what is
 * below the strip. The selected item carries a fill, which is the only one of the two
 * treatments still legible once the strip has scrolled away from the content it heads
 * @guideline variant="default" is for indexing one long page: a section bar that jumps down a
 * document, or a strip that heads a region and wants a rule along its lower edge. Its
 * selected item is a 3px rule under one word, which is enough to say where you are in
 * something you can still scroll back through
 * @constraint Avoid variant="default" where a click swaps a panel. The reader has to find a thin
 * rule to know which panel they are looking at, and nothing on the panel repeats it
 * @constraint Avoid variant="pill" on a strip of links. A fill reads as a control that changed
 * something, and a link that only scrolled the page did not
 * @guideline TabsList width="full" when the rule should run the width of the region it heads — a
 * page or panel section. The rule reads as an edge there; stopping short of the content
 * it separates reads as an unfinished one. Nothing to reach for on variant="pill",
 * which draws no rule
 * @constraint Min 2, max 7 tabs
 * @constraint Don't use for navigation between unrelated pages — use Navbar
 * @constraint width="full" spans the list, not the triggers. Triggers keep their natural width and
 * stay left-aligned. For triggers that divide the width between them, use SegmentControl
 * @constraint width="full" applies to horizontal tabs only. A vertical list sits beside its panel
 * rather than above it, so it has no width of its own to span
 * @guideline Something that looks like a tab strip but navigates — a section bar that scrolls the
 * page rather than swapping a panel — takes tabsListVariants and tabsTriggerVariants on
 * a nav of links, never Tabs itself. Tabs renders role="tablist", which tells assistive
 * tech there are panels being swapped, and links do not swap one
 * @constraint A consumer of those two exports has to reproduce the attributes the styles select on:
 * a group/tabs ancestor with data-orientation, data-slot="tabs-list" and data-variant
 * on the list, and data-active on the current item. State is never a prop here, so
 * restating any class instead is the copy that goes stale
 * @constraint Set the width through the prop, never through className. cn() resolves the conflict
 * now, so a w-full passed in does win — but it wins over one class rather than over the
 * axis, and the axis is where justify-start rides along with it
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=4825-3132
 */

function Tabs({
 className,
 orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
 return (
    <TabsPrimitive.Root
 data-slot="tabs"
 data-orientation={orientation}
 className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
 className
      )}
      {...props}
    />
  )
}

/**
 * Tabs list variants.
 *
 * `variant` is visual style, `width` is sizing — they are independent axes.
 * - default: a rule along the list's lower edge, and a 3px rule under the
 * selected item. Reads as an index into something continuous.
 * - pill: the same rule along the lower edge, with the selected item as a chip
 * above it. The chip is `Toggle`'s fill without its boundary — grey,
 *   `text-strong`, and the bold step of the same ramp size.
 * - fit / full: the list hugs its triggers, or spans its container.
 *
 * Both variants draw the lower rule, because the rule is the row's baseline
 * rather than the underline variant's indicator: it is what separates the strip
 * from what it switches. The selection is what differs — a 3px segment sitting
 * on the rule, or a chip standing above it.
 *
 * `pill` was internal, on the grounds that it duplicated SegmentControl's
 * slider. The duplication was real and the conclusion was not: what it
 * duplicated was a *treatment*, and the two components do different jobs.
 * SegmentControl is a ToggleGroup — `role="group"` over `aria-pressed`
 * buttons, optionally `multiple`, optionally empty, items dividing the width
 * equally. Tabs is a tablist over panels — exactly one selected, always, each
 * trigger wired to a `tabpanel` by `aria-controls`. Neither can stand in for
 * the other, so the fix was to stop the two looking identical rather than to
 * take the treatment away from the one that needed it. What separates them now
 * is the frame: SegmentControl is a bordered track whose items divide it and
 * whose selection is inset; this is an unframed row of chips over a rule.
 *
 * `width="full"` matters on `pill` again. The old warning was about a track
 * fill stretching past the last pill, and there is no track left to stretch —
 * and now that the variant draws a rule, the prop is what makes that rule reach
 * the edge of the region instead of stopping at the last chip.
 *
 * Both `w-*` and `justify-*` live on the `width` axis rather than the base, so
 * the two options are alternatives rather than one overriding the other.
 */
const tabsListVariants = cva(
  "group/tabs-list inline-flex items-center text-text-subtle group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col",
  {
 variants: {
 variant: {
 default: "gap-4 border-b border-border-base bg-transparent shape-square",
        // The same rule as `default`, because the rule is the row's baseline
        // rather than the underline variant's indicator — it separates the
        // strip from whatever it switches. `default` draws its selection as a
        // 3px segment sitting on that rule; `pill` draws a chip above it.
        //
        // h-auto, not the base's h-8. A chip is 28px in a 32px band, so the
        // fixed height leaves 2px above and below, and pinned under a sticky
        // header that reads as the row touching it. py-2 makes the band from
        // the chip out rather than clamping the chip into it.
 pill: "gap-1 bg-transparent shape-square border-b border-border-base group-data-horizontal/tabs:h-auto group-data-horizontal/tabs:py-2",
      },
 width: {
 fit: "w-fit justify-center",
        // Scoped to horizontal because a vertical list is a flex-row sibling of
        // the panel, not a block above it: w-full there competes with the panel
        // for the same row and starves it. Vertical already hugs, so leaving the
        // width unset is the right answer rather than a broken one.
 full: "justify-start group-data-horizontal/tabs:w-full",
      },
    },
 defaultVariants: {
 variant: "default",
 width: "fit",
    },
  }
)

function TabsList({
 className,
 variant = "default",
 width = "fit",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
 return (
    <TabsPrimitive.List
 data-slot="tabs-list"
 data-variant={variant}
 data-width={width}
 className={cn(tabsListVariants({ variant, width }), className)}
      {...props}
    />
  )
}

/**
 * Tabs trigger styles, as a string anything can apply.
 *
 * Exported because a tab strip is a look as well as a component, and one
 * consumer needs the look without the semantics: the portal's docs pages carry
 * a section bar that jumps down a single document rather than swapping panels,
 * so it is a `nav` of links marked with `aria-current`, and wrapping those in a
 * `role="tablist"` would have assistive tech announce panels that never change.
 * The alternative was a copy of this string in the portal, which is the version
 * that silently stops matching the first time either side is edited.
 *
 * There is no `active` variant, and that is the point. Every state here is
 * expressed as a selector over `data-*` attributes and the two `group/` names —
 * never as a prop — so a consumer earns the active indicator, the hover and the
 * focus ring by reproducing the attributes rather than by restating any class.
 * A plain `<a data-active>` inside `[data-slot="tabs-list"][data-variant="default"]`
 * gets the primary bottom border from the same declaration a real tab does.
 *
 * The two `group-data-vertical/tabs` rules need a `group/tabs` ancestor carrying
 * `data-orientation`, which `Tabs` provides and a bare consumer must.
 */
const tabsTriggerVariants = cva(
 [
    "relative inline-flex items-center justify-center gap-2 border-b-[3px] border-transparent py-2 type-label whitespace-nowrap text-text-subtle transition-all outline-none group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-text-strong active:text-text-strong focus-visible:border-focus-ring focus-visible:shadow-focus disabled:pointer-events-none disabled:text-text-disabled aria-disabled:pointer-events-none aria-disabled:text-text-disabled [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    // Default variant (lined): active tab gets primary bottom border
    "group-data-[variant=default]/tabs-list:data-active:border-b-action-primary-base group-data-[variant=default]/tabs-list:data-active:text-text-base",
    // Pill variant: a box the whole time, filled when selected.
    //
    // `border` on every item, not just the selected one, and `border-transparent`
    // throughout. Two reasons it cannot be added on selection: the box is
    // `width: auto`, so a border appearing would widen the item by 2px and shunt
    // its neighbors sideways on every click; and it replaces the base's
    // one-sided `border-b-[3px]`, which would otherwise shrink the content box
    // from below and sit the label 1.5px high inside its own fill.
    //
    // The selection is `Toggle`'s fill without `Toggle`'s boundary:
    // `action-selected-base`, `text-strong`, and the bold step of the same ramp
    // size. Three cues, and the numbers say plainly which one is carrying it.
    //
    // The fill is not the indicator and never was. It measures 1.143:1 against
    // the page in light and 1.238:1 in dark, against 1.205:1 and 1.071:1 for the
    // accent fill it replaced — a change of surface, not of strength. What moved
    // is the label. `text-accent` over `text-subtle` was a 1.022:1 step in light:
    // two colors of the same lightness, so the label said nothing and a 5.08:1
    // accent border was the entire indicator. `text-strong` over `text-subtle` is
    // 2.294:1 and 2.566:1, and the weight goes 400 to 600 with it. The state now
    // lives in the label's own color and weight, which is text — where 1.4.11
    // stops applying, and where the rest of this system already keeps it.
    //
    // No boundary, deliberately, and it costs something real: `action-default-hover`
    // and `action-selected-base` are the same value in both themes, so a hovered
    // unselected chip has the selected chip's exact fill and the two are told
    // apart by weight and label color alone. `Toggle` and `SegmentControl` spend
    // `border-strong` on that. Here the row is unframed and a boundary read as the
    // loudest thing on the page, so the weight step is doing that work instead.
    // If it turns out not to be enough, the answer is a different hover step for
    // this variant, not the border back.
    //
    // Hover is scoped both ways. Both rules set a background at the same
    // specificity, so leaving the selected item to the unselected hover would
    // let Tailwind's emission order decide whether pointing at it wipes the
    // selection — the defect logged against the nav rail as B13. Here the
    // selected item gets its own hover and press steps from the same family,
    // which is also the only thing separating the two under a pointer.
    // rounded-1, not rounded-2. A 4px corner on a 28px chip reads as a soft
    // rectangle; 8px started to read as a button. The transparent border keeps
    // the same radius, so the focus ring — which draws outward from that border
    // and rounds with it — stays concentric rather than cutting the corners.
    "group-data-[variant=pill]/tabs-list:h-7 group-data-[variant=pill]/tabs-list:rounded-1 group-data-[variant=pill]/tabs-list:border group-data-[variant=pill]/tabs-list:border-transparent group-data-[variant=pill]/tabs-list:px-2 group-data-[variant=pill]/tabs-list:py-0",
    "group-data-[variant=pill]/tabs-list:not-data-active:hover:bg-action-default-hover",
    "group-data-[variant=pill]/tabs-list:data-active:bg-action-selected-base group-data-[variant=pill]/tabs-list:data-active:text-text-strong group-data-[variant=pill]/tabs-list:data-active:type-label-bold",
    "group-data-[variant=pill]/tabs-list:data-active:hover:bg-action-selected-hover group-data-[variant=pill]/tabs-list:data-active:active:bg-action-selected-press",
    // The bold step is the reason the trigger is a grid under `pill`. A weight
    // change keeps the line box and moves the advance widths, so the selected
    // chip grew by up to 1.83px and slid its neighbors left on every click —
    // measured, not feared. The second copy of the children is always bold,
    // always invisible, and stacked in the same cell, so the chip is as wide as
    // its own bold label whether or not it is selected and nothing moves.
    // Scoped to `pill`: under `default` the copy is `display: none`, so that
    // variant's geometry is the same as it was before this existed.
    "group-data-[variant=pill]/tabs-list:grid group-data-[variant=pill]/tabs-list:place-items-center",
  ].join(" ")
)

function TabsTrigger({ className, children, ...props }: TabsPrimitive.Tab.Props) {
 return (
    <TabsPrimitive.Tab
 data-slot="tabs-trigger"
 className={cn(tabsTriggerVariants(), className)}
      {...props}
    >
      <span className="col-start-1 row-start-1 flex items-center gap-2">{children}</span>
      {/* The width reservation. `aria-hidden` and `invisible` rather than
          `sr-only`, because it has to occupy the cell to reserve anything —
 and it is only laid out under `pill`, which is the only variant that
 changes weight on selection. */}
      <span
 aria-hidden
 className="invisible col-start-1 row-start-1 hidden items-center gap-2 type-label-bold group-data-[variant=pill]/tabs-list:flex"
      >
        {children}
      </span>
    </TabsPrimitive.Tab>
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
 return (
    <TabsPrimitive.Panel
 data-slot="tabs-content"
 className={cn("flex-1 type-body outline-none", className)}
      {...props}
    />
  )
}

/**
 * TabsIcon — leading icon slot inside TabsTrigger.
 * Maps to Figma .TabItem "Icon" boolean prop.
 *
 * Usage: <TabsTrigger value="sql"><TabsIcon><Query /></TabsIcon>SQL</TabsTrigger>
 */
function TabsIcon({
 className,
  ...props
}: React.ComponentProps<"span">) {
 return (
    <span
 data-slot="tabs-icon"
 className={cn(
        "pointer-events-none shrink-0 [&_svg:not([class*='size-'])]:size-4",
 className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsIcon, tabsListVariants, tabsTriggerVariants }
