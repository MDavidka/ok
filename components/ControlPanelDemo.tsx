"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import {
  Terminal,
  Play,
  RotateCw,
  Power,
  Server,
  Cpu,
  HardDrive,
  Database,
  Activity,
  CheckCircle,
  AlertTriangle
} from "lucide-react"
import { toast } from "sonner"

export default function ControlPanelDemo() {
  const [status, setStatus] = useState<"running" | "stopped" | "rebooting">("running")
  const [cpuUsage, setCpuUsage] = useState(18)
  const [ramUsage, setRamUsage] = useState(2.4) // in GB
  const [backupsEnabled, setBackupsEnabled] = useState(true)
  
  // Terminal state
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "auracloud-kvm-hypervisor v2.4.1 connected.",
    "System boot successful.",
    "IPv4 Address: 142.250.190.46 allocated.",
    "Nginx Reverse Proxy: OK [Port 80/443]",
    "PostgreSQL Database Service: OK [Port 5432]",
    "Docker Daemon: OK",
    "Server status: RUNNING. Click commands below to interact."
  ])
  const terminalEndRef = useRef<HTMLDivElement>(null)

  // Simulate live CPU and RAM fluctuations
  useEffect(() => {
    if (status !== "running") {
      setCpuUsage(0)
      setRamUsage(0)
      return
    }

    const interval = setInterval(() => {
      setCpuUsage(Math.floor(12 + Math.random() * 15))
      setRamUsage(parseFloat((2.3 + Math.random() * 0.3).toFixed(2)))
    }, 2000)

    return () => clearInterval(interval)
  }, [status])

  // Scroll terminal to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [terminalLogs])

  const appendLog = (line: string) => {
    setTerminalLogs((prev) => [...prev, `root@aura-node:~# ${line}`])
  }

  const runCommand = (cmd: string) => {
    if (status !== "running") {
      toast.error("Cannot run commands. Server is powered off.")
      return
    }

    appendLog(cmd)

    setTimeout(() => {
      let output: string[] = []
      if (cmd === "neofetch") {
        output = [
          "            .-/.          root@aura-node-01",
          "           /++++/         -----------------",
          "          /++++++/        OS: Ubuntu 22.04 LTS x86_64",
          "         /++++/++/        Kernel: 5.15.0-88-generic",
          "        /++++/++++/       Uptime: 14 days, 3 hours",
          "       /++++/++++++/      Packages: 612 (dpkg)",
          "      /++++/++++/++/      Shell: bash 5.1.16",
          "     /++++/++++/++++/     CPU: AMD EPYC 9654 (2) @ 2.40GHz",
          "    /++++/++++/++++++/    GPU: AuraCloud virtual SVG-Grid",
          "   /++++/++++/++++/++/    Memory: 2451MiB / 8192MiB (30%)"
        ]
      } else if (cmd === "df -h") {
        output = [
          "Filesystem      Size  Used Avail Use% Mounted on",
          "/dev/vda1       160G   24G  136G  15% /",
          "tmpfs           4.0G     0  4.0G   0% /dev/shm",
          "/dev/vdb1       200G   12G  188G   6% /mnt/backups"
        ]
      } else if (cmd === "systemctl status nginx") {
        output = [
          "● nginx.service - A high performance web server and a reverse proxy server",
          "     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)",
          "     Active: active (running) since Mon 2024-10-14 08:31:12 UTC; 2 weeks ago",
          "   Main PID: 1204 (nginx)",
          "      Tasks: 3 (limit: 4663)",
          "     Memory: 14.2M",
          "        CPU: 1min 12s",
          "     CGroup: /system.slice/nginx.service",
          "             ├─1204 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;",
          "             └─1205 nginx: worker process"
        ]
      } else if (cmd === "docker ps") {
        output = [
          "CONTAINER ID   IMAGE          COMMAND                  CREATED       STATUS       PORTS",
          "f3183aa129e1   postgres:15    \"docker-entrypoint.s…\"   6 days ago    Up 6 days    0.0.0.0:5432->5432/tcp",
          "a91448b191ff   redis:alpine   \"docker-entrypoint.s…\"   6 days ago    Up 6 days    6379/tcp"
        ]
      }

      setTerminalLogs((prev) => [...prev, ...output])
    }, 300)
  }

  const handleReboot = () => {
    if (status === "rebooting") return
    setStatus("rebooting")
    appendLog("reboot")
    setTerminalLogs((prev) => [
      ...prev,
      "*** Broadcast message from systemd ***",
      "The system is going down for reboot NOW!",
      "Shutting down service Nginx...",
      "Shutting down service PostgreSQL Database...",
      "Unmounting storage volumes...",
      "Rebooting virtual machine container..."
    ])

    setTimeout(() => {
      setStatus("running")
      setTerminalLogs((prev) => [
        ...prev,
        "========================================",
        "Aura KVM Bootloader v2.4.1",
        "Loading Linux Kernel 5.15.0-88-generic...",
        "Mounting NVMe SSD storage...",
        "System services active. System Online!",
        "========================================"
      ])
      toast.success("Server successfully rebooted!")
    }, 3500)
  }

  const handlePowerToggle = () => {
    if (status === "rebooting") return
    if (status === "running") {
      setStatus("stopped")
      appendLog("poweroff")
      setTerminalLogs((prev) => [
        ...prev,
        "Powering off server...",
        "ACPI shutdown signal received.",
        "System halted."
      ])
      toast.success("Server powered off.")
    } else {
      setStatus("running")
      setTerminalLogs((prev) => [
        ...prev,
        "Powering on server...",
        "Aura KVM Bootloader v2.4.1 starting...",
        "System services active. System Online!"
      ])
      toast.success("Server powered on.")
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-xl border border-border bg-card p-6 shadow-sm overflow-hidden">
      {/* Metrics & Control Card (5 cols) */}
      <div className="lg:col-span-5 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-blue-500" />
            <div>
              <h3 className="text-sm font-bold text-foreground">production-api-node</h3>
              <p className="text-[10px] text-muted-foreground font-mono">IP: 142.250.190.46</p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="text-right">
            {status === "running" && (
              <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-0.5 text-xs text-emerald-500 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Running
              </span>
            )}
            {status === "stopped" && (
              <span className="inline-flex items-center gap-1 bg-zinc-500/10 border border-zinc-500/20 rounded-full px-2.5 py-0.5 text-xs text-zinc-500 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
                Stopped
              </span>
            )}
            {status === "rebooting" && (
              <span className="inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 rounded-full px-2.5 py-0.5 text-xs text-amber-500 font-medium">
                <RotateCw className="h-3 w-3 animate-spin text-amber-500" />
                Rebooting
              </span>
            )}
          </div>
        </div>

        <div className="space-y-4 border-y py-4 border-border/60">
          {/* CPU Metric */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Cpu className="w-3.5 h-3.5" />
                CPU Core Allocation
              </span>
              <span>{cpuUsage}%</span>
            </div>
            <Progress value={cpuUsage} className="h-2 bg-muted" />
          </div>

          {/* RAM Metric */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Database className="w-3.5 h-3.5" />
                Memory (RAM)
              </span>
              <span>{ramUsage} GB / 8.0 GB</span>
            </div>
            <Progress value={(ramUsage / 8.0) * 100} className="h-2 bg-muted" />
          </div>

          {/* SSD Metric */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <HardDrive className="w-3.5 h-3.5" />
                NVMe Enterprise SSD
              </span>
              <span>24 GB / 160 GB</span>
            </div>
            <Progress value={(24 / 160) * 100} className="h-2 bg-muted" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleReboot}
            disabled={status !== "running"}
            variant="outline"
            size="sm"
            className="text-xs border-border/80"
          >
            <RotateCw className="w-3.5 h-3.5 mr-2" />
            Reboot Server
          </Button>
          <Button
            onClick={handlePowerToggle}
            disabled={status === "rebooting"}
            variant={status === "running" ? "destructive" : "default"}
            size="sm"
            className={`text-xs ${status !== "running" ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}`}
          >
            <Power className="w-3.5 h-3.5 mr-2" />
            {status === "running" ? "Power Off" : "Power On"}
          </Button>
        </div>

        {/* Backups Toggle */}
        <div className="flex items-center justify-between p-3.5 rounded-lg bg-muted/20 border border-border/60">
          <div className="space-y-0.5">
            <p className="text-xs font-bold">Automated Daily Backups</p>
            <p className="text-[10px] text-muted-foreground">Incremental snapshots stored off-site</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-blue-500">+$2.00/mo</span>
            <Switch
              checked={backupsEnabled}
              onCheckedChange={(checked) => {
                setBackupsEnabled(checked)
                toast.success(checked ? "Automated backups enabled." : "Automated backups disabled.")
              }}
            />
          </div>
        </div>
      </div>

      {/* Terminal Column (7 cols) */}
      <div className="lg:col-span-7 flex flex-col bg-zinc-950 rounded-lg border border-zinc-800 p-4 h-[300px] lg:h-auto">
        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Terminal className="w-4 h-4 text-emerald-500" />
            <span>bash — root@aura-node-01</span>
          </div>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          </div>
        </div>

        {/* Terminal Text Screen */}
        <div className="flex-1 overflow-y-auto pr-1 font-mono text-xs text-emerald-400 space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-800">
          {terminalLogs.map((log, idx) => (
            <div key={idx} className="whitespace-pre-wrap leading-relaxed">
              {log}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Quick Command Buttons */}
        <div className="pt-3 border-t border-zinc-800 mt-2 flex flex-wrap gap-2">
          <span className="text-[10px] text-zinc-500 font-mono flex items-center mr-1">Quick commands:</span>
          <Button
            onClick={() => runCommand("neofetch")}
            variant="outline"
            className="h-6 px-2 text-[10px] font-mono border-zinc-800 text-zinc-300 hover:text-emerald-400 hover:bg-zinc-900 bg-zinc-950"
          >
            neofetch
          </Button>
          <Button
            onClick={() => runCommand("df -h")}
            variant="outline"
            className="h-6 px-2 text-[10px] font-mono border-zinc-800 text-zinc-300 hover:text-emerald-400 hover:bg-zinc-900 bg-zinc-950"
          >
            df -h
          </Button>
          <Button
            onClick={() => runCommand("systemctl status nginx")}
            variant="outline"
            className="h-6 px-2 text-[10px] font-mono border-zinc-800 text-zinc-300 hover:text-emerald-400 hover:bg-zinc-900 bg-zinc-950"
          >
            nginx status
          </Button>
          <Button
            onClick={() => runCommand("docker ps")}
            variant="outline"
            className="h-6 px-2 text-[10px] font-mono border-zinc-800 text-zinc-300 hover:text-emerald-400 hover:bg-zinc-900 bg-zinc-950"
          >
            docker ps
          </Button>
        </div>
      </div>
    </div>
  )
}
