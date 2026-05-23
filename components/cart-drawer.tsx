import { useState } from "react"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CartItem } from "@/lib/types"
import { cn } from "@/lib/utils"

interface CartDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: CartItem[]
  onUpdateQuantity: (phoneId: string, variantId: string, quantity: number) => void
  onRemoveItem: (phoneId: string, variantId: string) => void
  onCheckout: () => void
}

export function CartDrawer({
  open,
  onOpenChange,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) return
    onUpdateQuantity(item.phoneId, item.variantId, newQuantity)
  }

  const handleRemove = (item: CartItem) => {
    onRemoveItem(item.phoneId, item.variantId)
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DrawerTitle className="text-xl">Your Cart</DrawerTitle>
              {itemCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </Badge>
              )}
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <span className="sr-only">Close</span>
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-[260px]">
              Looks like you haven&apos;t added any phones yet. Start shopping to fill your cart.
            </p>
            <DrawerClose asChild>
              <Button asChild>
                <Link href="/phones">Browse Phones</Link>
              </Button>
            </DrawerClose>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 custom-scrollbar">
              <div className="space-y-4 pb-6">
                {items.map((item) => (
                  <div
                    key={`${item.phoneId}-${item.variantId}`}
                    className="cart-item group"
                  >
                    {/* Product Image */}
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div>
                        <h4 className="font-medium text-sm leading-tight line-clamp-2 pr-2">
                          {item.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.color} • {item.storage}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between mt-2">
                        <span className="price text-base tabular-nums">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ${item.price} × {item.quantity}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-end justify-between h-full">
                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemove(item)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span className="sr-only">Remove item</span>
                      </Button>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1 mt-auto">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleQuantityChange(item, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleQuantityChange(item, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <DrawerFooter className="px-6 pt-4 pb-6 border-t bg-background">
              {/* Subtotal */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-xl font-semibold tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <Separator className="mb-4" />

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <Button 
                  size="lg" 
                  className="w-full" 
                  onClick={onCheckout}
                >
                  Proceed to Checkout
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" size="lg" className="w-full">
                    Continue Shopping
                  </Button>
                </DrawerClose>
              </div>

              <p className="text-center text-[10px] text-muted-foreground mt-3">
                Shipping calculated at checkout
              </p>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}
[/code]
[file]components/cart-drawer.tsx[/file]
[usedfor]cart[/usedfor]