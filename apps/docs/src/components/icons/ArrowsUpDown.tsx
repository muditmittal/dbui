import { forwardRef } from "react"

/** use:component sort | reorder, swap, toggle sort */
const ArrowsUpDown = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.03034 1.00014L9.06067 5.03047L8.00001 6.09113L5.78034 3.87146L5.78034 10.0608H4.28034L4.28034 3.87146L2.06067 6.09113L1.00001 5.03047L5.03034 1.00014ZM11.7803 6.06075L11.7803 12.2501L13.9999 10.0304L15.0606 11.0911L11.0303 15.1214L6.99994 11.0911L8.0606 10.0304L10.2803 12.2501L10.2803 6.06075H11.7803Z" fill="currentColor"/>
</svg>
  )
)
ArrowsUpDown.displayName = "ArrowsUpDown"
export { ArrowsUpDown }
