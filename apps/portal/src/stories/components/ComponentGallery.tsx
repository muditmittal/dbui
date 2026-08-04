import * as React from "react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "dbui/components/ui/input-group"
import { Badge } from "dbui/components/ui/badge"
import { Search } from "dbui/components/icons/Search"

import { galleryGroups, galleryTotal, type GalleryItem } from "./gallery-data"
import { demos } from "./gallery-demos"

/**
 * A tile is a live component on a neutral surface with its name beneath. The
 * surface is deliberately quiet so the component, not the frame, is what the eye
 * lands on while scanning.
 */
function Tile({ item }: { item: GalleryItem }) {
  const demo = demos[item.name]
  const href = item.storyId ? `?path=/story/${item.storyId}` : undefined

  const body = (
    <>
      <div className="flex h-40 items-center justify-center overflow-hidden rounded-md bg-surface-subtle px-4 transition-colors group-hover:bg-action-default-hover">
        {demo ?? <span className="text-[12px] text-text-subtle">{item.name}</span>}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-[13px] text-text-strong group-hover:underline">{item.name}</span>
        {!item.storyId && (
          <Badge variant="outline" className="text-[12px]">
            no story yet
          </Badge>
        )}
      </div>
      {item.useFor && (
        <p className="mt-0.5 line-clamp-1 text-[12px] text-text-subtle" style={{ margin: 0 }}>
          {item.useFor}
        </p>
      )}
    </>
  )

  if (!href) {
    return <div className="group block cursor-default">{body}</div>
  }

  return (
    <a
      href={href}
      target="_top"
      className="group block no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus-ring"
    >
      {body}
    </a>
  )
}

export function ComponentGallery() {
    const [query, setQuery] = React.useState("")

    const groups = React.useMemo(() => {
      const q = query.trim().toLowerCase()
      if (!q) return galleryGroups
      return galleryGroups
        .map((g) => ({
          ...g,
          items: g.items.filter(
            (i) => i.name.toLowerCase().includes(q) || i.useFor.toLowerCase().includes(q),
          ),
        }))
        .filter((g) => g.items.length)
    }, [query])

    const shown = groups.reduce((n, g) => n + g.items.length, 0)

    return (
      <div className="mx-auto w-full max-w-6xl px-8 py-12">
        <header className="flex flex-col items-center gap-3 text-center">
          <h1
            className="text-[32px] leading-[40px] font-semibold tracking-[-0.02em] text-text-strong"
            style={{ margin: 0, border: "none" }}
          >
            Browse the library
          </h1>
          <p className="max-w-xl text-[16px] leading-[26px] text-text-subtle" style={{ margin: 0 }}>
            {galleryTotal} components, each paired 1:1 with a Figma component and documented with
            the variants, guidelines and constraints agents read.
          </p>
          <div className="mt-2 w-80 text-left">
            <InputGroup>
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Search components"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </InputGroup>
          </div>
        </header>

        {query && (
          <p className="mt-8 text-[13px] text-text-subtle" style={{ margin: "32px 0 0" }}>
            {shown} {shown === 1 ? "component" : "components"} matching “{query}”
          </p>
        )}

        <div className="mt-12 flex flex-col gap-12">
          {groups.map((group) => (
            <section key={group.key} style={{ margin: 0 }}>
              <h2
                className="text-[22px] leading-[28px] font-semibold text-text-strong"
                style={{ margin: 0, border: "none", padding: 0 }}
              >
                {group.label}
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <Tile key={item.name} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {!groups.length && (
          <p className="mt-16 text-center text-[13px] text-text-subtle">
            Nothing matches “{query}”.
          </p>
        )}
      </div>
    )
}
