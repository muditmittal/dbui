import { forwardRef } from "react"

/** use:action indent | increase indent, shift right */
const IndentIncrease = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M16 2H0V3.5H16V2Z" fill="currentColor"/>
      <path d="M16 5.5H8V7H16V5.5Z" fill="currentColor"/>
      <path d="M16 9H8V10.5H16V9Z" fill="currentColor"/>
      <path d="M0 12.5V14H16V12.5H0Z" fill="currentColor"/>
      <path d="M1.96968 6.03033L3.03034 4.96967L6.06067 8L3.03034 11.0303L1.96968 9.96967L3.93935 8L1.96968 6.03033Z" fill="currentColor"/>
    </svg>
  )
)
IndentIncrease.displayName = "IndentIncrease"
export { IndentIncrease }
