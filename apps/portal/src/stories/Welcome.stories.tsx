import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Shell } from "dbui-shells/shell"

const meta: Meta = {
  title: "Home",
  parameters: { layout: "centered" },
}

export default meta

const mono = "'SF Mono', ui-monospace, monospace"

/** Syntax-highlighted code block with copy button */
function CodeBlock({ code, copyText }: { code: string; copyText?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText ?? code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Simple syntax coloring
  const highlight = (line: string) => {
    return line.split(/(#[^\n]*|\/\/[^\n]*|"[^"]*"|'[^']*'|`[^`]*`|\b(?:import|from|export|const|function|return|default)\b|<\/?[A-Z][A-Za-z]*|\/?>)/g).map((part, i) => {
      if (!part) return null
      // Comments
      if (part.startsWith("#") || part.startsWith("//"))
        return <span key={i} style={{ color: "#8C8C8C" }}>{part}</span>
      // Strings
      if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'")) || (part.startsWith("`") && part.endsWith("`")))
        return <span key={i} style={{ color: "#277C43" }}>{part}</span>
      // Keywords
      if (/^(import|from|export|const|function|return|default)$/.test(part))
        return <span key={i} style={{ color: "#2272B4" }}>{part}</span>
      // JSX tags
      if (part.startsWith("<") || part === "/>" || part === ">")
        return <span key={i} style={{ color: "#C82D4C" }}>{part}</span>
      return <span key={i}>{part}</span>
    })
  }

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={handleCopy}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          background: copied ? "#277C43" : "#EBEBEB",
          color: copied ? "#fff" : "#6F6F6F",
          border: "none",
          borderRadius: 4,
          padding: "4px 10px",
          fontSize: 11,
          fontFamily: mono,
          cursor: "pointer",
          transition: "all 0.15s",
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre style={{
        fontFamily: mono,
        fontSize: 13,
        color: "#161616",
        background: "#F7F7F7",
        padding: "12px 14px",
        borderRadius: 4,
        lineHeight: "20px",
        margin: 0,
        overflowX: "auto",
      }}>
        {code.split("\n").map((line, i) => (
          <div key={i}>{highlight(line)}</div>
        ))}
      </pre>
    </div>
  )
}

