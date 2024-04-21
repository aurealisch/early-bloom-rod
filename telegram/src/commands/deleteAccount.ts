import { game } from '@/game';
import { Composer } from 'grammy';

export const composer = new Composer();

composer.command('deleteaccount', async (context) => {
  const author = await context.getAuthor();

  await game.deleteUser(await game.getId(String(author.user.id)));

  await context.reply(`Ты удалил аккаунт`);
});
