import { procedure } from '@/trpc';
import { z } from 'zod';

export default procedure
  .input(
    z.object({
      discordId: z.string().optional(),
      telegramId: z.string().optional(),
    })
  )
  .query(async (opts) => {
    const user = await opts.ctx.prisma.user.findUnique({
      where: {
        discordId: opts.input.discordId,
        telegramId: opts.input.telegramId,
      },
    });

    return {
      id: user!!.id,
    };
  });
