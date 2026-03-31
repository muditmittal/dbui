import { forwardRef } from "react"

/** use:action align left | left align, flush left */
const AlignLeft = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 2.5H15V1H1V2.5ZM8 5.75H1V4.25H8V5.75ZM1 8.75V7.25H15V8.75H1ZM1 15V13.5H15V15H1ZM1 11.75H8V10.25H1V11.75Z" fill="currentColor"/>
</svg>
  )
)
AlignLeft.displayName = "AlignLeft"
export { AlignLeft }
