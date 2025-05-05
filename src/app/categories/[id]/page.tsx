import React from 'react';
import Link from 'next/link';
import { getCategoryById, getPodcastsByCategory } from '../../data/categories';
import PodcastCard from '../../components/PodcastCard';
import OptimizedImage from '../../components/OptimizedImage';

interface CategoryPageProps {
  params: {
    id: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryById(params.id);
  const podcasts = getPodcastsByCategory(params.id);
  
  if (!category) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The category you're looking for doesn't exist.
        </p>
        <Link
          href="/categories"
          className="rounded-md bg-primary px-6 py-3 text-white hover:bg-primary/90 transition-colors"
        >
          Browse All Categories
        </Link>
      </div>
    );
  }

  return (
    <div>
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
      <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/categories" className="hover:text-primary transition-colors">Categories</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-white font-medium">{category.name}</span>
          </div>
        </div>
      </div>
      
      {/* Podcasts grid */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">
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