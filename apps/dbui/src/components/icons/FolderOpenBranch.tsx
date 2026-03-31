import { forwardRef } from "react"

/** use:action Open git folder | expanded git directory */
const FolderOpenBranch = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9 7C10.1046 7 11 7.89543 11 9C11 9.32205 10.9214 9.62505 10.7861 9.89453Z" fill="currentColor"/>
    </svg>
  )
)
FolderOpenBranch.displayName = "FolderOpenBranch"
export { FolderOpenBranch }
