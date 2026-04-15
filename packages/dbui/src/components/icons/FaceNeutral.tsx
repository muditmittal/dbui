import { forwardRef } from "react"

/** use:action neutral feedback | okay, meh, mixed */
const FaceNeutral = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
<g clipPath="url(#clip0_35_4804)">
<path fillRule="evenodd" clipRule="evenodd" d="M8 2.08334C4.73232 2.08334 2.08334 4.73233 2.08334 8.00001C2.08334 11.2677 4.73232 13.9167 8 13.9167C11.2677 13.9167 13.9167 11.2677 13.9167 8.00001C13.9167 4.73233 11.2677 2.08334 8 2.08334ZM0.583336 8.00001C0.583336 3.9039 3.90389 0.583344 8 0.583344C12.0961 0.583344 15.4167 3.9039 15.4167 8.00001C15.4167 12.0961 12.0961 15.4167 8 15.4167C3.90389 15.4167 0.583336 12.0961 0.583336 8.00001Z" fill="currentColor"/>
<path fillRule="evenodd" clipRule="evenodd" d="M4.58334 10C4.58334 9.5858 4.91912 9.25001 5.33334 9.25001H10.6667C11.0809 9.25001 11.4167 9.5858 11.4167 10C11.4167 10.4142 11.0809 10.75 10.6667 10.75H5.33334C4.91912 10.75 4.58334 10.4142 4.58334 10Z" fill="currentColor"/>
<path fillRule="evenodd" clipRule="evenodd" d="M5.25 6.00001C5.25 5.5858 5.58579 5.25001 6 5.25001H6.00667C6.42088 5.25001 6.75667 5.5858 6.75667 6.00001C6.75667 6.41422 6.42088 6.75001 6.00667 6.75001H6C5.58579 6.75001 5.25 6.41422 5.25 6.00001Z" fill="currentColor"/>
<path fillRule="evenodd" clipRule="evenodd" d="M9.25 6.00001C9.25 5.5858 9.58579 5.25001 10 5.25001H10.0067C10.4209 5.25001 10.7567 5.5858 10.7567 6.00001C10.7567 6.41422 10.4209 6.75001 10.0067 6.75001H10C9.58579 6.75001 9.25 6.41422 9.25 6.00001Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_35_4804">
<rect width={size} height={size} fill="white"/>
</clipPath>
</defs>
</svg>
  )
)
FaceNeutral.displayName = "FaceNeutral"
export { FaceNeutral }
