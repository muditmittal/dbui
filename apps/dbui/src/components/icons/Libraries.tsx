import { forwardRef } from "react"

/** use:object Library | Compute | packages, dependencies, jar, whl */
const Libraries = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M8.30096 1.52188L13.551 15.0219L14.949 14.4782L9.69897 0.97821L8.30096 1.52188Z" fill="currentColor"/>
      <path d="M1 15V0.999972H2.5V15H1Z" fill="currentColor"/>
      <path d="M5 15V0.999972H6.5V15H5Z" fill="currentColor"/>
    </svg>
  )
)
Libraries.displayName = "Libraries"
export { Libraries }
