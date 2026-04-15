import { forwardRef } from "react"

/** use:action move down | descend, collapse, drop */
const ArrowDown = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M8.03034 15.0605L1.00001 8.03022L2.06067 6.96956L7.28034 12.1892L7.28034 0.999887L8.78034 0.999887L8.78034 12.1892L14 6.96955L15.0607 8.03021L8.03034 15.0605Z" fill="currentColor"/>
</svg>
  )
)
ArrowDown.displayName = "ArrowDown"
export { ArrowDown }
