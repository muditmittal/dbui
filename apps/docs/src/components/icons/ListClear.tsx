import { forwardRef } from "react"

/** use:action clear list | remove all, empty list */
const ListClear = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <g clip-path="url(#clip0_35_4776)">
      <path d="M15.0303 13.9695L13.0607 11.9999L15.0303 10.0302L13.9697 8.96953L12 10.9392L10.0303 8.96953L8.96967 10.0302L10.9393 11.9999L8.96967 13.9695L10.0303 15.0302L12 13.0605L13.9697 15.0302L15.0303 13.9695Z" fill="currentColor"/>
      <path d="M5 11.5H1L1 10H5L5 11.5Z" fill="currentColor"/>
      <path d="M11 3.5L1 3.5L1 2L11 2V3.5Z" fill="currentColor"/>
      <path d="M7 7.5H1L1 6L7 6V7.5Z" fill="currentColor"/>
      </g>
      <defs>
      <clipPath id="clip0_35_4776">
      <rect width={size} height={size} fill="white" transform="matrix(1 -8.74228e-08 -8.74228e-08 -1 1.39876e-06 16)"/>
      </clipPath>
      </defs>
    </svg>
  )
)
ListClear.displayName = "ListClear"
export { ListClear }
