import { forwardRef } from "react"

/** use:action hide panel | collapse sidebar, minimize sidebar */
const SidebarCollapse = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M1.75 1C1.33579 1 1 1.33579 1 1.75V14.25C1 14.6642 1.33579 15 1.75 15H15V13.5H5.5V2.5H15V1H1.75ZM4 2.5H2.5V13.5H4L4 2.5ZM9.81066 8.75L11.0303 9.96967L9.96967 11.0303L7.46967 8.53033L6.93934 8L7.46967 7.46967L9.96967 4.96967L11.0303 6.03033L9.81066 7.25H14V8.75H9.81066Z" fill="currentColor"/>
    </svg>
  )
)
SidebarCollapse.displayName = "SidebarCollapse"
export { SidebarCollapse }
