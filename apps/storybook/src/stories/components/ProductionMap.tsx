import React, { useState, useCallback, useEffect } from "react"
import variantMappings from "./variant-mappings.json"

type VariantRow = {
  variant: string
  dbui: string
  dubois: string | null
  /** The import + usage code block engineers copy */
  codeBlock?: string
}

type ProductionMapProps = {
  componentKey: string
}

type MappingEntry = {
  figmaCode?: Record<string, unknown>
  production?: VariantRow[]
}

export function ProductionMap({ componentKey }: ProductionMapProps) {
  const entry = (variantMappings as Record<string, MappingEntry>)[componentKey]
  const rows: VariantRow[] = entry?.production ?? []

  const [expanded, setExpanded] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 1500)
    return () => clearTimeout(t)
  }, [toast])

  const handleCopy = useCallback((row: VariantRow) => {
    const code = row.codeBlock || row.dubois || ""
    if (!code) return
    navigator.clipboard.writeText(code).then(() => {
      setToast(row.variant)
    })
  }, [])

  if (rows.length === 0) return null

  return (
    <>
      <div style={{
        marginTop: 24,
        border: "1px solid #EBEBEB",
        borderRadius: 8,
        overflow: "hidden",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
      }}>
        {/* Collapsed header */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            background: expanded ? "#FAFAFA" : "#FFFFFF",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
            color: "#161616",
            fontFamily: "inherit",
          }}
        >
          <span>Variant Map for Production</span>
          <svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            style={{
              transition: "transform 150ms ease",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <path d="M4 6L8 10L12 6" stroke="#8C8C8C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Expanded table */}
        {expanded && (
          <div style={{ borderTop: "1px solid #EBEBEB" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#FAFAFA" }}>
                  <th style={thStyle}>Variant</th>
                  <th style={thStyle}>DBUI Code</th>
                  <th style={thStyle}>Universe Code</th>
                  <th style={{ ...thStyle, width: 40 }} />
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <VariantRowItem
                    key={idx}
                    row={row}
                    onCopy={handleCopy}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Toast — matches Icons page */}
      {toast && (
        <div style={{
          position: "fixed",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderRadius: 6,
          background: "#161616",
          padding: "8px 16px",
          fontSize: 13,
          lineHeight: "20px",
          color: "#FFFFFF",
          boxShadow: "0 8px 40px rgba(0,0,0,0.13)",
          whiteSpace: "nowrap",
        }}>
          Copied import for <span style={{ fontWeight: 600 }}>{toast}</span>
        </div>
      )}
    </>
  )
}

function VariantRowItem({
  row,
  onCopy,
}: {
  row: VariantRow
  onCopy: (row: VariantRow) => void
}) {
  const [hovered, setHovered] = useState(false)
  const hasDubois = row.dubois !== null && row.dubois !== "—"

  return (
    <tr
      style={{
        background: hovered && hasDubois ? "#F5F9FD" : "transparent",
        cursor: hasDubois ? "pointer" : "default",
        transition: "background 100ms ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => hasDubois && onCopy(row)}
    >
      <td style={tdStyle}>
        <span style={{ fontWeight: 600, color: "#161616" }}>{row.variant}</span>
      </td>
      <td style={tdStyle}>
        <code style={codeTagStyle}>{row.dbui}</code>
      </td>
      <td style={tdStyle}>
        {hasDubois ? (
          <code style={{ ...codeTagStyle, background: "#EEF4FB", color: "#2272B4" }}>
            {row.dubois}
          </code>
        ) : (
          <span style={{ fontSize: 12, color: "#CBCBCB", fontStyle: "italic" }}>
            No DuBois equivalent
          </span>
        )}
      </td>
      <td style={{ ...tdStyle, width: 40, textAlign: "center" }}>
        {hasDubois && (
          <svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            style={{
              opacity: hovered ? 1 : 0,
              transition: "opacity 100ms ease",
            }}
          >
            <rect x="5.5" y="2.5" width="8" height="10" rx="1.5" stroke="#8C8C8C" strokeWidth="1" fill="none" />
            <rect x="2.5" y="3.5" width="8" height="10" rx="1.5" stroke="#8C8C8C" strokeWidth="1" fill="#FFFFFF" />
          </svg>
        )}
      </td>
    </tr>
  )
}

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "8px 16px",
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: 0.5,
  color: "#8C8C8C",
  borderBottom: "1px solid #EBEBEB",
}

const tdStyle: React.CSSProperties = {
  padding: "10px 16px",
  borderBottom: "1px solid #F3F3F3",
  verticalAlign: "middle",
}

const codeTagStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "2px 8px",
  background: "#F7F7F7",
  borderRadius: 4,
  fontSize: 12,
  fontFamily: "'SF Mono', ui-monospace, monospace",
  color: "#404040",
}
