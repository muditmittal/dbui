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
    "DuBois design language on shadcn/ui — 189 design tokens, 450 icons, theme-switchable, LLM-native. Prototype Databricks features, instantly.",
  openGraph: {
    title: "DBUI — Databricks UI Kit",
    description:
      "DuBois design language on shadcn/ui — 189 design tokens, 450 icons, theme-switchable, LLM-native. Prototype Databricks features, instantly.",
    siteName: "DBUI",
    type: "website",
    url: "https://dbuidesign.vercel.app",
  },
  twitter: {
    card: "summary",
    title: "DBUI — Databricks UI Kit",
    description:
      "DuBois design language on shadcn/ui — 189 tokens, 450 icons, light/dark themes. Prototype Databricks features, instantly.",
  },
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
