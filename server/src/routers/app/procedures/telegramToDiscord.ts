import { procedure } from '@/trpc';
import { z } from 'zod';

export default procedure
  .input(
    z.object({
      discordId: z.string(),
      telegramId: z.string(),
    })
  )
  .mutation(async (opts) => {
    const User = opts.ctx.prisma.user;
    const telegramId = opts.input.telegramId;

    const telegramUser = await User.findUnique({
      where: {
        telegramId,
      },
    });

    await User.delete({
      where: {
        telegramId,
      },
    });

    return await User.update({
      where: {
        discordId: opts.input.discordId,
      },
      data: {
        fish: {
          increment: telegramUser?.fish,
        },
        telegramId,
        telegramUsername: telegramUser?.telegramUsername,
      },
    });
  });
