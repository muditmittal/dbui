import { forwardRef } from "react"

/** use:action copy | copy, duplicate, replicate */
const Copy = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M1.75 1C1.33579 1 1 1.33579 1 1.75V10.25C1 10.6642 1.33579 11 1.75 11H5V14.25C5 14.6642 5.33579 15 5.75 15H14.25C14.6642 15 15 14.6642 15 14.25V5.75C15 5.33579 14.6642 5 14.25 5H11V1.75C11 1.33579 10.6642 1 10.25 1H1.75ZM9.5 5V2.5H2.5V9.5H5V5.75C5 5.33579 5.33579 5 5.75 5H9.5ZM6.5 13.5V6.5H13.5V13.5H6.5Z" fill="currentColor"/>
</svg>
  )
)
Copy.displayName = "Copy"
export { Copy }
