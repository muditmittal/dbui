import { forwardRef } from "react"

/** use:object Hardware | Compute | GPU, processor, accelerator */
const Chip = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path d="M10 10H6V6H10V10Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 3H9V1H10.5V3H12.25C12.6642 3 13 3.33579 13 3.75V5.5H15V7H13V9H15V10.5H13V12.25C13 12.6642 12.6642 13 12.25 13H10.5V15H9V13H7V15H5.5V13H3.75C3.33579 13 3 12.6642 3 12.25V10.5H1V9H3V7H1V5.5H3V3.75C3 3.33579 3.33579 3 3.75 3H5.5V1H7V3ZM4.5 11.5H11.5V4.5H4.5V11.5Z" fill="currentColor"/>
</svg>
  )
)
Chip.displayName = "Chip"
export { Chip }
