import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Code2 } from "lucide-react";
import { AlgorithmKey } from "@/lib/sortingAlgorithms";
import { getAlgorithmInfo } from "@/lib/algorithmData";
import { cn } from "@/lib/utils";

interface CodeViewerProps {
  algorithm: AlgorithmKey;
  className?: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  algorithm,
  className,
}) => {
  const [copiedLanguage, setCopiedLanguage] = useState<string | null>(null);
  const algorithmInfo = getAlgorithmInfo(algorithm);

  const copyToClipboard = async (code: string, language: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedLanguage(language);
      setTimeout(() => setCopiedLanguage(null), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const languages = [
    {
      key: "javascript" as const,
      name: "JavaScript",
      icon: "🟨",
      extension: ".js",
    },
    { key: "python" as const, name: "Python", icon: "🐍", extension: ".py" },
    { key: "java" as const, name: "Java", icon: "☕", extension: ".java" },
    { key: "cpp" as const, name: "C++", icon: "⚡", extension: ".cpp" },
  ];

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-sortviz-purple" />
          Implementation
          <Badge variant="outline" className="ml-auto">
            {algorithmInfo.name}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="javascript" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {languages.map((lang) => (
              <TabsTrigger
                key={lang.key}
                value={lang.key}
                className="text-xs flex items-center gap-1"
              >
                <span>{lang.icon}</span>
                {lang.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {languages.map((lang) => (
            <TabsContent key={lang.key} value={lang.key} className="mt-4">
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {algorithmInfo.name}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {lang.extension}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      copyToClipboard(algorithmInfo.code[lang.key], lang.key)
                    }
                    className="h-8 px-3"
                  >
                    {copiedLanguage === lang.key ? (
                      <>
                        <Check className="h-3 w-3 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>

                <div className="relative bg-card/50 border rounded-lg overflow-hidden">
                  <pre className="p-4 text-sm overflow-x-auto">
                    <code className="text-foreground">
                      {algorithmInfo.code[lang.key]}
                    </code>
                  </pre>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CodeViewer;
