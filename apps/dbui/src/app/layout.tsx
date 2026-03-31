import type { Metadata } from "next"
import { Fira_Code } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Nav } from "@/components/nav"
import "./globals.css"

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "DBUI — Databricks UI Kit",
  description:
    "DuBois design language on shadcn components. 172 design tokens, 413 icons, theme-switchable, LLM-native.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${firaCode.variable} antialiased`}>
        <ThemeProvider defaultMode="light">
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
