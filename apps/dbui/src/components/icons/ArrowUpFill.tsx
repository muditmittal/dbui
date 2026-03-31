import { forwardRef } from "react"

/** use:indicator upload | arrow up, ascend */
const ArrowUpFill = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path d="M7.99996 0.25C8.1988 0.25 8.3896 0.329174 8.53024 0.469727L14.7803 6.71973C14.9948 6.93421 15.0594 7.25687 14.9434 7.53711C14.8272 7.8173 14.5533 8 14.25 8H10.5V15.25C10.5 15.6642 10.1642 16 9.74997 16H6.24995C5.83588 15.9998 5.49995 15.6641 5.49995 15.25V8H1.74993C1.44671 7.99987 1.17261 7.81727 1.05656 7.53711C0.940613 7.25697 1.00533 6.93418 1.21965 6.71973L7.46968 0.469727L7.58394 0.375977C7.70615 0.294505 7.85092 0.250063 7.99996 0.25Z" fill="currentColor"/>
</svg>
  )
)
ArrowUpFill.displayName = "ArrowUpFill"
export { ArrowUpFill }
