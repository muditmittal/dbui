import { forwardRef } from "react"

/** use:action upload | import, push to volume */
const Upload = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.999999 13.5607L15 13.5607L15 15.0607L0.999999 15.0607L0.999999 13.5607ZM8.53033 1.53034L12.5303 5.53034L11.4697 6.591L8.75 3.87133L8.75 11.0607L7.25 11.0607L7.25 3.87133L4.53033 6.591L3.46967 5.53034L7.46967 1.53034L8 1.00001L8.53033 1.53034Z" fill="currentColor"/>
    </svg>
  )
)
Upload.displayName = "Upload"
export { Upload }
