import { forwardRef } from "react"

/** use:action config | tools, fix, repair */
const Wrench = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.3665 3.29027C14.6113 3.33784 14.8164 3.50391 14.9138 3.7334C15.6863 5.55288 15.332 7.73916 13.8465 9.22466C12.4912 10.5799 10.5526 10.9937 8.84145 10.4692L5.65533 13.6553C4.74111 14.5695 3.25888 14.5695 2.34467 13.6553C1.43045 12.7411 1.43045 11.2588 2.34467 10.3446L5.53086 7.15844C5.00645 5.44731 5.42019 3.50883 6.77542 2.1536C8.26087 0.668151 10.447 0.313814 12.2665 1.08617C12.496 1.1836 12.6621 1.3887 12.7096 1.63345C12.7572 1.87819 12.68 2.13057 12.5037 2.30687L10.5 4.31061L10.5 5.49995L11.6893 5.49995L13.6931 3.49617C13.8694 3.31987 14.1218 3.24271 14.3665 3.29027Z" fill="currentColor"/>
    </svg>
  )
)
Wrench.displayName = "Wrench"
export { Wrench }
