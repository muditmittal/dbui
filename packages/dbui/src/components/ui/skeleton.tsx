import { cn } from "../../lib/utils"

/**
 * @standard Skeleton
 * @guideline Match the skeleton shape to the content it replaces
 * @guideline Use for initial page loads and lazy-loaded sections
 * @constraint Don't show skeleton for more than 3 seconds — switch to Spinner
 * @constraint Don't mix skeleton and real content in the same container
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=3128-1778
 */

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-sm bg-skeleton", className)}
      {...props}
    />
  )
}

export { Skeleton }
