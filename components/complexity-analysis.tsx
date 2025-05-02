"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"

// 模型数据
const models = [
  {
    id: "gamma-3-27b-it",
    name: "gamma-3-27b-it",
    color: "#36A2EB",
    simple: 81,
    moderate: 82,
    complex: 83,
  },
  {
    id: "gamma-3-12b-it",
    name: "gamma-3-12b-it",
    color: "#4BC0C0",
    simple: 82,
    moderate: 81,
    complex: 81,
  },
  {
    id: "gamma-3-4b-it",
    name: "gamma-3-4b-it",
    color: "#FF6384",
    simple: 77,
    moderate: 76,
    complex: 78,
  },
  {
    id: "mistral-small-3.1-24b-instruct-2503",
    name: "mistral-small-3.1-24b-instruct-2503",
    color: "#FF9F40",
    simple: 73,
    moderate: 74,
    complex: 72,
  },
  {
    id: "gamma-2-27b-it",
    name: "gamma-2-27b-it",
    color: "#A78BFA",
    simple: 69,
    moderate: 70,
    complex: 73,
  },
  {
    id: "DeepSeek-R1-Distill-Qwen-32B",
    name: "DeepSeek-R1-Distill-Qwen-32B",
    color: "#FFD700",
    simple: 67,
    moderate: 71,
    complex: 69,
  },
  {
    id: "mistral-7b-instruct-v0.3",
    name: "mistral-7b-instruct-v0.3",
    color: "#9966FF",
    simple: 58,
    moderate: 61,
    complex: 62,
  },
  {
    id: "Phi-4",
    name: "Phi-4",
    color: "#00CC99",
    simple: 65,
    moderate: 67,
    complex: 66,
  },
  {
    id: "llama-3.2-3b-instruct",
    name: "llama-3.2-3b-instruct",
    color: "#FF6666",
    simple: 63,
    moderate: 62,
    complex: 60,
  },
  {
    id: "qwen2.5-7b-instruct-1m",
    name: "qwen2.5-7b-instruct-1m",
    color: "#66B3FF",
    simple: 64,
    moderate: 65,
    complex: 63,
  },
  {
    id: "granite-3.2-8b-instruct",
    name: "granite-3.2-8b-instruct",
    color: "#99CC99",
    simple: 62,
    moderate: 63,
    complex: 61,
  },
  {
    id: "deepseek-r1-distill-qwen-7b",
    name: "deepseek-r1-distill-qwen-7b",
    color: "#FFCC99",
    simple: 60,
    moderate: 59,
    complex: 58,
  },
]

// 默认选中的模型
const defaultSelectedModels = [
  "gamma-3-27b-it",
  "gamma-3-12b-it",
  "gamma-3-4b-it",
  "mistral-small-3.1-24b-instruct-2503",
  "gamma-2-27b-it",
  "DeepSeek-R1-Distill-Qwen-32B",
  "mistral-7b-instruct-v0.3",
]

