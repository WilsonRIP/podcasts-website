'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { episodes } from '../data/episodes';
import OptimizedImage from '../components/OptimizedImage';

export default function EpisodesPage() {
  const [filter, setFilter] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc'>('date-desc');

  // Extract all unique tags from episodes
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    episodes.forEach(episode => {
      episode.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter and sort episodes
  const filteredEpisodes = useMemo(() => {
    return episodes
      .filter(episode => {
        const matchesFilter = filter === '' || 
          episode.title.toLowerCase().includes(filter.toLowerCase()) ||
          episode.description.toLowerCase().includes(filter.toLowerCase());
        
        const matchesTag = selectedTag === null || 
          episode.tags?.includes(selectedTag);
        
        return matchesFilter && matchesTag;
      })
      .sort((a, b) => {
        const dateA = new Date(a.publishDate).getTime();
        const dateB = new Date(b.publishDate).getTime();
        return sortBy === 'date-desc' ? dateB - dateA : dateA - dateB;
      });
  }, [filter, selectedTag, sortBy]);

  return (
    <div>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Episodes</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse all our podcast episodes
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-950 rounded-lg p-4 mb-8 border border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search input */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Search
              </label>
              <input 
                type="text"
                id="search"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search episodes..."
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
              />
            </div>
            
            {/* Tags filter */}
            <div>
              <label htmlFor="tag-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Filter by tag
              </label>
              <select 
                id="tag-filter"
                value={selectedTag || ''}
                onChange={(e) => setSelectedTag(e.target.value || null)}
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
              >
                <option value="">All tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
            
            {/* Sort options */}
            <div>
              <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sort by
              </label>
              <select 
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date-desc' | 'date-asc')}
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
              >
                <option value="date-desc">Newest first</option>
                <option value="date-asc">Oldest first</option>
              </select>
            </div>
          </div>
        </div>

        {/* Episodes list */}
        <div className="space-y-6">
          {filteredEpisodes.length > 0 ? (
            filteredEpisodes.map((episode) => (
              <Link key={episode.id} href={`/episodes/${episode.id}`} className="group">
                <div className="flex flex-col md:flex-row gap-6 p-4 rounded-lg bg-white dark:bg-gray-950 hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-800">
                  <div className="relative shrink-0 w-full md:w-56 h-48 md:h-32 rounded-md overflow-hidden">
                    <OptimizedImage
                      src={episode.coverImage}
                      alt={episode.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <span>S{episode.season}:E{episode.episode}</span>
                      <span>•</span>
                      <span>{new Date(episode.publishDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{episode.duration}</span>
                    </div>
                    <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                      {episode.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                      {episode.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {episode.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">No episodes found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
