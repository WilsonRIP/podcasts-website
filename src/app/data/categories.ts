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
  },
  {
    id: "startalk-radio",
    title: "StarTalk Radio",
    creator: "Neil deGrasse Tyson",
    description: "Hosted by renowned astrophysicist Neil deGrasse Tyson, StarTalk Radio explores the intersections of science, pop culture, comedy, and more. The podcast features interviews with scientists, celebrities, and other notable guests, making complex scientific concepts accessible and entertaining.",
    coverImage: "/podcasts/www.startalkradio.png", // Placeholder
    categories: ["science"],
    rating: 4.7 // Placeholder/Example
  },
  {
    id: "hidden-brain",
    title: "Hidden Brain",
    creator: "Shankar Vedantam",
    description: "A popular podcast exploring human behavior, psychology, and the unconscious patterns that drive our decisions. Hosted by Shankar Vedantam, this show consistently ranks high across multiple platforms, with episodes averaging 41 minutes in length.",
    coverImage: "/podcasts/hidden-brain-podcast.png", // Placeholder
    categories: ["science"],
    rating: 4.8 // Placeholder/Example
  },
  {
    id: "huberman-lab",
    title: "Huberman Lab",
    creator: "Dr. Andrew Huberman",
    description: "Hosted by Dr. Andrew Huberman, this podcast focuses on neuroscience and practical applications of brain research. Episodes are typically longer format (averaging 124 minutes), offering in-depth exploration of topics related to the brain, behavior, and health optimization.",
    coverImage: "/podcasts/huberman-lab-podcast.png", // Placeholder
    categories: ["science", "fitness"],
    rating: 4.9 // Placeholder/Example
  },
  {
    id: "radiolab",
    title: "Radiolab",
    creator: "WNYC Studios",
    description: "A long-running and highly regarded science podcast known for its innovative sound design and storytelling approach. Episodes average 44 minutes and cover a wide range of scientific topics with a unique narrative style that blends interviews, music, and sound effects.",
    coverImage: "/podcasts/radiolab.png", // Placeholder
    categories: ["science"],
    rating: 4.7 // Placeholder/Example
  },
  {
    id: "science-friday",
    title: "Science Friday",
    creator: "Ira Flatow / WNYC Studios",
    description: "A weekly science talk show and podcast hosted by Ira Flatow that covers the latest developments in science, technology, and other fields. It's described as a \"haven for inquisitive geeks and curious laypeople alike\".",
    coverImage: "/podcasts/science-friday.png", // Placeholder
    categories: ["science"],
    rating: 4.6 // Placeholder/Example
  },
  {
    id: "the-naked-scientists",
    title: "The Naked Scientists",
    creator: "Dr. Chris Smith",
    description: "Hosted by Dr. Chris Smith, this flagship science show includes the latest science news, interviews with top scientists, hands-on experiments, and answers to listener questions. Episodes average 34 minutes and cover a broad range of scientific fields with a 4.6/5 Apple rating.",
    coverImage: "/podcasts/nakedscientists-podcast.png", // Placeholder
    categories: ["science"],
    rating: 4.6 // From text
  },
  {
    id: "science-magazine-podcast",
    title: "Science Magazine Podcast",
    creator: "Sarah Crespi / Science Magazine",
    description: "Hosted by Sarah Crespi, this weekly podcast from Science Magazine features discussions on breakthrough research and interviews with leading scientists. Episodes average 37 minutes and provide insights into cutting-edge scientific developments across various disciplines.",
    coverImage: "/podcasts/sciencemagazine-podcast.png", // Placeholder
    categories: ["science"],
    rating: 4.5 // Placeholder/Example
  },
  {
    id: "this-week-in-science",
    title: "This Week in Science",
    creator: "Dr. Kirsten Sanford, Justin Jackson, Blair Bazdarich",
    description: "Nicknamed \"The Kickass Science Podcast,\" this show presents a humorous look at the week's developments in science and technology. Hosted by Dr. Kirsten Sanford (neuroscientist), Justin Jackson, and Blair Bazdarich (zoologist), episodes average 106 minutes with an Apple rating of 4.1/5.",
    coverImage: "/podcasts/thisweekinscience-podcast.png", // Placeholder
    categories: ["science"],
    rating: 4.1 // From text
  },
  {
    id: "science-vs",
    title: "Science Vs",
    creator: "Wendy Zukerman / Spotify",
    description: "Hosted by Wendy Zukerman, this Spotify podcast separates scientific fact from fiction by investigating popular trends, fads, and scientific claims. Topics range from 5G and pandemics to vaping and fasting diets, with episodes averaging 45 minutes and an Apple rating of 4.4/5.",
    coverImage: "/podcasts/000_22_Best_Science_Podcasts_That_Will_Boost_Your_Curi.jpg", // Placeholder
    categories: ["science"],
    rating: 4.4 // From text
  },
  {
    id: "the-infinite-monkey-cage",
    title: "The Infinite Monkey Cage",
    creator: "Prof. Brian Cox, Robin Ince / BBC",
    description: "Hosted by Professor Brian Cox and comedian Robin Ince, this BBC podcast offers a witty and irreverent look at science. The show features scientists, experts, and celebrities examining scientific topics with humor and insight, with episodes averaging 40 minutes and an Apple rating of 4.7/5.",
    coverImage: "/podcasts/000_The_Infinite_Monkey_Cage___Listen_on_Podurama_podc.jpg", // Placeholder
    categories: ["science"],
    rating: 4.7 // From text
  },
  {
    id: "short-wave",
    title: "Short Wave",
    creator: "NPR",
    description: "Produced by NPR, this daily science podcast delivers bite-sized science news and stories in approximately 13-minute episodes. It's perfect for those looking for quick science updates and explanations of current scientific developments.",
    coverImage: "/podcasts/002_Short_Wave_podcast__Meet_the_Short_Wave_team.___NP.jpg", // Placeholder
    categories: ["science"],
    rating: 4.6 // Placeholder/Example
  },
  {
    id: "nature-podcast",
    title: "Nature Podcast",
    creator: "Nature",
    description: "This podcast brings listeners the best stories from the science world each week, covering topics from astronomy to zoology and highlighting research from Nature journal. Episodes average 24 minutes and feature interviews with scientists and analysis from Nature's journalists and editors.",
    coverImage: "/podcasts/002__Nature_Podcast_on_Apple_Podcasts.png", // Placeholder
    categories: ["science"],
    rating: 4.5 // Placeholder/Example
  },
  {
    id: "scishow-tangents",
    title: "SciShow Tangents",
    creator: "Complexly",
    description: "A science podcast that explores various scientific topics with a conversational and often humorous approach. Episodes average 38 minutes and often take unexpected tangents into fascinating scientific territory.",
    coverImage: "/podcasts/000_New_From_WNYC_Studios___SciShow_Tangents_Podcast_-.jpg", // Placeholder
    categories: ["science"],
    rating: 4.7 // Placeholder/Example
  },
  {
    id: "brain-science",
    title: "Brain Science with Ginger Campbell",
    creator: "Dr. Ginger Campbell",
    description: "Hosted by neurologist Dr. Ginger Campbell, this podcast explores the latest discoveries in neuroscience. It features conversations with top neuroscientists, doctors, and researchers, making complex brain science accessible to general audiences.",
    coverImage: "/podcasts/001__Brain_Science_with_Ginger_Campbell__MD__Neuroscie.png", // Placeholder
    categories: ["science"],
    rating: 4.8 // Placeholder/Example
  },
  {
    id: "crowdscience",
    title: "CrowdScience",
    creator: "BBC World Service",
    description: "Produced by BBC World Service, this podcast answers listener questions about life, Earth, and the universe by consulting researchers at the frontiers of knowledge. It has a perfect 5/5 Apple rating with episodes averaging 28 minutes.",
    coverImage: "/podcasts/000_CrowdScience__podcast__-_BBC_World_Service___Liste.jpg", // Placeholder
    categories: ["science"],
    rating: 5.0 // From text
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