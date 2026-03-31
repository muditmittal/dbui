import { forwardRef } from "react"

/** use:object Web Terminal | Compute | console, CLI, shell */
const Terminal = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M5.03033 4.96967L8.06066 8L5.03033 11.0303L3.96967 9.96967L5.93934 8L3.96967 6.03033L5.03033 4.96967Z" fill="currentColor"/><path d="M12 9.5H8V11H12V9.5Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M1 1.75C1 1.33579 1.33579 1 1.75 1H14.25C14.6642 1 15 1.33579 15 1.75V14.25C15 14.6642 14.6642 15 14.25 15H1.75C1.33579 15 1 14.6642 1 14.25V1.75ZM2.5 2.5V13.5H13.5V2.5H2.5Z" fill="currentColor"/>
    </svg>
  )
)
Terminal.displayName = "Terminal"
export { Terminal }
