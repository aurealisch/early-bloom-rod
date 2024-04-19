import type { Context } from "@/context";
import { initTRPC } from "@trpc/server";

export const { procedure, router } = initTRPC.context<Context>().create();
