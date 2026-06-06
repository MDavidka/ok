import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url);
  const id = params.id;

  // Simulate delay if requested
  const delayParam = searchParams.get('delay');
  if (delayParam) {
    const delay = parseInt(delayParam, 10);
    if (!isNaN(delay) && delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, Math.min(delay, 10000)));
    }
  }

  // Simulate status code if requested
  const statusParam = searchParams.get('status');
  let status = 200;
  if (statusParam) {
    const parsedStatus = parseInt(statusParam, 10);
    if (!isNaN(parsedStatus) && parsedStatus >= 100 && parsedStatus < 600) {
      status = parsedStatus;
    }
  }

  // Default mock datasets based on common simulated resource IDs
  const mockDatabase: Record<string, any> = {
    users: [
      { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Administrator", active: true },
      { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Developer", active: true },
      { id: 3, name: "Charlie Diaz", email: "charlie@example.com", role: "Product Manager", active: false },
      { id: 4, name: "Diana Prince", email: "diana@example.com", role: "UX Designer", active: true }
    ],
    products: [
      { id: "p1", name: "Premium SaaS subscription", price: 49.00, billing: "monthly", features: ["Unlimited scans", "Priority support"] },
      { id: "p2", name: "Enterprise Custom Portal", price: 299.00, billing: "monthly", features: ["SAML SSO", "Dedicated DB", "24/7 Phone SLA"] },
      { id: "p3", name: "Starter Developer Pack", price: 0.00, billing: "free", features: ["100 requests/day", "Community forums"] }
    ],
    config: {
      environment: "production-sandbox",
      version: "v4.2.1-stable",
      allowedOrigins: ["*"],
      maintenance: false,
      featuresEnabled: {
        darkmode: true,
        websockets: false,
        analytics: true
      }
    },
    profile: {
      username: "dev_sandbox_tester",
      apiKey: "sk_live_51N...88yZ",
      organization: "Acme Sandbox Lab",
      registeredAt: "2024-01-15T08:30:00Z"
    }
  };

  // If status indicates error, return error response
  if (status >= 400) {
    return NextResponse.json(
      {
        error: true,
        code: status,
        message: `Simulated HTTP ${status} Error payload.`,
        timestamp: new Date().toISOString()
      },
      { status }
    );
  }

  // Return specific mock key or default generic payload
  const data = mockDatabase[id] || {
    id,
    message: "Dynamic Mock API response successfully compiled.",
    description: "You can query simulated datasets like /api/mock/users, /api/mock/products, /api/mock/config, or /api/mock/profile. Pass ?status=404 or ?delay=1500 to test client response handling.",
    timestamp: new Date().toISOString(),
    queryParameters: Object.fromEntries(searchParams.entries())
  };

  return NextResponse.json(data, {
    status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'no-store, max-age=0'
    }
  });
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  let body: any = {};
  
  try {
    body = await request.json();
  } catch (e) {
    body = { error: "No JSON payload parsed or empty body" };
  }

  const { searchParams } = new URL(request.url);
  const statusParam = searchParams.get('status');
  let status = 201;
  if (statusParam) {
    const parsedStatus = parseInt(statusParam, 10);
    if (!isNaN(parsedStatus)) {
      status = parsedStatus;
    }
  }

  return NextResponse.json({
    success: true,
    message: `Mock POST successful for resource ID: ${id}`,
    receivedPayload: body,
    simulatedId: Math.floor(Math.random() * 900000) + 100000,
    timestamp: new Date().toISOString()
  }, {
    status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    }
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
