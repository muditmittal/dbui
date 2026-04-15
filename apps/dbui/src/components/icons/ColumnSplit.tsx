import { forwardRef } from "react"

/** use:action split column | divide, separate columns */
const ColumnSplit = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M1.75 1C1.33579 1 1 1.33579 1 1.75V14.25C1 14.6642 1.33579 15 1.75 15H14.25C14.6642 15 15 14.6642 15 14.25V1.75C15 1.33579 14.6642 1 14.25 1H1.75ZM2.5 13.5V2.5H7.25V13.5H2.5ZM8.75 13.5H13.5V2.5H8.75V13.5Z" fill="currentColor"/>
</svg>
  )
)
ColumnSplit.displayName = "ColumnSplit"
export { ColumnSplit }
