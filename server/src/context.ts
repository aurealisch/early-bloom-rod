import config from '@/config.json';
import { PrismaClient } from '@prisma/client';
import type { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';

export async function createContext(options: CreateHTTPContextOptions) {
  const prisma = new PrismaClient();

  await prisma.$connect();

  return {
    prisma,
    config,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
