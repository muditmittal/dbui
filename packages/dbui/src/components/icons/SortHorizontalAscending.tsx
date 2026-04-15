import { forwardRef } from "react"

/** use:action sort ascending | low to high, A-Z */
const SortHorizontalAscending = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M0.939331 5.03033L4.96966 1L6.03032 2.06066L3.81065 4.28033H9.99999V5.78033H3.81065L6.03032 8L4.96966 9.06066L0.939331 5.03033ZM4.49999 15.5303V11.5303H5.99999V15.5303H4.49999ZM12.5 15.5303V5.53033H14V15.5303H12.5ZM8.49999 8.53033V15.5303H9.99999V8.53033H8.49999Z" fill="currentColor"/>
    </svg>
  )
)
SortHorizontalAscending.displayName = "SortHorizontalAscending"
export { SortHorizontalAscending }
