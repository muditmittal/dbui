import { forwardRef } from "react"

/** use:action sort | unsorted, no sort, default order */
const SortUnsorted = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M11.5 0.939331L10.9697 1.46966L7.46967 4.96966L8.53033 6.03032L10.75 3.81065V5.99999V9.99999L10.75 12.1893L8.53033 9.96966L7.46967 11.0303L10.9697 14.5303L11.5 15.0607L12.0303 14.5303L15.5303 11.0303L14.4697 9.96966L12.25 12.1893L12.25 9.99999V5.99999V3.81065L14.4697 6.03032L15.5303 4.96966L12.0303 1.46966L11.5 0.939331ZM6 3.49999H1V4.99999H6V3.49999ZM6 11.5H1V13H6V11.5ZM1 7.49999H6V8.99999H1V7.49999Z" fill="currentColor"/>
    </svg>
  )
)
SortUnsorted.displayName = "SortUnsorted"
export { SortUnsorted }
