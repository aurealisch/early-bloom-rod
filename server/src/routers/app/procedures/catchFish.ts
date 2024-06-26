import { procedure } from '@/trpc';
import { z } from 'zod';

export default procedure
  .input(z.object({ id: z.number() }))
  .mutation(async (opts) => {
    const config = opts.ctx.config;

    const minCatch = config.catchFish.min;
    const maxCatch = config.catchFish.max;

    const minCatchCeiled = Math.ceil(minCatch);
    const maxCatchFloored = Math.floor(maxCatch);

    const catched = Math.floor(
      Math.random() * (maxCatchFloored - minCatchCeiled + 1) + minCatchCeiled
    );

    const user = await opts.ctx.prisma.user.update({
      data: {
        fish: {
          increment: catched,
        },
      },
      where: {
        id: opts.input.id,
      },
    });

    return {
      catched,
      user,
    };
  });
