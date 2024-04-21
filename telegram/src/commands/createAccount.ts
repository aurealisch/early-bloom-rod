import { game } from '@/game';
import { Composer } from 'grammy';

export const composer = new Composer();

composer.command('createaccount', async (context) => {
  const author = await context.getAuthor();

  await game.TRPCClient.users.create.mutate({
    telegram: {
      id: String(author.user.id),
      username: author.user.username ?? author.user.first_name,
    },
  });

  await context.reply(`Ты создал аккаунт`);
});
