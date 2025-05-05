import React from 'react';
import Link from 'next/link';
import { Podcast } from '../data/categories';
import OptimizedImage from './OptimizedImage';

interface PodcastCardProps {
  podcast: Podcast;
  variant?: 'default' | 'compact' | 'featured';
}

const PodcastCard: React.FC<PodcastCardProps> = ({ podcast, variant = 'default' }) => {
  if (variant === 'compact') {
    return (
      <Link href={`/podcasts/${podcast.id}`} className="group">
        <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <div className="relative shrink-0 w-16 h-16 rounded-md overflow-hidden">
            <OptimizedImage
              src={podcast.coverImage}
              alt={podcast.title}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">
              {podcast.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {podcast.creator}
            </p>
          </div>
        </div>
      </Link>
    );
  }
  
  if (variant === 'featured') {
    return (
      <Link href={`/podcasts/${podcast.id}`} className="group">
        <div className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 hover:shadow-xl transition-shadow">
          <div className="relative aspect-[4/3]">
            <OptimizedImage
              src={podcast.coverImage}
              alt={podcast.title}
              fill
              className="object-cover"
            />
            {podcast.rating && (
              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white flex items-center">
                <span className="text-yellow-400 mr-1">★</span> {podcast.rating.toFixed(1)}
              </div>
            )}
          </div>
          <div className="p-5">
            <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
              {podcast.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {podcast.creator}
            </p>
            <p className="text-gray-700 dark:text-gray-300 line-clamp-2 mb-4 text-sm">
              {podcast.description}
            </p>
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                {podcast.podcastUrl?.spotify && (
                  <div className="size-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <span className="text-green-500 text-lg">S</span>
                  </div>
                )}
                {podcast.podcastUrl?.apple && (
                  <div className="size-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <span className="text-purple-500 text-lg">A</span>
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {podcast.listenCount ? `${(podcast.listenCount / 1000).toFixed(0)}K listeners` : ''}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
  // Default card
  return (
    <Link href={`/podcasts/${podcast.id}`} className="group">
      <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-900">
        <div className="relative aspect-square">
          <OptimizedImage
            src={podcast.coverImage}
            alt={podcast.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
            {podcast.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {podcast.creator}
          </p>
          <div className="flex items-center justify-between text-xs">
            {podcast.rating && (
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span>{podcast.rating.toFixed(1)}</span>
              </div>
            )}
            <span className="text-gray-500 dark:text-gray-400">
              {podcast.listenCount ? `${(podcast.listenCount / 1000).toFixed(0)}K` : ''}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PodcastCard; 