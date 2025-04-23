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

                <h2 className="text-xl font-bold text-dark-accent mt-8 mb-4">Benchmark Design</h2>
                <p className="text-gray-700 mb-4">
                  LQ-Bench is designed to comprehensively evaluate how well Large Language Models (LLMs) can perform
                  emotional intelligence tasks in the context of intimate relationships across a diverse range of
                  scenarios. The benchmark focuses on models that can run on consumer-grade hardware (Nvidia GeForce RTX
                  4090 GPU or smaller), making it valuable for organizations and researchers looking to implement
                  emotional support capabilities without relying on cloud APIs.
                </p>

                <p className="text-gray-700 mb-4">
                  The benchmark is also useful for teams looking to identify smaller LLMs that are "good enough" for
                  their emotional intelligence needs. This allows organizations to optimize performance and costs while
                  using hosted LLM provider APIs, rather than defaulting to the largest and most expensive models.
                </p>

                <p className="text-gray-700 mb-4">The benchmark consists of several key components:</p>

                <ol className="list-decimal pl-6 mb-6 space-y-2">
                  <li className="text-gray-700">
                    <span className="font-medium">Intimate Relationship Scenarios</span>: A diverse set of scenarios
                    with varying complexity levels (basic, moderate, and complex) derived from real-world data, covering
                    common conflicts and emotional dynamics in intimate relationships.
                  </li>
                  <li className="text-gray-700">
                    <span className="font-medium">Ground Truth Emotional Responses</span>: Synthetic emotional response
                    models created for each scenario based on psychological theories and expert input.
                  </li>
                  <li className="text-gray-700">
                    <span className="font-medium">Evaluation Framework</span>: An "Expert Model-as-a-Judge" approach
                    using a trained psychological expert model to evaluate model outputs.
                  </li>
                  <li className="text-gray-700">
                    <span className="font-medium">Standardized Prompts</span>: Consistent instructions for all evaluated
                    models to ensure fair comparison.
                  </li>
                </ol>

                <h2 className="text-xl font-bold text-dark-accent mt-8 mb-4">Evaluation Metrics</h2>
                <p className="text-gray-700 mb-4">
                  LQ-Bench uses a percentage-based scoring system (0-100%) across four key dimensions to evaluate model
                  performance:
                </p>

                <ol className="list-decimal pl-6 mb-6 space-y-3">
                  <li className="text-gray-700">
                    <span className="font-medium">Emotional Accuracy (30% of overall score)</span>: Measures how well
                    the model captures the correct emotional states and responses in the given scenarios, including
                    accuracy in identifying primary and secondary emotions.
                  </li>
                  <li className="text-gray-700">
                    <span className="font-medium">Conflict Resolution Effectiveness (30% of overall score)</span>:
                    Evaluates the model's ability to provide effective conflict resolution strategies, including the
                    quality of proposed solutions and their relevance to the scenario.
                  </li>
                  <li className="text-gray-700">
                    <span className="font-medium">Empathy and Support (30% of overall score)</span>: Assesses the
                    model's ability to provide empathetic responses, validate emotions, and offer appropriate emotional
                    support.
                  </li>
                  <li className="text-gray-700">
                    <span className="font-medium">Scenario Understanding (10% of overall score)</span>: Measures the
                    model's comprehension of the scenario context, including the ability to understand the underlying
                    issues and motivations of the characters involved.
                  </li>
                </ol>

                <p className="text-gray-700 mb-4">
                  These metrics are combined into an overall weighted score that provides a comprehensive assessment of
                  the model's emotional intelligence capabilities in intimate relationship scenarios.
                </p>

                <h2 className="text-xl font-bold text-dark-accent mt-8 mb-4">Benchmark Process</h2>
                <ol className="list-decimal pl-6 mb-6 space-y-6">
                  <li className="text-gray-700">
                    <span className="font-medium">Ground Truth Creation</span>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>
                        Synthetic emotional response models are generated to serve as the ground truth for evaluation.
                        These models are based on a diverse set of intimate relationship scenarios and identify relevant
                        emotional responses and conflict resolution strategies using psychological theories.
                      </li>
                      <li>
                        Each emotional response model is saved as a structured JSON file with detailed information about
                        each identified emotion, conflict type, and recommended resolution strategy.
                      </li>
                    </ul>
                  </li>

                  <li className="text-gray-700">
                    <span className="font-medium">Model Evaluation</span>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>
                        The benchmark evaluates local LLMs running on consumer-grade hardware. Each model is prompted to
                        generate emotional responses and conflict resolution strategies for each scenario using
                        standardized prompts.
                      </li>
                      <li>
                        The generated responses are then compared against the ground truth models using the expert model
                        as an expert judge.
                      </li>
                      <li>
                        This "Expert Model-as-a-Judge" approach enables detailed, nuanced evaluation of model outputs
                        that goes beyond simple keyword matching or structural comparison.
                      </li>
                    </ul>
                  </li>

                  <li className="text-gray-700">
                    <span className="font-medium">Scoring and Analysis</span>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>
                        For each scenario, the judge provides detailed percentage scores across the four evaluation
                        dimensions, along with specific strengths and weaknesses for each area.
                      </li>
                      <li>
                        The judge also provides emotional response comparison statistics (emotions identified, conflict
                        types covered/missed) and an overall weighted score.
                      </li>
                      <li>
                        Results are broken down by scenario complexity to provide deeper insights into how models
                        perform across different types of intimate relationship dynamics. This approach enables
                        fine-grained comparison between models and provides detailed insights into their specific
                        strengths and weaknesses in emotional intelligence tasks.
                      </li>
                    </ul>
                  </li>
                </ol>

                <h2 className="text-xl font-bold text-dark-accent mt-8 mb-4">Benchmark Implementation</h2>
                <p className="text-gray-700 mb-4">
                  The LQ-Bench evaluation process is implemented as a controlled pipeline that ensures consistent and
                  fair assessment across all models:
                </p>

                <ol className="list-decimal pl-6 mb-6 space-y-2">
                  <li className="text-gray-700">
                    <span className="font-medium">Standardized Input</span>: Each model receives identical scenario
                    descriptions and instructions through a consistent prompt template.
                  </li>
                  <li className="text-gray-700">
                    <span className="font-medium">Local Model Testing</span>: Models are evaluated on consumer-grade
                    hardware, allowing for testing of various local LLMs.
                  </li>
                  <li className="text-gray-700">
                    <span className="font-medium">Expert Evaluation</span>: The expert model serves as the judge,
                    providing detailed analysis of each generated emotional response.
                  </li>
                  <li className="text-gray-700">
                    <span className="font-medium">Comprehensive Reporting</span>: Results are saved as structured JSON
                    files with detailed scores and analysis.
                  </li>
                </ol>

                <p className="text-gray-700 mb-4">
                  The benchmark is designed with careful controls to prevent gaming of the system. Results are
                  automatically saved with timestamps and model names, making it easy to track performance over time and
                  compare different models.
                </p>

                <p className="text-gray-700">
                  This methodology ensures that LQ-Bench provides valuable insights into the emotional intelligence
                  capabilities of different LLMs in intimate relationship scenarios, helping researchers and
                  organizations make informed decisions about which models to use for their specific needs.
                </p>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
