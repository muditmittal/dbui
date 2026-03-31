import { forwardRef } from "react"

/** use:object bar chart | AI/BI | trend, histogram, column chart */
const BarChart = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 1V14.25C1 14.6642 1.33579 15 1.75 15H15V13.5H2.5V1H1ZM7 1V12H8.5V1H7ZM10 5V12H11.5V5H10ZM4 5V12H5.5V5H4ZM13 12V8H14.5V12H13Z" fill="currentColor"/>
</svg>
  )
)
BarChart.displayName = "BarChart"
export { BarChart }
