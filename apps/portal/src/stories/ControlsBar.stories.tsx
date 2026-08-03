import type { Meta, StoryObj } from "@storybook/react"
import {
  ControlsBar,
  ControlsBarFilters,
  ControlsBarActions,
} from "dbui/components/ui/controls-bar"
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
import { Button } from "dbui/components/ui/button"
import { Search } from "@/components/icons/Search"

const meta: Meta = {
  title: "Compositions/Controls Bar",
  parameters: { layout: "padded" },
}

export default meta

const surface = (children: React.ReactNode) => (
  <div className="w-[1100px] overflow-hidden rounded-lg border border-border bg-background">
    {children}
  </div>
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

export const FiltersOnly: StoryObj = {
  render: () =>
    surface(
      <ControlsBar>
        <ControlsBarFilters>
          <SearchInput />
          <FilterSelect placeholder="Status" options={["Active", "Paused", "Failed"]} />
        </ControlsBarFilters>
      </ControlsBar>,
    ),
}

export const FiltersAndActions: StoryObj = {
  render: () =>
    surface(
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
      </ControlsBar>,
    ),
}

export const ManyFilters: StoryObj = {
  name: "Many filters (Query History)",
  render: () =>
    surface(
      <ControlsBar>
        <ControlsBarFilters>
          <FilterSelect placeholder="User: Me" options={["Me", "All users", "Specific user"]} />
          <FilterSelect placeholder="Last 7 days" options={["Last 24h", "Last 7 days", "Last 30 days"]} />
          <FilterSelect placeholder="Compute" options={["All", "Serverless", "Classic"]} />
          <FilterSelect placeholder="Duration" options={["Any", "< 1 min", "1 \u2013 10 min", "> 10 min"]} />
          <FilterSelect placeholder="Status" options={["Any", "Running", "Finished", "Failed", "Canceled"]} />
          <FilterSelect placeholder="Statement" options={["All", "SELECT", "INSERT", "UPDATE"]} />
          <FilterSelect placeholder="Source" options={["All", "Notebook", "SQL editor", "API"]} />
          <Input placeholder="Statement ID" className="w-[160px]" />
        </ControlsBarFilters>
      </ControlsBar>,
    ),
}

export const WithToggle: StoryObj = {
  name: "With Toggle",
  render: () =>
    surface(
      <ControlsBar>
        <ControlsBarFilters>
          <SearchInput />
          <Toggle variant="filter" defaultPressed>
            Only my SQL warehouses
          </Toggle>
          <FilterSelect placeholder="Created by" options={["Me", "Anyone"]} />
          <FilterSelect placeholder="Size" options={["Any", "Small", "Medium", "Large"]} />
        </ControlsBarFilters>
        <ControlsBarActions>
          <Button>Create compute</Button>
        </ControlsBarActions>
      </ControlsBar>,
    ),
}
