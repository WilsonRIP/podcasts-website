'use client';
import React from 'react';
import { categories } from '../data/categories';
import CategoryCard from '../components/CategoryCard';
import { useThemeManager } from '../../lib/hooks/useThemeManager';

export default function CategoriesPage() {
  const { isDark, mounted } = useThemeManager();
  
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-64 mb-4"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-lg w-full max-w-3xl"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`min-h-screen w-full ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-12">
        <div className={`max-w-3xl mx-auto text-center mb-12 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Browse Podcast Categories</h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover podcasts organized by your interests and passions
          </p>
        </div>
        
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
} 