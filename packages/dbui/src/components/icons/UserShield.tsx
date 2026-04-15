import { forwardRef } from "react"

/** use:object Admin user | IAM | admin, security admin, privileged */
const UserShield = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M8 3.5C9.51878 3.5 10.75 4.73122 10.75 6.25C10.75 7.76878 9.51878 9 8 9C6.48122 9 5.25 7.76878 5.25 6.25C5.25 4.73122 6.48122 3.5 8 3.5ZM8 5C7.30964 5 6.75 5.55964 6.75 6.25C6.75 6.94036 7.30964 7.5 8 7.5C8.69036 7.5 9.25 6.94036 9.25 6.25C9.25 5.55964 8.69036 5 8 5Z" fill="currentColor"/>
    </svg>
  )
)
UserShield.displayName = "UserShield"
export { UserShield }
