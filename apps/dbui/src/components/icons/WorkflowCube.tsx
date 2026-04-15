import { forwardRef } from "react"

/** use:object Bundle pipeline | Lakeflow | asset bundle, pipeline */
const WorkflowCube = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M11.6855 8.06934C11.885 7.9773 12.115 7.9773 12.3145 8.06934L15.5645 9.56934Z" fill="currentColor"/>
    </svg>
  )
)
WorkflowCube.displayName = "WorkflowCube"
export { WorkflowCube }
