import { procedure } from "@root/trpc";

export default procedure.query(async (opts) => {
  return await opts.ctx.prisma.user.findMany({
    orderBy: {
      fish: "desc",
    },
    take: opts.ctx.config.getLeaders,
  });
});
