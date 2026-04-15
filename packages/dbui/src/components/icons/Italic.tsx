import { forwardRef } from "react"

/** use:action italic | emphasis, slanted text */
const Italic = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M9.64808 4.5H12V3H6V4.5H8.10192L6.35192 11.5H4V13H10V11.5H7.89808L9.64808 4.5Z" fill="currentColor"/>
    </svg>
  )
)
Italic.displayName = "Italic"
export { Italic }
