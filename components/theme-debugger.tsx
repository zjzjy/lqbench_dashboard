"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeDebugger() {
  const { theme, resolvedTheme, systemTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="theme-debug">
      <div>Current theme: {theme}</div>
      <div>Resolved theme: {resolvedTheme}</div>
      <div>System theme: {systemTheme}</div>
      <div className="flex gap-2 mt-2">
        <button onClick={() => setTheme("light")} className="px-2 py-1 bg-white text-black text-xs rounded">
          Light
        </button>
        <button onClick={() => setTheme("dark")} className="px-2 py-1 bg-gray-800 text-white text-xs rounded">
          Dark
        </button>
        <button onClick={() => setTheme("system")} className="px-2 py-1 bg-gray-400 text-black text-xs rounded">
          System
        </button>
      </div>
    </div>
  )
}
