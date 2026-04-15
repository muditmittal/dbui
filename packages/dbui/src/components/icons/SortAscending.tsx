import { forwardRef } from "react"

/** use:action sort ascending | A to Z, low to high, sort up */
const SortAscending = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.9697 1.46966L11.5 0.939331L12.0303 1.46966L15.5303 4.96966L14.4697 6.03032L12.25 3.81065V9.99999H10.75V3.81065L8.53033 6.03032L7.46967 4.96966L10.9697 1.46966ZM1 4.49999H5V5.99999H1V4.49999ZM1 12.5H11V14H1V12.5ZM8 8.49999H1V9.99999H8V8.49999Z" fill="currentColor"/>
    </svg>
  )
)
SortAscending.displayName = "SortAscending"
export { SortAscending }
