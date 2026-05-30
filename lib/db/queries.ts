import { getDbClient } from "@/lib/db/client"

export interface ProductRecord {
  id: number
  slug: string
  name: string
  description: string | null
  priceCents: number
  imageUrl: string | null
  stock: number
}

export interface OrderInput {
  customerName: string
  customerEmail: string
  items: { productId: number; quantity: number; unitPriceCents: number }[]
}

export async function listProducts(limit = 24): Promise<ProductRecord[]> {
  const db = getDbClient()
  const result = await db.execute({
    sql: `SELECT id, slug, name, description, price_cents as priceCents,
                 image_url as imageUrl, stock
          FROM products ORDER BY created_at DESC LIMIT ?`,
    args: [limit],
  })
  return result.rows as unknown as ProductRecord[]
}

export async function getProductBySlug(slug: string): Promise<ProductRecord | null> {
  const db = getDbClient()
  const result = await db.execute({
    sql: `SELECT id, slug, name, description, price_cents as priceCents,
                 image_url as imageUrl, stock
          FROM products WHERE slug = ? LIMIT 1`,
    args: [slug],
  })
  const row = result.rows[0]
  return (row as unknown as ProductRecord) ?? null
}

export async function createOrder(input: OrderInput): Promise<number> {
  const db = getDbClient()
  const total = input.items.reduce((sum, it) => sum + it.quantity * it.unitPriceCents, 0)
  const insert = await db.execute({
    sql: `INSERT INTO orders (customer_name, customer_email, total_cents) VALUES (?, ?, ?)`,
    args: [input.customerName, input.customerEmail, total],
  })
  const orderId = Number(insert.lastInsertRowid ?? 0)
  for (const item of input.items) {
    await db.execute({
      sql: `INSERT INTO order_items (order_id, product_id, quantity, unit_price_cents)
            VALUES (?, ?, ?, ?)`,
      args: [orderId, item.productId, item.quantity, item.unitPriceCents],
    })
  }
  return orderId
}
