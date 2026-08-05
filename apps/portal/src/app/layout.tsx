import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "DBUI — an AI-first design system for data and AI workbenches",
  description:
    "Tokens, icons, components and page shells that agents and people read from the same source.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/*
          Figtree and Commit Mono, matching the Storybook preview. Commit Mono is
          not on Google Fonts, so it comes from Fontsource. Loaded by link rather
          than next/font because the registry is unreachable behind the corporate
          proxy, so the packages cannot be installed.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap"
        />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fontsource/commit-mono/400.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fontsource/commit-mono/700.css" />
        {/*
          Applies the type scale before first paint, so a reader who chose 1.4x
          never sees the page reflow from 1x. `?scale=` wins over the stored
          value so a link can pin one multiplier for a screenshot or a review.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=new URLSearchParams(location.search).get("scale")||localStorage.getItem("dbui-type-scale");if(s==="1.2"||s==="1.4")document.documentElement.dataset.typeScale=s}catch(e){}})()`,
          }}
        />
      </head>
      <body className="bg-surface-base text-text-base antialiased">{children}</body>
    </html>
  )
}
