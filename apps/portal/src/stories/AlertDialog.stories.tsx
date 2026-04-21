import type { Meta, StoryObj } from "@storybook/react"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "dbui/components/ui/alert-dialog"
import { Button } from "dbui/components/ui/button"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/alert-dialog?raw"
import { ProductionMap } from "./components/ProductionMap"

const meta: Meta = {
  title: "Overlays/AlertDialog",
  parameters: { layout: "padded" },
}

export default meta

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>AlertDialog</h2>

      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="destructive">Delete Workspace</Button>} />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the workspace and all associated resources. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


      <ComponentMeta source={componentSource} componentKey="alert-dialog" />

      <ProductionMap componentKey="alert-dialog" />
    </div>
  ),
}
