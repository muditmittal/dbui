import type { Meta, StoryObj } from "@storybook/react"
import { Shell } from "dbui-shell/shell"
import { Button } from "dbui/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "dbui/components/ui/tabs"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "dbui/components/ui/breadcrumb"
import { Star } from "@/components/icons/Star"
import { Copy } from "@/components/icons/Copy"
import { Overflow } from "@/components/icons/Overflow"

const meta: Meta = {
  title: "Compositions/Platform Shell",
  parameters: { layout: "fullscreen" },
}

export default meta

export const FullShell: StoryObj = {
  render: () => (
    <Shell defaultActive="catalog">
      {/* Breadcrumb */}
      <div className="px-6 pt-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="#">main</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="#">default</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>my_catalog</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Page title + actions */}
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="text-[22px] font-semibold leading-[28px] text-foreground" style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif" }}>my_catalog</span>
          <Button variant="ghost" size="icon-sm" aria-label="Copy"><Copy /></Button>
          <Button variant="ghost" size="icon-sm" aria-label="Favorite"><Star /></Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block size-2.5 rounded-full bg-success" />
          <Button variant="ghost" size="icon-md" aria-label="More"><Overflow /></Button>
          <Button variant="outline">Share</Button>
          <Button>Create</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6">
        <Tabs defaultValue="schemas">
          <TabsList>
            <TabsTrigger value="schemas">Schemas</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="px-6 py-6" />
    </Shell>
  ),
}
