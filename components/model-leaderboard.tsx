"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Search, Download, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// 模型数据
const models = [
  {
    id: 1,
    name: "gamma-3-27b-it",
    provider: "Anthropic",
    category: "General",
    parameters: "27B",
    score: 81,
    strideScore: 85,
    completeness: 78,
    date: "Mar 15, 2024",
    status: "Top Performer",
  },
  {
    id: 2,
    name: "gamma-3-12b-it",
    provider: "Anthropic",
    category: "General",
    parameters: "12B",
    score: 80,
    strideScore: 82,
    completeness: 79,
    date: "Mar 15, 2024",
    status: "Top Performer",
  },
  {
    id: 3,
    name: "gamma-3-4b-it",
    provider: "Anthropic",
    category: "General",
    parameters: "4B",
    score: 77,
    strideScore: 75,
    completeness: 76,
    date: "Mar 15, 2024",
    status: "High Performer",
  },
  {
    id: 4,
    name: "mistral-small-3.1-24b-instruct-2503",
    provider: "Mistral AI",
    category: "General",
    parameters: "24B",
    score: 73,
    strideScore: 71,
    completeness: 74,
    date: "Mar 25, 2024",
    status: "High Performer",
  },
  {
    id: 5,
    name: "gamma-2-27b-it",
    provider: "Anthropic",
    category: "General",
    parameters: "27B",
    score: 72,
    strideScore: 70,
    completeness: 73,
    date: "Jan 25, 2024",
    status: "High Performer",
  },
  {
    id: 6,
    name: "gpt-4o",
    provider: "OpenAI",
    category: "General",
    parameters: "Unknown",
    score: 71,
    strideScore: 73,
    completeness: 70,
    date: "Apr 9, 2024",
    status: "High Performer",
  },
  {
    id: 7,
    name: "claude-3-opus-20240229",
    provider: "Anthropic",
    category: "General",
    parameters: "Unknown",
    score: 70,
    strideScore: 72,
    completeness: 69,
    date: "Feb 29, 2024",
    status: "High Performer",
  },
]

