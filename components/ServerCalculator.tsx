"use client"

import React, { useState } from "react"
import { useApp, CartItem } from "@/context/AppContext"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Server, Cpu, HardDrive, Database, ShieldCheck, Check, ArrowRight } from "lucide-react"

export default function ServerCalculator() {
  const { addToCart } = useApp()
  const [cpu, setCpu] = useState(2) // cores
  const [ram, setRam] = useState(4) // GB
  const [ssd, setSsd] = useState(80) // GB
  const [bandwidth, setBandwidth] = useState(3) // TB
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  // Pricing math:
  // Base: $4.00
  // CPU: $4.00 per core
  // RAM: $2.00 per GB
  // SSD: $0.12 per GB
  // Bandwidth: $1.00 per TB
  const calculatePrice = () => {
    const base = 4.0
    const cpuCost = cpu * 4.0
    const ramCost = ram * 2.0
    const ssdCost = ssd * 0.12
    const bandwidthCost = bandwidth * 1.0
    
    const monthlyTotal = base + cpuCost + ramCost + ssdCost + bandwidthCost
    
    if (billingCycle === "yearly") {
      // 20% discount for yearly, returned as the discounted monthly equivalent or the full yearly cost
      return monthlyTotal * 0.8
    }
    
    return monthlyTotal
  }

  const monthlyPrice = calculatePrice()
  const finalPrice = billingCycle === "yearly" ? monthlyPrice : monthlyPrice

  const handleAddToCart = () => {
    const customItem: CartItem = {
      id: `custom-vps-${Date.now()}`,
      name: `Custom VPS (${cpu} vCPU / ${ram}GB RAM)`,
      type: "vps",
      price: parseFloat(finalPrice.toFixed(2)),
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
    addToCart(customItem)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-md">
      {/* Sliders (7 cols) */}
      <div className="lg:col-span-7 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-foreground">Custom Resource Allocator</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Slide to dynamically scale your virtual hardware. Pay only for the resources you assign.
          </p>
        </div>

        <div className="space-y-6 pt-2">
          {/* CPU Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold flex items-center gap-1.5 text-foreground">
                <Cpu className="w-4 h-4 text-blue-500" />
                vCPU Cores
              </span>
              <span className="font-bold text-blue-500">{cpu} Core{cpu > 1 ? "s" : ""}</span>
            </div>
            <Slider
              min={1}
              max={16}
              step={1}
              value={[cpu]}
              onValueChange={(val) => setCpu(val[0])}
              className="py-2"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>1 Core</span>
              <span>4 Cores</span>
              <span>8 Cores</span>
              <span>16 Cores</span>
            </div>
          </div>

          {/* RAM Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold flex items-center gap-1.5 text-foreground">
                <Database className="w-4 h-4 text-blue-500" />
                Memory (RAM)
              </span>
              <span className="font-bold text-blue-500">{ram} GB</span>
            </div>
            <Slider
              min={1}
              max={64}
              step={1}
              value={[ram]}
              onValueChange={(val) => setRam(val[0])}
              className="py-2"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>1 GB</span>
              <span>16 GB</span>
              <span>32 GB</span>
              <span>64 GB</span>
            </div>
          </div>

          {/* SSD Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold flex items-center gap-1.5 text-foreground">
                <HardDrive className="w-4 h-4 text-blue-500" />
                NVMe SSD Storage
              </span>
              <span className="font-bold text-blue-500">{ssd} GB</span>
            </div>
            <Slider
              min={20}
              max={500}
              step={10}
              value={[ssd]}
              onValueChange={(val) => setSsd(val[0])}
              className="py-2"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>20 GB</span>
              <span>160 GB</span>
              <span>320 GB</span>
              <span>500 GB</span>
            </div>
          </div>

          {/* Bandwidth Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold flex items-center gap-1.5 text-foreground">
                <Server className="w-4 h-4 text-blue-500" />
                Monthly Bandwidth
              </span>
              <span className="font-bold text-blue-500">{bandwidth} TB</span>
            </div>
            <Slider
              min={1}
              max={15}
              step={1}
              value={[bandwidth]}
              onValueChange={(val) => setBandwidth(val[0])}
              className="py-2"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>1 TB</span>
              <span>5 TB</span>
              <span>10 TB</span>
              <span>15 TB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Summary Card (5 cols) */}
      <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border bg-muted/20 border-border/80 p-6">
        <div className="space-y-4">
          {/* Billing Switch */}
          <div className="flex items-center justify-between bg-background border rounded-lg p-3">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-foreground">Billing Cycle</p>
              <p className="text-[10px] text-muted-foreground">
                {billingCycle === "yearly" ? "20% Annual Discount Applied" : "Standard monthly billing"}
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

          {/* Price display */}
          <div className="text-center py-4 border-b">
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Estimated Cost</p>
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

          {/* Specs Checklist */}
          <div className="space-y-2.5 pt-2">
            <p className="text-xs font-bold text-foreground">Included with this instance:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Dedicated Public IPv4 Address</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>10Gbps Network Port</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Enterprise KVM Virtualization</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Free DDoS Mitigation (100Gbps+)</span>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 group mt-6 py-5"
        >
          Add VPS to Queue
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  )
}
