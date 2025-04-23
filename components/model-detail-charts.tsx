"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"
import { useTheme } from "next-themes"

Chart.register(...registerables)

// 沟通类型雷达图
export function CommunicationTypeChart({ data }: { data: any }) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // 根据主题设置颜色
    const textColor = isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.7)"
    const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
    const angleLineColor = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"
    const backgroundColor = isDark ? "rgba(255, 213, 79, 0.3)" : "rgba(255, 224, 130, 0.2)"
    const borderColor = isDark ? "#FFD54F" : "#FFE082"
    const pointBackgroundColor = isDark ? "#FFD54F" : "#FFE082"
    const pointBorderColor = isDark ? "#121212" : "#fff"

    chartInstance.current = new Chart(ctx, {
      type: "radar",
      data: {
        labels: ["Assertive", "Responsive", "Analytical", "Expressive", "Directive"],
        datasets: [
          {
            label: "Communication Type",
            data: [data.assertive, data.responsive, data.analytical, data.expressive, data.directive],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 2,
            pointBackgroundColor: pointBackgroundColor,
            pointBorderColor: pointBorderColor,
            pointHoverBackgroundColor: isDark ? "#121212" : "#fff",
            pointHoverBorderColor: borderColor,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              color: angleLineColor,
            },
            grid: {
              color: gridColor,
            },
            pointLabels: {
              color: textColor,
              font: {
                size: 11,
              },
            },
            ticks: {
              backdropColor: isDark ? "#1e1e1e" : "transparent",
              color: textColor,
              font: {
                size: 10,
              },
              stepSize: 20,
              max: 100,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, isDark])

  return (
    <div className="h-[300px]">
      <canvas ref={chartRef} />
    </div>
  )
}

// 依恋风格雷达图
export function AttachmentStyleChart({ data }: { data: any }) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // 根据主题设置颜色
    const textColor = isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.7)"
    const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
    const angleLineColor = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"
    const backgroundColor = isDark ? "rgba(100, 255, 218, 0.3)" : "rgba(75, 192, 192, 0.2)"
    const borderColor = isDark ? "rgb(100, 255, 218)" : "rgb(75, 192, 192)"
    const pointBackgroundColor = isDark ? "rgb(100, 255, 218)" : "rgb(75, 192, 192)"
    const pointBorderColor = isDark ? "#121212" : "#fff"

    chartInstance.current = new Chart(ctx, {
      type: "radar",
      data: {
        labels: ["Secure", "Anxious", "Avoidant", "Disorganized"],
        datasets: [
          {
            label: "Attachment Style",
            data: [data.secure, data.anxious, data.avoidant, data.disorganized],
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 2,
            pointBackgroundColor: pointBackgroundColor,
            pointBorderColor: pointBorderColor,
            pointHoverBackgroundColor: isDark ? "#121212" : "#fff",
            pointHoverBorderColor: borderColor,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              color: angleLineColor,
            },
            grid: {
              color: gridColor,
            },
            pointLabels: {
              color: textColor,
              font: {
                size: 11,
              },
            },
            ticks: {
              backdropColor: isDark ? "#1e1e1e" : "transparent",
              color: textColor,
              font: {
                size: 10,
              },
              stepSize: 20,
              max: 100,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, isDark])

  return (
    <div className="h-[300px]">
      <canvas ref={chartRef} />
    </div>
  )
}

// 风格标记类别图
export function StyleMarkersChart({ data }: { data: any[] }) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // 根据主题设置颜色
  const barColor = isDark ? "bg-gradient-to-r from-yellow-300 to-yellow-500" : "bg-yellow-accent"
  const textColor = isDark ? "text-gray-200" : "text-gray-700"
  const valueColor = isDark ? "text-yellow-300" : "text-dark-accent"
  const bgColor = isDark ? "bg-gray-700" : "bg-gray-200"

  return (
    <div className="h-[300px] flex flex-col justify-center">
      {data.map((item, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className={`text-sm ${textColor}`}>{item.name}</span>
            <span className={`text-sm font-medium ${valueColor}`}>{item.value}%</span>
          </div>
          <div className={`w-full ${bgColor} rounded-full h-2.5`}>
            <div className={`${barColor} h-2.5 rounded-full`} style={{ width: `${item.value}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  )
}

// 积极因素和负面因素出现频率柱状图
export function FactorsFrequencyChart({ data }: { data: any }) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // 根据主题设置颜色
  const trackColor = isDark ? "text-gray-700" : "text-gray-200"
  const positiveColor = isDark ? "text-green-400" : "text-green-400"
  const negativeColor = isDark ? "text-red-400" : "text-red-400"
  const textColor = isDark ? "text-gray-200" : "text-gray-700"
  const valueColor = isDark ? "text-gray-100" : "text-gray-800"
  const labelColor = isDark ? "text-gray-300" : "text-gray-500"

  return (
    <div className="h-[300px] flex flex-col justify-center">
      <div className="grid grid-cols-2 gap-8">
        {/* 积极因素 */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className={`stroke-current ${trackColor}`}
                fill="none"
                strokeWidth="3"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={`stroke-current ${positiveColor}`}
                fill="none"
                strokeWidth="3"
                strokeDasharray={`${data.positive}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.5" className={`text-3xl font-semibold ${positiveColor}`} textAnchor="middle">
                {data.positive}%
              </text>
            </svg>
          </div>
          <span className={`text-sm font-medium ${textColor}`}>Positive Factors</span>
          <span className={`text-xs ${labelColor} mt-1`}>Frequency of occurrence</span>
        </div>

        {/* 负面因素 */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className={`stroke-current ${trackColor}`}
                fill="none"
                strokeWidth="3"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={`stroke-current ${negativeColor}`}
                fill="none"
                strokeWidth="3"
                strokeDasharray={`${data.negative}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.5" className={`text-3xl font-semibold ${negativeColor}`} textAnchor="middle">
                {data.negative}%
              </text>
            </svg>
          </div>
          <span className={`text-sm font-medium ${textColor}`}>Negative Factors</span>
          <span className={`text-xs ${labelColor} mt-1`}>Frequency of occurrence</span>
        </div>
      </div>
    </div>
  )
}

// 虚拟人物情感波动范围和最终情感状态柱状图
export function EmotionalRangeChart({ data }: { data: any }) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // 根据主题设置颜色
  const textColor = isDark ? "text-gray-200" : "text-gray-700"
  const valueColor = isDark ? "text-purple-300" : "text-purple-600"
  const valueColor2 = isDark ? "text-yellow-300" : "text-yellow-600"
  const bgColor = isDark ? "bg-gray-700" : "bg-gray-100"
  const barColor1 = isDark
    ? "bg-gradient-to-r from-purple-400 to-purple-600"
    : "bg-gradient-to-r from-purple-300 to-purple-600"
  const barColor2 = isDark
    ? "bg-gradient-to-r from-yellow-300 to-yellow-500"
    : "bg-gradient-to-r from-yellow-300 to-yellow-500"
  const labelColor = isDark ? "text-gray-400" : "text-gray-500"

  return (
    <div className="h-[300px] flex flex-col justify-center">
      <div className="space-y-8">
        {/* 情感波动范围 */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-medium ${textColor}`}>Emotional Range</span>
            <span className={`text-sm font-medium ${valueColor}`}>{data.range}%</span>
          </div>
          <div className={`h-4 ${bgColor} rounded-full overflow-hidden`}>
            <div className={`h-full ${barColor1} rounded-full`} style={{ width: `${data.range}%` }}></div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className={labelColor}>Low Variability</span>
            <span className={labelColor}>High Variability</span>
          </div>
        </div>

        {/* 最终情感状态 */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-medium ${textColor}`}>Final Emotional State</span>
            <span className={`text-sm font-medium ${valueColor2}`}>{data.finalState}%</span>
          </div>
          <div className={`h-4 ${bgColor} rounded-full overflow-hidden`}>
            <div className={`h-full ${barColor2} rounded-full`} style={{ width: `${data.finalState}%` }}></div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className={labelColor}>Negative</span>
            <span className={labelColor}>Positive</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Cognitive Model一致性比较均值图表
export function CognitiveConsistencyChart({ value }: { value: number }) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // 创建比较数据
  const industryAverage = 65
  const topPerformer = 85

  // 根据主题设置颜色
  const textColor = isDark ? "text-gray-200" : "text-gray-700"
  const valueColor = isDark ? "text-dark-accent dark:text-yellow-300" : "text-dark-accent"
  const valueColor2 = isDark ? "text-purple-300" : "text-purple-600"
  const valueColor3 = isDark ? "text-teal-300" : "text-teal-600"
  const bgColor = isDark ? "bg-gray-700" : "bg-gray-100"
  const barColor1 = isDark ? "bg-yellow-500" : "bg-yellow-accent"
  const barColor2 = isDark ? "bg-purple-500" : "bg-purple-400"
  const barColor3 = isDark ? "bg-teal-500" : "bg-teal-400"
  const labelColor = isDark ? "text-gray-300" : "text-gray-500"

  return (
    <div className="h-[300px] flex flex-col justify-center">
      <div className="space-y-6">
        {/* 当前模型 */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className={`text-sm font-medium ${textColor}`}>This Model</span>
            <span className={`text-sm font-medium ${valueColor}`}>{value}%</span>
          </div>
          <div className={`h-8 ${bgColor} rounded-lg overflow-hidden relative`}>
            <div className={`h-full ${barColor1} rounded-lg`} style={{ width: `${value}%` }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-800 dark:text-gray-200">{value}% Consistency</span>
            </div>
          </div>
        </div>

        {/* 行业平均 */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className={`text-sm font-medium ${textColor}`}>Industry Average</span>
            <span className={`text-sm font-medium ${valueColor2}`}>{industryAverage}%</span>
          </div>
          <div className={`h-8 ${bgColor} rounded-lg overflow-hidden relative`}>
            <div className={`h-full ${barColor2} rounded-lg`} style={{ width: `${industryAverage}%` }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                {industryAverage}% Consistency
              </span>
            </div>
          </div>
        </div>

        {/* 顶级表现者 */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className={`text-sm font-medium ${textColor}`}>Top Performer</span>
            <span className={`text-sm font-medium ${valueColor3}`}>{topPerformer}%</span>
          </div>
          <div className={`h-8 ${bgColor} rounded-lg overflow-hidden relative`}>
            <div className={`h-full ${barColor3} rounded-lg`} style={{ width: `${topPerformer}%` }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-800 dark:text-gray-200">{topPerformer}% Consistency</span>
            </div>
          </div>
        </div>

        {/* 图例和说明 */}
        <div className="flex justify-center mt-4">
          <div className={`text-xs ${labelColor} text-center max-w-xs`}>
            Cognitive consistency measures how well the model maintains internal logical coherence across different
            contexts
          </div>
        </div>
      </div>
    </div>
  )
}
