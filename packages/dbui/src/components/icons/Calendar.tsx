import { forwardRef } from "react"

/** use:component date | schedule, date picker */
const Calendar = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 0V2H1.75C1.33579 2 1 2.33579 1 2.75V14.25C1 14.6642 1.33579 15 1.75 15H14.25C14.6642 15 15 14.6642 15 14.25V2.75C15 2.33579 14.6642 2 14.25 2H11.5V0H10V2H6V0H4.5ZM10 3.5H11.5H13.5V5.5H2.5V3.5H4.5H6H10ZM2.5 7V13.5H13.5V7H2.5Z" fill="currentColor"/>
</svg>
  )
)
Calendar.displayName = "Calendar"
export { Calendar }
