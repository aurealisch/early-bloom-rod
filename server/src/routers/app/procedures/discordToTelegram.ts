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
    const discordId = opts.input.discordId;

    const discordUser = await User.findUnique({
      where: {
        discordId,
      },
    });

    await User.delete({
      where: {
        discordId,
      },
    });

    return await User.update({
      where: {
        telegramId: opts.input.telegramId,
      },
      data: {
        fish: {
          increment: discordUser?.fish,
        },
        discordId,
        discordUsername: discordUser?.discordUsername,
      },
    });
  });
