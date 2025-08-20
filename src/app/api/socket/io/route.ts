// src/app/api/socket/io/route.ts
import { addClient, removeClient } from "@/lib/SSE-Sockit/sseMesenger";

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      addClient(controller);

      // Send initial connection message
      controller.enqueue(
        new TextEncoder().encode(
          `data: ${JSON.stringify({
            type: "connected",
            message: "Connected to order updates",
          })}\n\n`
        )
      );

      // Set up keep-alive ping
      const keepAlive = setInterval(() => {
        try {
          controller.enqueue(
            new TextEncoder().encode(
              `data: ${JSON.stringify({ type: "ping" })}\n\n`
            )
          );
        } catch (error) {
          console.error("Keep-alive ping failed:", error);
          clearInterval(keepAlive);
          removeClient(controller);
        }
      }, 30000);

      // Cleanup callback when stream is closed
      return () => {
        clearInterval(keepAlive);
        removeClient(controller);
      };
    },
    cancel() {
      console.log("Client disconnected abruptly");
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "Content-Encoding": "none",
    },
  });
}

// Ensure this is a dynamic route
export const dynamic = "force-dynamic";
