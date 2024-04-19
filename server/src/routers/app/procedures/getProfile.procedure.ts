import { procedure } from "@/trpc";
import { z } from "zod";

export default procedure
  .input(z.object({ id: z.string() }))
  .query(async (opts) => {
    const User = opts.ctx.prisma.user;
    const id = opts.input.id;

    let user = await User.findUnique({
      where: {
        id,
      },
    });

    return user;
  });
