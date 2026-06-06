import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phoneModel, issueType, date, timeSlot, location } = body;

    if (!fullName || !email || !phoneModel || !issueType || !date || !timeSlot || !location) {
      return NextResponse.json(
        { success: false, error: "Missing required booking details." },
        { status: 400 }
      );
    }

    // Generate a random 6-digit booking reference
    const bookingNum = Math.floor(100000 + Math.random() * 900000);
    const bookingReference = `PHX-FIX-${bookingNum}`;

    return NextResponse.json({
      success: true,
      bookingReference,
      fullName,
      phoneModel,
      issueType,
      date,
      timeSlot,
      location,
      message: "Your repair appointment has been successfully scheduled!",
    });
  } catch (error) {
    console.error("Booking API Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
