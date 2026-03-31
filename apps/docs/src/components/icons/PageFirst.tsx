import { forwardRef } from "react"

/** use:action first page | jump to start, beginning */
const PageFirst = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9697 1L14.0303 2.06066L8.06066 8.03033L14.0303 14L12.9697 15.0607L5.93934 8.03033L12.9697 1ZM2.5 15.0303L1 15.0303L1 1.03033L2.5 1.03033L2.5 15.0303Z" fill="currentColor"/>
    </svg>
  )
)
PageFirst.displayName = "PageFirst"
export { PageFirst }
