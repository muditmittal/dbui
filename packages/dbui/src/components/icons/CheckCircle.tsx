import { forwardRef } from "react"

/** use:component success | success, complete, passed, healthy */
const CheckCircle = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8ZM8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM11.5303 6.53033L10.4697 5.46967L7 8.93934L5.53033 7.46967L4.46967 8.53033L6.46967 10.5303L7 11.0607L7.53033 10.5303L11.5303 6.53033Z" fill="currentColor"/>
</svg>
  )
)
CheckCircle.displayName = "CheckCircle"
export { CheckCircle }
