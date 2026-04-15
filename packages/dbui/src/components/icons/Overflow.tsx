import { forwardRef } from "react"

/** use:component context menu | more, kebab menu, ellipsis */
const Overflow = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M8 1C7.0335 1 6.25 1.7835 6.25 2.75C6.25 3.7165 7.0335 4.5 8 4.5C8.9665 4.5 9.75 3.7165 9.75 2.75C9.75 1.7835 8.9665 1 8 1ZM8 6.25C7.0335 6.25 6.25 7.0335 6.25 8C6.25 8.9665 7.0335 9.75 8 9.75C8.9665 9.75 9.75 8.9665 9.75 8C9.75 7.0335 8.9665 6.25 8 6.25ZM8 11.5C7.0335 11.5 6.25 12.2835 6.25 13.25C6.25 14.2165 7.0335 15 8 15C8.9665 15 9.75 14.2165 9.75 13.25C9.75 12.2835 8.9665 11.5 8 11.5Z" fill="currentColor"/>
    </svg>
  )
)
Overflow.displayName = "Overflow"
export { Overflow }
