import { forwardRef } from "react"

/** use:object Bundle Pipeline | Lakeflow | DLT with bundles */
const PipelineCube = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6855 8.06934C11.8849 7.97735 12.1151 7.97735 12.3145 8.06934L15.5547 9.56445Z" fill="currentColor"/>
    </svg>
  )
)
PipelineCube.displayName = "PipelineCube"
export { PipelineCube }
