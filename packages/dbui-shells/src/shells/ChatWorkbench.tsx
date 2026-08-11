"use client"

import * as React from "react"
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "dbui-chat"
import { Button } from "dbui/components/ui/button"
import {
  EditorTabs,
  EditorTab,
  EditorTabIcon,
} from "dbui/components/ui/editor-tabs"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "dbui/components/ui/resizable"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "dbui/components/ui/tooltip"
import { Plus } from "dbui/components/icons/Plus"
import { SidebarCollapse } from "dbui/components/icons/SidebarCollapse"
import { SidebarOpen } from "dbui/components/icons/SidebarOpen"

/**
 * ChatWorkbench — Shell F. An agent conversation with the work it produced beside it.
 *
 * Four regions, left to right:
 *   1. Conversation rail — past threads. Resizable, hideable.
 *   2. Thread — the conversation and its composer. The primary surface.
 *   3. Preview — what the agent produced, as closeable tabs. Absent until opened.
 *   4. Tool rail — 44px icon strip. Opens a tool into the preview region.
 *
 * The shell owns layout and the thread's scroll container. It does not own turns:
 * pass those as children and compose them from `dbui-chat` — Message, Reasoning,
 * Task, Plan, Sources, Response. The composer is a slot for the same reason, since
 * a Prompt Input wired to a real runtime cannot be built from layout props.
 *
 * Region widths are props rather than constants because `TRACKER.md` P6 — default
 * sizes, minimums, persistence and resize behavior for panels — is still an open
 * decision. Nothing here persists a size across reloads; when P6 lands, that
 * belongs in one place rather than in this shell.
 */

export interface ChatConversationEntry {
  id: string
  title: string
  /** Section heading to file it under, e.g. "Today". Entries with none come first. */
  group?: string
}

export interface ChatPreviewTab {
  id: string
  label: string
  /** File-type or entity icon for the tab. */
  icon?: React.ReactNode
  content: React.ReactNode
}

export interface ChatWorkbenchTool {
  id: string
  /** Becomes the tooltip and the accessible name. */
  label: string
  icon: React.ReactNode
}

export interface ChatWorkbenchProps {
  /** Turns. Compose from dbui-chat; the shell wraps them in the scroll container. */
  children?: React.ReactNode
  /** The Prompt Input. Sits outside the scroll container so it never scrolls away. */
  composer?: React.ReactNode

  conversations?: ChatConversationEntry[]
  activeConversationId?: string
  onSelectConversation?: (id: string) => void
  onNewConversation?: () => void

  /** Rail visibility. Uncontrolled unless onRailToggle is passed. */
  railHidden?: boolean
  onRailToggle?: () => void

  /** Preview tabs. The region is absent when this is empty. */
  tabs?: ChatPreviewTab[]
  activeTabId?: string
  onSelectTab?: (id: string) => void
  onCloseTab?: (id: string) => void

  tools?: ChatWorkbenchTool[]
  activeToolId?: string
  onSelectTool?: (id: string) => void

  /**
   * Initial size of the rail and the preview, as a CSS length or percentage.
   * Strings, not bare numbers: react-resizable-panels v4 reads a bare number as
   * pixels, so `20` is a 20px sliver rather than a fifth of the width.
   */
  railSize?: number | string
  previewSize?: number | string
}

