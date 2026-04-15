import React from "react"

type ManifestData = {
  $component: string
  $figmaId?: string
  $figmaUrl?: string
  $codePath?: string
  variants?: Record<string, {
    figma?: string[]
    code?: string[]
    mapping?: Record<string, string>
  }>
  guidelines?: string[]
  constraints?: string[]
  innerComponents?: Record<string, any>
  storyControls?: Record<string, string>
}

export function ComponentMeta({ manifest }: { manifest: ManifestData }) {
  const hasGuidelines = manifest.guidelines && manifest.guidelines.length > 0
  const hasConstraints = manifest.constraints && manifest.constraints.length > 0
  const hasVariants = manifest.variants && Object.keys(manifest.variants).length > 0

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
      {/* Source + Figma link */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        {manifest.$codePath ? (
          <code style={codeStyle}>{manifest.$codePath}</code>
        ) : <span />}
        {manifest.$figmaUrl && (
          <a href={manifest.$figmaUrl} target="_blank" rel="noopener" style={{ color: "#2272B4", textDecoration: "none", fontSize: 12 }}>
            Figma ↗
          </a>
        )}
      </div>

      {/* Variant Mapping */}
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
              {Object.entries(manifest.variants!).map(([prop, data]) => (
                <tr key={prop}>
                  <td style={tdStyle}>
                    <span style={{ fontWeight: 600 }}>{prop}</span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {data.figma?.map(v => (
                        <span key={v} style={tagStyle}>{v}</span>
                      ))}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {data.code?.map(v => (
                        <span key={v} style={{ ...tagStyle, background: "#EEF4FB", color: "#2272B4" }}>{v}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Guidelines */}
      {hasGuidelines && (
        <div style={{ borderTop: "1px solid #EBEBEB", paddingTop: 16, marginBottom: 20 }}>
          <div style={sectionHeaderStyle}>Guidelines</div>
          <ul style={listStyle}>
            {manifest.guidelines!.map((g, i) => (
              <li key={i} style={listItemStyle}>{g}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Constraints */}
      {hasConstraints && (
        <div style={{ borderTop: "1px solid #EBEBEB", paddingTop: 16, marginBottom: 20 }}>
          <div style={sectionHeaderStyle}>Constraints</div>
          <ul style={listStyle}>
            {manifest.constraints!.map((c, i) => (
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

const codeStyle: React.CSSProperties = {
  fontFamily: "'SF Mono', ui-monospace, monospace",
  fontSize: 11,
  background: "#F7F7F7",
  padding: "1px 4px",
  borderRadius: 2,
}
