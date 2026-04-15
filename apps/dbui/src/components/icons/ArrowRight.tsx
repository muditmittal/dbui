import { forwardRef } from "react"

/** use:action expand | forward, next, proceed */
const ArrowRight = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M15.0607 8.03033L8.03034 15.0607L6.96968 14L12.1893 8.78033L1.00001 8.78033L1.00001 7.28033L12.1893 7.28033L6.96968 2.06066L8.03034 1L15.0607 8.03033Z" fill="currentColor"/>
</svg>
  )
)
ArrowRight.displayName = "ArrowRight"
export { ArrowRight }
