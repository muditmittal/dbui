import { forwardRef } from "react"

/** use:action remove | minus, subtract, exclude, decrease */
const MinusCircleFill = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM11.5 8.75L4.50001 8.75V7.25H11.5V8.75Z" fill="currentColor"/>
    </svg>
  )
)
MinusCircleFill.displayName = "MinusCircleFill"
export { MinusCircleFill }
