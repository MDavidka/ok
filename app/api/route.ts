import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action') || 'health'

  switch (action) {
    case 'health':
      return NextResponse.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      })
    case 'ping':
      return NextResponse.json({ message: 'pong' })
    default:
      return NextResponse.json(
        { error: 'Unknown action' },
        { status: 400 }
      )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body

    switch (action) {
      case 'echo':
        return NextResponse.json({
          received: data,
          timestamp: new Date().toISOString()
        })
      case 'validate':
        if (!data || typeof data !== 'object') {
          return NextResponse.json(
            { error: 'Invalid data provided' },
            { status: 400 }
          )
        }
        return NextResponse.json({
          valid: true,
          data,
          timestamp: new Date().toISOString()
        })
      default:
        return NextResponse.json(
          { error: 'Unknown action' },
          { status: 400 }
        )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON payload' },
      { status: 400 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    return NextResponse.json({
      message: 'Resource updated',
      data: body,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON payload' },
      { status: 400 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json(
      { error: 'ID parameter required' },
      { status: 400 }
    )
  }

  return NextResponse.json({
    message: `Resource ${id} deleted`,
    timestamp: new Date().toISOString()
  })
}