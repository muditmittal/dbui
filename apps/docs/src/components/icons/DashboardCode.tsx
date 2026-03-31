import { forwardRef } from "react"

/** use:object Code dashboard | AI/BI | programmatic dashboard */
const DashboardCode = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width="17" height="17" viewBox="0 0 17 17" fill="none">
<path d="M10.5303 11.0303L8.56055 13L10.5303 14.9697L9.46973 16.0303L6.43945 13L9.46973 9.96973L10.5303 11.0303Z" fill="currentColor"/>
<path d="M16.0605 13L13.0303 16.0303L11.9697 14.9697L13.9395 13L11.9697 11.0303L13.0303 9.96973L16.0605 13Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.25 1C14.6642 1 15 1.33579 15 1.75V8.5H13.5V7H8.75V8.5H7.25V2.5H2.5V9H7L5.5 10.5H2.5V13.5H5V15H1.75C1.33579 15 1 14.6642 1 14.25V1.75C1 1.33579 1.33579 1 1.75 1H14.25ZM8.75 5.5H13.5V2.5H8.75V5.5Z" fill="currentColor"/>
</svg>
  )
)
DashboardCode.displayName = "DashboardCode"
export { DashboardCode }
