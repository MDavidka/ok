"use client";

import React from "react";
import Link from "next/link";
import { Phone } from "@/lib/data";
import { useStore } from "@/lib/store-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, GitCompare, Eye, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhoneCardProps {
  phone: Phone;
}

export function PhoneCard({ phone }: PhoneCardProps) {
  const { compareList, toggleCompare, addToCart } = useStore();
  const isComparing = compareList.includes(phone.id);

  const brandColors: Record<string, string> = {
    Apple: "bg-slate-900 text-slate-100",
    Samsung: "bg-blue-600 text-white",
    Google: "bg-emerald-600 text-white",
    OnePlus: "bg-red-600 text-white",
    Nothing: "bg-neutral-800 text-white",
  };

  const selectedBrandColor = brandColors[phone.brand] || "bg-primary text-primary-foreground";

  const baseColor = phone.colors[0]?.name || "Default";
  const baseStorage = phone.storageOptions[0]?.size || "Base";

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(phone, baseColor, baseStorage, phone.price);
  };

  return (
    <Card className="group relative overflow-hidden flex flex-col h-full border-muted/60 hover:border-primary/40 hover:shadow-xl transition-all duration-300">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        <Badge className={cn("text-[10px] uppercase font-bold tracking-wider", selectedBrandColor)}>
          {phone.brand}
        </Badge>
        {phone.isDeal && (
          <Badge variant="destructive" className="text-[10px] font-bold">
            HOT DEAL
          </Badge>
        )}
      </div>

      {/* Quick Compare Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleCompare(phone.id);
        }}
        className={cn(
          "absolute top-3 right-3 z-10 p-2 rounded-full border transition-all duration-200",
          isComparing
            ? "bg-primary text-primary-foreground border-primary scale-110"
            : "bg-background/90 text-muted-foreground border-muted hover:text-foreground hover:bg-background"
        )}
        title={isComparing ? "Remove from comparison" : "Add to comparison"}
      >
        <GitCompare className="h-4 w-4" />
      </button>

      {/* Image Container */}
      <Link href={`/phones/${phone.id}`} className="block pt-6 px-4">
        <div className="relative h-48 w-full rounded-lg overflow-hidden bg-muted/30 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={phone.image}
            alt={phone.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity duration-300">
            <Button size="sm" variant="secondary" className="gap-1 shadow-md">
              <Eye className="h-4 w-4" />
              <span>Details</span>
            </Button>
          </div>
        </div>
      </Link>

      <CardHeader className="p-4 pb-0 flex-1">
        <div className="flex items-center justify-between">
          <Link href={`/phones/${phone.id}`} className="hover:underline">
            <h3 className="font-bold text-base tracking-tight text-foreground line-clamp-1">
              {phone.name}
            </h3>
          </Link>
          <div className="flex items-center gap-0.5 text-amber-500 text-xs shrink-0 font-semibold">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span>{phone.rating}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
          {phone.description}
        </p>
      </CardHeader>

      <CardContent className="p-4 pt-3 flex flex-col justify-end">
        {/* Price Tag */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-primary">${phone.price}</span>
          {phone.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ${phone.originalPrice}
            </span>
          )}
          <span className="text-[10px] text-muted-foreground ml-auto">
            {baseStorage} • {phone.colors.length} colors
          </span>
        </div>

        {/* Small specs list */}
        <div className="mt-3 pt-3 border-t border-muted/50 grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-muted-foreground">
          <div className="truncate">🧠 {phone.specs.processor.split(" ")[0]}</div>
          <div className="truncate">🔋 {phone.specs.battery.split(" ")[0]} mAh</div>
          <div className="truncate col-span-2">📸 {phone.specs.camera.split("+")[0]}</div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 gap-2">
        <Link href={`/phones/${phone.id}`} className="w-1/2">
          <Button variant="outline" size="sm" className="w-full text-xs">
            Specs
          </Button>
        </Link>
        <Button 
          onClick={handleQuickAdd} 
          size="sm" 
          className="w-1/2 text-xs gap-1"
        >
          <ShoppingCart className="h-3 w-3" />
          <span>Quick Buy</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
