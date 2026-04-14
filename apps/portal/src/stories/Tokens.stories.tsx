import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta = {
  title: "Foundations/Tokens",
  parameters: { layout: "padded" },
}

export default meta

const colorTokens = [
  { group: "Surface", tokens: [
    { name: "--background", tw: "bg-background" },
    { name: "--foreground", tw: "text-foreground" },
    { name: "--card", tw: "bg-card" },
    { name: "--popover", tw: "bg-popover" },
    { name: "--secondary", tw: "bg-secondary" },
    { name: "--muted", tw: "bg-muted" },
    { name: "--muted-foreground", tw: "text-muted-foreground" },
    { name: "--accent", tw: "bg-accent" },
    { name: "--accent-foreground", tw: "text-accent-foreground" },
    { name: "--active", tw: "bg-active" },
  ]},
  { group: "Action", tokens: [
    { name: "--primary", tw: "bg-primary" },
    { name: "--primary-foreground", tw: "text-primary-foreground" },
    { name: "--primary-hover", tw: "bg-primary-hover" },
    { name: "--primary-press", tw: "bg-primary-press" },
    { name: "--destructive", tw: "bg-destructive" },
    { name: "--destructive-foreground", tw: "text-destructive-foreground" },
    { name: "--destructive-hover", tw: "bg-destructive-hover" },
    { name: "--destructive-press", tw: "bg-destructive-press" },
    { name: "--warning", tw: "bg-warning" },
    { name: "--success", tw: "bg-success" },
    { name: "--ring", tw: "border-ring" },
  ]},
  { group: "Interactive", tokens: [
    { name: "--hover", tw: "bg-hover" },
    { name: "--press", tw: "bg-press" },
    { name: "--disabled", tw: "bg-disabled" },
    { name: "--disabled-foreground", tw: "text-disabled-foreground" },
  ]},
  { group: "Border", tokens: [
    { name: "--border", tw: "border-border" },
    { name: "--input", tw: "border-input" },
    { name: "--border-accessible", tw: "border-border-accessible" },
  ]},
  { group: "Status Surfaces", tokens: [
    { name: "--surface-info", tw: "bg-surface-info" },
    { name: "--surface-success", tw: "bg-surface-success" },
    { name: "--surface-warning", tw: "bg-surface-warning" },
    { name: "--surface-danger", tw: "bg-surface-danger" },
  ]},
  { group: "Utility", tokens: [
    { name: "--overlay", tw: "bg-overlay" },
    { name: "--code-background", tw: "bg-code-background" },
    { name: "--skeleton", tw: "bg-skeleton" },
  ]},
  { group: "Chart", tokens: [
    { name: "--chart-1", tw: "bg-chart-1" },
    { name: "--chart-2", tw: "bg-chart-2" },
    { name: "--chart-3", tw: "bg-chart-3" },
    { name: "--chart-4", tw: "bg-chart-4" },
    { name: "--chart-5", tw: "bg-chart-5" },
  ]},
]

const radiusTokens = [
  { name: "--radius-sm", value: "4px", tw: "rounded-sm" },
  { name: "--radius-md", value: "8px", tw: "rounded-md" },
  { name: "--radius-lg", value: "12px", tw: "rounded-lg" },
  { name: "--radius-xl", value: "16px", tw: "rounded-xl" },
  { name: "--radius-2xl", value: "24px", tw: "rounded-2xl" },
  { name: "--radius-3xl", value: "999px", tw: "rounded-full" },
]

const spacingTokens = [
  { name: "spacing-0", value: "0px", tw: "gap-0", px: 0 },
  { name: "spacing-xxs", value: "2px", tw: "gap-0.5", px: 2 },
  { name: "spacing-xs", value: "4px", tw: "gap-1", px: 4 },
  { name: "spacing-sm", value: "8px", tw: "gap-2", px: 8 },
  { name: "spacing-mid", value: "12px", tw: "px-3", px: 12 },
  { name: "spacing-md", value: "16px", tw: "gap-4", px: 16 },
  { name: "spacing-lg", value: "24px", tw: "gap-6", px: 24 },
]

const shadowTokens = [
  { name: "shadow-xs", value: "0 1px 0 rgba(0,0,0,0.05)", tw: "shadow-xs" },
  { name: "shadow-sm", value: "0 2px 3px ...", tw: "shadow-sm" },
  { name: "shadow", value: "0 3px 6px ...", tw: "shadow" },
  { name: "shadow-md", value: "0 2px 16px 8%", tw: "shadow-md" },
  { name: "shadow-lg", value: "0 8px 40px 13%", tw: "shadow-lg" },
  { name: "shadow-focus", value: "blue ring 3px", tw: "shadow-focus" },
]

