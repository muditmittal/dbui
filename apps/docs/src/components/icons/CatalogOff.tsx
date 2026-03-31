import { forwardRef } from "react"

/** use:object Disabled catalog | Unity Catalog | unavailable, restricted */
const CatalogOff = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<g clip-path="url(#clip0_35_4825)">
<path d="M14.0003 11.9393L12.5003 10.4393V5H7.06099L5.56099 3.5H12.5003V1.5H4.50033C4.23962 1.5 4.00221 1.59977 3.8242 1.76321L2.76315 0.702162C3.21294 0.267455 3.8254 0 4.50033 0H13.2503C13.6645 0 14.0003 0.335786 14.0003 0.75V11.9393Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.00033 4.06066L0.470001 2.53033L1.53066 1.46967L15.0307 14.9697L13.97 16.0303L13.9397 16H4.75033C3.23155 16 2.00033 14.7688 2.00033 13.25V4.06066ZM3.50033 5.56066V13.25C3.50033 13.9404 4.05998 14.5 4.75033 14.5H12.4397L3.50033 5.56066Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_35_4825">
<rect width={size} height={size} fill="white"/>
</clipPath>
</defs>
</svg>
  )
)
CatalogOff.displayName = "CatalogOff"
export { CatalogOff }
