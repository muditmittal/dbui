"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export const themes = {
  light: {
    bg: "#FFFFFF",
    bgSecondary: "#F7F7F7",
    text: "#161616",
    textMuted: "#6F6F6F",
    textSubtle: "#939393",
    border: "#EBEBEB",
    borderSubtle: "#F7F7F7",
    primary: "#2272B4",
    success: "#277C43",
    cardBg: "#F7F7F7",
    hoverBg: "#F7F7F7",
    tooltipBg: "#161616",
    tooltipText: "#E8ECF0",
  },
  dark: {
    bg: "#11171C",
    bgSecondary: "#1F272D",
    text: "#E8ECF0",
    textMuted: "#92A4B3",
    textSubtle: "#5F7281",
    border: "#1F272D",
    borderSubtle: "#37444F",
    primary: "#4299E0",
    success: "#3BA65E",
    cardBg: "#1F272D",
    hoverBg: "#1F272D",
    tooltipBg: "#E8ECF0",
    tooltipText: "#11171C",
  },
} as const

export type ThemeMode = "light" | "dark"
export type Theme = {
  bg: string
  bgSecondary: string
  text: string
  textMuted: string
  textSubtle: string
  border: string
  borderSubtle: string
  primary: string
  success: string
  cardBg: string
  hoverBg: string
  tooltipBg: string
  tooltipText: string
}

const ThemeContext = createContext<{
  mode: ThemeMode
  t: Theme
  toggle: () => void
}>({
  mode: "light",
  t: themes.light,
  toggle: () => {},
})

export function ThemeProvider({ children, defaultMode = "light" }: { children: ReactNode; defaultMode?: ThemeMode }) {
  const [mode, setMode] = useState<ThemeMode>(defaultMode)
  const t = themes[mode]
  const toggle = useCallback(() => setMode((m) => (m === "light" ? "dark" : "light")), [])

  return (
    <ThemeContext.Provider value={{ mode, t, toggle }}>
      <div style={{ backgroundColor: t.bg, color: t.text, minHeight: "100vh", transition: "background-color 0.2s, color 0.2s" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
