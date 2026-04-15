import { forwardRef } from "react"

/** use:action add | create, new, plus */
const PlusCircleFill = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM7.25 11.5V8.75H4.5V7.25H7.25V4.5H8.75V7.25H11.5V8.75H8.75V11.5H7.25Z" fill="currentColor"/>
    </svg>
  )
)
PlusCircleFill.displayName = "PlusCircleFill"
export { PlusCircleFill }
