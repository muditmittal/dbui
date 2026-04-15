import { forwardRef } from "react"

/** use:action scroll to bottom | jump to end, last item */
const PageBottom = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M1 3.06066L2.06066 2L8.03033 7.96967L14 2L15.0607 3.06066L8.03033 10.091L1 3.06066ZM15.0303 13.5303V15.0303L1.03033 15.0303V13.5303L15.0303 13.5303Z" fill="currentColor"/>
    </svg>
  )
)
PageBottom.displayName = "PageBottom"
export { PageBottom }
