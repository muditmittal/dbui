import { forwardRef } from "react"

/** use:action like | positive feedback, approve */
const ThumbsUp = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.64798 1.02871C6.76836 0.757863 7.03695 0.583313 7.33334 0.583313C8.06269 0.583313 8.76216 0.873044 9.27789 1.38877C9.79361 1.90449 10.0833 2.60397 10.0833 3.33331V5.24998H13.1029Z" fill="currentColor"/>
    </svg>
  )
)
ThumbsUp.displayName = "ThumbsUp"
export { ThumbsUp }
