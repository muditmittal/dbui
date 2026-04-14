import type { Meta, StoryObj } from "@storybook/react"
import { Alert, AlertIcon, AlertContent, AlertTitle, AlertDescription, AlertAction, AlertClose } from "dbui/components/ui/alert"
import { Button } from "dbui/components/ui/button"
import { DangerFill } from "@/components/icons/DangerFill"
import { WarningFill } from "@/components/icons/WarningFill"
import { InfoFill } from "@/components/icons/InfoFill"
import { CheckCircleFill } from "@/components/icons/CheckCircleFill"

const variantIcons: Record<string, React.ReactNode> = {
  danger: <DangerFill />,
  warning: <WarningFill />,
  info: <InfoFill />,
  success: <CheckCircleFill />,
}

const meta: Meta = {
  title: "Overlays/Alert",
  parameters: {
    docs: {
      description: {
        component: [
          "### Constraints",
          "- **Always include AlertIcon** with the variant-appropriate icon: danger=DangerFill, warning=WarningFill, info=InfoFill, success=CheckCircleFill.",
          "- **Always include AlertTitle.** Description is supplementary.",
          "- **Inline layout:** Action button uses `size=\"sm\"`. **Stacked layout:** Action uses `size=\"md\"`.",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["danger", "warning", "info", "success"],
    },
    layout: {
      control: "radio",
      options: ["inline", "stacked"],
      name: "Layout (Figma)",
    },
    removable: { control: "boolean", name: "Removable (Close button)" },
    showAction: { control: "boolean", name: "Show Action button" },
    title: { control: "text" },
    description: { control: "text" },
    actionLabel: { control: "text", if: { arg: "showAction" } },
  },
  args: {
    variant: "danger",
    layout: "inline",
    removable: true,
    showAction: true,
    title: "Alert title",
    description: "Description to clarify what the user needs to do.",
    actionLabel: "Label",
  },
}

export default meta

export const Playground: StoryObj = {
  render: (args: any) => {
    const isStacked = args.layout === "stacked"
    return (
      <div className="w-[480px]">
        <Alert variant={args.variant}>
          <AlertIcon>{variantIcons[args.variant]}</AlertIcon>
          <AlertContent>
            <AlertTitle>{args.title}</AlertTitle>
            <AlertDescription>{args.description}</AlertDescription>
            {isStacked && args.showAction && (
              <AlertAction>
                <Button variant="outline" size="md">{args.actionLabel}</Button>
              </AlertAction>
            )}
          </AlertContent>
          {!isStacked && args.showAction && (
            <AlertAction>
              <Button variant="outline" size="sm">{args.actionLabel}</Button>
            </AlertAction>
          )}
          {args.removable && <AlertClose />}
        </Alert>
      </div>
    )
  },
}

export const AllVariantsInline: StoryObj = {
  name: "All Variants — Inline",
  render: () => (
    <div className="flex flex-col gap-3 w-[480px]">
      {(["danger", "warning", "info", "success"] as const).map((variant) => (
        <Alert key={variant} variant={variant}>
          <AlertIcon>{variantIcons[variant]}</AlertIcon>
          <AlertContent>
            <AlertTitle>Alert title</AlertTitle>
            <AlertDescription>Description to clarify what the user needs to do.</AlertDescription>
          </AlertContent>
          <AlertAction>
            <Button variant="outline" size="sm">Label</Button>
          </AlertAction>
          <AlertClose />
        </Alert>
      ))}
    </div>
  ),
}

export const AllVariantsStacked: StoryObj = {
  name: "All Variants — Stacked",
  render: () => (
    <div className="flex flex-col gap-3 w-[480px]">
      {(["danger", "warning", "info", "success"] as const).map((variant) => (
        <Alert key={variant} variant={variant}>
          <AlertIcon>{variantIcons[variant]}</AlertIcon>
          <AlertContent>
            <AlertTitle>Alert title</AlertTitle>
            <AlertDescription>Description to clarify what the user needs to do.</AlertDescription>
            <AlertAction>
              <Button variant="outline" size="md">Label</Button>
            </AlertAction>
          </AlertContent>
          <AlertClose />
        </Alert>
      ))}
    </div>
  ),
}

export const WithoutClose: StoryObj = {
  name: "Without Close (Removable=false)",
  render: () => (
    <div className="w-[480px]">
      <Alert variant="info">
        <AlertIcon><InfoFill /></AlertIcon>
        <AlertContent>
          <AlertTitle>Persistent alert</AlertTitle>
          <AlertDescription>This alert cannot be dismissed by the user.</AlertDescription>
        </AlertContent>
      </Alert>
    </div>
  ),
}

export const WithoutAction: StoryObj = {
  name: "Without Action button",
  render: () => (
    <div className="w-[480px]">
      <Alert variant="warning">
        <AlertIcon><WarningFill /></AlertIcon>
        <AlertContent>
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>Your workspace is approaching its storage limit.</AlertDescription>
        </AlertContent>
        <AlertClose />
      </Alert>
    </div>
  ),
}