// 状态标签组件
function StatusBadge({ status }: { status: string }) {
  let bgColor = "bg-gray-100 text-gray-600"
  let dotColor = "bg-gray-400"

  if (status === "Top Performer") {
    bgColor = "bg-green-50 text-green-700"
    dotColor = "bg-green-500"
  } else if (status === "High Performer") {
    bgColor = "bg-blue-50 text-blue-700"
    dotColor = "bg-blue-500"
  } else if (status === "Average") {
    bgColor = "bg-yellow-50 text-yellow-700"
    dotColor = "bg-yellow-500"
  }

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${bgColor}`}>
      <span className={`w-2 h-2 rounded-full mr-1.5 ${dotColor}`}></span>
      {status}
    </div>
  )
}

// 模型图标组件 - 使用简单图案作为占位符
function ModelIcon({ provider, id }: { provider: string; id: number }) {
  // 根据提供商和ID生成不同的图案
  let bgColor = "bg-gray-100"
  let pattern = null

  if (provider === "Anthropic") {
    bgColor = "bg-cream-yellow-light"

    // 为Anthropic模型创建不同的图案
    if (id % 3 === 0) {
      pattern = (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-5 h-5 rounded-full border-2 border-yellow-500"></div>
        </div>
      )
    } else if (id % 3 === 1) {
      pattern = (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-5 h-5 bg-yellow-500 rotate-45 transform"></div>
        </div>
      )
    } else {
      pattern = (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-5 h-1 bg-yellow-500 rounded-full"></div>
          <div className="w-1 h-5 bg-yellow-500 rounded-full absolute"></div>
        </div>
      )
    }
  } else if (provider === "OpenAI") {
    bgColor = "bg-green-50"
    pattern = (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-green-500 rounded-md"></div>
      </div>
    )
  } else if (provider === "Mistral AI") {
    bgColor = "bg-blue-50"
    pattern = (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-5 h-5">
          <div className="w-full h-1 bg-blue-500 mb-1 rounded-full"></div>
          <div className="w-full h-1 bg-blue-500 mb-1 rounded-full"></div>
          <div className="w-full h-1 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    )
  }

  return <div className={`w-10 h-10 rounded-full flex items-center justify-center relative ${bgColor}`}>{pattern}</div>
}

export function ModelLeaderboard() {
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [sortField, setSortField] = useState<string>("score")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // 排序函数
  const sortedModels = [...models].sort((a, b) => {
    const fieldA = a[sortField as keyof typeof a]
    const fieldB = b[sortField as keyof typeof b]

    if (typeof fieldA === "number" && typeof fieldB === "number") {
      return sortDirection === "asc" ? fieldA - fieldB : fieldB - fieldA
    }

    if (typeof fieldA === "string" && typeof fieldB === "string") {
      return sortDirection === "asc" ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA)
    }

    return 0
  })

  // 处理排序
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  // 处理选择行
  const handleSelectRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }

  // 处理全选
  const handleSelectAll = () => {
    if (selectedRows.length === models.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(models.map((model) => model.id))
    }
  }

  // 排序图标
  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return <ChevronDown className="w-4 h-4 text-gray-400" />
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4 text-dark-accent" />
    ) : (
      <ChevronDown className="w-4 h-4 text-dark-accent" />
    )
  }

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
      {/* 过滤器和搜索 */}
      <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1 text-gray-600 text-xs">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Columns</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1 text-gray-600">
            <span>Provider</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1 text-gray-600">
            <span>Category</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1 text-gray-600">
            <span>Status</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search models..."
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cream-yellow-dark focus:border-transparent"
            />
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-1 text-gray-600">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* 表格 */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-4 py-3 text-left">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === models.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-cream-yellow-dark focus:ring-cream-yellow-dark"
                  />
                </div>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  className="flex items-center text-xs font-medium text-gray-600 hover:text-dark-accent"
                  onClick={() => handleSort("name")}
                >
                  Model Name
                  <SortIcon field="name" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  className="flex items-center text-xs font-medium text-gray-600 hover:text-dark-accent"
                  onClick={() => handleSort("provider")}
                >
                  Provider
                  <SortIcon field="provider" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  className="flex items-center text-xs font-medium text-gray-600 hover:text-dark-accent"
                  onClick={() => handleSort("category")}
                >
                  Category
                  <SortIcon field="category" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  className="flex items-center text-xs font-medium text-gray-600 hover:text-dark-accent"
                  onClick={() => handleSort("parameters")}
                >
                  Parameters
                  <SortIcon field="parameters" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  className="flex items-center text-xs font-medium text-gray-600 hover:text-dark-accent"
                  onClick={() => handleSort("score")}
                >
                  Overall Score
                  <SortIcon field="score" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  className="flex items-center text-xs font-medium text-gray-600 hover:text-dark-accent"
                  onClick={() => handleSort("date")}
                >
                  Release Date
                  <SortIcon field="date" />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  className="flex items-center text-xs font-medium text-gray-600 hover:text-dark-accent"
                  onClick={() => handleSort("status")}
                >
                  Status
                  <SortIcon field="status" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedModels.map((model) => {
              const isSelected = selectedRows.includes(model.id)
              return (
                <tr
                  key={model.id}
                  className={`border-b border-gray-100 hover:bg-light-gray-light transition-colors ${
                    isSelected ? "bg-cream-yellow-light" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(model.id)}
                        className="rounded border-gray-300 text-cream-yellow-dark focus:ring-cream-yellow-dark"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <ModelIcon provider={model.provider} id={model.id} />
                      <div>
                        <Link
                          href={`/model/${model.name}`}
                          className="font-medium text-dark-accent text-sm hover:underline"
                        >
                          {model.name}
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{model.provider}</td>
                  <td className="px-4 py-3 text-gray-600">{model.category}</td>
                  <td className="px-4 py-3 text-gray-600">{model.parameters}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-dark-accent">{model.score}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{model.date}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={model.status} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      <div className="p-4 border-t border-gray-100 flex items-center justify-between">
        <div className="text-xs text-gray-500">Showing 1-7 of 7 models</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-gray-600" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="text-gray-600" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
