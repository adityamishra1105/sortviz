import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true);

    // Check if there's a saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Default to dark theme
      setTheme("dark");
      applyTheme("dark");
    }
  }, []);

  const applyTheme = (newTheme: "light" | "dark") => {
    const htmlElement = document.documentElement;

    if (newTheme === "dark") {
      htmlElement.classList.add("dark");
      htmlElement.classList.remove("light");
    } else {
      htmlElement.classList.add("light");
      htmlElement.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={cn("h-8 w-8 p-0 transition-colors", "hover:bg-secondary/80")}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4 transition-transform" />
      ) : (
        <Sun className="h-4 w-4 transition-transform" />
      )}
    </Button>
  );
};

export default ThemeToggle;
