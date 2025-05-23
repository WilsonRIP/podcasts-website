'use client';

import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ThemeProvider } from './components/theme-provider';
import './styles/global.css';
import { useThemeManager } from '../lib/hooks/useThemeManager';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  // Force initial theme application from localStorage or system preference
  React.useEffect(() => {
    // Try to get the theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // If theme exists in localStorage, apply it
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // If no theme in localStorage, check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);
  const { isDark } = useThemeManager();
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Add ColorSchemeScript to prevent flash of wrong theme */}
      </head>
      <body className={`flex min-h-screen w-full flex-col antialiased ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Skip‑link for keyboard users & screen readers */}
          <a
            href="#content"
            className={`sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 rounded px-3 py-2 ${isDark ? 'bg-primary text-white' : 'bg-primary text-white'}`}
          >
            Skip to content
          </a>

          <Navbar />

          <main id="content" className="flex-1">
            {children}
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
