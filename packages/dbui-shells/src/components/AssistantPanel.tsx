import { Button, ButtonChevron } from "dbui/components/ui/button"
import { Close } from "dbui/components/icons/Close"
import { Send } from "dbui/components/icons/Send"
import { Pencil } from "dbui/components/icons/Pencil"
import { Gear } from "dbui/components/icons/Gear"
import { Overflow } from "dbui/components/icons/Overflow"
import { Image } from "dbui/components/icons/Image"
import { GenieCode } from "dbui/components/icons/GenieCode"

/**
 * AssistantPanel — agentic chat side panel (Genie Code).
 *
 * Composition: 360px fixed-width right panel with header, empty state, and input bar.
 * Toggled by the Genie Code icon in PlatformHeader.
 */
export function AssistantPanel({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex w-[360px] shrink-0 flex-col border border-border-base bg-surface-base shape-container" style={{ marginLeft: 4 }}>
      {/* Header */}
      <div className="flex items-center justify-between pl-2 pr-1 h-10">
        <div className="flex items-center gap-1">
          <span className="type-label-bold text-text-base">Genie Code</span>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="icon-md" aria-label="New conversation">
            <Pencil />
          </Button>
          <Button variant="ghost" size="icon-md" aria-label="Settings">
            <Gear />
          </Button>
          <Button variant="ghost" size="icon-md" aria-label="More options">
            <Overflow />
          </Button>
          <Button variant="ghost" size="icon-md" aria-label="Close assistant" onClick={onClose}>
            <Close />
          </Button>
        </div>
      </div>

      {/* Empty state */}
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
        {/* Large gradient icon */}
        <div
          className="flex size-16 items-center justify-center shape-container-lg"
          style={{ backgroundImage: "var(--ai-gradient)" }}
          aria-hidden
        >
          <GenieCode className="size-8 text-action-label-inverse-base" />
        </div>

        <div className="flex flex-col items-center gap-0.5">
          <span className="type-title-3 text-text-base">Genie Code</span>
          <span className="type-label-bold text-link-base">Preview</span>
        </div>

        <p className="type-body text-text-subtle">
          Ask questions about AI Gateway features, understand configurations, debug errors, or learn how to migrate from the legacy gateway.
        </p>

        {/* Suggestion pills */}
        <div className="flex flex-wrap gap-2 justify-center">
          {["What is AI Gateway?", "Supported models", "Getting started", "Migrate from Legacy"].map((label) => (
            <Button
              key={label}
              variant="secondary"
              className="hover:!bg-transparent hover:[background-image:var(--ai-gradient-hover)] active:!bg-transparent active:[background-image:var(--ai-gradient-press)]"
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="px-3 pt-2">
        <div
          className="shape-container shadow-control"
          style={{
            border: "1px solid transparent",
            backgroundImage:
              "linear-gradient(var(--db-surface-base), var(--db-surface-base)), var(--ai-gradient)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }}
        >
          {/* Text input */}
          <div className="px-3 py-2">
            <span className="type-label text-text-subtle">@ for objects, / for commands, ↑↓ for history</span>
          </div>
          {/* Toolbar */}
          <div className="flex items-center justify-between px-2 pb-2">
            <div className="flex items-center gap-0.5">
              <Button variant="ghost" size="icon-sm" aria-label="Attach image">
                <Image />
              </Button>
              <span className="type-label text-text-subtle">@</span>
            </div>
            <div className="flex items-center gap-0.5">
              <Button variant="ghost" size="sm">
                Agent
                <ButtonChevron />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Send">
                <Send />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-4 py-1 text-center">
        <span className="type-hint text-text-subtle">Always review the accuracy of responses.</span>
      </div>
    </div>
  )
}
