"use client"

import * as React from "react"
import { Table } from "dbui/components/icons/Table"
import { Star } from "dbui/components/icons/Star"
import { Copy } from "dbui/components/icons/Copy"
import { CertifiedFill } from "dbui/components/icons/CertifiedFill"
import { BarChart } from "dbui/components/icons/BarChart"
import { Button } from "dbui/components/ui/button"
import { cn } from "dbui/lib/utils"

/**
 * @standard PreviewPopup
 * @composition true
 * @category overlay
 * @useFor Hover-card / popup that previews ANY DBUI asset's metadata — catalog, schema, table, view, model, function, volume — showing common fields (Location, Owner, Edited, Description) plus asset-specific extras (Popularity / Quality / Size).
 * @avoidFor Click-triggered detail panes → use Drawer. In-flow inline metadata → use KeyValuePair directly.
 * @synonyms hover card, asset hover popup, table preview, asset tooltip
 * @figma Preview Popup
 * @guideline Width 360. Outer padding 12px / 16px (vertical / horizontal). Outer gap 12. Header is a 3-column row: TypeIcon | AssetTitle (vertical: AssetNameRow + ParentPath) | StarButton + CopyButton. Properties rows are gap-0 (each row has its own 20px line-height).
 * @guideline 1:1 layer mapping with the Figma master at id 3803:11758. Inner names match exactly: TypeIcon, AssetTitle, AssetNameRow, AssetName, VerifiedBadge, ParentPath, StarButton, CopyButton, Properties, Description.
 */

export type AssetQualityStatus = "healthy" | "warning" | "stale" | "unknown"

export type PreviewPopupProps = {
  /** Asset name (rendered as AssetName text in the header). */
  name: string
  /** Type icon rendered in the TypeIcon slot. Defaults to <Table />. */
  icon?: React.ReactNode
  /** Whether the VerifiedBadge slot is visible. */
  certified?: boolean
  /** Parent path (e.g. "main.public") rendered as ParentPath text under AssetName. */
  parentPath?: string

  // ── Properties grid ──
  owner?: string
  popularity?: string
  /** Optional icon rendered before the popularity text (default: BarChart). */
  popularityIcon?: React.ReactNode
  quality?: { status?: AssetQualityStatus; text: string }
  edited?: string
  /** Size string. For tables: "X GiB, Y files". For schemas: "N tables, M views". For catalogs: "N schemas". */
  size?: string

  /** Description body — wraps; "More..." affordance shown when `onMoreClick` provided. */
  description?: string
  onMoreClick?: () => void

  // ── Header right-cluster ──
  showStar?: boolean
  starred?: boolean
  onStarToggle?: () => void
  showCopy?: boolean
  onCopyClick?: () => void

  className?: string
  width?: number | string
}

const QUALITY_DOT_CLASS: Record<AssetQualityStatus, string> = {
  healthy: "bg-action-positive-base",
  warning: "bg-status-text-warning",
  stale: "bg-text-subtle",
  unknown: "bg-text-subtle",
}

/**
 * One Properties-grid row — matches Figma layer shape `<row name>.{Label, Value}`.
 * The row container's `data-slot` reflects the row's key (Owner, Popularity, etc.)
 * so the React DOM mirrors Figma layer naming for downstream tooling (lint, drift-check).
 */
function PropertyRow({
  slot,
  label,
  children,
}: {
  slot: string
  label: string
  children: React.ReactNode
}) {
  return (
    <div
      data-slot={slot}
      className="flex h-5 items-center gap-2 type-label"
    >
      <span data-slot="Label" className="w-[80px] shrink-0 text-text-subtle">
        {label}
      </span>
      <div data-slot="Value" className="flex flex-1 min-w-0 items-center gap-2 text-text-base">
        {children}
      </div>
    </div>
  )
}

/**
 * PreviewPopup — Figma `Preview Popup` composition (id 3803:11758, key 3ec3b65...).
 * Layer names + structure match 1:1 so the agent can author either side and the
 * extracted L2 schema will line up.
 */
