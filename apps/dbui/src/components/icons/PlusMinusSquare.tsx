import { forwardRef } from "react"

/** use:action increment/decrement | plus minus, counter, stepper */
const PlusMinusSquare = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M7.25 4.25V6H5.5V7.5H7.25V9.25H8.75V7.5H10.5V6H8.75V4.25H7.25Z" fill="currentColor"/>
      <path d="M10.5 10.5H5.5V12H10.5V10.5Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M1.75 1C1.33579 1 1 1.33579 1 1.75V14.25C1 14.6642 1.33579 15 1.75 15H14.25C14.6642 15 15 14.6642 15 14.25V1.75C15 1.33579 14.6642 1 14.25 1H1.75ZM2.5 13.5V2.5H13.5V13.5H2.5Z" fill="currentColor"/>
    </svg>
  )
)
PlusMinusSquare.displayName = "PlusMinusSquare"
export { PlusMinusSquare }
