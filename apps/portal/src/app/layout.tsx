import type { Metadata } from "next"
import "./globals.css"

import { SiteFooter } from "@/components/SiteFooter"

export const metadata: Metadata = {
  title: "DBUI — an AI-first design system for data and AI workbenches",
  description:
    "Tokens, icons, components and page shells that agents and people read from the same source.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The script below writes to this element before React sees it, so the
    // server markup and the first client render legitimately disagree.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Figtree and Commit Mono, matching the Storybook preview. Commit Mono is
          not on Google Fonts, so it comes from Fontsource. Loaded by link rather
          than next/font so the fonts resolve without adding a package to the
          install, which stays clone-and-copy.
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
          Applies the type scale and the color mode before first paint, so a
          reader never sees the page reflow or flash the wrong theme. Both
          controls in the footer write what this script reads.

          It is inline and in `<head>` on purpose: an external or deferred
          script runs after the first paint, which is the flash.

          `?scale=` and `?theme=` win over the stored values, so a link can pin
          either for a screenshot or a review.

          The default multiplier is the absence of the attribute, so it is the
          one value this script deliberately does not write — which is why the
          list below is the non-default stops, and why it has to move whenever
          `DEFAULT_SCALE` in TypeScaleControl does. The default mode is whatever
          the machine asks for, which is why the fallback is
          `prefers-color-scheme` rather than light.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var q=new URLSearchParams(location.search);var s=q.get("scale")||localStorage.getItem("dbui-type-scale");if(s==="1.1"||s==="1.2")document.documentElement.dataset.typeScale=s;var t=q.get("theme")||localStorage.getItem("dbui-color-mode");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";if(t==="dark")document.documentElement.classList.add("dark")}catch(e){}})()`,
          }}
        />
      </head>
      {/* A column so the footer can take the bottom of a short page. */}
      <body className="flex min-h-screen flex-col bg-surface-base text-text-base antialiased">
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
