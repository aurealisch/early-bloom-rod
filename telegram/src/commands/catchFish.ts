import format from '@/format';
import { game } from '@/game';
import { Composer } from 'grammy';

export const composer = new Composer();

composer.command('catchfish', async (context) => {
  const author = await context.getAuthor();

  const { catched } = await game.catchFish(
    await game.getId(String(author.user.id))
  );

  await context.reply(...format(`Ты поймал **\`${catched}\`** рыбы`));
});
