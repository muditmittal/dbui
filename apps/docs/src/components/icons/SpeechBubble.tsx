import { forwardRef } from "react"

/** use:object Feedback | Platform | comment, chat, message */
const SpeechBubble = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement> & { size?: number }>(
  ({ className, size = 16, ...props }, ref) => (
    <svg ref={ref} className={className} {...props} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6 1C2.68629 1 0 3.68629 0 7C0 10.3137 2.68629 13 6 13V15.25C6 15.5533 6.18273 15.8268 6.46299 15.9429C6.74324 16.059 7.06583 15.9948 7.28033 15.7803L10.061 12.9997C13.3466 12.967 16 10.2934 16 7C16 3.68629 13.3137 1 10 1H6ZM1.5 7C1.5 4.51472 3.51472 2.5 6 2.5H10C12.4853 2.5 14.5 4.51472 14.5 7C14.5 9.48528 12.4853 11.5 10 11.5H9.75C9.55109 11.5 9.36032 11.579 9.21967 11.7197L7.5 13.4393V12.25C7.5 11.8358 7.16421 11.5 6.75 11.5H6C3.51472 11.5 1.5 9.48528 1.5 7Z" fill="currentColor"/>
    </svg>
  )
)
SpeechBubble.displayName = "SpeechBubble"
export { SpeechBubble }
