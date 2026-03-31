import { forwardRef } from "react"

/** use:action collapse | show less, fold, close */
const ExpandLess = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width="16" height="17" viewBox="0 0 16 17" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.56066 4.56066L12.0607 1.06066L11 0L8.03033 2.96967L5.06066 0L4 1.06066L7.5 4.56067L8.03033 5.091L8.56066 4.56066ZM4 15L7.5 11.5L8.03033 10.9697L8.56066 11.5L12.0607 15L11 16.0607L8.03033 13.091L5.06066 16.0607L4 15Z" fill="currentColor"/>
</svg>
  )
)
ExpandLess.displayName = "ExpandLess"
export { ExpandLess }
