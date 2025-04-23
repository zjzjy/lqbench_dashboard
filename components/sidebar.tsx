"use client"

import { Home, Info, FileText, Mail } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Info, label: "About", href: "/about" },
  { icon: FileText, label: "Methodology", href: "/methodology" },
  { icon: Mail, label: "Contact", href: "/contact" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-60 h-screen bg-light-gray-light dark:bg-dark-accent border-r border-gray-100 dark:border-gray-800 p-4 flex flex-col">
      <div className="mb-6 mt-4">
        <h2 className="text-base font-bold text-dark-accent dark:text-cream-yellow">Navigation</h2>
      </div>

      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all sidebar-nav-item ${
                isActive ? "tab-active" : "text-gray-600 dark:text-gray-300 hover:bg-light-gray dark:hover:bg-gray-800"
              }`}
            >
              <Icon size={18} className={isActive ? "text-dark-accent" : "text-gray-500 dark:text-gray-400"} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
