"use client";

/**
 * Theme synchronization utility that manages theme preferences
 * between localStorage, system preferences, and app state
 */

// Theme constants
export const THEME_STORAGE_KEY = "theme";
export const THEMES = {
  DARK: "dark",
  LIGHT: "light",
  SYSTEM: "system",
} as const;

export type ThemeType = (typeof THEMES)[keyof typeof THEMES];

// Initialize theme based on stored preference or system preference
export function initializeTheme(): ThemeType {
  if (typeof window === "undefined") return THEMES.SYSTEM;

  try {
    // Check localStorage first
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeType | null;
    
    if (storedTheme && Object.values(THEMES).includes(storedTheme as ThemeType)) {
      return storedTheme as ThemeType;
    }
    
    // Fall back to system preference if no valid stored theme
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return THEMES.DARK;
    }
    
    return THEMES.LIGHT;
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return THEMES.SYSTEM;
  }
}

// Save theme preference to localStorage
export function saveThemePreference(theme: ThemeType): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    console.error("Error saving theme preference:", error);
  }
}

// Get the system theme preference
export function getSystemTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "light";

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? THEMES.DARK
    : THEMES.LIGHT;
}

// Apply theme to document
export function applyThemeToDocument(theme: ThemeType): void {
  if (typeof window === "undefined") return;

  const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = 
    theme === THEMES.DARK || 
    (theme === THEMES.SYSTEM && isSystemDark);

  document.documentElement.classList.toggle("dark", isDark);
}

// Listen for system theme changes
export function setupSystemThemeListener(callback: (isDark: boolean) => void): () => void {
  if (typeof window === "undefined") return () => {};

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  
  const handleChange = (e: MediaQueryListEvent) => {
    callback(e.matches);
  };
  
  mediaQuery.addEventListener("change", handleChange);
  
  return () => mediaQuery.removeEventListener("change", handleChange);
}
