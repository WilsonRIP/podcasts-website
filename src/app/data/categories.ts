export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  coverImage: string;
  featuredPodcasts?: string[]; // Array of podcast IDs
}

export interface Podcast {
  id: string;
  title: string;
  creator: string;
  description: string;
  coverImage: string;
  categories: string[]; // Array of category IDs
  featured?: boolean;
  rating?: number; // Out of 5
  listenCount?: number;
  websiteUrl?: string;
  podcastUrl?: {
    spotify?: string;
    apple?: string;
    google?: string;
    overcast?: string;
    other?: { name: string; url: string }[];
  };
}

// Categories based on different interests and hobbies
export const categories: Category[] = [
  {
    id: "technology",
    name: "Technology",
    description: "Podcasts about software, hardware, AI, and the future of tech",
    icon: "/icons/icons8-technology-48.png",
    coverImage: "/categories/019_Why_Is_Technology_Important_-_The_Techs_Storm.png",
    featuredPodcasts: ["syntax", "changelog", "darknetdiaries"]
  },
  {
    id: "science",
    name: "Science",
    description: "Podcasts about discoveries, research, and scientific developments",
    icon: "/icons/icons8-experiment-64.png",
    coverImage: "/categories/017_Faculty_of_Science_-_University_of_Johannesburg.jpg",
    featuredPodcasts: ["ologies", "radiolab", "sciencevs"]
  },
  {
    id: "gaming",
    name: "Gaming",
    description: "Podcasts about video games, esports, game development, and gaming culture",
    icon: "/icons/icons8-nintendo-gamecube-64.png",
    coverImage: "/categories/018_The_Reason_Why_Gaming_Is_Growing_As_a_Favourite_Pa.jpg",
    featuredPodcasts: ["triple-click", "spawn-on-me", "checkpoint"]
  },
  {
    id: "music",
    name: "Music",
    description: "Podcasts about music production, artist interviews, and music history",
    icon: "/icons/music.svg",
    coverImage: "/categories/music.png",
    featuredPodcasts: ["switchedonpop", "songexploder", "dissect"]
  },
  {
    id: "art-design",
    name: "Art & Design",
    description: "Podcasts about creative processes, design thinking, and visual arts",
    icon: "/icons/icons8-art-48.png",
    coverImage: "/categories/art-design.png",
    featuredPodcasts: ["designmatters", "99pi", "creative-pep-talk"]
  },
  {
    id: "cooking",
    name: "Cooking & Food",
    description: "Podcasts about culinary arts, recipes, food history, and food culture",
    icon: "/icons/cooking.png",
    coverImage: "/categories/cooking.jpg",
    featuredPodcasts: ["splendid-table", "food52", "milk-street"]
  },
  {
    id: "fitness",
    name: "Fitness & Health",
    description: "Podcasts about exercise, nutrition, wellness, and athletic performance",
    icon: "/icons/fitness.svg",
    coverImage: "/categories/fitness-health.png",
    featuredPodcasts: ["huberman-lab", "mind-pump", "rich-roll"]
  },
  {
    id: "photography",
    name: "Photography",
    description: "Podcasts about photography techniques, gear, and industry insights",
    icon: "/icons/photography.svg",
    coverImage: "/categories/photography.png",
    featuredPodcasts: ["b-and-h", "petapixel", "candid"]
  }
];

// Sample podcast data organized by interests
export const podcasts: Podcast[] = [

  {
    id: "the-vergecast",
    title: "The Vergecast",
    creator: "The Verge (Nilay Patel, David Pierce, Alex Cranz)",
    description: "Flagship podcast focusing on technology news, gadgets, and the broader tech industry. Features in-depth discussions and interviews.",
    coverImage: "/podcasts/vergecast.png", // Placeholder - Needs actual image path
    categories: ["technology"],
    featured: true,
    rating: 4.7, // Example rating
    podcastUrl: {
      spotify: "https://open.spotify.com/show/08zQP2peZmM9GrcKShLZvC", // From perplexity data
      apple: "https://podcasts.apple.com/us/podcast/the-vergecast/id430333725" // From perplexity data
    }
  },
  {
    id: "waveform-mkbhd",
    title: "Waveform: The MKBHD Podcast",
    creator: "Marques Brownlee, Andrew Manganelli, David Imel",
    description: "Covers consumer electronics news, product reviews, and behind-the-scenes discussions about MKBHD's YouTube videos.",
    coverImage: "/podcasts/waveform.png", // Placeholder - Needs actual image path
    categories: ["technology"],
    featured: true,
    rating: 4.8, // Example rating
    podcastUrl: {
      spotify: "https://open.spotify.com/show/6o81QuW22s5m2nfcXWjucc", // Needs actual Spotify URL
      apple: "https://podcasts.apple.com/us/podcast/waveform-the-mkbhd-podcast/id1474429475" // From perplexity data
    }
  },
  {
    id: "the-wan-show",
    title: "The WAN Show",
    creator: "Linus Tech Tips (Linus Sebastian, Luke Lafreniere)",
    description: "Weekly tech news podcast covering trends, product launches, controversies, and behind-the-scenes stories from LTT.",
    coverImage: "/podcasts/the-wan-show.png", // Placeholder - Needs actual image path
    categories: ["technology"],
    featured: true,
    rating: 4.6, // Example rating
    podcastUrl: {
      spotify: "https://open.spotify.com/show/08zQP2peZmM9GrcKShLZvC", // From perplexity data
      apple: "https://podcasts.apple.com/us/podcast/the-wan-show/id1062997995" // From perplexity data
    }
  }
];

export function getPodcastsByCategory(categoryId: string): Podcast[] {
  return podcasts.filter(podcast => podcast.categories.includes(categoryId));
}

export function getFeaturedPodcasts(): Podcast[] {
  return podcasts.filter(podcast => podcast.featured);
}

export function getPopularPodcasts(limit: number = 10): Podcast[] {
  return [...podcasts]
    .sort((a, b) => (b.listenCount || 0) - (a.listenCount || 0))
    .slice(0, limit);
}

export function getPodcastById(id: string): Podcast | undefined {
  return podcasts.find(podcast => podcast.id === id);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(category => category.id === id);
} 