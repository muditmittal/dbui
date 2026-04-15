import type { Meta, StoryObj } from "@storybook/react"
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "dbui/components/ui/alert-dialog"
import { ComponentMeta } from "./components/ComponentMeta"
import manifest from "../../../../specs/components/alert-dialog.manifest.json"

const meta: Meta = {
  title: "Overlays/AlertDialog",
  parameters: { layout: "padded" },
}

export default meta

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>AlertDialog</h2>

      {/* Static structure preview — no trigger needed */}
      <div className="w-[440px] rounded-lg border border-border bg-background p-6 shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the workspace and all associated resources. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </div>

      <ComponentMeta manifest={manifest} />
    </div>
  ),
}
