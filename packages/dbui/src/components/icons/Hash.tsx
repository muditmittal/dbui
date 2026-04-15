import { forwardRef } from "react"

/** use:object ID | Platform | hash, identifier, number sign */
const Hash = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M11.6709 5H15V6.5H11.4639L11.0498 9.5H15V11H10.8438L10.292 15H8.77734L9.3291 11H5.84375L5.29199 15H3.77734L4.3291 11H1V9.5H4.53516L4.94922 6.5H1V5H5.15625L5.70801 1H7.22266L6.6709 5H10.1562L10.708 1H12.2227L11.6709 5ZM6.0498 9.5H9.53516L9.94922 6.5H6.46387L6.0498 9.5Z" fill="currentColor"/>
    </svg>
  )
)
Hash.displayName = "Hash"
export { Hash }
