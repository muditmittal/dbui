import { forwardRef } from "react"

/** use:action redo | redo, ctrl+Y, repeat */
const Redo = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <g clip-path="url(#clip0_35_4842)">
      <path fillRule="evenodd" clipRule="evenodd" d="M13.1893 5.0003L10.4697 2.28063L11.5303 1.21997L16.0607 5.7503L11.5303 10.2806L10.4697 9.21997L13.1893 6.5003L4.5 6.5003C2.84315 6.5003 1.5 7.84345 1.5 9.5003C1.5 11.1572 2.84315 12.5003 4.5 12.5003H9V14.0003H4.5C2.01472 14.0003 0 11.9856 0 9.5003C0 7.01502 2.01472 5.0003 4.5 5.0003L13.1893 5.0003Z" fill="currentColor"/>
      </g>
      <defs>
      <clipPath id="clip0_35_4842">
      <rect width={size} height={size} fill="white"/>
      </clipPath>
      </defs>
    </svg>
  )
)
Redo.displayName = "Redo"
export { Redo }
