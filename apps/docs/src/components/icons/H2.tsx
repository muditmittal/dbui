import { forwardRef } from "react"

/** use:action heading 2 | subtitle, section heading */
const H2 = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1 3V8V13H2.5V8.75H6V13H7.5V8V3H6V7.25H2.5V3H1ZM11.75 3C10.2312 3 9 4.23122 9 5.75V6H10.5V5.75C10.5 5.05964 11.0596 4.5 11.75 4.5H12.1392C12.8908 4.5 13.5 5.10924 13.5 5.86079C13.5 6.31916 13.2692 6.74673 12.8861 6.9983L10.6918 8.43895C9.63593 9.13223 9 10.3105 9 11.5737V12.25V13H9.75H15V11.5H10.5012C10.5251 10.7702 10.9021 10.0953 11.5151 9.69284L13.7093 8.25219C14.5149 7.72331 15 6.82442 15 5.86079C15 4.28082 13.7192 3 12.1392 3H11.75Z" fill="currentColor"/>
    </svg>
  )
)
H2.displayName = "H2"
export { H2 }
