import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import {
  Details,
  DetailsHeader,
  DetailsRows,
  DetailsRow,
  DetailsFooter,
  Message,
  MessageContent,
  Response,
} from "dbui-chat"
import { Button } from "dbui/components/ui/button"
import { Status } from "dbui/components/ui/status"
import { Table as TableIcon } from "dbui/components/icons/Table"
import { CertifiedFillSmall } from "dbui/components/icons/CertifiedFillSmall"
import { Overflow } from "dbui/components/icons/Overflow"

const meta: Meta = {
  title: "Components/Chat/Details",
  parameters: { layout: "padded" },
}

export default meta

/** Stand-in for a real chart. dbui-viz owns the actual series. */
function UsagePanel() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline gap-2">
        <span className="type-title-4 text-text-base">21,437</span>
        <span className="type-hint">
          <span className="text-status-text-positive">+2.6%</span>
          <span className="text-text-base"> past 30d</span>
        </span>
      </div>
      <div className="flex h-35 items-end gap-0.5">
        {[28, 22, 34, 30, 46, 40, 52, 44, 38, 30, 58, 64, 56, 70, 62, 76, 68, 82, 74, 88].map(
          (height, index) => (
            <div
              key={index}
              style={{ height: `${height}%` }}
              className="min-w-0 flex-1 rounded-1 bg-surface-strong"
            />
          )
        )}
      </div>
    </div>
  )
}

function AssetDetails() {
  return (
    <Details>
      <DetailsHeader
        icon={<TableIcon />}
        title="user_accounts"
        badge={<CertifiedFillSmall className="text-text-accent" />}
        path="main . user_management"
        actions={
          <Button variant="ghost" size="icon-sm" aria-label="More actions">
            <Overflow />
          </Button>
        }
      />
      <DetailsRows defaultValue={["usage"]}>
        <DetailsRow value="details" label="Details" summary="Table">
          <Response>{`A managed Delta table in \`main.user_management\`, written by the nightly identity sync.`}</Response>
        </DetailsRow>
        <DetailsRow value="usage" label="Usage" summary="21,437">
          <UsagePanel />
        </DetailsRow>
        <DetailsRow value="latency" label="P90 Latency" summary="382 ms">
          <Response>{`Measured across 30 days of served queries. The p99 is 1.2s.`}</Response>
        </DetailsRow>
        <DetailsRow value="size" label="Size" summary="81.3 GB" />
        <DetailsRow
          value="quality"
          label="Quality"
          summary="Healthy"
          summaryIcon={<Status status="success" />}
        >
          <Response>{`No failed expectations in the last 30 runs.`}</Response>
        </DetailsRow>
        <DetailsRow value="lineage" label="Lineage" summary="26 assets">
          <Response>{`14 upstream, 12 downstream. Two dashboards read it directly.`}</Response>
        </DetailsRow>
        <DetailsRow value="columns" label="Columns" summary="37" />
      </DetailsRows>
      <DetailsFooter>As of 12 hours ago</DetailsFooter>
    </Details>
  )
}

/** The widget on its own, at thread width. */
export const Playground: StoryObj = {
  render: () => (
    <div className="w-75">
      <AssetDetails />
    </div>
  ),
}

/** What it is for — an agent answering "tell me about this table" inline. */
export const InAThread: StoryObj = {
  render: () => (
    <div className="flex w-100 flex-col gap-4 rounded-2 border border-border-base bg-surface-base p-3">
      <Message from="user">
        <MessageContent>Tell me about main.user_management.user_accounts</MessageContent>
      </Message>
      <Message from="assistant">
        <MessageContent>
          <Response>
            {`It is a certified Delta table, healthy, and queried about 21k times in the last 30 days.`}
          </Response>
          <div className="mt-3">
            <AssetDetails />
          </div>
        </MessageContent>
      </Message>
    </div>
  ),
}

/** Rows with nothing behind them stay flat — no chevron over an empty panel. */
export const StaticRows: StoryObj = {
  render: () => (
    <div className="w-75">
      <Details>
        <DetailsHeader
          icon={<TableIcon />}
          title="orders"
          path="main . sales"
        />
        <DetailsRows>
          <DetailsRow value="type" label="Type" summary="Table" />
          <DetailsRow value="size" label="Size" summary="12.4 GB" />
          <DetailsRow value="columns" label="Columns" summary="18" />
        </DetailsRows>
        <DetailsFooter>As of 2 hours ago</DetailsFooter>
      </Details>
    </div>
  ),
}
