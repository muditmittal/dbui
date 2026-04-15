import { forwardRef } from "react"

/** use:action sidebar closed | panel hidden, sidebar off */
const SidebarClosed = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M13 1C14.6569 1 16 2.34315 16 4V12L15.9961 12.1543C15.9158 13.7394 14.6051 15 13 15H3L2.8457 14.9961C1.31166 14.9184 0.0816253 13.6883 0.00390625 12.1543L0 12V4C1.28853e-07 2.34315 1.34315 1 3 1H13ZM3 2.5C2.17157 2.5 1.5 3.17157 1.5 4V12C1.5 12.8284 2.17157 13.5 3 13.5H4.5V2.5H3ZM6 13.5H13C13.8284 13.5 14.5 12.8284 14.5 12V4C14.5 3.17157 13.8284 2.5 13 2.5H6V13.5Z" fill="currentColor"/>
    </svg>
  )
)
SidebarClosed.displayName = "SidebarClosed"
export { SidebarClosed }
