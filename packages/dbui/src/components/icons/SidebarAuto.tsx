import { forwardRef } from "react"

/** use:action auto sidebar | smart sidebar, auto-hide */
const SidebarAuto = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M1.75 1C1.33579 1 1 1.33579 1 1.75V14.25C1 14.6642 1.33579 15 1.75 15H15V13.5H5.5V2.5H15V1H1.75ZM4 2.5H2.5V13.5H4L4 2.5ZM9.06066 8L11.0303 9.96967L9.96967 11.0303L7.46967 8.53033L6.93934 8L7.46967 7.46967L9.96967 4.96967L11.0303 6.03033L9.06066 8ZM11.9697 6.03033L13.9393 8L11.9697 9.96967L13.0303 11.0303L15.5303 8.53033L16.0607 8L15.5303 7.46967L13.0303 4.96967L11.9697 6.03033Z" fill="currentColor"/>
    </svg>
  )
)
SidebarAuto.displayName = "SidebarAuto"
export { SidebarAuto }
