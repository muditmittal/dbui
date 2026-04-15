import { forwardRef } from "react"

/** use:action undo | revert, go back, ctrl+Z, rollback */
const Undo = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <g clip-path="url(#clip0_35_4843)"><path fillRule="evenodd" clipRule="evenodd" d="M4.53033 1.21973L5.59099 2.28039L2.87132 5.00006L11.5607 5.00006C14.0459 5.00006 16.0607 7.01477 16.0607 9.50006C16.0607 11.9853 14.0459 14.0001 11.5607 14.0001H7.06066V12.5001H11.5607C13.2175 12.5001 14.5607 11.1569 14.5607 9.50006C14.5607 7.8432 13.2175 6.50006 11.5607 6.50006L2.87132 6.50006L5.59099 9.21973L4.53033 10.2804L0 5.75006L4.53033 1.21973Z" fill="currentColor"/></g><defs><clipPath id="clip0_35_4843"><rect width={size} height={size} fill="white"/></clipPath></defs>
    </svg>
  )
)
Undo.displayName = "Undo"
export { Undo }
