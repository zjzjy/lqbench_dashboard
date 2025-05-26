"use client"

import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { Card } from "@/components/ui/card"

export default function MethodologyPage() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Page Header */}
            <div>
              <h1 className="text-3xl font-bold text-dark-accent">Methodology</h1>
              <p className="text-gray-500 mt-1">
                Evaluating LLM Emotional Intelligence in Intimate Relationships with LQ-Bench
              </p>
            </div>

            {/* Main Content */}
            <Card className="bg-white rounded-2xl border-0 shadow-card p-8">
              <div className="prose max-w-none">
                <h1 className="text-2xl font-bold text-dark-accent mb-6">
                  Benchmark Methodology: Evaluating LLM Emotional Intelligence in Intimate Relationships with LQ-Bench
                </h1>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
