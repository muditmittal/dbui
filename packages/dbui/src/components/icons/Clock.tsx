import { forwardRef } from "react"

/** use:action schedule | time, history, recent, schedule */
const Clock = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8ZM8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM7.25 4V8C7.25 8.19891 7.32902 8.38968 7.46967 8.53033L9.46967 10.5303L10.5303 9.46967L8.75 7.68934V4H7.25Z" fill="currentColor"/>
</svg>
  )
)
Clock.displayName = "Clock"
export { Clock }
