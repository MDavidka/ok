"use client"

import React, { useState, useEffect } from "react"
import { useApp, CartItem } from "@/context/AppContext"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Server, Cpu, HardDrive, Database, Shield, Globe, Terminal, ArrowRight, Settings, Check, MapPin } from "lucide-react"

interface Location {
  id: string
  name: string
  flag: string
  latency: string
  region: string
}

interface OS {
  id: string
  name: string
  logo: string
  version: string
}

const LOCATIONS: Location[] = [
  { id: "fra", name: "Frankfurt", flag: "🇩🇪", latency: "8ms", region: "Europe Central" },
  { id: "nyc", name: "New York", flag: "🇺🇸", latency: "14ms", region: "US East" },
  { id: "lon", name: "London", flag: "🇬🇧", latency: "11ms", region: "Europe West" },
  { id: "tyo", name: "Tokyo", flag: "🇯🇵", latency: "118ms", region: "Asia Northeast" },
  { id: "sin", name: "Singapore", flag: "🇸🇬", latency: "142ms", region: "Asia Southeast" },
  { id: "syd", name: "Sydney", flag: "🇦🇺", latency: "176ms", region: "Australia East" },
]

const OPERATING_SYSTEMS: OS[] = [
  { id: "ubuntu", name: "Ubuntu", logo: "🐧", version: "22.04 LTS" },
  { id: "debian", name: "Debian", logo: "🌀", version: "12 Bookworm" },
  { id: "rocky", name: "Rocky Linux", logo: "⛰️", version: "9.3 Green" },
  { id: "windows", name: "Windows Server", logo: "🪟", version: "2022 Standard" },
]

