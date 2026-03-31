import { forwardRef } from "react"

/** use:component search | keyword search, find, lookup, discover */
const Search = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <g clip-path="url(#clip0_35_5024)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 8C2.5 4.96243 4.96243 2.5 8 2.5C11.0376 2.5 13.5 4.96243 13.5 8C13.5 11.0376 11.0376 13.5 8 13.5C4.96243 13.5 2.5 11.0376 2.5 8ZM8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C9.66229 15 11.1892 14.4206 12.3899 13.4527L14.9398 16.0031L16.0006 14.9425L13.4508 12.3923C14.4198 11.1912 15 9.66336 15 8C15 4.13401 11.866 1 8 1Z" fill="currentColor"/>
      </g>
      <defs>
      <clipPath id="clip0_35_5024">
      <rect width={size} height={size} fill="white"/>
      </clipPath>
      </defs>
    </svg>
  )
)
Search.displayName = "Search"
export { Search }
