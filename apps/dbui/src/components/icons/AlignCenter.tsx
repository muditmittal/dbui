import { forwardRef } from "react"

/** use:action align center | center align, middle align */
const AlignCenter = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M1 2.5H15V1H1V2.5ZM11.5 5.75H4.5V4.25H11.5V5.75ZM15 8.75H1V7.25H15V8.75ZM15 15H1V13.5H15V15ZM4.5 11.75H11.5V10.25H4.5V11.75Z" fill="currentColor"/>
</svg>
  )
)
AlignCenter.displayName = "AlignCenter"
export { AlignCenter }
