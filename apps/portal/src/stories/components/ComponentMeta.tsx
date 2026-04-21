import React from "react"
import { parseComponentDoc } from "./parseComponentDoc"
import variantMappings from "./variant-mappings.json"

type VariantData = {
  figma?: string[]
  code?: string[]
}

type Props = {
  /** Raw source code of the component file — parsed for @standard, @guideline, @constraint, @figma */
  source: string
  /** Key into variant-mappings.json (e.g. "button", "select") for the Property|Figma|Code table */
  componentKey?: string
}

export function ComponentMeta({ source, componentKey }: Props) {
  const doc = parseComponentDoc(source)
  if (!doc) return null

  const { guidelines, constraints, figmaUrl } = doc
  const mappingEntry = componentKey
    ? (variantMappings as Record<string, { figmaCode?: Record<string, VariantData> }>)[componentKey]
    : undefined
  const variants = mappingEntry?.figmaCode

  const hasGuidelines = guidelines.length > 0
  const hasConstraints = constraints.length > 0
  const hasVariants = variants && Object.keys(variants).length > 0

  return (
    <div style={{
      marginTop: 32,
      padding: "24px 24px 20px",
      borderRadius: 8,
      background: "#F7F7F7",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
      fontSize: 13,
      lineHeight: "20px",
      color: "#161616",
    }}>
      {/* Figma link */}
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginBottom: 16 }}>
        {figmaUrl && (
          <a href={figmaUrl} target="_blank" rel="noopener" style={{ color: "#2272B4", textDecoration: "none", fontSize: 12 }}>
            Figma ↗
          </a>
        )}
      </div>

      {/* Variant Mapping Table */}
      {hasVariants && (
        <div style={{ marginBottom: 20 }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Property</th>
                <th style={thStyle}>Figma</th>
                <th style={thStyle}>Code</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(variants!).map(([prop, data]) => {
                const figmaValues = Array.isArray(data) ? data : (data?.figma || [])
                const codeValues = Array.isArray(data) ? [] : (data?.code || [])
                return (
                  <tr key={prop}>
                    <td style={tdStyle}>
                      <span style={{ fontWeight: 600 }}>{prop}</span>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {figmaValues.map((v: string) => (
                          <span key={v} style={tagStyle}>{v}</span>
                        ))}
                      </div>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {codeValues.map((v: string) => (
                          <span key={v} style={{ ...tagStyle, background: "#EEF4FB", color: "#2272B4" }}>{v}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Guidelines */}
      {hasGuidelines && (
        <div style={{ borderTop: hasVariants ? "1px solid #EBEBEB" : "none", paddingTop: hasVariants ? 16 : 0, marginBottom: hasConstraints ? 20 : 0 }}>
          <div style={sectionHeaderStyle}>Guidelines</div>
          <ul style={listStyle}>
            {guidelines.map((g, i) => (
              <li key={i} style={listItemStyle}>{g}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Constraints */}
      {hasConstraints && (
        <div style={{ borderTop: "1px solid #EBEBEB", paddingTop: 16 }}>
          <div style={sectionHeaderStyle}>Constraints</div>
          <ul style={listStyle}>
            {constraints.map((c, i) => (
              <li key={i} style={listItemStyle}>
                <span style={{ color: "#C82D4C", fontWeight: 600, marginRight: 4 }}>✕</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

const sectionHeaderStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: 0.5,
  color: "#8C8C8C",
  marginBottom: 8,
}

const listStyle: React.CSSProperties = {
  margin: 0,
  padding: 0,
  listStyle: "none",
}

const listItemStyle: React.CSSProperties = {
  padding: "4px 0",
  fontSize: 13,
  lineHeight: "20px",
  color: "#404040",
}

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 12,
}

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "6px 8px",
  borderBottom: "1px solid #EBEBEB",
  color: "#8C8C8C",
  fontWeight: 600,
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: 0.5,
}

const tdStyle: React.CSSProperties = {
  padding: "8px 8px",
  borderBottom: "1px solid #F7F7F7",
  verticalAlign: "top",
}

const tagStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "1px 6px",
  background: "#F7F7F7",
  borderRadius: 3,
  fontSize: 11,
  fontFamily: "'SF Mono', ui-monospace, monospace",
  color: "#404040",
}