export function PreviewPopup({
  name,
  icon,
  certified = false,
  parentPath,
  owner,
  popularity,
  popularityIcon,
  quality,
  edited,
  size,
  description,
  onMoreClick,
  showStar = true,
  starred = false,
  onStarToggle,
  showCopy = true,
  onCopyClick,
  className,
  width = 360,
}: PreviewPopupProps) {
  return (
    <div
      data-slot="preview-popup"
      className={cn(
        "flex flex-col gap-3 rounded-2 border border-border-base bg-surface-base py-3 px-4 shadow-md",
        className
      )}
      style={{ width }}
    >
      {/* Header — 3-column horizontal row, matching Figma `Header` */}
      <div data-slot="Header" className="flex h-10 items-start gap-2">
        {/* TypeIcon — w-4 h-6 with py-1 vertical centering of the 16px glyph */}
        <span
          data-slot="TypeIcon"
          className="flex h-6 w-4 shrink-0 items-center justify-center py-1 text-text-base [&_svg]:size-4"
          aria-hidden
        >
          {icon ?? <Table />}
        </span>

        {/* AssetTitle — vertical column with AssetNameRow + ParentPath */}
        <div data-slot="AssetTitle" className="flex min-w-0 flex-1 flex-col">
          <div
            data-slot="AssetNameRow"
            className="flex h-6 items-center gap-1 py-0.5"
          >
            <span
              data-slot="AssetName"
              className="truncate type-title-4 text-text-base"
            >
              {name}
            </span>
            {certified && (
              <span
                data-slot="VerifiedBadge"
                className="shrink-0 text-link-base [&_svg]:size-4"
                aria-label="Certified"
                title="Certified"
              >
                <CertifiedFill />
              </span>
            )}
          </div>
          {parentPath && (
            <span
              data-slot="ParentPath"
              className="truncate type-hint text-text-subtle"
            >
              {parentPath}
            </span>
          )}
        </div>

        {/* Star + Copy — DBUI Icon Button instances (variant=ghost size=icon-sm), 24x24 */}
        {showStar && (
          <Button
            data-slot="StarButton"
            variant="ghost"
            size="icon-sm"
            onClick={onStarToggle}
            aria-label={starred ? "Unstar" : "Star"}
            title={starred ? "Unstar" : "Star"}
            className={cn(starred && "text-link-base")}
          >
            <Star />
          </Button>
        )}
        {showCopy && (
          <Button
            data-slot="CopyButton"
            variant="ghost"
            size="icon-sm"
            onClick={onCopyClick}
            aria-label="Copy name"
            title="Copy name"
          >
            <Copy />
          </Button>
        )}
      </div>

      {/* Properties — vertical column, gap-0 (each row carries its own h-5) */}
      {(owner || popularity || quality || edited || size) && (
        <div data-slot="Properties" className="flex flex-col">
          {owner && <PropertyRow slot="Owner" label="Owner">{owner}</PropertyRow>}
          {popularity && (
            <PropertyRow slot="Popularity" label="Popularity">
              <span className="flex shrink-0 items-center text-text-subtle [&_svg]:size-3.5">
                {popularityIcon ?? <BarChart />}
              </span>
              <span className="truncate">{popularity}</span>
            </PropertyRow>
          )}
          {quality && (
            <PropertyRow slot="Quality" label="Quality">
              <span
                className={cn(
                  "inline-block size-2 rounded-full shrink-0",
                  QUALITY_DOT_CLASS[quality.status ?? "unknown"]
                )}
                aria-hidden
              />
              <span className="truncate">{quality.text}</span>
            </PropertyRow>
          )}
          {edited && <PropertyRow slot="Edited" label="Edited">{edited}</PropertyRow>}
          {size && <PropertyRow slot="Size" label="Size">{size}</PropertyRow>}
        </div>
      )}

      {/* Description — wraps; "More..." inline, click-able when handler provided */}
      {description && (
        <div data-slot="Description" className="type-body text-text-base">
          <span className="line-clamp-3">{description}</span>
          {onMoreClick && (
            <Button
              variant="link"
              size="sm"
              onClick={onMoreClick}
              className="mt-1 h-auto p-0 text-text-base"
            >
              More...
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
