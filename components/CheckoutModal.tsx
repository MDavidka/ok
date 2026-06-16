"use client"

import React, { useState, useEffect } from "react"
import { useApp, CartItem } from "@/context/AppContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Server, ShieldCheck, Cpu, Globe, CheckCircle2, Loader2, CreditCard } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, discountPercent, clearCart, deployServer } = useApp()
  const [step, setStep] = useState(1) // 1: Review, 2: Account, 3: Payment, 4: Provisioning, 5: Success
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvv, setCardCvv] = useState("")
  
  // Provisioning state
  const [provisioningProgress, setProvisioningProgress] = useState(0)
  const [provisioningLog, setProvisioningLog] = useState<string[]>([])
  const router = useRouter()

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0)
  const discount = (subtotal * discountPercent) / 100
  const total = subtotal - discount

  // Reset modal on close/open
  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setProvisioningProgress(0)
      setProvisioningLog([])
    }
  }, [isOpen])

  // Provisioning simulation logs
  const logs = [
    "Initializing deployment sequencer...",
    "Connecting to AuraCloud secure API gateway...",
    "Authenticating user credentials & network access token...",
    "Allocating virtual hardware slice (KVM Hypervisor)...",
    "Binding private IP address and configuring DNS records...",
    "Injecting cloud-init configuration files...",
    "Installing base Operating System image...",
    "Setting up secure SSH keys and firewall profiles...",
    "Starting system services & mounting NVMe storage block...",
    "Running system diagnostics (Latency, CPU, I/O bandwidth)...",
    "Server is online and fully operational!"
  ]

  const handleNextStep = () => {
    if (step === 2) {
      if (!name || !email) {
        toast.error("Please fill in all account fields.")
        return
      }
      if (!email.includes("@")) {
        toast.error("Please enter a valid email address.")
        return
      }
    }
    if (step === 3) {
      if (!cardNumber || !cardExpiry || !cardCvv) {
        toast.error("Please fill in all payment fields.")
        return
      }
      // Trigger provisioning
      setStep(4)
      startProvisioning()
      return
    }
    setStep(step + 1)
  }

  const startProvisioning = () => {
    let currentLogIndex = 0
    let progress = 0

    const logInterval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setProvisioningLog((prev) => [...prev, logs[currentLogIndex]])
        currentLogIndex++
      }
    }, 800)

    const progressInterval = setInterval(() => {
      progress += 2
      setProvisioningProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          clearInterval(logInterval)
          
          // Complete provisioning: deploy servers from cart
          cart.forEach((item) => {
            if (item.type === "vps") {
              deployServer({
                name: item.details.domain || item.name.toLowerCase().replace(/\s+/g, "-"),
                status: "running",
                location: item.details.location || "Frankfurt, DE",
                os: item.details.os || "Ubuntu 22.04 LTS",
                cpu: item.details.cpu || 2,
                ram: item.details.ram || 4,
                ssd: item.details.ssd || 80,
                bandwidthLimit: item.details.bandwidth || 1000,
              })
            }
          })

          setStep(5)
          clearCart()
          toast.success("All services provisioned successfully!")
          return 100
        }
        return prev + 2
      })
    }, 150)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl bg-background border-border p-6 sm:rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-500" />
            Secure Checkout
          </DialogTitle>
          <DialogDescription>
            {step < 4 && `Step ${step} of 3 — Complete your AuraCloud deployment`}
            {step === 4 && "Provisioning your resources..."}
            {step === 5 && "Deployment Complete!"}
          </DialogDescription>
        </DialogHeader>

        {/* STEP 1: REVIEW ORDER */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="rounded-lg border bg-muted/30 p-4 space-y-3 max-h-[220px] overflow-y-auto">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Order Items</h3>
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm py-1 border-b last:border-0 border-border/40">
                  <div>
                    <p className="font-medium flex items-center gap-2">
                      {item.type === "vps" && <Server className="w-3.5 h-3.5 text-blue-500" />}
                      {item.type === "domain" && <Globe className="w-3.5 h-3.5 text-emerald-500" />}
                      {item.type === "plan" && <Cpu className="w-3.5 h-3.5 text-purple-500" />}
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.type === "vps" && `${item.details.cpu} Cores / ${item.details.ram}GB RAM / ${item.details.ssd}GB SSD — ${item.details.location}`}
                      {item.type === "domain" && `Domain Registration (1 Year)`}
                      {item.type === "plan" && `Shared Cloud Hosting Plan`}
                    </p>
                  </div>
                  <span className="font-semibold text-foreground">
                    ${item.price}/{item.billingCycle === "monthly" ? "mo" : "yr"}
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing math */}
            <div className="space-y-2 pt-2 border-t text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}/mo</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-500 font-medium">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-${discount.toFixed(2)}/mo</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-foreground pt-1 border-t">
                <span>Total Due</span>
                <span>${total.toFixed(2)}/mo</span>
              </div>
            </div>

            <Button onClick={handleNextStep} className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4">
              Continue to Account Details
            </Button>
          </div>
        )}

        {/* STEP 2: ACCOUNT CREATION */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="checkout-name">Full Name</Label>
                <Input
                  id="checkout-name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="checkout-email">Email Address</Label>
                <Input
                  id="checkout-email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs text-blue-500 leading-relaxed">
                Your email will be used to send SSH login credentials, billing receipts, and server status notifications.
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleNextStep} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                Proceed to Payment
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: PAYMENT */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 border p-3 rounded-lg bg-muted/20 border-blue-500/30">
                <CreditCard className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-semibold">Credit or Debit Card</span>
              </div>

              <div className="space-y-1">
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  placeholder="4111 2222 3333 4444"
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="card-expiry">Expiration Date</Label>
                  <Input
                    id="card-expiry"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="card-cvv">CVV</Label>
                  <Input
                    id="card-cvv"
                    type="password"
                    placeholder="123"
                    maxLength={4}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleNextStep} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                Pay & Deploy (${total.toFixed(2)})
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: PROVISIONING TERMINAL ANIMATION */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                  Deploying Resources...
                </span>
                <span>{provisioningProgress}%</span>
              </div>
              <Progress value={provisioningProgress} className="h-2 bg-muted" />
            </div>

            {/* Simulated terminal logs */}
            <div className="bg-zinc-950 text-emerald-400 font-mono p-4 rounded-lg text-xs space-y-1.5 h-[180px] overflow-y-auto border border-zinc-800 scrollbar-thin scrollbar-thumb-zinc-800">
              {provisioningLog.map((log, index) => (
                <div key={index} className="flex items-start gap-1.5 animate-fadeIn">
                  <span className="text-zinc-500 select-none">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: SUCCESS SCREEN */}
        {step === 5 && (
          <div className="text-center py-6 space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500">
                <CheckCircle2 className="w-10 h-10" />
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-xl font-bold">Deployments Successful!</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Your virtual servers have been successfully provisioned. SSH details and access keys have been sent to <span className="font-semibold text-foreground">{email}</span>.
              </p>
            </div>

            <div className="flex gap-3 pt-4 max-w-sm mx-auto">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Close
              </Button>
              <Button
                onClick={() => {
                  onClose()
                  router.push("/dashboard")
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Go to Cloud Panel
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
