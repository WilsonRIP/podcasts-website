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
    coverImage: "/categories/music.jpg",
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
    coverImage: "/categories/fitness.jpg",
    featuredPodcasts: ["huberman-lab", "mind-pump", "rich-roll"]
  },
  {
    id: "photography",
    name: "Photography",
    description: "Podcasts about photography techniques, gear, and industry insights",
    icon: "/icons/photography.svg",
    coverImage: "/categories/photography.jpg",
    featuredPodcasts: ["b-and-h", "petapixel", "candid"]
  }
];

// Sample podcast data organized by interests
export const podcasts: Podcast[] = [
  {
    id: "syntax",
    title: "Syntax - Tasty Web Development Treats",
    creator: "Wes Bos & Scott Tolinski",
    description: "A podcast for web developers interested in building great websites, apps, and staying up to date with the latest trends.",
    coverImage: "/podcasts/syntax.jpg",
    categories: ["technology"],
    featured: true,
    rating: 4.8,
    listenCount: 582000,
    podcastUrl: {
      spotify: "https://open.spotify.com/show/4kYCRYJ3yK5DQbP5tbfZby",
      apple: "https://podcasts.apple.com/us/podcast/syntax-tasty-web-development-treats/id1253186678"
    }
  },
  {
    id: "changelog",
    title: "The Changelog",
    creator: "Changelog Media",
    description: "News and podcasts for developers featuring conversations about software development, open source, careers, and more.",
    coverImage: "/podcasts/changelog.jpg",
    categories: ["technology"],
    rating: 4.7,
    podcastUrl: {
      spotify: "https://open.spotify.com/show/5bBki72YeKSLUqyD94qsuJ",
      apple: "https://podcasts.apple.com/us/podcast/the-changelog/id341623264"
    }
  },
  {
    id: "darknetdiaries",
    title: "Darknet Diaries",
    creator: "Jack Rhysider",
    description: "True stories from the dark side of the Internet exploring hacking, data breaches, and cybercrime.",
    coverImage: "/podcasts/darknet-diaries.jpg",
    categories: ["technology"],
    featured: true,
    rating: 4.9,
    listenCount: 890000,
    podcastUrl: {
      spotify: "https://open.spotify.com/show/4XPl3uEEL9hvqMkoZrzbx5",
      apple: "https://podcasts.apple.com/us/podcast/darknet-diaries/id1296350485"
    }
  },
  {
    id: "ologies",
    title: "Ologies",
    creator: "Alie Ward",
    description: "A comedic science podcast where Ward interviews experts in various scientific fields ending with -ology.",
    coverImage: "/podcasts/ologies.jpg",
    categories: ["science"],
    featured: true,
    rating: 4.9,
    listenCount: 750000,
    podcastUrl: {
      spotify: "https://open.spotify.com/show/5nvRkVMH58SelKZYZFZx1S",
      apple: "https://podcasts.apple.com/us/podcast/ologies-with-alie-ward/id1278815517"
    }
  },
  {
    id: "radiolab",
    title: "Radiolab",
    creator: "WNYC Studios",
    description: "An investigation told through sounds and stories, weaving science, philosophy, and human experience.",
    coverImage: "/podcasts/radiolab.jpg",
    categories: ["science"],
    rating: 4.8,
    listenCount: 1250000,
    podcastUrl: {
      spotify: "https://open.spotify.com/show/2hmkzUtix0qTqOKtDdDpIQ",
      apple: "https://podcasts.apple.com/us/podcast/radiolab/id152249110"
    }
  },
  {
    id: "sciencevs",
    title: "Science Vs",
    creator: "Gimlet Media",
    description: "Takes on fads, trends, and the opinionated mob to find out what's fact, what's not, and what's somewhere in between.",
    coverImage: "/podcasts/science-vs.jpg",
    categories: ["science"],
    rating: 4.6,
    podcastUrl: {
      spotify: "https://open.spotify.com/show/5lY4b5PGOvMuOYOjOVEcb9",
      apple: "https://podcasts.apple.com/us/podcast/science-vs/id1051557000"
    }
  },
  {
    id: "triple-click",
    title: "Triple Click",
    creator: "Maximum Fun",
    description: "Three gaming experts share the latest news, experiences, and deep thoughts on video games and the culture around them.",
    coverImage: "/podcasts/triple-click.jpg",
    categories: ["gaming"],
    featured: true,
    rating: 4.7,
    listenCount: 320000,
    podcastUrl: {
      spotify: "https://open.spotify.com/show/68L8hAksNoNxl71KQmG73d",
      apple: "https://podcasts.apple.com/us/podcast/triple-click/id1507834679"
    }
  },
  {
    id: "spawn-on-me",
    title: "Spawn On Me",
    creator: "Kahlief Adams",
    description: "A podcast focusing on video games and culture, with a particular emphasis on people of color in the gaming community.",
    coverImage: "/podcasts/spawn-on-me.jpg",
    categories: ["gaming"],
    rating: 4.5,
    podcastUrl: {
      spotify: "https://open.spotify.com/show/3KsVXPQlx9RCynRjQaR29Y",
      apple: "https://podcasts.apple.com/us/podcast/spawn-on-me-with-kahlief-adams/id810062981"
    }
  },
  {
    id: "checkpoint",
    title: "Checkpoint",
    creator: "ABC",
    description: "Gaming, culture and industry insights from Australia's public broadcaster, exploring the impact of video games on our lives.",
    coverImage: "/podcasts/checkpoint.jpg",
    categories: ["gaming"],
    rating: 4.4,
    podcastUrl: {
      spotify: "https://open.spotify.com/show/3NJqofGvZS4GiMJhPEYOSx",
      apple: "https://podcasts.apple.com/au/podcast/checkpoint/id1038130956"
    }
  },
  {
    id: "songexploder",
    title: "Song Exploder",
    creator: "Hrishikesh Hirway",
    description: "Musicians take apart their songs, and piece by piece, tell the story of how they were made.",
    coverImage: "/podcasts/song-exploder.jpg",
    categories: ["music"],
    featured: true,
    rating: 4.9,
    listenCount: 680000,
    podcastUrl: {
      spotify: "https://open.spotify.com/show/10lMwGjvNLxzhOOOMRnnAC",
      apple: "https://podcasts.apple.com/us/podcast/song-exploder/id788236947"
    }
  },
  {
    id: "switchedonpop",
    title: "Switched on Pop",
    creator: "Vox Media",
    description: "A podcast about the making and meaning of popular music, breaking down pop songs to figure out what makes them catchy.",
    coverImage: "/podcasts/switched-on-pop.jpg",
    categories: ["music"],
    rating: 4.6,
    podcastUrl: {
      spotify: "https://open.spotify.com/show/1sgUbYVQ5rScS0XRMgw0ME",
      apple: "https://podcasts.apple.com/us/podcast/switched-on-pop/id934552872"
    }
  },
  {
    id: "dissect",
    title: "Dissect",
    creator: "Spotify Studios",
    description: "A musical analysis podcast that examines an album, one song per episode, breaking down the music and lyrics.",
    coverImage: "/podcasts/dissect.jpg",
    categories: ["music"],
    rating: 4.8,
    listenCount: 550000,
    podcastUrl: {
      spotify: "https://open.spotify.com/show/2b025hq3gJ17tQdxS3aV43",
      apple: "https://podcasts.apple.com/us/podcast/dissect/id1143845868"
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