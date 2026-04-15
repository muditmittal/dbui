import { forwardRef } from "react"

/** use:object Scheduled event | Lakeflow | appointment, calendar item */
const CalendarEvent = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M10 2H6V0H4.5V2H1.75C1.33579 2 1 2.33579 1 2.75V14.25C1 14.6642 1.33579 15 1.75 15H14.25C14.6642 15 15 14.6642 15 14.25V2.75C15 2.33579 14.6642 2 14.25 2H11.5V0H10V2ZM2.5 3.5V5.5H13.5V3.5H2.5ZM2.5 13.5V7H13.5V13.5H2.5ZM8.5 10.25C8.5 9.2835 9.2835 8.5 10.25 8.5C11.2165 8.5 12 9.2835 12 10.25C12 11.2165 11.2165 12 10.25 12C9.2835 12 8.5 11.2165 8.5 10.25Z" fill="currentColor"/>
</svg>
  )
)
CalendarEvent.displayName = "CalendarEvent"
export { CalendarEvent }
