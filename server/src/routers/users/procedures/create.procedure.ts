import { procedure } from "@/trpc";
import { z } from "zod";

export default procedure
  .input(
    z.object({
      discordId: z.string().optional(),
      telegramId: z.string().optional(),
    })
  )
  .mutation(async (opts) => {
    await opts.ctx.prisma.user.create({
      data: {
        discordId: opts.input.discordId,
        telegramId: opts.input.telegramId,
      },
    });
  });
