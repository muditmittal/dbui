import { forwardRef } from "react"

/** use:indicator syncing | synchronizing, refreshing */
const SyncSmall = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M4.125 8.26257C4.12514 9.98083 5.26425 11.3908 6.71973 11.913C7.94326 12.3516 9.37462 12.1663 10.5908 11.118V12.6219H11.875V8.66589H7.75098V9.99011H9.88965C8.9767 10.852 7.95942 10.9546 7.14258 10.662C6.13896 10.3022 5.40932 9.35036 5.40918 8.26257H4.125Z" fill="currentColor"/>
<path d="M4.125 7.33386H8.24902V6.00964H6.11035C7.02338 5.14764 8.04054 5.04503 8.85742 5.33777C9.86101 5.69758 10.5906 6.64944 10.5908 7.73718H11.875C11.8748 6.0188 10.735 4.60884 9.2793 4.08679C8.0558 3.64822 6.62434 3.83345 5.4082 4.88171V3.37781H4.125V7.33386Z" fill="currentColor"/>
    </svg>
  )
)
SyncSmall.displayName = "SyncSmall"
export { SyncSmall }
