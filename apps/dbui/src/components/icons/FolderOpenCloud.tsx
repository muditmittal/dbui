import { forwardRef } from "react"

/** use:action Open volume folder | expanded cloud directory */
const FolderOpenCloud = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3896 7.3125C12.203 7.31256 13.6918 8.69657 13.8604 10.4658C15.1067 10.7538 15.9999 11.8778 16 13.1963C16 14.728 14.7951 15.9999 13.2305 16Z" fill="currentColor"/>
    </svg>
  )
)
FolderOpenCloud.displayName = "FolderOpenCloud"
export { FolderOpenCloud }
