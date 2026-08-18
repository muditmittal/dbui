"use client"

import * as React from "react"

import { Image } from "dbui/components/icons/Image"

import { cn } from "../lib/utils"

/**
 * @standard Message Thumbnail
 * @guideline Use for media attached to a turn — an image the reader dropped in, a chart the agent produced
 * @guideline Row them in a flex wrap above the text of the turn they belong to, not below it
 * @guideline Pass `alt` whenever `src` is set. A thumbnail with no alt is an unlabelled attachment, and it is the only thing in the turn a screen reader cannot reach
 * @guideline Leave `src` off for a tile that is still uploading or failed to resolve — the placeholder holds the row's shape either way
 * @constraint Fixed at 40px square. A row of tiles that each size to their own image is a ragged row, and the tile is a handle for opening the thing rather than a preview of it
 * @constraint The image is cropped to fill, never letterboxed. Letterboxing spends the tile on empty bars
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=4839-17686
 */

export interface MessageThumbnailProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  /** The image. Omit for the placeholder tile. */
  src?: string
  /** Required whenever `src` is set. */
  alt?: string
  /** Replaces the placeholder glyph. */
  icon?: React.ReactNode
}

function MessageThumbnail({
  src,
  alt,
  icon,
  className,
  ...props
}: MessageThumbnailProps) {
  return (
    <div
      data-slot="message-thumbnail"
      className={cn(
        "flex size-10 shrink-0 items-center justify-center overflow-hidden shape-container-md bg-surface-subtle text-text-subtle",
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt ?? ""} className="size-full object-cover" />
      ) : (
        (icon ?? <Image />)
      )}
    </div>
  )
}

export { MessageThumbnail }
