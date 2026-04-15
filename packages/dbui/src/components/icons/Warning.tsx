import { forwardRef } from "react"

/** use:component warning | In Component | caution, !, alert, attention */
const Warning = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M9.32184 1.67889C8.74035 0.640369 7.25965 0.640368 6.67816 1.67889L0.337886 13.0091C-0.217699 14.0013 0.497813 15.2 1.65974 15.2H14.3403C15.5022 15.2 16.2177 14.0013 15.6621 13.0091L9.32184 1.67889ZM8 2.7L14.1103 13.6111C14.1362 13.6574 14.1317 13.7 14.0962 13.7H1.90378C1.86827 13.7 1.86382 13.6574 1.88969 13.6111L8 2.7Z" fill="currentColor"/>
    </svg>
  )
)
Warning.displayName = "Warning"
export { Warning }
