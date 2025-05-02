"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Search, Download, SlidersHorizontal, X, Check } from "lucide-react"
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

// 获取唯一值的辅助函数
const getUniqueValues = (data: any[], key: string) => {
  return [...new Set(data.map((item) => item[key]))]
}

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

// 下拉菜单组件
function FilterDropdown({
  title,
  options,
  selectedOptions,
  onSelect,
  isOpen,
  onToggle,
}: {
  title: string
  options: string[]
  selectedOptions: string[]
  onSelect: (option: string) => void
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        className={`flex items-center gap-1 ${selectedOptions.length > 0 ? "text-dark-accent border-cream-yellow-dark" : "text-gray-600"}`}
        onClick={onToggle}
      >
        <span>{title}</span>
        {selectedOptions.length > 0 && (
          <span className="bg-cream-yellow-light text-dark-accent rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {selectedOptions.length}
          </span>
        )}
        <ChevronDown className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200">
          <div className="p-2 border-b border-gray-100 flex justify-between items-center">
            <span className="text-sm font-medium">Filter by {title}</span>
            {selectedOptions.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs text-gray-500 hover:text-gray-700"
                onClick={() => {
                  options.forEach((option) => {
                    if (selectedOptions.includes(option)) {
                      onSelect(option)
                    }
                  })
                }}
              >
                Clear
              </Button>
            )}
          </div>
          <div className="max-h-60 overflow-y-auto p-1">
            {options.map((option) => (
              <div
                key={option}
                className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer"
                onClick={() => onSelect(option)}
              >
                <div
                  className={`w-4 h-4 rounded border mr-2 flex items-center justify-center ${selectedOptions.includes(option) ? "bg-cream-yellow-dark border-cream-yellow-dark" : "border-gray-300"}`}
                >
                  {selectedOptions.includes(option) && <Check className="w-3 h-3 text-white" />}
                </div>
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// 列选择下拉菜单组件
function ColumnsDropdown({
  columns,
  visibleColumns,
  onToggleColumn,
  isOpen,
  onToggle,
}: {
  columns: { id: string; label: string }[]
  visibleColumns: string[]
  onToggleColumn: (columnId: string) => void
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="relative">
      <Button variant="outline" size="sm" className="flex items-center gap-1 text-gray-600 text-xs" onClick={onToggle}>
        <SlidersHorizontal className="w-3.5 h-3.5" />
        <span>Columns</span>
        <ChevronDown className="w-3.5 h-3.5" />
      </Button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200">
          <div className="p-2 border-b border-gray-100">
            <span className="text-sm font-medium">Toggle Columns</span>
          </div>
          <div className="max-h-60 overflow-y-auto p-1">
            {columns.map((column) => (
              <div
                key={column.id}
                className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer"
                onClick={() => onToggleColumn(column.id)}
              >
                <div
                  className={`w-4 h-4 rounded border mr-2 flex items-center justify-center ${visibleColumns.includes(column.id) ? "bg-cream-yellow-dark border-cream-yellow-dark" : "border-gray-300"}`}
                >
                  {visibleColumns.includes(column.id) && <Check className="w-3 h-3 text-white" />}
                </div>
                {column.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function ModelLeaderboard() {
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [sortField, setSortField] = useState<string>("score")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [searchQuery, setSearchQuery] = useState<string>("")

  // 导出状态
  const [exportLoading, setExportLoading] = useState(false)
  const [exportSuccess, setExportSuccess] = useState(false)

  // 筛选状态
  const [selectedProviders, setSelectedProviders] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])

  // 下拉菜单状态
  const [providerDropdownOpen, setProviderDropdownOpen] = useState<boolean>(false)
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState<boolean>(false)
  const [statusDropdownOpen, setStatusDropdownOpen] = useState<boolean>(false)
  const [columnsDropdownOpen, setColumnsDropdownOpen] = useState<boolean>(false)

  // 可见列配置
  const columns = [
    { id: "provider", label: "Provider" },
    { id: "category", label: "Category" },
    { id: "parameters", label: "Parameters" },
    { id: "score", label: "Overall Score" },
    { id: "date", label: "Release Date" },
    { id: "status", label: "Status" },
  ]
  const [visibleColumns, setVisibleColumns] = useState<string[]>(columns.map((col) => col.id))

  // 获取唯一值
  const uniqueProviders = getUniqueValues(models, "provider")
  const uniqueCategories = getUniqueValues(models, "category")
  const uniqueStatuses = getUniqueValues(models, "status")

  // 处理筛选
  const handleProviderSelect = (provider: string) => {
    setSelectedProviders((prev) => (prev.includes(provider) ? prev.filter((p) => p !== provider) : [...prev, provider]))
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleStatusSelect = (status: string) => {
    setSelectedStatuses((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }

  const handleToggleColumn = (columnId: string) => {
    setVisibleColumns((prev) => (prev.includes(columnId) ? prev.filter((c) => c !== columnId) : [...prev, columnId]))
  }

  // 关闭所有下拉菜单的函数
  const closeAllDropdowns = () => {
    setProviderDropdownOpen(false)
    setCategoryDropdownOpen(false)
    setStatusDropdownOpen(false)
    setColumnsDropdownOpen(false)
  }

  // 处理导出数据
  const handleExportData = () => {
    setExportLoading(true)

    // 模拟导出过程
    setTimeout(() => {
      try {
        // 准备导出数据 - 使用当前筛选后的模型
        const exportData = {
          models: sortedModels.map((model) => ({
            id: model.id,
            name: model.name,
            provider: model.provider,
            category: model.category,
            parameters: model.parameters,
            score: model.score,
            strideScore: model.strideScore,
            completeness: model.completeness,
            date: model.date,
            status: model.status,
          })),
          exportDate: new Date().toISOString(),
          filters: {
            providers: selectedProviders,
            categories: selectedCategories,
            statuses: selectedStatuses,
            search: searchQuery,
          },
        }

        // 创建JSON文件
        const dataStr = JSON.stringify(exportData, null, 2)
        const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

        // 创建下载链接
        const exportFileDefaultName = `lq-bench-models-export-${new Date().toISOString().slice(0, 10)}.json`
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

  // 处理下拉菜单切换
  const handleDropdownToggle = (dropdown: string) => {
    closeAllDropdowns()
    switch (dropdown) {
      case "provider":
        setProviderDropdownOpen((prev) => !prev)
        break
      case "category":
        setCategoryDropdownOpen((prev) => !prev)
        break
      case "status":
        setStatusDropdownOpen((prev) => !prev)
        break
      case "columns":
        setColumnsDropdownOpen((prev) => !prev)
        break
    }
  }

  // 排序函数
  const sortedModels = [...models]
    .filter((model) => {
      // 搜索过滤
      if (searchQuery && !model.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // 提供商过滤
      if (selectedProviders.length > 0 && !selectedProviders.includes(model.provider)) {
        return false
      }

      // 类别过滤
      if (selectedCategories.length > 0 && !selectedCategories.includes(model.category)) {
        return false
      }

      // 状态过滤
      if (selectedStatuses.length > 0 && !selectedStatuses.includes(model.status)) {
        return false
      }

      return true
    })
    .sort((a, b) => {
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
    if (selectedRows.length === sortedModels.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(sortedModels.map((model) => model.id))
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
          <ColumnsDropdown
            columns={columns}
            visibleColumns={visibleColumns}
            onToggleColumn={handleToggleColumn}
            isOpen={columnsDropdownOpen}
            onToggle={() => handleDropdownToggle("columns")}
          />

          <FilterDropdown
            title="Provider"
            options={uniqueProviders}
            selectedOptions={selectedProviders}
            onSelect={handleProviderSelect}
            isOpen={providerDropdownOpen}
            onToggle={() => handleDropdownToggle("provider")}
          />

          <FilterDropdown
            title="Category"
            options={uniqueCategories}
            selectedOptions={selectedCategories}
            onSelect={handleCategorySelect}
            isOpen={categoryDropdownOpen}
            onToggle={() => handleDropdownToggle("category")}
          />

          <FilterDropdown
            title="Status"
            options={uniqueStatuses}
            selectedOptions={selectedStatuses}
            onSelect={handleStatusSelect}
            isOpen={statusDropdownOpen}
            onToggle={() => handleDropdownToggle("status")}
          />

          {/* 显示活跃筛选器 */}
          {(selectedProviders.length > 0 || selectedCategories.length > 0 || selectedStatuses.length > 0) && (
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700"
              onClick={() => {
                setSelectedProviders([])
                setSelectedCategories([])
                setSelectedStatuses([])
              }}
            >
              Clear All Filters
              <X className="ml-1 w-3 h-3" />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cream-yellow-dark focus:border-transparent"
            />
            {searchQuery && (
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchQuery("")}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 text-gray-600"
            onClick={handleExportData}
            disabled={exportLoading || sortedModels.length === 0}
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
                <span>Export</span>
              </>
            )}
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
                    checked={sortedModels.length > 0 && selectedRows.length === sortedModels.length}
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
              {visibleColumns.includes("provider") && (
                <th className="px-4 py-3 text-left">
                  <button
                    className="flex items-center text-xs font-medium text-gray-600 hover:text-dark-accent"
                    onClick={() => handleSort("provider")}
                  >
                    Provider
                    <SortIcon field="provider" />
                  </button>
                </th>
              )}
              {visibleColumns.includes("category") && (
                <th className="px-4 py-3 text-left">
                  <button
                    className="flex items-center text-xs font-medium text-gray-600 hover:text-dark-accent"
                    onClick={() => handleSort("category")}
                  >
                    Category
                    <SortIcon field="category" />
                  </button>
                </th>
              )}
              {visibleColumns.includes("parameters") && (
                <th className="px-4 py-3 text-left">
                  <button
                    className="flex items-center text-xs font-medium text-gray-600 hover:text-dark-accent"
                    onClick={() => handleSort("parameters")}
                  >
                    Parameters
                    <SortIcon field="parameters" />
                  </button>
                </th>
              )}
              {visibleColumns.includes("score") && (
                <th className="px-4 py-3 text-left">
                  <button
                    className="flex items-center text-xs font-medium text-gray-600 hover:text-dark-accent"
                    onClick={() => handleSort("score")}
                  >
                    Overall Score
                    <SortIcon field="score" />
                  </button>
                </th>
              )}
              {visibleColumns.includes("date") && (
                <th className="px-4 py-3 text-left">
                  <button
                    className="flex items-center text-xs font-medium text-gray-600 hover:text-dark-accent"
                    onClick={() => handleSort("date")}
                  >
                    Release Date
                    <SortIcon field="date" />
                  </button>
                </th>
              )}
              {visibleColumns.includes("status") && (
                <th className="px-4 py-3 text-left">
                  <button
                    className="flex items-center text-xs font-medium text-gray-600 hover:text-dark-accent"
                    onClick={() => handleSort("status")}
                  >
                    Status
                    <SortIcon field="status" />
                  </button>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedModels.length === 0 ? (
              <tr>
                <td colSpan={7 + visibleColumns.length} className="px-4 py-8 text-center text-gray-500">
                  No models found matching your filters
                </td>
              </tr>
            ) : (
              sortedModels.map((model) => {
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
                    {visibleColumns.includes("provider") && (
                      <td className="px-4 py-3 text-gray-600">{model.provider}</td>
                    )}
                    {visibleColumns.includes("category") && (
                      <td className="px-4 py-3 text-gray-600">{model.category}</td>
                    )}
                    {visibleColumns.includes("parameters") && (
                      <td className="px-4 py-3 text-gray-600">{model.parameters}</td>
                    )}
                    {visibleColumns.includes("score") && (
                      <td className="px-4 py-3">
                        <div className="font-medium text-dark-accent">{model.score}</div>
                      </td>
                    )}
                    {visibleColumns.includes("date") && <td className="px-4 py-3 text-gray-600">{model.date}</td>}
                    {visibleColumns.includes("status") && (
                      <td className="px-4 py-3">
                        <StatusBadge status={model.status} />
                      </td>
                    )}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      <div className="p-4 border-t border-gray-100 flex items-center justify-between">
        <div className="text-xs text-gray-500">
          Showing {sortedModels.length > 0 ? `1-${sortedModels.length} of ${sortedModels.length}` : "0"} models
          {(selectedProviders.length > 0 ||
            selectedCategories.length > 0 ||
            selectedStatuses.length > 0 ||
            searchQuery) &&
            " (filtered)"}
        </div>
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
