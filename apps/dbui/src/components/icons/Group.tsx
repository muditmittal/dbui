import { forwardRef } from "react"

/** use:action group | cluster, bundle, aggregate */
const Group = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M2.5 13.5H4V15H1.75C1.55109 15 1.36038 14.9209 1.21973 14.7803C1.07907 14.6396 1 14.4489 1 14.25V12H2.5V13.5Z" fill="currentColor"/>
      <path d="M10 15H6V13.5H10V15Z" fill="currentColor"/>
      <path d="M15 14.25C15 14.6642 14.6642 15 14.25 15H12V13.5H13.5V12H15V14.25Z" fill="currentColor"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.75 6.5C9.16421 6.5 9.5 6.83579 9.5 7.25V11.25C9.5 11.6642 9.16421 12 8.75 12H4.75C4.33579 12 4 11.6642 4 11.25V7.25C4 6.83579 4.33579 6.5 4.75 6.5H8.75ZM5.5 10.5H8V8H5.5V10.5Z" fill="currentColor"/>
      <path d="M2.5 10H1V6H2.5V10Z" fill="currentColor"/>
      <path d="M15 10H13.5V6H15V10Z" fill="currentColor"/>
      <path d="M11.25 4C11.6642 4.00001 12 4.33579 12 4.75V9H10.5V5.5H7V4H11.25Z" fill="currentColor"/>
      <path d="M4 2.5H2.5V4H1V1.75C1 1.33579 1.33579 1 1.75 1H4V2.5Z" fill="currentColor"/>
      <path d="M14.25 1C14.6642 1 15 1.33579 15 1.75V4H13.5V2.5H12V1H14.25Z" fill="currentColor"/>
      <path d="M10 2.5H6V1H10V2.5Z" fill="currentColor"/>
    </svg>
  )
)
Group.displayName = "Group"
export { Group }
