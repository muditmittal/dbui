import type { Metadata } from "next"
import "./globals.css"

import { SiteFooter } from "@/components/SiteFooter"
import { themes, themeAttribute, themeDefault } from "@/stories/tokens/theme-data"

export const metadata: Metadata = {
  title: "DBUI — an AI-first design system for data and AI workbenches",
  description:
    "Tokens, icons, components and page shells that agents and people read from the same source.",
}

/**
 * The three axes, applied before first paint so a reader never sees the page
 * reflow or flash the wrong one.
 *
 * Inline and in `<head>` on purpose: an external or deferred script runs after
 * the first paint, which IS the flash. The controls in the footer write exactly
 * what this reads back.
 *
 * Each axis writes a default of ABSENCE — no attribute, no class — so a default
 * page carries no state and a stored value is always a deliberate choice. That
 * is also why the scale list below is the non-default stops only, and why it has
 * to move whenever `DEFAULT_SCALE` in TypeScaleControl does. The default mode is
 * the exception: it is whatever the machine asks for, so the fallback is
 * `prefers-color-scheme` rather than light.
 *
 * ## `?theme=` means two things, and that is deliberate
 *
 * It shipped as the color mode — `?theme=dark` is a link this repo hands out and
 * `scripts/shot.mjs` appends it for dark screenshots — and then themes arrived
 * and wanted the same word. Repointing it would have broken every one of those
 * links to fix a name. So it is read as the theme when the value is a theme, as
 * the mode when the value is `light` or `dark`, and `?mode=` is the unambiguous
 * spelling for the mode going forward. The two sets cannot collide: no theme may
 * be called `light` or `dark`, which is the one constraint this places on the
 * config.
 *
 * The theme names are interpolated from the generated roster rather than typed,
 * so a stale value in someone's storage is rejected by a list that cannot fall
 * behind the config.
 */
const THEME_NAMES = JSON.stringify(themes.map((t) => t.name))
const PRE_PAINT = `(function(){try{var q=new URLSearchParams(location.search),d=document.documentElement,T=${THEME_NAMES};\
var s=q.get("scale")||localStorage.getItem("dbui-type-scale");if(s==="1.1"||s==="1.2")d.dataset.typeScale=s;\
var k=q.get("theme"),n=T.indexOf(k)<0?localStorage.getItem("dbui-theme"):k;\
if(T.indexOf(n)>=0&&n!==${JSON.stringify(themeDefault)})d.setAttribute(${JSON.stringify(themeAttribute)},n);\
var t=q.get("mode")||(k==="light"||k==="dark"?k:null)||localStorage.getItem("dbui-color-mode");\
if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";\
if(t==="dark")d.classList.add("dark")}catch(e){}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The script below writes to this element before React sees it, so the
    // server markup and the first client render legitimately disagree.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Every served face, for every theme, in one request. Core is Figtree +
          Commit Mono; One is DM Sans + DM Mono. Loaded by link rather than
          next/font so the fonts resolve without adding a package to the install,
          which stays clone-and-copy. Commit Mono is not on Google Fonts, so it
          comes from Fontsource.

          The portal loads all of them because it is the surface that switches
          at runtime. A product picks one theme at build time and should load
          only that theme's faces — a theme's face is a token, but serving it is
          the consumer's job.

          DuBois adds nothing here, and that is the interesting case: San
          Francisco and SF Mono are reached through `-apple-system` and
          `ui-monospace` rather than served, because a theme that shipped a
          webfont for them would be shipping a licensing problem. Off Apple
          hardware its stack falls through to the platform UI face.

          The css2 API requires families in alphabetical order, which is why DM
          Mono leads and Figtree trails. DM Mono ships 300–500 with no 600; the
          only two styles that read a mono face are weight 400, so the ramp never
          asks for a weight it does not have.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Figtree:ital,wght@0,300..900;1,300..900&display=swap"
        />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fontsource/commit-mono/400.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fontsource/commit-mono/700.css" />
        {/*
          `?scale=`, `?theme=` and `?mode=` win over the stored values, so a
          link can pin any of the three for a screenshot or a review.
        */}
        <script dangerouslySetInnerHTML={{ __html: PRE_PAINT }} />
      </head>
      {/* A column so the footer can take the bottom of a short page. */}
      <body className="flex min-h-screen flex-col bg-surface-base text-text-base antialiased">
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
