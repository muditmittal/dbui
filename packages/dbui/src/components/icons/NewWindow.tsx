import { forwardRef } from "react"

/** use:action open | external link, pop out, new tab */
const NewWindow = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M14.25 1H10V2.5H12.4393L7.46967 7.46967L8.53033 8.53033L13.5 3.56066V6H15V1.75V1H14.25ZM1.75 2C1.33579 2 1 2.33579 1 2.75V14.25C1 14.6642 1.33579 15 1.75 15H13.25C13.6642 15 14 14.6642 14 14.25V8H12.5V13.5H2.5V3.5H8V2H1.75Z" fill="currentColor"/>
    </svg>
  )
)
NewWindow.displayName = "NewWindow"
export { NewWindow }
