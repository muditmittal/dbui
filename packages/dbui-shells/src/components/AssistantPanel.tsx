import React from "react"
import { Button, ButtonChevron } from "dbui/components/ui/button"
import { Close } from "dbui/components/icons/Close"
import { Send } from "dbui/components/icons/Send"
import { Pencil } from "dbui/components/icons/Pencil"
import { Gear } from "dbui/components/icons/Gear"
import { Overflow } from "dbui/components/icons/Overflow"
import { Image } from "dbui/components/icons/Image"

/**
 * AssistantPanel — agentic chat side panel (Genie Code).
 *
 * Composition: 360px fixed-width right panel with header, empty state, and input bar.
 * Toggled by the Genie Code icon in PlatformHeader.
 */
export function AssistantPanel({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex w-[360px] shrink-0 flex-col border border-border bg-background rounded-md" style={{ marginLeft: 4 }}>
      {/* Header */}
      <div className="flex items-center justify-between pl-2 pr-1 h-10">
        <div className="flex items-center gap-1">
          <span className="text-[13px] font-semibold text-foreground">Genie Code</span>
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
        <svg width="64" height="64" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="assistant-empty-gradient" x1="0" y1="8" x2="16" y2="8" gradientUnits="userSpaceOnUse">
              <stop offset="24%" stopColor="#4299E0" />
              <stop offset="47%" stopColor="#CA42E0" />
              <stop offset="76%" stopColor="#FF5F46" />
            </linearGradient>
          </defs>
          <path
            fill="url(#assistant-empty-gradient)"
            d="M0 8.75v-.744c0-.97.786-1.756 1.756-1.756h1.1c.372 0 .712.21.878.543l.595 1.188a4.104 4.104 0 0 0 7.342 0l.595-1.188.069-.12a.98.98 0 0 1 .809-.423H16v1.5h-2.536l-.451.902a5.604 5.604 0 0 1-10.026 0l-.45-.902h-.781a.256.256 0 0 0-.256.256v.744a.5.5 0 0 0 .5.5v1.5a2 2 0 0 1-2-2m10.5 4v1.5h-5v-1.5zM8 1.75a.75.75 0 0 1 .74.621l.226 1.303a.75.75 0 0 0 .61.61l1.303.227a.75.75 0 0 1 0 1.478l-1.303.227a.75.75 0 0 0-.61.61L8.739 8.13a.75.75 0 0 1-1.478 0l-.227-1.303a.75.75 0 0 0-.61-.61L5.12 5.989a.75.75 0 0 1 0-1.478l1.303-.227a.75.75 0 0 0 .61-.61l.227-1.303.035-.13A.75.75 0 0 1 8 1.75"
          />
        </svg>

        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[18px] font-semibold text-foreground">Genie Code</span>
          <span className="text-[13px] text-primary font-semibold">Preview</span>
        </div>

        <p className="text-[13px] leading-[20px] text-muted-foreground">
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
          className="rounded-md shadow-xs"
          style={{
            border: "1px solid transparent",
            backgroundImage:
              "linear-gradient(var(--background), var(--background)), linear-gradient(90deg, #4299E0 24%, #CA42E0 47%, #FF5F46 76%)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }}
        >
          {/* Text input */}
          <div className="px-3 py-2 min-h-[36px]">
            <span className="text-[13px] text-muted-foreground">@ for objects, / for commands, ↑↓ for history</span>
          </div>
          {/* Toolbar */}
          <div className="flex items-center justify-between px-2 pb-2">
            <div className="flex items-center gap-0.5">
              <Button variant="ghost" size="icon-sm" aria-label="Attach image">
                <Image />
              </Button>
              <span className="text-[13px] text-muted-foreground">@</span>
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
        <span className="text-[11px] text-muted-foreground">Always review the accuracy of responses.</span>
      </div>
    </div>
  )
}
