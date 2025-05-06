'use client';

import React from 'react';
import Link from 'next/link';
import { 
  getFeaturedPodcasts, 
  getPopularPodcasts, 
  categories 
} from './data/categories';
import PodcastCard from './components/PodcastCard';
import CategoryCard from './components/CategoryCard';
import { useThemeManager } from '../lib/hooks/useThemeManager';
import { motion, LazyMotion, domAnimation } from 'framer-motion';

export default function HomePage() {
  const { isDark, mounted } = useThemeManager();
  const featuredPodcasts = getFeaturedPodcasts();
  const popularPodcasts = getPopularPodcasts(6);
  
  // Prevent hydration mismatch by rendering a placeholder until client-side
  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4 max-w-xl mx-auto mb-8"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full max-w-md mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-800 rounded-lg h-64"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className={`transition-colors duration-300 ${isDark ? 'bg-gradient-to-b from-gray-900 to-gray-950 text-white' : 'bg-gradient-to-b from-gray-50 to-white text-gray-800'}`}>
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative py-20 overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center text-center max-w-3xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                Wilson R.I.P. Podcasts
              </h1>
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
                Discover and listen to the best podcasts across technology, science, gaming, and more
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/explore" 
                  className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
                >
                  Explore Podcasts
                </Link>
                <Link 
                  href="/categories" 
                  className={`px-6 py-3 rounded-full font-medium transition-colors ${isDark ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                >
                  Browse Categories
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Podcasts */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="py-16"
        >
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-between items-center mb-8"
            >
              <h2 className="text-3xl font-bold">Featured Podcasts</h2>
              <Link 
                href="/popular" 
                className="text-primary hover:underline font-medium flex items-center"
              >
                View All
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {featuredPodcasts.map((podcast) => (
                <PodcastCard key={podcast.id} podcast={podcast} />
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Categories Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`py-16 transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
        >
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-between items-center mb-8"
            >
              <h2 className="text-3xl font-bold">Explore Categories</h2>
              <Link 
                href="/categories" 
                className="text-primary hover:underline font-medium flex items-center"
              >
                View All
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {categories.slice(0, 8).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Popular Podcasts */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="py-16"
        >
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-between items-center mb-8"
            >
              <h2 className="text-3xl font-bold">Popular Podcasts</h2>
              <Link 
                href="/popular" 
                className="text-primary hover:underline font-medium flex items-center"
              >
                View All
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
            >
              {popularPodcasts.map((podcast) => (
                <PodcastCard key={podcast.id} podcast={podcast} />
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="py-16 bg-primary text-white"
        >
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold mb-4">Ready to dive in?</h2>
              <p className="text-lg opacity-90 mb-8">
                Explore thousands of podcasts, save your favorites, and subscribe to stay updated.
              </p>
              <Link 
                href="/subscribe" 
                className="inline-block px-6 py-3 bg-white text-primary rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                Subscribe Now
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </LazyMotion>
  );
}
