"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Check, Plus, X, FileText } from "lucide-react"
import Link from "next/link"
import {
  CommunicationTypeChart,
  AttachmentStyleChart,
  StyleMarkersChart,
  FactorsFrequencyChart,
  EmotionalRangeChart,
  CognitiveConsistencyChart,
} from "@/components/model-detail-charts"
import { CombinedMetricsChart, EmotionFactorsChart } from "@/components/combined-metrics-chart"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

// 模型数据
const modelsData = {
  "gamma-3-27b-it": {
    id: "gamma-3-27b-it",
    name: "gamma-3-27b-it",
    provider: "Anthropic",
    category: "General",
    parameters: "27B",
    score: 81,
    strideScore: 85,
    completeness: 78,
    date: "Mar 15, 2024",
    status: "Top Performer",
    description:
      "Gamma 3 is Anthropic's most capable model, designed to be helpful, harmless, and honest. It excels at complex reasoning tasks and threat modeling.",
    communicationType: {
      assertive: 85,
      responsive: 78,
      analytical: 92,
      expressive: 65,
      directive: 72,
    },
    attachmentStyle: {
      secure: 80,
      anxious: 30,
      avoidant: 25,
      disorganized: 15,
    },
    styleMarkers: [
      { name: "Formal", value: 75 },
      { name: "Technical", value: 85 },
      { name: "Detailed", value: 90 },
      { name: "Cautious", value: 70 },
      { name: "Structured", value: 88 },
    ],
    factorsFrequency: {
      positive: 72,
      negative: 28,
    },
    emotionalRange: {
      range: 35,
      finalState: 65,
    },
    cognitiveConsistency: 87,
  },
  "gamma-3-12b-it": {
    id: "gamma-3-12b-it",
    name: "gamma-3-12b-it",
    provider: "Anthropic",
    category: "General",
    parameters: "12B",
    score: 80,
    strideScore: 82,
    completeness: 79,
    date: "Mar 15, 2024",
    status: "Top Performer",
    description:
      "A smaller but highly efficient version of Gamma 3, offering excellent performance with reduced computational requirements.",
    communicationType: {
      assertive: 80,
      responsive: 75,
      analytical: 88,
      expressive: 62,
      directive: 70,
    },
    attachmentStyle: {
      secure: 78,
      anxious: 32,
      avoidant: 28,
      disorganized: 18,
    },
    styleMarkers: [
      { name: "Formal", value: 72 },
      { name: "Technical", value: 82 },
      { name: "Detailed", value: 85 },
      { name: "Cautious", value: 68 },
      { name: "Structured", value: 84 },
    ],
    factorsFrequency: {
      positive: 70,
      negative: 30,
    },
    emotionalRange: {
      range: 38,
      finalState: 62,
    },
    cognitiveConsistency: 84,
  },
  "gamma-3-4b-it": {
    id: "gamma-3-4b-it",
    name: "gamma-3-4b-it",
    provider: "Anthropic",
    category: "General",
    parameters: "4B",
    score: 77,
    strideScore: 75,
    completeness: 76,
    date: "Mar 15, 2024",
    status: "High Performer",
    description:
      "The most compact version of Gamma 3, designed for deployment in resource-constrained environments while maintaining strong performance.",
    communicationType: {
      assertive: 75,
      responsive: 72,
      analytical: 82,
      expressive: 60,
      directive: 68,
    },
    attachmentStyle: {
      secure: 75,
      anxious: 35,
      avoidant: 30,
      disorganized: 20,
    },
    styleMarkers: [
      { name: "Formal", value: 70 },
      { name: "Technical", value: 78 },
      { name: "Detailed", value: 80 },
      { name: "Cautious", value: 65 },
      { name: "Structured", value: 80 },
    ],
    factorsFrequency: {
      positive: 68,
      negative: 32,
    },
    emotionalRange: {
      range: 40,
      finalState: 60,
    },
    cognitiveConsistency: 80,
  },
  "mistral-small-3.1-24b-instruct-2503": {
    id: "mistral-small-3.1-24b-instruct-2503",
    name: "mistral-small-3.1-24b-instruct-2503",
    provider: "Mistral AI",
    category: "General",
    parameters: "24B",
    score: 73,
    strideScore: 71,
    completeness: 74,
    date: "Mar 25, 2024",
    status: "High Performer",
    description:
      "Mistral Small 3.1 is designed for high-quality instruction following with strong performance across a wide range of tasks.",
    communicationType: {
      assertive: 70,
      responsive: 80,
      analytical: 75,
      expressive: 68,
      directive: 65,
    },
    attachmentStyle: {
      secure: 72,
      anxious: 38,
      avoidant: 32,
      disorganized: 22,
    },
    styleMarkers: [
      { name: "Formal", value: 65 },
      { name: "Technical", value: 75 },
      { name: "Detailed", value: 78 },
      { name: "Cautious", value: 72 },
      { name: "Structured", value: 76 },
    ],
    factorsFrequency: {
      positive: 65,
      negative: 35,
    },
    emotionalRange: {
      range: 45,
      finalState: 58,
    },
    cognitiveConsistency: 76,
  },
  "gamma-2-27b-it": {
    id: "gamma-2-27b-it",
    name: "gamma-2-27b-it",
    provider: "Anthropic",
    category: "General",
    parameters: "27B",
    score: 72,
    strideScore: 70,
    completeness: 73,
    date: "Jan 25, 2024",
    status: "High Performer",
    description:
      "The predecessor to Gamma 3, offering strong performance in complex reasoning and threat modeling tasks.",
    communicationType: {
      assertive: 78,
      responsive: 70,
      analytical: 85,
      expressive: 60,
      directive: 75,
    },
    attachmentStyle: {
      secure: 70,
      anxious: 40,
      avoidant: 35,
      disorganized: 25,
    },
    styleMarkers: [
      { name: "Formal", value: 80 },
      { name: "Technical", value: 82 },
      { name: "Detailed", value: 78 },
      { name: "Cautious", value: 75 },
      { name: "Structured", value: 82 },
    ],
    factorsFrequency: {
      positive: 62,
      negative: 38,
    },
    emotionalRange: {
      range: 42,
      finalState: 55,
    },
    cognitiveConsistency: 75,
  },
}

