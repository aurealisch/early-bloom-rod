import { PrismaClient } from "@prisma/client";
import config from "@root/config.json";
import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";

export async function createContext(options: CreateHTTPContextOptions) {
  const prisma = new PrismaClient();

  await prisma.$connect();

  return {
    prisma,
    config,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
