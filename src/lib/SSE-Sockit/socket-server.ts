import { Server, Socket } from "socket.io";
import { createServer, Server as HttpServer } from "http";

type SocketServer = {
  io: Server;
  httpServer: HttpServer;
};

let socketServer: SocketServer | null = null;

export function initializeSocketServer(): SocketServer {
  if (socketServer) return socketServer;

  const httpServer = createServer();
  const io = new Server(httpServer, {
    path: "/api/socket/io",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
    addTrailingSlash: false,
  });

  setupSocketHandlers(io);

  const PORT = parseInt(process.env.SOCKET_PORT || "3001", 10);
  httpServer.listen(PORT, () => {
    console.log(`Socket.IO server running on port ${PORT}`);
  });

  socketServer = { io, httpServer };
  return socketServer;
}

function setupSocketHandlers(io: Server): void {
  const activeConnections = new Map<string, Socket>();

  io.on("connection", (socket: Socket) => {
    console.log("Client connected:", socket.id);
    activeConnections.set(socket.id, socket);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      activeConnections.delete(socket.id);
    });

    // Add your custom event handlers here
    // socket.on("eventName", handlerFunction);
  });
}

export function getSocketServer(): Server {
  if (!socketServer?.io) {
    throw new Error("Socket.IO server not initialized. Call initializeSocketServer() first.");
  }
  return socketServer.io;
}

export async function cleanupSocketServer(): Promise<void> {
  if (!socketServer) return;

  return new Promise((resolve, reject) => {
    socketServer!.io.close((err) => {
      if (err) {
        console.error("Error closing Socket.IO:", err);
        return reject(err);
      }

      socketServer!.httpServer.close((err) => {
        if (err) {
          console.error("Error closing HTTP server:", err);
          return reject(err);
        }

        socketServer = null;
        console.log("Socket.IO server stopped");
        resolve();
      });
    });
  });
}