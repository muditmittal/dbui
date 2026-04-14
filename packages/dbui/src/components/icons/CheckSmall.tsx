import { forwardRef } from "react"

/** use:action accept | checkmark, confirm, done */
const CheckSmall = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0303 6.03033L7 11.0607L3.96967 8.03033L5.03033 6.96967L7 8.93934L10.9697 4.96967L12.0303 6.03033Z" fill="currentColor"/>
</svg>
  )
)
CheckSmall.displayName = "CheckSmall"
export { CheckSmall }
