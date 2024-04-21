import { createContext } from '@/context';
import { appRouter } from '@/routers/app/app';
import { createHTTPServer } from '@trpc/server/adapters/standalone';

if (Bun.main === import.meta.filename) {
  createHTTPServer({
    createContext,
    router: appRouter,
  }).listen(8081);
}

export type { AppRouter } from '@/routers/app/app';
