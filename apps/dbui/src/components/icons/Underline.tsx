import { forwardRef } from "react"

/** use:action underline | underline text, emphasis */
const Underline = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.54444 6.46633L4.6001 2.98798L6.0999 3.01197L6.04425 6.49033C6.02658 7.59499 6.9172 8.49997 8.022 8.49997C9.11442 8.49997 10 7.61439 10 6.52197V2.99997H11.5V6.52197C11.5 8.44282 9.94285 9.99997 8.022 9.99997C6.07938 9.99997 4.51336 8.40869 4.54444 6.46633ZM12 13H4V11.5H12V13Z" fill="currentColor"/>
    </svg>
  )
)
Underline.displayName = "Underline"
export { Underline }
