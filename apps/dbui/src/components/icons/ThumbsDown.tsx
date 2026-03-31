import { forwardRef } from "react"

/** use:action dislike | negative feedback, reject */
const ThumbsDown = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6551 2.27362C13.5082 2.14753 13.3201 2.07977 13.1266 2.08319L13.1133 2.08343L12.0833 2.08331V7.91664H13.1266C13.3201 7.92007 13.5082 7.85242 13.6551 7.72633C13.7913 7.60943 13.8833 7.44994 13.9167 7.27442V2.72553C13.8833 2.55002 13.7913 2.39052 13.6551 2.27362Z" fill="currentColor"/>
    </svg>
  )
)
ThumbsDown.displayName = "ThumbsDown"
export { ThumbsDown }
