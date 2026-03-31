import { forwardRef } from "react"

/** use:object Jobs | Lakeflow | DAG, task flow, orchestration, automation */
const Workflows = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 4C4.44036 4 5 3.44036 5 2.75C5 2.05964 4.44036 1.5 3.75 1.5C3.05964 1.5 2.5 2.05964 2.5 2.75C2.5 3.44036 3.05964 4 3.75 4Z" fill="currentColor"/>
    </svg>
  )
)
Workflows.displayName = "Workflows"
export { Workflows }
