import { forwardRef } from "react"

/** use:action expand all | unfold all, open all */
const ChevronDoubleDown = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.9466 7.95391L8.00133 10.8908L5.0561 7.95392L3.99695 9.01608L7.47175 12.481L8.00133 13.0091L8.5309 12.481L12.0057 9.01608L10.9466 7.95391ZM10.9466 3.99395L8.00133 6.93082L5.0561 3.99395L3.99695 5.05612L7.47175 8.52106L8.00133 9.04913L8.5309 8.52106L12.0057 5.05612L10.9466 3.99395Z" fill="currentColor"/>
</svg>
  )
)
ChevronDoubleDown.displayName = "ChevronDoubleDown"
export { ChevronDoubleDown }
