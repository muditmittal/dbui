"use client"

import * as React from "react"

import { cn } from "../../lib/utils"
import { DELTA_TONE, type DeltaTone } from "../../lib/delta-tone"
import { Button } from "./button"
import { Card, CardAction, CardContent, CardHeader } from "./card"
import { ChevronRight } from "../icons/ChevronRight"
import { InfoSmall } from "../icons/InfoSmall"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

/**
 * @standard Metric Card
 * @guideline Use for one metric, the shape it makes, and one way into the surface behind it — the unit every overview page is built from
 * @guideline Put the shape in children and nothing else. A chart, a Leaderboard, a Legend, a SegmentedBar: four cards that differ only by child are the same card
 * @guideline Two across at page width. A widget narrower than about 400px stops holding a readable chart
 * @guideline action is for controls that change what the card shows — a scope segment, a period. Navigation is what link is for, and the two are not interchangeable
 * @guideline Split the trend: `delta` carries the change and takes the tone, `deltaWindow` names the period and stays subtle. "+2.6%" is the number, "past 30d" is the caption
 * @guideline Reach for `hint` wherever the label is a term rather than a word. "Asset usage" needs one; "Cost" does not
 * @constraint link is required, and that is the point. A card that reports a number with nowhere to go is the failure this component exists to prevent, so there is no variant without it
 * @constraint Don't bake a chart in. The moment a card names its own viz it stops being reusable and the next vertical builds a second one
 * @constraint Don't nest a Card in the viz slot. A widget is already a card, and a card inside it reads as a card that failed to load
 * @constraint Don't use it for a total with no shape. That is a StatCard, and a widget with an empty viz slot is a hole in the grid
 * @constraint Don't put a second Button beside the footer link. One handoff per card is what makes a grid of them scannable
 * @constraint deltaTone is the reader's verdict, not the arithmetic's. Cost up 30% is negative and PII coverage up 30% is positive, and only the product knows which
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=5015-27131
 */

/**
 * MetricCard — one metric, the shape it makes, and one way into the surface behind it.
 */

export interface MetricCardProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  label: string
  /** The one number this card is about, already formatted. */
  value: React.ReactNode
  /** What the label means. Renders the info affordance beside it. */
  hint?: string
  /** The change against the previous window, e.g. "+2.6%". Sits beside the value. */
  delta?: string
  /** The period the change is measured over, e.g. "past 30d". */
  deltaWindow?: string
  deltaTone?: DeltaTone
  /** A control that changes what the card shows — a SegmentControl, a period picker. */
  action?: React.ReactNode
  /** The handoff. Required: a card that reports has to lead somewhere. */
  link: { label: string; onClick?: () => void; href?: string }
  /** The viz slot. */
  children?: React.ReactNode
}

function MetricCard({
  label,
  value,
  hint,
  delta,
  deltaWindow,
  deltaTone = "neutral",
  action,
  link,
  children,
  className,
  ...props
}: MetricCardProps) {
  return (
    // gap-3 rather than the card default, because the three slots are one
    // widget: 16 + 44 + 12 + 168 + 12 + 32 + 16 is the 300px the grid is drawn on.
    <Card
      data-slot="metric-card"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    >
      <CardHeader className="gap-0">
        <div className="flex min-w-0 items-center gap-1">
          <span className="truncate type-body-bold text-text-base">{label}</span>
          {hint ? (
            <Tooltip>
              <TooltipTrigger
                aria-label={hint}
                className="shrink-0 text-text-subtle"
              >
                <InfoSmall />
              </TooltipTrigger>
              <TooltipContent>{hint}</TooltipContent>
            </Tooltip>
          ) : null}
        </div>
        {/* Value and change on one line — this is `Viz/Inner/Metric` Type=Compact,
            where StatCard uses the stacked Default. The card header is 44px and
            a second line would not fit inside it. */}
        <div className="flex min-w-0 items-baseline gap-2">
          <span className="truncate type-title-4 text-text-base tabular-nums">
            {value}
          </span>
          {delta ? (
            <span className="shrink-0 truncate type-body">
              <span className={DELTA_TONE[deltaTone]}>{delta}</span>
              {deltaWindow ? (
                <span className="text-text-subtle"> {deltaWindow}</span>
              ) : null}
            </span>
          ) : null}
        </div>
        {action ? <CardAction>{action}</CardAction> : null}
      </CardHeader>
      {/* flex-1 so a row of widgets keeps one height whatever their children
          measure, and the handoff stays on the same line across the row. */}
      <CardContent className="flex flex-1 flex-col justify-center">
        {children}
      </CardContent>
      {/* Not a CardFooter: that adds a divider, a tinted band and pb-0, and this
          button sits on the card's own surface at the same inset as the rest. */}
      <CardContent>
        <Button
          variant="outline"
          className="w-full justify-center"
          onClick={link.onClick}
          {...(link.href ? { render: <a href={link.href} /> } : {})}
        >
          {link.label}
          <ChevronRight />
        </Button>
      </CardContent>
    </Card>
  )
}

export { MetricCard }
