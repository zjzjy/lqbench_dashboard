import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "./font-size.css" // 导入字体大小调整样式
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LQBench Dashboard",
  description: "A Benchmark for Evaluating LLMs' Emotional Intelligence in Intimate Relationships",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false} // 禁用系统主题，确保我们的切换逻辑正常工作
          disableTransitionOnChange={false} // 启用过渡动画
          storageKey="tm-bench-theme" // 添加一个特定的存储键
        >
          <div className="min-h-screen bg-cream-gradient dark:bg-dark-accent">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
