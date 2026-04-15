import { forwardRef } from "react"

/** use:component close | dismiss, x, cancel, remove */
const Close = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M6.96967 8.03033L2 3.06066L3.06066 2L8.03033 6.96967L13 2L14.0607 3.06066L9.09099 8.03033L14.0607 13L13 14.0607L8.03033 9.09099L3.06066 14.0607L2 13L6.96967 8.03033Z" fill="currentColor"/>
</svg>
  )
)
Close.displayName = "Close"
export { Close }
