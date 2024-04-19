import { router } from "@root/trpc";
import catchFishProcedure from "@routers/app/procedures/catchFish.procedure";
import getLeadersProcedure from "@routers/app/procedures/getLeaders.procedure";
import getProfileProcedure from "@routers/app/procedures/getProfile.procedure";
import usersRouter from "@routers/users/users.router";

export const appRouter = router({
  users: usersRouter,
  catchFish: catchFishProcedure,
  getLeaders: getLeadersProcedure,
  getProfile: getProfileProcedure,
});

export type AppRouter = typeof appRouter;
