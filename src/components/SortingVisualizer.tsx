import React from "react";
import { cn } from "@/lib/utils";
import { SortStep } from "@/lib/sortingAlgorithms";

interface SortingVisualizerProps {
  data: number[];
  currentStep?: SortStep;
  isAnimating?: boolean;
  maxValue?: number;
  className?: string;
}

export const SortingVisualizer: React.FC<SortingVisualizerProps> = ({
  data,
  currentStep,
  isAnimating = false,
  maxValue = Math.max(...data),
  className,
}) => {
  const getBarHeight = (value: number) => {
    const minHeight = 20;
    const maxHeight = 300;
    return minHeight + (value / maxValue) * (maxHeight - minHeight);
  };

  const getBarStatus = (index: number) => {
    if (!currentStep) return "default";

    if (currentStep.sorted?.includes(index)) return "sorted";
    if (currentStep.comparing?.includes(index)) return "comparing";
    if (currentStep.swapping?.includes(index)) return "swapping";
    if (currentStep.pivot === index) return "pivot";

    return "default";
  };

  const getBarColor = (status: string) => {
    switch (status) {
      case "comparing":
        return "bg-sortviz-red";
      case "swapping":
        return "bg-sortviz-orange";
      case "sorted":
        return "bg-sortviz-green";
      case "pivot":
        return "bg-sortviz-purple";
      default:
        return "bg-sortviz-blue";
    }
  };

  return (
    <div
      className={cn(
        "w-full h-80 flex items-end justify-center gap-1 p-4",
        className,
      )}
    >
      {data.map((value, index) => {
        const status = getBarStatus(index);
        const height = getBarHeight(value);

        return (
          <div
            key={index}
            className={cn(
              "sorting-bar flex items-end justify-center relative transition-all duration-300",
              getBarColor(status),
              status,
              {
                "animate-pulse-glow":
                  isAnimating &&
                  (status === "comparing" || status === "swapping"),
              },
            )}
            style={
              {
                height: `${height}px`,
                width: `${Math.max(800 / data.length - 2, 4)}px`,
                minWidth: "4px",
                "--bar-height": `${height}px`,
              } as React.CSSProperties
            }
          >
            {/* Value label - improved positioning and sizing */}
            <span
              className="text-xs font-medium text-white absolute -top-7 left-1/2 transform -translate-x-1/2 bg-black/20 px-1 rounded"
              style={{
                fontSize: `${Math.max(8, Math.min(12, 160 / data.length))}px`,
                whiteSpace: "nowrap",
              }}
            >
              {value}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default SortingVisualizer;
