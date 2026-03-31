import { forwardRef } from "react"

/** use:action expand disabled | can't expand further */
const ChevronDoubleRightOff = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path d="M2.5 1.5L14.5 13.5L13.5 14.5L10.0303 11.0303L9.06055 12L8 10.9395L8.96973 9.96973L8.03027 9.03027L5.06055 12L4 10.9395L6.96973 7.96973L1.5 2.5L2.5 1.5Z" fill="currentColor"/>
<path d="M13.0908 7.96973L12.0908 8.96973L8.06055 4.93945L9.06055 3.93945L13.0908 7.96973Z" fill="currentColor"/>
</svg>
  )
)
ChevronDoubleRightOff.displayName = "ChevronDoubleRightOff"
export { ChevronDoubleRightOff }
