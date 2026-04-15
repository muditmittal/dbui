import { forwardRef } from "react"

/** use:indicator placeholder | empty, skeleton, wireframe */
const GridDash = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M1 1.75V4H2.5L2.5 2.5L4 2.5V1H1.75C1.33579 1 1 1.33579 1 1.75ZM15 14.25V12H13.5V13.5H12V15H14.25C14.6642 15 15 14.6642 15 14.25ZM12 1L14.25 1C14.6642 1 15 1.33579 15 1.75V4L13.5 4V2.5L12 2.5V1ZM1.75 15H4L4 13.5H2.5L2.5 12H1V14.25C1 14.4489 1.07902 14.6397 1.21967 14.7803C1.36032 14.921 1.55109 15 1.75 15ZM10 2.5L6 2.5V1L10 1V2.5ZM6 15H10V13.5H6V15ZM13.5 10V6H15V10L13.5 10ZM1 6V10L2.5 10L2.5 6H1Z" fill="currentColor"/>
    </svg>
  )
)
GridDash.displayName = "GridDash"
export { GridDash }
