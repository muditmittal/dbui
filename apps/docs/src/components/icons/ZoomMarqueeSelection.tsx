import { forwardRef } from "react"

/** use:action marquee select | area select, box select, lasso */
const ZoomMarqueeSelection = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M1 1.75V4H2.5L2.5 2.5L4 2.5V1H1.75C1.33579 1 1 1.33579 1 1.75Z" fill="currentColor"/><path d="M14.25 1H12V2.5L13.5 2.5V4L15 4V1.75C15 1.33579 14.6642 1 14.25 1Z" fill="currentColor"/><path d="M4 15H1.75C1.55109 15 1.36032 14.921 1.21967 14.7803C1.07902 14.6397 1 14.4489 1 14.25V12H2.5L2.5 13.5H4L4 15Z" fill="currentColor"/><path d="M6 2.5L10 2.5V1H6V2.5Z" fill="currentColor"/><path d="M1 10V5.99999H2.5L2.5 10L1 10Z" fill="currentColor"/>
    </svg>
  )
)
ZoomMarqueeSelection.displayName = "ZoomMarqueeSelection"
export { ZoomMarqueeSelection }
