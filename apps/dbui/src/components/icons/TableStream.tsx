import { forwardRef } from "react"

/** use:object Streaming Table | Lakeflow | real-time table, live data */
const TableStream = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.75 1C1.33579 1 1 1.33579 1 1.75V14.25C1 14.6642 1.33579 15 1.75 15H6.5V7H9.5V8H11V7H13.5V8H15V1.75C15 1.33579 14.6642 1 14.25 1H1.75ZM5 7V13.5H2.5V7H5ZM13.5 5.5V2.5H2.5V5.5H13.5Z" fill="currentColor"/>
    </svg>
  )
)
TableStream.displayName = "TableStream"
export { TableStream }
