import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SortingVisualizer } from "@/components/SortingVisualizer";
import { ControlPanel } from "@/components/ControlPanel";
import { ComplexityPanel } from "@/components/ComplexityPanel";
import { CodeViewer } from "@/components/CodeViewer";
import { AlgorithmExplanation } from "@/components/AlgorithmExplanation";
import { FeedbackSection } from "@/components/FeedbackSection";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  AlgorithmKey,
  algorithms,
  SortStep,
  SortingResult,
} from "@/lib/sortingAlgorithms";
import { Sparkles, Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

// Generate random array
const generateRandomArray = (size: number): number[] => {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * 300) + 10,
  );
};

// Shuffle array
const shuffleArray = (array: number[]): number[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const SortViz: React.FC = () => {
  // Refs
  const visualizationRef = useRef<HTMLDivElement>(null);

  // State management
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<AlgorithmKey>("bubble");
  const [arraySize, setArraySize] = useState(20);
  const [speed, setSpeed] = useState(2);
  const [isLearnMode, setIsLearnMode] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentArray, setCurrentArray] = useState<number[]>([]);
  const [sortingResult, setSortingResult] = useState<SortingResult | null>(
    null,
  );
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Initialize array on mount and when size changes
  useEffect(() => {
    setCurrentArray(generateRandomArray(arraySize));
    resetVisualization();
  }, [arraySize]);

  // Current step
  const currentStep = useMemo(() => {
    if (!sortingResult || currentStepIndex >= sortingResult.steps.length) {
      return undefined;
    }
    return sortingResult.steps[currentStepIndex];
  }, [sortingResult, currentStepIndex]);

  // Speed to delay mapping
  const getDelay = useCallback((speed: number) => {
    switch (speed) {
      case 1:
        return 1000; // Slow
      case 2:
        return 500; // Medium
      case 3:
        return 200; // Fast
      case 4:
        return 50; // Very Fast
      default:
        return 500;
    }
  }, []);

  // Reset visualization
  const resetVisualization = useCallback(() => {
    setIsPlaying(false);
    setIsAnimating(false);
    setCurrentStepIndex(0);
    setSortingResult(null);
    setIsCompleted(false);
  }, []);

  // Generate new array
  const handleShuffle = useCallback(() => {
    const newArray = generateRandomArray(arraySize);
    setCurrentArray(newArray);
    resetVisualization();
  }, [arraySize, resetVisualization]);

  // Handle custom array input
  const handleCustomArray = useCallback(
    (customArray: number[]) => {
      setCurrentArray([...customArray]);
      resetVisualization();
    },
    [resetVisualization],
  );

  // Start sorting
  const handlePlay = useCallback(() => {
    if (!sortingResult) {
      // Generate sorting steps
      const result = algorithms[selectedAlgorithm](currentArray);
      setSortingResult(result);
      setCurrentStepIndex(0);
    }
    setIsPlaying(true);
    setIsAnimating(true);

    // Scroll to visualization section
    if (visualizationRef.current) {
      visualizationRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedAlgorithm, currentArray, sortingResult]);

  // Pause sorting
  const handlePause = useCallback(() => {
    setIsPlaying(false);
    setIsAnimating(false);
  }, []);

  // Reset to original array
  const handleReset = useCallback(() => {
    resetVisualization();
  }, [resetVisualization]);

  // Animation loop
  useEffect(() => {
    if (!isPlaying || !sortingResult || isCompleted) {
      return;
    }

    const timer = setTimeout(() => {
      if (currentStepIndex < sortingResult.steps.length - 1) {
        setCurrentStepIndex((prev) => prev + 1);
      } else {
        setIsPlaying(false);
        setIsAnimating(false);
        setIsCompleted(true);
      }
    }, getDelay(speed));

    return () => clearTimeout(timer);
  }, [
    isPlaying,
    currentStepIndex,
    sortingResult,
    speed,
    getDelay,
    isCompleted,
  ]);

  // Algorithm change handler
  const handleAlgorithmChange = useCallback(
    (algorithm: AlgorithmKey) => {
      setSelectedAlgorithm(algorithm);
      resetVisualization();
    },
    [resetVisualization],
  );

  // Array size change handler
  const handleArraySizeChange = useCallback(
    (size: number) => {
      setArraySize(size);
      resetVisualization();
    },
    [resetVisualization],
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-sortviz-blue to-sortviz-purple bg-clip-text text-transparent">
                  SortViz
                </h1>
              </div>
              <Badge variant="outline" className="hidden sm:inline-flex">
                Algorithm Visualizer
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <span>Master Algorithms Visually</span>
              </div>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/adityamishra1105"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/aditya-mishra-370393257/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="mailto:adityaamishra11@gmail.com"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Intro */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">
              Learn Sorting Algorithms{" "}
              <span className="text-sortviz-blue">Visually</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Interactive visualization of popular sorting algorithms with
              real-time complexity analysis, step-by-step explanations, and code
              implementations in multiple languages.
            </p>
          </div>

          {/* Status Alert */}
          {isCompleted && (
            <Alert className="bg-sortviz-green/10 border-sortviz-green/20">
              <Sparkles className="h-4 w-4 text-sortviz-green" />
              <AlertDescription className="text-sortviz-green">
                Sorting completed! The array has been successfully sorted using{" "}
                {selectedAlgorithm} sort with {sortingResult?.comparisons}{" "}
                comparisons and {sortingResult?.swaps} swaps.
              </AlertDescription>
            </Alert>
          )}

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Control Panel */}
            <div className="xl:col-span-1">
              <ControlPanel
                selectedAlgorithm={selectedAlgorithm}
                onAlgorithmChange={handleAlgorithmChange}
                arraySize={arraySize}
                onArraySizeChange={handleArraySizeChange}
                speed={speed}
                onSpeedChange={setSpeed}
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onPause={handlePause}
                onReset={handleReset}
                onShuffle={handleShuffle}
                onCustomArray={handleCustomArray}
                isLearnMode={isLearnMode}
                onLearnModeChange={setIsLearnMode}
                isAnimating={isAnimating}
              />
            </div>

            {/* Visualization Area */}
            <div ref={visualizationRef} className="xl:col-span-3 space-y-6">
              {/* Main Visualizer */}
              <Card className="w-full">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">
                        {selectedAlgorithm.charAt(0).toUpperCase() +
                          selectedAlgorithm.slice(1)}{" "}
                        Sort Visualization
                      </h3>
                      {currentStep && (
                        <Badge variant="secondary" className="animate-pulse">
                          Step {currentStepIndex + 1} of{" "}
                          {sortingResult?.steps.length}
                        </Badge>
                      )}
                    </div>
                    <Separator />
                    <SortingVisualizer
                      data={currentStep?.array || currentArray}
                      currentStep={currentStep}
                      isAnimating={isAnimating}
                    />
                    {currentStep && isLearnMode && (
                      <div className="p-4 bg-card/50 border rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">
                            Current Action:{" "}
                          </span>
                          {currentStep.description}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Complexity Panel */}
              <ComplexityPanel
                algorithm={selectedAlgorithm}
                comparisons={sortingResult?.comparisons || 0}
                swaps={sortingResult?.swaps || 0}
                currentStep={currentStepIndex}
                totalSteps={sortingResult?.steps.length || 0}
              />
            </div>
          </div>

          {/* Educational Content */}
          {isLearnMode && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AlgorithmExplanation
                algorithm={selectedAlgorithm}
                currentStepDescription={currentStep?.description}
              />
              <CodeViewer algorithm={selectedAlgorithm} />
            </div>
          )}

          {/* Legend */}
          <Card className="w-full">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Color Legend</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-sortviz-blue rounded"></div>
                  <span className="text-sm">Default</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-sortviz-red rounded"></div>
                  <span className="text-sm">Comparing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-sortviz-orange rounded"></div>
                  <span className="text-sm">Swapping</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-sortviz-purple rounded"></div>
                  <span className="text-sm">Pivot</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-sortviz-green rounded"></div>
                  <span className="text-sm">Sorted</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Section */}
          <FeedbackSection />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <span className="font-semibold">SortViz</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Interactive sorting algorithm visualizer for learning data
              structures and algorithms.
            </p>
            <div className="space-y-2">
              <div className="text-sm font-medium text-foreground">
                Created by - Aditya Mishra
              </div>
              <div className="text-sm text-muted-foreground">Contact me</div>
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <a
                  href="mailto:adityaamishra11@gmail.com"
                  className="flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer"
                >
                  <Mail className="h-4 w-4" />
                  <span>adityaamishra11@gmail.com</span>
                </a>
                <div className="flex items-center gap-1">
                  <span>📞</span>
                  <span>+91 9315300941</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>Open Source</span>
              <span>•</span>
              <span>© 2024 All Rights Reserved</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SortViz;
