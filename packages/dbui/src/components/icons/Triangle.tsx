import { forwardRef } from "react"

/** use:indicator marker | pointer, caret, sort indicator */
const Triangle = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M8.00011 3C8.268 3.00003 8.51556 3.143 8.64952 3.375L12.9796 10.875C13.1135 11.107 13.1135 11.393 12.9796 11.625C12.8456 11.857 12.5981 12 12.3302 12H3.67003C3.40212 12 3.15461 11.857 3.02062 11.625C2.88664 11.3929 2.88664 11.1071 3.02062 10.875L7.35069 3.375L7.40636 3.29199C7.54718 3.10942 7.76582 3 8.00011 3Z" fill="currentColor"/>
    </svg>
  )
)
Triangle.displayName = "Triangle"
export { Triangle }
