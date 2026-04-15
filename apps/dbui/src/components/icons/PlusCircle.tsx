import { forwardRef } from "react"

/** use:action add | create, new, plus */
const PlusCircle = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5ZM0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8ZM7.25 7.25001V4.5H8.75V7.25001H11.5V8.75001H8.75V11.5H7.25V8.75001H4.5V7.25001H7.25Z" fill="currentColor"/>
    </svg>
  )
)
PlusCircle.displayName = "PlusCircle"
export { PlusCircle }
