import { forwardRef } from "react"

/** use:object Table View | Unity Catalog | tabular display, data grid */
const TableView = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M1.75 1C1.33579 1 1 1.33579 1 1.75V14.25C1 14.6642 1.33579 15 1.75 15H4V13.5H2.5V7H5V9H6.5V7H9.5V9H11V7H13.5V9H15V1.75C15 1.33579 14.6642 1 14.25 1H1.75ZM13.5 5.5V2.5H2.5V5.5H13.5Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.75 10C11.5511 10 11.3603 10.079 11.2197 10.2197C11.1398 10.2995 11.0798 10.3955 11.0429 10.5H9.95735C9.85439 10.2087 9.57658 10 9.25003 10L5.75 10C5.55108 10 5.36031 10.079 5.21966 10.2197C5.07901 10.3603 4.99999 10.5511 5 10.75L5.00003 12.5C5.00003 13.8807 6.11932 15 7.50003 15C8.88074 15 10 13.8807 10 12.5V12H11L11 12.5C11 13.8807 12.1193 15 13.5 15C14.8807 15 16 13.8807 16 12.5V10.7506C16 10.3364 15.6642 10 15.25 10L11.75 10ZM12.5 12.5L12.5 11.5L14.5 11.5V12.5C14.5 13.0523 14.0523 13.5 13.5 13.5C12.9477 13.5 12.5 13.0523 12.5 12.5ZM6.50002 11.5L6.50003 12.5C6.50003 13.0523 6.94774 13.5 7.50003 13.5C8.05231 13.5 8.50003 13.0523 8.50003 12.5V11.5001L6.50002 11.5Z" fill="currentColor"/>
    </svg>
  )
)
TableView.displayName = "TableView"
export { TableView }
