import { createContext } from "@/context";
import { appRouter } from "@routers/app/app.router";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

createHTTPServer({
  createContext,
  router: appRouter,
}).listen(3000);

export type { AppRouter } from "@routers/app/app.router";
