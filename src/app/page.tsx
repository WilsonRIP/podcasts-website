import React from 'react';
import Link from 'next/link';
import { categories, getFeaturedPodcasts, getPopularPodcasts } from './data/categories';
import PodcastCard from './components/PodcastCard';
import CategoryCard from './components/CategoryCard';
import OptimizedImage from './components/OptimizedImage';

export default function HomePage() {
  // Get featured podcasts
  const featuredPodcasts = getFeaturedPodcasts();
  
  // Get popular podcasts
  const popularPodcasts = getPopularPodcasts(5);
  
  // Get featured categories (limited to 6)
  const featuredCategories = categories.slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat"></div>
        </div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Podcasts for Your Passions</h1>
            <p className="text-xl mb-8 text-gray-300">
              Find podcasts that align with your interests, hobbies, and curiosities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/explore"
                className="rounded-full bg-primary px-6 py-3 text-base font-medium text-white hover:bg-primary/90 transition-colors"
              >
                Explore Podcasts
              </Link>
              <Link
                href="/categories"
                className="rounded-full bg-white/10 backdrop-blur-sm px-6 py-3 text-base font-medium text-white hover:bg-white/20 transition-colors border border-white/20"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-3xl">
              <input
                type="text"
                placeholder="Search for podcasts, topics, or creators..."
                className="w-full px-5 py-4 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-primary p-3 text-white hover:bg-primary/90 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Browse by Interest</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Find podcasts based on what you're passionate about
              </p>
            </div>
            <Link href="/categories" className="text-primary hover:underline flex items-center">
              View all
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Podcasts */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Podcasts</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Handpicked shows we think you'll love
              </p>
            </div>
            <Link href="/explore" className="text-primary hover:underline flex items-center">
              View all
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredPodcasts.map((podcast) => (
              <PodcastCard key={podcast.id} podcast={podcast} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Podcasts */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Trending Now</h2>
            <p className="text-gray-600 dark:text-gray-400">
              The most listened-to podcasts right now
            </p>
          </div>
          
          <div className="space-y-4">
            {popularPodcasts.map((podcast, index) => (
              <Link key={podcast.id} href={`/podcasts/${podcast.id}`} className="group">
                <div className="flex flex-row gap-6 p-4 rounded-lg bg-white dark:bg-gray-950 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-center size-12 font-bold text-2xl text-gray-400 dark:text-gray-600">
                    {index + 1}
                  </div>
                  <div className="relative shrink-0 size-20 md:size-24 rounded-md overflow-hidden">
                    <OptimizedImage
                      src={podcast.coverImage}
                      alt={podcast.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="font-bold text-lg md:text-xl group-hover:text-primary transition-colors">
                      {podcast.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {podcast.creator}
                    </p>
                    <div className="mt-2 flex items-center">
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              href="/popular"
              className="inline-flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 px-6 py-3 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              View more popular podcasts
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Banner */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Weekly Podcast Recommendations</h2>
          <p className="text-white/90 mb-8 max-w-lg mx-auto">
            Subscribe to our newsletter and receive personalized podcast suggestions based on your interests.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 rounded-md px-4 py-3 text-gray-900 bg-white"
            />
            <button className="rounded-md bg-gray-900 px-6 py-3 font-medium hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
