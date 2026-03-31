import { forwardRef } from "react"

/** use:action position bottom | align bottom, dock bottom */
const PositionBottom = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M12 10V12H4V10H12Z" fill="currentColor"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.25 1C14.6642 1 15 1.33579 15 1.75V14.25C15 14.6642 14.6642 15 14.25 15H1.75C1.33579 15 1 14.6642 1 14.25V1.75C1 1.33579 1.33579 1 1.75 1H14.25ZM2.5 13.5H13.5V2.5H2.5V13.5Z" fill="currentColor"/>
    </svg>
  )
)
PositionBottom.displayName = "PositionBottom"
export { PositionBottom }
