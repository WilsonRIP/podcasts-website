export interface Episode {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  coverImage: string;
  audioUrl: string;
  duration: string; // Format: "HH:MM:SS"
  publishDate: string; // ISO date string
  hosts: string[];
  guests?: string[];
  tags?: string[];
  transcript?: string;
  isFeatured?: boolean;
  season?: number;
  episode?: number;
}

// Sample podcast episodes data
export const episodes: Episode[] = [
  {
    id: "ep001",
    title: "Getting Started with Podcasting",
    description: "Learn the basics of starting your own podcast with our comprehensive guide.",
    longDescription: "In this inaugural episode, we dive deep into the world of podcasting. From selecting the right equipment to developing your unique voice, we cover everything you need to know to launch a successful podcast. We discuss microphone options, recording software, hosting platforms, and strategies for growing your audience from day one.",
    coverImage: "/episodes/ep001-cover.jpg",
    audioUrl: "https://example.com/episodes/ep001.mp3",
    duration: "00:45:30",
    publishDate: "2025-01-01T08:00:00Z",
    hosts: ["John Smith", "Jane Doe"],
    guests: ["Mike Johnson - Podcast Producer"],
    tags: ["Podcasting", "Beginners", "Equipment", "Growth"],
    isFeatured: true,
    season: 1,
    episode: 1
  },
  {
    id: "ep002",
    title: "Building a Loyal Podcast Audience",
    description: "Strategies and tactics for growing and maintaining your podcast listener base.",
    longDescription: "Building a loyal podcast audience takes more than just great content. In this episode, we explore proven strategies for audience growth, from social media promotion to cross-podcast collaboration. Learn how to leverage analytics to understand your listeners better and create content that keeps them coming back for more.",
    coverImage: "/episodes/ep002-cover.jpg",
    audioUrl: "https://example.com/episodes/ep002.mp3",
    duration: "00:38:45",
    publishDate: "2025-01-08T08:00:00Z",
    hosts: ["John Smith", "Jane Doe"],
    guests: ["Sarah Williams - Marketing Expert"],
    tags: ["Marketing", "Growth", "Analytics", "Social Media"],
    isFeatured: false,
    season: 1,
    episode: 2
  },
  {
    id: "ep003",
    title: "Monetizing Your Podcast",
    description: "Explore different revenue streams for your podcast and how to implement them.",
    longDescription: "Ready to turn your podcast into a revenue-generating machine? In this episode, we break down various monetization methods, from sponsorships and advertising to premium content and merchandise. We discuss how to price your offerings, approach potential sponsors, and create additional value for your most dedicated listeners.",
    coverImage: "/episodes/ep003-cover.jpg",
    audioUrl: "https://example.com/episodes/ep003.mp3",
    duration: "00:52:15",
    publishDate: "2025-01-15T08:00:00Z",
    hosts: ["John Smith", "Jane Doe"],
    guests: ["Alex Chen - Podcast Monetization Consultant"],
    tags: ["Monetization", "Sponsorships", "Business", "Premium Content"],
    isFeatured: true,
    season: 1,
    episode: 3
  },
  {
    id: "ep004",
    title: "Advanced Audio Production Techniques",
    description: "Take your podcast sound quality to the next level with these professional tips.",
    longDescription: "Good audio quality can make or break your podcast. In this technical deep dive, we explore advanced production techniques that will elevate your podcast's sound. From proper microphone techniques to EQ, compression, and noise reduction, you'll learn how to achieve that professional sound even on a modest budget.",
    coverImage: "/episodes/ep004-cover.jpg",
    audioUrl: "https://example.com/episodes/ep004.mp3",
    duration: "01:05:22",
    publishDate: "2025-01-22T08:00:00Z",
    hosts: ["John Smith", "Jane Doe"],
    guests: ["David Lee - Audio Engineer"],
    tags: ["Audio", "Production", "Technical", "Equipment"],
    isFeatured: false,
    season: 1,
    episode: 4
  },
  {
    id: "ep005",
    title: "The Future of Podcasting",
    description: "Exploring emerging trends and technologies shaping the future of podcasts.",
    longDescription: "What does the future hold for podcasting? In this forward-looking episode, we discuss emerging technologies, platform changes, and audience trends that are reshaping the podcasting landscape. From AI-enhanced production to interactive episodes and the impact of video podcasting, we explore what creators need to know to stay ahead of the curve.",
    coverImage: "/episodes/ep005-cover.jpg",
    audioUrl: "https://example.com/episodes/ep005.mp3",
    duration: "00:48:36",
    publishDate: "2025-01-29T08:00:00Z",
    hosts: ["John Smith", "Jane Doe"],
    guests: ["Emma Rodriguez - Media Futurist"],
    tags: ["Future", "Technology", "Trends", "Innovation"],
    isFeatured: true,
    season: 1,
    episode: 5
  }
];
