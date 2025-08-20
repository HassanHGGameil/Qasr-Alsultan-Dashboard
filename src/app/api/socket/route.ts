import { NextResponse } from 'next/server';
import { initializeSocketServer } from '@/lib/SSE-Sockit/socket-server';
import { FRONTEND } from '@/lib/constains/constains';

export const dynamic = 'force-dynamic'; // Ensure this is always dynamic

export async function GET() {
  try {
    const { io } = initializeSocketServer();
    
    return NextResponse.json({ 
      status: 'running',
      clients: io.engine.clientsCount,
      port: FRONTEND || 3001
    });
  } catch (error) {
    console.error("Socket.IO server error:", error);
    return NextResponse.json(
      { error: "Failed to initialize Socket.IO server" },
      { status: 500 }
    );
  }
}

// Add other HTTP methods if needed
export const POST = () => 
  NextResponse.json(
    { error: "Method not allowed" }, 
    { status: 405 }
  );