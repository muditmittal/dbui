import { forwardRef } from "react"

/** use:action show panel | expand sidebar, open sidebar */
const SidebarExpand = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M1.75 1C1.33579 1 1 1.33579 1 1.75V14.25C1 14.6642 1.33579 15 1.75 15H15V13.5H5.5V2.5H15V1H1.75ZM4 2.5H2.5V13.5H4L4 2.5ZM11.1893 8.75L9.96967 9.96967L11.0303 11.0303L13.5303 8.53033L14.0607 8L13.5303 7.46967L11.0303 4.96967L9.96967 6.03033L11.1893 7.25H7V8.75H11.1893Z" fill="currentColor"/>
    </svg>
  )
)
SidebarExpand.displayName = "SidebarExpand"
export { SidebarExpand }
