import { forwardRef } from "react"

/** use:indicator download point | download target, destination */
const ArrowDownDot = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path d="M7.99999 15C8.82842 15 9.49999 14.3284 9.49999 13.5C9.49999 12.6716 8.82842 12 7.99999 12C7.17157 12 6.49999 12.6716 6.49999 13.5C6.49999 14.3284 7.17157 15 7.99999 15Z" fill="currentColor"/>
<path d="M3.46967 6.53033L8 11.0607L12.5303 6.53033L11.4697 5.46967L8.75 8.18934V1H7.25V8.18934L4.53032 5.46967L3.46967 6.53033Z" fill="currentColor"/>
</svg>
  )
)
ArrowDownDot.displayName = "ArrowDownDot"
export { ArrowDownDot }
