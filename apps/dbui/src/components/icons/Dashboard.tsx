import { forwardRef } from "react"

/** use:object Dashboard | AI/BI | report, analytics, visualizations */
const Dashboard = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M1 1.75C1 1.33579 1.33579 1 1.75 1H14.25C14.6642 1 15 1.33579 15 1.75V14.25C15 14.6642 14.6642 15 14.25 15H1.75C1.33579 15 1 14.6642 1 14.25V1.75ZM2.5 10.5V13.5H7.25V10.5H2.5ZM2.5 9H7.25V2.5H2.5V9ZM8.75 2.5V5.5H13.5V2.5H8.75ZM8.75 13.5V7H13.5V13.5H8.75Z" fill="currentColor"/>
</svg>
  )
)
Dashboard.displayName = "Dashboard"
export { Dashboard }
