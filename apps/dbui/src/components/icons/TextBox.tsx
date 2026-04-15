import { forwardRef } from "react"

/** use:action Text widget | AI/BI | text box, text input, label */
const TextBox = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M0.75 0C0.335786 0 0 0.335786 0 0.75V13.25C0 13.6642 0.335786 14 0.75 14H13.25C13.6642 14 14 13.6642 14 13.25V0.75C14 0.335786 13.6642 0 13.25 0H0.75ZM1.5 12.5V1.5H12.5V12.5H1.5ZM4 5H6.25V10.5H7.75V5H10V3.5H7H4V5Z" fill="currentColor"/>
    </svg>
  )
)
TextBox.displayName = "TextBox"
export { TextBox }
