import { getDbClient } from "@/lib/db/client"

// Database schema for this generated site. Apply with `applySchema()` on
// first boot or via the health check. Idempotent thanks to IF NOT EXISTS.

export const schemaStatements: string[] = [
  "CREATE TABLE IF NOT EXISTS products (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  slug TEXT NOT NULL UNIQUE,\n  name TEXT NOT NULL,\n  description TEXT,\n  price_cents INTEGER NOT NULL,\n  image_url TEXT,\n  stock INTEGER NOT NULL DEFAULT 0,\n  created_at TEXT NOT NULL DEFAULT (datetime('now'))\n);",
  "CREATE TABLE IF NOT EXISTS orders (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  customer_name TEXT NOT NULL,\n  customer_email TEXT NOT NULL,\n  total_cents INTEGER NOT NULL,\n  status TEXT NOT NULL DEFAULT 'pending',\n  created_at TEXT NOT NULL DEFAULT (datetime('now'))\n);",
  "CREATE TABLE IF NOT EXISTS order_items (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,\n  product_id INTEGER NOT NULL REFERENCES products(id),\n  quantity INTEGER NOT NULL DEFAULT 1,\n  unit_price_cents INTEGER NOT NULL\n);"
]

export async function applySchema(): Promise<void> {
  const db = getDbClient()
  for (const statement of schemaStatements) {
    await db.execute(statement)
  }
}
