import { forwardRef } from "react"

/** use:action close | dismiss, x, cancel, remove */
const CloseSmall = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fillRule="evenodd" clipRule="evenodd" d="M7.06344 8L3.99994 4.9365L4.93644 4L7.99994 7.0635L11.0634 4L11.9999 4.9365L8.93644 8L11.9999 11.0635L11.0634 12L7.99994 8.9365L4.93644 12L3.99994 11.0635L7.06344 8Z" fill="currentColor"/>
</svg>
  )
)
CloseSmall.displayName = "CloseSmall"
export { CloseSmall }
