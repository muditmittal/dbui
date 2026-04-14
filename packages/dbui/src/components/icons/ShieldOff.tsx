import { forwardRef } from "react"

/** use:indicator unprotected | no governance, insecure, ungoverned */
const ShieldOff = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M13.3775 11.8168C13.7804 11.0229 13.9999 10.1339 13.9999 9.21466V1.74994C13.9999 1.33573 13.6642 0.999939 13.2499 0.999939H2.74994C2.69147 0.999939 2.63457 1.00663 2.57995 1.01929L4.0606 2.49994H12.4999V9.21466C12.4999 9.72189 12.4095 10.2167 12.2397 10.6791L13.3775 11.8168Z" fill="currentColor"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.96967 2.53033L0.969666 3.53033L1.99994 4.5606V9.21466C1.99994 11.206 3.03025 13.0555 4.7234 14.1037L7.60517 15.8876C7.84705 16.0374 8.15283 16.0374 8.3947 15.8876L11.2765 14.1037C11.3313 14.0698 11.3854 14.035 11.4388 13.9994L12.9697 15.5303L13.9697 14.5303L1.96967 2.53033ZM3.49994 9.21466V6.0606L10.3515 12.9121L7.99994 14.3679L5.51293 12.8283C4.26147 12.0536 3.49994 10.6865 3.49994 9.21466Z" fill="currentColor"/>
    </svg>
  )
)
ShieldOff.displayName = "ShieldOff"
export { ShieldOff }
