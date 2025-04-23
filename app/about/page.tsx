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
    },
    {
      name: "Green",
      github: "https://github.com/GhostGreenGoat",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c6e72d8be539faf0f30e560b0721b62.jpg-25qA9gkLbAiOgSrq62RoTnTc20XfpO.jpeg",
    },
    {
      name: "Alfafa",
      github: "https://github.com/Alfafa0702",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0228a444a786fbc0e7244857bb6cf70-QU3UH6081iNWBvuQzzY5O76ClANXsJ.png",
    },
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

                <p className="text-gray-700 mb-4">
                  Hi, I'm Hiro, one of the three researchers behind LQ-Bench. Together with my colleagues Green and
                  Alfafa, we have been deeply engaged in exploring the intersection of artificial intelligence and
                  emotional psychology, particularly in the context of intimate relationships. Our shared passion for
                  understanding how Large Language Models (LLMs) can enhance emotional intelligence has led us to
                  develop LQ-Bench.
                </p>

                <h2 className="text-xl font-bold text-dark-accent mt-8 mb-4">From Concept to LQ-Bench</h2>

                <p className="text-gray-700 mb-4">
                  Our journey into AI-powered emotional intelligence began with a collective realization that LLMs could
                  play a transformative role in understanding and addressing complex emotional dynamics in intimate
                  relationships. As we delved into the existing research, we noticed a significant gap: while there were
                  numerous studies on the general capabilities of LLMs, very few focused on their performance in
                  intimate relationship scenarios, especially in terms of conflict resolution and emotional support.
                  This observation led us to a critical question: how could we objectively measure and compare LLM
                  performance in emotional intelligence tasks related to intimate relationships?
                </p>

                <p className="text-gray-700 mb-4">
                  This question was the genesis of LQ-Bench. We realized that without a standardized benchmark, it would
                  be impossible to meaningfully compare models or track improvements over time. Together, we set out to
                  create the first benchmark specifically designed to evaluate LLM capabilities in emotional
                  intelligence within intimate relationships.
                </p>

                <h3 className="text-lg font-bold text-dark-accent mt-6 mb-3">Focus on Real-World Scenarios</h3>

                <p className="text-gray-700 mb-4">
                  One of the most common challenges we encountered was the lack of real-world data and scenarios for
                  evaluating LLMs in intimate relationships. Many existing benchmarks focused on generic emotional
                  intelligence tasks, but they failed to capture the nuances of intimate relationship dynamics. This
                  feedback directly shaped the focus of LQ-Bench. The benchmark specifically evaluates models in
                  realistic scenarios derived from real-world data, ensuring that the assessment is relevant and
                  practical.
                </p>

                <h3 className="text-lg font-bold text-dark-accent mt-6 mb-3">Beyond Just Performance Metrics</h3>

                <p className="text-gray-700 mb-4">
                  Creating LQ-Bench required us to develop a diverse set of intimate relationship scenarios, establish
                  ground truth emotional responses with psychology experts, and design a scoring methodology that could
                  fairly evaluate model outputs. It has been a challenging but rewarding process, and we are proud to
                  contribute this tool to the AI and psychology communities.
                </p>

                <p className="text-gray-700 mb-4">
                  Our hope is that LQ-Bench will not only help organizations and researchers make more informed
                  decisions about which LLMs to use for emotional intelligence tasks in intimate relationships but also
                  drive improvements in how these models are trained and fine-tuned for such applications.
                </p>

                <h3 className="text-lg font-bold text-dark-accent mt-6 mb-3">Mission & Vision</h3>

                <p className="text-gray-700 mb-4">
                  Our mission with LQ-Bench is to provide an open, transparent benchmark for evaluating and improving
                  LLM-based emotional intelligence capabilities in intimate relationships. We believe that rigorous
                  evaluation is essential for responsible AI deployment in emotional support contexts.
                </p>

                <p className="text-gray-700 mb-4">
                  The vision for LQ-Bench extends beyond just evaluation—we aim to drive improvement in AI emotional
                  intelligence capabilities by highlighting areas where models excel and where they need enhancement. By
                  identifying these strengths and weaknesses, we can guide the development of more effective AI tools
                  for emotional support in intimate relationships.
                </p>

                <h3 className="text-lg font-bold text-dark-accent mt-6 mb-3">Collaboration & Community</h3>

                <p className="text-gray-700 mb-4">
                  LQ-Bench is a collaborative project developed by our team to address the need for rigorous evaluation
                  of emotional intelligence capabilities in LLMs. We have developed the methodology and evaluation
                  criteria together, drawing on our combined experience in both psychology research and AI evaluation.
                </p>

                <p className="text-gray-700 mb-4">
                  Like many rigorous AI benchmarks, LQ-Bench maintains a balance between transparency and integrity.
                  While the methodology is publicly documented, the specific test cases and evaluation implementation
                  remain private to prevent optimization specifically for the benchmark rather than for actual emotional
                  intelligence capabilities. This approach aligns with best practices in AI evaluation, particularly in
                  emotional support domains where benchmark integrity is crucial.
                </p>

                <p className="text-gray-700">
                  We welcome feedback from the research community and are committed to continuously improving the
                  benchmark based on input and emerging research in AI and emotional psychology. If you have suggestions
                  for improvement or questions about the methodology, please reach out!
                </p>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
