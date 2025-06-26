import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Lightbulb, Target, Info } from "lucide-react";
import { AlgorithmKey } from "@/lib/sortingAlgorithms";
import { getAlgorithmInfo } from "@/lib/algorithmData";
import { cn } from "@/lib/utils";

interface AlgorithmExplanationProps {
  algorithm: AlgorithmKey;
  currentStepDescription?: string;
  className?: string;
}

export const AlgorithmExplanation: React.FC<AlgorithmExplanationProps> = ({
  algorithm,
  currentStepDescription,
  className,
}) => {
  const algorithmInfo = getAlgorithmInfo(algorithm);

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-sortviz-green" />
          Algorithm Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Algorithm Overview */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-sortviz-blue" />
            <h3 className="font-semibold">What is {algorithmInfo.name}?</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {algorithmInfo.explanation}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2">
            Understanding this algorithm helps build foundational knowledge for
            more complex sorting techniques and demonstrates key computer
            science concepts like time complexity, space efficiency, and
            algorithmic trade-offs.
          </p>
        </div>

        <Separator />

        {/* Current Step */}
        {currentStepDescription && (
          <>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-sortviz-orange" />
                <h3 className="font-semibold">Current Step</h3>
              </div>
              <div className="p-3 bg-sortviz-orange/10 border border-sortviz-orange/20 rounded-lg">
                <p className="text-sm text-foreground font-medium">
                  {currentStepDescription}
                </p>
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* How It Works */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-sortviz-yellow" />
            <h3 className="font-semibold">How It Works</h3>
          </div>
          <div className="space-y-3">
            {algorithmInfo.howItWorks.map((step, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-sortviz-blue/20 text-sortviz-blue rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Complexity Summary */}
        <div className="space-y-3">
          <h3 className="font-semibold">Complexity Summary</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">Time</div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span>Best:</span>
                  <Badge variant="outline" className="text-xs">
                    {algorithmInfo.timeComplexity.best}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>Average:</span>
                  <Badge variant="outline" className="text-xs">
                    {algorithmInfo.timeComplexity.average}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>Worst:</span>
                  <Badge variant="outline" className="text-xs">
                    {algorithmInfo.timeComplexity.worst}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">Space</div>
              <Badge variant="outline" className="text-xs">
                {algorithmInfo.spaceComplexity}
              </Badge>
            </div>
          </div>
        </div>

        <Separator />

        {/* Key Points */}
        <div className="space-y-3">
          <h3 className="font-semibold">Key Points</h3>
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium text-sortviz-green mb-2">
                Strengths:
              </h4>
              <ul className="space-y-1">
                {algorithmInfo.pros.slice(0, 3).map((pro, index) => (
                  <li
                    key={index}
                    className="text-xs text-muted-foreground flex items-start gap-2"
                  >
                    <span className="text-sortviz-green">✓</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-sortviz-red mb-2">
                Limitations:
              </h4>
              <ul className="space-y-1">
                {algorithmInfo.cons.slice(0, 3).map((con, index) => (
                  <li
                    key={index}
                    className="text-xs text-muted-foreground flex items-start gap-2"
                  >
                    <span className="text-sortviz-red">✗</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Best Use Case */}
        <div className="p-4 bg-card/50 border rounded-lg">
          <h4 className="text-sm font-medium mb-2">When to Use:</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {algorithmInfo.useCase}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlgorithmExplanation;
