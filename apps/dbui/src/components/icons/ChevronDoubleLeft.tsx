import { forwardRef } from "react"

/** use:action jump to start | first page, skip left */
const ChevronDoubleLeft = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.04692 10.9439L5.10969 7.99997L8.04692 5.05603L6.98505 3.99658L3.5193 7.47024L2.99078 7.99997L3.5193 8.52969L6.98505 12.0034L8.04692 10.9439ZM12.0078 10.9439L9.07055 7.99997L12.0078 5.05603L10.9459 3.99658L7.48016 7.47024L6.95164 7.99997L7.48016 8.52969L10.9459 12.0034L12.0078 10.9439Z" fill="currentColor"/>
</svg>
  )
)
ChevronDoubleLeft.displayName = "ChevronDoubleLeft"
export { ChevronDoubleLeft }
