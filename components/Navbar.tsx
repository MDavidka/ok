"use client"

import React, { useState } from "react"
import { useApp } from "@/context/AppContext"
import { useTheme } from "next-themes"
import Link from "next/navigation" // Wait, in Next.js App Router we should import Link from "next/link"
import NextLink from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Menu,
  X,
  Sun,
  Moon,
  ShoppingCart,
  Cloud,
  Server,
  Terminal,
  Globe,
  Cpu,
  HelpCircle,
  Activity,
  ChevronDown
} from "lucide-react"

export default function Navbar() {
  const { cart, setCartOpen } = useApp()
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const cartCount = cart.length

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <NextLink href="/" className="flex items-center gap-2 group">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md shadow-blue-500/20 transition-all group-hover:scale-105">
                <Cloud className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </div>
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                AuraCloud
              </span>
            </NextLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-muted-foreground">
              {/* Products Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1.5 px-3 py-2 rounded-md hover:text-foreground hover:bg-muted/40 transition-colors focus:outline-none">
                  Products
                  <ChevronDown className="w-3.5 h-3.5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[240px] p-2 bg-background border border-border">
                  <DropdownMenuItem asChild>
                    <NextLink href="/configurator" className="flex items-start gap-3 p-2 rounded-md cursor-pointer">
                      <Server className="w-4 h-4 text-blue-500 mt-1" />
                      <div>
                        <p className="font-semibold text-xs text-foreground">Cloud VPS</p>
                        <p className="text-[10px] text-muted-foreground">High-performance SSD instances</p>
                      </div>
                    </NextLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <NextLink href="/configurator?tier=dedicated" className="flex items-start gap-3 p-2 rounded-md cursor-pointer">
                      <Cpu className="w-4 h-4 text-purple-500 mt-1" />
                      <div>
                        <p className="font-semibold text-xs text-foreground">Bare Metal Servers</p>
                        <p className="text-[10px] text-muted-foreground">Dedicated physical infrastructure</p>
                      </div>
                    </NextLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <NextLink href="/#plans" className="flex items-start gap-3 p-2 rounded-md cursor-pointer">
                      <Cloud className="w-4 h-4 text-emerald-500 mt-1" />
                      <div>
                        <p className="font-semibold text-xs text-foreground">Shared Web Hosting</p>
                        <p className="text-[10px] text-muted-foreground">Unlimited bandwidth & domains</p>
                      </div>
                    </NextLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Tools */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1.5 px-3 py-2 rounded-md hover:text-foreground hover:bg-muted/40 transition-colors focus:outline-none">
                  Tools
                  <ChevronDown className="w-3.5 h-3.5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[240px] p-2 bg-background border border-border">
                  <DropdownMenuItem asChild>
                    <NextLink href="/configurator" className="flex items-start gap-3 p-2 rounded-md cursor-pointer">
                      <Terminal className="w-4 h-4 text-blue-500 mt-1" />
                      <div>
                        <p className="font-semibold text-xs text-foreground">Server Configurator</p>
                        <p className="text-[10px] text-muted-foreground">Custom-build virtual hardware</p>
                      </div>
                    </NextLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <NextLink href="/domains" className="flex items-start gap-3 p-2 rounded-md cursor-pointer">
                      <Globe className="w-4 h-4 text-emerald-500 mt-1" />
                      <div>
                        <p className="font-semibold text-xs text-foreground">Domain Checker</p>
                        <p className="text-[10px] text-muted-foreground">Search and register domains</p>
                      </div>
                    </NextLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <NextLink href="/dashboard" className="px-3 py-2 rounded-md hover:text-foreground hover:bg-muted/40 transition-colors flex items-center gap-1.5">
                <Terminal className="w-4 h-4" />
                Console Panel
              </NextLink>

              <NextLink href="/#faq" className="px-3 py-2 rounded-md hover:text-foreground hover:bg-muted/40 transition-colors flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                FAQ
              </NextLink>
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Status Indicator */}
            <div className="hidden lg:flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-1 text-[11px] text-emerald-500 font-medium">
              <Activity className="w-3 h-3 animate-pulse" />
              All Systems Operational (14ms)
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Cart Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCartOpen(true)}
              className="h-9 w-9 border-border/60 relative hover:bg-muted/40 text-muted-foreground hover:text-foreground"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white animate-scaleIn">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Open deployment queue</span>
            </Button>

            <NextLink href="/dashboard" className="hidden sm:inline-flex">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md">
                Client Console
              </Button>
            </NextLink>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-9 w-9 text-muted-foreground hover:text-foreground md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background px-4 py-4 space-y-3 animate-slideDown">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground px-2 uppercase tracking-wider">Services</p>
            <NextLink
              href="/configurator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
            >
              <Server className="w-4 h-4 text-blue-500" />
              Cloud VPS
            </NextLink>
            <NextLink
              href="/configurator?tier=dedicated"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
            >
              <Cpu className="w-4 h-4 text-purple-500" />
              Bare Metal Dedicated
            </NextLink>
            <NextLink
              href="/#plans"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
            >
              <Cloud className="w-4 h-4 text-emerald-500" />
              Web Hosting Plans
            </NextLink>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground px-2 uppercase tracking-wider">Tools</p>
            <NextLink
              href="/configurator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
            >
              <Terminal className="w-4 h-4 text-blue-500" />
              Server Configurator
            </NextLink>
            <NextLink
              href="/domains"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
            >
              <Globe className="w-4 h-4 text-emerald-500" />
              Domain Search
            </NextLink>
          </div>

          <div className="space-y-1 pt-1 border-t">
            <NextLink
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
            >
              <Terminal className="w-4 h-4" />
              Cloud Console Panel
            </NextLink>
            <NextLink
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50"
            >
              <HelpCircle className="w-4 h-4" />
              Help & FAQ
            </NextLink>
          </div>

          <div className="pt-2">
            <NextLink href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="w-full">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Client Console
              </Button>
            </NextLink>
          </div>
        </div>
      )}
    </header>
  )
}
