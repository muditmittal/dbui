/**
 * One representative demo per component for the Components gallery.
 *
 * Every tile is a live DBUI component, never a picture of one — the gallery is
 * the library's claim about itself, so it has to be rendered by the library.
 * Keep each demo to a single glanceable variant; the component's own page is
 * where the full matrix lives.
 */
import * as React from "react"

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "dbui/components/ui/accordion"
import { Alert, AlertIcon, AlertContent, AlertTitle } from "dbui/components/ui/alert"
import { Avatar, AvatarFallback, AvatarGroup } from "dbui/components/ui/avatar"
import { Badge } from "dbui/components/ui/badge"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "dbui/components/ui/breadcrumb"
import { Button } from "dbui/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "dbui/components/ui/card"
import { Checkbox } from "dbui/components/ui/checkbox"
import { Empty, EmptyHeader, EmptyTitle } from "dbui/components/ui/empty"
import { Input } from "dbui/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "dbui/components/ui/input-group"
import { KeyValuePair, KeyValueItem, KeyValueKey, KeyValueValue } from "dbui/components/ui/key-value-pair"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "dbui/components/ui/pagination"
import { RadioGroup, RadioGroupItem } from "dbui/components/ui/radio-group"
import { SegmentControl, SegmentControlItem } from "dbui/components/ui/segment-control"
import { Select, SelectTrigger, SelectValue } from "dbui/components/ui/select"
import { Separator } from "dbui/components/ui/separator"
import { Skeleton } from "dbui/components/ui/skeleton"
import { Slider } from "dbui/components/ui/slider"
import { Spinner } from "dbui/components/ui/spinner"
import { SplitButton, SplitButtonText, SplitButtonSeparator } from "dbui/components/ui/split-button"
import { Status } from "dbui/components/ui/status"
import { Switch } from "dbui/components/ui/switch"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "dbui/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "dbui/components/ui/tabs"
import { Tag, TagLabel, TagRemove } from "dbui/components/ui/tag"
import { Textarea } from "dbui/components/ui/textarea"
import { Toggle } from "dbui/components/ui/toggle"

import { ChevronDown } from "dbui/components/icons/ChevronDown"
import { Search } from "dbui/components/icons/Search"
import { Table as TableIcon } from "dbui/components/icons/Table"
import { Warning } from "dbui/components/icons/Warning"

/** Static stand-in for components that only read correctly at full page width. */
function Chrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full rounded-1 border border-border-base bg-surface-base px-2 py-1.5 text-[12px]">
      {children}
    </div>
  )
}

