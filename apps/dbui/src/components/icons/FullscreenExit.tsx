import { forwardRef } from "react"

/** use:action exit fullscreen | minimize, restore size */
const FullscreenExit = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M6 1V5.25C6 5.66421 5.66421 6 5.25 6H1V4.5H4.5V1H6ZM10 15V10.75C10 10.3358 10.3358 10 10.75 10H15V11.5H11.5V15H10ZM10.75 6H15V4.5H11.5V1H10V5.25C10 5.66421 10.3358 6 10.75 6ZM1 10H5.25C5.66421 10 6 10.3358 6 10.75L6 15L4.5 15L4.5 11.5H1V10Z" fill="currentColor"/>
</svg>
  )
)
FullscreenExit.displayName = "FullscreenExit"
export { FullscreenExit }
