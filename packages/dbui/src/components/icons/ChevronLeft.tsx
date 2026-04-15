import { forwardRef } from "react"

/** use:component back | previous, navigate left */
const ChevronLeft = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M7.08341 8L10 10.9473L8.9583 12L5 8L8.9583 4L10 5.05268L7.08341 8Z" fill="currentColor"/>
</svg>
  )
)
ChevronLeft.displayName = "ChevronLeft"
export { ChevronLeft }
