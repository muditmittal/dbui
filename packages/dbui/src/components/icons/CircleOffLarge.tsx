import { forwardRef } from "react"

/** use:indicator offline | inactive, stopped, terminated */
const CircleOffLarge = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.3516 1.72852L14.1699 2.90918C15.3124 4.29256 16 6.06572 16 8C16 12.4183 12.4183 16 8 16C6.06546 16 4.29252 15.3119 2.90918 14.1689L1.72754 15.3516L0.648438 14.2725L14.2725 0.648438L15.3516 1.72852ZM3.97754 13.1006C5.08417 13.9752 6.47986 14.5 8 14.5C11.5898 14.5 14.5 11.5898 14.5 8C14.5 6.48009 13.9767 5.08338 13.1025 3.97656L3.97754 13.1006Z" fill="currentColor"/>
<path d="M8 0C9.37255 0 10.6641 0.346172 11.793 0.955078L10.6738 2.07422C9.85818 1.70578 8.95317 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 8.95286 1.70755 9.85664 2.07617 10.6719L0.956055 11.792C0.346932 10.6634 0 9.37244 0 8C0 3.58172 3.58172 0 8 0Z" fill="currentColor"/>
</svg>
  )
)
CircleOffLarge.displayName = "CircleOffLarge"
export { CircleOffLarge }
