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

    // 根据主题设置颜色
    const textColor = isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.7)"
    const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"
    const barColor = isDark ? "#FFD54F" : "#FFE082"
    const barBorderColor = isDark ? "#FFECB3" : "#FFEFC3"

    // 创建新的图表
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "gamma-3-27b-it",
          "gamma-3-12b-it",
          "gamma-3-4b-it",
          "mistral-small-3.1-24b-instruct-2503",
          "gamma-2-27b-it",
        ],
        datasets: [
          {
            label: "Overall Score",
            data: [81, 80, 77, 73, 72],
            backgroundColor: barColor,
            borderColor: barBorderColor,
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
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: textColor,
              maxRotation: 45,
              minRotation: 45,
            },
          },
        },
        plugins: {
          legend: {
            display: true,
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
    const datasets = [
      {
        label: "gamma-3-27b-it",
        data: [81, 85, 78, 82, 79],
        backgroundColor: isDark ? "rgba(255, 213, 79, 0.3)" : "rgba(255, 224, 130, 0.2)",
        borderColor: isDark ? "#FFD54F" : "#FFE082",
        borderWidth: 2,
        pointBackgroundColor: isDark ? "#FFD54F" : "#FFE082",
        pointBorderColor: isDark ? "#121212" : "#fff",
        pointHoverBackgroundColor: isDark ? "#121212" : "#fff",
        pointHoverBorderColor: isDark ? "#FFD54F" : "#FFE082",
      },
      {
        label: "gamma-3-12b-it",
        data: [80, 82, 79, 80, 78],
        backgroundColor: isDark ? "rgba(100, 255, 218, 0.3)" : "rgba(75, 192, 192, 0.2)",
        borderColor: isDark ? "rgb(100, 255, 218)" : "rgb(75, 192, 192)",
        borderWidth: 2,
        pointBackgroundColor: isDark ? "rgb(100, 255, 218)" : "rgb(75, 192, 192)",
        pointBorderColor: isDark ? "#121212" : "#fff",
        pointHoverBackgroundColor: isDark ? "#121212" : "#fff",
        pointHoverBorderColor: isDark ? "rgb(100, 255, 218)" : "rgb(75, 192, 192)",
      },
      {
        label: "gamma-3-4b-it",
        data: [77, 75, 76, 78, 80],
        backgroundColor: isDark ? "rgba(189, 147, 249, 0.3)" : "rgba(153, 102, 255, 0.2)",
        borderColor: isDark ? "rgb(189, 147, 249)" : "rgb(153, 102, 255)",
        borderWidth: 2,
        pointBackgroundColor: isDark ? "rgb(189, 147, 249)" : "rgb(153, 102, 255)",
        pointBorderColor: isDark ? "#121212" : "#fff",
        pointHoverBackgroundColor: isDark ? "#121212" : "#fff",
        pointHoverBorderColor: isDark ? "rgb(189, 147, 249)" : "rgb(153, 102, 255)",
      },
    ]

    // 创建新的图表
    chartInstance.current = new Chart(ctx, {
      type: "radar",
      data: {
        labels: ["Overall Score", "STRIDE Coverage", "Threat Completeness", "Technical Validity", "JSON Compliance"],
        datasets: datasets,
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
