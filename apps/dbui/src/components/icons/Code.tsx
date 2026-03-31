import { forwardRef } from "react"

/** use:object Code | Platform | source, script, angle brackets */
const Code = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width="17" height="16" viewBox="0 0 17 16" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.530331 8.56055L4.03034 12.0605L5.091 10.9999L2.12132 8.03022L5.09099 5.06054L4.03033 3.99988L0.53033 7.49989L0 8.03022L0.530331 8.56055ZM12.091 3.99988L15.591 7.49988L16.1213 8.03021L15.591 8.56054L12.091 12.0605L11.0303 10.9999L14 8.03021L11.0303 5.06054L12.091 3.99988Z" fill="currentColor"/>
</svg>
  )
)
Code.displayName = "Code"
export { Code }
