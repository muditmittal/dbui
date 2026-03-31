import { forwardRef } from "react"

/** use:action run | execute, start, play */
const PlayCircleFill = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8ZM6.375 5.18541C6.60705 5.05144 6.89295 5.05144 7.125 5.18541L10.875 7.35048C11.107 7.48445 11.25 7.73205 11.25 7.99999C11.25 8.26794 11.107 8.51554 10.875 8.64951L7.125 10.8146C6.89295 10.9486 6.60705 10.9486 6.375 10.8146C6.14295 10.6806 6 10.433 6 10.1651V5.83493C6 5.56698 6.14295 5.31939 6.375 5.18541Z" fill="currentColor"/>
    </svg>
  )
)
PlayCircleFill.displayName = "PlayCircleFill"
export { PlayCircleFill }
