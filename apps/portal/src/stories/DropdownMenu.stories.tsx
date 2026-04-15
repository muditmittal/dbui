import type { Meta, StoryObj } from "@storybook/react"
import { Pencil } from "@/components/icons/Pencil"
import { Copy } from "@/components/icons/Copy"
import { Trash } from "@/components/icons/Trash"
import { Share } from "@/components/icons/Share"
import { ComponentMeta } from "./components/ComponentMeta"
import manifest from "../../../../specs/components/dropdown-menu.manifest.json"

const meta: Meta = {
  title: "Controls/DropdownMenu",
  parameters: { layout: "padded" },
}

export default meta

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Dropdown Menu</h2>

      {/* Static open menu showing all item types */}
      <div className="w-[240px] rounded-md bg-popover p-1 shadow-md ring-1 ring-foreground/10">
        {/* Normal item */}
        <div className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-[13px] text-foreground cursor-default">
          Profile
        </div>

        {/* Item with icon */}
        <div className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-[13px] text-foreground cursor-default">
          <span className="text-muted-foreground [&_svg:not([class*='size-'])]:size-4"><Pencil /></span>
          Edit
        </div>

        {/* Item with shortcut */}
        <div className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-[13px] text-foreground cursor-default">
          <span className="text-muted-foreground [&_svg:not([class*='size-'])]:size-4"><Copy /></span>
          Duplicate
          <span className="ml-auto text-[11px] text-muted-foreground tracking-wide">&#x2318;D</span>
        </div>

        {/* Item with icon */}
        <div className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-[13px] text-foreground cursor-default">
          <span className="text-muted-foreground [&_svg:not([class*='size-'])]:size-4"><Share /></span>
          Share
        </div>

        {/* Separator */}
        <div className="my-1 h-px bg-border" />

        {/* Disabled item */}
        <div className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-[13px] text-disabled-foreground cursor-default">
          Archived
        </div>

        {/* Separator */}
        <div className="my-1 h-px bg-border" />

        {/* Destructive item */}
        <div className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-[13px] text-destructive cursor-default">
          <span className="[&_svg:not([class*='size-'])]:size-4"><Trash /></span>
          Delete
          <span className="ml-auto text-[11px] tracking-wide">&#x232B;</span>
        </div>
      </div>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
