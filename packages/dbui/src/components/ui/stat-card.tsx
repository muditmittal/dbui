"use client"

import * as React from "react"

import { cn } from "../../lib/utils"
import { DELTA_TONE, type DeltaTone } from "../../lib/delta-tone"
import { Button } from "./button"
import { Card, CardContent } from "./card"
import { InfoSmall } from "../icons/InfoSmall"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

/**
 * @standard Stat Card
 * @guideline Use for one headline total in a row of peers — the band that opens an overview page
 * @guideline Three or four across. One on its own has no peer to be compared against and reads as a card that lost its chart
 * @guideline Give every tile in a band the same treatment. A delta on two and a link on the third is the row telling a reader the third is different when it is not
 * @guideline Split the trend: `delta` carries the change and takes the tone, `deltaWindow` names the period and stays subtle. "+2.7%" is the number, "vs past 30d" is the caption
 * @guideline Reach for `hint` wherever the label is a term rather than a word — a total nobody can define is a number nobody trusts
 * @constraint Don't pass both delta and action. A tile answers "which way is this going" or "where do I manage this", and a reader given both reads neither
 * @constraint Don't put a chart in it. The moment a total needs a shape it is a MetricCard
 * @constraint deltaTone is the reader's verdict, not the arithmetic's. Cost up 30% is negative and PII coverage up 30% is positive, and only the product knows which
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=4839-17659
 */

/**
 * StatCard — one headline total in a row of peers, with its trend or one handoff.
 */

export interface StatCardProps extends React.ComponentProps<"div"> {
  label: string
  /** The one number this tile is about, already formatted. */
  value: React.ReactNode
  /** What the label means. Renders the info affordance beside it. */
  hint?: string
  /** The change against the previous window, e.g. "+2.7%". */
  delta?: string
  /** The period the change is measured over, e.g. "vs past 30d". */
  deltaWindow?: string
  deltaTone?: DeltaTone
  /** One handoff, when the total has a surface behind it. */
  action?: { label: string; onClick?: () => void; href?: string }
}

function StatCard({
  label,
  value,
  hint,
  delta,
  deltaWindow,
  deltaTone = "neutral",
  action,
  className,
  ...props
}: StatCardProps) {
  return (
    // gap-0 because the three lines are one block, not three sections — their
    // line boxes already stack to the 96px tile and a gap would break the rhythm
    // the band shares with the widgets below it.
    <Card data-slot="stat-card" className={cn("gap-0", className)} {...props}>
      <CardContent>
        <div className="flex items-center gap-1">
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
        <div className="truncate type-title-4 text-text-base tabular-nums">
          {value}
        </div>
        {delta ? (
          <p className="truncate type-body">
            <span className={DELTA_TONE[deltaTone]}>{delta}</span>
            {deltaWindow ? (
              <span className="text-text-subtle"> {deltaWindow}</span>
            ) : null}
          </p>
        ) : null}
        {action ? (
          <Button
            variant="link"
            size="sm"
            className="h-5 w-fit px-0"
            onClick={action.onClick}
            {...(action.href ? { render: <a href={action.href} /> } : {})}
          >
            {action.label}
          </Button>
        ) : null}
      </CardContent>
    </Card>
  )
}

export { StatCard }
