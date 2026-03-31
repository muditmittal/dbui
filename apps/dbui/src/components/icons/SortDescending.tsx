import { forwardRef } from "react"

/** use:action sort descending | Z to A, high to low, sort down */
const SortDescending = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1 3.5H11V2H1V3.5ZM1 11.5H5V10H1V11.5ZM8 7.5H1V6H8V7.5ZM10.9697 14.5303L11.5 15.0607L12.0303 14.5303L15.5303 11.0303L14.4697 9.96967L12.25 12.1893V6H10.75V12.1893L8.53033 9.96967L7.46967 11.0303L10.9697 14.5303Z" fill="currentColor"/>
    </svg>
  )
)
SortDescending.displayName = "SortDescending"
export { SortDescending }
