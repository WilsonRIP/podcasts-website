'use client';

import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './styles/global.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {

  return (
    <html lang="en" className="scroll-smooth">
      <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900 antialiased dark:bg-gray-900 dark:text-gray-100">
        {/* Skip‑link for keyboard users & screen readers */}
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 rounded bg-primary px-3 py-2 text-white"
        >
          Skip to content
        </a>

        <Navbar />

        <main id="content" className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
