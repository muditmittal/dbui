import { forwardRef } from "react"

/** use:object Team | IAM | team members, group */
const UserTeam = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M5.5 3.25C5.5 2.2835 6.2835 1.5 7.25 1.5H8.75C9.7165 1.5 10.5 2.2835 10.5 3.25C10.5 4.2165 9.7165 5 8.75 5H7.25C6.2835 5 5.5 4.2165 5.5 3.25Z" fill="currentColor"/><path d="M4 8.75C3.0335 8.75 2.25 8.1665 2.25 7.5C2.25 6.8335 3.0335 6.25 4 6.25C4.9665 6.25 5.75 6.8335 5.75 7.5C5.75 8.1665 4.9665 8.75 4 8.75Z" fill="currentColor"/><path d="M12 6.25C11.0335 6.25 10.25 6.8335 10.25 7.5C10.25 8.1665 11.0335 8.75 12 8.75C12.9665 8.75 13.75 8.1665 13.75 7.5C13.75 6.8335 12.9665 6.25 12 6.25Z" fill="currentColor"/>
    </svg>
  )
)
UserTeam.displayName = "UserTeam"
export { UserTeam }
