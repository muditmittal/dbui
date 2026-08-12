/**
 * One live demo per component for the Components gallery.
 *
 * Three rules, and the first is the one the others exist to protect.
 *
 * **It is the component, never a picture of one.** This file used to imitate
 * eighteen of them with hand-drawn divs — a Dialog was a bordered box, a Tree
 * was three padded rows, a Combobox was an InputGroup. A drawing cannot be
 * opened, dragged or tabbed into, so the gallery's claim to show the library
 * running was false exactly where a reader most needed it to be true. It also
 * drifts silently: the imitation keeps its 12px text while the component moves
 * to the ramp, and nothing fails.
 *
 * **Default state plus every variant, minus size and state.** A reader comparing
 * Button's seven or Alert's four should see them together; hover, press, focus,
 * disabled and loading belong to Storybook, where there are controls to hold
 * them. Content-like axes are capped at about four — Status ships twelve values
 * and four of them say what the component is.
 *
 * **No hooks.** This is a server module and the gallery renders it on the
 * server, so every demo is uncontrolled: `defaultOpen`, `defaultValue`,
 * `defaultPressed`, or a trigger driving a component that holds its own state.
 * A demo that cannot work that way is a finding, not a reason to add `"use
 * client"` here — see the notes on Editor Tabs, Combobox and Toast below.
 *
 * Where a variant is not visually self-evident, the demo's own content names it:
 * the button labelled "Outline" is the outline variant. That is what tells a
 * reader which is which without a caption under each one.
 */
import * as React from "react"

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "dbui/components/ui/accordion"
import { Alert, AlertContent, AlertIcon, AlertTitle } from "dbui/components/ui/alert"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "dbui/components/ui/alert-dialog"
import { AspectRatio } from "dbui/components/ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarGroup } from "dbui/components/ui/avatar"
import { Badge } from "dbui/components/ui/badge"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "dbui/components/ui/breadcrumb"
import { Button, ButtonChevron, ButtonIcon } from "dbui/components/ui/button"
import { AiGradientIcon } from "dbui/components/ui/ai-gradient-icon"
import { Sparkle } from "dbui/components/icons/Sparkle"
import { Card, CardHeader, CardTitle, CardDescription } from "dbui/components/ui/card"
import { Checkbox } from "dbui/components/ui/checkbox"
import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem } from "dbui/components/ui/combobox"
import { ControlsBar, ControlsBarFilters, ControlsBarActions } from "dbui/components/ui/controls-bar"
import { DataTree, TreeNodeTag } from "dbui/components/ui/data-tree"
import { DateRange, DateRangeField } from "dbui/components/ui/date-range"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "dbui/components/ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "dbui/components/ui/drawer"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuItemIcon, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "dbui/components/ui/dropdown-menu"
import { EditorTabs, EditorTab, EditorTabIcon, EditorTabAddButton } from "dbui/components/ui/editor-tabs"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "dbui/components/ui/empty"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "dbui/components/ui/hover-card"
import { Input } from "dbui/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "dbui/components/ui/input-group"
import { KeyValuePair, KeyValueItem, KeyValueKey, KeyValueValue } from "dbui/components/ui/key-value-pair"
import { Label } from "dbui/components/ui/label"
import { Navbar, NavbarSection, NavbarSectionHeader, NavbarItem, NavbarItemIcon, NavbarNewButton } from "dbui/components/ui/navbar"
import { PageHeader, PageHeaderBack, PageHeaderTitle, PageHeaderActions } from "dbui/components/ui/page-header"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "dbui/components/ui/pagination"
import { PlatformHeader, PlatformHeaderLeft, PlatformHeaderCenter, PlatformHeaderRight, PlatformHeaderBadge } from "dbui/components/ui/platform-header"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "dbui/components/ui/popover"
import { Progress, ProgressLabel, ProgressValue } from "dbui/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "dbui/components/ui/radio-group"
import { RadioTileGroup, RadioTile, RadioTileHeader, RadioTileTitle, RadioTileDescription, RadioTileIcon } from "dbui/components/ui/radio-tile"
import { SegmentControl, SegmentControlItem } from "dbui/components/ui/segment-control"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "dbui/components/ui/select"
import { Separator } from "dbui/components/ui/separator"
import { Skeleton } from "dbui/components/ui/skeleton"
import { Slider } from "dbui/components/ui/slider"
import { Spinner } from "dbui/components/ui/spinner"
import { SplitButton, SplitButtonSeparator } from "dbui/components/ui/split-button"
import { Status } from "dbui/components/ui/status"
import { Switch } from "dbui/components/ui/switch"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "dbui/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "dbui/components/ui/tabs"
import { Tag, TagLabel, TagRemove } from "dbui/components/ui/tag"
import { Textarea } from "dbui/components/ui/textarea"
import { FilterToggle, Toggle } from "dbui/components/ui/toggle"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "dbui/components/ui/tooltip"

