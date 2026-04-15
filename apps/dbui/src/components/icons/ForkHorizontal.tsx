import { forwardRef } from "react"

/** use:action branch | repos, git, split, diverge */
const ForkHorizontal = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M1.5 4.75C1.5 4.05964 2.05964 3.5 2.75 3.5C3.44036 3.5 4 4.05964 4 4.75C4 5.44036 3.44036 6 2.75 6C2.05964 6 1.5 5.44036 1.5 4.75Z" fill="currentColor"/>
    </svg>
  )
)
ForkHorizontal.displayName = "ForkHorizontal"
export { ForkHorizontal }
