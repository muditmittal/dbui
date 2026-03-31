import { forwardRef } from "react"

/** use:action Rich text | formatted text, WYSIWYG */
const RichText = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M15 15H1V13.5H15V15Z" fill="currentColor"/>
      <path d="M15 11.75H1V10.25H15V11.75Z" fill="currentColor"/>
      <path d="M8 2.5H5.25V8.75H3.75V2.5H1V1H8V2.5Z" fill="currentColor"/>
      <path d="M15 8.75H9.5V7.25H15V8.75Z" fill="currentColor"/>
      <path d="M15 5.75H9.5V4.25H15V5.75Z" fill="currentColor"/>
      <path d="M15 2.5H9.5V1H15V2.5Z" fill="currentColor"/>
    </svg>
  )
)
RichText.displayName = "RichText"
export { RichText }
