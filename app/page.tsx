import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, RadarChart } from "@/components/charts"
import { ModelLeaderboard } from "@/components/model-leaderboard"
import { ComplexityAnalysis } from "@/components/complexity-analysis"
import { TaskTypeAnalysis } from "@/components/task-type-analysis"

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-dark-accent dark:text-cream-yellow">Dashboard</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Explore Benchmark Results and Model Performance for LLMs' Emotional Intelligence in Intimate
                Relationships
              </p>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-light-gray dark:bg-gray-800 rounded-xl p-1">
                <TabsTrigger value="overview" className="rounded-lg data-[state=active]:tab-active tabs-trigger">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="leaderboard" className="rounded-lg data-[state=active]:tab-active tabs-trigger">
                  Leaderboard
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-white dark:bg-gray-800 rounded-2xl border-0 shadow-card card-hover">
                    <CardHeader>
                      <CardTitle className="text-dark-accent dark:text-cream-yellow card-title">
                        Model Comparison
                      </CardTitle>
                      <CardDescription className="text-gray-500 dark:text-gray-400 card-description">
                        Performance comparison across all evaluated models
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <BarChart />
                      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4 chart-hint">
                        Click on a bar to view detailed model information
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-gray-800 rounded-2xl border-0 shadow-card card-hover">
                    <CardHeader>
                      <CardTitle className="text-dark-accent dark:text-cream-yellow card-title">
                        Performance Radar
                      </CardTitle>
                      <CardDescription className="text-gray-500 dark:text-gray-400 card-description">
                        Detailed metrics comparison for top models
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RadarChart />
                      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4 chart-hint">
                        Double-click on a data point to view detailed model information
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* 新增的复杂度分析和任务类型分析组件 */}
                <ComplexityAnalysis />
                <TaskTypeAnalysis />
              </TabsContent>

              <TabsContent value="leaderboard" className="mt-6">
                <ModelLeaderboard />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
