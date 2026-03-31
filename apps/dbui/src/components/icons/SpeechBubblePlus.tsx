import { forwardRef } from "react"

/** use:action new comment | add feedback, start thread */
const SpeechBubblePlus = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6 1C2.68629 1 0 3.68629 0 7V7.25C0 10.1714 2.17873 12.584 5 12.9515V15.25C5 15.5533 5.18273 15.8268 5.46299 15.9429C5.74324 16.059 6.06583 15.9948 6.28033 15.7803L9.06066 13H10C13.3137 13 16 10.3137 16 7C16 3.68629 13.3137 1 10 1H6ZM1.5 7C1.5 4.51472 3.51472 2.5 6 2.5H10C12.4853 2.5 14.5 4.51472 14.5 7C14.5 9.48528 12.4853 11.5 10 11.5H8.75C8.55109 11.5 8.36032 11.579 8.21967 11.7197L6.5 13.4393V12.25C6.5 11.8358 6.16421 11.5 5.75 11.5C3.40279 11.5 1.5 9.59721 1.5 7.25V7ZM8.75 6.25V4H7.25V6.25H5V7.75H7.25V10H8.75V7.75H11V6.25H8.75Z" fill="currentColor"/>
    </svg>
  )
)
SpeechBubblePlus.displayName = "SpeechBubblePlus"
export { SpeechBubblePlus }
