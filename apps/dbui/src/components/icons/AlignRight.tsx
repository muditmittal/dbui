import { forwardRef } from "react"

/** use:action align right | right align, flush right */
const AlignRight = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M1 2.5H15V1H1V2.5ZM15 5.75H8V4.25H15V5.75ZM1 8.75V7.25H15V8.75H1ZM1 15V13.5H15V15H1ZM8 11.75H15V10.25H8V11.75Z" fill="currentColor"/>
</svg>
  )
)
AlignRight.displayName = "AlignRight"
export { AlignRight }
