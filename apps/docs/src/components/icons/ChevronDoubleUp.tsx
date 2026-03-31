import { forwardRef } from "react"

/** use:action collapse all | fold all, minimize all */
const ChevronDoubleUp = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.0561 8.04688L8.00003 5.10961L10.944 8.04688L12.0034 6.98502L8.52976 3.51922L8.00003 2.99069L7.4703 3.51922L3.99665 6.98502L5.0561 8.04688ZM5.0561 12.0078L8.00003 9.07052L10.944 12.0078L12.0034 10.9459L8.52976 7.48013L8.00003 6.9516L7.4703 7.48013L3.99665 10.9459L5.0561 12.0078Z" fill="currentColor"/>
</svg>
  )
)
ChevronDoubleUp.displayName = "ChevronDoubleUp"
export { ChevronDoubleUp }
