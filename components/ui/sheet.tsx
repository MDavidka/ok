"use client"
import * as React from "react"

export function Sheet({ children }: { children: React.ReactNode }) { return <>{children}</> }
export function SheetTrigger({ children }: { children: React.ReactNode; asChild?: boolean }) { return <>{children}</> }
export function SheetContent({ children, className = "" }: { children: React.ReactNode; side?: string; className?: string }) {
  return <div className={`mt-2 rounded-md border bg-background p-4 ${className}`.trim()}>{children}</div>
}