export function ChatWorkbench({
  children,
  composer,
  conversations = [],
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  railHidden: railHiddenProp,
  onRailToggle,
  tabs = [],
  activeTabId,
  onSelectTab,
  onCloseTab,
  tools = [],
  activeToolId,
  onSelectTool,
  railSize = "20%",
  previewSize = "38%",
}: ChatWorkbenchProps) {
  const [railHiddenState, setRailHiddenState] = React.useState(false)
  const isRailHidden = railHiddenProp ?? railHiddenState

  const handleRailToggle = () => {
    if (onRailToggle) onRailToggle()
    else setRailHiddenState((prev) => !prev)
  }

  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0]
  const hasPreview = tabs.length > 0

  // Conversations keep author order inside a group, and groups keep first-seen
  // order. Sorting either would reorder a list whose order is the recency the
  // caller already decided.
  const groups = React.useMemo(() => {
    const order: string[] = []
    const byGroup = new Map<string, ChatConversationEntry[]>()
    for (const entry of conversations) {
      const key = entry.group ?? ""
      if (!byGroup.has(key)) {
        byGroup.set(key, [])
        order.push(key)
      }
      byGroup.get(key)!.push(entry)
    }
    return order.map((key) => ({ label: key, entries: byGroup.get(key)! }))
  }, [conversations])

  return (
    <TooltipProvider>
      <div className="flex h-full min-h-0 w-full">
        <ResizablePanelGroup direction="horizontal">
          {!isRailHidden && (
            <>
              <ResizablePanel
                id="conversations"
                defaultSize={railSize}
                minSize="14%"
                maxSize="32%"
              >
                <div
                  // `surface-base`, not `surface-subtle`: the selected row uses
                  // the secondary Button fill, which is close enough to
                  // `surface-subtle` that a subtle rail erased the selection
                  // entirely. The rail reads as chrome from its border instead.
                  className="flex h-full min-h-0 flex-col border-r border-border-base bg-surface-base"
                >
                  <div className="flex h-10 shrink-0 items-center justify-between gap-1 px-2">
                    <span className="type-label-bold text-text-base">Chats</span>
                    <div className="flex items-center">
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              aria-label="New conversation"
                              onClick={onNewConversation}
                            />
                          }
                        >
                          <Plus />
                        </TooltipTrigger>
                        <TooltipContent>New conversation</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              aria-label="Hide conversation list"
                              onClick={handleRailToggle}
                            />
                          }
                        >
                          <SidebarCollapse />
                        </TooltipTrigger>
                        <TooltipContent>Hide conversation list</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  {/* p-1 is the scroll gutter — a scroll container clips all four
                      edges, so without it the focus ring on the first and last
                      row is cut off. */}
                  <div className="min-h-0 flex-1 overflow-y-auto p-1">
                    {groups.map((group) => (
                      <div key={group.label} className="mb-2 last:mb-0">
                        {group.label ? (
                          <div className="px-2 py-1 type-eyebrow text-text-subtle">
                            {group.label}
                          </div>
                        ) : null}
                        <div className="flex flex-col gap-0.5">
                          {group.entries.map((entry) => {
                            const isActive = entry.id === activeConversationId
                            return (
                              <Button
                                key={entry.id}
                                variant={isActive ? "secondary" : "ghost"}
                                size="md"
                                aria-current={isActive || undefined}
                                onClick={() => onSelectConversation?.(entry.id)}
                                title={entry.title}
                                className="w-full justify-start px-2"
                              >
                                {/* One line per conversation. The title is the
                                    only thing that scales with the rail, so it
                                    takes the whole row and truncates. */}
                                <span className="min-w-0 flex-1 truncate text-left">
                                  {entry.title}
                                </span>
                              </Button>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle />
            </>
          )}

          <ResizablePanel id="thread" minSize="30%">
            <div className="flex h-full min-h-0 flex-col bg-surface-base">
              {/* No border under the header and none over the composer. The
                  three regions still exist; what is gone is the ruling between
                  them, so the column reads as one panel rather than three
                  stacked boxes. */}
              <div className="flex h-10 shrink-0 items-center gap-1 px-2">
                {isRailHidden ? (
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label="Show conversation list"
                          onClick={handleRailToggle}
                        />
                      }
                    >
                      <SidebarOpen />
                    </TooltipTrigger>
                    <TooltipContent>Show conversation list</TooltipContent>
                  </Tooltip>
                ) : null}
                <span className="min-w-0 truncate type-label-bold text-text-base">
                  {conversations.find((entry) => entry.id === activeConversationId)
                    ?.title ?? "New conversation"}
                </span>
              </div>

              <Conversation>
                <ConversationContent>{children}</ConversationContent>
                <ConversationScrollButton />
              </Conversation>

              {composer ? (
                // A fade to the surface instead of a rule. The transcript scrolls
                // under it and dissolves rather than being cut off at a line,
                // which is what keeps the composer part of the panel instead of a
                // tray bolted to the bottom. -mt-6 pulls the fade up over the
                // last turn; the composer itself still sits outside the scroll
                // container, so it never scrolls away.
                <div className="pointer-events-none relative z-raised -mt-6 shrink-0 bg-gradient-to-t from-surface-base from-60% to-transparent p-3 pt-10">
                  <div className="pointer-events-auto">{composer}</div>
                </div>
              ) : null}
            </div>
          </ResizablePanel>

          {hasPreview && (
            <>
              <ResizableHandle />
              <ResizablePanel id="preview" defaultSize={previewSize} minSize="20%">
                <div className="flex h-full min-h-0 flex-col border-l border-border-base bg-surface-base">
                  {/* p-1 is the scroll gutter. A scroll container clips all four
                      edges, so a focused tab at either end would lose its ring. */}
                  <EditorTabs className="h-10 shrink-0 overflow-x-auto p-1">
                    {tabs.map((tab) => (
                      <EditorTab
                        key={tab.id}
                        active={tab.id === activeTab?.id}
                        onClick={() => onSelectTab?.(tab.id)}
                        onClose={() => onCloseTab?.(tab.id)}
                      >
                        {tab.icon ? (
                          <EditorTabIcon>{tab.icon}</EditorTabIcon>
                        ) : null}
                        {tab.label}
                      </EditorTab>
                    ))}
                  </EditorTabs>
                  <div className="min-h-0 flex-1 overflow-auto p-3">
                    {activeTab?.content}
                  </div>
                </div>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>

        {tools.length > 0 && (
          // Fixed width and outside the resizable group: a rail of icons has one
          // correct width. 48px, not the 44px `composition.md` records for the
          // editor tool rail — the size family carries no 44px stop, and 48px is
          // what the collapsed Product Nav already uses.
          <div className="flex w-12 shrink-0 flex-col items-center gap-1 border-l border-border-base bg-surface-subtle py-2">
            {tools.map((tool) => (
              <Tooltip key={tool.id}>
                <TooltipTrigger
                  render={
                    <Button
                      variant={tool.id === activeToolId ? "secondary" : "ghost"}
                      size="icon-md"
                      aria-label={tool.label}
                      aria-current={tool.id === activeToolId || undefined}
                      onClick={() => onSelectTool?.(tool.id)}
                    />
                  }
                >
                  {tool.icon}
                </TooltipTrigger>
                <TooltipContent side="left">{tool.label}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
