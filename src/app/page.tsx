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
import { WEBSITE_NAME, WEBSITE_DESCRIPTION } from '../lib/types';

export default function HomePage() {
  const { isDark, mounted } = useThemeManager();
  const featuredPodcasts = getFeaturedPodcasts();
  const popularPodcasts = getPopularPodcasts(6);
  
  // Prevent hydration mismatch by rendering a placeholder until client-side
  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className={`h-12 rounded w-3/4 max-w-xl mx-auto mb-8 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          <div className={`h-6 rounded w-full max-w-md mx-auto mb-12 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`rounded-lg h-64 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className={`transition-colors duration-300 w-full ${isDark ? 'bg-gradient-to-b from-gray-900 to-gray-950 text-white' : 'bg-white text-gray-800'}`}>
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative py-24 overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-center text-center max-w-3xl mx-auto"
            >
              <h1 className={`text-5xl md:text-6xl font-bold mb-6 bg-clip-text ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {WEBSITE_NAME}
              </h1>
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
                {WEBSITE_DESCRIPTION}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href="/explore" 
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${isDark ? 'bg-gray-800 text-gray-200 hover:bg-gray-700 shadow-lg shadow-gray-900/30' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 shadow-md shadow-gray-300/30'} hover:shadow-xl`}
                  >
                    Explore Podcasts
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href="/categories" 
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${isDark ? 'bg-gray-800 text-gray-200 hover:bg-gray-700 shadow-lg shadow-gray-900/30' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 shadow-md shadow-gray-300/30'} hover:shadow-xl`}
                  >
                    Browse Categories
                  </Link>
                </motion.div>
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
              <h2 className={`text-3xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Featured Podcasts</h2>
              <Link 
                href="/popular" 
                className={`text-primary hover:underline font-medium flex items-center ${isDark ? 'text-gray-200' : 'text-gray-800'}`}
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
                <motion.div
                  key={podcast.id}
                  whileHover={{ y: -5 }}
                  className={`${isDark ? 'bg-gray-950' : 'bg-white'} rounded-xl shadow-md overflow-hidden transition-all`}
                >
                  <PodcastCard podcast={podcast} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Categories Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`py-16 transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}
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
                className={`text-primary hover:underline font-medium flex items-center ${isDark ? 'text-gray-200' : 'text-gray-800'}`}
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
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-between items-center mb-8"
            >
              <h2 className={`text-3xl font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Popular Podcasts</h2>
              <Link 
                href="/popular" 
                className={`text-primary hover:underline font-medium flex items-center ${isDark ? 'text-gray-200' : 'text-gray-800'}`}
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
                <motion.div
                  key={podcast.id}
                  whileHover={{ y: -8, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`${isDark ? 'bg-gray-950' : 'bg-white'} rounded-xl overflow-hidden transition-all ${isDark ? 'shadow-lg shadow-gray-900/40' : 'shadow-lg shadow-gray-300/40'} hover:shadow-xl`}
                >
                  <PodcastCard podcast={podcast} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="py-16 bg-primary text-white w-full"
        >
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Ready to dive in?</h2>
              <p className={`text-lg opacity-90 mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Explore thousands of podcasts, save your favorites, and subscribe to stay updated.
              </p>
              <Link 
                href="/subscribe" 
                className={`inline-block px-6 py-3 rounded-full font-medium transition-colors ${isDark ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
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
