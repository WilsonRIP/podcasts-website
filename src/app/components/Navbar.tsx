"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Crimson_Text } from "next/font/google";
import { useState, useEffect } from "react";
import { useThemeManager } from "../../lib/hooks/useThemeManager";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import { Button } from "../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "../components/ui/sheet";
import { Menu, Search } from "lucide-react";
import { cn } from "../../lib/utils";
import { mainNavLinks } from "../data/navigation";

const crimsonText = Crimson_Text({
  weight: "400",
  subsets: ["latin"],
});

const navLinks = mainNavLinks;

const WEBSITE_NAME = "PodFinder";

export default function Navbar() {
  const pathname = usePathname();
  const { isDark, mounted } = useThemeManager();
  const [isMobile, setIsMobile] = useState(false);
  const [isCompactView, setIsCompactView] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Theme detection handled by useThemeManager

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsCompactView(window.innerWidth < 1024);
    };

    // Initial check
    checkScreenSize();

    // Add resize event listener
    window.addEventListener("resize", checkScreenSize);

    // Clean up
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Add scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent hydration mismatch by rendering a placeholder until client-side
  if (!mounted) {
    return (
      <header
        className={cn(
          crimsonText.className,
          "sticky top-0 z-50 h-16 md:h-[68px] backdrop-blur-lg"
        )}
      >
        <div className="container mx-auto flex items-center px-4 md:px-6 h-full"></div>
      </header>
    );
  }

  return (
    <header
      className={cn(
        crimsonText.className,
        "sticky top-0 z-50 backdrop-blur-lg transition-all duration-300 ease-in-out",
        isScrolled ? "py-2 shadow-xl" : "py-3 shadow-lg",
        isDark
          ? "bg-gray-900/95 text-white border-b border-gray-800 shadow-gray-900/50"
          : "bg-white/95 text-gray-800 border-b border-gray-200 shadow-gray-300/20"
      )}
    >
      <div className="container mx-auto flex items-center h-10 md:h-12 px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center text-xl md:text-2xl font-semibold tracking-wide mr-auto md:mr-8 group"
        >
          <span
            className={cn(
              "font-bold text-2xl",
              isDark 
                ? "text-white" 
                : "text-gray-900"
            )}
          >
            {WEBSITE_NAME}
          </span>
        </Link>

        {/* Search Toggle */}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className={`mr-2 hover:bg-opacity-20 ${isDark ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setShowSearch(!showSearch)}
            aria-label="Toggle search"
          >
            <Search className="h-5 w-5" />
          </Button>
        )}

        {/* Desktop Navigation - Use NavigationMenu */}
        {!isMobile && (
          <NavigationMenu className="md:flex flex-grow justify-center">
            <NavigationMenuList className="flex flex-wrap gap-x-1 lg:gap-x-2">
              {navLinks.map(({ url, name }) => {
                const isActive = pathname === url || 
                  (url !== "/" && pathname?.startsWith(url));
                return (
                  <NavigationMenuItem key={url}>
                    <Link
                      href={url}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "font-medium whitespace-nowrap relative group transition-colors duration-200 ease-in-out",
                        isActive
                          ? isDark 
                            ? "text-gray-100 bg-primary/20" 
                            : "text-primary bg-primary/10"
                          : isDark
                            ? "text-gray-200 hover:text-gray-100 hover:bg-primary/10"
                            : "text-gray-800 hover:text-primary hover:bg-primary/10"
                      )}
                      data-state={isActive ? "active" : "inactive"}
                    >
                      {name}
                      <span
                        className={cn(
                          "absolute left-0 -bottom-[1px] h-0.5 w-full rounded bg-primary",
                          "transform origin-left scale-x-0 transition-transform duration-300 ease-out",
                          "group-hover:scale-x-100",
                          isActive && "scale-x-100"
                        )}
                      />
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        )}

        {/* Theme Toggle */}
        {!isMobile && (
          <div className="ml-auto pl-4">
            <ThemeToggle aria-label="Toggle theme" />
          </div>
        )}

        {/* Mobile Content (Theme Toggle + Menu Button) */}
        {isMobile && (
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="ghost"
              size="icon"
              className={`mr-2 hover:bg-opacity-20 ${isDark ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Toggle search"
            >
              <Search className="h-5 w-5" />
            </Button>
            <ThemeToggle aria-label="Toggle theme" />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`z-50 hover:bg-opacity-20 ${isDark ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}`}
                  aria-label="Toggle Menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className={cn(
                  "w-3/4 sm:w-1/2 backdrop-blur-md shadow-lg border-r",
                  isDark
                    ? "bg-slate-900/95 border-slate-700"
                    : "bg-background/95 border-slate-200"
                )}
              >
                <SheetHeader className="pb-6">
                  <SheetTitle className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {WEBSITE_NAME}
                  </SheetTitle>
                </SheetHeader>
                <div className="py-6">
                  <nav className="flex flex-col gap-4">
                    {navLinks.map(({ url, name }) => {
                      const isActive = pathname === url || 
                        (url !== "/" && pathname?.startsWith(url));
                      return (
                        <Link
                          key={url}
                          href={url}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200",
                            isActive
                              ? isDark
                                ? "bg-primary/20 text-gray-100 font-medium"
                                : "bg-primary/10 text-primary font-medium"
                              : isDark 
                                ? "text-gray-200 hover:bg-gray-800" 
                                : "text-gray-800 hover:bg-gray-100"
                          )}
                        >
                          {name}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>
      
      {/* Expandable search bar */}
      {showSearch && (
        <div className="container mx-auto px-4 py-3 border-t border-gray-200 dark:border-gray-800">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for podcasts, topics, or creators..."
              className={`w-full px-4 py-2 rounded-full border border-transparent focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}
            />
            <Button
              variant="ghost"
              size="icon"
              className={`absolute right-2 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
