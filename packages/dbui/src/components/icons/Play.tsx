import { forwardRef } from "react"

/** use:action run | execute, start, launch */
const Play = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M12.125 8.86362C12.3571 8.72965 12.5 8.48205 12.5 8.2141C12.5 7.94615 12.3571 7.69856 12.125 7.56458L6.125 4.10048C5.89295 3.96651 5.60705 3.96651 5.375 4.10048C5.14295 4.23446 5 4.48205 5 4.75V11.6782C5 11.9462 5.14295 12.1937 5.375 12.3277C5.60705 12.4617 5.89295 12.4617 6.125 12.3277L12.125 8.86362Z" fill="currentColor"/>
    </svg>
  )
)
Play.displayName = "Play"
export { Play }
