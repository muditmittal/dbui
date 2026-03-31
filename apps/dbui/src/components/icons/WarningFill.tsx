import { forwardRef } from "react"

/** use:indicator warning | caution, !, alert, attention */
const WarningFill = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M6.67816 1.67889C7.25965 0.640368 8.74035 0.640369 9.32184 1.67889L15.6621 13.0091C16.2177 14.0013 15.5022 15.2 14.3403 15.2H1.65974C0.497813 15.2 -0.217699 14.0013 0.337886 13.0091L6.67816 1.67889Z" fill="currentColor"/>
    </svg>
  )
)
WarningFill.displayName = "WarningFill"
export { WarningFill }
