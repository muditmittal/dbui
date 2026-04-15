import { forwardRef } from "react"

/** use:component remove | minus, subtract, separator */
const Dash = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M13 8.75H3V7.25H13V8.75Z" fill="currentColor"/>
</svg>
  )
)
Dash.displayName = "Dash"
export { Dash }
