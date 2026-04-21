import type { Meta, StoryObj } from "@storybook/react"
import { PageHeader, PageHeaderTitleBar, PageHeaderBack, PageHeaderTitle, PageHeaderActions } from "dbui/components/ui/page-header"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "dbui/components/ui/breadcrumb"
import { Tabs, TabsList, TabsTrigger } from "dbui/components/ui/tabs"
import { Button } from "dbui/components/ui/button"
import { Notebook } from "@/components/icons/Notebook"
import { Copy } from "@/components/icons/Copy"
import { Star } from "@/components/icons/Star"

const meta: Meta = {
  title: "Compositions/Page Header",
  parameters: { layout: "padded" },
}

export default meta

export const Default: StoryObj = {
  render: () => (
    <div className="w-[1000px] border border-border rounded-lg bg-background">
      <PageHeader>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink>Catalog</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink>main</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink>default</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>customers_table</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <PageHeaderTitleBar>
          <PageHeaderTitle>
            <span className="flex shrink-0 items-center rounded-sm bg-muted p-2"><Notebook className="size-4" /></span>
            <h1 className="text-[22px] leading-[28px] font-semibold">Page Title</h1>
            <Button variant="ghost" size="icon-sm"><Copy /></Button>
            <Button variant="ghost" size="icon-sm"><Star /></Button>
          </PageHeaderTitle>
          <PageHeaderActions>
            <Button variant="outline">Label</Button>
            <Button>Label</Button>
          </PageHeaderActions>
        </PageHeaderTitleBar>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="lineage">Lineage</TabsTrigger>
          </TabsList>
        </Tabs>
      </PageHeader>
    </div>
  ),
}

export const Simple: StoryObj = {
  render: () => (
    <div className="w-[800px] border border-border rounded-lg bg-background">
      <PageHeader>
        <PageHeaderTitleBar>
          <PageHeaderTitle>
            <PageHeaderBack />
            <h1 className="text-[22px] leading-[28px] font-semibold">Settings</h1>
          </PageHeaderTitle>
          <PageHeaderActions>
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </PageHeaderActions>
        </PageHeaderTitleBar>
      </PageHeader>
    </div>
  ),
}
