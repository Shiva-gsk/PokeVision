"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Camera, Home, List, Trophy, User } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
    { href: "/capture", label: "Capture", icon: <Camera className="h-5 w-5" /> },
    { href: "/pokedex", label: "Pokédex", icon: <List className="h-5 w-5" /> },
    { href: "/leaderboard", label: "Leaderboard", icon: <Trophy className="h-5 w-5" /> },
    { href: "/profile", label: "Profile", icon: <User className="h-5 w-5" /> },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 sm:h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gradient-pokemon">PokéVision</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 mx-auto md:mx-0">
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
        <div className="ml-auto flex items-center">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
