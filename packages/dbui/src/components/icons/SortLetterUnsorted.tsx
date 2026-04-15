import { forwardRef } from "react"

/** use:action unsorted | no sort, default order */
const SortLetterUnsorted = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M15.5303 4.96973L14.4697 6.03027L12.25 3.81055V12.1895L14.4697 9.96973L15.5303 11.0303L11.5 15.0605L7.46973 11.0303L8.53027 9.96973L10.75 12.1895V3.81055L8.53027 6.03027L7.46973 4.96973L11.5 0.939453L15.5303 4.96973Z" fill="currentColor"/>
      <path d="M6.01758 8.4668C6.2772 8.46697 6.51381 8.62291 6.625 8.86719C6.73602 9.11148 6.70148 9.40017 6.53711 9.60938L3.40137 13.5996H6.68945V15H1.98242C1.7228 14.9998 1.48619 14.8439 1.375 14.5996C1.26383 14.3551 1.29842 14.0658 1.46289 13.8564L4.59863 9.86621H1.31055V8.4668H6.01758Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M4 1C4.27363 1 4.52007 1.1726 4.62305 1.43652L7 7.5332H5.54883L5.18457 6.59961H2.81543L2.45117 7.5332H1L3.37695 1.43652C3.47993 1.1726 3.72637 1 4 1ZM3.36133 5.2002H4.63867L4 3.56152L3.36133 5.2002Z" fill="currentColor"/>
    </svg>
  )
)
SortLetterUnsorted.displayName = "SortLetterUnsorted"
export { SortLetterUnsorted }
