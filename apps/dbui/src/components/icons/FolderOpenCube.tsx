import { forwardRef } from "react"

/** use:action Open Bundle Folder | asset bundle */
const FolderOpenCube = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.7617 8.03906C10.9421 7.97861 11.1399 7.98878 11.3145 8.06934L14.5547 9.56445Z" fill="currentColor"/>
    </svg>
  )
)
FolderOpenCube.displayName = "FolderOpenCube"
export { FolderOpenCube }
