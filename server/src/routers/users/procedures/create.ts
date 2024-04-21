import { procedure } from '@/trpc';
import { z } from 'zod';

export default procedure
  .input(
    z.object({
      discord: z
        .object({
          id: z.string(),
          username: z.string(),
        })
        .optional(),
      telegram: z
        .object({
          id: z.string(),
          username: z.string(),
        })
        .optional(),
    })
  )
  .mutation(async (opts) => {
    await opts.ctx.prisma.user.create({
      data: {
        discordId: opts.input.discord?.id,
        discordUsername: opts.input.discord?.username,
        telegramId: opts.input.telegram?.id,
        telegramUsername: opts.input.telegram?.username,
      },
    });
  });
