import { procedure } from "@root/trpc";
import schema from "@routers/users/procedures/schema";

export default procedure.input(schema).mutation(async (opts) => {
  await opts.ctx.prisma.user.delete({
    where: {
      id: opts.input.id,
    },
  });
});
