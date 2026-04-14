import { forwardRef } from "react"

/** use:object Document File | Workspace | text, document */
const FileDocument = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 1.75C2 1.33579 2.33579 1 2.75 1H8.75C8.94891 1 9.13968 1.07902 9.28033 1.21967L13.7803 5.71967C13.921 5.86032 14 6.05109 14 6.25V10H12.5V7H8.75C8.33579 7 8 6.66421 8 6.25V2.5H3.5V16H2V1.75ZM9.5 3.56066L11.4393 5.5H9.5V3.56066ZM5 16V14.5H14V16H5ZM5 11.5V13H14V11.5H5Z" fill="currentColor"/>
</svg>
  )
)
FileDocument.displayName = "FileDocument"
export { FileDocument }
