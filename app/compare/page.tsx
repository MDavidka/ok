"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/lib/store-context";
import { PHONES } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  GitCompare, 
  Trash2, 
  Plus, 
  ShoppingCart, 
  Star, 
  Check, 
  X,
  Smartphone
} from "lucide-react";

export default function ComparePage() {
  const { compareList, toggleCompare, clearCompare, addToCart } = useStore();

  // Find actual phone objects in the database
  const comparedPhones = PHONES.filter((p) => compareList.includes(p.id));

  // Specs keys to display in matrix rows
  const specRows = [
    { label: "Price", key: "price", render: (p: any) => <span className="font-extrabold text-base text-primary">${p.price}</span> },
    { label: "Operating System", key: "os", render: (p: any) => p.specs.os },
    { label: "Screen / Display", key: "screen", render: (p: any) => p.specs.screen },
    { label: "Processor (CPU)", key: "processor", render: (p: any) => p.specs.processor },
    { label: "Camera Setup", key: "camera", render: (p: any) => p.specs.camera },
    { label: "Battery Capacity", key: "battery", render: (p: any) => p.specs.battery },
    { label: "Device Weight", key: "weight", render: (p: any) => p.specs.weight },
    { label: "Customer Rating", key: "rating", render: (p: any) => (
      <div className="flex items-center gap-1 text-amber-500 font-bold">
        <Star className="h-3.5 w-3.5 fill-current" />
        <span>{p.rating} ({p.reviewsCount} reviews)</span>
      </div>
    )},
    { label: "Colors Available", key: "colors", render: (p: any) => (
      <div className="flex flex-wrap gap-1">
        {p.colors.map((c: any) => (
          <span key={c.name} className="inline-block h-3 w-3 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} title={c.name} />
        ))}
      </div>
    )},
    { label: "Storage Options", key: "storage", render: (p: any) => (
      <span className="text-xs">{p.storageOptions.map((s: any) => s.size).join(", ")}</span>
    )}
  ];

  // Recommendations to compare if less than 2 are chosen
  const recommendedPhones = PHONES.filter((p) => !compareList.includes(p.id)).slice(0, 3);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
            <GitCompare className="h-8 w-8 text-primary" />
            <span>Compare Smartphones</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Compare premium specs, batteries, displays, and processors side-by-side.
          </p>
        </div>
        {comparedPhones.length > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearCompare}
            className="text-xs flex items-center gap-1.5 text-destructive border-destructive/20 hover:bg-destructive/10"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear Comparison</span>
          </Button>
        )}
      </div>

      {/* Grid Matrix */}
      {comparedPhones.length > 0 ? (
        <div className="border rounded-2xl bg-card overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b bg-muted/30">
                  {/* First column: label */}
                  <th className="p-4 sm:p-6 text-xs font-bold uppercase tracking-wider text-muted-foreground w-1/4 min-w-[150px]">
                    Device Specs
                  </th>
                  {/* Phone columns */}
                  {comparedPhones.map((phone) => (
                    <th key={phone.id} className="p-4 sm:p-6 w-1/4 min-w-[220px] border-l relative">
                      {/* Delete button */}
                      <button
                        onClick={() => toggleCompare(phone.id)}
                        className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-destructive transition-colors"
                        title="Remove from comparison"
                      >
                        <X className="h-4 w-4" />
                      </button>

                      <div className="space-y-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={phone.image} 
                          alt={phone.name} 
                          className="h-28 w-auto object-contain mx-auto rounded"
                        />
                        <div className="text-center space-y-1">
                          <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider">
                            {phone.brand}
                          </Badge>
                          <h3 className="font-extrabold text-sm text-foreground line-clamp-1">
                            {phone.name}
                          </h3>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/phones/${phone.id}`} className="w-1/2">
                            <Button variant="outline" size="sm" className="w-full text-xs">
                              Details
                            </Button>
                          </Link>
                          <Button 
                            size="sm" 
                            className="w-1/2 text-xs gap-1"
                            onClick={() => addToCart(phone, phone.colors[0]?.name, phone.storageOptions[0]?.size, phone.price)}
                          >
                            <ShoppingCart className="h-3 w-3" />
                            <span>Buy</span>
                          </Button>
                        </div>
                      </div>
                    </th>
                  ))}
                  {/* Empty slots to make up to 3 */}
                  {Array.from({ length: 3 - comparedPhones.length }).map((_, i) => (
                    <th key={`empty-${i}`} className="p-4 sm:p-6 w-1/4 min-w-[220px] border-l bg-muted/10 text-center text-xs text-muted-foreground">
                      <div className="flex flex-col items-center justify-center py-12 space-y-2">
                        <div className="h-10 w-10 rounded-full border border-dashed flex items-center justify-center">
                          <Plus className="h-4 w-4" />
                        </div>
                        <p className="font-medium">Add Device</p>
                        <Link href="/phones">
                          <Button size="xs" variant="ghost" className="text-[10px] underline">
                            Browse Catalog
                          </Button>
                        </Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specRows.map((row) => (
                  <tr key={row.key} className="border-b last:border-b-0 hover:bg-muted/10 transition-colors">
                    <td className="p-4 sm:p-6 text-xs font-bold text-foreground">
                      {row.label}
                    </td>
                    {comparedPhones.map((phone) => (
                      <td key={`${phone.id}-${row.key}`} className="p-4 sm:p-6 text-xs text-muted-foreground border-l">
                        {row.render(phone)}
                      </td>
                    ))}
                    {/* Empty slots specs */}
                    {Array.from({ length: 3 - comparedPhones.length }).map((_, i) => (
                      <td key={`empty-spec-${row.key}-${i}`} className="p-4 sm:p-6 border-l bg-muted/5" />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {/* Less than 2 phones selected display advice */}
      {comparedPhones.length < 2 && (
        <div className="mt-8 p-6 sm:p-10 border rounded-2xl bg-muted/20 text-center space-y-6">
          <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
            <GitCompare className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h3 className="font-extrabold text-lg">Add at least two phones to compare</h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
              You currently have <strong className="text-foreground">{comparedPhones.length}</strong> {comparedPhones.length === 1 ? "phone" : "phones"} selected. Choose up to 3 phones from our catalog to compare specifications side-by-side.
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Link href="/phones">
              <Button size="sm" className="gap-2 text-xs font-bold">
                <Smartphone className="h-4 w-4" />
                <span>Browse Phone Catalog</span>
              </Button>
            </Link>
          </div>

          {/* Quick-add suggestions */}
          {recommendedPhones.length > 0 && (
            <div className="pt-8 border-t max-w-2xl mx-auto space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Quick Recommendations to Compare
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recommendedPhones.map((phone) => (
                  <Card key={phone.id} className="p-4 flex flex-col items-center justify-between border bg-card hover:border-primary/40 transition-colors">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={phone.image} alt={phone.name} className="h-14 w-auto object-contain mb-2" />
                    <div className="text-center mb-2">
                      <p className="text-[10px] text-muted-foreground font-semibold uppercase">{phone.brand}</p>
                      <p className="text-xs font-bold line-clamp-1">{phone.name}</p>
                    </div>
                    <Button 
                      size="xs" 
                      variant="outline" 
                      className="w-full text-[10px] h-7 gap-1"
                      onClick={() => toggleCompare(phone.id)}
                    >
                      <Plus className="h-3 w-3" />
                      <span>Compare</span>
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
