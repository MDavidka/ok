"use client"

import React, { useState } from "react"
import { useApp, CartItem } from "@/context/AppContext"
import NextLink from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Server,
  Cpu,
  Database,
  HardDrive,
  Globe,
  Terminal,
  ShieldCheck,
  Check,
  ArrowRight,
  Search,
  Activity,
  Zap,
  Lock,
  RefreshCw,
  HelpCircle
} from "lucide-react"
import { useRouter } from "next/navigation"
import LatencyTest from "@/components/LatencyTest"
import ServerCalculator from "@/components/ServerCalculator"
import ControlPanelDemo from "@/components/ControlPanelDemo"

export default function Home() {
  const { addToCart } = useApp()
  const router = useRouter()
  const [domainQuery, setDomainQuery] = useState("")
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const handleDomainSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (domainQuery.trim()) {
      router.push(`/domains?q=${encodeURIComponent(domainQuery.trim())}`)
    } else {
      router.push("/domains")
    }
  }

  // Pre-configured plans pricing
  const starterPrice = billingCycle === "yearly" ? 12.0 * 0.8 : 12.0
  const proPrice = billingCycle === "yearly" ? 32.0 * 0.8 : 32.0
  const enterprisePrice = billingCycle === "yearly" ? 64.0 * 0.8 : 64.0

  const handleAddPlanToCart = (planName: string, price: number, cpu: number, ram: number, ssd: number, bandwidth: number) => {
    const item: CartItem = {
      id: `plan-${planName.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      name: `Cloud VPS: ${planName}`,
      type: "vps",
      price: parseFloat(price.toFixed(2)),
      billingCycle: billingCycle,
      details: {
        cpu,
        ram,
        ssd,
        bandwidth,
        location: "Frankfurt, DE",
        os: "Ubuntu 22.04 LTS"
      }
    }
    addToCart(item)
  }

  return (
    <main className="flex flex-col min-h-screen bg-background">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-border bg-zinc-950 text-white py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

        <div className="relative max-w-5xl mx-auto text-center space-y-8">
          <span className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 text-xs text-blue-400 font-semibold animate-fadeIn">
            <Zap className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            Deploy global virtual servers in 15 seconds
          </span>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none text-white max-w-4xl mx-auto">
            Cloud Infrastructure Built for <span className="text-blue-500 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Speed & Scale</span>
          </h1>
          
          <p className="text-sm sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Deploy high-performance virtual private servers, bare metal instances, and global Kubernetes clusters. Built on AMD EPYC processors and enterprise NVMe storage.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto pt-2">
            <NextLink href="/configurator" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-6 rounded-lg text-sm flex items-center justify-center gap-2">
                Configure Custom Server
                <ArrowRight className="w-4 h-4" />
              </Button>
            </NextLink>
            <NextLink href="/domains" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full border-zinc-800 hover:bg-zinc-900 text-white font-bold px-8 py-6 rounded-lg text-sm">
                Search Domains
              </Button>
            </NextLink>
          </div>

          {/* Quick Domain Search */}
          <form onSubmit={handleDomainSearchSubmit} className="max-w-lg mx-auto flex gap-2 bg-zinc-900/50 border border-zinc-800 p-1.5 rounded-xl backdrop-blur-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-zinc-500" />
              <Input
                placeholder="Find your domain name (e.g. mybrand)..."
                value={domainQuery}
                onChange={(e) => setDomainQuery(e.target.value)}
                className="pl-9 h-11 text-sm bg-transparent border-0 text-white placeholder-zinc-500 focus-visible:ring-0 w-full"
              />
            </div>
            <Button type="submit" className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold px-5 rounded-lg shrink-0">
              Check
            </Button>
          </form>
        </div>
      </section>

      {/* 2. LATENCY SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Our Global Network Performance</h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            AuraCloud operates Tier III datacenters in primary regional hubs. Click below to ping our physical servers in real-time.
          </p>
        </div>
        <LatencyTest />
      </section>

      {/* 3. CORE CALCULATOR */}
      <section className="py-16 bg-muted/10 border-y border-border/40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Scale Resources, Control Costs</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              Drag the sliders to allocate exactly what you need. Scale RAM, CPU, or NVMe SSD instantly with no contract lock-ins.
            </p>
          </div>
          <ServerCalculator />
        </div>
      </section>

      {/* 4. PRE-CONFIGURED PLANS */}
      <section id="plans" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Ready-to-Deploy Cloud VPS</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              Our standard pre-configured KVM server profiles. Ideal for quick setups and production standard nodes.
            </p>
          </div>

          {/* Billing Switch */}
          <div className="flex items-center gap-3 bg-muted/40 border p-2 rounded-xl">
            <span className={`text-xs font-bold ${billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground"}`}>Monthly Billing</span>
            <Switch
              checked={billingCycle === "yearly"}
              onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
            />
            <span className={`text-xs font-bold ${billingCycle === "yearly" ? "text-emerald-500" : "text-muted-foreground"}`}>
              Yearly (Save 20%)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Plan 1: Starter */}
          <div className="rounded-xl border bg-card p-6 flex flex-col justify-between shadow-sm hover:border-blue-500/40 transition-colors">
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg text-foreground">Starter Node</h3>
                <p className="text-xs text-muted-foreground mt-1">Perfect for staging, API testing, and small blogs.</p>
              </div>

              <div className="py-2">
                <span className="text-3xl font-extrabold text-foreground">${starterPrice.toFixed(2)}</span>
                <span className="text-xs text-muted-foreground font-semibold"> /mo</span>
              </div>

              <div className="space-y-2.5 text-xs border-t pt-4">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-blue-500" /> vCPU cores</span>
                  <span className="font-bold text-foreground">1 Core</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Database className="w-3.5 h-3.5 text-blue-500" /> Memory (RAM)</span>
                  <span className="font-bold text-foreground">2 GB DDR5</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1.5"><HardDrive className="w-3.5 h-3.5 text-blue-500" /> NVMe Storage</span>
                  <span className="font-bold text-foreground">40 GB SSD</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Server className="w-3.5 h-3.5 text-blue-500" /> Bandwidth limit</span>
                  <span className="font-bold text-foreground">2 TB /mo</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => handleAddPlanToCart("Starter Node", starterPrice, 1, 2, 40, 2)}
              className="w-full bg-blue-600/10 hover:bg-blue-600 hover:text-white text-blue-500 font-bold text-xs mt-6"
            >
              Deploy Starter
            </Button>
          </div>

          {/* Plan 2: Pro (Popular) */}
          <div className="rounded-xl border border-blue-500 bg-card p-6 flex flex-col justify-between shadow-md relative overflow-hidden">
            <span className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] uppercase font-bold tracking-wider px-3 py-1 rounded-bl-lg">
              Most Popular
            </span>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg text-foreground">Production Pro</h3>
                <p className="text-xs text-muted-foreground mt-1">Designed for high-traffic web apps and active databases.</p>
              </div>

              <div className="py-2">
                <span className="text-3xl font-extrabold text-foreground">${proPrice.toFixed(2)}</span>
                <span className="text-xs text-muted-foreground font-semibold"> /mo</span>
              </div>

              <div className="space-y-2.5 text-xs border-t pt-4">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-blue-500" /> vCPU cores</span>
                  <span className="font-bold text-foreground">4 Cores</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Database className="w-3.5 h-3.5 text-blue-500" /> Memory (RAM)</span>
                  <span className="font-bold text-foreground">8 GB DDR5</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1.5"><HardDrive className="w-3.5 h-3.5 text-blue-500" /> NVMe Storage</span>
                  <span className="font-bold text-foreground">160 GB SSD</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Server className="w-3.5 h-3.5 text-blue-500" /> Bandwidth limit</span>
                  <span className="font-bold text-foreground">5 TB /mo</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => handleAddPlanToCart("Production Pro", proPrice, 4, 8, 160, 5)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs mt-6"
            >
              Deploy Pro Plan
            </Button>
          </div>

          {/* Plan 3: Enterprise */}
          <div className="rounded-xl border bg-card p-6 flex flex-col justify-between shadow-sm hover:border-blue-500/40 transition-colors">
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg text-foreground">Enterprise Core</h3>
                <p className="text-xs text-muted-foreground mt-1">High-performance profiles for heavy enterprise computing.</p>
              </div>

              <div className="py-2">
                <span className="text-3xl font-extrabold text-foreground">${enterprisePrice.toFixed(2)}</span>
                <span className="text-xs text-muted-foreground font-semibold"> /mo</span>
              </div>

              <div className="space-y-2.5 text-xs border-t pt-4">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-blue-500" /> vCPU cores</span>
                  <span className="font-bold text-foreground">8 Cores</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Database className="w-3.5 h-3.5 text-blue-500" /> Memory (RAM)</span>
                  <span className="font-bold text-foreground">16 GB DDR5</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1.5"><HardDrive className="w-3.5 h-3.5 text-blue-500" /> NVMe Storage</span>
                  <span className="font-bold text-foreground">320 GB SSD</span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Server className="w-3.5 h-3.5 text-blue-500" /> Bandwidth limit</span>
                  <span className="font-bold text-foreground">10 TB /mo</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => handleAddPlanToCart("Enterprise Core", enterprisePrice, 8, 16, 320, 10)}
              className="w-full bg-blue-600/10 hover:bg-blue-600 hover:text-white text-blue-500 font-bold text-xs mt-6"
            >
              Deploy Enterprise
            </Button>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE CONTROL PANEL DEMO */}
      <section className="py-20 bg-muted/10 border-y border-border/40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Full Root Access, Zero Friction</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              Manage physical and virtual infrastructure with our custom-engineered Aura Control Panel. Reboot servers, review terminal console outputs, and toggle backups instantly below.
            </p>
          </div>
          <ControlPanelDemo />
        </div>
      </section>

      {/* 6. KEY FEATURES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Enterprise Infrastructure Standards</h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            Why leading developers and tech startups host their projects on AuraCloud.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg w-fit">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base">AMD EPYC Processors</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every virtual machine runs on high-frequency AMD EPYC Rome/Milan server cores, delivering unparalleled multi-threaded processing power.
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg w-fit">
              <HardDrive className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base">100% NVMe Enterprise SSDs</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Experience lightning-fast disk operations. Our hardware RAID-10 storage arrays deliver up to 5,000MB/s read/write performance.
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg w-fit">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base">Free DDoS Shield (100Gbps+)</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every server receives automatic high-capacity packet scrubbing. Malicious traffic is filtered at our edge before reaching your node.
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg w-fit">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base">99.99% Uptime Guarantee</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Our network runs on redundant redundant power grids and multiple Tier-1 upstream transit providers, backed by a strict SLA.
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg w-fit">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base">Full Root SSH Access</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Get raw, unrestricted root access to your virtual instances. Install any kernel modules, custom packages, or operating systems.
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg w-fit">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base">Enterprise KVM Virtualization</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              No oversold resources. KVM guarantees that your assigned CPU, RAM, and SSD block are fully dedicated only to your instance.
            </p>
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section id="faq" className="py-20 bg-muted/10 border-t border-border/40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center justify-center gap-2">
              <HelpCircle className="w-7 h-7 text-blue-500" />
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              Have questions about AuraCloud hosting? Find quick answers below.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full border rounded-xl bg-card p-4 divide-y">
            <AccordionItem value="item-1" className="border-0 py-2">
              <AccordionTrigger className="text-sm font-bold text-left hover:no-underline">
                What is KVM virtualization and why does it matter?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground leading-relaxed pt-1.5">
                KVM (Kernel-based Virtual Machine) is a full virtualization technology that turns the Linux kernel into a hypervisor. Unlike container-based virtualization (like OpenVZ), KVM guarantees that your assigned RAM, CPU cores, and storage are fully isolated and dedicated to your server. There is absolutely no overselling, and you can run custom kernels or any OS (including Windows).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-0 py-2">
              <AccordionTrigger className="text-sm font-bold text-left hover:no-underline">
                How fast is server provisioning?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground leading-relaxed pt-1.5">
                AuraCloud uses high-speed API deployment pipelines. Standard Linux operating systems (like Ubuntu, Debian, or Rocky Linux) are fully provisioned, networked, and online in under 15 seconds. Windows Server installations may take up to 45 seconds to complete their initial boot sequence.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-0 py-2">
              <AccordionTrigger className="text-sm font-bold text-left hover:no-underline">
                Do you offer automated backups?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground leading-relaxed pt-1.5">
                Yes! You can enable automated daily incremental backups during configuration or toggle them anytime from your Control Console. Backups are stored in separate, redundant off-site storage arrays and do not consume your server&apos;s SSD storage block. You can restore your entire server to a previous snapshot with a single click.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-0 py-2">
              <AccordionTrigger className="text-sm font-bold text-left hover:no-underline">
                What happens if my server exceeds its monthly bandwidth limit?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground leading-relaxed pt-1.5">
                We never charge surprise overage fees. If your server exceeds its monthly bandwidth limit, your outbound network port is simply throttled to 100Mbps. Inbound network traffic always remains completely free and unthrottled. You can upgrade your bandwidth quota instantly from the dashboard.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-0 py-2">
              <AccordionTrigger className="text-sm font-bold text-left hover:no-underline">
                Can I migrate my existing servers to AuraCloud?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground leading-relaxed pt-1.5">
                Yes, our SysOps team offers free migration assistance! Simply open a support ticket from your Console Panel, provide your old server details, and our engineers will migrate your databases, websites, and settings with zero downtime.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="border-t border-border/40 bg-zinc-950 text-zinc-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-xs">
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">Services</h4>
            <ul className="space-y-2">
              <li><NextLink href="/configurator" className="hover:text-white transition-colors">Cloud VPS</NextLink></li>
              <li><NextLink href="/configurator?tier=dedicated" className="hover:text-white transition-colors">Bare Metal Servers</NextLink></li>
              <li><NextLink href="/#plans" className="hover:text-white transition-colors">Shared Hosting</NextLink></li>
              <li><NextLink href="/configurator" className="hover:text-white transition-colors">Managed Kubernetes</NextLink></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">Tools & APIs</h4>
            <ul className="space-y-2">
              <li><NextLink href="/configurator" className="hover:text-white transition-colors">Server Configurator</NextLink></li>
              <li><NextLink href="/domains" className="hover:text-white transition-colors">Domain Checker</NextLink></li>
              <li><NextLink href="/dashboard" className="hover:text-white transition-colors">Cloud Panel Console</NextLink></li>
              <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About AuraCloud</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Datacenters</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Network Status</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Sales</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">Security & Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">SLA Guarantee</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Abuse Reporting</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-zinc-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-blue-600 flex items-center justify-center text-white">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-white">AuraCloud Hosting</span>
            <span>&copy; {new Date().getFullYear()} AuraCloud Inc. All rights reserved.</span>
          </div>

          <div className="flex gap-4">
            <span>Built autonomously by Syra</span>
            <span>Powered by Sycord</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
