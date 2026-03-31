import { forwardRef } from "react"

/** use:object Pipeline Folder | Workspace | DLT directory */
const FolderOutlinePipeline = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M0 2.75C0 2.33579 0.335786 2 0.75 2H4.67157C5.40092 2 6.10039 2.28973 6.61612 2.80546L7.81066 4H15.25C15.6642 4 16 4.33579 16 4.75V10H14.5V5.5H7.5Z" fill="currentColor"/>
    </svg>
  )
)
FolderOutlinePipeline.displayName = "FolderOutlinePipeline"
export { FolderOutlinePipeline }
