import { forwardRef } from "react"

/** use:action columns | fields, table columns */
const Columns = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M1 1.75C1 1.33579 1.33579 1 1.75 1H14.25C14.6642 1 15 1.33579 15 1.75V14.25C15 14.6642 14.6642 15 14.25 15H1.75C1.33579 15 1 14.6642 1 14.25V1.75ZM2.5 13.5V2.5H5V13.5H2.5ZM6.5 13.5H9.5V2.5H6.5V13.5ZM11 2.5V13.5H13.5V2.5H11Z" fill="currentColor"/>
</svg>
  )
)
Columns.displayName = "Columns"
export { Columns }
