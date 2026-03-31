import { forwardRef } from "react"

/** use:action show panel | expand sidebar, open sidebar */
const Sidebar = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.75 1C1.33579 1 1 1.33579 1 1.75V14.25C1 14.6642 1.33579 15 1.75 15H14.25C14.6642 15 15 14.6642 15 14.25V1.75C15 1.33579 14.6642 1 14.25 1H1.75ZM2.5 13.5V2.5H4L4 13.5H2.5ZM5.5 13.5H13.5V2.5H5.5V13.5Z" fill="currentColor"/>
    </svg>
  )
)
Sidebar.displayName = "Sidebar"
export { Sidebar }
