import { forwardRef } from "react"

/** use:action sort descending | high to low, Z-A */
const SortHorizontalDescending = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.5 15.5303V5.53033H2V15.5303H3.5ZM11.5 15.5303V11.5303H10V15.5303H11.5ZM7.5 8.53033V15.5303H6V8.53033H7.5ZM14.5303 5.56066L15.0607 5.03033L14.5303 4.5L11.0303 1L9.96967 2.06066L12.1893 4.28033H6V5.78033H12.1893L9.96967 8L11.0303 9.06066L14.5303 5.56066Z" fill="currentColor"/>
    </svg>
  )
)
SortHorizontalDescending.displayName = "SortHorizontalDescending"
export { SortHorizontalDescending }
