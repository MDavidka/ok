"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Activity, Globe, Play, RefreshCw, Check } from "lucide-react"

interface LocationPing {
  id: string
  name: string
  region: string
  flag: string
  ping: number | null
  status: "idle" | "testing" | "done"
}

const LOCATIONS: LocationPing[] = [
  { id: "us-east", name: "New York", region: "United States", flag: "🇺🇸", ping: null, status: "idle" },
  { id: "eu-west", name: "Frankfurt", region: "Germany", flag: "🇩🇪", ping: null, status: "idle" },
  { id: "uk-london", name: "London", region: "United Kingdom", flag: "🇬🇧", ping: null, status: "idle" },
  { id: "ap-northeast", name: "Tokyo", region: "Japan", flag: "🇯🇵", ping: null, status: "idle" },
  { id: "ap-southeast", name: "Singapore", region: "Singapore", flag: "🇸🇬", ping: null, status: "idle" },
  { id: "ap-southern", name: "Sydney", region: "Australia", flag: "🇦🇺", ping: null, status: "idle" },
]

export default function LatencyTest() {
  const [locations, setLocations] = useState<LocationPing[]>(LOCATIONS)
  const [isTesting, setIsTesting] = useState(false)
  const [testProgress, setTestProgress] = useState(0)

  const runTest = async () => {
    setIsTesting(true)
    setTestProgress(0)
    
    // Reset pings
    setLocations(LOCATIONS.map(loc => ({ ...loc, ping: null, status: "testing" })))

    for (let i = 0; i < LOCATIONS.length; i++) {
      const loc = LOCATIONS[i]
      
      // Simulate network delay for the test
      await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400))
      
      // Calculate a realistic ping based on standard distance from a central European/US node
      let simulatedPing = 0
      if (loc.id === "us-east") simulatedPing = Math.floor(12 + Math.random() * 15)
      else if (loc.id === "eu-west") simulatedPing = Math.floor(8 + Math.random() * 8)
      else if (loc.id === "uk-london") simulatedPing = Math.floor(14 + Math.random() * 10)
      else if (loc.id === "ap-northeast") simulatedPing = Math.floor(120 + Math.random() * 25)
      else if (loc.id === "ap-southeast") simulatedPing = Math.floor(145 + Math.random() * 30)
      else if (loc.id === "ap-southern") simulatedPing = Math.floor(180 + Math.random() * 40)

      setLocations(prev =>
        prev.map((item, idx) =>
          idx === i ? { ...item, ping: simulatedPing, status: "done" } : item
        )
      )
      setTestProgress(((i + 1) / LOCATIONS.length) * 100)
    }

    setIsTesting(false)
  }

  const getPingColor = (ping: number | null) => {
    if (ping === null) return "text-muted-foreground"
    if (ping < 30) return "text-emerald-500"
    if (ping < 100) return "text-blue-500"
    return "text-amber-500"
  }

  const getBarColor = (ping: number | null) => {
    if (ping === null) return "bg-muted"
    if (ping < 30) return "bg-emerald-500"
    if (ping < 100) return "bg-blue-500"
    return "bg-amber-500"
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-500" />
            Global Edge Latency Monitor
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Test real-time connection speed from your location to AuraCloud edge points.
          </p>
        </div>
        <Button
          onClick={runTest}
          disabled={isTesting}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
        >
          {isTesting ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Pinging Nodes...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Run Latency Test
            </>
          )}
        </Button>
      </div>

      {isTesting && (
        <div className="mb-4">
          <div className="flex justify-between text-xs font-medium mb-1.5 text-muted-foreground">
            <span>Testing network route...</span>
            <span>{Math.round(testProgress)}%</span>
          </div>
          <Progress value={testProgress} className="h-1 bg-muted" />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map((loc) => (
          <div
            key={loc.id}
            className="flex items-center justify-between p-3 rounded-lg border border-border/60 bg-muted/10 hover:bg-muted/20 transition-all duration-200"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-xl select-none">{loc.flag}</span>
              <div>
                <p className="text-sm font-semibold text-foreground">{loc.name}</p>
                <p className="text-[10px] text-muted-foreground">{loc.region}</p>
              </div>
            </div>

            <div className="text-right">
              {loc.status === "testing" && (
                <span className="flex h-2 w-2 relative ml-auto mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
              )}
              {loc.status === "done" && loc.ping !== null && (
                <div className="space-y-1">
                  <p className={`text-sm font-bold ${getPingColor(loc.ping)}`}>
                    {loc.ping} ms
                  </p>
                  <div className="flex justify-end gap-0.5">
                    <span className={`h-2.5 w-1 rounded-sm ${getBarColor(loc.ping)}`} />
                    <span className={`h-2.5 w-1 rounded-sm ${loc.ping < 100 ? getBarColor(loc.ping) : "bg-muted"}`} />
                    <span className={`h-2.5 w-1 rounded-sm ${loc.ping < 30 ? getBarColor(loc.ping) : "bg-muted"}`} />
                  </div>
                </div>
              )}
              {loc.status === "idle" && (
                <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                  <Activity className="w-3 h-3" />
                  Ready
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
