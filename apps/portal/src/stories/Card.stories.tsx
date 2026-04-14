import type { Meta, StoryObj } from "@storybook/react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "dbui/components/ui/card"
import { Button } from "dbui/components/ui/button"

const meta: Meta = {
  title: "Content/Card",
  parameters: { layout: "padded" },
  argTypes: {
    type: { control: "select", options: ["post", "preview", "source", "result"], name: "Type (Figma)" },
    size: { control: "radio", options: ["sm", "default", "lg"] },
  },
  args: {
    type: "post",
    size: "default",
  },
}

export default meta

export const Playground: StoryObj = {
  render: (args: any) => (
    <Card className="w-[350px]" type={args.type} size={args.size}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description with supporting text.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-[13px]">Card content goes here.</p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  ),
}

export const AllTypes: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(["post", "preview", "source", "result"] as const).map((type) => (
        <Card key={type} className="w-[250px]" type={type}>
          <CardHeader>
            <CardTitle className="capitalize">{type}</CardTitle>
            <CardDescription>Type: {type}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-[13px] text-muted-foreground">Card content</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}
