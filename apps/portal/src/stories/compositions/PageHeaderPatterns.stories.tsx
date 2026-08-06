import type { Meta, StoryObj } from "@storybook/react"
import {
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
} from "dbui/components/ui/page-header"
import {
  ControlsBar,
  ControlsBarFilters,
  ControlsBarActions,
} from "dbui/components/ui/controls-bar"
import { Tabs, TabsList, TabsTrigger } from "dbui/components/ui/tabs"
import { Button } from "dbui/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "dbui/components/ui/input-group"
import { Input } from "dbui/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "dbui/components/ui/select"
import {
  SegmentControl,
  SegmentControlItem,
} from "dbui/components/ui/segment-control"
import { Toggle } from "dbui/components/ui/toggle"
import {
  SplitButton,
  SplitButtonSeparator,
} from "dbui/components/ui/split-button"
import { DateRange, DateRangeField } from "dbui/components/ui/date-range"
import { Search } from "@/components/icons/Search"
import { Refresh } from "@/components/icons/Refresh"
import { Overflow } from "@/components/icons/Overflow"
import { ChevronDown } from "@/components/icons/ChevronDown"

/**
 * PageHeader + Tabs + ControlsBar — 6 real-world list-page recipes.
 *
 * Anatomy (3 sibling regions, no nesting):
 *   <PageHeader />     — title + actions, single row
 *   <Tabs />           — optional sibling
 *   <ControlsBar />    — optional filter / sort row + optional trailing actions
 */

const meta: Meta = {
  title: "Components/Compositions/Page Header Patterns",
  parameters: { layout: "padded" },
}

export default meta

const surface = (children: React.ReactNode) => (
  <div className="w-[1100px] overflow-hidden rounded-3 border border-border-base bg-surface-base">
    {children}
  </div>
)

const PageTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-[22px] leading-[28px] font-semibold">{children}</h1>
)

const TabsRow = ({ children }: { children: React.ReactNode }) => (
  <div className="px-4 pb-2">{children}</div>
)

function SearchInput({
  placeholder = "Filter",
  width = 200,
}: {
  placeholder?: string
  width?: number
}) {
  return (
    <InputGroup style={{ width }}>
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput placeholder={placeholder} />
    </InputGroup>
  )
}

