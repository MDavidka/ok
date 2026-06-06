import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Simple validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Please provide all required fields: name, email, and message.' },
        { status: 400 }
      );
    }

    // Simulate database insertion or email dispatcher delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Return successful simulated response
    return NextResponse.json({
      success: true,
      message: 'Your query has been submitted successfully.',
      receivedData: {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error occurred.' },
      { status: 500 }
    );
  }
}
