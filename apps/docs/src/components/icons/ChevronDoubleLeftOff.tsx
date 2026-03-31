import { forwardRef } from "react"

/** use:action collapse disabled | can't collapse further */
const ChevronDoubleLeftOff = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path d="M2.5 1.5L14.5 13.5L13.5 14.5L6.03027 7.03027L5.09082 7.96973L8.06055 10.9395L7 12L2.96973 7.96973L4.96973 5.96973L1.5 2.5L2.5 1.5Z" fill="currentColor"/>
<path d="M12.0605 5L10.0908 6.96973L9.03027 5.90918L11 3.93945L12.0605 5Z" fill="currentColor"/>
</svg>
  )
)
ChevronDoubleLeftOff.displayName = "ChevronDoubleLeftOff"
export { ChevronDoubleLeftOff }
