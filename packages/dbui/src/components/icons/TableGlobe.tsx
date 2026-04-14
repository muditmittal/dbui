import { forwardRef } from "react"

/** use:object External table | Unity Catalog | foreign table, remote data */
const TableGlobe = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.75 1C1.33579 1 1 1.33579 1 1.75V14.25C1 14.6642 1.33579 15 1.75 15H7V13.5H6.5V7H15V1.75C15 1.33579 14.6642 1 14.25 1H1.75ZM5 7V13.5H2.5V7H5ZM13.5 5.5V2.5H2.5V5.5H13.5Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.625 7.25C9.20875 7.25 7.25 9.20875 7.25 11.625C7.25 14.0412 9.20875 16 11.625 16C14.0412 16 16 14.0412 16 11.625C16 9.20875 14.0412 7.25 11.625 7.25Z" fill="currentColor"/>
    </svg>
  )
)
TableGlobe.displayName = "TableGlobe"
export { TableGlobe }
