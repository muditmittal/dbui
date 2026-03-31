import { forwardRef } from "react"

/** use:action resize | scale, adjust size, drag to resize */
const Resize = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M15 6.75H1V5.25H15V6.75ZM15 11.5H1V10H15V11.5Z" fill="currentColor"/>
    </svg>
  )
)
Resize.displayName = "Resize"
export { Resize }
