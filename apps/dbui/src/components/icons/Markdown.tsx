import { forwardRef } from "react"

/** use:action Markdown | md, formatted text */
const Markdown = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M13.75 10.1249L14.957 8.85733L16.043 9.89248L13 13.0878L9.95703 9.89248L11.043 8.85733L12.25 10.1249V5.9999H13.75V10.1249Z" fill="currentColor"/>
      <path d="M7.74316 3.29678C7.95116 3.06694 8.28003 2.98827 8.56934 3.09951C8.85869 3.21098 9.04968 3.48965 9.0498 3.79971V12.9999H7.5498V5.746L5.05566 8.50283C4.91238 8.66113 4.70862 8.75124 4.49512 8.7499C4.28153 8.74844 4.0787 8.6553 3.9375 8.49502L1.5498 5.78506V12.9999H0.0498047V3.79971C0.0499261 3.48785 0.243408 3.20875 0.535156 3.09854C0.826761 2.98847 1.15606 3.06998 1.3623 3.30361L4.50684 6.87295L7.74316 3.29678Z" fill="currentColor"/>
    </svg>
  )
)
Markdown.displayName = "Markdown"
export { Markdown }
