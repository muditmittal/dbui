import { cn } from "../../lib/utils"

/**
 * @standard Aspect Ratio
 * @guideline Use to enforce consistent image/video proportions in cards and grids
 * @guideline Default to 16:9 for media content
 * @constraint Don't use for text-only containers
 * @constraint Always set on the wrapper, not the child
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3178-2833
 */

function AspectRatio({
  ratio,
  className,
  ...props
}: React.ComponentProps<"div"> & { ratio: number }) {
  return (
    <div
      data-slot="aspect-ratio"
      style={
        {
          "--ratio": ratio,
        } as React.CSSProperties
      }
      className={cn("relative aspect-(--ratio)", className)}
      {...props}
    />
  )
}

export { AspectRatio }