import { App } from "dbui/components/icons/App"
import { Catalog } from "dbui/components/icons/Catalog"
import { CheckCircleFill } from "dbui/components/icons/CheckCircleFill"
import { ChevronDown } from "dbui/components/icons/ChevronDown"
import { Copy } from "dbui/components/icons/Copy"
import { DangerFill } from "dbui/components/icons/DangerFill"
import { Gear } from "dbui/components/icons/Gear"
import { InfoFill } from "dbui/components/icons/InfoFill"
import { Lightning } from "dbui/components/icons/Lightning"
import { Models } from "dbui/components/icons/Models"
import { Notebook } from "dbui/components/icons/Notebook"
import { Pin } from "dbui/components/icons/Pin"
import { Plus } from "dbui/components/icons/Plus"
import { Query } from "dbui/components/icons/Query"
import { Refresh } from "dbui/components/icons/Refresh"
import { Search } from "dbui/components/icons/Search"
import { Share } from "dbui/components/icons/Share"
import { SidebarOpen } from "dbui/components/icons/SidebarOpen"
import { Sliders } from "dbui/components/icons/Sliders"
import { Table as TableIcon } from "dbui/components/icons/Table"
import { Trash } from "dbui/components/icons/Trash"
import { WarningFill } from "dbui/components/icons/WarningFill"
import { Workflows } from "dbui/components/icons/Workflows"

import { CheckboxIndeterminateDemo } from "./gallery-demos-stateful"

