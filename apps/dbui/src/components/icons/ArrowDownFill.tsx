import { forwardRef } from "react"

/** use:indicator download | arrow down, descend */
const ArrowDownFill = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path d="M8.00035 15.75C7.80151 15.75 7.61071 15.6708 7.47008 15.5303L1.22008 9.28027C1.0056 9.06579 0.940947 8.74313 1.05699 8.46289C1.1731 8.1827 1.44704 8 1.75035 8L5.50035 8L5.50035 0.75C5.50035 0.335786 5.83614 -3.62115e-08 6.25035 0L9.75035 3.0598e-07C10.1644 0.000172434 10.5003 0.335893 10.5003 0.75L10.5003 8L14.2503 8C14.5536 8.00013 14.8277 8.18273 14.9437 8.46289C15.0597 8.74303 14.9949 9.06582 14.7806 9.28027L8.53062 15.5303L8.41636 15.624C8.29415 15.7055 8.14939 15.7499 8.00035 15.75Z" fill="currentColor"/>
</svg>
  )
)
ArrowDownFill.displayName = "ArrowDownFill"
export { ArrowDownFill }
