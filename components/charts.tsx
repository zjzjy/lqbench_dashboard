"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"
import { useTheme } from "next-themes"

Chart.register(...registerables)

export function BarChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // 销毁之前的图表实例
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // 为每个模型设置不同的颜色
    const modelColors = {
      light: [
        "rgba(255, 205, 86, 0.7)", // 黄色
        "rgba(75, 192, 192, 0.7)", // 青色
        "rgba(255, 99, 132, 0.7)", // 粉色
        "rgba(54, 162, 235, 0.7)", // 蓝色
        "rgba(153, 102, 255, 0.7)", // 紫色
        "rgba(255, 159, 64, 0.7)", // 橙色
        "rgba(201, 203, 207, 0.7)", // 灰色
      ],
      dark: [
        "rgba(255, 213, 79, 0.8)", // 亮黄色
        "rgba(100, 255, 218, 0.8)", // 亮青色
        "rgba(255, 121, 148, 0.8)", // 亮粉色
        "rgba(66, 185, 255, 0.8)", // 亮蓝色
        "rgba(189, 147, 249, 0.8)", // 亮紫色
        "rgba(255, 171, 76, 0.8)", // 亮橙色
        "rgba(220, 221, 225, 0.8)", // 亮灰色
      ],
    }

    const modelBorderColors = {
      light: [
        "rgb(255, 205, 86)", // 黄色
        "rgb(75, 192, 192)", // 青色
        "rgb(255, 99, 132)", // 粉色
        "rgb(54, 162, 235)", // 蓝色
        "rgb(153, 102, 255)", // 紫色
        "rgb(255, 159, 64)", // 橙色
        "rgb(201, 203, 207)", // 灰色
      ],
      dark: [
        "rgb(255, 213, 79)", // 亮黄色
        "rgb(100, 255, 218)", // 亮青色
        "rgb(255, 121, 148)", // 亮粉色
        "rgb(66, 185, 255)", // 亮蓝色
        "rgb(189, 147, 249)", // 亮紫色
        "rgb(255, 171, 76)", // 亮橙色
        "rgb(220, 221, 225)", // 亮灰色
      ],
    }

    const models = [
      { name: "gamma-3-27b-it", score: 81 },
      { name: "gamma-3-12b-it", score: 80 },
      { name: "gamma-3-4b-it", score: 77 },
      { name: "mistral-small-3.1-24b-instruct-2503", score: 73 },
      { name: "gamma-2-27b-it", score: 72 },
    ]

    // 使用颜色数组替换当前的单一颜色
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: models.map((m) => m.name),
        datasets: [
          {
            label: "Overall Score",
            data: models.map((m) => m.score),
            backgroundColor: models.map((_, index) =>
              isDark
                ? modelColors.dark[index % modelColors.dark.length]
                : modelColors.light[index % modelColors.light.length],
            ),
            borderColor: models.map((_, index) =>
              isDark
                ? modelBorderColors.dark[index % modelBorderColors.dark.length]
                : modelBorderColors.light[index % modelBorderColors.light.length],
            ),
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
              color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
            },
            ticks: {
              color: isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.7)",
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.7)",
              maxRotation: 45,
              minRotation: 45,
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.7)",
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
  }, [isDark])

  return (
    <div className="h-[300px]">
      <canvas ref={chartRef} />
    </div>
  )
}

export function RadarChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // 销毁之前的图表实例
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // 根据主题设置颜色
    const textColor = isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.7)"
    const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
    const angleLineColor = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"

    // 暗模式下的数据集颜色
    const modelColors = {
      light: [
        "rgba(255, 205, 86, 0.2)", // 黄色
        "rgba(75, 192, 192, 0.2)", // 青色
        "rgba(255, 99, 132, 0.2)", // 粉色
        "rgba(54, 162, 235, 0.2)", // 蓝色
        "rgba(153, 102, 255, 0.2)", // 紫色
      ],
      dark: [
        "rgba(255, 213, 79, 0.3)", // 亮黄色
        "rgba(100, 255, 218, 0.3)", // 亮青色
        "rgba(255, 121, 148, 0.3)", // 亮粉色
        "rgba(66, 185, 255, 0.3)", // 亮蓝色
        "rgba(189, 147, 249, 0.3)", // 亮紫色
      ],
    }

    const modelBorderColors = {
      light: [
        "rgb(255, 205, 86)", // 黄色
        "rgb(75, 192, 192)", // 青色
        "rgb(255, 99, 132)", // 粉色
        "rgb(54, 162, 235)", // 蓝色
        "rgb(153, 102, 255)", // 紫色
      ],
      dark: [
        "rgb(255, 213, 79)", // 亮黄色
        "rgb(100, 255, 218)", // 亮青色
        "rgb(255, 121, 148)", // 亮粉色
        "rgb(66, 185, 255)", // 亮蓝色
        "rgb(189, 147, 249)", // 亮紫色
      ],
    }

    const topModels = [
      {
        name: "gamma-3-27b-it",
        score: 81,
        strideScore: 85,
        completeness: 78,
        cognitiveConsistency: 82,
        emotionalRange: { range: 79 },
      },
      {
        name: "gamma-3-12b-it",
        score: 80,
        strideScore: 82,
        completeness: 79,
        cognitiveConsistency: 80,
        emotionalRange: { range: 78 },
      },
      {
        name: "gamma-3-4b-it",
        score: 77,
        strideScore: 75,
        completeness: 76,
        cognitiveConsistency: 78,
        emotionalRange: { range: 80 },
      },
    ]

    // 创建新的图表
    chartInstance.current = new Chart(ctx, {
      type: "radar",
      data: {
        labels: ["Overall Score", "STRIDE Coverage", "Threat Completeness", "Technical Validity", "JSON Compliance"],
        datasets: topModels.map((model, index) => ({
          label: model.name,
          data: [
            model.score,
            model.strideScore,
            model.completeness,
            model.cognitiveConsistency || 65,
            model.emotionalRange?.range || 60,
          ],
          backgroundColor: isDark
            ? modelColors.dark[index % modelColors.dark.length]
            : modelColors.light[index % modelColors.light.length],
          borderColor: isDark
            ? modelBorderColors.dark[index % modelBorderColors.dark.length]
            : modelBorderColors.light[index % modelBorderColors.light.length],
          borderWidth: 2,
          pointBackgroundColor: isDark
            ? modelBorderColors.dark[index % modelBorderColors.dark.length]
            : modelBorderColors.light[index % modelBorderColors.light.length],
          pointBorderColor: isDark ? "#121212" : "#fff",
          pointHoverBackgroundColor: isDark ? "#121212" : "#fff",
          pointHoverBorderColor: isDark
            ? modelBorderColors.dark[index % modelBorderColors.dark.length]
            : modelBorderColors.light[index % modelBorderColors.light.length],
        })),
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
            },
            ticks: {
              backdropColor: isDark ? "#1e1e1e" : "transparent",
              color: textColor,
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: textColor,
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
  }, [isDark])

  return (
    <div className="h-[300px]">
      <canvas ref={chartRef} />
    </div>
  )
}
