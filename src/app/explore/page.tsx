'use client';

import React, { useState } from 'react';
import { podcasts, categories } from '../data/categories';
import PodcastCard from '../components/PodcastCard';
import CategoryCard from '../components/CategoryCard';

export default function ExplorePage() {
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
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Explore Podcasts</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Browse and discover podcasts from various categories
        </p>
      </div>
      
      {/* Search and filters */}
      <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-10">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search podcasts by title, creator, or keywords..."
            className="w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h3 className="font-medium mb-2">Filter by Category</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-2">
              <button
                className={`px-3 py-1.5 rounded-full text-sm ${
                  selectedCategory === null
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
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
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  } transition-colors`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="md:w-48">
            <h3 className="font-medium mb-2">Sort by</h3>
            <div className="flex gap-2">
              <button
                className={`flex-1 px-3 py-1.5 rounded-md text-sm ${
                  sortBy === 'popularity'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                } transition-colors`}
                onClick={() => setSortBy('popularity')}
              >
                Popularity
              </button>
              <button
                className={`flex-1 px-3 py-1.5 rounded-md text-sm ${
                  sortBy === 'rating'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
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
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {filteredPodcasts.length} {filteredPodcasts.length === 1 ? 'Podcast' : 'Podcasts'} Found
        </h2>
        {selectedCategory && (
          <button
            className="text-sm text-primary hover:underline flex items-center"
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredPodcasts.map((podcast) => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 text-center">
          <p className="text-lg mb-4">
            No podcasts found with the current filters.
          </p>
          <button
            className="text-primary hover:underline"
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
  );
} 