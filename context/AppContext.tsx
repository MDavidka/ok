"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { toast } from "sonner"

export interface CartItem {
  id: string
  name: string
  type: "vps" | "domain" | "plan"
  price: number // Monthly or one-time
  billingCycle: "monthly" | "yearly"
  details: {
    cpu?: number
    ram?: number
    ssd?: number
    bandwidth?: number
    os?: string
    location?: string
    domain?: string
    tld?: string
    features?: string[]
  }
}

export interface VirtualServer {
  id: string
  name: string
  status: "running" | "stopped" | "rebooting" | "provisioning"
  ipAddress: string
  location: string
  os: string
  cpu: number
  ram: number
  ssd: number
  bandwidthUsed: number // in GB
  bandwidthLimit: number // in GB
  createdAt: string
  uptime: number // in seconds
}

interface AppContextType {
  cart: CartItem[]
  activeServers: VirtualServer[]
  promoCode: string
  discountPercent: number
  isCartOpen: boolean
  setCartOpen: (open: boolean) => void
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  applyPromo: (code: string) => boolean
  clearCart: () => void
  deployServer: (server: Omit<VirtualServer, "id" | "ipAddress" | "uptime" | "bandwidthUsed" | "createdAt">) => void
  rebootServer: (id: string) => void
  toggleServerPower: (id: string) => void
  deleteServer: (id: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const INITIAL_SERVERS: VirtualServer[] = [
  {
    id: "srv-01",
    name: "web-production-main",
    status: "running",
    ipAddress: "185.112.144.22",
    location: "Frankfurt, DE",
    os: "Ubuntu 22.04 LTS",
    cpu: 4,
    ram: 8,
    ssd: 160,
    bandwidthUsed: 420,
    bandwidthLimit: 2000,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    uptime: 2592000, // 30 days
  },
  {
    id: "srv-02",
    name: "db-replica-tokyo",
    status: "running",
    ipAddress: "45.249.12.89",
    location: "Tokyo, JP",
    os: "Debian 12",
    cpu: 2,
    ram: 4,
    ssd: 80,
    bandwidthUsed: 1120,
    bandwidthLimit: 1000, // Over limit warning simulated!
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    uptime: 1036800, // 12 days
  },
]

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [activeServers, setActiveServers] = useState<VirtualServer[]>(INITIAL_SERVERS)
  const [promoCode, setPromoCode] = useState("")
  const [discountPercent, setDiscountPercent] = useState(0)
  const [isCartOpen, setCartOpen] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("auracloud_cart")
    const savedServers = localStorage.getItem("auracloud_servers")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error(e)
      }
    }
    if (savedServers) {
      try {
        setActiveServers(JSON.parse(savedServers))
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  // Save cart to localStorage on change
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart)
    localStorage.setItem("auracloud_cart", JSON.stringify(newCart))
  }

  const saveServers = (newServers: VirtualServer[]) => {
    setActiveServers(newServers)
    localStorage.setItem("auracloud_servers", JSON.stringify(newServers))
  }

  const addToCart = (item: CartItem) => {
    // Check if item already exists to avoid duplicates (especially for domains)
    if (item.type === "domain" && cart.some((c) => c.type === "domain" && c.details.domain === item.details.domain)) {
      toast.error(`Domain ${item.details.domain} is already in your cart!`)
      return
    }
    const newCart = [...cart, item]
    saveCart(newCart)
    toast.success(`${item.name} added to your cart!`)
    setCartOpen(true)
  }

  const removeFromCart = (id: string) => {
    const item = cart.find((c) => c.id === id)
    const newCart = cart.filter((c) => c.id !== id)
    saveCart(newCart)
    if (item) {
      toast.info(`${item.name} removed from cart.`)
    }
  }

  const applyPromo = (code: string): boolean => {
    const formattedCode = code.toUpperCase().trim()
    if (formattedCode === "AURA30") {
      setPromoCode("AURA30")
      setDiscountPercent(30)
      toast.success("Promo code AURA30 applied! 30% off your entire order.")
      return true
    } else if (formattedCode === "SPEEDY") {
      setPromoCode("SPEEDY")
      setDiscountPercent(15)
      toast.success("Promo code SPEEDY applied! 15% off your entire order.")
      return true
    } else {
      toast.error("Invalid promo code. Try 'AURA30' or 'SPEEDY'.")
      return false
    }
  }

  const clearCart = () => {
    saveCart([])
    setPromoCode("")
    setDiscountPercent(0)
  }

  const deployServer = (server: Omit<VirtualServer, "id" | "ipAddress" | "uptime" | "bandwidthUsed" | "createdAt">) => {
    const randomIp = `${Math.floor(Math.random() * 220) + 15}.${Math.floor(Math.random() * 254)}.${Math.floor(Math.random() * 254)}.${Math.floor(Math.random() * 254)}`
    const newServer: VirtualServer = {
      ...server,
      id: `srv-${Math.floor(Math.random() * 90000) + 10000}`,
      ipAddress: randomIp,
      uptime: 0,
      bandwidthUsed: 0,
      createdAt: new Date().toISOString(),
    }

    const updatedServers = [newServer, ...activeServers]
    saveServers(updatedServers)
  }

  const rebootServer = (id: string) => {
    saveServers(
      activeServers.map((srv) => {
        if (srv.id === id) {
          toast.promise(
            new Promise((resolve) => setTimeout(resolve, 3000)),
            {
              loading: `Rebooting server ${srv.name}...`,
              success: `Server ${srv.name} is back online!`,
              error: "Failed to reboot server.",
            }
          )
          return { ...srv, status: "rebooting" }
        }
        return srv
      })
    )

    // Reset status back to running after 3 seconds
    setTimeout(() => {
      setActiveServers((prev) =>
        prev.map((srv) => (srv.id === id ? { ...srv, status: "running", uptime: 0 } : srv))
      )
    }, 3000)
  }

  const toggleServerPower = (id: string) => {
    setActiveServers((prev) =>
      prev.map((srv) => {
        if (srv.id === id) {
          const isRunning = srv.status === "running"
          const nextStatus = isRunning ? "stopped" : "running"
          toast.success(`Server ${srv.name} has been ${isRunning ? "powered off" : "powered on"}.`)
          return { ...srv, status: nextStatus, uptime: 0 }
        }
        return srv
      })
    )
  }

  const deleteServer = (id: string) => {
    const srv = activeServers.find((s) => s.id === id)
    const filtered = activeServers.filter((s) => s.id !== id)
    saveServers(filtered)
    if (srv) {
      toast.success(`Server ${srv.name} was successfully destroyed. All resources released.`)
    }
  }

  return (
    <AppContext.Provider
      value={{
        cart,
        activeServers,
        promoCode,
        discountPercent,
        isCartOpen,
        setCartOpen,
        addToCart,
        removeFromCart,
        applyPromo,
        clearCart,
        deployServer,
        rebootServer,
        toggleServerPower,
        deleteServer,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