function FilterSelect({
  placeholder,
  options,
}: {
  placeholder: string
  options: string[]
}) {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem
            key={opt}
            value={opt.toLowerCase().replace(/\s+/g, "-")}
          >
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function RefreshSplitButton() {
  return (
    <SplitButton>
      <Button variant="outline">
        <Refresh />
        Refresh
      </Button>
      <SplitButtonSeparator />
      <Button variant="outline" size="icon-md" aria-label="Refresh options">
        <ChevronDown />
      </Button>
    </SplitButton>
  )
}

function OverflowMenuButton() {
  return (
    <Button variant="ghost" size="icon-md" aria-label="More options">
      <Overflow />
    </Button>
  )
}

export const Queries: StoryObj = {
  render: () =>
    surface(
      <>
        <PageHeader>
          <PageHeaderTitle>
            <PageTitle>Queries</PageTitle>
          </PageHeaderTitle>
        </PageHeader>
        <ControlsBar>
          <ControlsBarFilters>
            <SearchInput />
            <SegmentControl defaultValue="my" variant="outline">
              <SegmentControlItem value="my">My queries</SegmentControlItem>
              <SegmentControlItem value="favorites">Favorites</SegmentControlItem>
              <SegmentControlItem value="all">All queries</SegmentControlItem>
            </SegmentControl>
          </ControlsBarFilters>
          <ControlsBarActions>
            <Button variant="outline">Open editor</Button>
            <Button>Create query</Button>
          </ControlsBarActions>
        </ControlsBar>
      </>,
    ),
}

export const Alerts: StoryObj = {
  render: () =>
    surface(
      <>
        <PageHeader>
          <PageHeaderTitle>
            <PageTitle>Alerts</PageTitle>
          </PageHeaderTitle>
          <PageHeaderActions>
            <Button>Create Alert</Button>
          </PageHeaderActions>
        </PageHeader>
        <TabsRow>
          <Tabs defaultValue="alerts">
            <TabsList>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
              <TabsTrigger value="legacy">Legacy Alerts</TabsTrigger>
            </TabsList>
          </Tabs>
        </TabsRow>
        <ControlsBar>
          <ControlsBarFilters>
            <SearchInput />
            <SegmentControl defaultValue="my" variant="outline">
              <SegmentControlItem value="my">My alerts</SegmentControlItem>
              <SegmentControlItem value="favorites">Favorites</SegmentControlItem>
              <SegmentControlItem value="all">All alerts</SegmentControlItem>
            </SegmentControl>
            <FilterSelect
              placeholder="Status"
              options={["Any", "Triggered", "OK", "Unknown"]}
            />
          </ControlsBarFilters>
        </ControlsBar>
      </>,
    ),
}

export const Agents: StoryObj = {
  render: () =>
    surface(
      <>
        <PageHeader>
          <PageHeaderTitle>
            <PageTitle>Agents</PageTitle>
          </PageHeaderTitle>
          <PageHeaderActions>
            <Button variant="outline">Register MCP Server</Button>
            <Button>Create Agent</Button>
          </PageHeaderActions>
        </PageHeader>
        <TabsRow>
          <Tabs defaultValue="agents">
            <TabsList>
              <TabsTrigger value="agents">Agents</TabsTrigger>
              <TabsTrigger value="mcps">MCPs</TabsTrigger>
            </TabsList>
          </Tabs>
        </TabsRow>
        <ControlsBar>
          <ControlsBarFilters>
            <SearchInput />
            <FilterSelect
              placeholder="Agent type"
              options={["All", "Conversational", "Workflow", "Evaluation"]}
            />
          </ControlsBarFilters>
        </ControlsBar>
      </>,
    ),
}

export const QueryHistory: StoryObj = {
  render: () =>
    surface(
      <>
        <PageHeader>
          <PageHeaderTitle>
            <PageTitle>Query History</PageTitle>
          </PageHeaderTitle>
          <PageHeaderActions>
            <OverflowMenuButton />
            <RefreshSplitButton />
          </PageHeaderActions>
        </PageHeader>
        <ControlsBar>
          <ControlsBarFilters>
            <FilterSelect
              placeholder="User: Me"
              options={["Me", "All users", "Specific user"]}
            />
            <FilterSelect
              placeholder="Last 7 days"
              options={["Last 24h", "Last 7 days", "Last 30 days", "Custom"]}
            />
            <FilterSelect
              placeholder="Compute"
              options={["All", "Serverless", "Classic"]}
            />
            <FilterSelect
              placeholder="Duration"
              options={["Any", "< 1 min", "1 \u2013 10 min", "> 10 min"]}
            />
            <FilterSelect
              placeholder="Status"
              options={["Any", "Running", "Finished", "Failed", "Canceled"]}
            />
            <FilterSelect
              placeholder="Statement"
              options={["All", "SELECT", "INSERT", "UPDATE", "DELETE"]}
            />
            <FilterSelect
              placeholder="Source"
              options={["All", "Notebook", "SQL editor", "API"]}
            />
            <Input placeholder="Statement ID" className="w-[160px]" />
          </ControlsBarFilters>
        </ControlsBar>
      </>,
    ),
}

export const Compute: StoryObj = {
  render: () =>
    surface(
      <>
        <PageHeader>
          <PageHeaderTitle>
            <PageTitle>Compute</PageTitle>
          </PageHeaderTitle>
        </PageHeader>
        <TabsRow>
          <Tabs defaultValue="all-purpose">
            <TabsList>
              <TabsTrigger value="all-purpose">All-purpose compute</TabsTrigger>
              <TabsTrigger value="job">Job compute</TabsTrigger>
              <TabsTrigger value="sql">SQL warehouses</TabsTrigger>
              <TabsTrigger value="vector">Vector Search</TabsTrigger>
              <TabsTrigger value="pools">Pools</TabsTrigger>
              <TabsTrigger value="gpu">GPU pools</TabsTrigger>
              <TabsTrigger value="policies">Policies</TabsTrigger>
              <TabsTrigger value="apps">Apps</TabsTrigger>
              <TabsTrigger value="lakebase">Lakebase</TabsTrigger>
            </TabsList>
          </Tabs>
        </TabsRow>
        <ControlsBar>
          <ControlsBarFilters>
            <SearchInput />
            <Toggle variant="filter" defaultPressed>
              Only my SQL warehouses
            </Toggle>
            <FilterSelect
              placeholder="Created by"
              options={["Me", "Anyone", "Specific user"]}
            />
            <FilterSelect
              placeholder="Size"
              options={["Any", "Small", "Medium", "Large", "X-Large"]}
            />
            <FilterSelect
              placeholder="Status"
              options={["Any", "Running", "Stopped", "Pending"]}
            />
            <FilterSelect
              placeholder="Type"
              options={["Any", "Serverless", "Classic", "Pro"]}
            />
          </ControlsBarFilters>
          <ControlsBarActions>
            <Button>Create compute</Button>
          </ControlsBarActions>
        </ControlsBar>
      </>,
    ),
}

export const JobsAndPipelines: StoryObj = {
  name: "Jobs & Pipelines",
  render: () =>
    surface(
      <>
        <PageHeader>
          <PageHeaderTitle>
            <PageTitle>Jobs &amp; Pipelines</PageTitle>
          </PageHeaderTitle>
          <PageHeaderActions>
            <OverflowMenuButton />
            <RefreshSplitButton />
          </PageHeaderActions>
        </PageHeader>
        <TabsRow>
          <Tabs defaultValue="jobs-pipelines">
            <TabsList>
              <TabsTrigger value="jobs-pipelines">Jobs &amp; pipelines</TabsTrigger>
              <TabsTrigger value="runs">Runs</TabsTrigger>
            </TabsList>
          </Tabs>
        </TabsRow>
        <ControlsBar>
          <ControlsBarFilters>
            <FilterSelect placeholder="Name" options={["Any", "Contains", "Equals"]} />
            <SegmentControl defaultValue="all" variant="outline">
              <SegmentControlItem value="all">All</SegmentControlItem>
              <SegmentControlItem value="jobs">Jobs</SegmentControlItem>
              <SegmentControlItem value="pipelines">Pipelines</SegmentControlItem>
              <SegmentControlItem value="system">System Managed</SegmentControlItem>
            </SegmentControl>
            <FilterSelect placeholder="Run as" options={["Anyone", "Me", "Service principal"]} />
            <DateRange>
              <DateRangeField
                placeholder="Start: MM/DD/YYYY, hh:mm AM"
                value="Start: 04/24/2026, 12:00 PM"
                onClear={() => {}}
              />
              <DateRangeField
                placeholder="End: MM/DD/YYYY, hh:mm AM"
                value="End: 04/26/2026, 12:00 PM"
                onClear={() => {}}
              />
            </DateRange>
            <FilterSelect
              placeholder="Run status"
              options={["Any", "Running", "Succeeded", "Failed"]}
            />
          </ControlsBarFilters>
          <ControlsBarActions>
            <Button>Create</Button>
          </ControlsBarActions>
        </ControlsBar>
      </>,
    ),
}
