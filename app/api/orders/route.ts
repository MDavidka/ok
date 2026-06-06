import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customer, pricing } = body;

    // Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Your shopping cart must contain at least one item.' },
        { status: 400 }
      );
    }

    if (!customer || !customer.name || !customer.email || !customer.address || !customer.city || !customer.zipCode) {
      return NextResponse.json(
        { success: false, message: 'Please complete all customer delivery fields.' },
        { status: 400 }
      );
    }

    // Simulate backend processing delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Generate simulated order confirmation ID
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderId = `PNX-${randomSuffix}`;

    return NextResponse.json({
      success: true,
      orderId,
      message: 'Order simulated and processed successfully.',
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      pricingSummary: pricing
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to process checkout simulation.' },
      { status: 500 }
    );
  }
}
