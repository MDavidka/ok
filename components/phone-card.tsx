import Link from "next/link"
import { Phone } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { toast } from "sonner"

interface PhoneCardProps {
  phone: Phone
}

export function PhoneCard({ phone }: PhoneCardProps) {
  const discount = phone.originalPrice 
    ? Math.round(((phone.originalPrice - phone.price) / phone.originalPrice) * 100) 
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // In a real app, this would update global cart state
    toast.success(`${phone.name} added to cart`, {
      description: formatPrice(phone.price),
      action: {
        label: "View Cart",
        onClick: () => window.location.href = "/cart",
      },
    })
  }

  return (
    <Card className="phone-card group overflow-hidden border-0 shadow-sm">
      <Link href={`/phones/${phone.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={phone.image}
            alt={phone.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <Badge variant="secondary" className="text-xs font-medium">
              {phone.brand}
            </Badge>
            {discount > 0 && (
              <Badge variant="destructive" className="text-xs font-medium">
                -{discount}%
              </Badge>
            )}
          </div>

          {/* Stock Status */}
          <div className="absolute top-3 right-3">
            <Badge 
              variant={phone.inStock ? "default" : "secondary"}
              className="text-xs font-medium"
            >
              {phone.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
        </div>

        <CardContent className="p-5 pb-3">
          <div className="space-y-2">
            <div>
              <h3 className="font-semibold text-lg leading-tight tracking-tight line-clamp-2">
                {phone.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {phone.specs.storage} • {phone.specs.os}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`h-3.5 w-3.5 ${
                      index < Math.floor(phone.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground/40"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground tabular-nums">
                {phone.rating} ({phone.reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 pt-1">
              <span className="price tabular-nums text-foreground">
                {formatPrice(phone.price)}
              </span>
              {phone.originalPrice && (
                <span className="text-sm text-muted-foreground line-through tabular-nums">
                  {formatPrice(phone.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Link>

      <CardFooter className="p-5 pt-0">
        <Button 
          onClick={handleAddToCart}
          disabled={!phone.inStock}
          className="w-full"
          size="sm"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {phone.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  )
}
[/code]
[file]components/phone-card.tsx[/file][usedfor]Reusable phone product card component showing image, name, price, and quick add button[/usedfor]