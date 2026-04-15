import { forwardRef } from "react"

/** use:component add new | create, new, insert, plus, + */
const Plus = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.25 7.25V1H8.75V7.25H15V8.75H8.75V15H7.25V8.75H1V7.25H7.25Z" fill="currentColor"/>
    </svg>
  )
)
Plus.displayName = "Plus"
export { Plus }
