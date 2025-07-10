"use client"

import { Button } from "@/components/ui/button"
import { ExploitLogo } from "@/components/exploit-logo"
import { Menu, X, Shield, BookOpen, Home } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface NavigationHeaderProps {
  currentPage?: string
}

export function NavigationHeader({ currentPage }: NavigationHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigationItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/simulator", label: "Simulations", icon: Shield },
    { href: "/education", label: "Education", icon: BookOpen },
  ]

  return (
    <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <ExploitLogo className="text-red-500 group-hover:text-red-400 transition-colors" size="md" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white">Exploit</span>
              <span className="text-xs text-gray-400 -mt-1">Adware Simulator</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.label.toLowerCase()
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive ? "text-red-400 bg-red-500/10" : "text-gray-300 hover:text-white hover:bg-gray-800",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 py-4">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = currentPage === item.label.toLowerCase()
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive ? "text-red-400 bg-red-500/10" : "text-gray-300 hover:text-white hover:bg-gray-800",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
