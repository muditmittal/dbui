import { forwardRef } from "react"

/** use:indicator list | bullet list, items, line items, rows */
const List = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M4 10C5.10457 10 6 10.8954 6 12C6 13.1046 5.10457 14 4 14C2.89543 14 2 13.1046 2 12C2 10.8954 2.89543 10 4 10Z" fill="currentColor"/>
      <path d="M14 12.75H8V11.25H14V12.75Z" fill="currentColor"/>
      <path d="M4 2C5.10457 2 6 2.89543 6 4C6 5.10457 5.10457 6 4 6C2.89543 6 2 5.10457 2 4C2 2.89543 2.89543 2 4 2Z" fill="currentColor"/>
      <path d="M14 4.75H8V3.25H14V4.75Z" fill="currentColor"/>
    </svg>
  )
)
List.displayName = "List"
export { List }
