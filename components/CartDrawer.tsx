"use client"

import React, { useState } from "react"
import { useApp } from "@/context/AppContext"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Trash2, ShoppingCart, Server, Globe, Cpu, Tag, ArrowRight } from "lucide-react"
import CheckoutModal from "./CheckoutModal"

export default function CartDrawer() {
  const { cart, isCartOpen, setCartOpen, removeFromCart, promoCode, discountPercent, applyPromo } = useApp()
  const [promoInput, setPromoInput] = useState("")
  const [isCheckoutOpen, setCheckoutOpen] = useState(false)

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0)
  const discount = (subtotal * discountPercent) / 100
  const total = subtotal - discount

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!promoInput) return
    applyPromo(promoInput)
    setPromoInput("")
  }

  return (
    <>
      <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="w-full sm:max-w-md bg-background border-l border-border p-6 flex flex-col h-full">
          <SheetHeader className="pb-4">
            <SheetTitle className="flex items-center gap-2 text-xl font-bold">
              <ShoppingCart className="w-5 h-5 text-blue-500" />
              Your Deployment Queue
            </SheetTitle>
            <SheetDescription>
              Review your AuraCloud servers, domains, and plans before provisioning.
            </SheetDescription>
          </SheetHeader>

          <Separator />

          {/* CART ITEMS */}
          <div className="flex-1 min-h-0 py-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-muted/40 flex items-center justify-center text-muted-foreground">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">Your queue is empty</p>
                  <p className="text-xs text-muted-foreground max-w-[250px]">
                    Configure a custom cloud server or find a domain name to get started.
                  </p>
                </div>
              </div>
            ) : (
              <ScrollArea className="h-full pr-3">
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-lg border border-border/60 bg-muted/10 hover:bg-muted/20 transition-colors flex items-start gap-3 relative group"
                    >
                      <div className="mt-0.5 p-2 rounded bg-blue-500/10 text-blue-500">
                        {item.type === "vps" && <Server className="w-4 h-4" />}
                        {item.type === "domain" && <Globe className="w-4 h-4 text-emerald-500" />}
                        {item.type === "plan" && <Cpu className="w-4 h-4 text-purple-500" />}
                      </div>

                      <div className="flex-1 min-w-0 pr-6">
                        <p className="font-medium text-sm text-foreground truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                          {item.type === "vps" &&
                            `${item.details.cpu} vCPUs / ${item.details.ram}GB RAM / ${item.details.ssd}GB NVMe — ${item.details.location}`}
                          {item.type === "domain" && `Domain registration (1 year)`}
                          {item.type === "plan" && `Shared Cloud Hosting`}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs font-semibold text-foreground">
                            ${item.price.toFixed(2)}/{item.billingCycle === "monthly" ? "mo" : "yr"}
                          </span>
                          <span className="text-[10px] uppercase bg-muted px-1.5 py-0.5 rounded text-muted-foreground font-medium">
                            {item.billingCycle}
                          </span>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="absolute right-2 top-2 h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>

          {cart.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-border">
              {/* PROMO CODE */}
              <form onSubmit={handlePromoSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={promoCode ? `Applied: ${promoCode}` : "Promo code (AURA30)"}
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="pl-9 text-sm"
                    disabled={!!promoCode}
                  />
                </div>
                <Button type="submit" variant="outline" size="sm" disabled={!!promoCode}>
                  Apply
                </Button>
              </form>

              {/* PRICE SUMMARY */}
              <div className="space-y-2 text-sm">
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
                <div className="flex justify-between text-base font-bold text-foreground pt-2 border-t">
                  <span>Total Recurring</span>
                  <span>${total.toFixed(2)}/mo</span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="space-y-2 pt-2">
                <Button
                  onClick={() => {
                    setCartOpen(false)
                    setCheckoutOpen(true)
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 group py-5"
                >
                  Configure & Deploy
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setCartOpen(false)}
                  className="w-full text-xs text-muted-foreground hover:text-foreground"
                >
                  Continue Browsing
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Checkout Modal */}
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  )
}
