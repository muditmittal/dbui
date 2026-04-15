import { forwardRef } from "react"

/** use:object User | IAM | credentialed user, role indicator */
const UserBadge = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M8 1C6.89543 1 6 1.89543 6 3V11C6 12.1046 6.89543 13 8 13C9.10457 13 10 12.1046 10 11V3C10 1.89543 9.10457 1 8 1Z" fill="currentColor"/>
    </svg>
  )
)
UserBadge.displayName = "UserBadge"
export { UserBadge }
