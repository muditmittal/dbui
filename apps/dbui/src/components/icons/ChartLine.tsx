import { forwardRef } from "react"

/** use:object line chart | AI/BI | trend, time series */
const ChartLine = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M1 1V14.25C1 14.6642 1.33579 15 1.75 15H15V13.5H2.5V1H1ZM15.0303 5.03033L13.9697 3.96967L9.5 8.43934L7.53033 6.46967L7 5.93934L6.46967 6.46967L3.46967 9.46967L4.53033 10.5303L7 8.06066L8.96967 10.0303L9.5 10.5607L10.0303 10.0303L15.0303 5.03033Z" fill="currentColor"/>
</svg>
  )
)
ChartLine.displayName = "ChartLine"
export { ChartLine }
