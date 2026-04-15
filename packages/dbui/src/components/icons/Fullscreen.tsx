import { forwardRef } from "react"

/** use:action expand window | maximize, presentation mode */
const Fullscreen = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M6 1H1.75C1.33579 1 1 1.33579 1 1.75V6H2.5V2.5H6V1ZM10 2.5V1H14.25C14.6642 1 15 1.33579 15 1.75V6H13.5V2.5H10ZM10 13.5H13.5V10H15V14.25C15 14.6642 14.6642 15 14.25 15H10V13.5ZM2.5 10V13.5H6V15H1.75C1.33579 15 1 14.6642 1 14.25V10H2.5Z" fill="currentColor"/>
</svg>
  )
)
Fullscreen.displayName = "Fullscreen"
export { Fullscreen }
