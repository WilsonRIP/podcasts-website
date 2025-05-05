import React from 'react';
import Link from 'next/link';
import { Category } from '../data/categories';
import OptimizedImage from './OptimizedImage';

interface CategoryCardProps {
  category: Category;
  variant?: 'default' | 'compact' | 'featured';
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, variant = 'default' }) => {
  if (variant === 'compact') {
    return (
      <Link href={`/categories/${category.id}`} className="group">
        <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <div className="relative flex-shrink-0 size-10 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
            <OptimizedImage
              src={category.icon}
              alt=""
              width={24}
              height={24}
              className="w-6 h-6 object-contain"
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">
              {category.name}
            </h3>
          </div>
        </div>
      </Link>
    );
  }
  
  if (variant === 'featured') {
    return (
      <Link href={`/categories/${category.id}`} className="group">
        <div className="relative overflow-hidden rounded-xl aspect-video shadow-md">
          <OptimizedImage
            src={category.coverImage}
            alt={category.name}
            fill
            className="object-cover brightness-75 group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
            <div className="absolute bottom-0 left-0 p-5 w-full">
              <div className="flex items-center gap-3 mb-2">
                <div className="size-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <OptimizedImage
                    src={category.icon}
                    alt=""
                    width={24}
                    height={24}
                    className="w-5 h-5"
                  />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {category.name}
                </h3>
              </div>
              <p className="text-white/80 text-sm">
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
  // Default card
  return (
    <Link href={`/categories/${category.id}`} className="group">
      <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative aspect-[3/2]">
          <OptimizedImage
            src={category.coverImage}
            alt={category.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-4 w-full">
              <h3 className="text-lg font-semibold text-white group-hover:text-primary/90 transition-colors">
                {category.name}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard; 