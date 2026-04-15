import { forwardRef } from "react"

/** use:object Notebook | Workspace | cell based doc, data science */
const Notebook = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M3 1.75C3 1.33579 3.33579 1 3.75 1H14.25C14.6642 1 15 1.33579 15 1.75V14.25C15 14.6642 14.6642 15 14.25 15H3.75C3.33579 15 3 14.6642 3 14.25V12.5H1V11H3V8.75H1V7.25H3V5H1V3.5H3V1.75ZM4.5 2.5V13.5H6V2.5H4.5ZM7.5 2.5V13.5H13.5V2.5H7.5Z" fill="currentColor"/>
    </svg>
  )
)
Notebook.displayName = "Notebook"
export { Notebook }
