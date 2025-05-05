'use client';

import React, { useState } from 'react';
import { z } from 'zod';

// Define a type-safe subscription schema
const subscriptionSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  name: z.string().min(1, { message: "Name is required" }),
  preferences: z.array(z.string()).min(1, { message: "Please select at least one preference" })
});

type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

export default function SubscribePage() {
  const [formData, setFormData] = useState<Partial<SubscriptionFormData>>({
    email: '',
    name: '',
    preferences: []
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const currentPreferences = prev.preferences || [];
      if (checked) {
        return { ...prev, preferences: [...currentPreferences, value] };
      } else {
        return { 
          ...prev, 
          preferences: currentPreferences.filter(pref => pref !== value) 
        };
      }
    });
    
    // Clear preference error if at least one is selected
    if (errors.preferences && checked) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.preferences;
        return newErrors;
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    
    try {
      // Validate form data
      const validatedData = subscriptionSchema.parse(formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Subscription data:', validatedData);
      setIsSuccess(true);
      
      // Reset form
      setFormData({
        email: '',
        name: '',
        preferences: []
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path.length > 0) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        setErrors({ form: 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Subscribe to Our Podcast</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Get notified about new episodes and exclusive content
          </p>
          
          {isSuccess ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-medium text-green-800 dark:text-green-200 mb-2">Subscription Successful!</h3>
              <p className="text-green-700 dark:text-green-300 mb-4">
                Thank you for subscribing to our podcast. You'll start receiving updates soon!
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md transition-colors"
              >
                Subscribe Another Email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6">
              {errors.form && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-700 dark:text-red-300 text-sm">
                  {errors.form}
                </div>
              )}
              
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  className={`w-full rounded-md border ${errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-800 px-3 py-2`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  className={`w-full rounded-md border ${errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-800 px-3 py-2`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                )}
              </div>
              
              <div className="mb-6">
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  I'm interested in: (select at least one)
                </span>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="pref-episodes"
                      name="preferences"
                      value="new-episodes"
                      checked={formData.preferences?.includes('new-episodes') || false}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor="pref-episodes" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      New episode notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="pref-interviews"
                      name="preferences"
                      value="interviews"
                      checked={formData.preferences?.includes('interviews') || false}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor="pref-interviews" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Special interview episodes
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="pref-behind"
                      name="preferences"
                      value="behind-scenes"
                      checked={formData.preferences?.includes('behind-scenes') || false}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor="pref-behind" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Behind the scenes content
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="pref-news"
                      name="preferences"
                      value="news"
                      checked={formData.preferences?.includes('news') || false}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor="pref-news" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Podcast news and updates
                    </label>
                  </div>
                </div>
                {errors.preferences && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.preferences}</p>
                )}
              </div>
              
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  required
                />
                <label htmlFor="privacy" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  I agree to the <a href="#" className="text-primary hover:underline">privacy policy</a> and consent to receiving email updates
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-primary px-4 py-3 text-center font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}
          
          <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-4">Other ways to listen</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a 
                href="#" 
                className="flex flex-col items-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 50 50" fill="currentColor" className="text-[#8e44ad] mb-2">
                  <path d="M25 0a25 25 0 1 0 0 50 25 25 0 0 0 0-50zm3.1 41.4c0 1.9-1.5 3.5-3.5 3.5h-.3c-1.9 0-3.5-1.5-3.5-3.5h-.2V22.2H8.3c0-1.9 1.5-3.5 3.5-3.5h9.9s2.5-7.5 3-8.8c.5-1.3 1.9-1.9 3.1-1.9s2.5.8 2.5 2c0 1.3-3.3 11.1-3.3 11.1h14.4c1.9 0 3.5 1.5 3.5 3.5l-16.8 16.8z"></path>
                </svg>
                <span className="text-sm font-medium">Apple Podcasts</span>
              </a>
              <a 
                href="#" 
                className="flex flex-col items-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" className="text-[#4285F4] mb-2">
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                  <path d="M8 16l8-4-8-4z"></path>
                </svg>
                <span className="text-sm font-medium">Google Podcasts</span>
              </a>
              <a 
                href="#" 
                className="flex flex-col items-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" className="text-[#1ED760] mb-2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9 16V8l8 4-8 4z" fill="white"></path>
                </svg>
                <span className="text-sm font-medium">Spotify</span>
              </a>
              <a 
                href="#" 
                className="flex flex-col items-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" className="text-[#FF8800] mb-2">
                  <path d="M6.18 15.64A2.18 2.18 0 013 17.82 2.18 2.18 0 116.18 15.64z"></path>
                  <path d="M5.59 12.23c.33 0 .59-.26.59-.59 0-4.42 3.59-8.03 8.03-8.03.33 0 .59-.26.59-.59 0-.33-.26-.59-.59-.59C9.16 2.41 5 6.59 5 12.23c0 .33.26.59.59.59z"></path>
                  <path d="M5.59 8.23c.33 0 .59-.26.59-.59 0-2.13 1.73-3.87 3.87-3.87.33 0 .59-.26.59-.59 0-.33-.26-.59-.59-.59A5.06 5.06 0 5 8.23c0 .33.26.59.59.59z"></path>
                </svg>
                <span className="text-sm font-medium">RSS Feed</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
