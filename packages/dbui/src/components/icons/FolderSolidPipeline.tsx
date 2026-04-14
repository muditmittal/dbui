import { forwardRef } from "react"

/** use:object Pipeline folder | Lakeflow | DLT directory */
const FolderSolidPipeline = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M0.75 2C0.335786 2 0 2.33579 0 2.75V13.25C0 13.6642 0.335786 14 0.75 14H8.91646Z" fill="currentColor"/>
    </svg>
  )
)
FolderSolidPipeline.displayName = "FolderSolidPipeline"
export { FolderSolidPipeline }