export default function ModelDetailPage() {
  const params = useParams()
  const modelId = params.id as string
  const model = modelsData[modelId as keyof typeof modelsData]

  // 状态变量
  const [showDocModal, setShowDocModal] = useState(false)
  const [exportLoading, setExportLoading] = useState(false)
  const [exportSuccess, setExportSuccess] = useState(false)

  // State for model comparison
  const [selectedModelsForComparison, setSelectedModelsForComparison] = useState<string[]>([])
  const [showModelSelector, setShowModelSelector] = useState(false)

  // Get all available models except the current one
  const availableModelsForComparison = Object.keys(modelsData).filter((id) => id !== modelId)

  // Handle model selection for comparison
  const toggleModelSelection = (id: string) => {
    if (selectedModelsForComparison.includes(id)) {
      setSelectedModelsForComparison(selectedModelsForComparison.filter((modelId) => modelId !== id))
    } else {
      setSelectedModelsForComparison([...selectedModelsForComparison, id])
    }
  }

  // Clear all selected models
  const clearSelectedModels = () => {
    setSelectedModelsForComparison([])
  }

  // 处理查看文档
  const handleViewDocumentation = () => {
    setShowDocModal(true)
  }

  // 处理导出数据
  const handleExportData = () => {
    setExportLoading(true)

    // 模拟导出过程
    setTimeout(() => {
      try {
        // 准备导出数据
        const exportData = {
          ...model,
          exportDate: new Date().toISOString(),
          benchmarkVersion: "1.2.0",
        }

        // 创建JSON文件
        const dataStr = JSON.stringify(exportData, null, 2)
        const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

        // 创建下载链接
        const exportFileDefaultName = `${model.name}-data.json`
        const linkElement = document.createElement("a")
        linkElement.setAttribute("href", dataUri)
        linkElement.setAttribute("download", exportFileDefaultName)
        linkElement.click()

        // 显示成功状态
        setExportSuccess(true)
        setTimeout(() => setExportSuccess(false), 2000)
      } catch (error) {
        console.error("Export failed:", error)
      } finally {
        setExportLoading(false)
      }
    }, 800)
  }

  if (!model) {
    return (
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex items-center gap-2">
                <Link href="/">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Dashboard</span>
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Model not found</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* 返回按钮和操作 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link href="/">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Dashboard</span>
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={handleViewDocumentation}
                >
                  <FileText className="w-4 h-4" />
                  <span>View Documentation</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={handleExportData}
                  disabled={exportLoading}
                >
                  {exportLoading ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></span>
                      <span>Exporting...</span>
                    </>
                  ) : exportSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Exported</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Export Data</span>
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* 模型标题和描述 */}
            <div>
              <h1 className="text-3xl font-bold text-dark-accent">{model.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-gray-500">{model.provider}</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">{model.parameters} Parameters</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">Released: {model.date}</span>
              </div>
              <p className="text-gray-600 mt-2">{model.description}</p>
            </div>

            {/* 顶部指标卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white rounded-2xl border-0 shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="text-gray-500 text-sm">Overall Score</div>
                    <div className="text-5xl font-bold text-dark-accent">{model.score}</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white rounded-2xl border-0 shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="text-gray-500 text-sm">STRIDE Coverage</div>
                    <div className="text-5xl font-bold text-dark-accent">{model.strideScore}</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white rounded-2xl border-0 shadow-card">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="text-gray-500 text-sm">Cognitive Consistency</div>
                    <div className="text-5xl font-bold text-dark-accent">{model.cognitiveConsistency}</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 主要内容区域 - 使用标签页组织内容 */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-light-gray rounded-xl p-1 w-auto inline-flex">
                <TabsTrigger value="overview" className="rounded-lg data-[state=active]:tab-active tabs-trigger">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="detailed" className="rounded-lg data-[state=active]:tab-active tabs-trigger">
                  Detailed Analysis
                </TabsTrigger>
                <TabsTrigger value="comparison" className="rounded-lg data-[state=active]:tab-active tabs-trigger">
                  Model Comparison
                </TabsTrigger>
              </TabsList>

              {/* 概览标签页 */}
              <TabsContent value="overview" className="mt-6 space-y-6">
                {/* 组合指标图表 */}
                <Card className="bg-white rounded-2xl border-0 shadow-card card-hover">
                  <CardHeader>
                    <CardTitle className="text-dark-accent card-title">Performance Overview</CardTitle>
                    <CardDescription className="text-gray-500 card-description">
                      Comprehensive view of all key performance metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CombinedMetricsChart model={model} />
                  </CardContent>
                </Card>

                {/* 沟通类型和依恋风格 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-white rounded-2xl border-0 shadow-card card-hover">
                    <CardHeader>
                      <CardTitle className="text-dark-accent card-title">Communication Type</CardTitle>
                      <CardDescription className="text-gray-500 card-description">
                        Analysis of communication patterns and styles
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CommunicationTypeChart data={model.communicationType} />
                    </CardContent>
                  </Card>

                  <Card className="bg-white rounded-2xl border-0 shadow-card card-hover">
                    <CardHeader>
                      <CardTitle className="text-dark-accent card-title">Attachment Style</CardTitle>
                      <CardDescription className="text-gray-500 card-description">
                        Relationship and interaction patterns
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AttachmentStyleChart data={model.attachmentStyle} />
                    </CardContent>
                  </Card>
                </div>

                {/* 情感和因素组合图表 */}
                <Card className="bg-white rounded-2xl border-0 shadow-card card-hover">
                  <CardHeader>
                    <CardTitle className="text-dark-accent card-title">Emotional & Factor Analysis</CardTitle>
                    <CardDescription className="text-gray-500 card-description">
                      Combined view of emotional states and factor frequencies
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <EmotionFactorsChart model={model} />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 详细分析标签页 */}
              <TabsContent value="detailed" className="mt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-white rounded-2xl border-0 shadow-card card-hover">
                    <CardHeader>
                      <CardTitle className="text-dark-accent card-title">Style Markers</CardTitle>
                      <CardDescription className="text-gray-500 card-description">
                        Key linguistic and stylistic characteristics
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <StyleMarkersChart data={model.styleMarkers} />
                    </CardContent>
                  </Card>

                  <Card className="bg-white rounded-2xl border-0 shadow-card card-hover">
                    <CardHeader>
                      <CardTitle className="text-dark-accent card-title">Factors Frequency</CardTitle>
                      <CardDescription className="text-gray-500 card-description">
                        Positive and negative factors occurrence
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FactorsFrequencyChart data={model.factorsFrequency} />
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-white rounded-2xl border-0 shadow-card card-hover">
                    <CardHeader>
                      <CardTitle className="text-dark-accent card-title">Virtual Character Analysis</CardTitle>
                      <CardDescription className="text-gray-500 card-description">
                        Emotional range and final emotional state
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <EmotionalRangeChart data={model.emotionalRange} />
                    </CardContent>
                  </Card>

                  <Card className="bg-white rounded-2xl border-0 shadow-card card-hover">
                    <CardHeader>
                      <CardTitle className="text-dark-accent card-title">Cognitive Model Consistency</CardTitle>
                      <CardDescription className="text-gray-500 card-description">
                        Comparison with baseline cognitive models
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CognitiveConsistencyChart value={model.cognitiveConsistency} />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* 模型比较标签页 */}
              <TabsContent value="comparison" className="mt-6">
                <Card className="bg-white rounded-2xl border-0 shadow-card">
                  <CardHeader>
                    <CardTitle className="text-dark-accent card-title">Model Comparison</CardTitle>
                    <CardDescription className="text-gray-500 card-description">
                      Compare this model with other similar models
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedModelsForComparison.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">Select models to compare with {model.name}</p>
                        <div className="flex justify-center gap-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => setShowModelSelector(true)}
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add Models</span>
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Selected models list */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-medium text-gray-700">Comparing with:</span>
                          {selectedModelsForComparison.map((id) => (
                            <div
                              key={id}
                              className="flex items-center gap-1 bg-cream-yellow-light px-3 py-1 rounded-full"
                            >
                              <span className="text-sm text-dark-accent">
                                {modelsData[id as keyof typeof modelsData].name}
                              </span>
                              <button
                                onClick={() => toggleModelSelection(id)}
                                className="text-gray-500 hover:text-dark-accent"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 h-7 px-2"
                            onClick={() => setShowModelSelector(true)}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </Button>
                          {selectedModelsForComparison.length > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs text-gray-500 h-7"
                              onClick={clearSelectedModels}
                            >
                              Clear all
                            </Button>
                          )}
                        </div>

                        {/* Comparison charts */}
                        <div className="space-y-8">
                          {/* Overall Score Comparison */}
                          <div>
                            <h3 className="text-base font-medium text-dark-accent mb-3">Overall Score Comparison</h3>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="w-32 text-sm font-medium text-gray-700">{model.name}</div>
                                <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                                  <div
                                    className="h-full bg-yellow-accent rounded-lg"
                                    style={{ width: `${model.score}%` }}
                                  ></div>
                                  <div className="absolute inset-0 flex items-center px-3">
                                    <span className="text-xs font-medium text-gray-800">{model.score}%</span>
                                  </div>
                                </div>
                              </div>

                              {selectedModelsForComparison.map((id) => {
                                const compModel = modelsData[id as keyof typeof modelsData]
                                return (
                                  <div key={id} className="flex items-center gap-3">
                                    <div className="w-32 text-sm font-medium text-gray-700">{compModel.name}</div>
                                    <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                                      <div
                                        className="h-full bg-blue-400 rounded-lg"
                                        style={{ width: `${compModel.score}%` }}
                                      ></div>
                                      <div className="absolute inset-0 flex items-center px-3">
                                        <span className="text-xs font-medium text-gray-800">{compModel.score}%</span>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>

                          {/* STRIDE Coverage Comparison */}
                          <div>
                            <h3 className="text-base font-medium text-dark-accent mb-3">STRIDE Coverage Comparison</h3>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="w-32 text-sm font-medium text-gray-700">{model.name}</div>
                                <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                                  <div
                                    className="h-full bg-yellow-accent rounded-lg"
                                    style={{ width: `${model.strideScore}%` }}
                                  ></div>
                                  <div className="absolute inset-0 flex items-center px-3">
                                    <span className="text-xs font-medium text-gray-800">{model.strideScore}%</span>
                                  </div>
                                </div>
                              </div>

                              {selectedModelsForComparison.map((id) => {
                                const compModel = modelsData[id as keyof typeof modelsData]
                                return (
                                  <div key={id} className="flex items-center gap-3">
                                    <div className="w-32 text-sm font-medium text-gray-700">{compModel.name}</div>
                                    <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                                      <div
                                        className="h-full bg-purple-400 rounded-lg"
                                        style={{ width: `${compModel.strideScore}%` }}
                                      ></div>
                                      <div className="absolute inset-0 flex items-center px-3">
                                        <span className="text-xs font-medium text-gray-800">
                                          {compModel.strideScore}%
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>

                          {/* Completeness Comparison */}
                          <div>
                            <h3 className="text-base font-medium text-dark-accent mb-3">Completeness Comparison</h3>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="w-32 text-sm font-medium text-gray-700">{model.name}</div>
                                <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                                  <div
                                    className="h-full bg-yellow-accent rounded-lg"
                                    style={{ width: `${model.completeness}%` }}
                                  ></div>
                                  <div className="absolute inset-0 flex items-center px-3">
                                    <span className="text-xs font-medium text-gray-800">{model.completeness}%</span>
                                  </div>
                                </div>
                              </div>

                              {selectedModelsForComparison.map((id) => {
                                const compModel = modelsData[id as keyof typeof modelsData]
                                return (
                                  <div key={id} className="flex items-center gap-3">
                                    <div className="w-32 text-sm font-medium text-gray-700">{compModel.name}</div>
                                    <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                                      <div
                                        className="h-full bg-green-400 rounded-lg"
                                        style={{ width: `${compModel.completeness}%` }}
                                      ></div>
                                      <div className="absolute inset-0 flex items-center px-3">
                                        <span className="text-xs font-medium text-gray-800">
                                          {compModel.completeness}%
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>

                          {/* Cognitive Consistency Comparison */}
                          <div>
                            <h3 className="text-base font-medium text-dark-accent mb-3">
                              Cognitive Consistency Comparison
                            </h3>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="w-32 text-sm font-medium text-gray-700">{model.name}</div>
                                <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                                  <div
                                    className="h-full bg-yellow-accent rounded-lg"
                                    style={{ width: `${model.cognitiveConsistency}%` }}
                                  ></div>
                                  <div className="absolute inset-0 flex items-center px-3">
                                    <span className="text-xs font-medium text-gray-800">
                                      {model.cognitiveConsistency}%
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {selectedModelsForComparison.map((id) => {
                                const compModel = modelsData[id as keyof typeof modelsData]
                                return (
                                  <div key={id} className="flex items-center gap-3">
                                    <div className="w-32 text-sm font-medium text-gray-700">{compModel.name}</div>
                                    <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                                      <div
                                        className="h-full bg-teal-400 rounded-lg"
                                        style={{ width: `${compModel.cognitiveConsistency}%` }}
                                      ></div>
                                      <div className="absolute inset-0 flex items-center px-3">
                                        <span className="text-xs font-medium text-gray-800">
                                          {compModel.cognitiveConsistency}%
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Model selector modal */}
                {showModelSelector && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-lg max-w-md w-full max-h-[80vh] flex flex-col">
                      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-dark-accent">Select Models to Compare</h3>
                        <button
                          onClick={() => setShowModelSelector(false)}
                          className="text-gray-500 hover:text-dark-accent"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-2">
                          {availableModelsForComparison.map((id) => {
                            const compModel = modelsData[id as keyof typeof modelsData]
                            const isSelected = selectedModelsForComparison.includes(id)

                            return (
                              <div
                                key={id}
                                className={`p-3 border rounded-lg cursor-pointer flex items-center justify-between ${
                                  isSelected
                                    ? "border-cream-yellow-dark bg-cream-yellow-light"
                                    : "border-gray-200 hover:border-cream-yellow hover:bg-cream-yellow-light/50"
                                }`}
                                onClick={() => toggleModelSelection(id)}
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                      isSelected ? "bg-cream-yellow-dark" : "bg-gray-100"
                                    }`}
                                  >
                                    {isSelected ? (
                                      <Check className="w-4 h-4 text-white" />
                                    ) : (
                                      <Plus className="w-4 h-4 text-gray-500" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-medium text-dark-accent">{compModel.name}</p>
                                    <p className="text-xs text-gray-500">
                                      {compModel.provider} • {compModel.parameters}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-sm font-semibold text-dark-accent">{compModel.score}%</div>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      <div className="p-4 border-t border-gray-100 flex justify-between">
                        <Button
                          variant="outline"
                          onClick={() => setSelectedModelsForComparison([])}
                          className="text-gray-600"
                        >
                          Clear All
                        </Button>
                        <Button
                          onClick={() => setShowModelSelector(false)}
                          className="bg-dark-accent text-white hover:bg-dark-accent-light"
                        >
                          Done
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* 文档模态框 */}
      {showDocModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg max-w-3xl w-full max-h-[80vh] flex flex-col">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-dark-accent">{model.name} Documentation</h3>
              <button onClick={() => setShowDocModal(false)} className="text-gray-500 hover:text-dark-accent">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose max-w-none">
                <h2 className="text-xl font-bold text-dark-accent mb-4">Model Overview</h2>
                <p className="mb-4">{model.description}</p>

                <h3 className="text-lg font-semibold text-dark-accent mt-6 mb-3">Technical Specifications</h3>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>
                    <strong>Provider:</strong> {model.provider}
                  </li>
                  <li>
                    <strong>Parameters:</strong> {model.parameters}
                  </li>
                  <li>
                    <strong>Release Date:</strong> {model.date}
                  </li>
                  <li>
                    <strong>Category:</strong> {model.category}
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-dark-accent mt-6 mb-3">Performance Metrics</h3>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>
                    <strong>Overall Score:</strong> {model.score}
                  </li>
                  <li>
                    <strong>STRIDE Coverage:</strong> {model.strideScore}
                  </li>
                  <li>
                    <strong>Completeness:</strong> {model.completeness}
                  </li>
                  <li>
                    <strong>Cognitive Consistency:</strong> {model.cognitiveConsistency}
                  </li>
                </ul>

                <h3 className="text-lg font-semibold text-dark-accent mt-6 mb-3">Usage Guidelines</h3>
                <p className="mb-4">
                  This model is designed for general-purpose emotional intelligence tasks in intimate relationship
                  contexts. It performs best when given clear, detailed prompts about relationship scenarios.
                </p>

                <h3 className="text-lg font-semibold text-dark-accent mt-6 mb-3">Limitations</h3>
                <p className="mb-4">
                  While this model performs well on emotional intelligence tasks, it may have limitations in highly
                  specialized relationship contexts or when dealing with cultural nuances that weren't well-represented
                  in its training data.
                </p>

                <h3 className="text-lg font-semibold text-dark-accent mt-6 mb-3">Benchmark Methodology</h3>
                <p>
                  This model was evaluated using the LQ-Bench methodology, which tests emotional intelligence
                  capabilities across various relationship scenarios. For more details on the evaluation process, please
                  visit the{" "}
                  <Link href="/methodology" className="text-dark-accent hover:underline">
                    Methodology
                  </Link>{" "}
                  page.
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-end">
              <Button
                onClick={() => setShowDocModal(false)}
                className="bg-dark-accent text-white hover:bg-dark-accent-light"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
