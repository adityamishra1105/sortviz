import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Play,
  Pause,
  RotateCcw,
  Shuffle,
  BookOpen,
  Zap,
  Edit3,
} from "lucide-react";
import { AlgorithmKey, algorithms } from "@/lib/sortingAlgorithms";
import { getAlgorithmInfo } from "@/lib/algorithmData";
import { cn } from "@/lib/utils";

interface ControlPanelProps {
  selectedAlgorithm: AlgorithmKey;
  onAlgorithmChange: (algorithm: AlgorithmKey) => void;
  arraySize: number;
  onArraySizeChange: (size: number) => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onShuffle: () => void;
  onCustomArray: (array: number[]) => void;
  isLearnMode: boolean;
  onLearnModeChange: (enabled: boolean) => void;
  isAnimating: boolean;
  className?: string;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  selectedAlgorithm,
  onAlgorithmChange,
  arraySize,
  onArraySizeChange,
  speed,
  onSpeedChange,
  isPlaying,
  onPlay,
  onPause,
  onReset,
  onShuffle,
  onCustomArray,
  isLearnMode,
  onLearnModeChange,
  isAnimating,
  className,
}) => {
  const [customInput, setCustomInput] = useState("");
  const [customArrayError, setCustomArrayError] = useState("");
  const algorithmInfo = getAlgorithmInfo(selectedAlgorithm);

  const algorithmOptions = Object.keys(algorithms).map((key) => {
    const info = getAlgorithmInfo(key as AlgorithmKey);
    return {
      value: key,
      label: info.name,
    };
  });

  const handleCustomArraySubmit = () => {
    setCustomArrayError("");

    if (!customInput.trim()) {
      setCustomArrayError("Please enter some numbers");
      return;
    }

    try {
      // Parse the input - support comma, space, or semicolon separated values
      const numbers = customInput
        .trim()
        .split(/[,;\s]+/)
        .filter((str) => str.length > 0)
        .map((str) => {
          const num = parseFloat(str.trim());
          if (isNaN(num)) {
            throw new Error(`"${str}" is not a valid number`);
          }
          if (num < 1 || num > 999) {
            throw new Error(`Numbers must be between 1 and 999`);
          }
          if (!Number.isInteger(num)) {
            throw new Error(`Only whole numbers are allowed`);
          }
          return num;
        });

      if (numbers.length < 2) {
        setCustomArrayError("Please enter at least 2 numbers");
        return;
      }

      if (numbers.length > 100) {
        setCustomArrayError("Maximum 100 numbers allowed");
        return;
      }

      onCustomArray(numbers);
      setCustomInput("");
      setCustomArrayError("");
    } catch (error) {
      setCustomArrayError(
        error instanceof Error ? error.message : "Invalid input format",
      );
    }
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-sortviz-blue" />
          Algorithm Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Algorithm Selection */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Algorithm</Label>
          <Select
            value={selectedAlgorithm}
            onValueChange={(value) => onAlgorithmChange(value as AlgorithmKey)}
            disabled={isAnimating}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an algorithm" />
            </SelectTrigger>
            <SelectContent>
              {algorithmOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Algorithm Info Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              Best: {algorithmInfo.timeComplexity.best}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Avg: {algorithmInfo.timeComplexity.average}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Worst: {algorithmInfo.timeComplexity.worst}
            </Badge>
            <Badge variant="outline" className="text-xs">
              Space: {algorithmInfo.spaceComplexity}
            </Badge>
          </div>
        </div>

        {/* Array Size Control */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Array Size</Label>
            <span className="text-sm text-muted-foreground">{arraySize}</span>
          </div>
          <Slider
            value={[arraySize]}
            onValueChange={(value) => onArraySizeChange(value[0])}
            min={5}
            max={100}
            step={5}
            disabled={isAnimating}
            className="w-full"
          />
        </div>

        {/* Speed Control */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Speed</Label>
            <span className="text-sm text-muted-foreground">
              {speed === 1
                ? "Slow"
                : speed === 2
                  ? "Medium"
                  : speed === 3
                    ? "Fast"
                    : "Very Fast"}
            </span>
          </div>
          <Slider
            value={[speed]}
            onValueChange={(value) => onSpeedChange(value[0])}
            min={1}
            max={4}
            step={1}
            className="w-full"
          />
        </div>

        {/* Custom Array Input */}
        <div className="space-y-3">
          <Label className="text-base font-medium flex items-center gap-2">
            <Edit3 className="h-4 w-4" />
            Custom Array
          </Label>
          <div className="space-y-2">
            <Input
              placeholder="Enter numbers: 64, 34, 25, 12, 22, 11, 90"
              value={customInput}
              onChange={(e) => {
                setCustomInput(e.target.value);
                setCustomArrayError("");
              }}
              disabled={isAnimating}
              className="text-sm"
            />
            {customArrayError && (
              <Alert className="py-2">
                <AlertDescription className="text-xs text-destructive">
                  {customArrayError}
                </AlertDescription>
              </Alert>
            )}
            <Button
              onClick={handleCustomArraySubmit}
              disabled={isAnimating || !customInput.trim()}
              variant="outline"
              size="sm"
              className="w-full text-xs"
            >
              Use Custom Array
            </Button>
            <p className="text-xs text-muted-foreground">
              Enter 2-100 numbers (1-999) separated by commas, spaces, or
              semicolons
            </p>
          </div>
        </div>

        {/* Learn Mode Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="text-base font-medium flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Learn Mode
            </Label>
            <p className="text-xs text-muted-foreground">
              Show detailed explanations and step descriptions
            </p>
          </div>
          <Switch
            checked={isLearnMode}
            onCheckedChange={onLearnModeChange}
            disabled={isAnimating}
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={isPlaying ? onPause : onPlay}
            disabled={isAnimating && !isPlaying}
            className="flex items-center gap-2"
            size="sm"
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Start
              </>
            )}
          </Button>

          <Button
            onClick={onReset}
            variant="outline"
            disabled={isAnimating}
            className="flex items-center gap-2"
            size="sm"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>

          <Button
            onClick={onShuffle}
            variant="outline"
            disabled={isAnimating}
            className="flex items-center gap-2 col-span-2"
            size="sm"
          >
            <Shuffle className="h-4 w-4" />
            Shuffle Array
          </Button>
        </div>

        {/* Status Indicator */}
        {isAnimating && (
          <div className="flex items-center gap-2 text-sm text-sortviz-blue">
            <div className="h-2 w-2 bg-sortviz-blue rounded-full animate-pulse" />
            Sorting in progress...
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ControlPanel;
