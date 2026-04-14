import { forwardRef } from "react"

/** use:indicator partial success | partial check, some complete */
const CheckLine = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.06066 11.0607L15.0607 2.06066L14 1L5.53033 9.46967L2.06066 6L1 7.06066L5 11.0607L5.53033 11.591L6.06066 11.0607ZM1.03033 15.0303L15.0303 15.0303V13.5303L1.03033 13.5303V15.0303Z" fill="currentColor"/>
</svg>
  )
)
CheckLine.displayName = "CheckLine"
export { CheckLine }
