import { router } from "@/trpc";
import createProcedure from "@routers/users/procedures/create.procedure";
import deleteProcedure from "@routers/users/procedures/delete.procedure";

export default router({
  create: createProcedure,
  delete: deleteProcedure,
});
