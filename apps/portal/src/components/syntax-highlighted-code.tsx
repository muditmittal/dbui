"use client"

import { useMemo } from "react"
import type { Theme } from "@/components/theme-provider"
import { useTheme } from "@/components/theme-provider"

const KEYWORD =
  /^(?:import|export|default|from|const|let|var|function|return|if|else|new|typeof|as|async|await|true|false|null|undefined|className|variant|disabled|type|interface|extends|implements|void|this|keyof|readonly|public|private|protected|static|enum)\b/

type Tok = { k: "kw" | "str" | "com" | "tag" | "pun" | "pln"; v: string }

function tokenizeTsx(src: string): Tok[] {
  const out: Tok[] = []
  let i = 0
  const n = src.length

  while (i < n) {
    const c = src[i]!

    if (c === "\n" || c === "\r" || c === " " || c === "\t") {
      let j = i + 1
      while (j < n && /[\s]/.test(src[j]!)) j++
      out.push({ k: "pln", v: src.slice(i, j) })
      i = j
      continue
    }

    if (c === "/" && src[i + 1] === "/") {
      let j = i + 2
      while (j < n && src[j] !== "\n") j++
      out.push({ k: "com", v: src.slice(i, j) })
      i = j
      continue
    }

    if (c === "/" && src[i + 1] === "*") {
      let j = i + 2
      while (j < n - 1 && !(src[j] === "*" && src[j + 1] === "/")) j++
      j = Math.min(j + 2, n)
      out.push({ k: "com", v: src.slice(i, j) })
      i = j
      continue
    }

    if (c === '"') {
      let j = i + 1
      while (j < n && src[j] !== '"') {
        if (src[j] === "\\") j++
        j++
      }
      j = Math.min(j + 1, n)
      out.push({ k: "str", v: src.slice(i, j) })
      i = j
      continue
    }

    if (c === "'") {
      let j = i + 1
      while (j < n && src[j] !== "'") {
        if (src[j] === "\\") j++
        j++
      }
      j = Math.min(j + 1, n)
      out.push({ k: "str", v: src.slice(i, j) })
      i = j
      continue
    }

    if (c === "`") {
      let j = i + 1
      while (j < n && src[j] !== "`") {
        if (src[j] === "\\") {
          j += 2
          continue
        }
        if (src[j] === "$" && src[j + 1] === "{") {
          j += 2
          let depth = 1
          while (j < n && depth > 0) {
            if (src[j] === "{") depth++
            else if (src[j] === "}") depth--
            j++
          }
          continue
        }
        j++
      }
      j = Math.min(j + 1, n)
      out.push({ k: "str", v: src.slice(i, j) })
      i = j
      continue
    }

    if (c === "<" && i + 1 < n && /[A-Za-z/]/.test(src[i + 1]!)) {
      let j = i + 1
      while (j < n && src[j] !== ">") j++
      j = Math.min(j + 1, n)
      out.push({ k: "tag", v: src.slice(i, j) })
      i = j
      continue
    }

    if (/[A-Za-z_$]/.test(c)) {
      let j = i + 1
      while (j < n && /[\w$]/.test(src[j]!)) j++
      const word = src.slice(i, j)
      out.push({ k: KEYWORD.test(word) ? "kw" : "pln", v: word })
      i = j
      continue
    }

    out.push({ k: "pun", v: c })
    i++
  }

  return out
}

function colorsFor(t: Theme, mode: "light" | "dark") {
  const tag = mode === "dark" ? "#C678DD" : "#7C3AED"
  const str = mode === "dark" ? "#98C379" : "#0F766E"
  const com = t.textSubtle
  const kw = t.primary
  const pun = t.textMuted
  const pln = t.text
  return { tag, str, com, kw, pun, pln }
}

export function SyntaxHighlightedCode({
  code,
  className = "",
}: {
  code: string
  className?: string
}) {
  const { t, mode } = useTheme()
  const cols = colorsFor(t, mode)

  const nodes = useMemo(() => {
    const tokens = tokenizeTsx(code.trim())
    return tokens.map((tok, idx) => {
      const color =
        tok.k === "kw"
          ? cols.kw
          : tok.k === "str"
            ? cols.str
            : tok.k === "com"
              ? cols.com
              : tok.k === "tag"
                ? cols.tag
                : tok.k === "pun"
                  ? cols.pun
                  : cols.pln
      return (
        <span key={idx} style={{ color }}>
          {tok.v}
        </span>
      )
    })
  }, [code, cols.com, cols.kw, cols.pln, cols.pun, cols.str, cols.tag])

  return (
    <pre
      className={`font-mono text-[12px] leading-[1.6] p-4 rounded-lg overflow-x-auto whitespace-pre ${className}`}
      style={{ backgroundColor: t.cardBg, border: `1px solid ${t.border}` }}
    >
      <code>{nodes}</code>
    </pre>
  )
}
