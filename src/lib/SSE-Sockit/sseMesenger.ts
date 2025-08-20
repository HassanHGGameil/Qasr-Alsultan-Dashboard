// src/lib/sseManager.ts
import OrderColumnType from "@/types/OrderColumnType";

const clients: Set<ReadableStreamDefaultController> = new Set();

// Add a new client to the set
export function addClient(controller: ReadableStreamDefaultController) {
  clients.add(controller);
  console.log(`New client connected. Total clients: ${clients.size}`);
}

// Remove a client from the set
export function removeClient(controller: ReadableStreamDefaultController) {
  clients.delete(controller);
  console.log(`Client disconnected. Total clients: ${clients.size}`);
}

// Broadcast a message to all connected clients
async function broadcastMessage(type: string, data: unknown) {
  const message = `data: ${JSON.stringify({ type, data })}\n\n`;
  const cleanup: ReadableStreamDefaultController[] = [];
  
  clients.forEach((controller) => {
    try {
      controller.enqueue(new TextEncoder().encode(message));
    } catch (error) {
      console.error("Error sending to client:", error);
      cleanup.push(controller);
    }
  });

  // Clean up dead connections
  cleanup.forEach(controller => {
    clients.delete(controller);
    console.log("Cleaned up dead connection");
  });
}

// Specific broadcast functions
export async function broadcastNewOrder(order: OrderColumnType) {
  await broadcastMessage("newOrder", order);
}

export async function broadcastOrderUpdate(order: OrderColumnType) {
  await broadcastMessage("orderUpdate", order);
}

export async function broadcastOrderDelete(orderId: string) {
  await broadcastMessage("orderDelete", { id: orderId });
}