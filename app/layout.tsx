import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { AppProvider } from "@/context/AppContext"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/Navbar"
import CartDrawer from "@/components/CartDrawer"

export const metadata: Metadata = {
  title: "AuraCloud — High-Performance Cloud VPS & Bare Metal Hosting",
  description: "Deploy KVM-virtualized private servers, bare metal instances, and global Kubernetes clusters in 15 seconds. High-speed NVMe storage, 10Gbps port, and free DDoS protection.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-background">
      <body className="min-h-screen bg-background text-foreground antialiased flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
            <Navbar />
            <div className="flex-1">
              {children}
            </div>
            <CartDrawer />
            <Toaster position="top-right" closeButton richColors />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
