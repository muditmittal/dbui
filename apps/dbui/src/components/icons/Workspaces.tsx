import { forwardRef } from "react"

/** use:object Workspace | project space, working area */
const Workspaces = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.75 1C3.7835 1 3 1.7835 3 2.75C3 3.7165 3.7835 4.5 4.75 4.5H7.25V7.25H4.75C3.7835 7.25 3 8.0335 3 9C3 9.9665 3.7835 10.75 4.75 10.75H7.25V13.25C7.25 14.2165 8.0335 15 9 15C9.9665 15 10.75 14.2165 10.75 13.25V10.75H13.25C14.2165 10.75 15 9.9665 15 9C15 8.0335 14.2165 7.25 13.25 7.25H10.75V4.5H13.25C14.2165 4.5 15 3.7165 15 2.75C15 1.7835 14.2165 1 13.25 1H9.75H8.25H4.75ZM8.75 4.5V2.5H4.75C4.61193 2.5 4.5 2.61193 4.5 2.75C4.5 2.88807 4.61193 3 4.75 3H7.25C7.66421 3 8 3.33579 8 3.75V4.5H8.75ZM9.25 4.5V3.75C9.25 3.33579 9.58579 3 10 3H13.25C13.3881 3 13.5 2.88807 13.5 2.75C13.5 2.61193 13.3881 2.5 13.25 2.5H9.25V4.5ZM10.75 7.25H13.25C13.3881 7.25 13.5 8.13807 13.5 9C13.5 9.88807 13.3881 10.75 13.25 10.75H10.75V7.25ZM4.5 9C4.5 8.86193 4.61193 8.75 4.75 8.75H7.25V10.75H4.75C4.61193 10.75 4.5 9.13807 4.5 9ZM8.75 10.75V13.25C8.75 13.3881 8.86193 13.5 9 13.5C9.13807 13.5 9.25 13.3881 9.25 13.25V10.75H8.75ZM8 7.25V8.75H8.75V7.25H8Z" fill="currentColor"/>
    </svg>
  )
)
Workspaces.displayName = "Workspaces"
export { Workspaces }
