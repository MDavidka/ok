import * as React from "react"

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & { variant?: "default" | "secondary" }

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  const tone = variant === "secondary" ? "bg-muted text-foreground" : "bg-foreground text-background"
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${tone} ${className}`.trim()} {...props} />
}
