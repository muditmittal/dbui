import type { Meta, StoryObj } from "@storybook/react"
import { PageHeader, PageHeaderBack, PageHeaderTitle, PageHeaderActions } from "dbui/components/ui/page-header"
import { Button } from "dbui/components/ui/button"
import { Pencil } from "@/components/icons/Pencil"
import { Share } from "@/components/icons/Share"

const meta: Meta = {
  title: "Compositions/PageHeader",
  parameters: { layout: "padded" },
}

export default meta

export const Default: StoryObj = {
  render: () => (
    <div className="w-[800px] border border-border rounded-lg bg-background">
      <PageHeader>
        <PageHeaderBack />
        <PageHeaderTitle>customers_table</PageHeaderTitle>
        <PageHeaderActions>
          <Button variant="ghost" size="icon-md"><Share /></Button>
          <Button variant="ghost" size="icon-md"><Pencil /></Button>
          <Button>Run All</Button>
        </PageHeaderActions>
      </PageHeader>
    </div>
  ),
}

export const Simple: StoryObj = {
  render: () => (
    <div className="w-[800px] border border-border rounded-lg bg-background">
      <PageHeader>
        <PageHeaderTitle>Settings</PageHeaderTitle>
        <PageHeaderActions>
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </PageHeaderActions>
      </PageHeader>
    </div>
  ),
}
