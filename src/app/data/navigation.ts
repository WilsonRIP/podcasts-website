// src/data/navigation.ts

export interface NavigationLink {
  name: string;
  url: string;
  isExternal?: boolean;
}

export interface NavigationGroup {
  title: string;
  links: NavigationLink[];
}

// Main navigation links used in both navbar and footer
export const mainNavLinks: NavigationLink[] = [
  { name: "Home", url: "/" },
  { name: "Explore", url: "/explore" },
  { name: "Categories", url: "/categories" },
  { name: "Popular", url: "/popular" },
];

// Additional links for footer only
export const resourceLinks: NavigationLink[] = [
  { name: "About", url: "/about" },
  { name: "Submit Podcast", url: "/submit" },
  { name: "Privacy Policy", url: "/privacy" },
  { name: "Terms of Service", url: "/terms" },
];

// Category quick links for footer
export const categoryLinks: NavigationLink[] = [
  { name: "Technology", url: "/categories/technology" },
  { name: "Science", url: "/categories/science" },
  { name: "Gaming", url: "/categories/gaming" },
  { name: "Music", url: "/categories/music" },
  { name: "Art & Design", url: "/categories/art-design" },
  { name: "Cooking & Food", url: "/categories/cooking" },
  { name: "Fitness & Health", url: "/categories/fitness" },
  { name: "Photography", url: "/categories/photography" },
];

// Organized footer link groups
export const footerLinkGroups: NavigationGroup[] = [
  {
    title: "Navigation",
    links: mainNavLinks,
  },
  {
    title: "Categories",
    links: categoryLinks,
  },
  {
    title: "Resources",
    links: resourceLinks,
  },
];
