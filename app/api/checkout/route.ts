import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, shipping, payment, total } = body;

    // Validate request inputs
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Your shopping cart is empty. Cannot process order." },
        { status: 400 }
      );
    }

    if (
      !shipping ||
      !shipping.fullName ||
      !shipping.email ||
      !shipping.address ||
      !shipping.city ||
      !shipping.zipCode
    ) {
      return NextResponse.json(
        { error: "Incomplete shipping information details." },
        { status: 400 }
      );
    }

    // Simulate payment processor delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Generate random Order ID
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    const orderId = `SYRA-${randomNum}-${randomLetter}`;

    // Calculate delivery date (current date + 3 days)
    const delivery = new Date();
    delivery.setDate(delivery.getDate() + 3);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const deliveryDateFormatted = delivery.toLocaleDateString("en-US", options);

    return NextResponse.json({
      success: true,
      orderId,
      deliveryDate: deliveryDateFormatted,
      totalPaid: total || 0,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "An internal server error occurred while processing the order." },
      { status: 500 }
    );
  }
}
