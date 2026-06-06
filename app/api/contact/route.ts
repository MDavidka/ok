import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, department } = body;

    // Server-side validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({
        success: false,
        error: "Missing required fields",
        message: "Please fill out all required fields: Name, Email, Subject, and Message."
      }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: false,
        error: "Invalid email",
        message: "Please enter a valid email address."
      }, { status: 400 });
    }

    // Dynamic responses depending on context
    const ticketId = "TKT-" + Math.floor(100000 + Math.random() * 900000);
    
    return NextResponse.json({
      success: true,
      ticketId,
      received: {
        name,
        email,
        subject,
        department: department || 'General Support',
        messageSnippet: message.substring(0, 100) + (message.length > 100 ? '...' : '')
      },
      message: `Thank you, ${name}! Your inquiry has been registered. Our ${department || 'General Support'} department will respond shortly.`,
      estimatedResponseTime: "Under 12 hours"
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Internal Error",
      message: "There was an error processing your request. Please try again."
    }, { status: 500 });
  }
}
