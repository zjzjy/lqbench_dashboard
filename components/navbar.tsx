"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Coffee } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isRotating, setIsRotating] = useState(false)

  // 确保组件挂载后再渲染主题切换按钮，避免水合错误
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    // 添加旋转动画
    setIsRotating(true)
    setTimeout(() => {
      setIsRotating(false)
    }, 500) // 动画持续时间

    // 明确设置为相反的主题，而不是依赖当前主题状态
    const newTheme = theme === "dark" ? "light" : "dark"
    console.log(`Switching theme from ${theme} to ${newTheme}`)
    setTheme(newTheme)
  }

  return (
    <header className="w-full bg-white dark:bg-dark-accent border-b border-gray-100 dark:border-gray-800 p-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-dark-accent dark:text-cream-yellow mr-2">LQBench</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          A Benchmark for Evaluating LLMs' Emotional Intelligence in Intimate Relationships
        </p>
      </div>

      <div className="flex items-center gap-4">
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-dark-accent dark:hover:text-cream-yellow transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-dark-accent dark:hover:text-cream-yellow transition-colors"
          >
            About
          </Link>
          <Link
            href="/methodology"
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-dark-accent dark:hover:text-cream-yellow transition-colors"
          >
            Methodology
          </Link>
          <Link
            href="/contact"
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-dark-accent dark:hover:text-cream-yellow transition-colors"
          >
            Contact
          </Link>
        </nav>

        {mounted && (
          <Button
            variant="outline"
            size="icon"
            className="rounded-full text-gray-600 dark:text-gray-300 overflow-hidden"
            onClick={toggleTheme}
          >
            <div className={`theme-toggle-icon ${isRotating ? "rotate-enter" : ""}`}>
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </div>
            <span className="sr-only">Toggle theme</span>
          </Button>
        )}

        <Button className="bg-dark-accent dark:bg-cream-yellow text-white dark:text-dark-accent hover:bg-dark-accent-light dark:hover:bg-cream-yellow-dark rounded-full flex items-center gap-2 text-sm">
          <Coffee size={16} />
          <span>Buy me a coffee</span>
        </Button>
      </div>
    </header>
  )
}
