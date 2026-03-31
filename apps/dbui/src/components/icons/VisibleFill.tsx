import { forwardRef } from "react"

/** use:action visible | showing, eye on, revealed */
const VisibleFill = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00005 2C4.27845 2 1.12495 4.42395 0.0284753 7.77721C-0.0210472 7.92866 -0.0210478 8.09194 0.0284738 8.24339C1.12493 11.5967 4.27845 14.0206 8.00007 14.0206C11.7217 14.0206 14.8752 11.5967 15.9716 8.24345C16.0212 8.092 16.0212 7.92871 15.9716 7.77726C14.8752 4.42399 11.7217 2 8.00005 2ZM6.50003 8C6.50003 7.17157 7.1716 6.5 8.00003 6.5C8.82846 6.5 9.50003 7.17157 9.50003 8C9.50003 8.82843 8.82846 9.5 8.00003 9.5C7.1716 9.5 6.50003 8.82843 6.50003 8ZM8.00003 5C6.34318 5 5.00003 6.34315 5.00003 8C5.00003 9.65685 6.34318 11 8.00003 11C9.65689 11 11 9.65685 11 8C11 6.34315 9.65689 5 8.00003 5Z" fill="currentColor"/>
    </svg>
  )
)
VisibleFill.displayName = "VisibleFill"
export { VisibleFill }
