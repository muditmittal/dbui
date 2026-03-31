import { forwardRef } from "react"

/** use:action date range | date picker, period selector, timespan */
const CalendarRange = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<g clip-path="url(#clip0_35_4740)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 2H10V0H11.5V2H14.25C14.6642 2 15 2.33579 15 2.75V8.5H13.5V7H2.5V13.5H8V15H1.75C1.33579 15 1 14.6642 1 14.25V2.75C1 2.33579 1.33579 2 1.75 2H4.5V0H6V2ZM2.5 5.5H13.5V3.5H2.5V5.5Z" fill="currentColor"/>
<path d="M10.4697 9.46967L7.93935 12L10.4697 14.5303L11.5303 13.4697L10.8107 12.75H13.1893L12.4697 13.4697L13.5303 14.5303L16.0606 12L13.5303 9.46968L12.4697 10.5303L13.1893 11.25H10.8107L11.5303 10.5303L10.4697 9.46967Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_35_4740">
<rect width={size} height={size} fill="white"/>
</clipPath>
</defs>
</svg>
  )
)
CalendarRange.displayName = "CalendarRange"
export { CalendarRange }