export const demos: Record<string, React.ReactNode> = {
  // Action
  Button: (
    <>
      <Button>Primary</Button>
      <Button variant="outline">
        Outline
      </Button>
      <Button variant="secondary">
        Secondary
      </Button>
      <Button variant="ghost">
        Ghost
      </Button>
      <Button variant="link">
        Link
      </Button>
      {/*
        Destructive sits last rather than beside Primary. Its constraint is that
        it must never be the first button a reader meets, and a variant index is
        the one place that can only be half kept — position is the half that can.
      */}
      <Button variant="danger">
        Danger
      </Button>
      <Button variant="destructive">
        Destructive
      </Button>
    </>
  ),
  /*
    Horizontal only. `orientation="vertical"` exists on the component but sets
    just `flex-col` and squares the shared edge — it equalizes nothing, so the
    two halves come out different widths and read as two detached controls
    stacked by accident. No story exercises it either. A gallery row is a claim
    that this is how the component looks, so it shows the orientation the system
    actually uses and leaves the other to be fixed rather than advertised.
  */
  "Split Button": (
    <SplitButton>
      <Button variant="outline">Run</Button>
      <SplitButtonSeparator />
      <Button size="icon-md" variant="outline" aria-label="Run options">
        <ChevronDown />
      </Button>
    </SplitButton>
  ),
  // Pill is a group of three rather than one chip, because its guideline is that
  // it reads as a filter set. Filter goes through `FilterToggle`, which owns its
  // own icon. One example per variant rather than a filled group: the pill's
  // guideline is that it reads as a set, but three of them here made a four
  // variant row look like six controls and buried what the row is showing.
  "Toggle Button": (
    <>
      {/*
        Pressed, because an unpressed default Toggle has no border or fill — next
        to three bordered controls it read as a stray text label rather than a
        control, which is the opposite of what a gallery row is for. Pressed is
        also the state that shows what the component is: a button that remembers.
      */}
      <Toggle defaultPressed>Default</Toggle>
      <FilterToggle>Filter</FilterToggle>
      <Toggle variant="filter">Tables</Toggle>
      <Toggle size="icon-md" variant="icon" aria-label="Pin table">
        <Pin />
      </Toggle>
    </>
  ),

  // Input
  Checkbox: (
    <div className="flex items-center gap-4">
      <Checkbox defaultChecked />
      <CheckboxIndeterminateDemo />
      <Checkbox />
    </div>
  ),
  // Base UI filters only when the root takes an `items` array and the list
  // renders through a render prop, and a function cannot cross the server
  // boundary — so this opens, navigates and selects, but typing does not narrow
  // the list. Storybook's Combobox does.
  Combobox: (
    <div className="w-52">
      <Combobox>
        <ComboboxInput placeholder="Search catalogs" showClear />
        <ComboboxContent>
          <ComboboxList>
            <ComboboxItem value="main">main</ComboboxItem>
            <ComboboxItem value="samples">samples</ComboboxItem>
            <ComboboxItem value="finance_prod">finance_prod</ComboboxItem>
            <ComboboxItem value="marketing_dev">marketing_dev</ComboboxItem>
            <ComboboxItem value="ml_features">ml_features</ComboboxItem>
            <ComboboxItem value="hive_metastore">hive_metastore</ComboboxItem>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  ),
  "Date Range": (
    <DateRange>
      <DateRangeField value="Start: 04/24/2026" />
      <DateRangeField placeholder="End: MM/DD/YYYY" />
    </DateRange>
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
        <SelectContent>
          <SelectItem value="main">main</SelectItem>
          <SelectItem value="samples">samples</SelectItem>
          <SelectItem value="finance_prod">finance_prod</SelectItem>
        </SelectContent>
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

  // Selection
  Radio: (
    <RadioGroup defaultValue="a" className="flex gap-4">
      <RadioGroupItem value="a" />
      <RadioGroupItem value="b" />
    </RadioGroup>
  ),
  "Radio Tile": (
    <RadioTileGroup defaultValue="serverless" className="max-w-lg grid-cols-2">
      <RadioTile value="serverless">
        <RadioTileHeader>
          <RadioTileIcon>
            <Lightning />
          </RadioTileIcon>
          <RadioTileTitle>Serverless</RadioTileTitle>
        </RadioTileHeader>
        <RadioTileDescription>Managed compute, scales to zero</RadioTileDescription>
      </RadioTile>
      <RadioTile value="classic">
        <RadioTileHeader>
          <RadioTileIcon>
            <Gear />
          </RadioTileIcon>
          <RadioTileTitle>Classic</RadioTileTitle>
        </RadioTileHeader>
        <RadioTileDescription>Runs in your own cloud account</RadioTileDescription>
      </RadioTile>
    </RadioTileGroup>
  ),
  "Segment Control": (
    <SegmentControl defaultValue={["grid"]}>
      <SegmentControlItem value="list">List</SegmentControlItem>
      <SegmentControlItem value="grid">Grid</SegmentControlItem>
      <SegmentControlItem value="table">Table</SegmentControlItem>
    </SegmentControl>
  ),

  // Menu
  "Dropdown Menu": (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        Table actions
        <ButtonChevron />
      </DropdownMenuTrigger>
      {/* The popup is `w-(--anchor-width)` by default, which is the trigger's. */}
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <DropdownMenuItemIcon>
            <TableIcon />
          </DropdownMenuItemIcon>
          Open in new tab
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DropdownMenuItemIcon>
            <Copy />
          </DropdownMenuItemIcon>
          Copy table path
          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DropdownMenuItemIcon>
            <Share />
          </DropdownMenuItemIcon>
          Manage permissions
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <DropdownMenuItemIcon>
            <Trash />
          </DropdownMenuItemIcon>
          Delete table
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),

  // Overlay
  "Alert Dialog": (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="danger" />}>
        Delete table
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete main.default.nyctaxi?</AlertDialogTitle>
          <AlertDialogDescription>
            The table and its history are removed for everyone with access. Jobs that read it will
            start to fail on their next run.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/*
          `AlertDialogAction` is a plain Button with no close wiring, so the
          confirm here does not dismiss without an `onClick`. Kept as the
          documented API rather than swapped for a destructive-looking Cancel —
          Escape and Cancel both close it.
        */}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete table</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  Dialog: (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>Create catalog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create catalog</DialogTitle>
          <DialogDescription>
            A catalog is the top level of the namespace. Schemas and tables live inside it.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 px-4 pb-4">
          <Label htmlFor="gallery-dialog-catalog">Catalog name</Label>
          <Input id="gallery-dialog-catalog" placeholder="main" />
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <DialogClose render={<Button />}>Create catalog</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  // Drawer is the one component here not built on Base UI — it wraps vaul, whose
  // trigger is a Radix one, so it composes through `asChild`. `render` is a type
  // error there and ships a button with no label.
  Drawer: (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">
          Table details
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>nyctaxi</DrawerTitle>
          <DrawerDescription>main.default — Delta table, 12 columns</DrawerDescription>
        </DrawerHeader>
        <div className="px-6 py-2">
          <KeyValuePair>
            <KeyValueItem>
              <KeyValueKey>Owner</KeyValueKey>
              <KeyValueValue>data-platform</KeyValueValue>
            </KeyValueItem>
            <KeyValueItem>
              <KeyValueKey>Last write</KeyValueKey>
              <KeyValueValue>4 minutes ago</KeyValueValue>
            </KeyValueItem>
            <KeyValueItem>
              <KeyValueKey>Size</KeyValueKey>
              <KeyValueValue>1.4 TB</KeyValueValue>
            </KeyValueItem>
          </KeyValuePair>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  "Hover Card": (
    <HoverCard>
      <HoverCardTrigger render={<Button variant="link" />}>
        samples.nyctaxi.trips
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <TableIcon className="text-text-subtle" />
            <span className="type-label-bold">trips</span>
            <Badge variant="outline">Delta</Badge>
          </div>
          <p className="type-body text-text-subtle">
            Yellow taxi trips for 2016, partitioned by pickup date. Read by eight downstream jobs.
          </p>
          <p className="type-hint text-text-subtle">Updated 4 minutes ago · 1.4 TB</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
  Popover: (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Filter</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Filter assets</PopoverTitle>
          <PopoverDescription>Narrows the browser to matching objects.</PopoverDescription>
        </PopoverHeader>
        <div className="flex flex-col gap-2">
          <Label className="type-body">
            <Checkbox defaultChecked />
            Tables
          </Label>
          <Label className="type-body">
            <Checkbox />
            Views
          </Label>
          <Label className="type-body">
            <Checkbox />
            Volumes
          </Label>
        </div>
      </PopoverContent>
    </Popover>
  ),
  Tooltip: (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={<Button variant="ghost" size="icon-md" aria-label="Refresh schema" />}
        >
          <Refresh />
        </TooltipTrigger>
        <TooltipContent>Refresh schema</TooltipContent>
      </Tooltip>
    </TooltipProvider>
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
  // `active` is controlled with no uncontrolled equivalent, so the tabs are real
  // buttons with working hover and close affordances but a fixed selection.
  "Editor Tabs": (
    <div className="w-90 overflow-hidden rounded-t-2 bg-surface-subtle">
      <EditorTabs>
        <EditorTab active>
          <EditorTabIcon>
            <Notebook />
          </EditorTabIcon>
          trips.py
        </EditorTab>
        <EditorTab>
          <EditorTabIcon>
            <Query />
          </EditorTabIcon>
          daily_revenue.sql
        </EditorTab>
        <EditorTabAddButton />
      </EditorTabs>
    </div>
  ),
  Navbar: (
    <div className="w-45 rounded-2 bg-surface-subtle p-3">
      <Navbar>
        <NavbarNewButton>
          <Plus />
          New
        </NavbarNewButton>
        {/* The section owns its expanded state, so it collapses without a hook. */}
        <NavbarSection>
          <NavbarSectionHeader>Workspace</NavbarSectionHeader>
          <NavbarItem active>
            <NavbarItemIcon>
              <Catalog />
            </NavbarItemIcon>
            Catalog
          </NavbarItem>
          <NavbarItem>
            <NavbarItemIcon>
              <Workflows />
            </NavbarItemIcon>
            Jobs
          </NavbarItem>
          <NavbarItem>
            <NavbarItemIcon>
              <Models />
            </NavbarItemIcon>
            Models
          </NavbarItem>
        </NavbarSection>
      </Navbar>
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
    <div className="flex flex-wrap items-start gap-4">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sample">Sample data</TabsTrigger>
          <TabsTrigger value="lineage">Lineage</TabsTrigger>
        </TabsList>
      </Tabs>
      <Tabs defaultValue="overview">
        <TabsList variant="pill">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sample">Sample data</TabsTrigger>
          <TabsTrigger value="lineage">Lineage</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  ),

  // Feedback
  Alert: (
    <>
      <div className="w-45">
        <Alert variant="info">
          <AlertIcon>
            <InfoFill />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>Preview is cached</AlertTitle>
          </AlertContent>
        </Alert>
      </div>
      <div className="w-45">
        <Alert variant="warning">
          <AlertIcon>
            <WarningFill />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>Schema changed</AlertTitle>
          </AlertContent>
        </Alert>
      </div>
      <div className="w-45">
        <Alert variant="success">
          <AlertIcon>
            <CheckCircleFill />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>Run completed</AlertTitle>
          </AlertContent>
        </Alert>
      </div>
      <div className="w-45">
        <Alert variant="danger">
          <AlertIcon>
            <DangerFill />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>Run failed</AlertTitle>
          </AlertContent>
        </Alert>
      </div>
    </>
  ),
  Badge: (
    <>
      <Badge variant="fill">Delta</Badge>
      <Badge variant="outline">v2</Badge>
      <Badge variant="positive">Healthy</Badge>
      <Badge variant="negative">Failed</Badge>
      <Badge variant="warning">Stale</Badge>
      <Badge variant="info">Running</Badge>
    </>
  ),
  // The variant lives on `EmptyMedia`, not on `Empty` itself.
  Empty: (
    <>
      <div className="w-52">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="default">
              <TableIcon className="size-8 text-text-subtle" />
            </EmptyMedia>
            <EmptyTitle>No tables yet</EmptyTitle>
          </EmptyHeader>
        </Empty>
      </div>
      <div className="w-52">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <TableIcon />
            </EmptyMedia>
            <EmptyTitle>No tables yet</EmptyTitle>
          </EmptyHeader>
        </Empty>
      </div>
    </>
  ),
  "Progress Bar": (
    <div className="w-52">
      <Progress value={62}>
        <ProgressLabel>Indexing tables</ProgressLabel>
        <ProgressValue />
      </Progress>
    </div>
  ),
  Skeleton: (
    <div className="flex w-45 flex-col gap-2">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <Skeleton className="h-3 w-3/5" />
    </div>
  ),
  Spinner: <Spinner className="size-6" />,
  // Four of twelve. The rest are shades of these and belong in Storybook.
  Status: (
    <div className="flex flex-wrap items-center gap-4">
      <span className="type-label flex items-center gap-2">
        <Status status="running" /> Running
      </span>
      <span className="type-label flex items-center gap-2">
        <Status status="success" /> Succeeded
      </span>
      <span className="type-label flex items-center gap-2">
        <Status status="warning" /> Stale
      </span>
      <span className="type-label flex items-center gap-2">
        <Status status="error" /> Failed
      </span>
    </div>
  ),

  // Display
  AiGradientIcon: (
    <div className="flex items-center gap-3">
      <AiGradientIcon>
        <Sparkle className="size-6" />
      </AiGradientIcon>
      <Button variant="secondary" size="md">
        <ButtonIcon>
          <AiGradientIcon>
            <Sparkle />
          </AiGradientIcon>
        </ButtonIcon>
        Investigate
      </Button>
    </div>
  ),

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
          <CardTitle>nyctaxi</CardTitle>
          <CardDescription>Delta table</CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
  "Key Value Pair": (
    <div className="w-48">
      <KeyValuePair>
        <KeyValueItem layout="vertical">
          <KeyValueKey layout="vertical">Owner</KeyValueKey>
          <KeyValueValue>mudit@databricks</KeyValueValue>
        </KeyValueItem>
        <KeyValueItem layout="vertical">
          <KeyValueKey layout="vertical">Format</KeyValueKey>
          <KeyValueValue>Delta</KeyValueValue>
        </KeyValueItem>
      </KeyValuePair>
    </div>
  ),
  Table: (
    <div className="w-55">
      <Table unframed>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>trip_id</TableCell>
            <TableCell>bigint</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>fare</TableCell>
            <TableCell>double</TableCell>
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
  // Namespace rows are not selectable and the asset rows carry a `trailing` tag,
  // because either one suppresses TreeNode's hover action cluster — two buttons
  // it renders inside the row's own button, which the parser unnests and
  // hydration then fails on.
  Tree: (
    <div className="w-64">
      <DataTree
        sections={[
          {
            label: "My organization",
            nodes: [
              {
                id: "main",
                label: "main",
                kind: "catalog",
                selectable: false,
                defaultExpanded: true,
                children: [
                  {
                    id: "main.default",
                    label: "default",
                    kind: "schema",
                    selectable: false,
                    defaultExpanded: true,
                    children: [
                      {
                        id: "main.default.nyctaxi",
                        label: "nyctaxi",
                        kind: "table",
                        leaf: true,
                        trailing: <TreeNodeTag>Delta</TreeNodeTag>,
                      },
                      {
                        id: "main.default.trip_summary",
                        label: "trip_summary",
                        kind: "view",
                        leaf: true,
                        trailing: <TreeNodeTag>1.4M rows</TreeNodeTag>,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ]}
      />
    </div>
  ),

  // Layout
  Accordion: (
    <div className="w-52">
      <Accordion>
        <AccordionItem value="a">
          <AccordionTrigger>Permissions</AccordionTrigger>
          <AccordionContent>Owner, editors, viewers</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  "Aspect Ratio": (
    <div className="flex items-center gap-3">
      <AspectRatio ratio={16 / 9} className="w-32">
        <Skeleton className="size-full" />
      </AspectRatio>
      <AspectRatio ratio={1} className="w-18">
        <Skeleton className="size-full" />
      </AspectRatio>
    </div>
  ),
  /*
    The two forms the Figma set ships, which are the two in product: a field with
    a trailing icon addon, and a field with a trailing text button. Both put the
    addon at the inline end, behind the seam.
    https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3178-3973

    Earlier revisions of this row invented examples instead of copying that set —
    a leading search icon, and the block-start and block-end alignments stacked
    above and below the field. The stacked pair is real API but in an unlabelled
    gallery row it reads as one control that failed to lay out, and the leading
    icon is not a form the product uses.
  */
  "Input Group": (
    <div className="flex flex-wrap items-start gap-3">
      <div className="w-52">
        <InputGroup>
          <InputGroupInput placeholder="Search" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton aria-label="Filter options">
              <Sliders />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="w-52">
        <InputGroup>
          <InputGroupInput placeholder="Search" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton>Browse</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  ),
  Label: (
    <div className="flex w-52 flex-col gap-1">
      <Label htmlFor="gallery-label-catalog" className="gap-1">
        Catalog name
        <span aria-hidden className="text-status-text-negative">
          *
        </span>
      </Label>
      <Input id="gallery-label-catalog" required placeholder="main" />
      <span className="type-hint text-text-subtle">Lowercase letters, numbers and underscores</span>
    </div>
  ),
  Separator: (
    <div className="type-body flex w-45 flex-col gap-2">
      <span>Section one</span>
      <Separator />
      <span>Section two</span>
    </div>
  ),

  // Chrome
  "Controls Bar": (
    <div className="w-125 overflow-hidden rounded-2 border border-border-base bg-surface-base">
      <ControlsBar>
        <ControlsBarFilters>
          <div className="relative w-45">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-text-subtle" />
            <Input placeholder="Filter tables" className="pl-8" />
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All schemas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">default</SelectItem>
              <SelectItem value="bronze">bronze</SelectItem>
              <SelectItem value="silver">silver</SelectItem>
            </SelectContent>
          </Select>
        </ControlsBarFilters>
        <ControlsBarActions>
          <Button variant="outline">Create table</Button>
        </ControlsBarActions>
      </ControlsBar>
    </div>
  ),
  "Page Header": (
    <div className="w-125 overflow-hidden rounded-2 border border-border-base bg-surface-base">
      <PageHeader>
        <PageHeaderTitle>
          <PageHeaderBack />
          <span className="type-title-4 text-text-strong">nyctaxi_trips</span>
          <Button variant="ghost" size="icon-md" aria-label="Copy table name">
            <Copy />
          </Button>
        </PageHeaderTitle>
        <PageHeaderActions>
          <Button variant="outline">Share</Button>
          <Button>Open in editor</Button>
        </PageHeaderActions>
      </PageHeader>
    </div>
  ),
  // A 48px full-page bar. The center slot is a fixed 552px search, so it is
  // overridden to the flex track to fit the row. The wordmark is left out —
  // the left slot forces `size-4` onto any svg without a `size-` class and
  // would squash a 126x32 logo into a square.
  "Platform Header": (
    <div className="w-150 overflow-hidden rounded-2 border border-border-base bg-surface-subtle">
      <PlatformHeader>
        <PlatformHeaderLeft>
          <Button variant="ghost" size="icon-md" aria-label="Toggle sidebar">
            <SidebarOpen />
          </Button>
          <PlatformHeaderBadge>Microsoft Azure</PlatformHeaderBadge>
        </PlatformHeaderLeft>
        <PlatformHeaderCenter className="w-full min-w-0 flex-1 px-4">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-text-subtle" />
            <Input
              placeholder="Search data, notebooks and recents"
              className="pl-8"
            />
          </div>
        </PlatformHeaderCenter>
        <PlatformHeaderRight>
          <Button variant="ghost" size="icon-md" aria-label="Apps">
            <App />
          </Button>
          <Avatar>
            <AvatarFallback>MM</AvatarFallback>
          </Avatar>
        </PlatformHeaderRight>
      </PlatformHeader>
    </div>
  ),
}