export const demos: Record<string, React.ReactNode> = {
  // Action
  Button: (
    <div className="flex items-center gap-2">
      <Button size="sm">Primary</Button>
      <Button size="sm" variant="outline">
        Outline
      </Button>
      <Button size="sm" variant="ghost">
        Ghost
      </Button>
    </div>
  ),
  "Split Button": (
    <SplitButton>
      <SplitButtonText>Save</SplitButtonText>
      <SplitButtonSeparator />
      <ChevronDown />
    </SplitButton>
  ),

  // Input
  Checkbox: (
    <div className="flex items-center gap-4">
      <Checkbox defaultChecked />
      <Checkbox indeterminate />
      <Checkbox />
    </div>
  ),
  Combobox: (
    <div className="w-45">
      <InputGroup>
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search catalog" />
      </InputGroup>
    </div>
  ),
  Input: (
    <div className="w-45">
      <Input placeholder="main.default" />
    </div>
  ),
  Select: (
    <div className="w-45">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Choose a catalog" />
        </SelectTrigger>
      </Select>
    </div>
  ),
  Slider: (
    <div className="w-45">
      <Slider defaultValue={40} />
    </div>
  ),
  Switch: (
    <div className="flex items-center gap-4">
      <Switch defaultChecked />
      <Switch />
    </div>
  ),
  Textarea: (
    <div className="w-48">
      <Textarea rows={2} placeholder="Describe this table" />
    </div>
  ),
  "Date Range": (
    <div className="w-48">
      <Input placeholder="Jan 1 – Jan 31" />
    </div>
  ),

  // Selection
  Radio: (
    <RadioGroup defaultValue="a" className="flex gap-4">
      <RadioGroupItem value="a" />
      <RadioGroupItem value="b" />
    </RadioGroup>
  ),
  "Radio Tile": (
    <div className="flex gap-2">
      <div className="rounded-1 border border-border-accent bg-action-selected-base px-3 py-2 text-[12px]">Serverless</div>
      <div className="rounded-1 border border-border-base px-3 py-2 text-[12px]">Classic</div>
    </div>
  ),
  "Segment Control": (
    <SegmentControl defaultValue={["grid"]} size="sm">
      <SegmentControlItem value="list">List</SegmentControlItem>
      <SegmentControlItem value="grid">Grid</SegmentControlItem>
      <SegmentControlItem value="table">Table</SegmentControlItem>
    </SegmentControl>
  ),

  // Menu
  "Dropdown Menu": (
    <div className="w-44 rounded-2 border border-border-base bg-surface-base p-1 shadow-sm">
      <div className="rounded-1 bg-action-default-hover px-2 py-1 text-[12px]">Open in new tab</div>
      <div className="px-2 py-1 text-[12px]">Copy path</div>
      <Separator className="my-1" />
      <div className="px-2 py-1 text-[12px] text-text-subtle">Delete</div>
    </div>
  ),

  // Overlay
  "Alert Dialog": (
    <div className="w-52 rounded-2 border border-border-base bg-surface-base p-3 shadow-sm">
      <div className="text-[13px] font-semibold text-text-strong">Delete table?</div>
      <div className="mt-3 flex justify-end gap-1.5">
        <Button size="sm" variant="ghost">
          Cancel
        </Button>
        <Button size="sm" variant="destructive">
          Delete
        </Button>
      </div>
    </div>
  ),
  Dialog: (
    <div className="w-52 rounded-2 border border-border-base bg-surface-base p-3 shadow-sm">
      <div className="text-[13px] font-semibold text-text-strong">Create catalog</div>
      <div className="mt-2">
        <Input placeholder="Name" />
      </div>
    </div>
  ),
  Drawer: (
    <div className="flex h-24 w-52 overflow-hidden rounded-1 border border-border-base">
      <div className="flex-1 bg-surface-subtle" />
      <div className="w-20 border-l border-border-base bg-surface-base p-2 text-[12px]">Details</div>
    </div>
  ),
  "Hover Card": (
    <div className="w-45 rounded-2 border border-border-base bg-surface-base p-2.5 shadow-sm">
      <div className="text-[12px] font-semibold">samples.nyctaxi</div>
      <div className="mt-0.5 text-[12px] text-text-subtle">Delta · 12 columns</div>
    </div>
  ),
  Popover: (
    <div className="w-44 rounded-2 border border-border-base bg-surface-base p-2.5 shadow-sm">
      <div className="text-[13px] font-semibold text-text-strong">Filter</div>
      <div className="mt-1.5 flex items-center gap-1.5 text-[12px]">
        <Checkbox defaultChecked /> Tables only
      </div>
    </div>
  ),
  // Overlays portal to the body when opened, which would escape the tile, so the
  // surface is reproduced with the same tokens the component itself uses.
  Tooltip: (
    <div className="rounded-1 bg-text-base px-2 py-1 text-[12px] text-surface-base">Refresh schema</div>
  ),

  // Navigation
  Breadcrumb: (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">main</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>default</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  Navbar: (
    <div className="w-40 rounded-1 border border-border-base bg-surface-base p-1.5">
      <div className="rounded-1 bg-action-selected-base px-2 py-1 text-[12px]">Catalog</div>
      <div className="px-2 py-1 text-[12px] text-text-subtle">Workspace</div>
      <div className="px-2 py-1 text-[12px] text-text-subtle">Compute</div>
    </div>
  ),
  Pagination: (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  Tabs: (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="sample">Sample data</TabsTrigger>
        <TabsTrigger value="lineage">Lineage</TabsTrigger>
      </TabsList>
    </Tabs>
  ),

  // Feedback
  Alert: (
    <div className="w-55">
      <Alert variant="warning">
        <AlertIcon>
          <Warning />
        </AlertIcon>
        <AlertContent>
          <AlertTitle>Schema changed</AlertTitle>
        </AlertContent>
      </Alert>
    </div>
  ),
  Badge: (
    <div className="flex items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="fill">Beta</Badge>
      <Badge variant="outline">v2</Badge>
    </div>
  ),
  Empty: (
    <Empty>
      <EmptyHeader>
        <EmptyTitle className="text-[12px]">No tables yet</EmptyTitle>
      </EmptyHeader>
    </Empty>
  ),
  "Progress Bar": (
    <div className="w-45">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-subtle">
        <div className="h-full w-[62%] rounded-full bg-action-primary-base" />
      </div>
    </div>
  ),
  Skeleton: (
    <div className="flex w-45 flex-col gap-1.5">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <Skeleton className="h-3 w-3/5" />
    </div>
  ),
  // Larger than the default: at 16px, a partial arc in a 112px tile reads as a
  // stray glyph rather than as something turning.
  Spinner: <Spinner className="size-6" />,
  Status: (
    <div className="flex flex-col gap-1.5">
      <Status status="running" size="sm" />
      <Status status="success" size="sm" />
      <Status status="error" size="sm" />
    </div>
  ),

  // Display
  Avatar: (
    <AvatarGroup>
      <Avatar>
        <AvatarFallback>MM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AK</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JS</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
  Card: (
    <div className="w-48">
      <Card>
        <CardHeader>
          <CardTitle className="text-[12px]">nyctaxi</CardTitle>
          <CardDescription className="text-[12px]">Delta table</CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
  Table: (
    <div className="w-55 overflow-hidden rounded-1 border border-border-base">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="h-7 text-[12px]">Name</TableHead>
            <TableHead className="h-7 text-[12px]">Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="py-1 text-[12px]">trip_id</TableCell>
            <TableCell className="py-1 text-[12px]">bigint</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="py-1 text-[12px]">fare</TableCell>
            <TableCell className="py-1 text-[12px]">double</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
  Tag: (
    <div className="flex items-center gap-2">
      <Tag>
        <TagLabel>pii</TagLabel>
      </Tag>
      <Tag>
        <TagLabel>gold</TagLabel>
        <TagRemove />
      </Tag>
    </div>
  ),

  // Layout
  Accordion: (
    <div className="w-52">
      <Accordion>
        <AccordionItem value="a">
          <AccordionTrigger className="text-[12px]">Permissions</AccordionTrigger>
          <AccordionContent className="text-[12px]">Owner, editors, viewers</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  "Aspect Ratio": (
    <div className="h-18 w-32 rounded-1 border border-dashed border-border-base bg-surface-subtle text-center text-[12px] leading-18 text-text-subtle">
      16 : 9
    </div>
  ),
  "Input Group": (
    <div className="w-48">
      <InputGroup>
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput placeholder="Filter tables" />
      </InputGroup>
    </div>
  ),
  Label: (
    <div className="flex w-45 flex-col gap-1">
      <span className="text-[12px] font-semibold">Catalog name</span>
      <Input placeholder="main" />
    </div>
  ),
  Separator: (
    <div className="flex w-45 flex-col gap-2 text-[12px]">
      <span>Section one</span>
      <Separator />
      <span>Section two</span>
    </div>
  ),

  // Chrome
  "Controls Bar": (
    <Chrome>
      <div className="flex items-center gap-2">
        <div className="flex-1 rounded-1 border border-border-base px-2 py-1 text-text-subtle">Filter</div>
        <Button size="sm" variant="outline">
          Sort
        </Button>
      </div>
    </Chrome>
  ),
  "Page Header": (
    <Chrome>
      <div className="text-[13px] font-semibold">nyctaxi</div>
      <div className="mt-0.5 flex items-center justify-between">
        <span className="text-text-subtle">main.default</span>
        <Button size="sm">Share</Button>
      </div>
    </Chrome>
  ),
  "Platform Header": (
    <Chrome>
      <div className="flex items-center justify-between">
        <span className="font-semibold">Databricks</span>
        <div className="flex items-center gap-1.5">
          <Search className="size-3" />
          <Avatar className="size-4">
            <AvatarFallback>MM</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </Chrome>
  ),

  // Uncategorized
  "Editor Tabs": (
    <div className="flex w-52 items-end gap-0.5 border-b border-border-base text-[12px]">
      <div className="rounded-t-1 border border-b-0 border-border-base bg-surface-base px-2 py-1">query.sql</div>
      <div className="px-2 py-1 text-text-subtle">notebook.py</div>
    </div>
  ),
  "Key Value Pair": (
    <div className="w-48">
      <KeyValuePair>
        <KeyValueItem>
          <KeyValueKey>Owner</KeyValueKey>
          <KeyValueValue>mudit@databricks</KeyValueValue>
        </KeyValueItem>
        <KeyValueItem>
          <KeyValueKey>Format</KeyValueKey>
          <KeyValueValue>Delta</KeyValueValue>
        </KeyValueItem>
      </KeyValuePair>
    </div>
  ),
  Toast: (
    <div className="flex w-52 items-center gap-2 rounded-2 border border-border-base bg-surface-base px-2.5 py-2 shadow-sm">
      <Status status="success" size="sm" />
      <span className="text-[12px]">Table refreshed</span>
    </div>
  ),
  "Toggle Button": (
    <div className="flex items-center gap-2">
      <Toggle size="sm" defaultPressed>
        Pinned
      </Toggle>
      <Toggle size="sm">Starred</Toggle>
    </div>
  ),
  Tree: (
    <div className="w-44 text-[12px]">
      <div className="flex items-center gap-1.5 rounded-1 px-1.5 py-1">
        <ChevronDown className="size-3" /> main
      </div>
      <div className="flex items-center gap-1.5 rounded-1 bg-action-selected-base px-1.5 py-1 pl-4">
        <TableIcon className="size-3" /> nyctaxi
      </div>
      <div className="flex items-center gap-1.5 rounded-1 px-1.5 py-1 pl-4">
        <TableIcon className="size-3" /> trips
      </div>
    </div>
  ),
}
