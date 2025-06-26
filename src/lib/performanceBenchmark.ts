import { AlgorithmKey, algorithms } from "./sortingAlgorithms";

export interface BenchmarkResult {
  algorithm: AlgorithmKey;
  arraySize: number;
  executionTime: number; // in milliseconds
  comparisons: number;
  swaps: number;
  memoryUsage?: number; // estimated in bytes
  timestamp: number;
  arrayType: "random" | "sorted" | "reverse" | "nearly_sorted" | "custom";
  inputArray: number[];
}

export interface BenchmarkSummary {
  algorithm: AlgorithmKey;
  averageTime: number;
  minTime: number;
  maxTime: number;
  totalRuns: number;
  averageComparisons: number;
  averageSwaps: number;
  efficiency: number; // operations per millisecond
}

export interface AlgorithmComparison {
  arraySize: number;
  results: BenchmarkResult[];
  winner: AlgorithmKey;
  rankings: { algorithm: AlgorithmKey; score: number }[];
}

export class PerformanceBenchmark {
  private results: BenchmarkResult[] = [];
  private readonly MAX_RESULTS = 1000; // Keep last 1000 results

  // Run a single benchmark
  async runBenchmark(
    algorithm: AlgorithmKey,
    inputArray: number[],
    arrayType: BenchmarkResult["arrayType"] = "random",
  ): Promise<BenchmarkResult> {
    const arraySize = inputArray.length;
    const startTime = performance.now();
    const startMemory = this.estimateMemoryUsage();

    // Run the algorithm
    const sortingResult = algorithms[algorithm]([...inputArray]);

    const endTime = performance.now();
    const endMemory = this.estimateMemoryUsage();

    const result: BenchmarkResult = {
      algorithm,
      arraySize,
      executionTime: endTime - startTime,
      comparisons: sortingResult.comparisons,
      swaps: sortingResult.swaps,
      memoryUsage: Math.max(0, endMemory - startMemory),
      timestamp: Date.now(),
      arrayType,
      inputArray: [...inputArray],
    };

    this.addResult(result);
    return result;
  }

  // Run benchmarks for multiple algorithms on the same data
  async runComparison(
    algorithms: AlgorithmKey[],
    inputArray: number[],
    arrayType: BenchmarkResult["arrayType"] = "random",
  ): Promise<AlgorithmComparison> {
    const results: BenchmarkResult[] = [];

    for (const algorithm of algorithms) {
      const result = await this.runBenchmark(algorithm, inputArray, arrayType);
      results.push(result);
      // Small delay to prevent blocking
      await new Promise((resolve) => setTimeout(resolve, 1));
    }

    // Calculate rankings based on execution time and efficiency
    const rankings = results
      .map((result) => ({
        algorithm: result.algorithm,
        score: this.calculateEfficiencyScore(result),
      }))
      .sort((a, b) => b.score - a.score);

    const winner = rankings[0]?.algorithm || algorithms[0];

    return {
      arraySize: inputArray.length,
      results,
      winner,
      rankings,
    };
  }

