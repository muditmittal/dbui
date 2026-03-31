import { forwardRef } from "react"

/** use:action zoom out | shrink, reduce */
const ZoomOut = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5ZM1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 9.66336 14.4198 11.1912 13.4508 12.3923L16.0006 14.9425L14.9398 16.0031L12.3899 13.4527C11.1892 14.4206 9.66229 15 8 15C4.13401 15 1 11.866 1 8ZM11 7.25L5 7.25V8.75L11 8.75V7.25Z" fill="currentColor"/>
    </svg>
  )
)
ZoomOut.displayName = "ZoomOut"
export { ZoomOut }
