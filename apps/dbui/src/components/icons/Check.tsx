import { forwardRef } from "react"

/** use:component accept | checkmark, confirm, done */
const Check = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.0607 3.56066L5.53033 13.091L1 8.56066L2.06066 7.5L5.53033 10.9697L14 2.5L15.0607 3.56066Z" fill="currentColor"/>
</svg>
  )
)
Check.displayName = "Check"
export { Check }
