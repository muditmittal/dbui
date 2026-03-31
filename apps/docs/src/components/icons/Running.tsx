import { forwardRef } from "react"

/** use:indicator running | in progress, active, spinning */
const Running = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <g clip-path="url(#clip0_35_5040)">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8H0C-1.93129e-07 3.58172 3.58172 1.93129e-07 8 0V1.5ZM8 14.5C11.5899 14.5 14.5 11.5899 14.5 8H16C16 12.4183 12.4183 16 8 16V14.5Z" fill="currentColor"/>
      </g>
      <defs>
      <clipPath id="clip0_35_5040">
      <rect width={size} height={size} fill="white"/>
      </clipPath>
      </defs>
    </svg>
  )
)
Running.displayName = "Running"
export { Running }
