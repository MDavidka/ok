import { z } from "zod"

export const PhoneSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  brand: z.string(),
  price: z.number().positive(),
  originalPrice: z.number().positive().optional(),
  image: z.string(),
  images: z.array(z.string()),
  description: z.string(),
  specs: z.object({
    display: z.string(),
    processor: z.string(),
    ram: z.string(),
    storage: z.string(),
    camera: z.string(),
    battery: z.string(),
    os: z.string(),
  }),
  inStock: z.boolean(),
  rating: z.number().min(0).max(5),
  reviewCount: z.number().int().nonnegative(),
  category: z.enum(["flagship", "mid-range", "budget"]),
})

export const CartItemSchema = z.object({
  phone: PhoneSchema,
  quantity: z.number().int().positive(),
})

export const OrderSchema = z.object({
  id: z.string(),
  items: z.array(CartItemSchema),
  total: z.number().positive(),
  status: z.enum(["pending", "processing", "shipped", "delivered"]),
  createdAt: z.string(),
})

export type Phone = z.infer<typeof PhoneSchema>
export type CartItem = z.infer<typeof CartItemSchema>
export type Order = z.infer<typeof OrderSchema>
[/code]
[file]lib/types.ts[/file][usedfor]TypeScript interfaces for Phone, CartItem, and Order used across components and pages[/usedfor]