/** Live Base Shell rendered at 0.55 scale inside browser chrome */
function LivePreview() {
  return (
    <div style={{
      border: "1px solid #CBCBCB",
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: "0 8px 40px rgba(0,0,0,0.08), 0 2px 16px rgba(0,0,0,0.04)",
      marginBottom: 40,
    }}>
      {/* Browser toolbar */}
      <div style={{
        background: "#F7F7F7",
        borderBottom: "1px solid #EBEBEB",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}>
        <div style={{ display: "flex", gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#EC6A5E", display: "block" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#F4BF4F", display: "block" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#61C554", display: "block" }} />
        </div>
        <div style={{
          flex: 1,
          background: "#fff",
          border: "1px solid #EBEBEB",
          borderRadius: 6,
          padding: "5px 12px",
          fontSize: 12,
          color: "#8C8C8C",
          fontFamily: mono,
        }}>
          databricks.com
        </div>
      </div>

      {/* Scaled-down Base Shell */}
      <div style={{ width: 835, height: 452, overflow: "hidden" }}>
        <div style={{
          width: 1440,
          height: 820,
          transform: "scale(0.58)",
          transformOrigin: "top left",
        }}>
          <Shell defaultActive="catalog">
            <div className="flex items-center justify-center h-full text-[13px] text-muted-foreground">
              Content goes here — every product page starts with this shell.
            </div>
          </Shell>
        </div>
      </div>
    </div>
  )
}

const steps = [
  {
    label: "First time — install once, use everywhere",
    code: `# Clone to a shared location (one-time)
git clone https://github.com/muditmittal/dbui.git ~/dbui
cd ~/dbui && yarn install`,
    copyText: `git clone https://github.com/muditmittal/dbui.git ~/dbui
cd ~/dbui && yarn install`,
    note: "This is your local copy of the design system. All your projects reference it.",
  },
  {
    label: "Set up a new project",
    code: `# Copy the AI rules file into your project root
cp ~/dbui/packages/dbui/CLAUDE.md ./

# Add path aliases to your tsconfig.json or bundler config
# "dbui/*" → "~/dbui/packages/dbui/src/*"
# "dbui-shells/*" → "~/dbui/packages/dbui-shells/src/*"`,
    copyText: `cp ~/dbui/packages/dbui/CLAUDE.md ./`,
    note: "CLAUDE.md teaches Claude every component, token, and pattern. The path aliases let your code import from DBUI.",
  },
  {
    label: "Every page starts with the Base Shell",
    code: `import { Shell } from "dbui-shells/surfaces/Shell"

<Shell defaultActive="catalog">
  <YourPageContent />
</Shell>`,
    copyText: `import { Shell } from "dbui-shells/surfaces/Shell"`,
    note: "Platform header, sidebar nav, content surface, and Genie assistant panel — all included.",
  },
  {
    label: "Build with DBUI components",
    code: `import { Button, ButtonIcon } from "dbui/components/ui/button"
import { Search } from "dbui/components/icons/Search"

<Button variant="outline">
  <ButtonIcon><Search /></ButtonIcon>
  Search catalogs
</Button>`,
    copyText: `import { Button, ButtonIcon } from "dbui/components/ui/button"
import { Search } from "dbui/components/icons/Search"`,
    note: "46 components, 451 icons — all tree-shakeable.",
  },
  {
    label: "Update to latest",
    code: `cd ~/dbui && git pull && yarn install`,
    copyText: `cd ~/dbui && git pull && yarn install`,
    note: "All projects referencing ~/dbui pick up the changes immediately. No reinstall needed.",
  },
]

export const Default: StoryObj = {
  render: () => (
    <div style={{
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
      maxWidth: 860,
      margin: "0 auto",
      padding: "48px 24px",
      color: "#161616",
    }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{
          fontFamily: "'SF Pro Display', -apple-system, sans-serif",
          fontSize: 32, fontWeight: 600, lineHeight: "40px",
          margin: "0 0 8px 0",
        }}>
          DBUI Design System
        </h1>
        <p style={{ fontSize: 15, lineHeight: "24px", color: "#6F6F6F", margin: 0 }}>
          Databricks component library built on shadcn/ui, reskinned with DuBois design tokens.
          Clone the repo, drop CLAUDE.md into your project, and start building.
        </p>
      </div>

      {/* Live Base Shell preview */}
      <LivePreview />

      {/* Install */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 18, fontWeight: 600, margin: "0 0 16px 0" }}>
          Getting Started
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {steps.map((step) => (
            <div key={step.label} style={{ border: "1px solid #EBEBEB", borderRadius: 8, padding: "16px 20px" }}>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, color: "#8C8C8C", marginBottom: 8 }}>{step.label}</div>
              <CodeBlock code={step.code} copyText={step.copyText} />
              <div style={{ fontSize: 12, color: "#8C8C8C", marginTop: 8 }}>{step.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 40 }}>
        {[
          { number: "46", label: "Components" },
          { number: "451", label: "Icons" },
          { number: "162", label: "Tokens" },
          { number: "8", label: "Text Styles" },
        ].map((stat) => (
          <div key={stat.label} style={{ background: "#F7F7F7", borderRadius: 8, padding: 16 }}>
            <div style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 28, fontWeight: 600, color: "#2272B4", lineHeight: 1 }}>{stat.number}</div>
            <div style={{ fontSize: 12, color: "#6F6F6F", marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Sections */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
        {[
          { title: "Actions", desc: "Buttons, icon buttons, split buttons, toggles, and segment controls.", list: "Button · IconButton · SplitButton · Toggle · SegmentControl" },
          { title: "Controls", desc: "Form inputs, selects, comboboxes, checkboxes, radios, switches, and sliders.", list: "Input · Select · Combobox · Checkbox · Radio · Switch · Slider" },
          { title: "Content", desc: "Data display components: tables, tags, badges, avatars, status indicators.", list: "Table · Tag · Badge · Avatar · Status · Card · Tabs" },
          { title: "Overlays", desc: "Popovers, dialogs, drawers, dropdown menus, tooltips, and toasts.", list: "Dialog · DropdownMenu · Tooltip · Popover · Drawer · Toast" },
          { title: "Shells", desc: "Base Shell with Platform Header, sidebar nav, content surface, and Assistant Panel.", list: "Shell · PlatformHeader · PlatformNav · AssistantPanel" },
          { title: "Foundations", desc: "Design tokens (colors, radius, spacing, shadows) and the full icon set.", list: "Tokens · Icons (451) · Typography" },
        ].map((section) => (
          <div key={section.title} style={{ border: "1px solid #EBEBEB", borderRadius: 8, padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 6px 0" }}>{section.title}</h3>
            <p style={{ fontSize: 13, lineHeight: "20px", color: "#6F6F6F", margin: 0 }}>{section.desc}</p>
            <div style={{ fontSize: 12, color: "#8C8C8C", marginTop: 8 }}>{section.list}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #EBEBEB", paddingTop: 24, fontSize: 12, color: "#8C8C8C", display: "flex", gap: 24 }}>
        <span>DBUI v0.1.0</span>
        <span>13px / 20px base · SF Pro Text</span>
        <a href="https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv" target="_blank" rel="noopener" style={{ color: "#2272B4", textDecoration: "none" }}>Figma Source ↗</a>
        <a href="https://github.com/muditmittal/dbui" target="_blank" rel="noopener" style={{ color: "#2272B4", textDecoration: "none" }}>GitHub ↗</a>
      </div>
    </div>
  ),
}
