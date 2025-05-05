"use client";

import { Mulish } from "next/font/google";
import { useState, useEffect, memo } from "react";
import { socialLinks, SocialLink } from "../data/socials";
import { footerLinkGroups } from "../data/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import { useTheme } from "next-themes";

const mulish = Mulish({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const WEBSITE_NAME = "PodFinder";
const WEBSITE_DESCRIPTION = 
  "Discover podcasts that match your passions and interests. From technology to food, gaming to fitness - find your next favorite show.";

// Memoized Footer component for better performance
const Footer = memo(function Footer() {
  const { resolvedTheme } = useTheme();
  const [currentYear] = useState(new Date().getFullYear());
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  
  // Only render component after mounting on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const isDark = resolvedTheme === 'dark';
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the newsletter submission
    console.log("Subscribing email:", email);
    alert("Thanks for subscribing! We'll send you podcast recommendations soon.");
    setEmail("");
  };
  
  // Prevent hydration mismatch by rendering a placeholder until client-side
  if (!mounted) {
    return (
      <footer className={`${mulish.className} py-16`}>
        <div className="container mx-auto px-6 md:px-8">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-8"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full max-w-md mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 max-w-md"></div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <footer className={`${mulish.className} border-t ${isDark ? 'bg-gray-950 border-gray-800 text-white' : 'bg-white border-gray-200 text-gray-800'} py-16 transition-colors duration-300`}>
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Column 1 - Website Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:col-span-1"
            >
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70 mb-4">
                {WEBSITE_NAME}
              </h2>
              <p className={`text-sm max-w-md transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                {WEBSITE_DESCRIPTION}
              </p>

              {/* Social Media */}
              <div className="flex flex-wrap gap-4 pt-2">
                {socialLinks.map((social: SocialLink) => (
                  <a
                    key={social.name}
                    href={social.url}
                    aria-label={social.name}
                    className="relative group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.div
                      className={`w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-primary transition-all duration-300 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src={social.icon}
                        alt={social.name}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    </motion.div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Navigation Columns */}
            {footerLinkGroups.map((group, index) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className="space-y-4"
              >
                <h3 className="font-bold text-lg">{group.title}</h3>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.url}>
                      <Link 
                        href={link.url}
                        className={`text-sm transition-colors duration-200 ${
                          isDark 
                            ? 'text-gray-400 hover:text-primary' 
                            : 'text-gray-600 hover:text-primary'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Newsletter Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-4 md:col-span-1"
            >
              <h3 className="font-bold text-lg">Get Podcast Recommendations</h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Subscribe to our newsletter and discover new podcasts
              </p>
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`flex-1 px-4 py-2 rounded-md text-gray-900 ${
                      isDark 
                        ? 'bg-gray-800 border-gray-700 focus:border-primary' 
                        : 'bg-gray-100 border-gray-200 focus:border-primary'
                    } border focus:ring-1 focus:ring-primary`}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Bottom Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className={`mt-12 pt-6 border-t text-center text-sm transition-colors duration-300 ${
              isDark 
                ? 'border-gray-800 text-gray-500' 
                : 'border-gray-200 text-gray-500'
            }`}
          >
            &copy; {currentYear} {WEBSITE_NAME}. All rights reserved.
          </motion.div>
        </div>
      </footer>
    </LazyMotion>
  );
});

export default Footer;
