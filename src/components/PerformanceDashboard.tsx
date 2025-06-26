import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  Zap,
  Download,
  Upload,
  Play,
  Trophy,
  Clock,
  TrendingUp,
  RefreshCw,
} from "lucide-react";
import {
  performanceBenchmark,
  BenchmarkResult,
  AlgorithmComparison,
} from "@/lib/performanceBenchmark";
import { AlgorithmKey, algorithms } from "@/lib/sortingAlgorithms";
import { getAlgorithmInfo } from "@/lib/algorithmData";
import { cn } from "@/lib/utils";

interface PerformanceDashboardProps {
  className?: string;
}

export const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  className,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<BenchmarkResult[]>([]);
  const [comparisons, setComparisons] = useState<AlgorithmComparison[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmKey>("bubble");
  const [insights, setInsights] = useState<any>(null);

  useEffect(() => {
    // Load existing results
    setResults(performanceBenchmark.getAllResults());
    updateInsights();
  }, []);

  const updateInsights = () => {
    setInsights(performanceBenchmark.getPerformanceInsights());
  };

  const runQuickBenchmark = async () => {
    setIsRunning(true);
    setProgress(0);

    try {
      const algorithmsToTest: AlgorithmKey[] = ["bubble", "selection", "insertion", "quick", "merge"];
      const sizes = [10, 25, 50];
      const arrayTypes = ["random", "sorted", "reverse"] as const;

      const totalTests = algorithmsToTest.length * sizes.length * arrayTypes.length;
      let completedTests = 0;

      const newComparisons: AlgorithmComparison[] = [];

      for (const size of sizes) {
        for (const arrayType of arrayTypes) {
          const testArray = performanceBenchmark.generateTestArray(size, arrayType);
          const comparison = await performanceBenchmark.runComparison(
            algorithmsToTest,
            testArray,
            arrayType
          );
          newComparisons.push(comparison);

          completedTests += algorithmsToTest.length;
          setProgress((completedTests / totalTests) * 100);
        }
      }

      setComparisons(newComparisons);
      setResults(performanceBenchmark.getAllResults());
      updateInsights();
    } catch (error) {
      console.error("Benchmark failed:", error);
    } finally {
      setIsRunning(false);
      setProgress(0);
    }
  };

  const runComprehensiveBenchmark = async () => {
    setIsRunning(true);
    setProgress(0);

    try {
      const algorithmsToTest = Object.keys(algorithms) as AlgorithmKey[];
      const sizes = [10, 25, 50, 100];
      const arrayTypes = ["random", "sorted", "reverse", "nearly_sorted"] as const;

      const totalTests = algorithmsToTest.length * sizes.length * arrayTypes.length;
      let completedTests = 0;

      for (const size of sizes) {
        for (const arrayType of arrayTypes) {
          const testArray = performanceBenchmark.generateTestArray(size, arrayType);
          const comparison = await performanceBenchmark.runComparison(
            algorithmsToTest,
            testArray,
            arrayType
          );
          
          completedTests += algorithmsToTest.length;
          setProgress((completedTests / totalTests) * 100);
          
          // Update UI periodically
          if (completedTests % 10 === 0) {
            setResults(performanceBenchmark.getAllResults());
          }
        }
      }

      setResults(performanceBenchmark.getAllResults());
      updateInsights();
    } catch (error) {
      console.error("Comprehensive benchmark failed:", error);
    } finally {
      setIsRunning(false);
      setProgress(0);
    }
  };

  const exportResults = () => {
    const data = performanceBenchmark.exportResults();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sortingz-benchmark-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearResults = () => {
    performanceBenchmark.clearResults();
    setResults([]);
    setComparisons([]);
    setInsights(null);
  };

  const getAlgorithmSummary = (algorithm: AlgorithmKey) => {
    return performanceBenchmark.getAlgorithmSummary(algorithm);
  };

  const formatTime = (ms: number) => {
    if (ms < 1) return `${(ms * 1000).toFixed(0)}µs`;
    if (ms < 1000) return `${ms.toFixed(2)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-sortviz-blue" />
          Performance Benchmark Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-4">
                <h3 className="font-semibold">Quick Benchmark</h3>
                <p className="text-sm text-muted-foreground">
                  Test 5 main algorithms on small arrays
                </p>
                <Button 
                  onClick={runQuickBenchmark} 
                  disabled={isRunning}
                  className="w-full"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {isRunning ? "Running..." : "Quick Test"}
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Comprehensive Test</h3>
                <p className="text-sm text-muted-foreground">
                  Test all algorithms on various array sizes and types
                </p>
                <Button 
                  onClick={runComprehensiveBenchmark} 
                  disabled={isRunning}
                  variant="outline"
                  className="w-full"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  {isRunning ? "Running..." : "Full Benchmark"}
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Data Management</h3>
                <div className="space-y-2">
                  <Button onClick={exportResults} variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export Results
                  </Button>
                  <Button onClick={clearResults} variant="outline" size="sm" className="w-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Clear Data
                  </Button>
                </div>
              </div>
            </div>

            {isRunning && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">{progress.toFixed(0)}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            )}

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-card/50 rounded-lg border">
                <div className="text-2xl font-bold text-sortviz-blue">
                  {results.length}
                </div>
                <div className="text-sm text-muted-foreground">Total Tests</div>
              </div>
              <div className="text-center p-4 bg-card/50 rounded-lg border">
                <div className="text-2xl font-bold text-sortviz-green">
                  {new Set(results.map(r => r.algorithm)).size}
                </div>
                <div className="text-sm text-muted-foreground">Algorithms Tested</div>
              </div>
              <div className="text-center p-4 bg-card/50 rounded-lg border">
                <div className="text-2xl font-bold text-sortviz-orange">
                  {insights?.fastestAlgorithm || "N/A"}
                </div>
                <div className="text-sm text-muted-foreground">Fastest Algorithm</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Algorithm Performance</h3>
              <Select value={selectedAlgorithm} onValueChange={(value) => setSelectedAlgorithm(value as AlgorithmKey)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(algorithms).map((alg) => (
                    <SelectItem key={alg} value={alg}>
                      {getAlgorithmInfo(alg as AlgorithmKey).name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(() => {
              const summary = getAlgorithmSummary(selectedAlgorithm);
              if (!summary) {
                return (
                  <div className="text-center py-8 text-muted-foreground">
                    No benchmark data available for {getAlgorithmInfo(selectedAlgorithm).name}
                  </div>
                );
              }

              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-card/50 rounded-lg border">
                      <div className="text-lg font-bold text-sortviz-blue">
                        {formatTime(summary.averageTime)}
                      </div>
                      <div className="text-xs text-muted-foreground">Avg Time</div>
                    </div>
                    <div className="text-center p-3 bg-card/50 rounded-lg border">
                      <div className="text-lg font-bold text-sortviz-green">
                        {summary.averageComparisons.toFixed(0)}
                      </div>
                      <div className="text-xs text-muted-foreground">Avg Comparisons</div>
                    </div>
                    <div className="text-center p-3 bg-card/50 rounded-lg border">
                      <div className="text-lg font-bold text-sortviz-orange">
                        {summary.averageSwaps.toFixed(0)}
                      </div>
                      <div className="text-xs text-muted-foreground">Avg Swaps</div>
                    </div>
                    <div className="text-center p-3 bg-card/50 rounded-lg border">
                      <div className="text-lg font-bold text-sortviz-purple">
                        {summary.totalRuns}
                      </div>
                      <div className="text-xs text-muted-foreground">Total Runs</div>
                    </div>
                  </div>

                  <div className="p-4 bg-card/50 rounded-lg border">
                    <h4 className="font-medium mb-2">Performance Range</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Fastest:</span>
                        <span className="font-mono">{formatTime(summary.minTime)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Slowest:</span>
                        <span className="font-mono">{formatTime(summary.maxTime)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Efficiency:</span>
                        <span className="font-mono">{summary.efficiency.toFixed(2)} ops/ms</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </TabsContent>

          <TabsContent value="comparison" className="space-y-4">
            <h3 className="font-semibold">Algorithm Rankings</h3>
            
            {comparisons.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Run a benchmark to see algorithm comparisons
              </div>
            ) : (
              <div className="space-y-4">
                {comparisons.slice(0, 3).map((comparison, index) => (
                  <div key={index} className="p-4 bg-card/50 rounded-lg border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">
                        Array Size: {comparison.arraySize} 
                        <Badge variant="outline" className="ml-2">
                          {comparison.results[0]?.arrayType}
                        </Badge>
                      </h4>
                      <div className="flex items-center gap-1">
                        <Trophy className="h-4 w-4 text-sortviz-yellow" />
                        <span className="text-sm font-medium">
                          {getAlgorithmInfo(comparison.winner).name}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {comparison.rankings.map((ranking, rankIndex) => (
                        <div key={ranking.algorithm} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-mono w-6">#{rankIndex + 1}</span>
                            <span className="text-sm">
                              {getAlgorithmInfo(ranking.algorithm).name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-mono">
                              {formatTime(comparison.results.find(r => r.algorithm === ranking.algorithm)?.executionTime || 0)}
                            </span>
                            <Badge 
                              variant={rankIndex === 0 ? "default" : "secondary"} 
                              className="text-xs"
                            >
                              {ranking.score.toFixed(1)}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Performance Insights
            </h3>
            
            {!insights ? (
              <div className="text-center py-8 text-muted-foreground">
                Run benchmarks to generate insights
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-sortviz-blue/10 border border-sortviz-blue/20 rounded-lg">
                    <h4 className="font-medium text-sortviz-blue mb-2">
                      <Clock className="h-4 w-4 inline mr-1" />
                      Speed Champion
                    </h4>
                    <p className="text-sm">
                      <strong>{getAlgorithmInfo(insights.fastestAlgorithm).name}</strong> is the fastest overall
                    </p>
                  </div>
                  
                  <div className="p-4 bg-sortviz-green/10 border border-sortviz-green/20 rounded-lg">
                    <h4 className="font-medium text-sortviz-green mb-2">
                      <Zap className="h-4 w-4 inline mr-1" />
                      Most Efficient
                    </h4>
                    <p className="text-sm">
                      <strong>{getAlgorithmInfo(insights.mostEfficientAlgorithm).name}</strong> has the best efficiency ratio
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-card/50 rounded-lg border">
                    <h4 className="font-medium mb-2">Small Arrays (≤25)</h4>
                    <p className="text-sm text-muted-foreground">
                      Best: <strong>{getAlgorithmInfo(insights.recommendedForSmallArrays).name}</strong>
                    </p>
                  </div>
                  
                  <div className="p-4 bg-card/50 rounded-lg border">
                    <h4 className="font-medium mb-2">Large Arrays (>50)</h4>
                    <p className="text-sm text-muted-foreground">
                      Best: <strong>{getAlgorithmInfo(insights.recommendedForLargeArrays).name}</strong>
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-card/50 rounded-lg border">
                  <h4 className="font-medium mb-3">Key Findings</h4>
                  <ul className="space-y-2">
                    {insights.insights.map((insight: string, index: number) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-sortviz-blue mt-1">•</span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PerformanceDashboard;