import Link from "next/link"
import { Phone } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface PhoneCardProps {
  phone: Phone
  onAddToCart?: (phone: Phone) => void
}

export function PhoneCard({ phone, onAddToCart }: PhoneCardProps) {
  const lowestPrice = Math.min(...phone.variants.map((v) => v.price))
  const totalStock = phone.variants.reduce((sum, v) => sum + v.stock, 0)
  const isInStock = totalStock > 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onAddToCart && isInStock) {
      onAddToCart(phone)
    }
  }

  return (
    <Card className="phone-card group h-full flex flex-col overflow-hidden border-border/50">
      <Link href={`/phones/${phone.slug}`} className="flex-1 flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={phone.variants[0]?.image || "https://placehold.co/600x450.png"}
            alt={phone.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {!isInStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <Badge variant="secondary" className="text-sm">
                Out of Stock
              </Badge>
            </div>
          )}
          {phone.category && (
            <Badge 
              variant="secondary" 
              className="absolute top-3 left-3 text-xs font-medium"
            >
              {phone.category}
            </Badge>
          )}
        </div>

        <CardContent className="flex-1 p-5 space-y-3">
          {/* Brand & Name */}
          <div>
            <p className="text-xs font-medium text-muted-foreground tracking-wider uppercase mb-1">
              {phone.brand}
            </p>
            <h3 className="font-semibold text-lg leading-tight tracking-tight line-clamp-2">
              {phone.name}
            </h3>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    i < Math.floor(phone.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-muted text-muted"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {phone.rating} ({phone.reviewCount})
            </span>
          </div>

          {/* Key Specs */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm pt-1">
            <div>
              <span className="spec-label">Display</span>
              <p className="spec-value truncate">{phone.specs.display}</p>
            </div>
            <div>
              <span className="spec-label">Processor</span>
              <p className="spec-value truncate">{phone.specs.processor}</p>
            </div>
          </div>
        </CardContent>
      </Link>

      {/* Footer with Price & CTA */}
      <CardFooter className="p-5 pt-0 mt-auto flex items-center justify-between gap-3 border-t">
        <div>
          <p className="text-xs text-muted-foreground">Starting at</p>
          <p className="price text-xl tabular-nums">
            ${lowestPrice}
          </p>
        </div>

        <Button
          size="sm"
          onClick={handleAddToCart}
          disabled={!isInStock}
          className="shrink-0"
        >
          {isInStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  )
}
[/code]
[file]components/phone-card.tsx[/file]
[usedfor]product card[/usedfor]