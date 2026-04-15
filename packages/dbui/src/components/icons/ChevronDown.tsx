import { forwardRef } from "react"

/** use:component open menu | expand, dropdown */
const ChevronDown = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M8 8.91659L10.9473 6L12 7.0417L8 11L4 7.0417L5.05268 6L8 8.91659Z" fill="currentColor"/>
</svg>
  )
)
ChevronDown.displayName = "ChevronDown"
export { ChevronDown }
