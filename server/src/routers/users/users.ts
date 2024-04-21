import { router } from '@/trpc';
import create from '@routers/users/procedures/create';
import _delete from '@routers/users/procedures/delete';

export const usersRouter = router({
  create,
  delete: _delete,
});
