import { forwardRef } from "react"

/** use:action menu | hamburger, navigation toggle, three lines */
const Menu = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M15 4H1V2.5H15V4ZM15 8.75H1V7.25H15V8.75ZM15 13.5H1V12H15V13.5Z" fill="currentColor"/>
    </svg>
  )
)
Menu.displayName = "Menu"
export { Menu }
