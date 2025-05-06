"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useThemeManager } from "../hooks/useThemeManager";

// Theme context interface defining available values
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  theme: string | undefined;
  systemTheme: string | undefined;
  resolvedTheme: string | undefined;
  setTheme: (theme: string) => void;
  mounted: boolean;
}

// Create context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Props interface for ThemeContextProvider
interface ThemeContextProviderProps {
  children: ReactNode;
}

/**
 * Provider component that wraps app or components needing theme access
 * Uses our custom useThemeManager hook and makes values available through context
 */
export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const themeManager = useThemeManager();
  
  return (
    <ThemeContext.Provider value={themeManager}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to consume the theme context
 * This makes it easier to access theme values in any component
 */
export function useThemeContext(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeContextProvider");
  }
  
  return context;
}
