import { forwardRef } from "react"

/** use:indicator info | information, help, hint, tooltip */
const InfoFill = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM7.25 11V7H8.75V11H7.25ZM8 4.5C8.41421 4.5 8.75 4.83579 8.75 5.25C8.75 5.66421 8.41421 6 8 6C7.58579 6 7.25 5.66421 7.25 5.25C7.25 4.83579 7.58579 4.5 8 4.5Z" fill="currentColor"/>
    </svg>
  )
)
InfoFill.displayName = "InfoFill"
export { InfoFill }
