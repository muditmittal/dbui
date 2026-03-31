import { forwardRef } from "react"

/** use:action pause | hold, suspend, pause job */
const Pause = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10 12L10 4L11.5 4V12H10ZM4.5 12L4.5 4L6 4L6 12H4.5Z" fill="currentColor"/>
    </svg>
  )
)
Pause.displayName = "Pause"
export { Pause }