export function ComplexityAnalysis() {
  const [selectedTab, setSelectedTab] = useState("top-models")
  const [selectedModels, setSelectedModels] = useState<string[]>(defaultSelectedModels)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // 处理模型选择
  const handleModelToggle = (modelId: string) => {
    if (selectedModels.includes(modelId)) {
      setSelectedModels(selectedModels.filter((id) => id !== modelId))
    } else {
      setSelectedModels([...selectedModels, modelId])
    }
  }

  // 获取选中的模型数据
  const filteredModels = models.filter((model) => selectedModels.includes(model.id))

  // 计算图表的最大高度
  const chartHeight = 300
  const maxPercentage = 100

  // 根据主题设置颜色
  const textColor = isDark ? "text-gray-300" : "text-gray-500"
  const labelColor = isDark ? "text-gray-200" : "text-gray-600"
  const gridColor = isDark ? "border-gray-700" : "border-gray-100"
  const axisColor = isDark ? "border-gray-600" : "border-gray-200"

  return (
    <Card className="bg-white dark:bg-gray-800 rounded-2xl border-0 shadow-card card-hover">
      <CardHeader>
        <CardTitle className="text-dark-accent dark:text-cream-yellow card-title">Complexity Analysis</CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-400 card-description">
          Performance across different complexity levels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
          <TabsList className="bg-light-gray dark:bg-gray-700 rounded-xl p-1 w-auto inline-flex">
            <TabsTrigger value="top-models" className="rounded-lg data-[state=active]:tab-active tabs-trigger">
              Top Models
            </TabsTrigger>
            <TabsTrigger value="custom-selection" className="rounded-lg data-[state=active]:tab-active tabs-trigger">
              Custom Selection
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {selectedTab === "custom-selection" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {models.map((model) => (
              <div key={model.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`model-${model.id}`}
                  checked={selectedModels.includes(model.id)}
                  onChange={() => handleModelToggle(model.id)}
                  className="rounded border-gray-300 dark:border-gray-600 text-cream-yellow-dark focus:ring-cream-yellow-dark mr-2"
                />
                <label htmlFor={`model-${model.id}`} className={`text-sm ${labelColor} cursor-pointer`}>
                  {model.name}
                </label>
              </div>
            ))}
          </div>
        )}

        {/* 图例 */}
        <div className="flex flex-wrap gap-4 mb-4">
          {filteredModels.map((model) => (
            <div key={model.id} className="flex items-center">
              <div className="w-4 h-4 mr-1" style={{ backgroundColor: model.color }}></div>
              <span className={`text-xs ${labelColor}`}>{model.name}</span>
            </div>
          ))}
        </div>

        {/* 图表 */}
        <div className="relative h-[300px] mt-8">
          {/* Y轴标签 */}
          <div className={`absolute left-0 top-0 h-full flex flex-col justify-between text-xs ${textColor}`}>
            <div>100%</div>
            <div>90%</div>
            <div>80%</div>
            <div>70%</div>
            <div>60%</div>
            <div>50%</div>
            <div>40%</div>
            <div>30%</div>
            <div>20%</div>
            <div>10%</div>
            <div>0%</div>
          </div>

          {/* 图表内容 */}
          <div className="ml-10 h-full flex">
            {/* 简单复杂度 */}
            <div className="flex-1 flex flex-col">
              <div className={`flex-1 border-b border-l ${axisColor} relative`}>
                {/* 水平网格线 */}
                <div className="absolute w-full h-full">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-full border-t ${gridColor}`}
                      style={{ bottom: `${(i + 1) * 10}%` }}
                    ></div>
                  ))}
                </div>

                {/* 柱状图 */}
                <div className="absolute bottom-0 w-full flex justify-around items-end h-full">
                  {filteredModels.map((model, index) => (
                    <div key={`simple-${model.id}`} className="w-[8%] h-full flex items-end justify-center">
                      <div
                        className="w-full rounded-t"
                        style={{
                          height: `${(model.simple / maxPercentage) * 100}%`,
                          backgroundColor: model.color,
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`text-center text-xs ${textColor} mt-2`}>Simple</div>
            </div>

            {/* 中等复杂度 */}
            <div className="flex-1 flex flex-col">
              <div className={`flex-1 border-b border-l ${axisColor} relative`}>
                {/* 水平网格线 */}
                <div className="absolute w-full h-full">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-full border-t ${gridColor}`}
                      style={{ bottom: `${(i + 1) * 10}%` }}
                    ></div>
                  ))}
                </div>

                {/* 柱状图 */}
                <div className="absolute bottom-0 w-full flex justify-around items-end h-full">
                  {filteredModels.map((model) => (
                    <div key={`moderate-${model.id}`} className="w-[8%] h-full flex items-end justify-center">
                      <div
                        className="w-full rounded-t"
                        style={{
                          height: `${(model.moderate / maxPercentage) * 100}%`,
                          backgroundColor: model.color,
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`text-center text-xs ${textColor} mt-2`}>Moderate</div>
            </div>

            {/* 高复杂度 */}
            <div className="flex-1 flex flex-col">
              <div className={`flex-1 border-b border-l border-r ${axisColor} relative`}>
                {/* 水平网格线 */}
                <div className="absolute w-full h-full">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-full border-t ${gridColor}`}
                      style={{ bottom: `${(i + 1) * 10}%` }}
                    ></div>
                  ))}
                </div>

                {/* 柱状图 */}
                <div className="absolute bottom-0 w-full flex justify-around items-end h-full">
                  {filteredModels.map((model) => (
                    <div key={`complex-${model.id}`} className="w-[8%] h-full flex items-end justify-center">
                      <div
                        className="w-full rounded-t"
                        style={{
                          height: `${(model.complex / maxPercentage) * 100}%`,
                          backgroundColor: model.color,
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`text-center text-xs ${textColor} mt-2`}>Complex</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
