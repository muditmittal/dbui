"use client"

import Link from "next/link"
import { ShaderHero } from "@/components/shader-hero"
import { useTheme } from "@/components/theme-provider"

const mappingRows = [
  { figma: "action/primary", dubois: "actionPrimaryBg", tw: "--primary", light: "#2272B4", dark: "#4299E0" },
  { figma: "text/foreground", dubois: "textPrimary", tw: "--foreground", light: "#161616", dark: "#E8ECF0" },
  { figma: "surface/background", dubois: "backgroundPrimary", tw: "--background", light: "#FFFFFF", dark: "#11171C" },
  { figma: "spacing/spacing-md", dubois: "spacing-md", tw: "p-4 / gap-4", light: "16px", dark: "—" },
  { figma: "Title 2", dubois: "Title 2", tw: "text-xl font-semibold", light: "22/28", dark: "—" },
]

const serif = "Baskerville, 'Times New Roman', Georgia, serif"
const mono = "'Fira Code', monospace"

export default function Home() {
  const { t } = useTheme()

  return (
    <div>
      {/* ─── Hero with Shader ─── */}
      <section className="relative h-[85vh] min-h-[600px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <ShaderHero className="absolute inset-0" />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${t.bg}, ${t.bg}66, transparent)` }}
          />
        </div>
        <div className="relative max-w-[800px] mx-auto px-8 pb-20 w-full">
          <p className="text-[11px] tracking-[0.2em] uppercase mb-6" style={{ fontFamily: mono, color: t.textSubtle }}>
            Databricks UI Kit · v0.1
          </p>
          <h1 className="text-[46px] leading-[1.05] tracking-[-0.01em] mb-8" style={{ fontFamily: serif }}>
            <em className="font-normal">Prototype Databricks<br />features, instantly.</em>
          </h1>
          <p className="text-[20px] leading-[1.4] max-w-[520px]" style={{ fontFamily: serif, color: t.textMuted }}>
            DBUI is Databricks&apos; visual language on production-ready components&mdash;designed
            so LLMs, designers, and engineers can build real product UI without guessing tokens or reading docs.
          </p>
        </div>
      </section>

      {/* ─── What you can do ─── */}
      <section className="py-24 px-8" style={{ borderTop: `1px solid ${t.border}` }}>
        <div className="max-w-[800px] mx-auto">
          <p className="text-[11px] tracking-[0.2em] uppercase mb-4" style={{ fontFamily: mono, color: t.textSubtle }}>
            What this gives you
          </p>
          <h2 className="text-[34px] leading-[1.1] mb-8" style={{ fontFamily: serif }}>
            <em>Ship UI that looks like the real product.</em>
          </h2>
          <div className="grid sm:grid-cols-2 gap-x-16 gap-y-8">
            {[
              { title: "Paste a prompt, get Databricks UI", desc: "shadcn is the most understood component API by LLMs. Every component is pre-skinned to match DuBois." },
              { title: "Figma ↔ Code, no drift", desc: "Every token is mapped between Figma variables, DuBois names, and Tailwind classes. Change one, the rest follow." },
              { title: "Light, Dark, Wireframe — one click", desc: "Color and typography themes switch independently. Preview in Dark mode, wireframe in Space Grotesk, ship in Production." },
              { title: "Icons, shadows, spacing — all included", desc: "413 DuBois icons, 5 shadow levels, 7 spacing steps, 8 text styles. No missing pieces when you prototype." },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="text-[17px] mb-2" style={{ fontFamily: serif }}>{item.title}</h3>
                <p className="text-[15px] leading-[1.6]" style={{ color: t.textMuted }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Mapping Preview ─── */}
      <section className="py-24 px-8" style={{ borderTop: `1px solid ${t.border}` }}>
        <div className="max-w-[800px] mx-auto">
          <p className="text-[11px] tracking-[0.2em] uppercase mb-4" style={{ fontFamily: mono, color: t.textSubtle }}>
            Full cross-reference
          </p>
          <h2 className="text-[34px] leading-[1.1] mb-4" style={{ fontFamily: serif }}>
            <em>Every token is mapped.</em>
          </h2>
          <p className="text-[19px] mb-16 max-w-[520px] leading-[1.5]" style={{ fontFamily: serif, color: t.textMuted }}>
            Figma variable, DuBois name, Tailwind class — all in one place.
            Designers reference Figma, engineers reference code, LLMs reference both.
          </p>

          <div className="overflow-x-auto -mx-8 px-8">
            <table className="w-full text-[14px]" style={{ fontFamily: mono }}>
              <thead>
                <tr className="text-left text-[11px] tracking-wide uppercase" style={{ color: t.textSubtle }}>
                  <th className="pb-3 pr-6 font-normal">Figma</th>
                  <th className="pb-3 pr-6 font-normal">DuBois</th>
                  <th className="pb-3 pr-6 font-normal">Tailwind</th>
                  <th className="pb-3 pr-6 font-normal">Light</th>
                  <th className="pb-3 font-normal">Dark</th>
                </tr>
              </thead>
              <tbody>
                {mappingRows.map((r, i) => (
                  <tr key={i} style={{ borderTop: `1px solid ${t.border}` }}>
                    <td className="py-3 pr-6" style={{ color: t.textMuted }}>{r.figma}</td>
                    <td className="py-3 pr-6" style={{ color: t.textSubtle }}>{r.dubois}</td>
                    <td className="py-3 pr-6" style={{ color: t.primary }}>{r.tw}</td>
                    <td className="py-3 pr-6" style={{ color: t.textMuted }}>
                      <span className="inline-flex items-center gap-2">
                        {r.light.startsWith("#") && (
                          <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ backgroundColor: r.light, border: `1px solid ${t.border}` }} />
                        )}
                        {r.light}
                      </span>
                    </td>
                    <td className="py-3" style={{ color: t.textMuted }}>
                      <span className="inline-flex items-center gap-2">
                        {r.dark.startsWith("#") && (
                          <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ backgroundColor: r.dark, border: `1px solid ${t.border}` }} />
                        )}
                        {r.dark}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-6">
            <p className="text-[12px]" style={{ fontFamily: mono, color: t.textSubtle }}>5 of 172 tokens shown.</p>
            <Link href="/mappings" className="text-[13px]" style={{ fontFamily: mono, color: t.primary }}>
              View all tokens →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-16 px-8" style={{ borderTop: `1px solid ${t.border}` }}>
        <div className="max-w-[800px] mx-auto flex justify-between items-end">
          <div>
            <span className="text-[14px] tracking-wider" style={{ fontFamily: mono, color: t.textSubtle }}>DBUI</span>
            <p className="text-[14px] mt-1" style={{ color: t.textSubtle, opacity: 0.5 }}>DuBois design language on shadcn components.</p>
          </div>
          <p className="text-[11px]" style={{ fontFamily: mono, color: t.textSubtle, opacity: 0.4 }}>Design · Databricks · 2026</p>
        </div>
      </footer>
    </div>
  )
}
