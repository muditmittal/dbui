import { forwardRef } from "react"

/** use:object Embedded credential | IAM | code badge, run as owner */
const BadgeCode = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path d="M5.56065 8.53033L7.53032 10.5L6.46966 11.5607L3.43933 8.53033L6.46966 5.5L7.53032 6.56066L5.56065 8.53033Z" fill="currentColor"/>
<path d="M10.4893 8.53033L8.51965 6.56066L9.58031 5.5L12.6106 8.53033L9.58031 11.5607L8.51965 10.5L10.4893 8.53033Z" fill="currentColor"/>
<path fillRule="evenodd" clipRule="evenodd" d="M8 0C6.64753 0 5.48912 0.825574 4.99932 2H1.75C1.33579 2 1 2.33579 1 2.75V14.25C1 14.6642 1.33579 15 1.75 15H14.25C14.6642 15 15 14.6642 15 14.25V2.75C15 2.33579 14.6642 2 14.25 2H11.0007C10.5109 0.825574 9.35247 0 8 0ZM6.28502 2.8992C6.4471 2.10073 7.15424 1.5 8 1.5C8.84576 1.5 9.5529 2.10073 9.71498 2.8992C9.78594 3.24877 10.0933 3.5 10.45 3.5H13.5V13.5H2.5V3.5H5.55001C5.90671 3.5 6.21406 3.24877 6.28502 2.8992Z" fill="currentColor"/>
</svg>
  )
)
BadgeCode.displayName = "BadgeCode"
export { BadgeCode }
