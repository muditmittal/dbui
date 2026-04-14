import type { Meta, StoryObj } from "@storybook/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIcon,
  DropdownMenuItemDescription,
  DropdownMenuItemBadge,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSearch,
  DropdownMenuEmpty,
  DropdownMenuLoading,
  DropdownMenuFooter,
  DropdownMenuTrigger,
} from "dbui/components/ui/dropdown-menu"
import { Button } from "dbui/components/ui/button"
import { Pencil } from "@/components/icons/Pencil"
import { Copy } from "@/components/icons/Copy"
import { Trash } from "@/components/icons/Trash"
import { Share } from "@/components/icons/Share"
import { Plus } from "@/components/icons/Plus"

const meta: Meta = {
  title: "Controls/DropdownMenu",
  parameters: {
    docs: {
      description: {
        component: [
          "### Constraints",
          "- **Icon consistency:** If one item in a group has an icon, ALL items in that group must.",
          "- **Destructive items:** Must appear at the bottom, preceded by a DropdownMenuSeparator.",
          "- **Shortcuts:** Use symbols (⌘⇧⌥⌃), not text (Cmd/Shift/Alt/Ctrl).",
        ].join("\n"),
      },
    },
  },
}

export default meta

/**
 * Interactive playground for a single menu item.
 * Toggle icon, description, shortcut, badge — maps to Figma .MenuLabel + .MenuTrailing.
 */
export const MenuItemPlayground: StoryObj = {
  name: "MenuItem Playground (.MenuLabel + .MenuTrailing)",
  argTypes: {
    label: { control: "text" },
    showIcon: { control: "boolean", name: "Show Icon (.MenuLabel)" },
    showDescription: { control: "boolean", name: "Show Description (.MenuLabel)" },
    description: { control: "text", if: { arg: "showDescription" } },
    trailing: {
      control: "select",
      name: "Trailing Type (.MenuTrailing)",
      options: ["None", "Shortcut", "Badge"],
    },
    shortcutText: { control: "text", if: { arg: "trailing", eq: "Shortcut" } },
    badgeCount: { control: "number", if: { arg: "trailing", eq: "Badge" } },
    variant: { control: "select", options: ["default", "destructive"] },
  },
  args: {
    label: "Option",
    showIcon: false,
    showDescription: false,
    description: "Helper text for this option",
    trailing: "None",
    shortcutText: "⌘K",
    badgeCount: 3,
    variant: "default",
  },
  render: (args: any) => (
    <div className="w-[240px] rounded-md bg-popover p-1 shadow-md ring-1 ring-foreground/10">
      <div className={`group/dropdown-menu-item relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1 text-[13px] outline-hidden select-none ${args.variant === "destructive" ? "text-destructive" : ""}`}>
        {args.showIcon && <DropdownMenuItemIcon><Pencil /></DropdownMenuItemIcon>}
        {args.showDescription ? (
          <div>
            <div>{args.label}</div>
            <DropdownMenuItemDescription>{args.description}</DropdownMenuItemDescription>
          </div>
        ) : (
          args.label
        )}
        {args.trailing === "Shortcut" && <DropdownMenuShortcut>{args.shortcutText}</DropdownMenuShortcut>}
        {args.trailing === "Badge" && <DropdownMenuItemBadge>{args.badgeCount}</DropdownMenuItemBadge>}
      </div>
    </div>
  ),
}

export const Default: StoryObj = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="px-2 py-1 text-[12px] font-semibold text-muted-foreground">My Account</div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Delete account</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

/** Showcase all inner component mappings */
export const WithIcons: Story = {
  name: "With Icons & Shortcuts (MenuLabel + MenuTrailing)",
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[220px]">
        <DropdownMenuItem>
          <DropdownMenuItemIcon><Pencil /></DropdownMenuItemIcon>
          Edit
          <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DropdownMenuItemIcon><Copy /></DropdownMenuItemIcon>
          Duplicate
          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <DropdownMenuItemIcon><Share /></DropdownMenuItemIcon>
          Share
          <DropdownMenuItemBadge>3</DropdownMenuItemBadge>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <DropdownMenuItemIcon><Trash /></DropdownMenuItemIcon>
          Delete
          <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const WithDescription: Story = {
  name: "With Description (MenuLabel Content=With Description)",
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Create New</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[280px]">
        <DropdownMenuItem>
          <div>
            <div>Notebook</div>
            <DropdownMenuItemDescription>Create a new Python or SQL notebook</DropdownMenuItemDescription>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div>
            <div>Query</div>
            <DropdownMenuItemDescription>Write and run SQL queries</DropdownMenuItemDescription>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div>
            <div>Dashboard</div>
            <DropdownMenuItemDescription>Build a visualization dashboard</DropdownMenuItemDescription>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const MenuRowTypes: StoryObj = {
  name: "Menu Row Types (Search, Empty, Loading, Footer)",
  render: () => (
    <div className="flex gap-6">
      <div className="w-[220px] rounded-md bg-popover p-1 shadow-md ring-1 ring-foreground/10">
        <DropdownMenuSearch placeholder="Search..." />
        <DropdownMenuEmpty />
      </div>
      <div className="w-[220px] rounded-md bg-popover p-1 shadow-md ring-1 ring-foreground/10">
        <DropdownMenuSearch placeholder="Search..." />
        <DropdownMenuLoading />
      </div>
      <div className="w-[220px] rounded-md bg-popover shadow-md ring-1 ring-foreground/10">
        <div className="p-1">
          <div className="px-2 py-1 text-[12px] font-semibold text-muted-foreground">Items</div>
          <div className="px-2 py-1 text-[13px]">Item 1</div>
          <div className="px-2 py-1 text-[13px]">Item 2</div>
        </div>
        <DropdownMenuFooter>
          <Button variant="outline" size="sm">Cancel</Button>
          <Button size="sm">Apply</Button>
        </DropdownMenuFooter>
      </div>
    </div>
  ),
}
