import { procedure } from "@/trpc";
import schema from "@routers/users/procedures/schema";

export default procedure.input(schema).mutation(async (opts) => {
  await opts.ctx.prisma.user.create({
    data: {
      id: opts.input.id,
    },
  });
});
