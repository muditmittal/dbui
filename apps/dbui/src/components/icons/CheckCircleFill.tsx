import { forwardRef } from "react"

/** use:indicator success | success, complete, passed, healthy */
const CheckCircleFill = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8ZM11.5303 6.53033L10.4697 5.46967L7 8.93934L5.53033 7.46967L4.46967 8.53033L7 11.0607L11.5303 6.53033Z" fill="currentColor"/>
</svg>
  )
)
CheckCircleFill.displayName = "CheckCircleFill"
export { CheckCircleFill }
