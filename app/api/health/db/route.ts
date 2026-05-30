import { NextResponse } from "next/server"
import { getDbClient, hasDbEnv } from "@/lib/db/client"
import { applySchema } from "@/lib/db/schema"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  if (!hasDbEnv()) {
    return NextResponse.json(
      { ok: false, error: "Missing TURSO_DATABASE_URL environment variable." },
      { status: 503 },
    )
  }
  try {
    const db = getDbClient()
    await applySchema()
    const result = await db.execute("SELECT 1 as ok")
    return NextResponse.json({ ok: true, result: result.rows })
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
