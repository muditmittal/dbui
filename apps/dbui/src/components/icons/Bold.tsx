import { forwardRef } from "react"

/** use:action bold | strong text, heavy font */
const Bold = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M4.75 3C4.33579 3 4 3.33579 4 3.75V8V12.25C4 12.6642 4.33579 13 4.75 13H8.5H9.125C10.7128 13 12 11.7128 12 10.125C12 9.0853 11.4482 8.17438 10.6214 7.66946C11.0148 7.17763 11.25 6.55379 11.25 5.875C11.25 4.28714 9.96269 3 8.37491 3H4.75ZM5.5 8.75V11.5H8.5H9.125C9.88439 11.5 10.5 10.8844 10.5 10.125C10.5 9.36544 9.88459 8.75 9.125 8.75H8.375L5.5 8.75ZM8.375 7.25C9.13528 7.24912 9.75 6.63385 9.75 5.875C9.75 5.11565 9.13435 4.5 8.37491 4.5H5.5V7.25H8.375Z" fill="currentColor"/>
</svg>
  )
)
Bold.displayName = "Bold"
export { Bold }
