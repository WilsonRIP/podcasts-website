'use client';

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import AudioPlayer from '../../components/AudioPlayer';
import OptimizedImage from '../../components/OptimizedImage';
import { episodes } from '../../data/episodes';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EpisodeDetailPage({ params }: PageProps) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  
  // Find the episode by ID
  const episode = episodes.find(ep => ep.id === id);
  
  // Get next and previous episodes based on publish date
  const sortedEpisodes = [...episodes].sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
  
  const currentIndex = sortedEpisodes.findIndex(ep => ep.id === id);
  const nextEpisode = currentIndex > 0 ? sortedEpisodes[currentIndex - 1] : null;
  const prevEpisode = currentIndex < sortedEpisodes.length - 1 ? sortedEpisodes[currentIndex + 1] : null;
  
  // If episode not found, show error
  if (!episode) {
    return (
      <div>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Episode Not Found</h1>
          <p className="mb-8">The episode you're looking for doesn't exist.</p>
          <Link
            href="/episodes"
            className="inline-flex items-center text-primary hover:underline"
          >
            ← Back to all episodes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-12">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href="/episodes"
            className="inline-flex items-center text-primary hover:underline"
          >
            ← Back to all episodes
          </Link>
        </div>
        
        {/* Episode header */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-1/3">
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
              <OptimizedImage
                src={episode.coverImage}
                alt={episode.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Season {episode.season}</span>
              <span>•</span>
              <span>Episode {episode.episode}</span>
              <span>•</span>
              <span>{new Date(episode.publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{episode.title}</h1>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              {episode.description}
            </p>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Hosts:</h3>
              <div className="flex flex-wrap gap-2">
                {episode.hosts.map(host => (
                  <span 
                    key={host}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                  >
                    {host}
                  </span>
                ))}
              </div>
            </div>
            
            {episode.guests && episode.guests.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Guests:</h3>
                <div className="flex flex-wrap gap-2">
                  {episode.guests.map(guest => (
                    <span 
                      key={guest}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                    >
                      {guest}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {episode.tags && episode.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Topics:</h3>
                <div className="flex flex-wrap gap-2">
                  {episode.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Audio player */}
        <div className="mb-12">
          <AudioPlayer 
            audioUrl={episode.audioUrl} 
            title={episode.title}
          />
        </div>
        
        {/* Detailed description */}
        {episode.longDescription && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">About this episode</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>{episode.longDescription}</p>
            </div>
          </div>
        )}
        
        {/* Transcript (if available) */}
        {episode.transcript && (
          <div className="mb-12">
            <details className="group">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-100 dark:bg-gray-800 px-4 py-3 text-lg font-medium">
                <span>Transcript</span>
                <span className="ml-2 shrink-0 transition duration-300 group-open:rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </summary>
              <div className="mt-4 px-4 leading-relaxed text-gray-700 dark:text-gray-300">
                <p className="whitespace-pre-line">{episode.transcript}</p>
              </div>
            </details>
          </div>
        )}
        
        {/* Share and subscribe section */}
        <div className="flex flex-col sm:flex-row gap-6 justify-between p-6 bg-gray-100 dark:bg-gray-800 rounded-lg mb-12">
          <div>
            <h3 className="font-bold text-lg mb-2">Enjoyed this episode?</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Share it with your friends!</p>
            <div className="flex gap-4">
              <button
                className="p-2 bg-[#1DA1F2] text-white rounded-full"
                aria-label="Share on Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </button>
              <button
                className="p-2 bg-[#4267B2] text-white rounded-full"
                aria-label="Share on Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </button>
              <button
                className="p-2 bg-[#E60023] text-white rounded-full"
                aria-label="Share on Pinterest"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 496 512" fill="currentColor">
                  <path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-2">Subscribe to our podcast</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Never miss an episode</p>
            <div className="flex flex-wrap gap-3">
              <a 
                href="#" 
                className="flex items-center gap-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-3 py-1 rounded-full text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 50 50" fill="currentColor">
                  <path d="M25 0a25 25 0 1 0 0 50 25 25 0 0 0 0-50zm3.1 41.4c0 1.9-1.5 3.5-3.5 3.5h-.3c-1.9 0-3.5-1.5-3.5-3.5h-.2V22.2H8.3c0-1.9 1.5-3.5 3.5-3.5h9.9s2.5-7.5 3-8.8c.5-1.3 1.9-1.9 3.1-1.9s2.5.8 2.5 2c0 1.3-3.3 11.1-3.3 11.1h14.4c1.9 0 3.5 1.5 3.5 3.5l-16.8 16.8z"></path>
                </svg>
                Apple Podcasts
              </a>
              <a 
                href="#" 
                className="flex items-center gap-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-3 py-1 rounded-full text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                  <path d="M8 16l8-4-8-4z"></path>
                </svg>
                Google Podcasts
              </a>
              <a 
                href="#" 
                className="flex items-center gap-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-3 py-1 rounded-full text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9 16V8l8 4-8 4z" fill="white"></path>
                </svg>
                Spotify
              </a>
              <a 
                href="#" 
                className="flex items-center gap-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-3 py-1 rounded-full text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-6h2v2h-2zm0-8h2v6h-2z"></path>
                </svg>
                RSS Feed
              </a>
            </div>
          </div>
        </div>
        
        {/* Next/Prev episode navigation */}
        <div className="flex flex-col md:flex-row gap-6 justify-between">
          {prevEpisode && (
            <Link href={`/episodes/${prevEpisode.id}`} className="flex-1">
              <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  ← Previous Episode
                </div>
                <h3 className="font-medium">{prevEpisode.title}</h3>
              </div>
            </Link>
          )}
          
          {nextEpisode && (
            <Link href={`/episodes/${nextEpisode.id}`} className="flex-1">
              <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-right">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Next Episode →
                </div>
                <h3 className="font-medium">{nextEpisode.title}</h3>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
