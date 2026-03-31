import { forwardRef } from "react"

/** use:action last page | jump to end, final page */
const PageLast = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.06066 1L2 2.06066L7.96967 8.03033L2 14L3.06066 15.0607L10.091 8.03033L3.06066 1ZM13.5303 15.0303L15.0303 15.0303L15.0303 1.03033L13.5303 1.03033L13.5303 15.0303Z" fill="currentColor"/>
    </svg>
  )
)
PageLast.displayName = "PageLast"
export { PageLast }
