import { forwardRef } from "react"

/** use:indicator payment method | subscription, billing */
const CreditCard = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path d="M13 9H9V10.5H13V9Z" fill="currentColor"/>
<path fillRule="evenodd" clipRule="evenodd" d="M1.75 2C0.783501 2 0 2.7835 0 3.75V12.25C0 13.2165 0.783502 14 1.75 14H14.25C15.2165 14 16 13.2165 16 12.25V3.75C16 2.7835 15.2165 2 14.25 2H1.75ZM1.5 3.75C1.5 3.61193 1.61193 3.5 1.75 3.5H14.25C14.3881 3.5 14.5 3.61193 14.5 3.75V5.5H1.5V3.75ZM1.5 7H14.5V12.25C14.5 12.3881 14.3881 12.5 14.25 12.5H1.75C1.61193 12.5 1.5 12.3881 1.5 12.25V7Z" fill="currentColor"/>
</svg>
  )
)
CreditCard.displayName = "CreditCard"
export { CreditCard }
