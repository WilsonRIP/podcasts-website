'use client';

import React, { useState } from 'react';
import { podcasts, categories } from '../data/categories';
import PodcastCard from '../components/PodcastCard';
import CategoryCard from '../components/CategoryCard';
import { useThemeManager } from '../../lib/hooks/useThemeManager';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import { ThemeContextProvider } from '../../lib/contexts/ThemeContext';

export default function ExplorePage() {
  const { isDark, mounted } = useThemeManager();
  const [sortBy, setSortBy] = useState<'popularity' | 'rating'>('popularity');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter and sort podcasts
  const filteredPodcasts = podcasts
    .filter(podcast => {
      // Category filter
      if (selectedCategory && !podcast.categories.includes(selectedCategory)) {
        return false;
      }
      
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          podcast.title.toLowerCase().includes(query) ||
          podcast.creator.toLowerCase().includes(query) ||
          podcast.description.toLowerCase().includes(query)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'popularity') {
        return (b.listenCount || 0) - (a.listenCount || 0);
      } else {
        return (b.rating || 0) - (a.rating || 0);
      }
    });

  return (
    <ThemeContextProvider>
      <div className={`w-full min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4 py-12">
          <div className={`max-w-3xl mx-auto text-center mb-10 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Explore Podcasts</h1>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Browse and discover podcasts from various categories
            </p>
          </div>
          
          {/* Search and filters */}
          <div className={`rounded-lg shadow-sm p-6 mb-10 ${isDark ? 'bg-gray-950 border border-gray-800' : 'bg-white border border-gray-200'}`}>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search podcasts by title, creator, or keywords..."
                className={`w-full px-4 py-3 rounded-md border border-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
        
            <div className={`flex flex-col md:flex-row gap-6`}>
              <div className="flex-1">
                <h3 className={`font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>Filter by Category</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-2">
                  <button
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      selectedCategory === null
                        ? 'bg-gray-400 ' + (isDark ? 'text-white' : 'text-gray-900')
                        : isDark 
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } transition-colors`}
                    onClick={() => setSelectedCategory(null)}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        selectedCategory === category.id
                          ? 'bg-gray-400 ' + (isDark ? 'text-white' : 'text-gray-900')
                          : isDark 
                            ? 'bg-gray-800 ' + (isDark ? 'text-white' : 'text-gray-900')
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      } transition-colors`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="md:w-48">
                <h3 className={`font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>Sort by</h3>
                <div className="flex gap-2">
                  <button
                    className={`flex-1 px-3 py-1.5 rounded-md text-sm ${
                      sortBy === 'popularity'
                        ? 'bg-primary text-white'
                        : isDark 
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } transition-colors`}
                    onClick={() => setSortBy('popularity')}
                  >
                    Popularity
                  </button>
                  <button
                    className={`flex-1 px-3 py-1.5 rounded-md text-sm ${
                      sortBy === 'rating'
                        ? 'bg-primary text-white'
                        : isDark 
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } transition-colors`}
                    onClick={() => setSortBy('rating')}
                  >
                    Rating
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className={`mb-6 flex items-center justify-between ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
            <h2 className={`text-xl font-bold ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
              {filteredPodcasts.length} {filteredPodcasts.length === 1 ? 'Podcast' : 'Podcasts'} Found
            </h2>
            {selectedCategory && (
              <button
                className={`text-sm text-primary hover:underline flex items-center ${isDark ? 'text-gray-300' : 'text-gray-800'}`}
                onClick={() => setSelectedCategory(null)}
              >
                Clear filter
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
          
          {filteredPodcasts.length > 0 ? (
            <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
              {filteredPodcasts.map((podcast) => (
                <PodcastCard key={podcast.id} podcast={podcast} />
              ))}
            </div>
          ) : (
            <div className={`rounded-lg p-8 text-center ${isDark ? 'bg-gray-900 text-gray-300' : 'bg-gray-50 text-gray-800'}`}>
              <p className="text-lg mb-4">
                No podcasts found with the current filters.
              </p>
              <button
                className={`text-primary hover:underline ${isDark ? 'text-gray-300' : 'text-gray-800'}`}
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery('');
                }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </ThemeContextProvider>
  );
} 