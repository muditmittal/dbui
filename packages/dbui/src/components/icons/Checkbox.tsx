import { forwardRef } from "react"

/** use:action checkbox | toggle, boolean, multi-select */
const Checkbox = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path d="M1.75 2C1.33579 2 1 2.33579 1 2.75V14.25C1 14.6642 1.33579 15 1.75 15H13.25C13.6642 15 14 14.6642 14 14.25V9H12.5V13.5H2.5V3.5H10V2H1.75Z" fill="currentColor"/>
<path d="M15.0303 4.03033L13.9697 2.96967L7.5 9.43934L5.53033 7.46967L4.46967 8.53033L7.5 11.5607L15.0303 4.03033Z" fill="currentColor"/>
</svg>
  )
)
Checkbox.displayName = "Checkbox"
export { Checkbox }
