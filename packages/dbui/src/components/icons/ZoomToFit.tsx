import { forwardRef } from "react"

/** use:action fit to screen | auto zoom, fit view */
const ZoomToFit = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M1 1.75C1 1.33579 1.33579 1 1.75 1L4.5 1V2.5L2.5 2.5V4.5H1L1 1.75ZM14.25 1C14.6642 1 15 1.33579 15 1.75V4.5H13.5V2.5H11.5V1H14.25ZM1 14.25C1 14.6642 1.33579 15 1.75 15H4.5V13.5H2.5V11.5H1V14.25ZM15 14.25C15 14.6642 14.6642 15 14.25 15H11.5V13.5H13.5V11.5H15V14.25ZM5 5.75C5 5.33579 5.33579 5 5.75 5H10.25C10.6642 5 11 5.33579 11 5.75V10.25C11 10.6642 10.6642 11 10.25 11H5.75C5.33579 11 5 10.6642 5 10.25V5.75ZM6.5 6.5V9.5H9.5V6.5H6.5Z" fill="currentColor"/>
    </svg>
  )
)
ZoomToFit.displayName = "ZoomToFit"
export { ZoomToFit }
