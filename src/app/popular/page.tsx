'use client';

import React from 'react';
import Link from 'next/link';
import { getPopularPodcasts } from '../data/categories';
import OptimizedImage from '../components/OptimizedImage';
import { useThemeManager } from '../../lib/hooks/useThemeManager';
import { motion, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';

export default function PopularPage() {
  const { isDark, mounted } = useThemeManager();
  // Get top 20 most popular podcasts
  const popularPodcasts = getPopularPodcasts(20);

  // Prevent hydration mismatch by rendering a placeholder until client-side
  if (!mounted) {
    return (
      <div className="w-full px-4 py-12 bg-white dark:bg-gray-900"> {/* Default to one theme or use neutral */} 
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mx-auto"></div>
          </div>
          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-row gap-6 p-6 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse">
                <div className="size-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="size-24 md:size-28 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                <div className="flex-1 space-y-3 py-1">
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className={`w-full px-4 py-12 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <motion.div 
          className="container mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
        <motion.div 
          className={`max-w-3xl mx-auto text-center mb-12 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Top Podcasts</h1>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            The most listened-to podcasts right now
          </p>
        </motion.div>
        
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <AnimatePresence>
            {popularPodcasts.map((podcast, index) => (
              <motion.div
                key={podcast.id}
                custom={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
                layout
              >
                <Link href={`/podcasts/${podcast.id}`} className="group">
                  <div className={`flex flex-row gap-6 p-6 rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] ${isDark ? 'bg-gray-950' : 'bg-white'}`}>
                    <div className={`flex items-center justify-center size-16 font-bold text-3xl ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {index + 1}
                    </div>
                    <div className={`relative shrink-0 size-24 md:size-28 rounded-md overflow-hidden ${isDark ? 'bg-gray-950' : 'bg-white'}`}>
                      <OptimizedImage
                        src={podcast.coverImage}
                        alt={podcast.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className={`flex-1 flex flex-col justify-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <h3 className={`font-bold text-xl md:text-2xl group-hover:text-primary transition-colors ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                        {podcast.title}
                      </h3>
                      <p className={`mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {podcast.creator}
                      </p>
                      <div className={`flex items-center mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {podcast.rating && (
                          <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            <span className={`text-yellow-400 mr-1`}>★</span>
                            <span>{podcast.rating.toFixed(1)}</span>
                            <span className="mx-2">•</span>
                          </div>
                        )}
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {podcast.listenCount ? `${(podcast.listenCount / 1000).toFixed(0)}K listeners` : ''}
                        </span>
                      </div>
                      <p className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} line-clamp-2 pr-4`}>
                        {podcast.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      </div>
    </LazyMotion>
  );
} 