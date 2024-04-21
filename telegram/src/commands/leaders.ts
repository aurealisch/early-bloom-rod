import format from '@/format';
import { game } from '@/game';
import { Composer } from 'grammy';

export const composer = new Composer();

composer.command('leaders', async (context) => {
  const users = await game.getLeaders();

  await context.reply(
    ...format(
      users
        .map((user, index) => {
          return `**${index + 1}**\\. **\`@${
            user.discordUsername ?? user.telegramUsername
          }\`** ${user.fish}`;
        })
        .join('\n')
    )
  );
});
