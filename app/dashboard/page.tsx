"use client"

import React, { useState, useEffect, useRef } from "react"
import { useApp, VirtualServer } from "@/context/AppContext"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Terminal,
  Server,
  Play,
  RotateCw,
  Power,
  Trash2,
  Cpu,
  HardDrive,
  Database,
  Plus,
  Activity,
  MapPin,
  RefreshCw,
  Search,
  AlertCircle,
  Clock,
  ExternalLink
} from "lucide-react"
import { toast } from "sonner"

export default function DashboardPage() {
  const {
    activeServers,
    rebootServer,
    toggleServerPower,
    deleteServer,
    deployServer
  } = useApp()

  const [selectedServerId, setSelectedServerId] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isDeployOpen, setIsDeployOpen] = useState(false)

  // Deploy Form States
  const [newName, setNewName] = useState("")
  const [newLocation, setNewLocation] = useState("Frankfurt, DE")
  const [newOS, setNewOS] = useState("Ubuntu 22.04 LTS")
  const [newCpu, setNewCpu] = useState("2")
  const [newRam, setNewRam] = useState("4")
  const [newSsd, setNewSsd] = useState("80")

  // Terminal state for selected server
  const [terminalLogs, setTerminalLogs] = useState<Record<string, string[]>>({})
  const [terminalInput, setTerminalInput] = useState("")
  const [isTrolled, setIsTrolled] = useState(false) // for sudo rm -rf /
  const terminalEndRef = useRef<HTMLDivElement>(null)

  // Set default selected server
  useEffect(() => {
    if (activeServers.length > 0 && !selectedServerId) {
      setSelectedServerId(activeServers[0].id)
    }
  }, [activeServers, selectedServerId])

  // Scroll terminal
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [terminalLogs, selectedServerId])

  const currentServer = activeServers.find((srv) => srv.id === selectedServerId)

  // Initialize terminal logs for a server if not present
  const getLogsForServer = (srvId: string) => {
    if (!terminalLogs[srvId]) {
      return [
        `Welcome to AuraCloud Web Terminal. Server ID: ${srvId}`,
        "Type 'help' to see available commands.",
        "System state: ONLINE"
      ]
    }
    return terminalLogs[srvId]
  }

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!terminalInput.trim() || !selectedServerId || !currentServer) return

    const cmd = terminalInput.trim().toLowerCase()
    const srvId = selectedServerId
    const currentLogs = getLogsForServer(srvId)
    const promptLine = `root@${currentServer.name}:~# ${terminalInput}`
    
    let response: string[] = []

    if (currentServer.status !== "running") {
      response = ["Error: Server is offline. Please power on the server to interact with the terminal."]
      setTerminalLogs(prev => ({
        ...prev,
        [srvId]: [...currentLogs, promptLine, ...response]
      }))
      setTerminalInput("")
      return
    }

    if (cmd === "help") {
      response = [
        "AuraCloud Shell v1.0 — Available Commands:",
        "  help                      Display this help manual",
        "  neofetch                  Show system hardware specifications",
        "  htop                      Display active processes & resources",
        "  uptime                    Show how long the system has been running",
        "  ping <ip/host>            Test network latency to a destination",
        "  sudo rm -rf /             WARNING: Do not run this command!",
        "  clear                     Clear terminal screen buffer"
      ]
    } else if (cmd === "neofetch") {
      response = [
        "            .-/.          root@" + currentServer.name,
        "           /++++/         -----------------",
        "          /++++++/        OS: " + currentServer.os,
        "         /++++/++/        Kernel: 5.15.0-88-generic",
        "        /++++/++++/       Uptime: " + Math.floor(currentServer.uptime / 3600) + "h " + Math.floor((currentServer.uptime % 3600) / 60) + "m",
        "       /++++/++++++/      Packages: 588 (dpkg)",
        "      /++++/++++/++/      Shell: bash 5.1.16",
        "     /++++/++++/++++/     CPU: AMD EPYC 9654 (" + currentServer.cpu + ") @ 2.40GHz",
        "    /++++/++++/++++++/    Memory: " + (currentServer.ram * 0.3).toFixed(1) + "GB / " + currentServer.ram + "GB (30%)",
        "   /++++/++++/++++/++/    Storage: " + (currentServer.ssd * 0.15).toFixed(0) + "GB / " + currentServer.ssd + "GB (15%)"
      ]
    } else if (cmd === "htop") {
      response = [
        "  CPU[|||||||                    14.2%]    Tasks: 42, 1 running",
        "  Mem[|||||||||||          1.2G/4.0G]    Load average: 0.12 0.08 0.05",
        "  Swp[                           0K/0K]    Uptime: " + Math.floor(currentServer.uptime / 3600) + "h",
        "",
        "    PID USER      PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command",
        "   1204 root       20   0  14.2M  4.2M  3.1M S  0.5  0.1  0:12.42 nginx: master",
        "   1402 postgres   20   0   244M  142M  12M S  0.2  3.5  1:42.08 postgres: pool",
        "   1101 root       20   0  12.4M  1.2M  1.0M S  0.0  0.0  0:04.12 docker-daemon",
        "   1504 root       20   0  42.1M  8.4M  4.2M R  1.2  0.2  0:00.02 htop"
      ]
    } else if (cmd === "uptime") {
      response = [`System uptime: ${Math.floor(currentServer.uptime / 3600)} hours, ${Math.floor((currentServer.uptime % 3600) / 60)} minutes.`]
    } else if (cmd.startsWith("ping ")) {
      const host = terminalInput.split(" ")[1] || "auracloud.site"
      response = [
        `PING ${host} (185.112.144.22) 56(84) bytes of data.`,
        `64 bytes from ${host}: icmp_seq=1 ttl=56 time=12.4 ms`,
        `64 bytes from ${host}: icmp_seq=2 ttl=56 time=11.8 ms`,
        `64 bytes from ${host}: icmp_seq=3 ttl=56 time=14.1 ms`,
        `--- ${host} ping statistics ---`,
        `3 packets transmitted, 3 received, 0% packet loss, time 2003ms`,
        `rtt min/avg/max/mdev = 11.8/12.7/14.1/0.98 ms`
      ]
    } else if (cmd === "clear") {
      setTerminalLogs(prev => ({
        ...prev,
        [srvId]: []
      }))
      setTerminalInput("")
      return
    } else if (cmd === "sudo rm -rf /") {
      setIsTrolled(true)
      response = [
        "WARNING: ACCESS GRANTED. EXECUTING SYSTEM DESTRUCTION...",
        "rm: deleting /etc/passwd...",
        "rm: deleting /var/log...",
        "rm: deleting /boot/vmlinuz...",
        "rm: deleting /sys/kernel...",
        "rm: deleting /home/root...",
        "rm: deleting /lib/security...",
        "CRITICAL ERROR: KERNEL PANIC. SYSTEM CRASHED.",
        "CONNECTION LOST."
      ]

      setTerminalLogs(prev => ({
        ...prev,
        [srvId]: [...currentLogs, promptLine, ...response]
      }))
      setTerminalInput("")

      setTimeout(() => {
        setIsTrolled(false)
        setTerminalLogs(prev => ({
          ...prev,
          [srvId]: [
            "========================================",
            "AuraCloud Recovery Console v1.0",
            "System files restored from off-site backup snapshot.",
            "Server rebooted successfully.",
            "========================================"
          ]
        }))
        toast.success("System restored automatically from snapshot backup!")
      }, 5000)
      return
    } else {
      response = [`bash: ${cmd}: command not found. Type 'help' to see available commands.`]
    }

    setTerminalLogs(prev => ({
      ...prev,
      [srvId]: [...currentLogs, promptLine, ...response]
    }))
    setTerminalInput("")
  }

  const handleQuickDeploy = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim()) {
      toast.error("Please enter a server name.")
      return
    }

    const cleanName = newName.toLowerCase().replace(/[^a-z0-9-]/g, "-")

    deployServer({
      name: cleanName,
      status: "provisioning",
      location: newLocation,
      os: newOS,
      cpu: parseInt(newCpu),
      ram: parseInt(newRam),
      ssd: parseInt(newSsd),
    })

    setIsDeployOpen(false)
    setNewName("")

    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 4000)),
      {
        loading: "Provisioning virtual cloud server...",
        success: "New cloud server deployed and online!",
        error: "Failed to deploy server.",
      }
    )
  }

  // Filter servers based on search query
  const filteredServers = activeServers.filter((srv) =>
    srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    srv.ipAddress.includes(searchQuery) ||
    srv.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl flex items-center gap-2">
            <Server className="w-7 h-7 text-blue-500" />
            AuraCloud Management Panel
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Reboot, monitor, and scale your virtual private servers globally from one unified workspace.
          </p>
        </div>

        {/* Deploy Dialog */}
        <Dialog open={isDeployOpen} onOpenChange={setIsDeployOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-5">
              <Plus className="w-4 h-4 mr-1.5" />
              Deploy Cloud Node
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-background border border-border sm:rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">Deploy New Virtual Server</DialogTitle>
              <DialogDescription>Instantly provision KVM slices globally</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleQuickDeploy} className="space-y-4 pt-2">
              <div className="space-y-1">
                <Label htmlFor="srv-name">Server Name</Label>
                <Input
                  id="srv-name"
                  placeholder="e.g. staging-api-node"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Region Location</Label>
                  <Select value={newLocation} onValueChange={setNewLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="Frankfurt, DE">Frankfurt 🇩🇪</SelectItem>
                      <SelectItem value="New York, US">New York 🇺🇸</SelectItem>
                      <SelectItem value="London, GB">London 🇬🇧</SelectItem>
                      <SelectItem value="Tokyo, JP">Tokyo 🇯🇵</SelectItem>
                      <SelectItem value="Singapore, SG">Singapore 🇸🇬</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label>Operating System</Label>
                  <Select value={newOS} onValueChange={setNewOS}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select OS" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="Ubuntu 22.04 LTS">Ubuntu 22.04 LTS</SelectItem>
                      <SelectItem value="Debian 12">Debian 12</SelectItem>
                      <SelectItem value="Rocky Linux 9">Rocky Linux 9</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label>vCPU cores</Label>
                  <Select value={newCpu} onValueChange={setNewCpu}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="1">1 Core</SelectItem>
                      <SelectItem value="2">2 Cores</SelectItem>
                      <SelectItem value="4">4 Cores</SelectItem>
                      <SelectItem value="8">8 Cores</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label>RAM memory</Label>
                  <Select value={newRam} onValueChange={setNewRam}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="2">2 GB</SelectItem>
                      <SelectItem value="4">4 GB</SelectItem>
                      <SelectItem value="8">8 GB</SelectItem>
                      <SelectItem value="16">16 GB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label>SSD storage</Label>
                  <Select value={newSsd} onValueChange={setNewSsd}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="40">40 GB</SelectItem>
                      <SelectItem value="80">80 GB</SelectItem>
                      <SelectItem value="160">160 GB</SelectItem>
                      <SelectItem value="320">320 GB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2">
                Deploy Server Now
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Server List (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search servers by name/IP..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 text-sm"
            />
          </div>

          <ScrollArea className="h-[480px] lg:h-[600px] rounded-xl border p-2 bg-card">
            {filteredServers.length === 0 ? (
              <div className="text-center py-12 space-y-2">
                <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto" />
                <p className="text-sm font-semibold">No servers found</p>
                <p className="text-xs text-muted-foreground">Try a different search term or deploy a new node.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredServers.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => setSelectedServerId(srv.id)}
                    className={`w-full text-left p-3.5 rounded-lg border transition-all duration-200 flex items-center justify-between gap-3 ${
                      selectedServerId === srv.id
                        ? "border-blue-600 bg-blue-600/5 ring-1 ring-blue-600"
                        : "border-border hover:bg-muted/40"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-2 rounded ${selectedServerId === srv.id ? "bg-blue-500/10 text-blue-500" : "bg-muted text-muted-foreground"}`}>
                        <Server className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm text-foreground truncate">{srv.name}</p>
                        <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{srv.ipAddress}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      {srv.status === "running" && (
                        <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5 text-[10px] text-emerald-500 font-medium">
                          <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                          Running
                        </span>
                      )}
                      {srv.status === "stopped" && (
                        <span className="inline-flex items-center gap-1 bg-zinc-500/10 border border-zinc-500/20 rounded-full px-2 py-0.5 text-[10px] text-zinc-500 font-medium">
                          <span className="h-1 w-1 rounded-full bg-zinc-500" />
                          Stopped
                        </span>
                      )}
                      {srv.status === "rebooting" && (
                        <span className="inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 rounded-full px-2 py-0.5 text-[10px] text-amber-500 font-medium">
                          <RotateCw className="w-2.5 h-2.5 animate-spin text-amber-500" />
                          Rebooting
                        </span>
                      )}
                      {srv.status === "provisioning" && (
                        <span className="inline-flex items-center gap-1 bg-blue-500/10 border border-blue-500/20 rounded-full px-2 py-0.5 text-[10px] text-blue-500 font-medium">
                          <RefreshCw className="w-2.5 h-2.5 animate-spin text-blue-500" />
                          Deploying
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Right Side: Detailed Server Console (8 cols) */}
        <div className="lg:col-span-8">
          {currentServer ? (
            <div className="space-y-6">
              {/* Server Details Card */}
              <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold">{currentServer.name}</h2>
                      <span className="text-[10px] font-mono bg-muted border rounded px-1.5 py-0.5 text-muted-foreground">
                        {currentServer.id}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-500" /> {currentServer.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-500" /> IP: <span className="font-mono font-bold text-foreground">{currentServer.ipAddress}</span>
                      </span>
                      <span>OS: {currentServer.os}</span>
                    </div>
                  </div>

                  {/* Server Lifecycle Actions */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => rebootServer(currentServer.id)}
                      disabled={currentServer.status !== "running"}
                      variant="outline"
                      size="sm"
                      className="text-xs border-border/80 h-9"
                    >
                      <RotateCw className="w-3.5 h-3.5 mr-1.5" />
                      Reboot
                    </Button>
                    <Button
                      onClick={() => toggleServerPower(currentServer.id)}
                      disabled={currentServer.status === "rebooting" || currentServer.status === "provisioning"}
                      variant={currentServer.status === "running" ? "destructive" : "default"}
                      size="sm"
                      className={`text-xs h-9 ${currentServer.status !== "running" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}`}
                    >
                      <Power className="w-3.5 h-3.5 mr-1.5" />
                      {currentServer.status === "running" ? "Power Off" : "Power On"}
                    </Button>
                    <Button
                      onClick={() => deleteServer(currentServer.id)}
                      variant="outline"
                      size="sm"
                      className="text-xs border-destructive/20 hover:border-destructive hover:bg-destructive/10 text-destructive h-9"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Specs Counters */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  <div className="p-3 bg-muted/25 border rounded-lg">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">vCPU cores</p>
                    <p className="text-lg font-extrabold text-foreground mt-1 flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-blue-500" /> {currentServer.cpu} Cores
                    </p>
                  </div>
                  <div className="p-3 bg-muted/25 border rounded-lg">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">System RAM</p>
                    <p className="text-lg font-extrabold text-foreground mt-1 flex items-center gap-1.5">
                      <Database className="w-4 h-4 text-blue-500" /> {currentServer.ram} GB
                    </p>
                  </div>
                  <div className="p-3 bg-muted/25 border rounded-lg">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">NVMe SSD</p>
                    <p className="text-lg font-extrabold text-foreground mt-1 flex items-center gap-1.5">
                      <HardDrive className="w-4 h-4 text-blue-500" /> {currentServer.ssd} GB
                    </p>
                  </div>
                  <div className="p-3 bg-muted/25 border rounded-lg">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Bandwidth Limit</p>
                    <p className="text-lg font-extrabold text-foreground mt-1 flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-blue-500" /> {currentServer.bandwidthLimit} GB
                    </p>
                  </div>
                </div>
              </div>

              {/* Server Tabs */}
              <Tabs defaultValue="monitoring" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-muted/50 border">
                  <TabsTrigger value="monitoring" className="flex items-center gap-1.5">
                    <Activity className="w-4 h-4" /> Live Monitoring
                  </TabsTrigger>
                  <TabsTrigger value="terminal" className="flex items-center gap-1.5">
                    <Terminal className="w-4 h-4" /> SSH Terminal
                  </TabsTrigger>
                </TabsList>

                {/* MONITORING TAB */}
                <TabsContent value="monitoring" className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* RAM & CPU Performance Metrics */}
                    <Card className="border">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-bold">Resources Performance</CardTitle>
                        <CardDescription>Simulated live resource utilization</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Simulated Live CPU */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-muted-foreground">CPU Load</span>
                            <span>{currentServer.status === "running" ? "12%" : "0%"}</span>
                          </div>
                          <Progress value={currentServer.status === "running" ? 12 : 0} className="h-2 bg-muted" />
                        </div>

                        {/* Simulated Live RAM */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-muted-foreground">RAM Usage</span>
                            <span>{currentServer.status === "running" ? "1.8 GB / " + currentServer.ram + " GB" : "0 GB"}</span>
                          </div>
                          <Progress value={currentServer.status === "running" ? (1.8 / currentServer.ram) * 100 : 0} className="h-2 bg-muted" />
                        </div>

                        {/* Simulated Storage */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-muted-foreground">NVMe SSD Storage</span>
                            <span>{currentServer.status === "running" ? "8.4 GB / " + currentServer.ssd + " GB" : "0 GB"}</span>
                          </div>
                          <Progress value={currentServer.status === "running" ? (8.4 / currentServer.ssd) * 100 : 0} className="h-2 bg-muted" />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Network & Traffic */}
                    <Card className="border">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-bold">Network & Bandwidth</CardTitle>
                        <CardDescription>Monthly data transfer quota</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-muted-foreground">Bandwidth Used</span>
                            <span>{currentServer.bandwidthUsed} GB / {currentServer.bandwidthLimit} GB</span>
                          </div>
                          <Progress
                            value={(currentServer.bandwidthUsed / currentServer.bandwidthLimit) * 100}
                            className={`h-2 bg-muted ${
                              currentServer.bandwidthUsed > currentServer.bandwidthLimit ? "bg-destructive" : ""
                            }`}
                          />
                        </div>

                        <div className="p-3 bg-muted/20 border rounded-lg text-xs leading-relaxed space-y-1">
                          <p className="font-bold flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5 text-blue-500" /> Net port allocation:
                          </p>
                          <p className="text-muted-foreground">
                            This server is connected to a <span className="font-bold text-foreground">10Gbps public port</span> with unlimited free inbound traffic. Outbound traffic is throttled to 100Mbps once the quota is exceeded.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* SSH TERMINAL TAB */}
                <TabsContent value="terminal" className="pt-4">
                  <div className={`flex flex-col bg-zinc-950 rounded-xl border border-zinc-800 p-4 h-[340px] relative overflow-hidden ${isTrolled ? "animate-shake" : ""}`}>
                    <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-zinc-800">
                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                        <Terminal className="w-4 h-4 text-emerald-500" />
                        <span>bash — root@{currentServer.name}</span>
                      </div>
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                        <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                        <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                      </div>
                    </div>

                    {/* Logs */}
                    <div className="flex-1 overflow-y-auto pr-1 font-mono text-xs text-emerald-400 space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-800">
                      {getLogsForServer(currentServer.id).map((log, idx) => (
                        <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                          {log}
                        </div>
                      ))}
                      <div ref={terminalEndRef} />
                    </div>

                    {/* Prompt input */}
                    <form onSubmit={handleCommandSubmit} className="pt-3 border-t border-zinc-800 mt-2 flex items-center gap-2">
                      <span className="text-zinc-500 font-mono text-xs select-none">root@{currentServer.name}:~#</span>
                      <input
                        type="text"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        placeholder="Type 'help'..."
                        disabled={isTrolled}
                        className="flex-1 bg-transparent border-0 outline-none focus:ring-0 text-xs font-mono text-emerald-400"
                      />
                    </form>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="text-center py-24 border border-dashed rounded-xl bg-card">
              <Server className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-lg font-bold">No Server Selected</h2>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1">
                Deploy a new virtual cloud server or choose an active node from the left sidebar to access its console panel.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
