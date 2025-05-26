"use client"

import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  // Researcher data
  const researchers = [
    {
      name: "Hiro",
      github: "https://github.com/zjzjy",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avatar-V0lPveCkUPXWEWnRH3EUuf7ykVSo81.png",
    }
  ]

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Page Header */}
            <div>
              <h1 className="text-3xl font-bold text-dark-accent">About LQ-Bench</h1>
              <p className="text-gray-500 mt-1">
                The story behind the world's first LLM emotional intelligence benchmark in intimate relationships
              </p>
            </div>

            {/* Researchers Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {researchers.map((researcher, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-40 h-40 rounded-full overflow-hidden mb-4 bg-light-gray border-4 border-cream-yellow">
                    <img
                      src={researcher.image || "/placeholder.svg"}
                      alt={researcher.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-dark-accent">{researcher.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{researcher.role}</p>
                  <Link href={researcher.github} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 rounded-full border-cream-yellow hover:bg-cream-yellow hover:text-dark-accent"
                    >
                      <Github size={16} />
                      <span>GitHub</span>
                    </Button>
                  </Link>
                </div>
              ))}
            </div>

            {/* Main Content */}
            <Card className="bg-white rounded-2xl border-0 shadow-card p-8">
              <div className="prose max-w-none">
                <h1 className="text-2xl font-bold text-dark-accent mb-6">The Story Behind LQBench</h1>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