function ColorSwatch({ name, tw }: { name: string; tw: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="size-8 shrink-0 rounded-sm border border-border"
        style={{ backgroundColor: `var(${name})` }}
      />
      <div className="flex flex-col">
        <span className="text-[13px] font-mono">{name}</span>
        <span className="text-[12px] text-muted-foreground">{tw}</span>
      </div>
    </div>
  )
}

export const Colors: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-8 max-w-[700px]">
      {colorTokens.map((group) => (
        <div key={group.group}>
          <h3 className="mb-3 text-[13px] font-semibold text-foreground">{group.group}</h3>
          <div className="grid grid-cols-2 gap-3">
            {group.tokens.map((t) => (
              <ColorSwatch key={t.name} name={t.name} tw={t.tw} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

export const Radius: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      {radiusTokens.map((t) => (
        <div key={t.name} className="flex flex-col items-center gap-2">
          <div
            className="size-16 border-2 border-primary bg-muted"
            style={{ borderRadius: t.value }}
          />
          <span className="text-[12px] font-mono">{t.value}</span>
          <span className="text-[11px] text-muted-foreground">{t.tw}</span>
        </div>
      ))}
    </div>
  ),
}

export const Spacing: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-[400px]">
      {spacingTokens.map((t) => (
        <div key={t.name} className="flex items-center gap-3">
          <div
            className="h-4 shrink-0 rounded-sm bg-primary"
            style={{ width: Math.max(t.px, 2) }}
          />
          <span className="w-[60px] text-[13px] font-mono shrink-0">{t.value}</span>
          <span className="w-[90px] text-[12px] text-muted-foreground shrink-0">{t.name}</span>
          <span className="text-[12px] text-muted-foreground">{t.tw}</span>
        </div>
      ))}
    </div>
  ),
}

export const Shadows: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      {shadowTokens.map((t) => (
        <div key={t.name} className="flex flex-col items-center gap-2">
          <div className={`size-16 rounded-md border border-border bg-background ${t.tw}`} />
          <span className="text-[12px] font-mono">{t.name}</span>
          <span className="text-[11px] text-muted-foreground">{t.tw}</span>
        </div>
      ))}
    </div>
  ),
}

export const Typography: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-[500px]">
      <div className="flex items-baseline gap-4">
        <span className="w-[80px] shrink-0 text-[12px] text-muted-foreground">Title 1</span>
        <span className="text-[32px] leading-[40px] font-semibold">32/40 Semibold</span>
      </div>
      <div className="flex items-baseline gap-4">
        <span className="w-[80px] shrink-0 text-[12px] text-muted-foreground">Title 2</span>
        <span className="text-[22px] leading-[28px] font-semibold">22/28 Semibold</span>
      </div>
      <div className="flex items-baseline gap-4">
        <span className="w-[80px] shrink-0 text-[12px] text-muted-foreground">Title 3</span>
        <span className="text-[18px] leading-[24px] font-semibold">18/24 Semibold</span>
      </div>
      <div className="flex items-baseline gap-4">
        <span className="w-[80px] shrink-0 text-[12px] text-muted-foreground">Title 4</span>
        <span className="text-[13px] leading-[20px] font-semibold">13/20 Semibold</span>
      </div>
      <div className="flex items-baseline gap-4">
        <span className="w-[80px] shrink-0 text-[12px] text-muted-foreground">Bold</span>
        <span className="text-[13px] leading-[20px] font-semibold">13/20 Semibold</span>
      </div>
      <div className="flex items-baseline gap-4">
        <span className="w-[80px] shrink-0 text-[12px] text-muted-foreground">Paragraph</span>
        <span className="text-[13px] leading-[20px] font-normal">13/20 Regular</span>
      </div>
      <div className="flex items-baseline gap-4">
        <span className="w-[80px] shrink-0 text-[12px] text-muted-foreground">Hint</span>
        <span className="text-[12px] leading-[16px] font-normal text-muted-foreground">12/16 Regular</span>
      </div>
      <div className="flex items-baseline gap-4">
        <span className="w-[80px] shrink-0 text-[12px] text-muted-foreground">Code</span>
        <span className="font-mono text-[13px] leading-[20px] font-normal">13/20 Mono Regular</span>
      </div>
    </div>
  ),
}
