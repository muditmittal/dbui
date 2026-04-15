import { forwardRef } from "react"

/** use:component collapse | collapse, close menu, fold */
const ChevronUp = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M8 7.08341L5.05268 10L4 8.9583L8 5L12 8.9583L10.9473 10L8 7.08341Z" fill="currentColor"/>
</svg>
  )
)
ChevronUp.displayName = "ChevronUp"
export { ChevronUp }
