import { game } from '@/game';
import { isNullish } from '@sapphire/utilities';
import { Composer } from 'grammy';
import format from '@/format';

export const composer = new Composer();

composer.command('profile', async (context) => {
  const author = await context.getAuthor();
  const user = await game.getProfile(await game.getId(String(author.user.id)));

  let description = `🆔 ID: **\`${user.id}\`**\n🐟 Рыбы: **\`${user.fish}\`**`;

  if (!isNullish(user.discordUsername)) {
    description += `\n🟣 Дискорд: **\`@${user.discordUsername}\`**`;
  }

  await context.reply(...format(description));
});
