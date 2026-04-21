import type { Meta, StoryObj } from "@storybook/react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuItemIcon,
  DropdownMenuItemDescription,
  DropdownMenuItemBadge,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "dbui/components/ui/dropdown-menu"
import { Button } from "dbui/components/ui/button"
import { Pencil } from "@/components/icons/Pencil"
import { Copy } from "@/components/icons/Copy"
import { Trash } from "@/components/icons/Trash"
import { Share } from "@/components/icons/Share"
import { Download } from "@/components/icons/Download"
import { Plus } from "@/components/icons/Plus"
import { Gear } from "@/components/icons/Gear"
import { Table } from "@/components/icons/Table"
import { Notebook } from "@/components/icons/Notebook"
import { Dashboard } from "@/components/icons/Dashboard"
import { Pipeline } from "@/components/icons/Pipeline"
import { Query } from "@/components/icons/Query"
import { Folder } from "@/components/icons/Folder"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/dropdown-menu?raw"
import { ProductionMap } from "./components/ProductionMap"

const meta: Meta = {
  title: "Controls/DropdownMenu",
  parameters: { layout: "padded" },
}

export default meta

const sectionLabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: 0.5,
  color: "#8C8C8C",
  marginBottom: 8,
}

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Dropdown Menu</h2>

      <div style={{ display: "flex", gap: 48, flexWrap: "wrap", alignItems: "flex-start" }}>

        {/* 1. Simple list */}
        <div>
          <div style={sectionLabel}>Simple</div>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline">Options</Button>} />
            <DropdownMenuContent align="start" className="min-w-[200px]">
              <DropdownMenuItem>Option 1</DropdownMenuItem>
              <DropdownMenuItem>Option 2</DropdownMenuItem>
              <DropdownMenuItem>Option 3</DropdownMenuItem>
              <DropdownMenuItem>Option 4</DropdownMenuItem>
              <DropdownMenuItem>Option 5</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* 2. Rich — icons, shortcuts, submenu, badge, destructive */}
        <div>
          <div style={sectionLabel}>Rich Actions</div>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline">Actions</Button>} />
            <DropdownMenuContent align="start" className="min-w-[220px]">
              <DropdownMenuItem>
                <DropdownMenuItemIcon><Pencil /></DropdownMenuItemIcon>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DropdownMenuItemIcon><Copy /></DropdownMenuItemIcon>
                Duplicate
                <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DropdownMenuItemIcon><Share /></DropdownMenuItemIcon>
                Share
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DropdownMenuItemIcon><Download /></DropdownMenuItemIcon>
                Export
                <DropdownMenuItemBadge>+3</DropdownMenuItemBadge>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <DropdownMenuItemIcon><Folder /></DropdownMenuItemIcon>
                  Move to
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Workspace</DropdownMenuItem>
                  <DropdownMenuItem>Shared</DropdownMenuItem>
                  <DropdownMenuItem>Archive</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>
                <DropdownMenuItemIcon><Gear /></DropdownMenuItemIcon>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <DropdownMenuItemIcon><Trash /></DropdownMenuItemIcon>
                Delete
                <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* 3. Checkbox multi-select */}
        <div>
          <div style={sectionLabel}>Checkbox Select</div>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline">Filter Assets</Button>} />
            <DropdownMenuContent align="start" className="min-w-[220px]">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Asset Type</DropdownMenuLabel>
                <DropdownMenuCheckboxItem defaultChecked>Tables</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Notebooks</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem defaultChecked>Dashboards</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Pipelines</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Queries</DropdownMenuCheckboxItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* 4. Radio select */}
        <div>
          <div style={sectionLabel}>Radio Select</div>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline">Sort by</Button>} />
            <DropdownMenuContent align="start" className="min-w-[220px]">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Sort Order</DropdownMenuLabel>
                <DropdownMenuRadioGroup defaultValue="modified">
                  <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="modified">Last Modified</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="created">Date Created</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="size">Size</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* 5. Grouped with descriptions */}
        <div>
          <div style={sectionLabel}>Create New</div>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button><Plus /> New</Button>} />
            <DropdownMenuContent align="start" className="min-w-[220px]">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Workspace</DropdownMenuLabel>
                <DropdownMenuItem>
                  <DropdownMenuItemIcon><Notebook /></DropdownMenuItemIcon>
                  <div>
                    Notebook
                    <DropdownMenuItemDescription>Create a new notebook</DropdownMenuItemDescription>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DropdownMenuItemIcon><Query /></DropdownMenuItemIcon>
                  <div>
                    Query
                    <DropdownMenuItemDescription>Write SQL queries</DropdownMenuItemDescription>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DropdownMenuItemIcon><Dashboard /></DropdownMenuItemIcon>
                  <div>
                    Dashboard
                    <DropdownMenuItemDescription>Visualize your data</DropdownMenuItemDescription>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel>Data Engineering</DropdownMenuLabel>
                <DropdownMenuItem>
                  <DropdownMenuItemIcon><Pipeline /></DropdownMenuItemIcon>
                  <div>
                    Pipeline
                    <DropdownMenuItemDescription>Build data pipelines</DropdownMenuItemDescription>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DropdownMenuItemIcon><Table /></DropdownMenuItemIcon>
                  <div>
                    Table
                    <DropdownMenuItemDescription>Create a managed table</DropdownMenuItemDescription>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </div>


      <ComponentMeta source={componentSource} />

      <ProductionMap componentKey="dropdown-menu" />
    </div>
  ),
}
