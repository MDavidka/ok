"use client"

import React, { useState } from "react"
import { useApp, CartItem } from "@/context/AppContext"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Search, Globe, Check, X, ShieldAlert, BadgePercent, ArrowRight, Loader2, Info } from "lucide-react"
import { toast } from "sonner"

interface DomainResult {
  domain: string
  tld: string
  available: boolean
  isPremium: boolean
  price: number
}

const TLD_PRICING: Record<string, { price: number; premiumMultiplier: number }> = {
  ".com": { price: 11.99, premiumMultiplier: 1.5 },
  ".net": { price: 12.99, premiumMultiplier: 1.3 },
  ".org": { price: 14.99, premiumMultiplier: 1.4 },
  ".io": { price: 34.99, premiumMultiplier: 2.5 },
  ".co": { price: 9.99, premiumMultiplier: 3.0 },
  ".tech": { price: 3.99, premiumMultiplier: 2.0 },
}

export default function DomainsPage() {
  const { addToCart, cart } = useApp()
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<DomainResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchedKeyword, setSearchedKeyword] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) {
      toast.error("Please enter a domain name or keyword.")
      return
    }

    // Sanitize input: remove protocols, www., extensions if any
    let keyword = searchQuery.toLowerCase().trim()
    keyword = keyword.replace(/^(https?:\/\/)?(www\.)?/, "")
    keyword = keyword.split(".")[0] // keep only the core name
    keyword = keyword.replace(/[^a-z0-9-]/g, "") // remove special chars

    if (keyword.length < 2) {
      toast.error("Keyword must be at least 2 characters.")
      return
    }

    setIsSearching(true)
    setSearchedKeyword(keyword)

    // Simulate database lookup network delay
    setTimeout(() => {
      const generatedResults: DomainResult[] = Object.entries(TLD_PRICING).map(([tld, info]) => {
        // Deterministic availability based on string length and characters to feel real
        const hash = keyword.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
        
        let available = true
        let isPremium = false
        
        if (hash % 7 === 0 && tld === ".com") available = false // taken
        if (hash % 5 === 0 && tld === ".io") available = false // taken
        if (keyword.length <= 3) isPremium = true // short domains are premium
        if (hash % 11 === 0) isPremium = true

        let finalPrice = info.price
        if (isPremium) {
          finalPrice = parseFloat((info.price * info.premiumMultiplier * 4.5).toFixed(2))
        }

        return {
          domain: `${keyword}${tld}`,
          tld,
          available,
          isPremium,
          price: finalPrice,
        }
      })

      setResults(generatedResults)
      setIsSearching(false)
    }, 1200)
  }

  const handleAddDomainToCart = (res: DomainResult) => {
    const domainItem: CartItem = {
      id: `domain-${res.domain}`,
      name: `Domain: ${res.domain}`,
      type: "domain",
      price: res.price,
      billingCycle: "yearly",
      details: {
        domain: res.domain,
        tld: res.tld,
      },
    }
    addToCart(domainItem)
  }

  const isDomainInCart = (domainName: string) => {
    return cart.some((item) => item.type === "domain" && item.details.domain === domainName)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Search Header Hero */}
      <section className="relative overflow-hidden bg-zinc-950 text-white border-b border-zinc-800 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        {/* Glowing grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 text-xs text-blue-400 font-semibold">
            <BadgePercent className="w-3.5 h-3.5" />
            Special Offer: .TECH domains for only $3.99/yr
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Secure Your Perfect <span className="text-blue-500">Domain Name</span>
          </h1>
          <p className="text-sm sm:text-lg text-zinc-400 max-w-xl mx-auto">
            Find an address that defines your brand. Instant searches with free WHOIS privacy and secure DNS management.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-zinc-500" />
              <Input
                placeholder="Type your desired name (e.g., myawesomeproject)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-12 text-base bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500 focus-visible:ring-blue-500 w-full rounded-lg"
              />
            </div>
            <Button
              type="submit"
              disabled={isSearching}
              className="h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 rounded-lg shrink-0 flex items-center justify-center gap-2"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  Search Domain
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Popular TLD Pricing Badges */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-zinc-500 pt-2 font-mono">
            <span>.COM — $11.99</span>
            <span>.NET — $12.99</span>
            <span>.IO — $34.99</span>
            <span>.CO — $9.99</span>
            <span>.TECH — $3.99</span>
          </div>
        </div>
      </section>

      {/* Domain Results Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {results.length > 0 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">
                Search Results for &ldquo;<span className="text-blue-500">{searchedKeyword}</span>&rdquo;
              </h2>
              <span className="text-xs text-muted-foreground">Prices show first-year registration cost</span>
            </div>

            <div className="rounded-xl border border-border bg-card divide-y overflow-hidden shadow-sm">
              {results.map((res) => (
                <div
                  key={res.domain}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 gap-4 hover:bg-muted/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${res.available ? "bg-emerald-500/10 text-emerald-500" : "bg-destructive/10 text-destructive"}`}>
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-foreground">{res.domain}</span>
                        {res.isPremium && (
                          <span className="text-[9px] uppercase bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold px-1.5 py-0.5 rounded">
                            Premium
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {res.available ? (
                          <span className="text-emerald-500 font-medium flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Available to register
                          </span>
                        ) : (
                          <span className="text-destructive font-medium flex items-center gap-1">
                            <X className="w-3.5 h-3.5" /> Already registered
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-0 pt-3 sm:pt-0 border-border/40">
                    <div className="text-left sm:text-right">
                      {res.available ? (
                        <>
                          <p className="text-lg font-extrabold text-foreground">${res.price.toFixed(2)}</p>
                          <p className="text-[10px] text-muted-foreground">then ${TLD_PRICING[res.tld].price}/yr</p>
                        </>
                      ) : (
                        <span className="text-xs text-muted-foreground font-mono">Unavailable</span>
                      )}
                    </div>

                    {res.available ? (
                      <Button
                        onClick={() => handleAddDomainToCart(res)}
                        disabled={isDomainInCart(res.domain)}
                        size="sm"
                        className={`${
                          isDomainInCart(res.domain)
                            ? "bg-muted text-muted-foreground border border-border"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        } text-xs font-semibold px-4`}
                      >
                        {isDomainInCart(res.domain) ? "In Queue" : "Register"}
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="text-xs border-border text-muted-foreground cursor-not-allowed" disabled>
                        WHOIS info
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Domain Features */}
        <div className="mt-16 space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-bold">Every Domain Registration Includes</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Top-tier domain features at no extra charge. No hidden fees or surprise renewals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-border bg-card">
              <CardHeader className="pb-2">
                <div className="w-8 h-8 rounded bg-blue-500/10 text-blue-500 flex items-center justify-center mb-1">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <CardTitle className="text-base font-bold">Free WHOIS Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Keep your personal contact details (name, email, phone) hidden from spammers, telemarketers, and scammers at no cost, forever.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border bg-card">
              <CardHeader className="pb-2">
                <div className="w-8 h-8 rounded bg-blue-500/10 text-blue-500 flex items-center justify-center mb-1">
                  <Globe className="w-4 h-4" />
                </div>
                <CardTitle className="text-base font-bold">Advanced DNS Manager</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Update A, AAAA, MX, CNAME, and TXT records instantly with our high-speed global Anycast DNS network.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border bg-card">
              <CardHeader className="pb-2">
                <div className="w-8 h-8 rounded bg-blue-500/10 text-blue-500 flex items-center justify-center mb-1">
                  <Info className="w-4 h-4" />
                </div>
                <CardTitle className="text-base font-bold">Domain Lock & Guard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Prevent unauthorized domain transfers. Our security lock requires multi-factor authentication to release registry holds.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
