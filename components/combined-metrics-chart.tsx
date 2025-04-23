"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"
import { useTheme } from "next-themes"

Chart.register(...registerables)

// 组合指标图表 - 将多个相关指标合并到一个图表中
export function CombinedMetricsChart({ model }: { model: any }) {
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

    // 提取模型的关键指标
    const metrics = [
      { name: "Overall Score", value: model.score },
      { name: "STRIDE Coverage", value: model.strideScore },
      { name: "Completeness", value: model.completeness },
      { name: "Cognitive Consistency", value: model.cognitiveConsistency },
      { name: "Emotional Range", value: model.emotionalRange.range },
      { name: "Final Emotional State", value: model.emotionalRange.finalState },
    ]

    // 根据主题设置颜色
    const textColor = isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.7)"
    const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
    const angleLineColor = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"

    // 创建图表
    chartInstance.current = new Chart(ctx, {
      type: "radar",
      data: {
        labels: metrics.map((m) => m.name),
        datasets: [
          {
            label: model.name,
            data: metrics.map((m) => m.value),
            backgroundColor: isDark ? "rgba(255, 213, 79, 0.3)" : "rgba(255, 224, 130, 0.2)",
            borderColor: isDark ? "#FFD54F" : "#FFE082",
            borderWidth: 2,
            pointBackgroundColor: isDark ? "#FFD54F" : "#FFE082",
            pointBorderColor: isDark ? "#121212" : "#fff",
            pointHoverBackgroundColor: isDark ? "#121212" : "#fff",
            pointHoverBorderColor: isDark ? "#FFD54F" : "#FFE082",
          },
          {
            label: "Industry Average",
            data: [70, 65, 68, 65, 50, 60],
            backgroundColor: isDark ? "rgba(100, 255, 218, 0.3)" : "rgba(75, 192, 192, 0.2)",
            borderColor: isDark ? "rgba(100, 255, 218, 0.8)" : "rgba(75, 192, 192, 0.8)",
            borderWidth: 2,
            pointBackgroundColor: isDark ? "rgba(100, 255, 218, 0.8)" : "rgba(75, 192, 192, 0.8)",
            pointBorderColor: isDark ? "#121212" : "#fff",
            pointHoverBackgroundColor: isDark ? "#121212" : "#fff",
            pointHoverBorderColor: isDark ? "rgba(100, 255, 218, 0.8)" : "rgba(75, 192, 192, 0.8)",
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
              beginAtZero: true,
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
            labels: {
              font: {
                size: 11,
              },
              boxWidth: 12,
              color: textColor,
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.dataset.label}: ${context.raw}%`,
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [model, isDark])

  return (
    <div className="h-[350px]">
      <canvas ref={chartRef} />
    </div>
  )
}

// 情感和因素组合图表 - 将情感和因素相关指标合并到一个图表中
export function EmotionFactorsChart({ model }: { model: any }) {
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
    const textColor = isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.6)"
    const gridColor = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"

    // 暗模式下的颜色
    const barColors = isDark
      ? ["rgba(100, 255, 218, 0.7)", "rgba(255, 99, 132, 0.7)", "rgba(189, 147, 249, 0.7)", "rgba(255, 213, 79, 0.7)"]
      : ["rgba(75, 192, 192, 0.7)", "rgba(255, 99, 132, 0.7)", "rgba(153, 102, 255, 0.7)", "rgba(255, 205, 86, 0.7)"]

    const borderColors = isDark
      ? ["rgb(100, 255, 218)", "rgb(255, 99, 132)", "rgb(189, 147, 249)", "rgb(255, 213, 79)"]
      : ["rgb(75, 192, 192)", "rgb(255, 99, 132)", "rgb(153, 102, 255)", "rgb(255, 205, 86)"]

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Positive Factors", "Negative Factors", "Emotional Range", "Final Emotional State"],
        datasets: [
          {
            label: model.name,
            data: [
              model.factorsFrequency.positive,
              model.factorsFrequency.negative,
              model.emotionalRange.range,
              model.emotionalRange.finalState,
            ],
            backgroundColor: barColors,
            borderColor: borderColors,
            borderWidth: 1,
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: gridColor,
            },
            ticks: {
              color: textColor,
              font: {
                size: 11,
              },
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: textColor,
              font: {
                size: 11,
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || ""
                const value = context.raw as number
                return `${label}: ${value}%`
              },
              title: (context) => {
                const index = context[0].dataIndex
                const labels = ["Positive Factors", "Negative Factors", "Emotional Range", "Final Emotional State"]
                const descriptions = [
                  "Frequency of positive factors in responses",
                  "Frequency of negative factors in responses",
                  "Range of emotional variability in responses",
                  "Average final emotional state in responses",
                ]
                return `${labels[index]}: ${descriptions[index]}`
              },
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [model, isDark])

  return (
    <div className="h-[300px]">
      <canvas ref={chartRef} />
    </div>
  )
}
