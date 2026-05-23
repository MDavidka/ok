import { z } from "zod"

export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
    linkedin: string
  }
}

export interface NavItem {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
  icon?: React.ComponentType<{ className?: string }>
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}

export const siteConfig: SiteConfig = {
  name: "Acme Inc",
  description: "Modern SaaS platform built with Next.js and shadcn/ui",
  url: "https://acme.com",
  ogImage: "https://placehold.co/1200x630.png",
  links: {
    twitter: "https://twitter.com/acme",
    github: "https://github.com/acme",
    linkedin: "https://linkedin.com/company/acme",
  },
}

export const navItems: MainNavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Features",
    href: "/features",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Contact",
    href: "/contact",
  },
]

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().min(2),
  avatar: z.string().url().optional(),
  role: z.enum(["user", "admin", "moderator"]),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type User = z.infer<typeof userSchema>

export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string(),
  price: z.number().positive(),
  image: z.string().url(),
  category: z.string(),
  inStock: z.boolean(),
  rating: z.number().min(0).max(5),
})

export type Product = z.infer<typeof productSchema>

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export type ContactForm = z.infer<typeof contactFormSchema>

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export type Theme = "light" | "dark" | "system"

export interface ThemeConfig {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface Toast {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface TableColumn<T> {
  accessorKey: keyof T
  header: string
  cell?: (item: T) => React.ReactNode
  sortable?: boolean
}

export interface FilterOption {
  label: string
  value: string
}

export interface SortOption {
  label: string
  value: string
  direction: "asc" | "desc"
}

export interface Phone {
  id: string
  name: string
  brand: string
  price: number
  description: string
  imageUrls: string[]
  storageOptions: string[]
  colorOptions: string[]
}