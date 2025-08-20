// Import the PrismaClient class from the Prisma library
// import { PrismaClient } from "@prisma/client";

// declare global {
//   // Declare a global variable for the PrismaClient instance to avoid multiple instances during development
//   // `global` is used in development to preserve the PrismaClient instance across hot-reloads
//   var prisma: PrismaClient | undefined;
// }

// // Create a singleton PrismaClient instance
// const prismadb = global.prisma || new PrismaClient();

// // If the app is running in a development environment, attach the PrismaClient instance to the `global` object
// if (process.env.NODE_ENV !== "production") {
//   global.prisma = prismadb;
// }

// // Export the PrismaClient instance for use throughout the application
// export default prismadb;



import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;




