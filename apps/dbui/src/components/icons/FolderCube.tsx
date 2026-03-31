import { forwardRef } from "react"

/** use:object Bundle folder | Workspace | databricks asset bundle, DAB */
const FolderCube = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M4.67188 2C5.40111 2.00008 6.10056 2.29001 6.61621 2.80566L7.81055 4H15.25L15.3271 4.00391C15.7051 4.04253 16 4.36183 16 4.75V8.11719L12.9434 6.70703Z" fill="currentColor"/>
    </svg>
  )
)
FolderCube.displayName = "FolderCube"
export { FolderCube }
