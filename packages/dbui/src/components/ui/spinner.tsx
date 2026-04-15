import { cn } from "../../lib/utils"
import { Loader2Icon } from "lucide-react"

/**
 * @standard Spinner
 * @guideline Use for indeterminate loading that takes more than 1 second
 * @guideline Default to page-center placement
 * @constraint For initial page loads, prefer Skeleton over Spinner
 * @constraint Always set aria-label for screen readers
 * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=1060-3970
 */

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props} />
  )
}

export { Spinner }
