import React from 'react';
import Link from 'next/link';
import { getPodcastById, getCategoryById } from '../../data/categories';
import OptimizedImage from '../../components/OptimizedImage';

interface PodcastPageProps {
  params: {
    id: string;
  };
}

export default function PodcastPage({ params }: PodcastPageProps) {
  const podcast = getPodcastById(params.id);
  
  if (!podcast) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Podcast Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The podcast you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/explore"
          className="rounded-md bg-primary px-6 py-3 text-white hover:bg-primary/90 transition-colors"
        >
          Explore Podcasts
        </Link>
      </div>
    );
  }

  // Get category data for this podcast
  const categories = podcast.categories.map(categoryId => getCategoryById(categoryId)).filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/explore" className="hover:text-primary transition-colors">Explore</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 dark:text-white font-medium">{podcast.title}</span>
        </div>
      </div>
      
      {/* Podcast header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-1">
          <div className="aspect-square relative rounded-lg overflow-hidden shadow-md">
            <OptimizedImage
              src={podcast.coverImage}
              alt={podcast.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        <div className="md:col-span-2">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {podcast.title}
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
            by {podcast.creator}
          </p>
          
          {/* Rating */}
          {podcast.rating && (
            <div className="flex items-center mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill={star <= Math.round(podcast.rating ?? 0) ? "currentColor" : "none"}
                    stroke="currentColor"
                    className={`w-5 h-5 ${star <= Math.round(podcast.rating ?? 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-700 dark:text-gray-300">
                {podcast.rating.toFixed(1)} {podcast.listenCount && `• ${(podcast.listenCount / 1000).toFixed(0)}K listeners`}
              </span>
            </div>
          )}
          
          {/* Description */}
          <div className="prose prose-lg dark:prose-invert mb-8">
            <p>{podcast.description}</p>
          </div>
          
          {/* Categories */}
          {categories.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Link
                    key={category?.id}
                    href={`/categories/${category?.id}`}
                    className="inline-block px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {category?.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* Listen on platforms */}
          <div>
            <h3 className="text-lg font-medium mb-3">Listen on</h3>
            <div className="flex flex-wrap gap-3">
              {podcast.podcastUrl?.spotify && (
                <a 
                  href={podcast.podcastUrl.spotify} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors"
                >
                  <span>Spotify</span>
                </a>
              )}
              
              {podcast.podcastUrl?.apple && (
                <a 
                  href={podcast.podcastUrl.apple} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-purple-500 text-white hover:bg-purple-600 transition-colors"
                >
                  <span>Apple Podcasts</span>
                </a>
              )}
              
              {podcast.podcastUrl?.google && (
                <a 
                  href={podcast.podcastUrl.google} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  <span>Google Podcasts</span>
                </a>
              )}
              
              {podcast.websiteUrl && (
                <a 
                  href={podcast.websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                >
                  <span>Official Website</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Similar podcasts section could go here */}
      
      {/* User reviews section could go here */}
    </div>
  );
} 