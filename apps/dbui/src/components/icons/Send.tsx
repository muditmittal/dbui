import { forwardRef } from "react"

/** use:action send | submit, dispatch */
const Send = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16 8.00001C16 8.29223 15.8303 8.55784 15.5651 8.68061L2.06509 14.9306C1.79059 15.0577 1.46661 15.0074 1.24352 14.8032C1.02042 14.5989 0.941873 14.2806 1.04433 13.996L3.20288 8.00002L1.04433 2.00405C0.941873 1.71944 1.02042 1.40114 1.24351 1.19686C1.46661 0.992588 1.79059 0.94233 2.06509 1.06941L15.5651 7.31941C15.8303 7.44218 16 7.70779 16 8.00001ZM4.52712 8.75002L3.06358 12.8154L13.4648 8.00001L3.06358 3.18463L4.52712 7.25002L8 7.25002V8.75002L4.52712 8.75002Z" fill="currentColor"/>
    </svg>
  )
)
Send.displayName = "Send"
export { Send }
