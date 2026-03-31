"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "./theme-provider"

export function Nav() {
  const { mode, t, toggle } = useTheme()
  const pathname = usePathname()

  const links = [
    { href: "/tokens", label: "Tokens" },
    { href: "/icons", label: "Icons" },
    { href: "/components", label: "Components" },
    { href: "/changes", label: "Changes" },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
      style={{ backgroundColor: `${t.bg}cc`, borderBottom: `1px solid ${t.border}` }}
    >
      <div className="max-w-[1100px] mx-auto px-8 h-12 flex items-center justify-between">
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-wide"
          style={{ fontFamily: "'Fira Code', monospace", color: t.text }}
        >
          DBUI
        </Link>
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] transition-colors"
              style={{
                fontFamily: "'Fira Code', monospace",
                color: pathname === link.href ? t.primary : t.textSubtle,
              }}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 text-[12px] px-2.5 py-1 rounded-md transition-colors"
            style={{
              fontFamily: "'Fira Code', monospace",
              color: t.textMuted,
              border: `1px solid ${t.border}`,
            }}
          >
            {mode === "light" ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
            {mode === "light" ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </nav>
  )
}
