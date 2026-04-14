import type { Meta, StoryObj } from "@storybook/react"
import { useState, useEffect, useMemo } from "react"
import { iconClassifications } from "../../../../packages/dbui/src/components/icons/classifications"

const meta: Meta = {
  title: "Foundations/Icons",
  parameters: { layout: "padded" },
}

export default meta

const iconContext = require.context(
  "../../../../packages/dbui/src/components/icons",
  false,
  /^\.\/(?!.*figma|.*classifications).*\.tsx$/
)

const iconNames = iconContext
  .keys()
  .map((key: string) => key.replace("./", "").replace(".tsx", ""))
  .sort()

const categoryLabels: Record<string, string> = {
  action: "Actions",
  object: "Objects",
  indicator: "Indicators",
  component: "Components",
}

const categoryOrder = ["action", "object", "indicator", "component"] as const

function IconGrid() {
  const [search, setSearch] = useState("")
  const [icons, setIcons] = useState<Record<string, React.ComponentType<any>>>({})

  useEffect(() => {
    const loaded: Record<string, React.ComponentType<any>> = {}
    for (const key of iconContext.keys()) {
      const name = key.replace("./", "").replace(".tsx", "")
      const mod = iconContext(key)
      const Component = mod[name] || mod.default
      if (Component) loaded[name] = Component
    }
    setIcons(loaded)
  }, [])

  const grouped = useMemo(() => {
    const filtered = search
      ? iconNames.filter((name: string) => name.toLowerCase().includes(search.toLowerCase()))
      : iconNames

    const groups: Record<string, string[]> = {
      action: [],
      object: [],
      indicator: [],
      component: [],
    }

    for (const name of filtered) {
      const cat = iconClassifications[name] || "object"
      groups[cat].push(name)
    }

    return groups
  }, [search])

  const totalFiltered = Object.values(grouped).reduce((sum, arr) => sum + arr.length, 0)

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <input
          type="text"
          placeholder="Search icons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-8 w-[300px] rounded-sm border border-input bg-background px-3 text-[13px] leading-[20px] shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring"
        />
        <span className="text-[12px] text-muted-foreground">
          {totalFiltered} of {iconNames.length} icons
        </span>
      </div>

      <div className="flex flex-col gap-6">
        {categoryOrder.map((cat) => {
          const items = grouped[cat]
          if (items.length === 0) return null
          return (
            <div key={cat}>
              <div className="mb-2 flex items-center gap-2">
                <h3 className="text-[13px] font-semibold text-foreground">
                  {categoryLabels[cat]}
                </h3>
                <span className="text-[12px] text-muted-foreground">
                  {items.length}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-x-4 gap-y-0.5">
                {items.map((name: string) => {
                  const Icon = icons[name]
                  return (
                    <div
                      key={name}
                      className="flex items-center gap-2 rounded-sm px-2 py-1 hover:bg-muted"
                      title={name}
                    >
                      <div className="flex size-5 shrink-0 items-center justify-center text-foreground">
                        {Icon ? <Icon className="size-4" /> : <div className="size-4 rounded-sm bg-muted" />}
                      </div>
                      <span className="truncate text-[12px] text-muted-foreground">
                        {name}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const Browser: StoryObj = {
  render: () => <IconGrid />,
}
