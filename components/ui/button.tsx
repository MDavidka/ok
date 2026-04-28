"use client"
import * as React from "react"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean; variant?: "default" | "outline"; size?: "default" | "sm" }

export function Button({ className = "", variant = "default", children, asChild, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition"
  const tone = variant === "outline" ? "border border-border bg-transparent" : "bg-foreground text-background"
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      className: `${base} ${tone} ${(children as any).props?.className || ""} ${className}`.trim(),
    })
  }
  return <button className={`${base} ${tone} ${className}`.trim()} {...props}>{children}</button>
}
