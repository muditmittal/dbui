import { forwardRef } from "react"

/** use:action mail | message, notification, invite */
const Mail = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M0.75 2C0.335786 2 0 2.33579 0 2.75V13.25C0 13.6642 0.335786 14 0.75 14H15.25C15.6642 14 16 13.6642 16 13.25V2.75C16 2.33579 15.6642 2 15.25 2H0.75ZM1.5 4.34667V12.5H14.5V4.34667L9.08119 8.60431C8.44662 9.1029 7.55338 9.1029 6.91881 8.60431L1.5 4.34667ZM13.1497 3.5H2.85031L7.84554 7.42483C7.9362 7.49606 8.0638 7.49606 8.15446 7.42483L13.1497 3.5Z" fill="currentColor"/>
    </svg>
  )
)
Mail.displayName = "Mail"
export { Mail }
