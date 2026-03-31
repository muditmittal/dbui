import { forwardRef } from "react"

/** use:action jump to end | last page, skip right */
const ChevronDoubleRight = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.95389 5.05605L10.8908 8.00133L7.95389 10.9466L9.01607 12.0058L12.481 8.53091L13.0091 8.00133L12.481 7.47176L9.01606 3.9969L7.95389 5.05605ZM3.99393 5.05605L6.93083 8.00133L3.99393 10.9466L5.05611 12.0058L8.52107 8.53091L9.04913 8.00133L8.52107 7.47176L5.0561 3.9969L3.99393 5.05605Z" fill="currentColor"/>
</svg>
  )
)
ChevronDoubleRight.displayName = "ChevronDoubleRight"
export { ChevronDoubleRight }
