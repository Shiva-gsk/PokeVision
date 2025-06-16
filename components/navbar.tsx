"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Camera, Home, List, Trophy, User, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile" // Adjust path as needed

export function Navbar() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const navItems = [
    { href: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
    { href: "/capture", label: "Capture", icon: <Camera className="h-5 w-5" /> },
    { href: "/pokedex", label: "Pokédex", icon: <List className="h-5 w-5" /> },
    { href: "/leaderboard", label: "Leaderboard", icon: <Trophy className="h-5 w-5" /> },
    { href: "/profile", label: "Profile", icon: <User className="h-5 w-5" /> },
  ]

  // Handle mobile state changes and close menu when switching to desktop
  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsTransitioning(true)
      setIsMenuOpen(false)
      // Clear transition state after animation completes
      const timer = setTimeout(() => setIsTransitioning(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isMobile, isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 sm:h-16 items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gradient-pokemon">PokéVision</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={cn(
          "flex items-center space-x-1 sm:space-x-2 lg:space-x-4 mx-auto transition-opacity duration-200",
          isMobile ? "hidden" : "flex"
        )}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "flex flex-col h-auto py-1 sm:py-2 px-2 sm:px-3",
                  pathname === item.href ? "bg-muted font-medium" : "font-normal",
                )}
              >
                <span className="flex items-center justify-center mb-1">{item.icon}</span>
                <span className="text-xs">{item.label}</span>
              </Button>
            </Link>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="ml-auto flex items-center space-x-2">
          <ModeToggle />
          
          {/* Mobile hamburger button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            className={cn(
              "p-2 transition-opacity duration-200",
              isMobile ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu 
                className={cn(
                  "h-6 w-6 absolute transition-all duration-300 ease-in-out",
                  isMenuOpen ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
                )} 
              />
              <X 
                className={cn(
                  "h-6 w-6 absolute transition-all duration-300 ease-in-out",
                  isMenuOpen ? "rotate-0 opacity-100" : "rotate-180 opacity-0"
                )} 
              />
            </div>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <>
        {/* Backdrop */}
        <div
          className={cn(
            "fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ease-in-out",
            (isMobile && isMenuOpen) ? "opacity-100 z-40" : "opacity-0 pointer-events-none"
          )}
          onClick={closeMenu}
        />
        
        {/* Mobile menu */}
        <div
          className={cn(
            "fixed top-14 sm:top-16 right-0 w-64 bg-background border-l border-b shadow-lg transition-all duration-300 ease-in-out z-50",
            (isMobile && isMenuOpen) ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
            !isMobile && "pointer-events-none"
          )}
        >
          <nav className="flex flex-col p-4 space-y-2">
            {navItems.map((item, index) => (
              <Link key={item.href} href={item.href} onClick={closeMenu}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-12 px-4 transition-all duration-200 ease-in-out",
                    "hover:bg-muted hover:translate-x-1",
                    pathname === item.href ? "bg-muted font-medium" : "font-normal",
                    // Staggered animation delay
                    (isMobile && isMenuOpen) ? "animate-in slide-in-from-right-5" : "",
                  )}
                  style={{
                    animationDelay: (isMobile && isMenuOpen) ? `${index * 50}ms` : "0ms",
                    animationDuration: "300ms",
                    animationFillMode: "both"
                  }}
                >
                  <span className="flex items-center justify-center mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </>
    </header>
  )
}