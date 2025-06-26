import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, HardDrive, BarChart3, TrendingUp } from "lucide-react";
import { AlgorithmKey } from "@/lib/sortingAlgorithms";
import { getAlgorithmInfo } from "@/lib/algorithmData";
import { cn } from "@/lib/utils";

interface ComplexityPanelProps {
  algorithm: AlgorithmKey;
  comparisons?: number;
  swaps?: number;
  currentStep?: number;
  totalSteps?: number;
  className?: string;
}

export const ComplexityPanel: React.FC<ComplexityPanelProps> = ({
  algorithm,
  comparisons = 0,
  swaps = 0,
  currentStep = 0,
  totalSteps = 0,
  className,
}) => {
  const algorithmInfo = getAlgorithmInfo(algorithm);

  const getComplexityColor = (complexity: string) => {
    if (complexity.includes("n²") || complexity.includes("n^2")) {
      return "text-sortviz-red";
    }
    if (complexity.includes("n log n")) {
      return "text-sortviz-orange";
    }
    if (complexity === "O(n)") {
      return "text-sortviz-green";
    }
    if (complexity === "O(1)") {
      return "text-sortviz-blue";
    }
    return "text-foreground";
  };

  const progressPercentage =
    totalSteps > 0 ? Math.round((currentStep / totalSteps) * 100) : 0;

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-sortviz-green" />
          Complexity Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Algorithm Name */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-sortviz-blue">
            {algorithmInfo.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {algorithmInfo.description}
          </p>
        </div>

        <Separator />

        {/* Time Complexity */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-sortviz-orange" />
            <span className="font-medium">Time Complexity</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-3 bg-card/50 rounded-lg border">
              <div className="text-xs text-muted-foreground mb-1">Best</div>
              <Badge
                variant="outline"
                className={cn(
                  "text-xs font-mono",
                  getComplexityColor(algorithmInfo.timeComplexity.best),
                )}
              >
                {algorithmInfo.timeComplexity.best}
              </Badge>
            </div>
            <div className="text-center p-3 bg-card/50 rounded-lg border">
              <div className="text-xs text-muted-foreground mb-1">Average</div>
              <Badge
                variant="outline"
                className={cn(
                  "text-xs font-mono",
                  getComplexityColor(algorithmInfo.timeComplexity.average),
                )}
              >
                {algorithmInfo.timeComplexity.average}
              </Badge>
            </div>
            <div className="text-center p-3 bg-card/50 rounded-lg border">
              <div className="text-xs text-muted-foreground mb-1">Worst</div>
              <Badge
                variant="outline"
                className={cn(
                  "text-xs font-mono",
                  getComplexityColor(algorithmInfo.timeComplexity.worst),
                )}
              >
                {algorithmInfo.timeComplexity.worst}
              </Badge>
            </div>
          </div>
        </div>

        {/* Space Complexity */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <HardDrive className="h-4 w-4 text-sortviz-purple" />
            <span className="font-medium">Space Complexity</span>
          </div>
          <div className="text-center p-3 bg-card/50 rounded-lg border">
            <Badge
              variant="outline"
              className={cn(
                "text-sm font-mono",
                getComplexityColor(algorithmInfo.spaceComplexity),
              )}
            >
              {algorithmInfo.spaceComplexity}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Performance Metrics */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-sortviz-green" />
            <span className="font-medium">Performance Metrics</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-card/50 rounded-lg border">
              <div className="text-2xl font-bold text-sortviz-blue">
                {comparisons.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Comparisons</div>
            </div>
            <div className="text-center p-3 bg-card/50 rounded-lg border">
              <div className="text-2xl font-bold text-sortviz-orange">
                {swaps.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Swaps</div>
            </div>
          </div>
        </div>

        {/* Progress */}
        {totalSteps > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">
                {currentStep} / {totalSteps} steps ({progressPercentage}%)
              </span>
            </div>
            <div className="w-full bg-secondary/20 rounded-full h-2">
              <div
                className="bg-sortviz-blue h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Complexity Symbols */}
        {(algorithmInfo.timeComplexity.average.includes("×") ||
          algorithmInfo.timeComplexity.average.includes("d") ||
          algorithmInfo.timeComplexity.average.includes("k")) && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Complexity Symbols</h4>
            <div className="text-xs text-muted-foreground space-y-1">
              {algorithmInfo.timeComplexity.average.includes("d") && (
                <div>
                  <span className="font-mono text-sortviz-blue">d</span> =
                  number of digits in the maximum element
                </div>
              )}
              {algorithmInfo.timeComplexity.average.includes("k") && (
                <div>
                  <span className="font-mono text-sortviz-blue">k</span> = range
                  of input values (max - min + 1)
                </div>
              )}
              <div>
                <span className="font-mono text-sortviz-blue">n</span> = number
                of elements in the array
              </div>
            </div>
          </div>
        )}

        {/* Key Features */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Key Characteristics</h4>
          <div className="flex flex-wrap gap-1">
            <Badge
              variant="secondary"
              className={cn(
                "text-xs",
                algorithmInfo.stable
                  ? "bg-sortviz-green/10 text-sortviz-green border-sortviz-green/20"
                  : "bg-sortviz-red/10 text-sortviz-red border-sortviz-red/20",
              )}
            >
              {algorithmInfo.stable ? "Stable" : "Unstable"}
            </Badge>
            <Badge
              variant="secondary"
              className={cn(
                "text-xs",
                algorithmInfo.inPlace
                  ? "bg-sortviz-blue/10 text-sortviz-blue border-sortviz-blue/20"
                  : "bg-sortviz-orange/10 text-sortviz-orange border-sortviz-orange/20",
              )}
            >
              {algorithmInfo.inPlace ? "In-place" : "Out-of-place"}
            </Badge>
            {algorithmInfo.pros.slice(0, 2).map((pro, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-secondary/50"
              >
                {pro}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplexityPanel;
