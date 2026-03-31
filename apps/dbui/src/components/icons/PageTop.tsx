import { forwardRef } from "react"

/** use:action scroll to top | jump to start, first item */
const PageTop = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1 12.9696L2.06066 14.0303L8.03033 8.0606L14 14.0303L15.0607 12.9696L8.03033 5.93928L1 12.9696ZM15.0303 2.49994V0.99994L1.03033 0.999939V2.49994L15.0303 2.49994Z" fill="currentColor"/>
    </svg>
  )
)
PageTop.displayName = "PageTop"
export { PageTop }
