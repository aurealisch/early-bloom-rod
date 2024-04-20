import { procedure } from "@/trpc";
import { z } from "zod";

export default procedure
  .input(
    z.object({
      id: z.number(),
    })
  )
  .mutation(async (opts) => {
    await opts.ctx.prisma.user.delete({
      where: {
        id: opts.input.id,
      },
    });
  });
