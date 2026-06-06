import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'all';
  const limit = parseInt(searchParams.get('limit') || '10');

  const items = [
    { id: 101, name: 'Quantum Core Processor', category: 'hardware', price: 499.99, stock: 12, status: 'active' },
    { id: 102, name: 'SaaS Dashboard Starter Kit', category: 'software', price: 89.00, stock: 999, status: 'active' },
    { id: 103, name: 'Neural Network Optimizer', category: 'software', price: 299.00, stock: 45, status: 'active' },
    { id: 104, name: 'Tactile Mechanical Keyboard', category: 'hardware', price: 159.50, stock: 8, status: 'backordered' },
    { id: 105, name: 'Ultra-wide Developer Monitor', category: 'hardware', price: 699.99, stock: 3, status: 'active' },
  ];

  const filtered = category === 'all' 
    ? items 
    : items.filter(item => item.category === category);

  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    endpoint: '/api/mock-endpoint',
    method: 'GET',
    count: Math.min(filtered.length, limit),
    parameters: { category, limit },
    data: filtered.slice(0, limit),
    message: "Welcome to the Mock Sandbox! Filter this data using '?category=software' or '?category=hardware'."
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Simulate simple server validation
    if (!body.name || !body.email) {
      return NextResponse.json({
        success: false,
        error: "Bad Request",
        message: "Missing required fields: 'name' and 'email' must be present in the JSON body."
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      endpoint: '/api/mock-endpoint',
      method: 'POST',
      receivedData: body,
      assignedId: Math.floor(Math.random() * 900000) + 100000,
      message: "Data successfully processed! Your mock record was added to our temporary in-memory simulator."
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Invalid JSON",
      message: "The request body could not be parsed as valid JSON."
    }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      endpoint: '/api/mock-endpoint',
      method: 'PUT',
      updatedData: body,
      message: "Mock record updated successfully!"
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Invalid JSON",
      message: "The request body could not be parsed as valid JSON."
    }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({
      success: false,
      error: "Bad Request",
      message: "Please specify an item ID to delete by appending '?id=101' to the URL."
    }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    endpoint: '/api/mock-endpoint',
    method: 'DELETE',
    deletedId: id,
    message: `Mock record with ID ${id} was deleted successfully from the virtual sandbox database.`
  });
}
