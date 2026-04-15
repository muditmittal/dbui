import { forwardRef } from "react"

/** use:object Metric view | AI/BI | measure, KPI, aggregation */
const TableMeasure = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M1.75 1C1.33579 1 1 1.33579 1 1.75V14.25C1 14.6642 1.33579 15 1.75 15H4V13.5H2.5V7H5V9H6.5V7H9.5V9H11V7H13.5V9H15V1.75C15 1.33579 14.6642 1 14.25 1H1.75ZM13.5 5.5V2.5H2.5V5.5H13.5Z" fill="currentColor"/><path d="M5 11V14.25C5 14.6642 5.33579 15 5.75 15H15.25C15.6642 15 16 14.6642 16 14.25V11H14.5V13.5H13.625V12H12.125V13.5H11.25V11H9.75V13.5H8.875V12H7.375V13.5H6.5V11H5Z" fill="currentColor"/>
    </svg>
  )
)
TableMeasure.displayName = "TableMeasure"
export { TableMeasure }
