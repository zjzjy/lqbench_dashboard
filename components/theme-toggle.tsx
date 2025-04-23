"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"

interface ThemeToggleProps {
  className?: string
  iconSize?: number
}

export function ThemeToggle({ className = "", iconSize = 16 }: ThemeToggleProps) {
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

    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return <div className="w-9 h-9"></div> // 占位符，避免布局偏移
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className={`rounded-full text-gray-600 dark:text-gray-300 overflow-hidden ${className}`}
      onClick={toggleTheme}
    >
      <div className={`theme-toggle-icon ${isRotating ? "rotate-enter" : ""}`}>
        {theme === "dark" ? <Sun size={iconSize} /> : <Moon size={iconSize} />}
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
