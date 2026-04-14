import { forwardRef } from "react"

/** use:action back | previous, return */
const ArrowLeft = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 8.03022L8.03033 0.999888L9.09099 2.06055L3.87132 7.28022L15.0607 7.28022L15.0607 8.78022L3.87132 8.78022L9.09099 13.9999L8.03033 15.0605L1 8.03022Z" fill="currentColor"/>
</svg>
  )
)
ArrowLeft.displayName = "ArrowLeft"
export { ArrowLeft }
