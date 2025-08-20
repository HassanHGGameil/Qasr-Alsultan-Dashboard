import { Server } from "socket.io";
import OrderColumnType from "@/types/OrderColumnType";

let io: Server | null = null;

export function initializeSocket() {
  if (!io) {
    io = new Server({
      path: "/api/socket/io",
      addTrailingSlash: false,
      cors: {
        origin: process.env.NODE_ENV === 'production' 
          ? [process.env.NEXTAUTH_URL || ""] 
          : ["http://localhost:3000", "http://127.0.0.1:3000"],
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      console.log("Admin client connected:", socket.id);
      
      // Join admin room for order notifications
      socket.join("admin");

      socket.on("disconnect", () => {
        console.log("Admin client disconnected:", socket.id);
      });

      // Send connection confirmation
      socket.emit("connected", { message: "Connected to order updates" });
    });
  }
  return io;
}

export function getSocketIO() {
  return io;
}

export function emitNewOrder(order: OrderColumnType) {
  if (io) {
    console.log("Emitting new order to admin clients:", order.id);
    io.to("admin").emit("newOrder", order);
  } else {
    console.log("Socket.IO not initialized, cannot emit new order");
  }
}

export function emitOrderUpdate(order: OrderColumnType) {
  if (io) {
    console.log("Emitting order update to admin clients:", order.id);
    io.to("admin").emit("orderUpdate", order);
  }
}

export function emitOrderDelete(orderId: string) {
  if (io) {
    console.log("Emitting order deletion to admin clients:", orderId);
    io.to("admin").emit("orderDelete", { id: orderId });
  }
}
