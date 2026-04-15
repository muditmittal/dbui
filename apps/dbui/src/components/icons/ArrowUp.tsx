import { forwardRef } from "react"

/** use:action move up | ascend, expand, rise */
const ArrowUp = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M8.03033 1L15.0607 8.03033L14 9.09099L8.78033 3.87132L8.78033 15.0607H7.28033L7.28033 3.87132L2.06066 9.09099L1 8.03033L8.03033 1Z" fill="currentColor"/>
</svg>
  )
)
ArrowUp.displayName = "ArrowUp"
export { ArrowUp }
