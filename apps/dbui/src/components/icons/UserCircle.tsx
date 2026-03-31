import { forwardRef } from "react"

/** use:object User profile | IAM | avatar, account, identity */
const UserCircle = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM5.5 6C5.5 4.61929 6.61929 3.5 8 3.5C9.38071 3.5 10.5 4.61929 10.5 6C10.5 7.38071 9.38071 8.5 8 8.5C6.61929 8.5 5.5 7.38071 5.5 6ZM3.5 12.2621C4.60363 11.1726 6.22115 10.5 8 10.5C9.77885 10.5 11.3964 11.1726 12.5 12.2621C11.3964 13.3517 9.77885 14.0243 8 14.0243C6.22115 14.0243 4.60363 13.3517 3.5 12.2621Z" fill="currentColor"/>
    </svg>
  )
)
UserCircle.displayName = "UserCircle"
export { UserCircle }
