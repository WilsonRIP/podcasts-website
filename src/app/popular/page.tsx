import React from 'react';
import Link from 'next/link';
import { getPopularPodcasts } from '../data/categories';
import OptimizedImage from '../components/OptimizedImage';

export default function PopularPage() {
  // Get top 20 most popular podcasts
  const popularPodcasts = getPopularPodcasts(20);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Top Podcasts</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          The most listened-to podcasts right now
        </p>
      </div>
      
      <div className="space-y-6">
        {popularPodcasts.map((podcast, index) => (
          <Link key={podcast.id} href={`/podcasts/${podcast.id}`} className="group">
            <div className="flex flex-row gap-6 p-6 rounded-lg bg-white dark:bg-gray-950 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center size-16 font-bold text-3xl text-gray-400 dark:text-gray-600">
                {index + 1}
              </div>
              <div className="relative shrink-0 size-24 md:size-28 rounded-md overflow-hidden">
                <OptimizedImage
                  src={podcast.coverImage}
                  alt={podcast.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="font-bold text-xl md:text-2xl group-hover:text-primary transition-colors">
                  {podcast.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {podcast.creator}
                </p>
                <div className="flex items-center mt-2">
                  {podcast.rating && (
                    <div className="flex items-center text-sm">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span>{podcast.rating.toFixed(1)}</span>
                      <span className="mx-2">•</span>
                    </div>
                  )}
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {podcast.listenCount ? `${(podcast.listenCount / 1000).toFixed(0)}K listeners` : ''}
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2 pr-4">
                  {podcast.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 