import { forwardRef } from "react"

/** use:action Open pipeline folder | expanded DLT directory */
const FolderOpenPipeline = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M0 1.75C0 1.33579 0.335786 1 0.75 1H4.67157C5.40092 1 6.10039 1.28973 6.61612 1.80546L7.81066 3H13.25C13.6642 3 14 3.33579 14 3.75V6H15.25Z" fill="currentColor"/>
    </svg>
  )
)
FolderOpenPipeline.displayName = "FolderOpenPipeline"
export { FolderOpenPipeline }
