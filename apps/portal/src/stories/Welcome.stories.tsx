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
  title: "Home",
  parameters: { layout: "centered" },
}

export default meta

/** Live Platform Shell rendered at 0.8 scale inside browser chrome */
function LivePreview() {
  return (
    <div style={{
      border: "1px solid #CBCBCB",
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: "0 8px 40px rgba(0,0,0,0.08), 0 2px 16px rgba(0,0,0,0.04)",
      marginBottom: 40,
    }}>
      {/* Browser toolbar */}
      <div style={{
        background: "#F7F7F7",
        borderBottom: "1px solid #EBEBEB",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}>
        <div style={{ display: "flex", gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#EC6A5E", display: "block" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#F4BF4F", display: "block" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#61C554", display: "block" }} />
        </div>
        <div style={{
          flex: 1,
          background: "#fff",
          border: "1px solid #EBEBEB",
          borderRadius: 6,
          padding: "5px 12px",
          fontSize: 12,
          color: "#8C8C8C",
          fontFamily: "'SF Mono', ui-monospace, monospace",
        }}>
          databricks.com
        </div>
      </div>

      {/* Scaled-down Platform Shell — 1440×780 at 0.58 = 835×452 */}
      <div style={{ width: 835, height: 452, overflow: "hidden" }}>
      <div style={{
        width: 1440,
        height: 780,
        transform: "scale(0.58)",
        transformOrigin: "top left",
      }}>
        <div className="flex h-full flex-col overflow-hidden bg-muted" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>
          {/* Platform Header */}
          <header className="flex h-12 shrink-0 items-center gap-4 px-3 bg-muted">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon-md" aria-label="Toggle sidebar"><SidebarOpen /></Button>
              <span className="text-[13px] text-foreground">Microsoft Azure</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/databricks-logo.svg" alt="Databricks" height={32} className="ml-2" />
            </div>
            <div className="flex-1 max-w-[560px] mx-auto">
              <div className="flex items-center gap-2 rounded border border-[#C0CDD8] bg-background px-3 py-1 text-[13px] text-muted-foreground">
                <Search className="size-4" />
                <span>Search data, notebooks, recents, and more...</span>
                <span className="ml-auto text-[12px] text-muted-foreground">⌘ + P</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[13px] text-foreground mr-1">unity-catalog-us-east-1</span>
              <Button variant="ghost" size="icon-md" aria-label="Sparkle"><Star /></Button>
              <Button variant="ghost" size="icon-md" aria-label="Apps"><App /></Button>
              <div className="flex size-8 items-center justify-center rounded-full bg-primary text-[13px] font-semibold text-primary-foreground">M</div>
            </div>
          </header>

          {/* Page area */}
          <div className="flex flex-1 min-h-0 px-2 pb-2 gap-2">
            <WorkspaceNav />
            <main className="flex-1 min-w-0 min-h-0 overflow-y-auto bg-background border border-border rounded-lg">
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
              <div className="px-6">
                <Tabs defaultValue="tab1">
                  <TabsList>
                    <TabsTrigger value="tab1">Schemas</TabsTrigger>
                    <TabsTrigger value="tab2">Permissions</TabsTrigger>
                    <TabsTrigger value="tab3">Details</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="px-6 py-6" />
            </main>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export const Default: StoryObj = {
  render: () => (
    <div style={{
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
      maxWidth: 860,
      margin: "0 auto",
      padding: "48px 24px",
      color: "#161616",
    }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{
          fontFamily: "'SF Pro Display', -apple-system, sans-serif",
          fontSize: 32, fontWeight: 600, lineHeight: "40px",
          margin: "0 0 8px 0",
        }}>
          DBUI Design System
        </h1>
        <p style={{ fontSize: 15, lineHeight: "24px", color: "#6F6F6F", margin: 0 }}>
          Databricks component library built on shadcn/ui, reskinned with DuBois design tokens.
          Every component here matches its Figma counterpart 1:1.
        </p>
      </div>

      {/* Live Platform Shell preview */}
      <LivePreview />

      {/* Install */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 18, fontWeight: 600, margin: "0 0 16px 0" }}>
          Getting Started
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { label: "1. Install the package", code: 'yarn add dbui', note: 'Or add "dbui": "workspace:*" to your package.json in the monorepo.' },
            { label: "2. Import global styles", code: '@import "dbui/tokens/globals.css";', note: "Add this to your root CSS file. Includes all color, radius, spacing, and shadow tokens." },
            { label: "3. Use components", code: 'import { Button } from "dbui/components/ui/button"\nimport { Input } from "dbui/components/ui/input"\nimport { Dialog } from "dbui/components/ui/dialog"', note: "All components are tree-shakeable. Import only what you need." },
          ].map((step) => (
            <div key={step.label} style={{ border: "1px solid #EBEBEB", borderRadius: 8, padding: "16px 20px" }}>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, color: "#8C8C8C", marginBottom: 8 }}>{step.label}</div>
              <code style={{ display: "block", fontFamily: "'SF Mono', ui-monospace, monospace", fontSize: 13, color: "#161616", background: "#F7F7F7", padding: "10px 14px", borderRadius: 4, lineHeight: "20px", whiteSpace: "pre" }}>{step.code}</code>
              <div style={{ fontSize: 12, color: "#8C8C8C", marginTop: 8 }}>{step.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 40 }}>
        {[
          { number: "46", label: "Components" },
          { number: "451", label: "Icons" },
          { number: "162", label: "Tokens" },
          { number: "8", label: "Text Styles" },
        ].map((stat) => (
          <div key={stat.label} style={{ background: "#F7F7F7", borderRadius: 8, padding: 16 }}>
            <div style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 28, fontWeight: 600, color: "#2272B4", lineHeight: 1 }}>{stat.number}</div>
            <div style={{ fontSize: 12, color: "#6F6F6F", marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Sections */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
        {[
          { title: "Actions", desc: "Buttons, icon buttons, split buttons, toggles, and segment controls.", list: "Button · IconButton · SplitButton · Toggle · SegmentControl" },
          { title: "Controls", desc: "Form inputs, selects, comboboxes, checkboxes, radios, switches, and sliders.", list: "Input · Select · Combobox · Checkbox · Radio · Switch · Slider" },
          { title: "Content", desc: "Data display components: tables, tags, badges, avatars, status indicators.", list: "Table · Tag · Badge · Avatar · Status · Card · Tabs" },
          { title: "Overlays", desc: "Popovers, dialogs, drawers, dropdown menus, tooltips, and toasts.", list: "Dialog · DropdownMenu · Tooltip · Popover · Drawer · Toast" },
          { title: "Compositions", desc: "Full layout patterns: navigation, page headers, platform shell.", list: "Navbar · PageHeader · PlatformShell" },
          { title: "Foundations", desc: "Design tokens (colors, radius, spacing, shadows) and the full icon set.", list: "Tokens · Icons (451) · Typography" },
        ].map((section) => (
          <div key={section.title} style={{ border: "1px solid #EBEBEB", borderRadius: 8, padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 6px 0" }}>{section.title}</h3>
            <p style={{ fontSize: 13, lineHeight: "20px", color: "#6F6F6F", margin: 0 }}>{section.desc}</p>
            <div style={{ fontSize: 12, color: "#8C8C8C", marginTop: 8 }}>{section.list}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #EBEBEB", paddingTop: 24, fontSize: 12, color: "#8C8C8C", display: "flex", gap: 24 }}>
        <span>DBUI v0.1.0</span>
        <span>13px / 20px base · SF Pro Text</span>
        <a href="https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv" target="_blank" rel="noopener" style={{ color: "#2272B4", textDecoration: "none" }}>Figma Source ↗</a>
      </div>
    </div>
  ),
}
