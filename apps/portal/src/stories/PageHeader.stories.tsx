import type { Meta, StoryObj } from "@storybook/react"
import {
  PageHeader,
  PageHeaderBack,
  PageHeaderTitle,
  PageHeaderActions,
} from "dbui/components/ui/page-header"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "dbui/components/ui/breadcrumb"
import { Tabs, TabsList, TabsTrigger } from "dbui/components/ui/tabs"
import { Button } from "dbui/components/ui/button"
import { Notebook } from "@/components/icons/Notebook"
import { Copy } from "@/components/icons/Copy"
import { Star } from "@/components/icons/Star"

const meta: Meta = {
  title: "Components/Compositions/Page Header",
  parameters: { layout: "padded" },
}

export default meta

const surface = (children: React.ReactNode) => (
  <div className="w-[1000px] overflow-hidden rounded-lg border border-border-base bg-surface-base">
    {children}
  </div>
)

const PageTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-[22px] leading-[28px] font-semibold">{children}</h1>
)

export const TitleOnly: StoryObj = {
  render: () =>
    surface(
      <PageHeader>
        <PageHeaderTitle>
          <PageTitle>Compute</PageTitle>
        </PageHeaderTitle>
      </PageHeader>,
    ),
}

export const WithActions: StoryObj = {
  render: () =>
    surface(
      <PageHeader>
        <PageHeaderTitle>
          <PageTitle>Agents</PageTitle>
        </PageHeaderTitle>
        <PageHeaderActions>
          <Button variant="outline">Register MCP Server</Button>
          <Button>Create Agent</Button>
        </PageHeaderActions>
      </PageHeader>,
    ),
}

export const WithSiblingTabs: StoryObj = {
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
        <div className="px-4 pb-2">
          <Tabs defaultValue="alerts">
            <TabsList>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
              <TabsTrigger value="legacy">Legacy Alerts</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </>,
    ),
}

export const WithBackButton: StoryObj = {
  render: () =>
    surface(
      <PageHeader>
        <PageHeaderTitle>
          <PageHeaderBack />
          <PageTitle>Settings</PageTitle>
        </PageHeaderTitle>
        <PageHeaderActions>
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </PageHeaderActions>
      </PageHeader>,
    ),
}

export const WithBreadcrumb: StoryObj = {
  render: () =>
    surface(
      <>
        <div className="px-4 pt-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>Catalog</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>main</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>default</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>customers_table</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <PageHeader>
          <PageHeaderTitle>
            <span className="flex shrink-0 items-center rounded-sm bg-surface-subtle p-2">
              <Notebook className="size-4" />
            </span>
            <PageTitle>customers_table</PageTitle>
            <Button variant="ghost" size="icon-sm">
              <Copy />
            </Button>
            <Button variant="ghost" size="icon-sm">
              <Star />
            </Button>
          </PageHeaderTitle>
          <PageHeaderActions>
            <Button variant="outline">Label</Button>
            <Button>Label</Button>
          </PageHeaderActions>
        </PageHeader>
        <div className="px-4 pb-2">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="lineage">Lineage</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </>,
    ),
}
