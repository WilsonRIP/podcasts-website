"use client";

import React from 'react';
import Link from 'next/link';
import { getPodcastById, getCategoryById } from '../../data/categories';
import OptimizedImage from '../../components/OptimizedImage';
import { useThemeManager } from '../../../lib/hooks/useThemeManager';
import { motion, LazyMotion, domAnimation } from 'framer-motion';

interface PodcastPageProps {
  params: {
    id: string;
  };
}

export default function PodcastPage({ params }: PodcastPageProps) {
  const { isDark, mounted } = useThemeManager();
  const podcast = getPodcastById(params.id);
  
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
  
  if (!podcast) {
    return (
      <div className={`min-h-screen w-full ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Podcast Not Found</h1>
          <p className={`mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            The podcast you're looking for doesn't exist or has been removed.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/explore"
              className={`rounded-md bg-primary px-6 py-3 text-white hover:bg-primary/90 transition-all shadow-md ${isDark ? 'shadow-gray-900/30' : 'shadow-gray-300/30'} hover:shadow-lg`}
            >
              Explore Podcasts
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  // Get category data for this podcast
  const categories = podcast.categories.map(categoryId => getCategoryById(categoryId)).filter(Boolean);

  return (
    <LazyMotion features={domAnimation}>
      <div className={`min-h-screen w-full ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/explore" className="hover:text-primary transition-colors">Explore</Link>
          <span className="mx-2">/</span>
          <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{podcast.title}</span>
        </div>
      </motion.div>
      
      {/* Podcast header */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <motion.div 
          className="md:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className={`aspect-square relative rounded-lg overflow-hidden ${isDark ? 'shadow-lg shadow-gray-900/40' : 'shadow-lg shadow-gray-300/40'} transition-all duration-300`}>
            <OptimizedImage
              src={podcast.coverImage}
              alt={podcast.title}
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="md:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {podcast.title}
          </h1>
          <p className={`text-xl mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
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
          <div className={`prose prose-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <p>{podcast.description}</p>
          </div>
          
          {/* Categories */}
          {categories.length > 0 && (
            <div className="mb-8">
              <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <motion.div key={category?.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={`/categories/${category?.id}`}
                      className={`inline-block px-3 py-1 rounded-full text-sm transition-all ${isDark ? 'bg-gray-800 text-gray-200 shadow-md shadow-gray-900/20 hover:bg-gray-700' : 'bg-gray-100 text-gray-800 shadow-sm shadow-gray-200/50 hover:bg-gray-200'} hover:shadow-md`}
                    >
                      {category?.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          {/* Listen on platforms */}
          <div>
            <h3 className={`text-lg font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Listen on</h3>
            <div className="flex flex-wrap gap-3">
              {podcast.podcastUrl?.spotify && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a 
                    href={podcast.podcastUrl.spotify} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-all shadow-md hover:shadow-lg"
                  >
                    <span>Spotify</span>
                  </a>
                </motion.div>
              )}
              
              {podcast.podcastUrl?.apple && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a 
                    href={podcast.podcastUrl.apple} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-purple-500 text-white hover:bg-purple-600 transition-all shadow-md hover:shadow-lg"
                  >
                    <span>Apple Podcasts</span>
                  </a>
                </motion.div>
              )}
              
              {podcast.podcastUrl?.google && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a 
                    href={podcast.podcastUrl.google} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
                  >
                    <span>Google Podcasts</span>
                  </a>
                </motion.div>
              )}
              
              {podcast.websiteUrl && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a 
                    href={podcast.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all shadow-md hover:shadow-lg ${isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                  >
                    <span>Official Website</span>
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Similar podcasts section could go here */}
      
      {/* User reviews section could go here */}
        </div>
      </div>
    </LazyMotion>
  );
} 