  // Generate test arrays of different types
  generateTestArray(
    size: number,
    type: BenchmarkResult["arrayType"],
  ): number[] {
    const array: number[] = [];

    switch (type) {
      case "random":
        for (let i = 0; i < size; i++) {
          array.push(Math.floor(Math.random() * 1000) + 1);
        }
        break;

      case "sorted":
        for (let i = 0; i < size; i++) {
          array.push(i + 1);
        }
        break;

      case "reverse":
        for (let i = size; i > 0; i--) {
          array.push(i);
        }
        break;

      case "nearly_sorted":
        for (let i = 0; i < size; i++) {
          array.push(i + 1);
        }
        // Randomly swap a few elements
        const swapCount = Math.floor(size * 0.1);
        for (let i = 0; i < swapCount; i++) {
          const idx1 = Math.floor(Math.random() * size);
          const idx2 = Math.floor(Math.random() * size);
          [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
        }
        break;

      default:
        return this.generateTestArray(size, "random");
    }

    return array;
  }

  // Run comprehensive benchmarks
  async runComprehensiveBenchmark(
    algorithmsToTest: AlgorithmKey[] = Object.keys(
      algorithms,
    ) as AlgorithmKey[],
    sizes: number[] = [10, 25, 50, 100],
    arrayTypes: BenchmarkResult["arrayType"][] = [
      "random",
      "sorted",
      "reverse",
      "nearly_sorted",
    ],
  ): Promise<AlgorithmComparison[]> {
    const comparisons: AlgorithmComparison[] = [];

    for (const size of sizes) {
      for (const arrayType of arrayTypes) {
        const testArray = this.generateTestArray(size, arrayType);
        const comparison = await this.runComparison(
          algorithmsToTest,
          testArray,
          arrayType,
        );
        comparisons.push(comparison);

        // Progress callback could be added here
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
    }

    return comparisons;
  }

  // Get summary statistics for an algorithm
  getAlgorithmSummary(algorithm: AlgorithmKey): BenchmarkSummary | null {
    const algorithmResults = this.results.filter(
      (r) => r.algorithm === algorithm,
    );

    if (algorithmResults.length === 0) return null;

    const times = algorithmResults.map((r) => r.executionTime);
    const comparisons = algorithmResults.map((r) => r.comparisons);
    const swaps = algorithmResults.map((r) => r.swaps);

    const averageTime = times.reduce((a, b) => a + b, 0) / times.length;
    const averageComparisons =
      comparisons.reduce((a, b) => a + b, 0) / comparisons.length;
    const averageSwaps = swaps.reduce((a, b) => a + b, 0) / swaps.length;

    return {
      algorithm,
      averageTime,
      minTime: Math.min(...times),
      maxTime: Math.max(...times),
      totalRuns: algorithmResults.length,
      averageComparisons,
      averageSwaps,
      efficiency: (averageComparisons + averageSwaps) / averageTime,
    };
  }

  // Get all results
  getAllResults(): BenchmarkResult[] {
    return [...this.results];
  }

  // Get results filtered by criteria
  getFilteredResults(filter: {
    algorithm?: AlgorithmKey;
    arrayType?: BenchmarkResult["arrayType"];
    minSize?: number;
    maxSize?: number;
    since?: number; // timestamp
  }): BenchmarkResult[] {
    return this.results.filter((result) => {
      if (filter.algorithm && result.algorithm !== filter.algorithm)
        return false;
      if (filter.arrayType && result.arrayType !== filter.arrayType)
        return false;
      if (filter.minSize && result.arraySize < filter.minSize) return false;
      if (filter.maxSize && result.arraySize > filter.maxSize) return false;
      if (filter.since && result.timestamp < filter.since) return false;
      return true;
    });
  }

  // Clear all results
  clearResults(): void {
    this.results = [];
  }

  // Export results as JSON
  exportResults(): string {
    return JSON.stringify(this.results, null, 2);
  }

  // Import results from JSON
  importResults(jsonData: string): void {
    try {
      const imported = JSON.parse(jsonData) as BenchmarkResult[];
      this.results = [...this.results, ...imported];
      this.trimResults();
    } catch (error) {
      console.error("Failed to import results:", error);
      throw new Error("Invalid JSON data");
    }
  }

  private addResult(result: BenchmarkResult): void {
    this.results.push(result);
    this.trimResults();
  }

  private trimResults(): void {
    if (this.results.length > this.MAX_RESULTS) {
      this.results = this.results.slice(-this.MAX_RESULTS);
    }
  }

  private estimateMemoryUsage(): number {
    // Simple estimation based on heap size if available
    if ("memory" in performance) {
      return (performance as any).memory.usedJSHeapSize;
    }
    return 0;
  }

  private calculateEfficiencyScore(result: BenchmarkResult): number {
    // Higher score is better
    // Formula: (operations per second) / sqrt(array size)
    const operations = result.comparisons + result.swaps;
    const opsPerSecond = operations / (result.executionTime / 1000);
    return opsPerSecond / Math.sqrt(result.arraySize);
  }

  // Get performance insights
  getPerformanceInsights(): {
    fastestAlgorithm: AlgorithmKey;
    mostEfficientAlgorithm: AlgorithmKey;
    recommendedForSmallArrays: AlgorithmKey;
    recommendedForLargeArrays: AlgorithmKey;
    insights: string[];
  } {
    if (this.results.length === 0) {
      return {
        fastestAlgorithm: "quick",
        mostEfficientAlgorithm: "quick",
        recommendedForSmallArrays: "insertion",
        recommendedForLargeArrays: "quick",
        insights: ["No benchmark data available"],
      };
    }

    const summaries = Object.keys(algorithms)
      .map((alg) => this.getAlgorithmSummary(alg as AlgorithmKey))
      .filter(Boolean) as BenchmarkSummary[];

    const fastestAlgorithm =
      summaries.reduce((a, b) => (a.averageTime < b.averageTime ? a : b))
        ?.algorithm || "quick";

    const mostEfficientAlgorithm =
      summaries.reduce((a, b) => (a.efficiency > b.efficiency ? a : b))
        ?.algorithm || "quick";

    // Analyze by array size
    const smallArrayResults = this.results.filter((r) => r.arraySize <= 25);
    const largeArrayResults = this.results.filter((r) => r.arraySize > 50);

    const recommendedForSmallArrays =
      this.getBestPerformerForResults(smallArrayResults) || "insertion";
    const recommendedForLargeArrays =
      this.getBestPerformerForResults(largeArrayResults) || "quick";

    const insights = this.generateInsights(summaries);

    return {
      fastestAlgorithm,
      mostEfficientAlgorithm,
      recommendedForSmallArrays,
      recommendedForLargeArrays,
      insights,
    };
  }

  private getBestPerformerForResults(
    results: BenchmarkResult[],
  ): AlgorithmKey | null {
    if (results.length === 0) return null;

    const avgTimes = new Map<AlgorithmKey, number>();
    const counts = new Map<AlgorithmKey, number>();

    results.forEach((result) => {
      const current = avgTimes.get(result.algorithm) || 0;
      const count = counts.get(result.algorithm) || 0;
      avgTimes.set(
        result.algorithm,
        (current * count + result.executionTime) / (count + 1),
      );
      counts.set(result.algorithm, count + 1);
    });

    let bestAlgorithm: AlgorithmKey | null = null;
    let bestTime = Infinity;

    avgTimes.forEach((time, algorithm) => {
      if (time < bestTime) {
        bestTime = time;
        bestAlgorithm = algorithm;
      }
    });

    return bestAlgorithm;
  }

  private generateInsights(summaries: BenchmarkSummary[]): string[] {
    const insights: string[] = [];

    if (summaries.length === 0) return insights;

    // Find algorithms with best/worst characteristics
    const fastest = summaries.reduce((a, b) =>
      a.averageTime < b.averageTime ? a : b,
    );
    const slowest = summaries.reduce((a, b) =>
      a.averageTime > b.averageTime ? a : b,
    );

    insights.push(
      `${fastest.algorithm} is the fastest with ${fastest.averageTime.toFixed(2)}ms average time`,
    );

    if (fastest.algorithm !== slowest.algorithm) {
      insights.push(
        `${slowest.algorithm} is the slowest with ${slowest.averageTime.toFixed(2)}ms average time`,
      );
    }

    // Compare O(n²) vs O(n log n) algorithms
    const quadraticAlgorithms = ["bubble", "selection", "insertion"];
    const logLinearAlgorithms = ["quick", "merge", "heap"];

    const quadraticAvg =
      summaries
        .filter((s) => quadraticAlgorithms.includes(s.algorithm))
        .reduce((sum, s) => sum + s.averageTime, 0) /
      summaries.filter((s) => quadraticAlgorithms.includes(s.algorithm)).length;

    const logLinearAvg =
      summaries
        .filter((s) => logLinearAlgorithms.includes(s.algorithm))
        .reduce((sum, s) => sum + s.averageTime, 0) /
      summaries.filter((s) => logLinearAlgorithms.includes(s.algorithm)).length;

    if (!isNaN(quadraticAvg) && !isNaN(logLinearAvg)) {
      const speedup = quadraticAvg / logLinearAvg;
      insights.push(
        `O(n log n) algorithms are ${speedup.toFixed(1)}x faster than O(n²) algorithms on average`,
      );
    }

    return insights;
  }
}

// Global benchmark instance
export const performanceBenchmark = new PerformanceBenchmark();
