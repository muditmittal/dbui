import { forwardRef } from "react"

/** use:action text cursor | I-beam, text select, type mode */
const CursorType = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path d="M7.99999 3.75H8.99999C9.69035 3.75 10.25 4.30964 10.25 5V11C10.2498 11.6902 9.69025 12.25 8.99999 12.25H7.99999V13.75H8.99999C9.78801 13.75 10.4986 13.4186 11 12.8875C11.5014 13.4186 12.212 13.75 13 13.75H14V12.25H13C12.3096 12.25 11.75 11.6904 11.75 11V5C11.75 4.30964 12.3096 3.75 13 3.75H14V2.25H13C12.212 2.25 11.5014 2.58144 11 3.11253C10.4986 2.58144 9.78801 2.25 8.99999 2.25H7.99999V3.75Z" fill="currentColor"/>
<path d="M5.93638 8.00338L2.99948 5.0581L4.06165 3.99895L8.05468 8.00338L4.06165 12.0078L2.99948 10.9487L5.93638 8.00338Z" fill="currentColor"/>
</svg>
  )
)
CursorType.displayName = "CursorType"
export { CursorType }