export default function ConfiguratorPage() {
  const { addToCart } = useApp()
  
  // Selection states
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0])
  const [selectedOS, setSelectedOS] = useState(OPERATING_SYSTEMS[0])
  const [tier, setTier] = useState<"general" | "cpu" | "memory">("general")
  
  // Resource states
  const [cpu, setCpu] = useState(4)
  const [ram, setRam] = useState(8)
  const [ssd, setSsd] = useState(160)
  const [bandwidth, setBandwidth] = useState(5) // in TB

  // Add-ons states
  const [addBackups, setAddBackups] = useState(true)
  const [addManaged, setAddManaged] = useState(false)
  const [addDdos, setAddDdos] = useState(true)
  const [addIp, setAddIp] = useState(true)

  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  // Ensure RAM/CPU limits based on tier
  useEffect(() => {
    if (tier === "cpu") {
      if (cpu < 4) setCpu(4)
    } else if (tier === "memory") {
      if (ram < 16) setRam(16)
    }
  }, [tier, cpu, ram])

  // Pricing calculation logic
  const calculatePrice = () => {
    let base = 5.0
    let cpuRate = 4.0
    let ramRate = 2.0
    let ssdRate = 0.12
    let bandwidthRate = 1.0

    if (tier === "cpu") {
      base = 10.0
      cpuRate = 7.0 // premium CPU cores
      ramRate = 1.5
      ssdRate = 0.15
    } else if (tier === "memory") {
      base = 12.0
      cpuRate = 3.0
      ramRate = 3.5 // premium memory
      ssdRate = 0.15
    }

    let subtotal = base + (cpu * cpuRate) + (ram * ramRate) + (ssd * ssdRate) + (bandwidth * bandwidthRate)

    // Add-on costs
    if (addBackups) subtotal += 2.0
    if (addManaged) subtotal += 15.0
    if (addDdos) subtotal += 3.0
    if (addIp) subtotal += 1.0

    // Windows license fee
    if (selectedOS.id === "windows") {
      subtotal += 10.0
    }

    if (billingCycle === "yearly") {
      return subtotal * 0.8 // 20% discount
    }

    return subtotal
  }

  const finalPrice = calculatePrice()

  const handleDeploy = () => {
    const features: string[] = []
    if (addBackups) features.push("Daily Backups")
    if (addManaged) features.push("Managed Support")
    if (addDdos) features.push("DDoS Shield")
    if (addIp) features.push("Dedicated IP")

    const cartItem: CartItem = {
      id: `configured-vps-${Date.now()}`,
      name: `${tier.toUpperCase()} Server — ${selectedOS.name} (${cpu} Core / ${ram}GB)`,
      type: "vps",
      price: parseFloat(finalPrice.toFixed(2)),
      billingCycle: billingCycle,
      details: {
        cpu,
        ram,
        ssd,
        bandwidth,
        location: `${selectedLocation.name}, ${selectedLocation.flag}`,
        os: `${selectedOS.name} ${selectedOS.version}`,
        features,
      },
    }

    addToCart(cartItem)
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2 border-b pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Custom Cloud Server Engineer</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Architect your own enterprise-grade virtual private server. Deploy globally in 15 seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Customization (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* STEP 1: LOCATION */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">1</span>
              Choose Deployment Region
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-200 ${
                    selectedLocation.id === loc.id
                      ? "border-blue-600 bg-blue-600/5 ring-1 ring-blue-600"
                      : "border-border bg-card hover:bg-muted/40"
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-2xl select-none">{loc.flag}</span>
                    <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono font-bold text-muted-foreground">
                      {loc.latency}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-foreground mt-3">{loc.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{loc.region}</p>
                </button>
              ))}
            </div>
          </section>

          {/* STEP 2: OPERATING SYSTEM */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">2</span>
              Select Operating System
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {OPERATING_SYSTEMS.map((os) => (
                <button
                  key={os.id}
                  onClick={() => setSelectedOS(os)}
                  className={`flex flex-col items-center p-4 rounded-xl border text-center transition-all duration-200 ${
                    selectedOS.id === os.id
                      ? "border-blue-600 bg-blue-600/5 ring-1 ring-blue-600"
                      : "border-border bg-card hover:bg-muted/40"
                  }`}
                >
                  <span className="text-3xl select-none">{os.logo}</span>
                  <p className="text-sm font-bold text-foreground mt-3">{os.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{os.version}</p>
                  {os.id === "windows" && (
                    <span className="text-[9px] text-blue-500 font-bold mt-1">+$10.00/mo license</span>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* STEP 3: PLAN TIER */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">3</span>
              Select Server Architecture Tier
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => setTier("general")}
                className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-200 ${
                  tier === "general"
                    ? "border-blue-600 bg-blue-600/5 ring-1 ring-blue-600"
                    : "border-border bg-card hover:bg-muted/40"
                }`}
              >
                <div className="p-2 rounded bg-blue-500/10 text-blue-500 mb-3">
                  <Server className="w-5 h-5" />
                </div>
                <p className="text-sm font-bold text-foreground">General Purpose</p>
                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                  Balanced ratio of compute, memory, and storage. Ideal for standard web apps, blogs, and dev environments.
                </p>
              </button>

              <button
                onClick={() => setTier("cpu")}
                className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-200 ${
                  tier === "cpu"
                    ? "border-blue-600 bg-blue-600/5 ring-1 ring-blue-600"
                    : "border-border bg-card hover:bg-muted/40"
                }`}
              >
                <div className="p-2 rounded bg-blue-500/10 text-blue-500 mb-3">
                  <Cpu className="w-5 h-5" />
                </div>
                <p className="text-sm font-bold text-foreground">Compute Optimized</p>
                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                  High-performance AMD EPYC cores. Perfect for CI/CD runners, batch processing, and CPU-intensive workloads.
                </p>
              </button>

              <button
                onClick={() => setTier("memory")}
                className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-200 ${
                  tier === "memory"
                    ? "border-blue-600 bg-blue-600/5 ring-1 ring-blue-600"
                    : "border-border bg-card hover:bg-muted/40"
                }`}
              >
                <div className="p-2 rounded bg-blue-500/10 text-blue-500 mb-3">
                  <Database className="w-5 h-5" />
                </div>
                <p className="text-sm font-bold text-foreground">Memory Optimized</p>
                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                  Maximum RAM density per core. Designed for high-speed in-memory databases, Redis caches, and data lakes.
                </p>
              </button>
            </div>
          </section>

          {/* STEP 4: RESOURCE SLIDERS */}
          <section className="space-y-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">4</span>
              Allocate Server Resources
            </h2>

            <div className="space-y-6 rounded-xl border bg-card p-6 shadow-sm">
              {/* CPU Core Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold flex items-center gap-1.5 text-foreground">
                    <Cpu className="w-4 h-4 text-blue-500" />
                    vCPU Allocation
                  </span>
                  <span className="font-bold text-blue-500">{cpu} Core{cpu > 1 ? "s" : ""}</span>
                </div>
                <Slider
                  min={tier === "cpu" ? 4 : 1}
                  max={32}
                  step={1}
                  value={[cpu]}
                  onValueChange={(val) => setCpu(val[0])}
                  className="py-2"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>{tier === "cpu" ? "4 Cores (Min)" : "1 Core"}</span>
                  <span>16 Cores</span>
                  <span>32 Cores (Max)</span>
                </div>
              </div>

              {/* RAM Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold flex items-center gap-1.5 text-foreground">
                    <Database className="w-4 h-4 text-blue-500" />
                    System Memory (RAM)
                  </span>
                  <span className="font-bold text-blue-500">{ram} GB</span>
                </div>
                <Slider
                  min={tier === "memory" ? 16 : 1}
                  max={128}
                  step={2}
                  value={[ram]}
                  onValueChange={(val) => setRam(val[0])}
                  className="py-2"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>{tier === "memory" ? "16 GB (Min)" : "1 GB"}</span>
                  <span>64 GB</span>
                  <span>128 GB (Max)</span>
                </div>
              </div>

              {/* SSD Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold flex items-center gap-1.5 text-foreground">
                    <HardDrive className="w-4 h-4 text-blue-500" />
                    NVMe Enterprise Storage
                  </span>
                  <span className="font-bold text-blue-500">{ssd} GB</span>
                </div>
                <Slider
                  min={20}
                  max={1600}
                  step={20}
                  value={[ssd]}
                  onValueChange={(val) => setSsd(val[0])}
                  className="py-2"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>20 GB</span>
                  <span>800 GB</span>
                  <span>1.6 TB (Max)</span>
                </div>
              </div>

              {/* Bandwidth Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold flex items-center gap-1.5 text-foreground">
                    <Server className="w-4 h-4 text-blue-500" />
                    Premium Monthly Bandwidth Limit
                  </span>
                  <span className="font-bold text-blue-500">{bandwidth} TB</span>
                </div>
                <Slider
                  min={1}
                  max={20}
                  step={1}
                  value={[bandwidth]}
                  onValueChange={(val) => setBandwidth(val[0])}
                  className="py-2"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>1 TB</span>
                  <span>10 TB</span>
                  <span>20 TB (Max)</span>
                </div>
              </div>
            </div>
          </section>

          {/* STEP 5: ADD-ONS */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">5</span>
              Select Enterprise Add-ons
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Daily Backups */}
              <div className="flex items-start gap-3 p-4 rounded-xl border bg-card">
                <Checkbox
                  id="add-backups"
                  checked={addBackups}
                  onCheckedChange={(val) => setAddBackups(!!val)}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <Label htmlFor="add-backups" className="text-sm font-bold flex items-center gap-1.5 cursor-pointer">
                    Automated Daily Backups
                    <span className="text-xs text-blue-500 font-semibold">(+$2.00/mo)</span>
                  </Label>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Full incremental server snapshots stored off-site. Easily restore with one click.
                  </p>
                </div>
              </div>

              {/* Managed Support */}
              <div className="flex items-start gap-3 p-4 rounded-xl border bg-card">
                <Checkbox
                  id="add-managed"
                  checked={addManaged}
                  onCheckedChange={(val) => setAddManaged(!!val)}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <Label htmlFor="add-managed" className="text-sm font-bold flex items-center gap-1.5 cursor-pointer">
                    Fully Managed Support
                    <span className="text-xs text-blue-500 font-semibold">(+$15.00/mo)</span>
                  </Label>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Our SysOps engineers handle OS updates, security patches, and 24/7 server monitoring.
                  </p>
                </div>
              </div>

              {/* DDoS Shield */}
              <div className="flex items-start gap-3 p-4 rounded-xl border bg-card">
                <Checkbox
                  id="add-ddos"
                  checked={addDdos}
                  onCheckedChange={(val) => setAddDdos(!!val)}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <Label htmlFor="add-ddos" className="text-sm font-bold flex items-center gap-1.5 cursor-pointer">
                    Advanced DDoS Shield
                    <span className="text-xs text-blue-500 font-semibold">(+$3.00/mo)</span>
                  </Label>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Enterprise path mitigation up to 500Gbps. Keeps your service online during heavy attacks.
                  </p>
                </div>
              </div>

              {/* Dedicated IP */}
              <div className="flex items-start gap-3 p-4 rounded-xl border bg-card">
                <Checkbox
                  id="add-ip"
                  checked={addIp}
                  onCheckedChange={(val) => setAddIp(!!val)}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <Label htmlFor="add-ip" className="text-sm font-bold flex items-center gap-1.5 cursor-pointer">
                    Dedicated IPv4 Address
                    <span className="text-xs text-blue-500 font-semibold">(+$1.00/mo)</span>
                  </Label>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    A clean, dedicated IP assigned only to your server. Essential for custom email servers.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Side: Summary Card (4 cols) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
          <Card className="border border-border bg-card shadow-md">
            <CardHeader className="pb-4 border-b">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-500" />
                Configuration Summary
              </CardTitle>
              <CardDescription>Verify your virtual hardware specifications</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Specs Details */}
              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Region:</span>
                  <span className="font-bold text-foreground flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                    {selectedLocation.name} {selectedLocation.flag}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Operating System:</span>
                  <span className="font-bold text-foreground">{selectedOS.name} {selectedOS.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Architecture Tier:</span>
                  <span className="font-bold text-foreground uppercase text-[10px] bg-blue-500/10 text-blue-500 px-1.5 py-0.5 rounded">
                    {tier}
                  </span>
                </div>
                
                <Separator className="my-2" />

                <div className="flex justify-between">
                  <span className="text-muted-foreground">vCPU cores:</span>
                  <span className="font-bold text-foreground">{cpu} Cores</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">System RAM:</span>
                  <span className="font-bold text-foreground">{ram} GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">NVMe SSD Storage:</span>
                  <span className="font-bold text-foreground">{ssd} GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network Bandwidth:</span>
                  <span className="font-bold text-foreground">{bandwidth} TB</span>
                </div>

                {/* Add-ons list */}
                {(addBackups || addManaged || addDdos || addIp) && (
                  <>
                    <Separator className="my-2" />
                    <div className="space-y-1.5">
                      <span className="text-muted-foreground block mb-1">Active Add-ons:</span>
                      {addBackups && <div className="flex items-center gap-1.5 font-bold text-foreground"><Check className="w-3.5 h-3.5 text-emerald-500" /> Daily Backups</div>}
                      {addManaged && <div className="flex items-center gap-1.5 font-bold text-foreground"><Check className="w-3.5 h-3.5 text-emerald-500" /> Managed Support</div>}
                      {addDdos && <div className="flex items-center gap-1.5 font-bold text-foreground"><Check className="w-3.5 h-3.5 text-emerald-500" /> DDoS Shield</div>}
                      {addIp && <div className="flex items-center gap-1.5 font-bold text-foreground"><Check className="w-3.5 h-3.5 text-emerald-500" /> Dedicated IP</div>}
                    </div>
                  </>
                )}
              </div>

              {/* Billing Cycle Switch */}
              <div className="flex items-center justify-between bg-muted/30 border rounded-lg p-3">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-foreground">Billing Cycle</p>
                  <p className="text-[10px] text-muted-foreground">
                    {billingCycle === "yearly" ? "20% Discount Applied" : "Monthly payments"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold ${billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
                  <Switch
                    checked={billingCycle === "yearly"}
                    onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
                  />
                  <span className={`text-xs font-semibold ${billingCycle === "yearly" ? "text-emerald-500" : "text-muted-foreground"}`}>Yearly</span>
                </div>
              </div>

              {/* Total Price */}
              <div className="text-center py-4 border-t">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Total Recurring</p>
                <div className="flex items-baseline justify-center gap-1 mt-1">
                  <span className="text-4xl font-extrabold tracking-tight text-foreground">
                    ${finalPrice.toFixed(2)}
                  </span>
                  <span className="text-sm font-semibold text-muted-foreground">/mo</span>
                </div>
                {billingCycle === "yearly" && (
                  <p className="text-[11px] text-emerald-500 font-medium mt-1">
                    Billed annually at ${(finalPrice * 12).toFixed(2)}/yr
                  </p>
                )}
              </div>

              <Button
                onClick={handleDeploy}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 group py-5"
              >
                Add Server to Queue
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
