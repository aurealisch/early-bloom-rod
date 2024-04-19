import type { Context } from "@root/context";
import { initTRPC } from "@trpc/server";

export const { procedure, router } = initTRPC.context<Context>().create();
