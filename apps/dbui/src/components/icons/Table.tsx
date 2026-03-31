import { forwardRef } from "react"

/** use:object Table | Unity Catalog | table, data */
const Table = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1 1.75C1 1.33579 1.33579 1 1.75 1H14.25C14.6642 1 15 1.33579 15 1.75V14.25C15 14.6642 14.6642 15 14.25 15H1.75C1.33579 15 1 14.6642 1 14.25V1.75ZM2.5 2.5V5.5H13.5V2.5H2.5ZM2.5 13.5V7H5V13.5H2.5ZM6.5 13.5H9.5V7H6.5V13.5ZM11 7V13.5H13.5V7H11Z" fill="currentColor"/>
    </svg>
  )
)
Table.displayName = "Table"
export { Table }
