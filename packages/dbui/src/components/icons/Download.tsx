import { forwardRef } from "react"

/** use:action download | export, save file, fetch */
const Download = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M1 13.5L15 13.5L15 15L1 15L1 13.5ZM8.53033 10.5303L12.5303 6.53033L11.4697 5.46967L8.75 8.18934L8.75 1L7.25 1L7.25 8.18934L4.53033 5.46967L3.46967 6.53033L7.46967 10.5303L8 11.0607L8.53033 10.5303Z" fill="currentColor"/>
</svg>
  )
)
Download.displayName = "Download"
export { Download }
