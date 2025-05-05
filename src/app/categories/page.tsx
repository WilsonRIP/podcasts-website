import React from 'react';
import { categories } from '../data/categories';
import CategoryCard from '../components/CategoryCard';

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Browse Podcast Categories</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Discover podcasts organized by your interests and passions
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
} 