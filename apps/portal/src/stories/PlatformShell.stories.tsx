import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "dbui/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "dbui/components/ui/tabs"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "dbui/components/ui/breadcrumb"
import { WorkspaceNav } from "./components/WorkspaceNav"
import { SidebarOpen } from "@/components/icons/SidebarOpen"
import { Search } from "@/components/icons/Search"
import { App } from "@/components/icons/App"
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
    <div className="flex h-screen flex-col overflow-hidden bg-muted" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>
      {/* ─── Platform Header ─── */}
      <header className="flex h-12 shrink-0 items-center gap-4 px-3 bg-muted">
        {/* Left: sidebar toggle + cloud badge + databricks logo */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-md" aria-label="Toggle sidebar"><SidebarOpen /></Button>
          <span className="text-[13px] text-foreground">Microsoft Azure</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/databricks-logo.svg" alt="Databricks" height={32} className="ml-2" />
        </div>

        {/* Center: search */}
        <div className="flex-1 max-w-[560px] mx-auto">
          <div className="flex items-center gap-2 rounded border border-[#C0CDD8] bg-background px-3 py-1 text-[13px] text-muted-foreground">
            <Search className="size-4" />
            <span>Search data, notebooks, recents, and more...</span>
            <span className="ml-auto text-[12px] text-muted-foreground">⌘ + P</span>
          </div>
        </div>

        {/* Right: warehouse selector + actions + avatar */}
        <div className="flex items-center gap-1">
          <span className="text-[13px] text-foreground mr-1">unity-catalog-us-east-1</span>
          <Button variant="ghost" size="icon-md" aria-label="Sparkle"><Star /></Button>
          <Button variant="ghost" size="icon-md" aria-label="Apps"><App /></Button>
          <div className="flex size-8 items-center justify-center rounded-full bg-primary text-[13px] font-semibold text-primary-foreground">M</div>
        </div>
      </header>

      {/* ─── Page area: sidebar + content ─── */}
      <div className="flex flex-1 min-h-0 px-2 pb-2 gap-2">

        {/* ─── Sidebar Nav (shared component) ─── */}
        <WorkspaceNav />

        {/* ─── Content surface ─── */}
        <main className="flex-1 min-w-0 min-h-0 overflow-y-auto bg-background border border-border rounded-lg">
          {/* Breadcrumb */}
          <div className="px-6 pt-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="#">label</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="#">label</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>label</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Page title row */}
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-2">
              <span className="text-[22px] font-semibold leading-[28px] text-foreground" style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif" }}>Page Title</span>
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
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">Tab label</TabsTrigger>
                <TabsTrigger value="tab2">Tab label</TabsTrigger>
                <TabsTrigger value="tab3">Tab label</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Content area */}
          <div className="px-6 py-6 text-[13px] text-muted-foreground" />
        </main>
      </div>
    </div>
  ),
}
