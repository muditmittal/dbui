import { forwardRef } from "react"

/** use:action strikethrough | cross out, delete text */
const StrikeThrough = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M7.78448 4C6.59944 4 5.75 4.73636 5.75 5.72C5.75 6.1043 5.82026 6.34535 5.9023 6.5005C5.9813 6.64988 6.09324 6.76185 6.25192 6.85569C6.61741 7.07183 7.1457 7.15587 7.8859 7.25689L7.9562 7.26645C8.33718 7.3182 8.78277 7.37872 9.21882 7.5L15 7.5V9L1 9V7.5L4.76352 7.5Z" fill="currentColor"/><path d="M4.25696 10.5C4.37955 12.4192 6.10176 13.5 7.78448 13.5C9.46721 13.5 11.1894 12.4192 11.312 10.5L9.80444 10.5C9.68777 11.3714 8.87937 12 7.78448 12C6.6896 12 5.88119 11.3714 5.76452 10.5L4.25696 10.5Z" fill="currentColor"/>
    </svg>
  )
)
StrikeThrough.displayName = "StrikeThrough"
export { StrikeThrough }
