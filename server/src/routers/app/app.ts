import catchFish from '@/routers/app/procedures/catchFish';
import discordToTelegram from '@/routers/app/procedures/discordToTelegram';
import getId from '@/routers/app/procedures/getId';
import getLeaders from '@/routers/app/procedures/getLeaders';
import getProfile from '@/routers/app/procedures/getProfile';
import telegramToDiscord from '@/routers/app/procedures/telegramToDiscord';
import { usersRouter } from '@/routers/users/users';
import { router } from '@/trpc';

export const appRouter = router({
  catchFish,
  getLeaders,
  getProfile,
  discordToTelegram,
  getId,
  telegramToDiscord,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
