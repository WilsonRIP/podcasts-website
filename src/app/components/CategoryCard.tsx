'use client';

import React from 'react';
import Link from 'next/link';
import { Category } from '../data/categories';
import OptimizedImage from './OptimizedImage';
import { useThemeContext } from '../../lib/contexts/ThemeContext';

interface CategoryCardProps {
  category: Category;
  variant?: 'default' | 'compact' | 'featured';
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, variant = 'default' }) => {
  const { isDark, mounted } = useThemeContext();
  
  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={`animate-pulse rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className={`aspect-[3/2] ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        <div className="p-4">
          <div className={`h-4 rounded w-1/2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        </div>
      </div>
    );
  }
  if (variant === 'compact') {
    return (
      <Link href={`/categories/${category.id}`} className="group">
        <div className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-300 ${isDark ? 'bg-gray-900 hover:bg-gray-800 shadow-md shadow-gray-900/30' : 'bg-white hover:bg-gray-100 shadow-md shadow-gray-200/50'} hover:transform hover:scale-[1.02] hover:shadow-lg`}>
          <div className={`relative flex-shrink-0 size-10 rounded-md overflow-hidden flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
            <OptimizedImage
              src={category.icon}
              alt=""
              width={24}
              height={24}
              className="w-6 h-6 object-contain"
            />
          </div>
          <div>
            <h3 className={`font-medium group-hover:text-primary transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {category.name}
            </h3>
          </div>
        </div>
      </Link>
    );
  }
  
  if (variant === 'featured') {
    return (
      <Link href={`/categories/${category.id}`} className="group">
        <div className={`relative overflow-hidden rounded-xl aspect-video transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 ${isDark ? 'shadow-lg shadow-gray-900/50' : 'shadow-lg shadow-gray-300/50'} hover:shadow-xl`}>
          <OptimizedImage
            src={category.coverImage}
            alt={category.name}
            fill
            className="object-cover brightness-75 group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
            <div className="absolute bottom-0 left-0 p-5 w-full">
              <div className="flex items-center gap-3 mb-2">
                <div className="size-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <OptimizedImage
                    src={category.icon}
                    alt=""
                    width={24}
                    height={24}
                    className="w-5 h-5"
                  />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {category.name}
                </h3>
              </div>
              <p className="text-white/80 text-sm">
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
  // Default card
  return (
    <Link href={`/categories/${category.id}`} className="group">
      <div className={`rounded-lg overflow-hidden relative transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 ${isDark ? 'shadow-lg shadow-gray-900/40' : 'shadow-md shadow-gray-200/50'} hover:shadow-xl`}
        style={{ aspectRatio: 3/2 }}
      >
        <OptimizedImage
          src={category.coverImage}
          alt={category.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-4 w-full">
            <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
              {category.name}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard; 