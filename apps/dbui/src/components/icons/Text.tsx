import { forwardRef } from "react"

/** use:action add text | string, characters */
const Text = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M7.11816 13V4.61914H4.08301V3.13574H11.9238V4.61914H8.88184V13H7.11816Z" fill="currentColor"/>
    </svg>
  )
)
Text.displayName = "Text"
export { Text }
