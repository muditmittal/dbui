import { forwardRef } from "react"

/** use:action bookmark | save, favorite, flag */
const Bookmark = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 0.75C2 0.335786 2.33579 0 2.75 0H13.25C13.6642 0 14 0.335786 14 0.75V15.25C14 15.5533 13.8173 15.8268 13.537 15.9429C13.2568 16.059 12.9342 15.9948 12.7197 15.7803L8 11.0607L3.28033 15.7803C3.06583 15.9948 2.74324 16.059 2.46299 15.9429C2.18273 15.8268 2 15.5533 2 15.25V0.75ZM3.5 1.5V13.4393L7.46967 9.46967C7.76256 9.17678 8.23744 9.17678 8.53033 9.46967L12.5 13.4393V1.5H3.5Z" fill="currentColor"/>
</svg>
  )
)
Bookmark.displayName = "Bookmark"
export { Bookmark }
