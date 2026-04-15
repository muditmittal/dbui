import { forwardRef } from "react"

/** use:component expand tree | forward, next, more */
const ChevronRight = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M8.91659 8L6 5.05268L7.0417 4L11 8L7.0417 12L6 10.9473L8.91659 8Z" fill="currentColor"/>
</svg>
  )
)
ChevronRight.displayName = "ChevronRight"
export { ChevronRight }
