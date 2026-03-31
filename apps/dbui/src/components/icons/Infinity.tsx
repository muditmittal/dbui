import { forwardRef } from "react"

/** use:indicator unlimited | infinite, no limit, unbounded */
const Infinity = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.6517 6.40901C11.5303 5.53033 12.955 5.53033 13.8336 6.40901C14.7123 7.28769 14.7123 8.71231 13.8336 9.59099C12.955 10.4697 11.5303 10.4697 10.6517 9.59099L8 6.93934L5.34835 9.59099C4.46967 10.4697 3.04505 10.4697 2.16637 9.59099C1.28769 8.71231 1.28769 7.28769 2.16637 6.40901C3.04505 5.53033 4.46967 5.53033 5.34835 6.40901L8 9.06066L10.6517 6.40901ZM9.59099 10.6517C10.4697 11.5303 11.5303 12.955 13.8336 10.6517C16.1169 8.36835 14.7123 5.53033 12.955 5.53033L9.59099 10.6517ZM6.40901 5.34835C5.53033 4.46967 3.04505 4.46967 2.16637 5.34835C-0.116886 7.63191 1.28769 10.4697 3.04505 10.4697L6.40901 5.34835Z" fill="currentColor"/>
    </svg>
  )
)
Infinity.displayName = "Infinity"
export { Infinity }
