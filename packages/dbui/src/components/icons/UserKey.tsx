import { forwardRef } from "react"

/** use:object Service principal | IAM | API key user, machine identity */
const UserKey = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M4.75 4.25C4.75 2.45507 6.20507 1 8 1C9.79493 1 11.25 2.45507 11.25 4.25C11.25 6.04493 9.79493 7.5 8 7.5C6.20507 7.5 4.75 6.04493 4.75 4.25ZM8 2.5C7.0335 2.5 6.25 3.2835 6.25 4.25C6.25 5.2165 7.0335 6 8 6C8.9665 6 9.75 5.2165 9.75 4.25C9.75 3.2835 8.9665 2.5 8 2.5Z" fill="currentColor"/><path d="M1.75 15H9.75V13.5H2.5V13.0262C3.83065 11.4784 5.80084 10.5 8 10.5L8.45922 9.01185C8.30714 9.00398 8.15403 9 8 9C5.23352 9 2.7666 10.2847 1.16438 12.2872C1.05797 12.4202 1 12.5855 1 12.7558V14.25C1 14.6642 1.33579 15 1.75 15Z" fill="currentColor"/>
    </svg>
  )
)
UserKey.displayName = "UserKey"
export { UserKey }
