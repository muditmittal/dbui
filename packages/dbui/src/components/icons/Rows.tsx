import { forwardRef } from "react"

/** use:action rows | horizontal layout, row view */
const Rows = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M14.25 1C14.6642 1 15 1.33579 15 1.75L15 14.25C15 14.6642 14.6642 15 14.25 15L1.75 15C1.33579 15 1 14.6642 1 14.25L1 1.75C1 1.33579 1.33579 1 1.75 1L14.25 1ZM2.5 2.5L13.5 2.5L13.5 5L2.5 5L2.5 2.5ZM2.5 6.5L2.5 9.5L13.5 9.5V6.5L2.5 6.5ZM13.5 11L2.5 11L2.5 13.5L13.5 13.5V11Z" fill="currentColor"/>
    </svg>
  )
)
Rows.displayName = "Rows"
export { Rows }
