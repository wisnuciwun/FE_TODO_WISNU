import { PrismaClient } from "@prisma/client";

// Create a single Prisma instance
const prisma = new PrismaClient();

// Export the Prisma instance for reuse
export default prisma;
