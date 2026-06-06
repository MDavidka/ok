import { NextResponse } from "next/server";
import { TRADE_IN_MODELS } from "@/lib/data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { brand, model, storage, condition } = body;

    if (!brand || !model || !condition) {
      return NextResponse.json(
        { success: false, error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Find model base value
    const match = TRADE_IN_MODELS.find(
      (m) => m.brand.toLowerCase() === brand.toLowerCase() && m.model.toLowerCase() === model.toLowerCase()
    );

    const baseValue = match ? match.baseValue : 120; // Default base value if model is not in list

    // Condition Multipliers
    let conditionMultiplier = 1.0;
    if (condition === "Flawless") conditionMultiplier = 1.15;
    if (condition === "Good") conditionMultiplier = 1.00;
    if (condition === "Fair") conditionMultiplier = 0.65;
    if (condition === "Broken") conditionMultiplier = 0.25;

    // Storage modifiers
    let storageBonus = 0;
    if (storage && storage.includes("256GB")) storageBonus = 25;
    if (storage && storage.includes("512GB")) storageBonus = 60;
    if (storage && (storage.includes("1TB") || storage.includes("1 TB"))) storageBonus = 120;

    // Calculate final estimated value
    const estimatedValue = Math.round(baseValue * conditionMultiplier + storageBonus);

    // Generate a random unique promo code
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const promoCode = `TRADE-${brand.substring(0, 3).toUpperCase()}-${randomHex}`;

    return NextResponse.json({
      success: true,
      brand,
      model,
      storage,
      condition,
      estimatedValue,
      promoCode,
      message: "Trade-in value successfully calculated!"
    });
  } catch (error) {
    console.error("Trade-In API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
