import { forwardRef } from "react"

/** use:action reply | respond, answer, thread */
const Reply = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <mask id="mask0_35_5069" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width={size} height={size}>
      <rect width={size} height={size} fill="#D9D9D9"/>
      </mask>
      <g mask="url(#mask0_35_5069)">
      <path d="M3.33333 3.33331V5.99998C3.33333 6.55554 3.52778 7.02776 3.91667 7.41665C4.30556 7.80553 4.77778 7.99998 5.33333 7.99998L11.45 7.99998L9.05 5.59998L10 4.66665L14 8.66665L10 12.6666L9.05 11.7333L11.45 9.33331H5.33333C4.41111 9.33331 3.625 9.00831 2.975 8.35831C2.325 7.70831 2 6.9222 2 5.99998L2 3.33331H3.33333Z" fill="currentColor"/>
      </g>
    </svg>
  )
)
Reply.displayName = "Reply"
export { Reply }
