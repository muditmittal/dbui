import { forwardRef } from "react"

/** use:object Performance | Platform | speed, metrics, benchmarking */
const Speedometer = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M5.74902 7.82031C6.05467 7.67262 6.42277 7.74884 6.64453 8.00586Z" fill="currentColor"/><path d="M8 1C12.4183 1 16 4.58172 16 9C16 10.4577 15.6079 11.823 14.9268 13H13.1211C13.8396 12.0814 14.3153 10.9652 14.4551 9.74609L12.502 9.75L12.498 8.25L14.4551 8.24609C14.3126 7.01295 13.8254 5.88574 13.0918 4.96191L11.7139 6.34668L10.6504 5.28906L12.0303 3.90234C11.1057 3.17033 9.97833 2.68372 8.74512 2.54297V4.5H7.24512V2.54395C6.0147 2.68626 4.88941 3.17224 3.9668 3.90332L5.34668 5.28906L4.2832 6.34668L2.90527 4.96484C2.17305 5.88809 1.68623 7.01434 1.54395 8.24609L3.50195 8.25L3.49805 9.75L1.54395 9.74609C1.68374 10.9652 2.16033 12.0813 2.87891 13H1.07324C0.392099 11.823 0 10.4577 0 9C0 4.58172 3.58172 1 8 1Z" fill="currentColor"/>
    </svg>
  )
)
Speedometer.displayName = "Speedometer"
export { Speedometer }
