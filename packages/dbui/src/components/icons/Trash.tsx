import { forwardRef } from "react"

/** use:action delete | remove, trash, discard, destroy */
const Trash = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M6 0C5.67718 0 5.39057 0.206573 5.28849 0.512829L4.45943 3H2.75H1V4.5H2.0771L3.25439 15.331C3.29576 15.7116 3.61715 16 4 16H12C12.3828 16 12.7042 15.7116 12.7456 15.331L13.9229 4.5H15V3H13.25H11.5406L10.7115 0.512829C10.6094 0.206573 10.3228 0 10 0H6ZM9.95943 3L9.45943 1.5H6.54057L6.04057 3H9.95943ZM5 4.5H3.58594L4.6729 14.5H11.3271L12.4141 4.5H11H5Z" fill="currentColor"/>
    </svg>
  )
)
Trash.displayName = "Trash"
export { Trash }
