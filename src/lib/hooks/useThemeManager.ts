"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Enhanced theme management hook that extends next-themes functionality
 * with additional features like transition prevention during theme changes
 */
export function useThemeManager() {
  const { resolvedTheme, setTheme, theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Determine if dark mode is active
  const isDark = resolvedTheme === "dark";
  
  // Toggle between light and dark themes
  const toggleTheme = () => {
    console.log('Toggle theme called, current state:', { isDark, resolvedTheme, theme });
    
    // Add class to prevent transition flicker during theme change
    document.documentElement.classList.add("theme-transition-in-progress");
    
    // Set the new theme explicitly
    const newTheme = isDark ? "light" : "dark";
    console.log('Setting new theme to:', newTheme);
    
    // Force application of theme class
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Update theme through next-themes
    setTheme(newTheme);
    
    // Dispatch custom event for theme change
    window.dispatchEvent(
      new CustomEvent("theme-change", { detail: { theme: newTheme } })
    );
    
    // Remove the transition prevention class after a short delay
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition-in-progress");
      console.log('Theme transition completed, document classes:', document.documentElement.className);
    }, 100);
  };

  // Component mounting handler to ensure hydration mismatch prevention
  useEffect(() => {
    setMounted(true);
  }, []);

  // Ensure theme is properly applied after mounting
  useEffect(() => {
    if (mounted && resolvedTheme) {
      if (resolvedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [mounted, resolvedTheme]);

  return {
    isDark,
    toggleTheme,
    theme,
    systemTheme,
    resolvedTheme,
    setTheme,
    mounted
  };
}
