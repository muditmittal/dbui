import { forwardRef } from "react"

/** use:indicator list | task, to do, requirements */
const Checklist = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M5.5 2L6.56066 3.06066L3.56066 6.06066L3.03033 6.59099L2.5 6.06066L1 4.56066L2.06066 3.5L3.03033 4.46967L5.5 2ZM15.0303 4.53033H8.03033V3.03033H15.0303V4.53033ZM1.03033 14.5303V13.0303L15.0303 13.0303V14.5303L1.03033 14.5303ZM8.03033 9.53033H15.0303V8.03033H8.03033V9.53033ZM6.56066 8.06066L5.5 7L3.03033 9.46967L2.06066 8.5L1 9.56066L2.5 11.0607L3.03033 11.591L3.56066 11.0607L6.56066 8.06066Z" fill="currentColor"/>
</svg>
  )
)
Checklist.displayName = "Checklist"
export { Checklist }
