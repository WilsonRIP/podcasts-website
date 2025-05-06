"use client";
import React, { use } from 'react';
import Link from 'next/link';
import { getCategoryById, getPodcastsByCategory } from '../../data/categories';
import PodcastCard from '../../components/PodcastCard';
import OptimizedImage from '../../components/OptimizedImage';
import { useThemeManager } from '../../../lib/hooks/useThemeManager';

interface ResolvedCategoryPageProps {
  id: string;
}

interface CategoryPageProps {
  params: Promise<ResolvedCategoryPageProps>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { id } = use(params);
  const { isDark, mounted } = useThemeManager();
  const category = getCategoryById(id);
  const podcasts = getPodcastsByCategory(id);
  
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

  if (!category) {
    return (
      <div className={`min-h-screen w-full ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Category Not Found</h1>
          <p className={`mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            The category you're looking for doesn't exist.
          </p>
          <Link
            href="/categories"
            className="rounded-md bg-primary px-6 py-3 text-white hover:bg-primary/90 transition-colors"
          >
            Browse All Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero header */}
      <div className="relative">
        <div className="relative aspect-[5/2] w-full overflow-hidden">
          <OptimizedImage
            src={category.coverImage}
            alt={category.name}
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="size-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <OptimizedImage
                src={category.icon}
                alt=""
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">{category.name}</h1>
          </div>
          <p className="text-xl max-w-2xl text-center text-white/90">
            {category.description}
          </p>
        </div>
      </div>
      
      {/* Breadcrumbs */}
      <div className={`border-b ${isDark ? 'bg-gray-950 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
            <span className="mx-2">/</span>
            <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{category.name}</span>
          </div>
        </div>
      </div>
      
      {/* Podcasts grid */}
      <div className="container mx-auto px-4 py-12">
        <h2 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {podcasts.length > 0 ? (
            `Podcasts in ${category.name} (${podcasts.length})`
          ) : (
            `No podcasts found in ${category.name}`
          )}
        </h2>
        
        {podcasts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {podcasts.map((podcast) => (
              <PodcastCard key={podcast.id} podcast={podcast} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 text-center">
            <p className="text-lg mb-4">
              We're still collecting podcasts for this category.
            </p>
            <Link
              href="/categories"
              className="text-primary hover:underline"
            >
              Browse other categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 