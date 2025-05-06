'use client';

import React from 'react';
import Link from 'next/link';
import { Podcast } from '../data/categories';
import OptimizedImage from './OptimizedImage';
import { useThemeContext } from '../../lib/contexts/ThemeContext';
import { cn } from '../../lib/utils';

interface PodcastCardProps {
  podcast: Podcast;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

const PodcastCard: React.FC<PodcastCardProps> = ({ podcast, variant = 'default', className = '' }) => {
  const { isDark, mounted } = useThemeContext();
  
  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={`animate-pulse rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className={`aspect-square ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        <div className="p-4 space-y-2">
          <div className={`h-4 rounded w-3/4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          <div className={`h-3 rounded w-1/2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        </div>
      </div>
    );
  }
  if (variant === 'compact') {
    return (
      <Link href={`/podcasts/${podcast.id}`} className="group">
        <div className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-300 ${isDark ? 'bg-gray-900 hover:bg-gray-800 shadow-md shadow-gray-900/30' : 'bg-white hover:bg-gray-100 shadow-md shadow-gray-200/50'} hover:transform hover:scale-[1.02]`}>
          <div className="relative shrink-0 w-16 h-16 rounded-md overflow-hidden">
            <OptimizedImage
              src={podcast.coverImage}
              alt={podcast.title}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className={`font-medium group-hover:text-primary transition-colors ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
              {podcast.title}
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
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
        <div className={cn(
            "rounded-xl overflow-hidden h-full transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1",
            isDark ? "bg-gray-900 shadow-lg shadow-gray-900/40" : "bg-white shadow-md shadow-gray-300/50",
            className
          )}
        >
          <div className="relative aspect-[4/3]">
            <OptimizedImage
              src={podcast.coverImage}
              alt={podcast.title}
              fill
              className="object-cover"
            />
            {podcast.rating && (
              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white flex items-center">
                <span className="text-yellow-400 mr-1">★</span> <span className="text-white">{podcast.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          <div className="p-5">
            <h3 className={`font-bold text-xl mb-2 group-hover:text-primary transition-colors ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
              {podcast.title}
            </h3>
            <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {podcast.creator}
            </p>
            <p className={`line-clamp-2 mb-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {podcast.description}
            </p>
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                {podcast.podcastUrl?.spotify && (
                  <div className={`size-8 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <span className="text-green-500 text-lg">S</span>
                  </div>
                )}
                {podcast.podcastUrl?.apple && (
                  <div className={`size-8 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <span className="text-purple-500 text-lg">A</span>
                  </div>
                )}
              </div>
              <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
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
      <div className={`rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 ${isDark ? 'bg-gray-900 shadow-md shadow-gray-900/40' : 'bg-white shadow-md shadow-gray-200/50'}`}>
        <div className="relative aspect-square">
          <OptimizedImage
            src={podcast.coverImage}
            alt={podcast.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className={`font-semibold group-hover:text-primary transition-colors ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            {podcast.title}
          </h3>
          <p className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {podcast.creator}
          </p>
          <div className="flex items-center justify-between text-xs">
            {podcast.rating && (
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span className={`${isDark ? 'text-gray-200' : 'text-gray-700'}`}>{podcast.rating.toFixed(1)}</span>
              </div>
            )}
            <span className={`${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
              {podcast.listenCount ? `${(podcast.listenCount / 1000).toFixed(0)}K` : ''}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PodcastCard; 