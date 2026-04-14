import { forwardRef } from "react"

/** use:object AI user | AI/BI | genie, agent */
const UserSparkle = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M8 1C8.66449 1 9.28241 1.19942 9.79716 1.54168C9.79215 1.56579 9.78752 1.59006 9.78327 1.61448L9.72123 1.97123L9.36448 2.03327Z" fill="currentColor"/>
    </svg>
  )
)
UserSparkle.displayName = "UserSparkle"
export { UserSparkle }
